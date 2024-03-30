import React, { useEffect, useRef, useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import axios from "axios";

import { FaBars, FaTrashCan } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import { FaBoxes, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsFillImageFill } from "react-icons/bs";
import Notificacao from "../components/Notificacao";
import { TbNumber } from "react-icons/tb";
import { ImSearch } from "react-icons/im";
import getLogin from "../components/Login/getLogin";
import { styleAll } from "../../css";

export default function ItemTr({
  lista,
  index,
  setAtivoImg,
  setImg,
  setTelaItem,
  setItens,
  ativarNumRC,
  ativarExc,
  colunas,
}) {
  var data = `${lista.MatData.substring(8, 10)}/${lista.MatData.substring(
    5,
    7
  )}/${lista.MatData.substring(2, 4)} - ${lista.MatData.substring(11, 19)}`;
  const nav = useNavigate();
  const refBtn = useRef();
  const refBtn2 = useRef();
  const [ativo, setAtivo] = useState(false);
  const matCod = lista.MatSolicitacao;
  useEffect(() => {
    if (ativo) {
      buscaItens();
    }
  }, [ativo]);

  const [nivel, setNivel] = useState(0);
  useEffect(() => {
    getLogin().then((val) => {
      setNivel(val.n);
    });
  }, []);

  const buscaItens = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getItens`,
        { params: { matCod } }
      );
      setItens(res?.data);
      return res?.data;
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar itens. " + err]);
    }
  };

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
        `http://${import.meta.env.VITE_IP}/getAnexo`,
        { params: { matCod } }
      );
      if (res?.data.length > 0) {
        let imgsArray = [];
        res?.data?.forEach((file) => {
          var buffer = file.MatAnexo.data;
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

  const status = () => {
    if (lista?.MatRC == 0) {
      return "Sem RC";
    } else if (
      lista?.REQ_STATUS == "PRE-APPROVED" ||
      (lista?.REQ_STATUS == "APPROVED" &&
        lista?.PO_NUM == null &&
        lista?.REQ_APPROVER == lista?.PREPARER &&
        (lista?.LINE_TOTAL_RC == 0 || lista?.LINE_TOTAL_RC == null) &&
        lista.PENDING_TOTAL_RC == 0 &&
        lista.RECEIVED_TOTAL_RC == 0)
    ) {
      return "RC em orçamento de compras";
    } else if (
      lista?.REQ_STATUS == "INCOMPLETE" ||
      (lista?.REQ_STATUS == "IN PROCESS" &&
        lista?.PO_NUM == null &&
        lista?.REQ_APPROVER == lista?.PREPARER &&
        (lista?.LINE_TOTAL_RC > 0 ||
          lista.PENDING_TOTAL_RC > 0 ||
          lista.RECEIVED_TOTAL_RC > 0))
    ) {
      return "Requer aprovação do solicitante";
    } else if (lista?.REQ_STATUS == "IN PROCESS" && lista?.PO_NUM == null) {
      return "RC Em aprovação";
    } else if (lista?.REQ_STATUS == "APPROVED" && lista?.PO_NUM == null) {
      return "RC Aprovada sem pedido";
    } else if (
      lista?.REQ_STATUS == "APPROVED" &&
      lista?.PO_NUM != null &&
      lista.CLOSED_CODE == "OPEN"
    ) {
      return "RC Aprovada com pedido aberto";
    } else if (
      lista?.REQ_STATUS == "APPROVED" &&
      lista?.PO_NUM != null &&
      lista.CLOSED_CODE == "CLOSED"
    ) {
      return "RC Aprovada com pedido entregue";
    } else if (
      lista?.REQ_STATUS != "APPROVED" &&
      lista?.REQ_STATUS != "IN PROCESS" &&
      lista?.REQ_STATUS != null
    ) {
      return "RC Cancelada";
    } else {
      return "RC não existe";
    }
  };

  return (
    <>
      <tr className="text-base  border-[#4f4f4f]  " key={index}>
        {colunas.map((col, i) => {
          if (col[3]) {
            if (col[4] == "") {
              return (
                <td className={styleAll.tabletd} key={i}>
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
                        className="absolute mt-[-2.25em] rounded-lg ml-[2.8em] z-[3] bg-[#fff]"
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
                        {nivel >= 2 && (
                          <button
                            onClick={() => {
                              buscaItens().then((val) =>
                                nav("/SolicitarMateriais", {
                                  state: { itens: val, solic: lista, tipo: 2 },
                                })
                              );
                            }}
                            className="text-fundo flex font-bold text-lg py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                          >
                            <RiPencilFill className="text-lg my-auto mr-2 " />{" "}
                            Editar
                          </button>
                        )}

                        <button
                          onClick={() => {
                            nav("./Historico", { state: { solic: lista } });
                          }}
                          className="text-fundo flex font-bold text-lg py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                        >
                          <FaHistory className="text-lg my-auto mr-2  " />{" "}
                          Histórico
                        </button>
                        <button
                          onClick={() => {
                            getAnexo();
                            setAtivo(false);
                          }}
                          className="text-fundo flex font-bold text-lg py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                        >
                          <BsFillImageFill className="text-lg my-auto mr-2 " />{" "}
                          Anexo
                        </button>

                        {nivel > 1 && (
                          <button
                            onClick={() => {
                              setAtivo(false);
                              ativarNumRC({ lista });
                            }}
                            className="text-fundo flex font-bold text-lg  py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                          >
                            <TbNumber className="text-lg my-auto mr-2 " />{" "}
                            Alterar Núm. RC
                          </button>
                        )}
                        {lista?.MatRC.length > 0 && (
                          <button
                            onClick={() => {
                              nav("/ControleRC", {
                                state: { numRC: lista?.MatRC },
                              });
                            }}
                            className="text-fundo flex font-bold text-lg py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                          >
                            <ImSearch className="text-lg my-auto mr-2 " />{" "}
                            Buscar RC
                          </button>
                        )}
                        {nivel > 2 && (
                          <button
                            onClick={() => {
                              setAtivo(false);
                              ativarExc({ lista });
                            }}
                            className="text-fundo flex font-bold text-lg rounded-b-lg py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                          >
                            <FaTrashCan className="text-lg my-auto mr-2 " />{" "}
                            Excluir
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </td>
              );
            } else if (col[4] == "Status") {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {status()}
                </td>
              );
            } else if (col[4] == "MatData") {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {data}
                </td>
              );
            } else {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {lista?.[col[4]]}
                </td>
              );
            }
          }
        })}
      </tr>
    </>
  );
}
