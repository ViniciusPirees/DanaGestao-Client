import React, { useEffect, useRef, useState } from "react";
import { styleAll } from "../../../../../css";
import { ImCross } from "react-icons/im";

export default function TableItemPrint({ item, setArrPrint, index, arrPrint }) {
  return (
    <>
      <tr className="text-base border-[#4f4f4f] " key={index}>
        <td className={styleAll.tabletd}>{item.EstManNum}</td>
        <td className={styleAll.tabletd}>{item.EstManDesc}</td>
        <td className={`py-0 ${styleAll.tabletd}`}>
          <input
            type="number"
            className=" w-full bg-input focus:outline-none focus:outline-[#fff] focus:-outline-offset-0 p-2 text-lg tablet:text-base  border-[2px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            onChange={(e) => {
              var newArr = [...arrPrint];
              var newItem = item;
              newItem.qtd = e.target.value;
              var tem = newArr.findIndex((x) => x.EstManId == item.EstManId);
              newArr[tem] = newItem;
              setArrPrint(newArr);
            }}
            value={item.qtd}
          />
        </td>
        <td className={`py-0 ${styleAll.tabletd}`}>
          <button className="duration-500 hover:scale-105">
            <ImCross
              onClick={() => {
                var newArr = [...arrPrint];
                var tem = newArr.findIndex((x) => x.EstManId == item.EstManId);
                newArr.splice(tem, 1);
                setArrPrint(newArr);
              }}
              className="text-[2.3em] rounded-md bg-[#cc0000] p-2 m-1 -mb-[3px]"
            />
          </button>
        </td>
      </tr>
    </>
  );
}
