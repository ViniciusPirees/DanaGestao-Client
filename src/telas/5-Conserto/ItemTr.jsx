import React, { useEffect, useRef, useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import axios from "axios";

import { BsFillCameraFill, BsFillImageFill } from "react-icons/bs";
import Notificacao from "../components/Notificacao";
import { FaBars, FaPrint, FaTrashCan } from "react-icons/fa6";

import { RiPencilFill } from "react-icons/ri";
import { FaBoxes, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TelaItem from "./Items/TelaItem";
import { TbNumber } from "react-icons/tb";
import { ImSearch } from "react-icons/im";
import PDF from "./PDF/pdf.js";
import getLogin from "../components/Login/getLogin.js";
import { styleAll } from "../../css.jsx";

export default function ItemTr({
  conserto,
  index,
  setAtivoImg,
  setImg,
  setTelaItem,
  setItens,
  ativarNumRC,
  ativarExc,
  getConserto,
  colunas,
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
        `http://${import.meta.env.VITE_IP}/getItensCon`,
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
        `http://${import.meta.env.VITE_IP}/getItensConPDF`,
        { params: { conCod } }
      );
      console.log(res);
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

  const convertBase64ToFile = function (image) {
    const byteString = atob(image.replace(/-/g, "+").replace(/_/g, "/"));
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const newBlob = new Blob([ab], {
      type: "image/jpeg",
    });
    return newBlob;
  };

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
        `http://${import.meta.env.VITE_IP}/getAnexoCon`,
        { params: { conCod } }
      );
      if (res?.data.length > 0) {
        let imgsArray = [];
        res?.data?.forEach((file) => {
          var buffer = file.ConAnexo.data;
          var base64 = _arrayBufferToBase64(buffer);
          var image = convertBase64ToFile(base64);
          imgsArray.push(image);
        });
        setImg(imgsArray);
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
    if (conserto?.ConNumRC == "") {
      return "Sem RC";
    } else if (conserto?.ConNumRC == "G") {
      return "Garantia";
    } else if (
      conserto?.REQ_STATUS == "PRE-APPROVED" ||
      (conserto?.REQ_STATUS == "APPROVED" &&
        conserto?.PO_NUM == null &&
        conserto?.REQ_APPROVER == conserto?.PREPARER &&
        (conserto?.LINE_TOTAL_RC == 0 || conserto?.LINE_TOTAL_RC == null) &&
        conserto.PENDING_TOTAL_RC == 0 &&
        conserto.RECEIVED_TOTAL_RC == 0)
    ) {
      return "RC em orçamento de compras";
    } else if (
      conserto?.REQ_STATUS == "INCOMPLETE" ||
      (conserto?.REQ_STATUS == "IN PROCESS" &&
        conserto?.PO_NUM == null &&
        conserto?.REQ_APPROVER == conserto?.PREPARER &&
        (conserto?.LINE_TOTAL_RC > 0 ||
          conserto.PENDING_TOTAL_RC > 0 ||
          conserto.RECEIVED_TOTAL_RC > 0))
    ) {
      return "Requer aprovação do solicitante";
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

  const bgtr = () => {
    console.log(conserto);
    if (conserto.SALDO_DISPONIVEL > 0 && conserto.ConSemRep == "S") {
      return " bg-[#c23636] ";
    } else if (conserto.SALDO_DISPONIVEL == 0 && conserto.ConSemRep == "S") {
      return " bg-[#38761d] ";
    }
    return "";
  };
  return (
    <>
      <tr
        className="text-base laptop:text-sm tablet:text-sm  border-[#4f4f4f]  "
        key={index}
      >
        {colunas.map((col, i) => {
          if (col[3]) {
            if (col[4] == "") {
              return (
                <td className={styleAll.tabletd + bgtr()} key={i}>
                  <button
                    ref={refBtn2}
                    onClick={() => setAtivo(!ativo)}
                    className="flex mx-2 laptop:mx-1 tablet:mx-1 duration-200 hover:brightness-75 "
                  >
                    <FaBars className="bg-dana p-2 text-4xl laptop:text-3xl tablet:text-3xl laptop:p-[0.2em] tablet:p-[0.2em] rounded-md my-auto text-[#fff]" />
                  </button>
                  {ativo && (
                    <>
                      <div
                        ref={refBtn}
                        className="absolute z-[3] mt-[-2.25em] rounded-lg ml-[2.8em] bg-[#fff]"
                      >
                        <button
                          onClick={() => {
                            buscaItens();
                            setAtivo(false);
                            setTelaItem(true);
                          }}
                          className="text-fundo flex font-bold text-lg rounded-t-lg py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                        >
                          <FaBoxes className="text-lg my-auto mr-2" /> Itens
                        </button>
                        {/*
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
                  )}*/}
                        {conserto?.ConNumRC.length > 0 && (
                          <button
                            onClick={() => {
                              nav("/ControleRC", {
                                state: { numRC: conserto?.ConNumRC },
                              });
                            }}
                            className="text-fundo flex font-bold text-lg py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0]"
                          >
                            <ImSearch className="text-lg my-auto mr-2 " />{" "}
                            Buscar RC
                          </button>
                        )}
                        {nivel > 1 && (
                          <button
                            onClick={() => {
                              buscaItens().then((val) =>
                                nav("./ItemConserto", {
                                  state: {
                                    itens: val,
                                    conserto: conserto,
                                    tipo: 2,
                                  },
                                })
                              );
                            }}
                            className="text-fundo flex font-bold text-lg py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                          >
                            <RiPencilFill className="text-lg my-auto mr-2" />{" "}
                            Editar
                          </button>
                        )}

                        <button
                          onClick={() => {
                            nav("./Historico", {
                              state: { conserto: conserto },
                            });
                          }}
                          className="text-fundo flex font-bold text-lg py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0]"
                        >
                          <FaHistory className="text-lg my-auto mr-2 " />{" "}
                          Histórico
                        </button>
                        <button
                          className="text-fundo flex font-bold text-lg py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                          onClick={() => {
                            buscaItensPDF().then((res) => {
                              PDF({ conserto: res });
                              setAtivo(false);
                            });
                          }}
                        >
                          <FaPrint className="text-lg my-auto mr-2 " /> Imprimir
                        </button>
                        <button
                          onClick={() => {
                            getAnexo();
                            setAtivo(false);
                          }}
                          className="text-fundo flex font-bold text-lg py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0]"
                        >
                          <BsFillImageFill className="text-lg my-auto mr-2 " />{" "}
                          Anexo
                        </button>
                        {nivel > 2 && (
                          <button
                            onClick={() => {
                              setAtivo(false);
                              ativarExc({ conserto });
                            }}
                            className="text-fundo flex font-bold text-lg py-1 px-3 rounded-b-lg w-full duration-200 hover:bg-[#a0a0a0] "
                          >
                            <FaTrashCan className="text-lg my-auto mr-2" />{" "}
                            Excluir
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </td>
              );
            } else if (col[4] == "ConData") {
              return (
                <td className={styleAll.tabletd + bgtr()} key={i}>
                  {data}
                </td>
              );
            } else if (col[4] == "Status") {
              return (
                <td className={styleAll.tabletd + bgtr()} key={i}>
                  {status()}
                </td>
              );
            } else if (col[4] == "Status") {
              return (
                <td className={styleAll.tabletd + bgtr()} key={i}>
                  {conserto?.PO_NUM == null && conserto?.CLOSED_CODE == null
                    ? ""
                    : conserto?.PO_NUM + " " + conserto?.CLOSED_CODE}
                </td>
              );
            } else {
              return (
                <td className={styleAll.tabletd + bgtr()} key={i}>
                  {conserto?.[col[4]]}
                </td>
              );
            }
          }
        })}
      </tr>
    </>
  );
}
