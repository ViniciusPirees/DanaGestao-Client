import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import { BsFillImageFill } from "react-icons/bs";
import Notificacao from "../../../components/Notificacao";
import { FaBars, FaPrint, FaTrashCan } from "react-icons/fa6";

import { FaHistory, FaExchangeAlt } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import getLogin from "../../../components/Login/getLogin";
import { styleAll } from "../../../../css";

export default function ItemTrKanban({
  estoque,
  index,
  colunas,
  setArrPrint,
  arrPrint,
}) {
  return (
    <>
      <tr className="text-base tablet:text-sm  border-[#4f4f4f] " key={index}>
        {colunas.map((col, i) => {
          if (col[3]) {
            if (col[4] == "") {
              return (
                <td key={col[4]} className={styleAll.tabletd}>
                  <button
                    onClick={() => {
                      var newArr = [...arrPrint];
                      var tem = newArr.findIndex(
                        (e) => e.EstManId == estoque.EstManId
                      );
                      if (tem == -1) {
                        newArr.push({ ...estoque, qtd: 1 });
                      } else {
                        var newItem = arrPrint[tem];
                        newItem.qtd = newItem.qtd + 1;
                        newArr[tem] = newItem;
                      }

                      setArrPrint(newArr);
                    }}
                    className="flex mx-2 duration-200 hover:brightness-75 "
                  >
                    <FaPrint className="bg-dana p-2 text-4xl rounded-md my-auto text-[#fff]" />
                  </button>
                </td>
              );
            } else if (col[4] == "EstManSta") {
              return (
                <td key={col[4]} className={styleAll.tabletd}>
                  {estoque?.[col[4]] == "A" ? "Ativo" : "Inativo"}
                </td>
              );
            } else {
              return (
                <td key={col[4]} className={styleAll.tabletd}>
                  {estoque?.[col[4]]}
                </td>
              );
            }
          }
        })}
      </tr>
    </>
  );
}
