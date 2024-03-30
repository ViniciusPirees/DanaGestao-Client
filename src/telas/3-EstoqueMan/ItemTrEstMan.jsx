import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import { BsFillImageFill } from "react-icons/bs";
import Notificacao from "../components/Notificacao";
import { FaBars, FaTrashCan } from "react-icons/fa6";

import { FaHistory, FaExchangeAlt } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import getLogin from "../components/Login/getLogin";
import { styleAll } from "../../css";

export default function ItemTrEstMan({
  estoque,
  index,
  setAtivoImg,
  setImg,
  setInfosEst,
  ativarExc,
  colunas,
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
        `http://${import.meta.env.VITE_IP}/getAnexoEstMan`,
        { params: { EstManId: estoque.EstManId } }
      );

      if (res?.data.length > 0) {
        let imgsArray = [];
        res?.data?.forEach((file) => {
          var buffer = file.EstManAnexo.data;
          var base64 = _arrayBufferToBase64(buffer);
          var image = convertBase64ToFile(base64);
          imgsArray.push(image);
        });
        setImg(imgsArray);
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
      <tr className="text-base laptop:text-sm tablet:text-sm border-[#4f4f4f] " key={index}>
        {colunas.map((col, i) => {
          if (col[3]) {
            if (col[4] == "") {
              return (
                <td key={col[4]} className={styleAll.tabletd + bgtr()}>
                  <button
                    ref={refBtn2}
                    onClick={() => setAtivo(!ativo)}
                    className="flex mx-2 duration-200 hover:brightness-75 "
                  >
                    <FaBars className="bg-dana desktop:p-2 desktop:text-4xl laptop:text-3xl tablet:text-3xl laptop:p-[0.38rem] tablet:p-[0.38rem] rounded-md my-auto text-[#fff]" />
                  </button>
                  {ativo && (
                    <>
                      <div
                        ref={refBtn}
                        className="absolute z-[3] mt-[-2.25em] rounded-lg ml-[2.8em] laptop:ml-[2.45em] tablet:ml-[2.45em] laptop:mt-[-1.95em] tablet:mt-[-1.95em] bg-[#fff]"
                      >
                        {nivel > 1 && (
                          <button
                            onClick={() => {
                              setInfosEst(estoque);
                              setAtivo(false);
                            }}
                            className="text-fundo flex font-bold text-lg rounded-t-lg py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                          >
                            <FaExchangeAlt className="text-lg my-auto mr-2 " />{" "}
                            Movimentar Saldo
                          </button>
                        )}
                        <button
                          onClick={() => {
                            nav("./Movimentacao", {
                              state: { id: estoque.EstManNum },
                            });
                          }}
                          className="text-fundo flex font-bold text-lg py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                        >
                          <FaHistory className="text-lg my-auto mr-2 " />{" "}
                          Histórico
                        </button>
                        {nivel > 1 && (
                          <button
                            onClick={() => {
                              nav("./ItemEstoque", {
                                state: { tipo: 2, val: estoque },
                              });
                            }}
                            className="text-fundo flex font-bold text-lg  py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                          >
                            <RiPencilFill className="text-lg my-auto mr-2 " />{" "}
                            Editar
                          </button>
                        )}

                        <button
                          onClick={() => {
                            getAnexo();
                            setAtivo(false);
                          }}
                          className="text-fundo flex font-bold text-lg  py-1 px-3 w-full duration-200 hover:bg-[#a0a0a0] "
                        >
                          <BsFillImageFill className="text-lg my-auto mr-2 " />{" "}
                          Anexo
                        </button>
                        {nivel > 2 && (
                          <button
                            onClick={() => {
                              setAtivo(false);
                              ativarExc({ estman: estoque });
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
            } else if (col[4] == "EstManSta") {
              return (
                <td key={col[4]} className={styleAll.tabletd + bgtr()}>
                  {estoque?.[col[4]] == "A" ? "Ativo" : "Inativo"}
                </td>
              );
            } else {
              return (
                <td key={col[4]} className={styleAll.tabletd + bgtr()}>
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
