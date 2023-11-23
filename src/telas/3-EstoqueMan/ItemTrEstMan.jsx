import React, { useEffect, useRef, useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import axios from "axios";

import { BsFillImageFill } from "react-icons/bs";
import Notificacao from "../components/Notificacao";
import { FaBars } from "react-icons/fa6";

import { FaHistory, FaExchangeAlt } from "react-icons/fa";
import { RiDeleteBin6Fill, RiPencilFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import getLogin from "../components/getLogin";

export default function ItemTrEstMan({
  estoque,
  index,
  setAtivoImg,
  setImg,
  setInfosEst,
}) {
  const refBtn = useRef();
  const refBtn2 = useRef();
  const nav = useNavigate();
  const [nivel, setNivel] = useState(0);
  useEffect(() => {
    getLogin().then((val) => {
      setNivel(val.n);
    });
  }, []);

  const [ativo, setAtivo] = useState(false);

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const bgtr = () => {
    if (estoque.EstManSaldo == 0) {
      return " bg-[#c23636] ";
    } else if (estoque.EstManEstMin >= estoque.EstManSaldo) {
      return " bg-[#ff951c] ";
    }
    return "";
  };

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        refBtn.current &&
        !refBtn.current.contains(event.target) &&
        refBtn2.current &&
        !refBtn2.current.contains(event.target)
      ) {
        setAtivo(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refBtn, refBtn2]);

  const getAnexo = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getAnexoEstMan`,
        { params: { EstManId: estoque.EstManId } }
      );

      if (res?.data.length > 0) {
        var buffer = res?.data[0].EstManAnexo.data;
        var base64 = _arrayBufferToBase64(buffer);
        setImg(base64);
        setAtivoImg(true);
      } else {
        Notificacao([
          "atencao",
          "Nenhum anexo foi encontrado para esse item do estoque.",
        ]);
      }
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar anexo. " + err]);
    }
  };

  return (
    <>
      <tr className="text-xl border-b-4  border-[#4f4f4f] " key={index}>
        <td
          className={
            "text-center border-l-4 border-[#0000]  break-words  flex-wrap " +
            bgtr()
          }
        >
          <button
            ref={refBtn2}
            onClick={() => setAtivo(!ativo)}
            className="flex mx-2 duration-200 hover:brightness-75 "
          >
            <FaBars className="bg-dana p-2 text-4xl rounded-md my-auto text-[#fff]" />
          </button>
          {ativo && (
            <>
              <div
                ref={refBtn}
                className="absolute mt-[-1.78em] rounded-lg ml-[2.25em]  bg-[#fff]"
              >
                {nivel > 1 && (
                  <button
                    onClick={() => {
                      setInfosEst(estoque);
                      setAtivo(false);
                    }}
                    className="text-fundo flex font-bold text-xl rounded-lg py-2 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                  >
                    <FaExchangeAlt className="text-xl my-auto mr-2 " />{" "}
                    Movimentar Saldo
                  </button>
                )}
                <button
                  onClick={() => {
                    nav("./Historico", { state: estoque });
                  }}
                  className="text-fundo flex font-bold text-xl rounded-lg py-2 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                >
                  <FaHistory className="text-xl my-auto mr-2 " /> Histórico
                </button>
                {nivel == 3 && (
                  <button
                    onClick={() => {
                      nav("./ItemEstoque", {
                        state: { tipo: 2, val: estoque },
                      });
                    }}
                    className="text-fundo flex font-bold text-xl rounded-lg py-2 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                  >
                    <RiPencilFill className="text-xl my-auto mr-2 " /> Editar
                  </button>
                )}

                <button
                  onClick={() => {
                    getAnexo();
                    setAtivo(false);
                  }}
                  className="text-fundo flex font-bold text-xl rounded-lg py-2 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                >
                  <BsFillImageFill className="text-xl my-auto mr-2 " /> Anexo
                </button>
              </div>
            </>
          )}
        </td>
        <td
          className={
            "text-center border-x-4 border-[#4f4f4f] p-4 break-words  flex-wrap " +
            bgtr()
          }
        >
          {estoque?.EstManId}
        </td>
        <td
          className={
            "text-center border-x-4 border-[#4f4f4f]  break-words  flex-wrap " +
            bgtr()
          }
        >
          {estoque?.EstManSta == "A" ? "Ativo" : "Inativo"}
        </td>
        <td
          className={
            "text-center border-x-4 border-[#4f4f4f]  break-words  flex-wrap " +
            bgtr()
          }
        >
          {estoque?.EstManDesc}
        </td>
        <td
          className={
            "text-center border-x-4 border-[#4f4f4f]  break-words  flex-wrap " +
            bgtr()
          }
        >
          {estoque?.EstManAreaDesc}
        </td>
        <td
          className={
            "text-center border-x-4 border-[#4f4f4f]  break-words  flex-wrap " +
            bgtr()
          }
        >
          {estoque?.EstManTipMatDesc}
        </td>
        <td
          className={
            "text-center border-x-4 border-[#4f4f4f]  break-words  flex-wrap " +
            bgtr()
          }
        >
          {estoque?.EstManLoc}
        </td>
        <td
          className={
            "text-center border-x-4 border-[#4f4f4f]  break-words  flex-wrap " +
            bgtr()
          }
        >
          {estoque?.EstManEstMin}
        </td>
        <td
          className={
            "text-center border-x-4 border-[#4f4f4f]  break-words  flex-wrap " +
            bgtr()
          }
        >
          {estoque?.EstManEstMax}
        </td>
        <td
          className={
            "text-center border-[#4f4f4f]  break-words  flex-wrap " + bgtr()
          }
        >
          {estoque?.EstManSaldo}
        </td>
      </tr>
    </>
  );
}
