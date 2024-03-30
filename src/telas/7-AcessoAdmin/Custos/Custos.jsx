import React, { useEffect, useRef, useState } from "react";
import { styleAll } from "../../../css";
import { HiOutlineRefresh } from "react-icons/hi";
import Notificacao from "../../components/Notificacao";
import axios from "axios";
import SelectOpt from "../../components/Graficos/SelectOpt";
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

  const [aopLV50, setaopLV50] = useState(0);
  const [aopLV49, setaopLV49] = useState(0);

  const [proLV50, setproLV50] = useState(0);
  const [proLV49, setproLV49] = useState(0);

  const [costAmLV50, setcostAmLV50] = useState(0);
  const [costAmLV49, setcostAmLV49] = useState(0);

  const [prevLV50, setprevLV50] = useState(0);
  const [prevLV49, setprevLV49] = useState(0);

  const [aopCV50, setaopCV50] = useState(0);
  const [aopCV49, setaopCV49] = useState(0);

  const [proCV50, setproCV50] = useState(0);
  const [proCV49, setproCV49] = useState(0);

  const [costAmCV50, setcostAmCV50] = useState(0);
  const [costAmCV49, setcostAmCV49] = useState(0);

  const [prevCV50, setprevCV50] = useState(0);
  const [prevCV49, setprevCV49] = useState(0);

  const [backlogLV50, setbacklogLV50] = useState(0);
  const [backlogLV49, setbacklogLV49] = useState(0);

  const [backlogCV50, setbacklogCV50] = useState(0);
  const [backlogCV49, setbacklogCV49] = useState(0);

  const [resumoCV, setresumoCV] = useState(0);
  const [resumoLV, setresumoLV] = useState(0);

  const [texto, setTexto] = useState("");

  const gravarTexto = async () => {
    try {
      const res = await axios.post(
        `http://${import.meta.env.VITE_IP}/gravarTexto`,
        {
          params: {
            mes,
            ano,
            texto: texto,
          },
        }
      );
      if (res.data == "sucesso") {
        Notificacao([
          "sucesso",
          `Texto gravado com sucesso para ${mes}/${ano}`,
        ]);
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao gravar Texto"]);
      console.log(err);
    }
  };

  const getAllCust = async () => {
    setLoad(true);

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getAllCust`,
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
        setresumoCV(0);
        setresumoLV(0);
        setaopLV50(0);
        setaopLV49(0);
        setproLV50(0);
        setproLV49(0);
        setaopCV50(0);
        setaopCV49(0);
        setproCV50(0);
        setproCV49(0);
        setcostAmLV49(0);
        setprevLV49(0);
        setcostAmCV49(0);
        setprevCV49(0);
        setcostAmLV50(0);
        setprevLV50(0);
        setcostAmCV50(0);
        setprevCV50(0);
        setbacklogLV50(0);
        setbacklogLV49(0);
        setbacklogCV50(0);
        setbacklogCV49(0);
        setTexto("");
        Notificacao(["erro", `Erro ao buscar valores de ${mes}/${ano}`]);
      } else {
        var valoresCon = res.data[0]?.[0];

        if (res.data[0].length > 0) {
          setTexto(valoresCon.Texto == null ? "" : valoresCon.Texto);
          setaopLV50(
            valoresCon.ValLVC50Bud == null ? 0 : valoresCon.ValLVC50Bud
          );
          setaopLV49(
            valoresCon.ValLVC49Bud == null ? 0 : valoresCon.ValLVC49Bud
          );
          setproLV50(
            valoresCon.ValLVC50Pro == null ? 0 : valoresCon.ValLVC50Pro
          );
          setproLV49(
            valoresCon.ValLVC49Pro == null ? 0 : valoresCon.ValLVC49Pro
          );

          setaopCV50(
            valoresCon.ValCVC50Bud == null ? 0 : valoresCon.ValCVC50Bud
          );
          setaopCV49(
            valoresCon.ValCVC49Bud == null ? 0 : valoresCon.ValCVC49Bud
          );
          setproCV50(
            valoresCon.ValCVC50Pro == null ? 0 : valoresCon.ValCVC50Pro
          );
          setproCV49(
            valoresCon.ValCVC49Pro == null ? 0 : valoresCon.ValCVC49Pro
          );
          setresumoCV(valoresCon.resumoCV == null ? 0 : valoresCon.resumoCV);
          setresumoLV(valoresCon.resumoLV == null ? 0 : valoresCon.resumoLV);
        } else {
          setaopLV50(0);
          setaopLV49(0);
          setproLV50(0);
          setproLV49(0);
          setaopCV50(0);
          setaopCV49(0);
          setproCV50(0);
          setproCV49(0);
          setresumoCV(0);
          setresumoLV(0);
          setTexto("");
        }

        var pendente = res.data[1];
        var cv50 = 0;
        var cv49 = 0;
        var lv50 = 0;
        var lv49 = 0;

        if (pendente.length > 0) {
          pendente.map((item, i) => {
            if (item.LOCAL == "311249" && item.ORG == "SLV") {
              setprevLV49(item.PENRC);
              lv49 = 1;
            } else if (item.LOCAL == "311249" && item.ORG == "SSA") {
              setprevCV49(item.PENRC);
              cv49 = 1;
            } else if (item.LOCAL == "311250" && item.ORG == "SLV") {
              setprevLV50(item.PENRC);
              lv50 = 1;
            } else if (item.LOCAL == "311250" && item.ORG == "SSA") {
              setprevCV50(item.PENRC);
              cv50 = 1;
            }
          });

          if (cv50 == 0) {
            setprevCV50(0);
          }
          if (cv49 == 0) {
            setprevCV49(0);
          }
          if (lv50 == 0) {
            setprevLV50(0);
          }
          if (lv49 == 0) {
            setprevLV49(0);
          }
        } else {
          setprevLV49(0);
          setprevCV49(0);
          setprevLV50(0);
          setprevCV50(0);
        }

        cv50 = 0;
        cv49 = 0;
        lv50 = 0;
        lv49 = 0;

        var vlrliq = res.data[2];
        if (vlrliq.length > 0) {
          vlrliq.map((item, i) => {
            if (item.LOCAL == "311249" && item.ORG == "SLV") {
              setcostAmLV49(item.ValorLiq == null ? 0 : item.ValorLiq);

              lv49 = 1;
            } else if (item.LOCAL == "311249" && item.ORG == "SSA") {
              setcostAmCV49(item.ValorLiq == null ? 0 : item.ValorLiq);

              cv49 = 1;
            } else if (item.LOCAL == "311250" && item.ORG == "SLV") {
              setcostAmLV50(item.ValorLiq == null ? 0 : item.ValorLiq);

              lv50 = 1;
            } else if (item.LOCAL == "311250" && item.ORG == "SSA") {
              setcostAmCV50(item.ValorLiq == null ? 0 : item.ValorLiq);

              cv50 = 1;
            }
          });
          if (cv50 == 0) {
            setcostAmCV50(0);
          }
          if (cv49 == 0) {
            setcostAmCV49(0);
          }
          if (lv50 == 0) {
            setcostAmLV50(0);
          }
          if (lv49 == 0) {
            setcostAmLV49(0);
          }
        } else {
          setcostAmLV49(0);
          setcostAmCV49(0);
          setcostAmLV50(0);
          setcostAmCV50(0);
        }
      }

      var back = res.data[3];
      cv50 = 0;
      cv49 = 0;
      lv50 = 0;
      lv49 = 0;

      if (back.length > 0) {
        back.map((item, i) => {
          if (item.LOCAL == "311249" && item.ORG == "SLV") {
            setbacklogLV49(
              item.PENDENTE_OC == null || item.PENDENTE_OC == 0
                ? item.PENDENTE_RC
                : item.PENDENTE_OC
            );
            lv49 = 1;
          } else if (item.LOCAL == "311249" && item.ORG == "SSA") {
            setbacklogCV49(
              item.PENDENTE_OC == null || item.PENDENTE_OC == 0
                ? item.PENDENTE_RC
                : item.PENDENTE_OC
            );
            cv49 = 1;
          } else if (item.LOCAL == "311250" && item.ORG == "SLV") {
            setbacklogLV50(
              item.PENDENTE_OC == null || item.PENDENTE_OC == 0
                ? item.PENDENTE_RC
                : item.PENDENTE_OC
            );
            lv50 = 1;
          } else if (item.LOCAL == "311250" && item.ORG == "SSA") {
            setbacklogCV50(
              item.PENDENTE_OC == null || item.PENDENTE_OC == 0
                ? item.PENDENTE_RC
                : item.PENDENTE_OC
            );
            cv50 = 1;
          }
        });

        if (cv50 == 0) {
          setbacklogCV50(0);
        }
        if (cv49 == 0) {
          setbacklogCV49(0);
        }
        if (lv50 == 0) {
          setbacklogLV50(0);
        }
        if (lv49 == 0) {
          setbacklogLV49(0);
        }
      } else {
        setbacklogCV50(0);
        setbacklogCV49(0);
        setbacklogLV50(0);
        setbacklogLV49(0);
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
        `http://${import.meta.env.VITE_IP}/getCostAmount`,
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
        setcostAmLV49(0);
        setcostAmCV49(0);
        setcostAmLV50(0);
        setcostAmCV50(0);
        Notificacao(["erro", `Erro ao buscar valores de ${mes}/${ano}`]);
      } else {
        var cv50 = 0;
        var cv49 = 0;
        var lv50 = 0;
        var lv49 = 0;

        var vlrliq = res.data;
        if (vlrliq.length > 0) {
          vlrliq.map((item, i) => {
            if (item.LOCAL == "311249" && item.ORG == "SLV") {
              setcostAmLV49(item.ValorLiq == null ? 0 : item.ValorLiq);

              lv49 = 1;
            } else if (item.LOCAL == "311249" && item.ORG == "SSA") {
              setcostAmCV49(item.ValorLiq == null ? 0 : item.ValorLiq);

              cv49 = 1;
            } else if (item.LOCAL == "311250" && item.ORG == "SLV") {
              setcostAmLV50(item.ValorLiq == null ? 0 : item.ValorLiq);

              lv50 = 1;
            } else if (item.LOCAL == "311250" && item.ORG == "SSA") {
              setcostAmCV50(item.ValorLiq == null ? 0 : item.ValorLiq);

              cv50 = 1;
            }
          });
          if (cv50 == 0) {
            setcostAmCV50(0);
          }
          if (cv49 == 0) {
            setcostAmCV49(0);
          }
          if (lv50 == 0) {
            setcostAmLV50(0);
          }
          if (lv49 == 0) {
            setcostAmLV49(0);
          }
        } else {
          setcostAmLV49(0);
          setcostAmCV49(0);
          setcostAmLV50(0);
          setcostAmCV50(0);
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
                  rowSpan={"2"}
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
                  rowSpan="3"
                  className="relative text-center  border-2 rounded-s-lg  bg-[#] p-3 tablet:p-1 "
                >
                  <div className="text-4xl tablet:text-2xl font-bold ">LV</div>
                  <div className="text-lg tablet:text-base font-bold ">
                    (SLV)
                  </div>
                </td>
                <td className="relative text-center border-2 border-r-0 text-3xl bg-[#] font-bold laptop:p-3 desktop:p-3 tablet:p-1 ">
                  <div className="text-xl tablet:text-sm font-bold">222290</div>
                  <div className="text-xl tablet:text-sm  font-bold">
                    (311249)
                  </div>
                </td>
                {/*AOP*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2 border-l-2  laptop:break-words desktop:break-words bg-[#125884] flex-wrap border-[#fff] "${
                    aopLV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopLV49).toFixed(0))}
                </td>
                {/*PROVISÃO E REDUÇÕES*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2  laptop:break-words desktop:break-words  bg-[#125884] flex-wrap border-[#fff] "${
                    proLV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(proLV49).toFixed(0))}
                </td>
                {/*FCST*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2  laptop:break-words desktop:break-words bg-[#7fa3c2]  flex-wrap border-[#fff] "${
                    aopLV49 + proLV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopLV49 + proLV49).toFixed(0))}
                </td>
                {/*COST AMOUNT*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2  laptop:break-words desktop:break-words bg-[#7aa36f]  flex-wrap border-[#fff] "${
                    costAmLV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(costAmLV49).toFixed(0))}
                </td>
                {/*SALDO*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2  laptop:break-words desktop:break-words  bg-[#efb22d]  flex-wrap border-[#fff] "${
                    aopLV49 + proLV49 - costAmLV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopLV49 + proLV49 - costAmLV49).toFixed(0)
                  )}
                </td>
                {/*PREVISAO*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2  laptop:break-words desktop:break-words bg-[#9F8FCB]  flex-wrap border-[#fff] "${
                    prevLV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(prevLV49).toFixed(0))}
                </td>
                {/*SALDO LIVRE*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2 border-[#fff] laptop:break-words desktop:break-words bg-[#a59572]  flex-wrap "${
                    aopLV49 + proLV49 - costAmLV49 - prevLV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)] "
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopLV49 + proLV49 - costAmLV49 - prevLV49).toFixed(0)
                  )}
                </td>
                {/*BACKLOG*/}
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2 laptop:break-words desktop:break-words  bg-[#8d8d8d] flex-wrap border-[#fff] "${
                    backlogLV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(backlogLV49).toFixed(0))}
                </td>
              </tr>
              <tr>
                <td className="relative text-center border-l-2 border-b-2 text-3xl bg-[#] font-bold laptop:p-3 desktop:p-3 tablet:p-1 ">
                  <div className="text-xl tablet:text-sm  font-bold">
                    222292
                  </div>
                  <div className="text-xl tablet:text-sm  font-bold">
                    (311250)
                  </div>
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2  laptop:break-words desktop:break-words border-l-2 bg-[#125884]  flex-wrap border-[#fff] "${
                    aopLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopLV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2  laptop:break-words desktop:break-words bg-[#125884]  flex-wrap border-[#fff] "${
                    proLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(proLV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   border-b-2 laptop:break-words desktop:break-words  bg-[#7fa3c2] flex-wrap border-[#fff] "${
                    aopLV50 + proLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopLV50 + proLV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2 bg-[#7aa36f] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    costAmLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(costAmLV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2  laptop:break-words desktop:break-words bg-[#efb22d]  flex-wrap border-[#fff] "${
                    aopLV50 + proLV50 - costAmLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopLV50 + proLV50 - costAmLV50).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2 bg-[#9F8FCB] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    prevLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(prevLV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2  laptop:break-words desktop:break-words  bg-[#a59572] flex-wrap border-[#fff] "${
                    aopLV50 + proLV50 - costAmLV50 - prevLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopLV50 + proLV50 - costAmLV50 - prevLV50).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2 border-x-2 bg-[#8d8d8d] laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    backlogLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(backlogLV50).toFixed(0))}
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
                    aopLV49 + aopLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopLV49 + aopLV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-x-2 border-b-2 laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    proLV49 + proLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(proLV49 + proLV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words border-b-2 flex-wrap border-[#fff] "${
                    aopLV49 + proLV49 + aopLV50 + proLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopLV49 + proLV49 + aopLV50 + proLV50).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-x-2  border-b-2 laptop:break-words desktop:break-words  flex-wrap border-[#fff] "${
                    costAmLV49 + costAmLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(costAmLV49 + costAmLV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 laptop:break-words desktop:break-words  flex-wrap border-[#fff] "${
                    aopLV49 +
                      proLV49 -
                      costAmLV49 +
                      (aopLV50 + proLV50 - costAmLV50) <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopLV49 +
                        proLV49 -
                        costAmLV49 +
                        (aopLV50 + proLV50 - costAmLV50)
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-x-2 border-b-2 laptop:break-words desktop:break-words  flex-wrap border-[#fff] "${
                    prevLV49 + prevLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(prevLV49 + prevLV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2  laptop:break-words desktop:break-words  flex-wrap border-[#fff] "${
                    aopLV49 +
                      proLV49 -
                      costAmLV49 -
                      prevLV49 +
                      aopLV50 +
                      proLV50 -
                      costAmLV50 -
                      prevLV50 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopLV49 +
                        proLV49 -
                        costAmLV49 -
                        prevLV49 +
                        aopLV50 +
                        proLV50 -
                        costAmLV50 -
                        prevLV50
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2 laptop:break-words desktop:break-words rounded-ee-lg flex-wrap border-[#fff] "${
                    backlogLV50 + backlogLV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(backlogLV50 + backlogLV49).toFixed(0)
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="10" className="p-3 tablet:p-1 "></td>
              </tr>
              <tr className="">
                <td
                  rowSpan="3"
                  className="relative text-center  border-2 rounded-s-lg  bg-[#] p-3 tablet:p-1 "
                >
                  <div className="text-4xl tablet:text-2xl font-bold ">CV</div>
                  <div className="text-lg tablet:text-base font-bold">
                    (SSA)
                  </div>
                </td>

                <td className="relative text-center border-2 border-r-0 text-3xl bg-[#] font-bold laptop:p-3 desktop:p-3 tablet:p-1 ">
                  <div className="text-xl tablet:text-sm font-bold">222290</div>
                  <div className="text-xl tablet:text-sm  font-bold">
                    (311249)
                  </div>
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2 border-l-2  laptop:break-words desktop:break-words  bg-[#125884] flex-wrap border-[#fff] "${
                    aopCV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopCV49).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2  laptop:break-words desktop:break-words  bg-[#125884]  flex-wrap border-[#fff] "${
                    proCV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(proCV49).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2  laptop:break-words desktop:break-words bg-[#7fa3c2]   flex-wrap border-[#fff] "${
                    aopCV49 + proCV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopCV49 + proCV49).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2  laptop:break-words desktop:break-words bg-[#7aa36f]   flex-wrap border-[#fff] "${
                    costAmCV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(costAmCV49).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2  laptop:break-words desktop:break-words bg-[#efb22d]   flex-wrap border-[#fff] "${
                    aopCV49 + proCV49 - costAmCV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopCV49 + proCV49 - costAmCV49).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2  laptop:break-words desktop:break-words  bg-[#9F8FCB]  flex-wrap border-[#fff] "${
                    prevCV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(prevCV49).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2  laptop:break-words desktop:break-words bg-[#a59572]   flex-wrap border-[#fff] "${
                    aopCV49 + proCV49 - costAmCV49 - prevCV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopCV49 + proCV49 - costAmCV49 - prevCV49).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-2 rounded-se-lg laptop:break-words desktop:break-words bg-[#8d8d8d]   flex-wrap border-[#fff] "${
                    backlogCV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(backlogCV49).toFixed(0))}
                </td>
              </tr>
              <tr>
                <td className="relative text-center border-l-2 border-b-2 text-3xl bg-[#] font-bold p-3 tablet:p-1 ">
                  <div className="text-xl tablet:text-sm  font-bold">
                    222292
                  </div>
                  <div className="text-xl tablet:text-sm  font-bold">
                    (311250)
                  </div>
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2  border-l-2  laptop:break-words desktop:break-words  bg-[#125884] flex-wrap border-[#fff] "${
                    aopCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopCV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2  laptop:break-words desktop:break-words bg-[#125884]  flex-wrap border-[#fff] "${
                    proCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(proCV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   border-b-2 laptop:break-words desktop:break-words bg-[#7fa3c2]  flex-wrap border-[#fff] "${
                    aopCV50 + proCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopCV50 + proCV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2  laptop:break-words desktop:break-words bg-[#7aa36f]  flex-wrap border-[#fff] "${
                    costAmCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(costAmCV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2  laptop:break-words desktop:break-words  bg-[#efb22d] flex-wrap border-[#fff] "${
                    aopCV50 + proCV50 - costAmCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopCV50 + proCV50 - costAmCV50).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2  laptop:break-words desktop:break-words  bg-[#9F8FCB] flex-wrap border-[#fff] "${
                    prevCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(prevCV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2  laptop:break-words desktop:break-words  bg-[#a59572] flex-wrap border-[#fff] "${
                    aopCV50 + proCV50 - costAmCV50 - prevCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopCV50 + proCV50 - costAmCV50 - prevCV50).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2 border-x-2  laptop:break-words desktop:break-words  bg-[#8d8d8d] flex-wrap border-[#fff] "${
                    backlogCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(backlogCV50).toFixed(0))}
                </td>
              </tr>
              <tr>
                <td className="relative text-center border-l-2 border-b-2 text-3xl bg-[#] font-bold p-3 tablet:p-1 ">
                  <div className="text-2xl tablet:text-lg font-bold">TOTAL</div>
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border laptop:break-words desktop:break-words border-b-2 border-l-2  flex-wrap border-[#fff] "${
                    aopCV49 + aopCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(aopCV49 + aopCV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-x-2 border-b-2 laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    proCV49 + proCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(proCV49 + proCV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words border-b-2  flex-wrap border-[#fff] "${
                    aopCV49 + proCV49 + aopCV50 + proCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopCV49 + proCV49 + aopCV50 + proCV50).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-x-2  border-b-2 laptop:break-words desktop:break-words flex-wrap border-[#fff] "${
                    costAmCV49 + costAmCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(costAmCV49 + costAmCV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 laptop:break-words desktop:break-words  flex-wrap border-[#fff] "${
                    aopCV49 +
                      proCV49 -
                      costAmCV49 +
                      (aopCV50 + proCV50 - costAmCV50) <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopCV49 +
                        proCV49 -
                        costAmCV49 +
                        (aopCV50 + proCV50 - costAmCV50)
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-x-2 border-b-2 laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    prevCV49 + prevCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(Number(prevCV49 + prevCV50).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border border-b-2  laptop:break-words desktop:break-words flex-wrap border-[#fff] "${
                    aopCV49 +
                      proCV49 -
                      costAmCV49 -
                      prevCV49 +
                      aopCV50 +
                      proCV50 -
                      costAmCV50 -
                      prevCV50 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopCV49 +
                        proCV49 -
                        costAmCV49 -
                        prevCV49 +
                        aopCV50 +
                        proCV50 -
                        costAmCV50 -
                        prevCV50
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2 laptop:break-words desktop:break-words rounded-ee-lg flex-wrap border-[#fff] "${
                    backlogCV50 + backlogCV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(backlogCV50 + backlogCV49).toFixed(0)
                  )}
                </td>
              </tr>
              <tr>
                <td className="relative text-center  text-3xl font-bold rounded-es-md p-3 tablet:p-1 "></td>
                <td className="relative text-center  text-3xl font-bold rounded-es-md p-3 tablet:p-1 "></td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    aopCV49 + aopCV50 + aopLV49 + aopLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(aopCV49 + aopCV50 + aopLV49 + aopLV50).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border  laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    proCV49 + proCV50 + proLV49 + proLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(proCV49 + proCV50 + proLV49 + proLV50).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    aopCV49 +
                      proCV49 +
                      aopCV50 +
                      proCV50 +
                      aopLV49 +
                      proLV49 +
                      aopLV50 +
                      proLV50 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopCV49 +
                        proCV49 +
                        aopCV50 +
                        proCV50 +
                        aopLV49 +
                        proLV49 +
                        aopLV50 +
                        proLV50
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    costAmCV49 + costAmCV50 + costAmLV49 + costAmLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      costAmCV49 + costAmCV50 + costAmLV49 + costAmLV50
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    aopCV49 +
                      proCV49 -
                      costAmCV49 +
                      (aopCV50 + proCV50 - costAmCV50) +
                      aopLV49 +
                      proLV49 -
                      costAmLV49 +
                      (aopLV50 + proLV50 - costAmLV50) <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopCV49 +
                        proCV49 -
                        costAmCV49 +
                        (aopCV50 + proCV50 - costAmCV50) +
                        aopLV49 +
                        proLV49 -
                        costAmLV49 +
                        (aopLV50 + proLV50 - costAmLV50)
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    prevCV49 + prevCV50 + prevLV49 + prevLV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(prevCV49 + prevCV50 + prevLV49 + prevLV50).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    aopCV49 +
                      proCV49 -
                      costAmCV49 -
                      prevCV49 +
                      aopCV50 +
                      proCV50 -
                      costAmCV50 -
                      prevCV50 +
                      aopLV49 +
                      proLV49 -
                      costAmLV49 -
                      prevLV49 +
                      aopLV50 +
                      proLV50 -
                      costAmLV50 -
                      prevLV50 <
                      0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopCV49 +
                        proCV49 -
                        costAmCV49 -
                        prevCV49 +
                        aopCV50 +
                        proCV50 -
                        costAmCV50 -
                        prevCV50 +
                        aopLV49 +
                        proLV49 -
                        costAmLV49 -
                        prevLV49 +
                        aopLV50 +
                        proLV50 -
                        costAmLV50 -
                        prevLV50
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-sm  py-3 laptop:px-3 desktop:px-3  box-border   laptop:break-words desktop:break-words   flex-wrap border-[#fff] "${
                    backlogLV50 + backlogLV49 + backlogCV49 + backlogCV50 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="tablet:hidden">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      backlogLV50 + backlogLV49 + backlogCV49 + backlogCV50
                    ).toFixed(0)
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="laptop:flex desktop:flex w-full ">
        <div className="laptop:ml-10 desktop:ml-10 laptop:w-[75%] desktop:w-[75%] mt-5">
          <textarea
            ref={textareaRef}
            value={texto}
            rows={4}
            onChange={(e) => setTexto(e.target.value)}
            className={styleAll.inputSoW + " tablet:text-lg"}
          ></textarea>
          <button
            onClick={() => gravarTexto()}
            className="p-2 text-2xl tablet:text-lg my-2 rounded-md bg-dana font-bold"
          >
            Salvar Texto
          </button>
        </div>
        <div className="">
          <table className="w-[50%] tablet:w-full  desktop:mr-10 mt-5 laptop:mx-auto desktop:mx-auto mb-16 border-separate border-spacing-0">
            <thead>
              <th
                colSpan={"1"}
                rowSpan={"1"}
                className="relative text-center laptop:w-[20%] desktop:w-[20%]  "
              ></th>
              <th className="relative text-center w-[40%] laptop:p-3 desktop:p-3 laptop:px-5 desktop:px-5 tablet:p-1 border-2 border-b-0 border-r-0 rounded-ss-lg  bg-[#5c8ab2]  7fa3c2">
                <div className="text-xl tablet:text-lg  font-bold ">
                  DEDUÇÕES
                </div>
              </th>
              <th className="relative text-center w-[40%] laptop:p-3 desktop:p-3 laptop:px-5 desktop:px-5 tablet:p-1 border-2 border-b-0 rounded-se-lg bg-[#5c8ab2]  7fa3c2">
                <div className="text-xl tablet:text-lg  font-bold">
                  ESTOURO (ESTIMADO)
                </div>
              </th>
              <th className="relative text-center w-[40%] laptop:p-3 desktop:p-3 laptop:px-5 desktop:px-5 tablet:p-1 border-2 border-b-0 rounded-se-lg bg-[#5c8ab2]  7fa3c2">
                <div className="text-xl tablet:text-lg  font-bold">
                  COST AMOUNT (ESTIMADO)
                </div>
              </th>
            </thead>
            <tbody>
              <tr className="">
                <td className="relative text-center  border-2 border-r-0 rounded-ss-lg  bg-[#] p-3 tablet:p-1 ">
                  <div className="text-4xl tablet:text-2xl font-bold ">LV</div>
                  <div className="text-lg tablet:text-lg font-bold ">(SLV)</div>
                </td>
                <td
                  className={`text-center tablet:text-lg text-xl  py-3 laptop:px-3 desktop:px-3  box-border  border-y-2 border-l-2 laptop:break-words desktop:break-words  bg-[#125884] flex-wrap border-[#fff] "${
                    aopCV49 < 0 &&
                    " text-[#ff0000] font-bold  [text-shadow:_0_1px_0_rgb(0_0_0_/_100%)]"
                  }`}
                >
                  <span className="">R$</span>{" "}
                  {numberWithCommas(Number(resumoLV).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-lg text-xl py-3 laptop:px-3 desktop:px-3  box-border  border-y-2 border-x-2  laptop:break-words desktop:break-words  bg-[#125884] flex-wrap border-[#fff]`}
                >
                  <span className="">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopLV49 +
                        proLV49 -
                        costAmLV49 -
                        prevLV49 +
                        aopLV50 +
                        proLV50 -
                        costAmLV50 -
                        prevLV50 +
                        0.091 * (prevLV49 + prevLV50) +
                        resumoLV
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-lg text-xl py-3 laptop:px-3 desktop:px-3  box-border  border-y-2 border-x-2  laptop:break-words desktop:break-words  bg-[#125884] flex-wrap border-[#fff]`}
                >
                  <span className="">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      costAmLV49 +
                        costAmLV50 -
                        resumoLV +
                        0.091 * (prevLV49 + prevLV50)
                    ).toFixed(0)
                  )}
                </td>
              </tr>

              <tr className="">
                <td className="relative text-center px-5 border-x-2 border-b-2 border-r-0 rounded-es-lg  bg-[#] p-3 tablet:p-1 ">
                  <div className="text-4xl tablet:text-2xl font-bold ">CV</div>
                  <div className="text-lg tablet:text-lg font-bold ">(SSA)</div>
                </td>
                <td
                  className={`text-center tablet:text-lg text-xl  py-3 laptop:px-3 desktop:px-3  box-border border-l-2 border-b-2  laptop:break-words desktop:break-words  bg-[#125884] flex-wrap border-[#fff]
                  `}
                >
                  <span className="">R$</span>{" "}
                  {numberWithCommas(Number(resumoCV).toFixed(0))}
                </td>
                <td
                  className={`text-center tablet:text-lg text-xl py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2 rounded-ee-lg  laptop:break-words desktop:break-words  bg-[#125884] flex-wrap border-[#fff]`}
                >
                  <span className="">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      aopCV49 +
                        proCV49 -
                        costAmCV49 -
                        prevCV49 +
                        aopCV50 +
                        proCV50 -
                        costAmCV50 -
                        prevCV50 +
                        0.091 * (prevCV49 + prevCV50) +
                        resumoCV
                    ).toFixed(0)
                  )}
                </td>
                <td
                  className={`text-center tablet:text-lg text-xl py-3 laptop:px-3 desktop:px-3  box-border  border-b-2 border-x-2 rounded-ee-lg  laptop:break-words desktop:break-words  bg-[#125884] flex-wrap border-[#fff]`}
                >
                  <span className="">R$</span>{" "}
                  {numberWithCommas(
                    Number(
                      costAmCV49 +
                        costAmCV50 -
                        resumoCV +
                        0.091 * (prevCV49 + prevCV50)
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
