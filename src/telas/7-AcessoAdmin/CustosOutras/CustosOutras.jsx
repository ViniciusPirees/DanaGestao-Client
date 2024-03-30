import React, { useEffect, useRef, useState } from "react";
import { styleAll } from "../../../css";
import { HiOutlineRefresh } from "react-icons/hi";
import Notificacao from "../../components/Notificacao";
import axios from "axios";

export default function Custos({ setLoad, prep }) {
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  function numberWithCommas(x) {
    return x
      .toString()
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const [mes, setMes] = useState(monthNames[new Date().getMonth()]);
  const [ano, setAno] = useState(new Date().getFullYear());

  const [aopLV12, setaopLV12] = useState(0);
  const [aopLV17, setaopLV17] = useState(0);

  const [proLV12, setproLV12] = useState(0);
  const [proLV17, setproLV17] = useState(0);

  const [costAmLV12, setcostAmLV12] = useState(0);
  const [costAmLV17, setcostAmLV17] = useState(0);

  const [prevLV12, setprevLV12] = useState(0);
  const [prevLV17, setprevLV17] = useState(0);

  const [aopCV12, setaopCV12] = useState(0);
  const [aopCV17, setaopCV17] = useState(0);

  const [proCV12, setproCV12] = useState(0);
  const [proCV17, setproCV17] = useState(0);

  const [costAmCV12, setcostAmCV12] = useState(0);
  const [costAmCV17, setcostAmCV17] = useState(0);

  const [prevCV12, setprevCV12] = useState(0);
  const [prevCV17, setprevCV17] = useState(0);

  const [backlogLV12, setbacklogLV12] = useState(0);
  const [backlogLV17, setbacklogLV17] = useState(0);

  const [backlogCV12, setbacklogCV12] = useState(0);
  const [backlogCV17, setbacklogCV17] = useState(0);

  const [aopLV58, setaopLV58] = useState(0);
  const [proLV58, setproLV58] = useState(0);
  const [costAmLV58, setcostAmLV58] = useState(0);
  const [prevLV58, setprevLV58] = useState(0);
  const [aopCV58, setaopCV58] = useState(0);
  const [proCV58, setproCV58] = useState(0);
  const [costAmCV58, setcostAmCV58] = useState(0);
  const [prevCV58, setprevCV58] = useState(0);
  const [backlogLV58, setbacklogLV58] = useState(0);
  const [backlogCV58, setbacklogCV58] = useState(0);

  const getAllCust = async () => {
    setLoad(true);

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getAllCustOutros`,
        {
          params: {
            mes,
            ano,
            mesNum: monthNames.indexOf(mes) + 1,
            prep: prep,
          },
        }
      );

      if (res?.data?.code) {
        setaopLV58(0);
        setproLV58(0);
        setcostAmLV58(0);
        setprevLV58(0);
        setaopCV58(0);
        setproCV58(0);
        setcostAmCV58(0);
        setprevCV58(0);
        setbacklogLV58(0);
        setbacklogCV58(0);

        setaopLV12(0);
        setaopLV17(0);
        setproLV12(0);
        setproLV17(0);
        setaopCV12(0);
        setaopCV17(0);
        setproCV12(0);
        setproCV17(0);
        setcostAmLV17(0);
        setprevLV17(0);
        setcostAmCV17(0);
        setprevCV17(0);
        setcostAmLV12(0);
        setprevLV12(0);
        setcostAmCV12(0);
        setprevCV12(0);
        setbacklogLV12(0);
        setbacklogLV17(0);
        setbacklogCV12(0);
        setbacklogCV17(0);

        Notificacao(["erro", `Erro ao buscar valores de ${mes}/${ano}`]);
      } else {
        var valoresCon = res.data[0]?.[0];

        if (res.data[0].length > 0) {
          setaopLV12(
            valoresCon.ValLVC12Bud == null ? 0 : valoresCon.ValLVC12Bud
          );
          setaopLV17(
            valoresCon.ValLVC17Bud == null ? 0 : valoresCon.ValLVC17Bud
          );
          setproLV12(
            valoresCon.ValLVC12Pro == null ? 0 : valoresCon.ValLVC12Pro
          );
          setproLV17(
            valoresCon.ValLVC17Pro == null ? 0 : valoresCon.ValLVC17Pro
          );

          setaopCV12(
            valoresCon.ValCVC12Bud == null ? 0 : valoresCon.ValCVC12Bud
          );
          setaopCV17(
            valoresCon.ValCVC17Bud == null ? 0 : valoresCon.ValCVC17Bud
          );
          setproCV12(
            valoresCon.ValCVC12Pro == null ? 0 : valoresCon.ValCVC12Pro
          );
          setproCV17(
            valoresCon.ValCVC17Pro == null ? 0 : valoresCon.ValCVC17Pro
          );

          setaopLV58(
            valoresCon.ValLVC58Bud == null ? 0 : valoresCon.ValLVC58Bud
          );
          setproLV58(
            valoresCon.ValLVC58Pro == null ? 0 : valoresCon.ValLVC58Pro
          );
          setaopCV58(
            valoresCon.ValCVC58Bud == null ? 0 : valoresCon.ValCVC58Bud
          );
          setproCV58(
            valoresCon.ValCVC58Pro == null ? 0 : valoresCon.ValCVC58Pro
          );
        } else {
          setaopLV12(0);
          setaopLV17(0);
          setproLV12(0);
          setproLV17(0);
          setaopCV12(0);
          setaopCV17(0);
          setproCV12(0);
          setproCV17(0);
          setaopLV58(0);
          setproLV58(0);
          setaopCV58(0);
          setproCV58(0);
        }

        var pendente = res.data[1];
        var cv12 = 0;
        var cv17 = 0;
        var lv12 = 0;
        var lv17 = 0;
        var cv58 = 0;
        var lv58 = 0;

        if (pendente.length > 0) {
          pendente.map((item, i) => {
            if (item.LOCAL == "311217" && item.ORG == "SLV") {
              setprevLV17(item.PENRC);
              lv17 = 1;
            } else if (item.LOCAL == "311217" && item.ORG == "SSA") {
              setprevCV17(item.PENRC);
              cv17 = 1;
            } else if (item.LOCAL == "311212" && item.ORG == "SLV") {
              setprevLV12(item.PENRC);
              lv12 = 1;
            } else if (item.LOCAL == "311212" && item.ORG == "SSA") {
              setprevCV12(item.PENRC);
              cv12 = 1;
            } else if (item.LOCAL == "311258" && item.ORG == "SLV") {
              setprevLV58(item.PENRC);
              lv58 = 1;
            } else if (item.LOCAL == "311258" && item.ORG == "SSA") {
              setprevCV58(item.PENRC);
              cv58 = 1;
            }
          });

          if (cv12 == 0) {
            setprevCV12(0);
          }
          if (cv17 == 0) {
            setprevCV17(0);
          }
          if (lv12 == 0) {
            setprevLV12(0);
          }
          if (lv17 == 0) {
            setprevLV17(0);
          }
          if (cv58 == 0) {
            setprevCV58(0);
          }
          if (lv58 == 0) {
            setprevLV58(0);
          }
        } else {
          setprevLV17(0);
          setprevCV17(0);
          setprevLV12(0);
          setprevCV12(0);
          setprevLV58(0);
          setprevCV58(0);
        }

        cv12 = 0;
        cv17 = 0;
        lv12 = 0;
        lv17 = 0;
        cv58 = 0;
        lv58 = 0;

        var vlrliq = res.data[2];
        if (vlrliq.length > 0) {
          vlrliq.map((item, i) => {
            if (item.LOCAL == "311217" && item.ORG == "SLV") {
              setcostAmLV17(item.ValorLiq == null ? 0 : item.ValorLiq);

              lv17 = 1;
            } else if (item.LOCAL == "311217" && item.ORG == "SSA") {
              setcostAmCV17(item.ValorLiq == null ? 0 : item.ValorLiq);

              cv17 = 1;
            } else if (item.LOCAL == "311212" && item.ORG == "SLV") {
              setcostAmLV12(item.ValorLiq == null ? 0 : item.ValorLiq);

              lv12 = 1;
            } else if (item.LOCAL == "311212" && item.ORG == "SSA") {
              setcostAmCV12(item.ValorLiq == null ? 0 : item.ValorLiq);

              cv12 = 1;
            } else if (item.LOCAL == "311258" && item.ORG == "SLV") {
              setcostAmLV58(item.ValorLiq == null ? 0 : item.ValorLiq);

              lv58 = 1;
            } else if (item.LOCAL == "311258" && item.ORG == "SSA") {
              setcostAmCV58(item.ValorLiq == null ? 0 : item.ValorLiq);

              cv58 = 1;
            }
          });
          if (cv12 == 0) {
            setcostAmCV12(0);
          }
          if (cv17 == 0) {
            setcostAmCV17(0);
          }
          if (lv12 == 0) {
            setcostAmLV12(0);
          }
          if (lv17 == 0) {
            setcostAmLV17(0);
          }
          if (cv58 == 0) {
            setcostAmCV58(0);
          }
          if (lv58 == 0) {
            setcostAmLV58(0);
          }
        } else {
          setcostAmLV17(0);
          setcostAmCV17(0);
          setcostAmLV12(0);
          setcostAmCV12(0);
          setcostAmLV58(0);
          setcostAmCV58(0);
        }
      }

      var back = res.data[3];
      cv12 = 0;
      cv17 = 0;
      lv12 = 0;
      lv17 = 0;
      cv58 = 0;
      lv58 = 0;
      if (back.length > 0) {
        back.map((item, i) => {
          if (item.LOCAL == "311217" && item.ORG == "SLV") {
            setbacklogLV17(
              item.PENDENTE_OC == null || item.PENDENTE_OC == 0
                ? item.PENDENTE_RC
                : item.PENDENTE_OC
            );
            lv17 = 1;
          } else if (item.LOCAL == "311217" && item.ORG == "SSA") {
            setbacklogCV17(
              item.PENDENTE_OC == null || item.PENDENTE_OC == 0
                ? item.PENDENTE_RC
                : item.PENDENTE_OC
            );
            cv17 = 1;
          } else if (item.LOCAL == "311212" && item.ORG == "SLV") {
            setbacklogLV12(
              item.PENDENTE_OC == null || item.PENDENTE_OC == 0
                ? item.PENDENTE_RC
                : item.PENDENTE_OC
            );
            lv12 = 1;
          } else if (item.LOCAL == "311212" && item.ORG == "SSA") {
            setbacklogCV12(
              item.PENDENTE_OC == null || item.PENDENTE_OC == 0
                ? item.PENDENTE_RC
                : item.PENDENTE_OC
            );
            cv12 = 1;
          } else if (item.LOCAL == "311258" && item.ORG == "SLV") {
            setbacklogLV58(
              item.PENDENTE_OC == null || item.PENDENTE_OC == 0
                ? item.PENDENTE_RC
                : item.PENDENTE_OC
            );
            lv58 = 1;
          } else if (item.LOCAL == "311258" && item.ORG == "SSA") {
            setbacklogCV58(
              item.PENDENTE_OC == null || item.PENDENTE_OC == 0
                ? item.PENDENTE_RC
                : item.PENDENTE_OC
            );
            cv58 = 1;
          }
        });

        if (cv12 == 0) {
          setbacklogCV12(0);
        }
        if (cv17 == 0) {
          setbacklogCV17(0);
        }
        if (lv12 == 0) {
          setbacklogLV12(0);
        }
        if (lv17 == 0) {
          setbacklogLV17(0);
        }
        if (cv58 == 0) {
          setbacklogCV58(0);
        }
        if (lv58 == 0) {
          setbacklogLV58(0);
        }
      } else {
        setbacklogCV12(0);
        setbacklogCV17(0);
        setbacklogLV12(0);
        setbacklogLV17(0);
        setbacklogCV58(0);
        setbacklogLV58(0);
      }

      setLoad(false);
    } catch (err) {
      Notificacao(["erro", `Erro ao buscar valores de ${mes}/${ano}`]);
      console.log(err);
      setLoad(false);
    }
  };

  const getCostAmount = async () => {
    setLoad(true);

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getCostAmountOutros`,
        {
          params: {
            mes,
            ano,
            mesNum: monthNames.indexOf(mes) + 1,
            prep: prep,
          },
        }
      );
      if (res?.data?.code) {
        setcostAmLV17(0);
        setcostAmCV17(0);
        setcostAmLV12(0);
        setcostAmCV12(0);
        setcostAmLV58(0);
        setcostAmCV58(0);
        Notificacao(["erro", `Erro ao buscar valores de ${mes}/${ano}`]);
      } else {
        var cv12 = 0;
        var cv17 = 0;
        var lv12 = 0;
        var lv17 = 0;
        var cv58 = 0;
        var lv58 = 0;
        var vlrliq = res.data;
        if (vlrliq.length > 0) {
          vlrliq.map((item, i) => {
            if (item.LOCAL == "311217" && item.ORG == "SLV") {
              setcostAmLV17(item.ValorLiq == null ? 0 : item.ValorLiq);

              lv17 = 1;
            } else if (item.LOCAL == "311217" && item.ORG == "SSA") {
              setcostAmCV17(item.ValorLiq == null ? 0 : item.ValorLiq);

              cv17 = 1;
            } else if (item.LOCAL == "311212" && item.ORG == "SLV") {
              setcostAmLV12(item.ValorLiq == null ? 0 : item.ValorLiq);

              lv12 = 1;
            } else if (item.LOCAL == "311212" && item.ORG == "SSA") {
              setcostAmCV12(item.ValorLiq == null ? 0 : item.ValorLiq);

              cv12 = 1;
            } else if (item.LOCAL == "311258" && item.ORG == "SLV") {
              setcostAmLV58(item.ValorLiq == null ? 0 : item.ValorLiq);

              lv58 = 1;
            } else if (item.LOCAL == "311258" && item.ORG == "SSA") {
              setcostAmCV58(item.ValorLiq == null ? 0 : item.ValorLiq);

              cv58 = 1;
            }
          });
          if (cv12 == 0) {
            setcostAmCV12(0);
          }
          if (cv17 == 0) {
            setcostAmCV17(0);
          }
          if (lv12 == 0) {
            setcostAmLV12(0);
          }
          if (lv17 == 0) {
            setcostAmLV17(0);
          }
          if (cv58 == 0) {
            setcostAmCV58(0);
          }
          if (lv58 == 0) {
            setcostAmLV58(0);
          }
        } else {
          setcostAmLV17(0);
          setcostAmCV17(0);
          setcostAmLV12(0);
          setcostAmCV12(0);
          setcostAmLV58(0);
          setcostAmCV58(0);
        }
      }

      setLoad(false);
    } catch (err) {
      Notificacao(["erro", `Erro ao buscar valores de ${mes}/${ano}`]);
      console.log(err);
      setLoad(false);
    }
  };

  useEffect(() => {
    getAllCust();
  }, [mes, ano]);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    getCostAmount();
  }, [prep]);

  const textareaRef = useRef();

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        if (document.activeElement !== textareaRef.current) {
          event.preventDefault();
          getAllCust();
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div>
      <div className="flex tablet:mt-20 ">
        <div className="w-full laptop:mx-10 desktop:mx-10 ">
          <table className="w-full border-separate tablet:table-fixed border-spacing-0 tablet:-ml-5 tablet:w-[106%] [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]">
            <thead className=" ">
              <tr className="">
                <th
                  colSpan={"2"}
                  rowSpan={"3"}
                  className="relative text-center laptop:w-[8%] desktop:w-[8%] "
                >
                  <div className="flex w-fit mx-auto tablet:absolute tablet:ml-9 laptop:-mt-5 desktop:-mt-5 tablet:mt-[-5em]">
                    <select
                      id="large"
                      value={mes}
                      className={
                        "block w-fit px-2 py-2 text-xl tablet:text-base  mx-2 font-bold tablet:mx-1 text-gray-900 border-2 focus:-outline-offset-0 focus:outline-none " +
                        styleAll.inputSemW
                      }
                      onChange={(e) => setMes(e.target.value)}
                    >
                      {monthNames.map((mes, i) => {
                        if (i == new Date().getMonth()) {
                          return (
                            <option value={mes} key={i}>
                              {mes}
                            </option>
                          );
                        } else {
                          return (
                            <option value={mes} key={i}>
                              {mes}
                            </option>
                          );
                        }
                      })}
                    </select>
                    <select
                      id="large"
                      onChange={(e) => setAno(e.target.value)}
                      value={ano}
                      className={
                        "block w-fit px-2 py-2 text-xl tablet:text-base  font-bold mx-2 tablet:mx-1 text-gray-900 border-2 focus:-outline-offset-0 focus:outline-none " +
                        styleAll.inputSemW
                      }
                    >
                      <option value={new Date().getFullYear()}>
                        {new Date().getFullYear()}
                      </option>
                      <option value={new Date().getFullYear() - 1}>
                        {new Date().getFullYear() - 1}
                      </option>
                    </select>
                  </div>
                  <div className="laptop:mt-5 desktop:mt-5 w-full tablet:absolute tablet:mt-[-5em] tablet:ml-64">
                    <button
                      className="flex bg-dana text-center mx-auto rounded-md px-6 tablet:px-3 duration-200 hover:scale-105 text-xl tablet:text-lg  font-bold tablet:p-1 laptop:p-2 desktop:p-2"
                      onClick={() => {
                        getAllCust();
                      }}
                    >
                      Atualizar
                      <HiOutlineRefresh className="my-auto mx-auto ml-[0.25em] text-2xl" />
                    </button>
                  </div>
                </th>
                <th className="relative text-center w-[10%]  p-3 tablet:p-1 border-2  border-r-0 border-b-0  rounded-ss-lg bg-[#0C3A57]  ">
                  <div className="text-xl tablet:text-base  font-bold tablet:hidden">
                    AOP
                  </div>
                  <div className="text-lg font-bold tablet:text-xs">[1]</div>
                </th>
                <th className="relative text-center w-[10%] p-3 tablet:p-1 border-t-2 border-x-2 bg-[#0C3A57] 0C3A57 125884">
                  <div className="text-xl tablet:text-base  font-bold tablet:hidden">
                    PROVISÃO E REDUÇÕES
                  </div>
                  <div className="text-lg font-bold tablet:text-xs">[2]</div>
                </th>
                <th className="relative text-center w-[10%] p-3 tablet:p-1 border-t-2  bg-[#5c8ab2]  7fa3c2">
                  <div className="text-xl tablet:text-base  font-bold tablet:hidden">
                    FCST
                  </div>
                  <div className="text-lg font-bold tablet:text-xs">
                    [3] = [1] + [2]
                  </div>
                </th>
                <th className="relative text-center w-[10%] p-3 tablet:p-1 border-t-2 border-x-2  bg-[#618857]  7aa36f ">
                  <div className="text-xl tablet:text-base  font-bold tablet:hidden ">
                    COST AMOUNT
                  </div>
                  <div className="text-lg font-bold tablet:text-xs">[4]</div>
                </th>
                <th className="relative text-center w-[10%] p-3 tablet:p-1 border-t-2  bg-[#d99a10] efb22d efb22d ">
                  <div className="text-xl tablet:text-base  font-bold tablet:hidden">
                    SALDO
                  </div>
                  <div className="text-lg font-bold tablet:text-xs">
                    [5] = [3] - [4]
                  </div>
                </th>
                <th className="relative text-center w-[10%] p-3 tablet:p-1 border-t-2 border-x-2   bg-[#816cbb]  9F8FCB">
                  <div className="text-xl tablet:text-base  font-bold tablet:hidden">
                    PREVISÃO ESSE MES + ENTREGUE
                  </div>
                  <div className="text-lg font-bold tablet:text-xs">[6]</div>
                </th>
                <th className="relative text-center w-[10%] p-3 tablet:p-1 border-t-2  bg-[#8b7b59]  a59572">
                  <div className="text-xl tablet:text-base  font-bold tablet:hidden">
                    SALDO LIVRE
                  </div>
                  <div className="text-lg font-bold tablet:text-xs">
                    [7] = [5]-[6]
                  </div>
                </th>
                <th className="relative text-center w-[10%] p-3 tablet:p-1 border-2 border-b-0 rounded-se-lg bg-[#747474]  8d8d8d">
                  <div className="text-xl tablet:text-base  font-bold tablet:hidden">
                    BACKLOG RC GERAL
                  </div>
                  <div className="text-xs  font-bold laptop:hidden desktop:hidden">
                    BACKLOG RC GERAL
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-xl tablet:text-lg  font-medium">
              <tr className="">
                <td
                  rowSpan="4"
                  className="relative text-center  border-2 rounded-s-lg  bg-[#] p-3 tablet:p-1 "
                >
                  <div className="text-4xl tablet:text-2xl font-bold ">LV</div>
                  <div className="text-lg tablet:text-base font-bold ">
                    (SLV)
                  </div>
                </td>

                <td className="relative text-center border-l-2 border-t-2 text-3xl bg-[#] font-bold laptop:p-3 desktop:p-3 tablet:p-1 ">
                  <div className="text-xl tablet:text-sm  font-bold">
                    222203
                  </div>
                  <div className="text-xl tablet:text-sm  font-bold">
                    (311212)
                  </div>
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-t-2  laptop:break-words desktop:break-words border-l-2 bg-[#125884]  flex-wrap border-[#fff] "${
                    aopLV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopLV12).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-t-2 border-x-2  laptop:break-words desktop:break-words bg-[#125884]  flex-wrap border-[#fff] "${
                    proLV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(proLV12).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   border-t-2 laptop:break-words desktop:break-words  bg-[#7fa3c2] flex-wrap border-[#fff] "${
                    aopLV12 + proLV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopLV12 + proLV12).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-t-2 border-x-2 bg-[#7aa36f] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    costAmLV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(costAmLV12).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-t-2  laptop:break-words desktop:break-words bg-[#efb22d]  flex-wrap border-[#fff] "${
                    aopLV12 + proLV12 - costAmLV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopLV12 + proLV12 - costAmLV12).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-t-2 border-x-2 bg-[#9F8FCB] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    prevLV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(prevLV12).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-t-2  laptop:break-words desktop:break-words  bg-[#a59572] flex-wrap border-[#fff] "${
                    aopLV12 + proLV12 - costAmLV12 - prevLV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopLV12 + proLV12 - costAmLV12 - prevLV12).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-t-2 border-x-2 bg-[#8d8d8d] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    backlogLV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(backlogLV12).toFixed(0))}
                </td>
              </tr>
              <tr>
                <td className="relative text-center border-2 border-r-0 text-3xl bg-[#] font-bold laptop:p-3 desktop:p-3 tablet:p-1 ">
                  <div className="text-xl tablet:text-sm font-bold">222213</div>
                  <div className="text-xl tablet:text-sm  font-bold">
                    (311217)
                  </div>
                </td>
                {/*AOP*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2 border-l-2  laptop:break-words desktop:break-words bg-[#125884] flex-wrap border-[#fff] "${
                    aopLV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopLV17).toFixed(0))}
                </td>
                {/*PROVISÃO E REDUÇÕES*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2  laptop:break-words desktop:break-words  bg-[#125884] flex-wrap border-[#fff] "${
                    proLV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(proLV17).toFixed(0))}
                </td>
                {/*FCST*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2  laptop:break-words desktop:break-words bg-[#7fa3c2]  flex-wrap border-[#fff] "${
                    aopLV17 + proLV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopLV17 + proLV17).toFixed(0))}
                </td>
                {/*COST AMOUNT*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2  laptop:break-words desktop:break-words bg-[#7aa36f]  flex-wrap border-[#fff] "${
                    costAmLV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(costAmLV17).toFixed(0))}
                </td>
                {/*SALDO*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2  laptop:break-words desktop:break-words  bg-[#efb22d]  flex-wrap border-[#fff] "${
                    aopLV17 + proLV17 - costAmLV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopLV17 + proLV17 - costAmLV17).toFixed(0)
                  )}
                </td>
                {/*PREVISAO*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2  laptop:break-words desktop:break-words bg-[#9F8FCB]  flex-wrap border-[#fff] "${
                    prevLV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(prevLV17).toFixed(0))}
                </td>
                {/*SALDO LIVRE*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2 border-[#fff] laptop:break-words desktop:break-words bg-[#a59572]  flex-wrap "${
                    aopLV17 + proLV17 - costAmLV17 - prevLV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)] "
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopLV17 + proLV17 - costAmLV17 - prevLV17).toFixed(0)
                  )}
                </td>
                {/*BACKLOG*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2 laptop:break-words desktop:break-words  bg-[#8d8d8d] flex-wrap border-[#fff] "${
                    backlogLV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(backlogLV17).toFixed(0))}
                </td>
              </tr>
              <tr>
                <td className="relative text-center border-l-2 border-b-2 text-3xl bg-[#] font-bold laptop:p-3 desktop:p-3 tablet:p-1 ">
                  <div className="text-xl tablet:text-sm  font-bold">
                    222430
                  </div>
                  <div className="text-xl tablet:text-sm  font-bold">
                    (311258)
                  </div>
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2  laptop:break-words desktop:break-words border-l-2 bg-[#125884]  flex-wrap border-[#fff] "${
                    aopLV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopLV58).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2  laptop:break-words desktop:break-words bg-[#125884]  flex-wrap border-[#fff] "${
                    proLV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(proLV58).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   border-b-2 laptop:break-words desktop:break-words  bg-[#7fa3c2] flex-wrap border-[#fff] "${
                    aopLV58 + proLV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopLV58 + proLV58).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2 bg-[#7aa36f] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    costAmLV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(costAmLV58).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2  laptop:break-words desktop:break-words bg-[#efb22d]  flex-wrap border-[#fff] "${
                    aopLV58 + proLV58 - costAmLV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopLV58 + proLV58 - costAmLV58).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2 bg-[#9F8FCB] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    prevLV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(prevLV58).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2  laptop:break-words desktop:break-words  bg-[#a59572] flex-wrap border-[#fff] "${
                    aopLV58 + proLV58 - costAmLV58 - prevLV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopLV58 + proLV58 - costAmLV58 - prevLV58).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2 border-x-2 bg-[#8d8d8d] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    backlogLV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(backlogLV58).toFixed(0))}
                </td>
              </tr>

              <tr>
                <td className="relative text-center border-l-2 border-b-2 text-3xl bg-[#] font-bold laptop:p-3 desktop:p-3 tablet:p-1 ">
                  <div className="text-2xl tablet:text-lg  font-bold">
                    TOTAL
                  </div>
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border laptop:break-words desktop:break-words border-b-2 border-l-2   flex-wrap border-[#fff] "${
                    aopLV17 + aopLV12 + aopLV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopLV17 + aopLV12 + aopLV58).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-x-2 border-b-2 laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    proLV17 + proLV12 + proLV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(proLV17 + proLV12 + proLV58).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words border-b-2 flex-wrap border-[#fff] "${
                    aopLV17 + proLV17 + aopLV12 + proLV12 + proLV58 + aopLV58 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopLV17 + proLV17 + aopLV12 + proLV12 + proLV58 + aopLV58
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-x-2  border-b-2 laptop:break-words desktop:break-words  flex-wrap border-[#fff] "${
                    costAmLV17 + costAmLV12 + costAmLV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(costAmLV17 + costAmLV12 + costAmLV58).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 laptop:break-words desktop:break-words  flex-wrap border-[#fff] "${
                    aopLV17 +
                      proLV17 -
                      costAmLV17 +
                      (aopLV12 + proLV12 - costAmLV12) +
                      (aopLV58 + proLV58 - costAmLV58) <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopLV17 +
                        proLV17 -
                        costAmLV17 +
                        (aopLV12 + proLV12 - costAmLV12) +
                        (aopLV58 + proLV58 - costAmLV58)
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-x-2 border-b-2 laptop:break-words desktop:break-words  flex-wrap border-[#fff] "${
                    prevLV17 + prevLV12 + prevLV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(prevLV17 + prevLV12 + prevLV58).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2  laptop:break-words desktop:break-words  flex-wrap border-[#fff] "${
                    aopLV17 +
                      proLV17 -
                      costAmLV17 -
                      prevLV17 +
                      aopLV12 +
                      proLV12 -
                      costAmLV12 -
                      prevLV12 +
                      aopLV58 +
                      proLV58 -
                      costAmLV58 -
                      prevLV58 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopLV17 +
                        proLV17 -
                        costAmLV17 -
                        prevLV17 +
                        aopLV12 +
                        proLV12 -
                        costAmLV12 -
                        prevLV12 +
                        aopLV58 +
                        proLV58 -
                        costAmLV58 -
                        prevLV58
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2 laptop:break-words desktop:break-words rounded-ee-lg flex-wrap border-[#fff] "${
                    backlogLV12 + backlogLV17 + backlogLV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(backlogLV12 + backlogLV17 + backlogLV58).toFixed(0)
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="10" className="p-3 tablet:p-1 "></td>
              </tr>
              <tr className="">
                <td
                  rowSpan="4"
                  className="relative text-center  border-2 rounded-s-lg  bg-[#] p-3 tablet:p-1 "
                >
                  <div className="text-4xl tablet:text-2xl font-bold ">CV</div>
                  <div className="text-lg tablet:text-base font-bold ">
                    (SSA)
                  </div>
                </td>

                <td className="relative text-center border-l-2 border-t-2 text-3xl bg-[#] font-bold laptop:p-3 desktop:p-3 tablet:p-1 ">
                  <div className="text-xl tablet:text-sm  font-bold">
                    222203
                  </div>
                  <div className="text-xl tablet:text-sm  font-bold">
                    (311212)
                  </div>
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-t-2  laptop:break-words desktop:break-words border-l-2 bg-[#125884]  flex-wrap border-[#fff] "${
                    aopCV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopCV12).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-t-2 border-x-2  laptop:break-words desktop:break-words bg-[#125884]  flex-wrap border-[#fff] "${
                    proCV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(proCV12).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   border-t-2 laptop:break-words desktop:break-words  bg-[#7fa3c2] flex-wrap border-[#fff] "${
                    aopCV12 + proCV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopCV12 + proCV12).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-t-2 border-x-2 bg-[#7aa36f] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    costAmCV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(costAmCV12).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-t-2  laptop:break-words desktop:break-words bg-[#efb22d]  flex-wrap border-[#fff] "${
                    aopCV12 + proCV12 - costAmCV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopCV12 + proCV12 - costAmCV12).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-t-2 border-x-2 bg-[#9F8FCB] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    prevCV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(prevCV12).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-t-2  laptop:break-words desktop:break-words  bg-[#a59572] flex-wrap border-[#fff] "${
                    aopCV12 + proCV12 - costAmCV12 - prevCV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopCV12 + proCV12 - costAmCV12 - prevCV12).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-t-2 border-x-2 bg-[#8d8d8d] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    backlogCV12 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(backlogCV12).toFixed(0))}
                </td>
              </tr>
              <tr>
                <td className="relative text-center border-2 border-r-0 text-3xl bg-[#] font-bold laptop:p-3 desktop:p-3 tablet:p-1 ">
                  <div className="text-xl tablet:text-sm font-bold">222213</div>
                  <div className="text-xl tablet:text-sm  font-bold">
                    (311217)
                  </div>
                </td>
                {/*AOP*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2 border-l-2  laptop:break-words desktop:break-words bg-[#125884] flex-wrap border-[#fff] "${
                    aopCV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopCV17).toFixed(0))}
                </td>
                {/*PROVISÃO E REDUÇÕES*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2  laptop:break-words desktop:break-words  bg-[#125884] flex-wrap border-[#fff] "${
                    proCV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(proCV17).toFixed(0))}
                </td>
                {/*FCST*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2  laptop:break-words desktop:break-words bg-[#7fa3c2]  flex-wrap border-[#fff] "${
                    aopCV17 + proCV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopCV17 + proCV17).toFixed(0))}
                </td>
                {/*COST AMOUNT*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2  laptop:break-words desktop:break-words bg-[#7aa36f]  flex-wrap border-[#fff] "${
                    costAmCV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(costAmCV17).toFixed(0))}
                </td>
                {/*SALDO*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2  laptop:break-words desktop:break-words  bg-[#efb22d]  flex-wrap border-[#fff] "${
                    aopCV17 + proCV17 - costAmCV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopCV17 + proCV17 - costAmCV17).toFixed(0)
                  )}
                </td>
                {/*PREVISAO*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2  laptop:break-words desktop:break-words bg-[#9F8FCB]  flex-wrap border-[#fff] "${
                    prevCV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(prevCV17).toFixed(0))}
                </td>
                {/*SALDO LIVRE*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2 border-[#fff] laptop:break-words desktop:break-words bg-[#a59572]  flex-wrap "${
                    aopCV17 + proCV17 - costAmCV17 - prevCV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)] "
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopCV17 + proCV17 - costAmCV17 - prevCV17).toFixed(0)
                  )}
                </td>
                {/*BACKLOG*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2 laptop:break-words desktop:break-words  bg-[#8d8d8d] flex-wrap border-[#fff] "${
                    backlogCV17 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(backlogCV17).toFixed(0))}
                </td>
              </tr>
              <tr>
                <td className="relative text-center border-l-2 border-b-2 text-3xl bg-[#] font-bold laptop:p-3 desktop:p-3 tablet:p-1 ">
                  <div className="text-xl tablet:text-sm  font-bold">
                    222430
                  </div>
                  <div className="text-xl tablet:text-sm  font-bold">
                    (311258)
                  </div>
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2  laptop:break-words desktop:break-words border-l-2 bg-[#125884]  flex-wrap border-[#fff] "${
                    aopCV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopCV58).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2  laptop:break-words desktop:break-words bg-[#125884]  flex-wrap border-[#fff] "${
                    proCV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(proCV58).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   border-b-2 laptop:break-words desktop:break-words  bg-[#7fa3c2] flex-wrap border-[#fff] "${
                    aopCV58 + proCV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopCV58 + proCV58).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2 bg-[#7aa36f] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    costAmCV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(costAmCV58).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2  laptop:break-words desktop:break-words bg-[#efb22d]  flex-wrap border-[#fff] "${
                    aopCV58 + proCV58 - costAmCV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopCV58 + proCV58 - costAmCV58).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2 bg-[#9F8FCB] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    prevCV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(prevCV58).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2  laptop:break-words desktop:break-words  bg-[#a59572] flex-wrap border-[#fff] "${
                    aopCV58 + proCV58 - costAmCV58 - prevCV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopCV58 + proCV58 - costAmCV58 - prevCV58).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2 border-x-2 bg-[#8d8d8d] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    backlogCV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(backlogCV58).toFixed(0))}
                </td>
              </tr>

              <tr>
                <td className="relative text-center border-l-2 border-b-2 text-3xl bg-[#] font-bold laptop:p-3 desktop:p-3 tablet:p-1 ">
                  <div className="text-2xl tablet:text-lg  font-bold">
                    TOTAL
                  </div>
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border laptop:break-words desktop:break-words border-b-2 border-l-2   flex-wrap border-[#fff] "${
                    aopCV17 + aopCV12 + aopCV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopCV17 + aopCV12 + aopCV58).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-x-2 border-b-2 laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    proCV17 + proCV12 + proCV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(proCV17 + proCV12 + proCV58).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words border-b-2 flex-wrap border-[#fff] "${
                    aopCV17 + proCV17 + aopCV12 + proCV12 + proCV58 + aopCV58 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopCV17 + proCV17 + aopCV12 + proCV12 + proCV58 + aopCV58
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-x-2  border-b-2 laptop:break-words desktop:break-words  flex-wrap border-[#fff] "${
                    costAmCV17 + costAmCV12 + costAmCV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(costAmCV17 + costAmCV12 + costAmCV58).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 laptop:break-words desktop:break-words  flex-wrap border-[#fff] "${
                    aopCV17 +
                      proCV17 -
                      costAmCV17 +
                      (aopCV12 + proCV12 - costAmCV12) +
                      (aopCV58 + proCV58 - costAmCV58) <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopCV17 +
                        proCV17 -
                        costAmCV17 +
                        (aopCV12 + proCV12 - costAmCV12) +
                        (aopCV58 + proCV58 - costAmCV58)
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-x-2 border-b-2 laptop:break-words desktop:break-words  flex-wrap border-[#fff] "${
                    prevCV17 + prevCV12 + prevCV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(prevCV17 + prevCV12 + prevCV58).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2  laptop:break-words desktop:break-words  flex-wrap border-[#fff] "${
                    aopCV17 +
                      proCV17 -
                      costAmCV17 -
                      prevCV17 +
                      aopCV12 +
                      proCV12 -
                      costAmCV12 -
                      prevCV12 +
                      aopCV58 +
                      proCV58 -
                      costAmCV58 -
                      prevCV58 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopCV17 +
                        proCV17 -
                        costAmCV17 -
                        prevCV17 +
                        aopCV12 +
                        proCV12 -
                        costAmCV12 -
                        prevCV12 +
                        aopCV58 +
                        proCV58 -
                        costAmCV58 -
                        prevCV58
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2 laptop:break-words desktop:break-words rounded-ee-lg flex-wrap border-[#fff] "${
                    backlogCV12 + backlogCV17 + backlogCV58 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(backlogCV12 + backlogCV17 + backlogCV58).toFixed(0)
                  )}
                </td>
              </tr>

              <tr>
                <td className="relative text-center  text-3xl font-bold rounded-es-md p-3 tablet:p-1 "></td>
                <td className="relative text-center  text-3xl font-bold rounded-es-md p-3 tablet:p-1 "></td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    aopCV17 + aopCV12 + aopLV17 + aopLV12 + aopCV58 + aopLV58 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopCV17 + aopCV12 + aopLV17 + aopLV12 + aopCV58 + aopLV58
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    proCV17 + proCV12 + proLV17 + proLV12 + proCV58 + proLV58 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      proCV17 + proCV12 + proLV17 + proLV12 + proCV58 + proLV58
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    aopCV17 +
                      proCV17 +
                      aopCV12 +
                      proCV12 +
                      aopLV17 +
                      proLV17 +
                      aopLV12 +
                      proLV12 +
                      aopCV58 +
                      proCV58 +
                      aopLV58 +
                      proLV58 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopCV17 +
                        proCV17 +
                        aopCV12 +
                        proCV12 +
                        aopLV17 +
                        proLV17 +
                        aopLV12 +
                        proLV12 +
                        aopCV58 +
                        proCV58 +
                        aopLV58 +
                        proLV58
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    costAmCV17 +
                      costAmCV12 +
                      costAmLV17 +
                      costAmLV12 +
                      costAmCV58 +
                      costAmLV58 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      costAmCV17 +
                        costAmCV12 +
                        costAmLV17 +
                        costAmLV12 +
                        costAmCV58 +
                        costAmLV58
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    aopCV17 +
                      proCV17 -
                      costAmCV17 +
                      (aopCV12 + proCV12 - costAmCV12) +
                      aopLV17 +
                      proLV17 -
                      costAmLV17 +
                      (aopLV12 + proLV12 - costAmLV12) +
                      aopCV58 +
                      proCV58 -
                      costAmCV58 +
                      aopLV58 +
                      proLV58 -
                      costAmLV58 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopCV17 +
                        proCV17 -
                        costAmCV17 +
                        (aopCV12 + proCV12 - costAmCV12) +
                        aopLV17 +
                        proLV17 -
                        costAmLV17 +
                        (aopLV12 + proLV12 - costAmLV12) +
                        aopCV58 +
                        proCV58 -
                        costAmCV58 +
                        aopLV58 +
                        proLV58 -
                        costAmLV58
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    prevCV17 +
                      prevCV12 +
                      prevLV17 +
                      prevLV12 +
                      prevCV58 +
                      prevLV58 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      prevCV17 +
                        prevCV12 +
                        prevLV17 +
                        prevLV12 +
                        prevCV58 +
                        prevLV58
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    aopCV17 +
                      proCV17 -
                      costAmCV17 -
                      prevCV17 +
                      aopCV12 +
                      proCV12 -
                      costAmCV12 -
                      prevCV12 +
                      aopLV17 +
                      proLV17 -
                      costAmLV17 -
                      prevLV17 +
                      aopLV12 +
                      proLV12 -
                      costAmLV12 -
                      prevLV12 +
                      aopCV58 +
                      proCV58 -
                      costAmCV58 -
                      prevCV58 +
                      aopLV58 +
                      proLV58 -
                      costAmLV58 -
                      prevLV58 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopCV17 +
                        proCV17 -
                        costAmCV17 -
                        prevCV17 +
                        aopCV12 +
                        proCV12 -
                        costAmCV12 -
                        prevCV12 +
                        aopLV17 +
                        proLV17 -
                        costAmLV17 -
                        prevLV17 +
                        aopLV12 +
                        proLV12 -
                        costAmLV12 -
                        prevLV12 +
                        aopCV58 +
                        proCV58 -
                        costAmCV58 -
                        prevCV58 +
                        aopLV58 +
                        proLV58 -
                        costAmLV58 -
                        prevLV58
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    backlogLV12 +
                      backlogLV17 +
                      backlogCV17 +
                      backlogCV12 +
                      backlogLV58 +
                      backlogCV58 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      backlogLV12 +
                        backlogLV17 +
                        backlogCV17 +
                        backlogCV12 +
                        backlogLV58 +
                        backlogCV58
                    ).toFixed(0)
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
