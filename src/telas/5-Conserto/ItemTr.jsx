import React, { useEffect, useRef, useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import axios from "axios";

import { BsFillCameraFill, BsFillImageFill } from "react-icons/bs";
import Notificacao from "../components/Notificacao";
import { FaBars, FaPrint } from "react-icons/fa6";

import { RiPencilFill } from "react-icons/ri";
import { FaBoxes, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TelaItem from "./Items/TelaItem";
import { TbNumber } from "react-icons/tb";
import { ImSearch } from "react-icons/im";
import PDF from "./PDF/pdf.js";
import getLogin from "../components/getLogin.js";

export default function ItemTr({
  conserto,
  index,
  setAtivoImg,
  setImg,
  setTelaItem,
  setItens,
  ativarNumRC,
}) {
  var data = `${conserto.ConData.substring(8, 10)}/${conserto.ConData.substring(
    5,
    7
  )}/${conserto.ConData.substring(2, 4)} - ${conserto.ConData.substring(
    11,
    19
  )}`;
  const nav = useNavigate();
  const [nivel, setNivel] = useState(0);
  useEffect(() => {
    getLogin().then((val) => {
      setNivel(val.n);
    });
  }, []);

  const [itensEdit, setItensEdit] = useState("");
  const [ativo, setAtivo] = useState(false);
  const conCod = conserto.ConCod;
  const refBtn = useRef();
  const refBtn2 = useRef();
  const buscaItens = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getItensCon`,
        { params: { conCod } }
      );
      setItens(res?.data);
      return res?.data;
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar itens. " + err]);
    }
  };

  const buscaItensPDF = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getItensConPDF`,
        { params: { conCod } }
      );
      return res?.data;
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar itens. " + err]);
    }
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

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const getAnexo = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getAnexoCon`,
        { params: { conCod } }
      );
      if (res?.data.length > 0) {
        var buffer = res?.data[0].ConAnexo.data;
        var base64 = _arrayBufferToBase64(buffer);

        setImg(base64);
        setAtivoImg(true);
      } else {
        Notificacao([
          "atencao",
          "Nenhum anexo foi encontrado para essa solicitação.",
        ]);
      }
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar anexo. " + err]);
    }
  };

  const status = () => {
    if (conserto?.ConNumRC == 0) {
      return "Sem RC";
    } else if (
      conserto?.REQ_STATUS == "IN PROCESS" &&
      conserto?.PO_NUM == null
    ) {
      return "RC Em aprovação";
    } else if (conserto?.REQ_STATUS == "APPROVED" && conserto?.PO_NUM == null) {
      return "RC Aprovada sem pedido";
    } else if (
      conserto?.REQ_STATUS == "APPROVED" &&
      conserto?.PO_NUM != null &&
      conserto.CLOSED_CODE == "OPEN"
    ) {
      return "RC Aprovada com pedido aberto";
    } else if (
      conserto?.REQ_STATUS == "APPROVED" &&
      conserto?.PO_NUM != null &&
      conserto.CLOSED_CODE == "CLOSED"
    ) {
      return "RC Aprovada com pedido entregue";
    } else if (
      conserto?.REQ_STATUS != "APPROVED" &&
      conserto?.REQ_STATUS != "IN PROCESS" &&
      conserto?.REQ_STATUS != null
    ) {
      return "RC Cancelada";
    } else {
      return "RC não existe";
    }
  };
  return (
    <>
      <tr className="text-xl border-b-4 border-[#4f4f4f]  " key={index}>
        <td className="text-center  border-[rgb(79,79,79)] p-3 ">
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
                <button
                  onClick={() => {
                    buscaItens();
                    setAtivo(false);
                    setTelaItem(true);
                  }}
                  className="text-fundo flex font-bold text-xl rounded-lg py-2 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                >
                  <FaBoxes className="text-xl my-auto mr-2 " /> Itens
                </button>
                {nivel > 1 && (
                  <button
                    onClick={() => {
                      setAtivo(false);
                      ativarNumRC({ conserto });
                    }}
                    className="text-fundo flex font-bold text-xl rounded-lg py-2 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                  >
                    <TbNumber className="text-xl my-auto mr-2 " /> Alterar Núm.
                    RC
                  </button>
                )}
                {conserto?.ConNumRC.length > 0 && (
                  <button
                    onClick={() => {
                      nav("/ControleRC", {
                        state: { numRC: conserto?.ConNumRC },
                      });
                    }}
                    className="text-fundo flex font-bold text-xl rounded-lg py-2 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                  >
                    <ImSearch className="text-xl my-auto mr-2 " /> Buscar RC
                  </button>
                )}
                {nivel == 3 && (
                  <button
                    onClick={() => {
                      buscaItens().then((val) =>
                        nav("./ItemConserto", {
                          state: { itens: val, conserto: conserto, tipo: 2 },
                        })
                      );
                    }}
                    className="text-fundo flex font-bold text-xl rounded-lg py-2 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                  >
                    <RiPencilFill className="text-xl my-auto mr-2 " /> Editar
                  </button>
                )}

                <button
                  onClick={() => {
                    nav("./Historico", { state: { conserto: conserto } });
                  }}
                  className="text-fundo flex font-bold text-xl rounded-lg py-2 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                >
                  <FaHistory className="text-xl my-auto mr-2 " /> Histórico
                </button>
                <button
                  className="text-fundo flex font-bold text-xl rounded-lg py-2 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                  onClick={() => {
                    buscaItensPDF().then((res) => {
                      PDF({ conserto: res });
                      setAtivo(false);
                    });
                  }}
                >
                  <FaPrint className="text-xl my-auto mr-2 " /> Imprimir
                </button>
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
        <td className="text-center border-x-4 border-[#4f4f4f] break-words  flex-wrap max-w-xs p-4">
          {conserto?.ConCod}
        </td>
        <td className="text-center border-x-4 border-[#4f4f4f] break-words  flex-wrap max-w-xs p-4">
          {data}
        </td>
        <td className="text-center border-x-4 border-[#4f4f4f] break-words  flex-wrap max-w-xs p-4">
          {conserto?.ConNum}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words  flex-wrap max-w-xs p-4">
          {conserto?.ConNumRC}
        </td>
        <td className="text-center border-x-4 border-[#4f4f4f] break-words  flex-wrap max-w-xs p-4">
          {status()}
        </td>
        <td className="text-center border-x-4 border-[#4f4f4f] break-words  flex-wrap max-w-xs p-4">
          {conserto?.ConManNome}
        </td>

        <td className="text-center border-x-4 border-[#4f4f4f] break-words  flex-wrap max-w-xs p-4">
          {conserto?.ConMaqDesc}
        </td>
        <td className="text-center border-x-4 border-[#4f4f4f] break-words flex-wrap max-w-xs p-4">
          {conserto?.ConMaqDiv}
        </td>
        <td className="text-center border-x-4 border-[#4f4f4f] break-words  flex-wrap max-w-xs p-4">
          {conserto?.ConMaqSetor}
        </td>
        <td className="text-center border-x-4 border-[#4f4f4f] break-words flex-wrap max-w-xs p-4">
          {conserto?.ConMaqDivEBS}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {conserto?.ConNumSo}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {conserto?.ConForDesc}
        </td>

        <td className="text-center border-r-4 border-[#4f4f4f]  break-words  flex-wrap max-w-xs p-4">
          {conserto?.ConNF}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words  flex-wrap max-w-xs p-4">
          {conserto?.ConOrc}
        </td>

        <td className="text-center border-r-4 border-[#4f4f4f]  break-words  flex-wrap max-w-xs p-4">
          {conserto?.ConNumOC}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words  flex-wrap max-w-xs p-4">
          {conserto?.ConObs}
        </td>
      </tr>
    </>
  );
}
