import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { styleAll } from "../../../css";
import Titulo from "../../components/NavBar/Titulo";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Notificacao from "../../components/Notificacao";
import LoadingGet from "../../components/Loading/LoadingGet";

export default function Budget() {
  const nav = useNavigate();

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

  const toFixedS = (e) => {
    var valueS = e.toString();
    valueS = valueS.replace(".", "");
    var value = Number(
      parseFloat(
        valueS.substring(0, valueS.length - 2) +
          "." +
          valueS.substring(valueS.length - 2)
      )
    ).toFixed(2);
    return value;
  };

  const atualizar = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getValores`,
        {
          params: {
            mes,
            ano,
          },
        }
      );

      if (res?.data?.code) {
        setvalCV50Pro(Number(0).toFixed(2));
        setvalCV49Pro(Number(0).toFixed(2));
        setvalLV50Pro(Number(0).toFixed(2));
        setvalLV49Pro(Number(0).toFixed(2));
        setvalCV50Bud(Number(0).toFixed(2));
        setvalCV49Bud(Number(0).toFixed(2));
        setvalLV50Bud(Number(0).toFixed(2));
        setvalLV49Bud(Number(0).toFixed(2));

        setvalCV12Pro(Number(0).toFixed(2));
        setvalCV17Pro(Number(0).toFixed(2));
        setvalCV58Pro(Number(0).toFixed(2));
        setvalLV12Pro(Number(0).toFixed(2));
        setvalLV17Pro(Number(0).toFixed(2));
        setvalLV58Pro(Number(0).toFixed(2));
        setvalCV12Bud(Number(0).toFixed(2));
        setvalCV17Bud(Number(0).toFixed(2));
        setvalCV58Bud(Number(0).toFixed(2));
        setvalLV12Bud(Number(0).toFixed(2));
        setvalLV17Bud(Number(0).toFixed(2));
        setvalLV58Bud(Number(0).toFixed(2));

        setresumoCV(Number(0).toFixed(2));
        setresumoLV(Number(0).toFixed(2));
        Notificacao(["atencao", `Nenhum valor encontrado em ${mes}/${ano}`]);
      } else {
        if (res?.data == 0) {
          setvalCV50Pro(Number(0).toFixed(2));
          setvalCV49Pro(Number(0).toFixed(2));
          setvalLV50Pro(Number(0).toFixed(2));
          setvalLV49Pro(Number(0).toFixed(2));
          setvalCV50Bud(Number(0).toFixed(2));
          setvalCV49Bud(Number(0).toFixed(2));
          setvalLV50Bud(Number(0).toFixed(2));
          setvalLV49Bud(Number(0).toFixed(2));
          setvalCV12Pro(Number(0).toFixed(2));
          setvalCV17Pro(Number(0).toFixed(2));
          setvalCV58Pro(Number(0).toFixed(2));
          setvalLV12Pro(Number(0).toFixed(2));
          setvalLV17Pro(Number(0).toFixed(2));
          setvalLV58Pro(Number(0).toFixed(2));
          setvalCV12Bud(Number(0).toFixed(2));
          setvalCV17Bud(Number(0).toFixed(2));
          setvalCV58Bud(Number(0).toFixed(2));
          setvalLV12Bud(Number(0).toFixed(2));
          setvalLV17Bud(Number(0).toFixed(2));
          setvalLV58Bud(Number(0).toFixed(2));
          setresumoCV(Number(0).toFixed(2));
          setresumoLV(Number(0).toFixed(2));
          Notificacao(["atencao", `Nenhum valor encontrado em ${mes}/${ano}`]);
        } else {
          setvalCV50Pro(Number(res?.data[0]?.ValCVC50Pro).toFixed(2));
          setvalCV49Pro(Number(res?.data[0]?.ValCVC49Pro).toFixed(2));
          setvalLV50Pro(Number(res?.data[0]?.ValLVC50Pro).toFixed(2));
          setvalLV49Pro(Number(res?.data[0]?.ValLVC49Pro).toFixed(2));
          setvalCV50Bud(Number(res?.data[0]?.ValCVC50Bud).toFixed(2));
          setvalCV49Bud(Number(res?.data[0]?.ValCVC49Bud).toFixed(2));
          setvalLV50Bud(Number(res?.data[0]?.ValLVC50Bud).toFixed(2));
          setvalLV49Bud(Number(res?.data[0]?.ValLVC49Bud).toFixed(2));

          setvalCV12Pro(Number(res?.data[0]?.ValCVC12Pro).toFixed(2));
          setvalCV17Pro(Number(res?.data[0]?.ValCVC17Pro).toFixed(2));
          setvalCV58Pro(Number(res?.data[0]?.ValCVC58Pro).toFixed(2));
          setvalLV12Pro(Number(res?.data[0]?.ValLVC12Pro).toFixed(2));
          setvalLV17Pro(Number(res?.data[0]?.ValLVC17Pro).toFixed(2));
          setvalLV58Pro(Number(res?.data[0]?.ValLVC58Pro).toFixed(2));
          setvalCV12Bud(Number(res?.data[0]?.ValCVC12Bud).toFixed(2));
          setvalCV17Bud(Number(res?.data[0]?.ValCVC17Bud).toFixed(2));
          setvalCV58Bud(Number(res?.data[0]?.ValCVC58Bud).toFixed(2));
          setvalLV12Bud(Number(res?.data[0]?.ValLVC12Bud).toFixed(2));
          setvalLV17Bud(Number(res?.data[0]?.ValLVC17Bud).toFixed(2));
          setvalLV58Bud(Number(res?.data[0]?.ValLVC58Bud).toFixed(2));

          setresumoCV(Number(res?.data[0]?.resumoCV).toFixed(2));
          setresumoLV(Number(res?.data[0]?.resumoLV).toFixed(2));
        }
      }
      setLoad(false);
    } catch (err) {
      Notificacao(["erro", `Erro ao buscar valores de ${mes}/${ano}`]);
      console.log(err);
      setLoad(false);
    }
  };

  const [mes, setMes] = useState(monthNames[new Date().getMonth()]);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [valCV50Pro, setvalCV50Pro] = useState(Number(0).toFixed(2));
  const [valCV49Pro, setvalCV49Pro] = useState(Number(0).toFixed(2));
  const [valLV50Pro, setvalLV50Pro] = useState(Number(0).toFixed(2));
  const [valLV49Pro, setvalLV49Pro] = useState(Number(0).toFixed(2));
  const [valCV50Bud, setvalCV50Bud] = useState(Number(0).toFixed(2));
  const [valCV49Bud, setvalCV49Bud] = useState(Number(0).toFixed(2));
  const [valLV50Bud, setvalLV50Bud] = useState(Number(0).toFixed(2));
  const [valLV49Bud, setvalLV49Bud] = useState(Number(0).toFixed(2));
  const [valCV12Pro, setvalCV12Pro] = useState(Number(0).toFixed(2));
  const [valCV17Pro, setvalCV17Pro] = useState(Number(0).toFixed(2));
  const [valCV58Pro, setvalCV58Pro] = useState(Number(0).toFixed(2));
  const [valLV12Pro, setvalLV12Pro] = useState(Number(0).toFixed(2));
  const [valLV17Pro, setvalLV17Pro] = useState(Number(0).toFixed(2));
  const [valLV58Pro, setvalLV58Pro] = useState(Number(0).toFixed(2));
  const [valCV12Bud, setvalCV12Bud] = useState(Number(0).toFixed(2));
  const [valCV17Bud, setvalCV17Bud] = useState(Number(0).toFixed(2));
  const [valCV58Bud, setvalCV58Bud] = useState(Number(0).toFixed(2));
  const [valLV12Bud, setvalLV12Bud] = useState(Number(0).toFixed(2));
  const [valLV17Bud, setvalLV17Bud] = useState(Number(0).toFixed(2));
  const [valLV58Bud, setvalLV58Bud] = useState(Number(0).toFixed(2));

  const [resumoCV, setresumoCV] = useState(Number(0).toFixed(2));
  const [resumoLV, setresumoLV] = useState(Number(0).toFixed(2));

  const editarVal = async () => {
    setLoad(true);
    try {
      const res = await axios.post(
        `http://${import.meta.env.VITE_IP}/EditarVal`,
        {
          params: {
            mes,
            ano,
            valCV50Pro,
            valCV49Pro,
            valLV50Pro,
            valLV49Pro,
            valCV50Bud,
            valCV49Bud,
            valLV50Bud,
            valLV49Bud,
            valCV12Pro,
            valCV17Pro,
            valCV58Pro,
            valLV12Pro,
            valLV17Pro,
            valLV58Pro,
            valCV12Bud,
            valCV17Bud,
            valCV58Bud,
            valLV12Bud,
            valLV17Bud,
            valLV58Bud,
            resumoCV,
            resumoLV,
          },
        }
      );
      Notificacao([
        "sucesso",
        `Valores de ${mes}/${ano} aplicados com sucesso!`,
      ]);
      setLoad(false);
    } catch (err) {
      Notificacao(["erro", `Erro ao criar/editar valores de ${mes}/${ano}`]);
      console.log(err);
      setLoad(false);
    }
  };

  useEffect(() => {
    atualizar();
  }, [mes, ano]);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        editarVal();
      } else if (event.key === "Escape") {
        event.preventDefault();
        nav("/AcessoAdmin");
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [
    mes,
    ano,
    valCV50Pro,
    valCV49Pro,
    valLV50Pro,
    valLV49Pro,
    valCV50Bud,
    valCV49Bud,
    valLV50Bud,
    valLV49Bud,
    valCV12Pro,
    valCV17Pro,
    valCV58Pro,
    valLV12Pro,
    valLV17Pro,
    valLV58Pro,
    valCV12Bud,
    valCV17Bud,
    valCV58Bud,
    valLV12Bud,
    valLV17Bud,
    valLV58Bud,
    resumoCV,
    resumoLV,
  ]);

  return (
    <div className="flex">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="colored"
      />
      <NavBar ativo="7"></NavBar>

      <div className="w-full pl-[8.5em] pr-10 laptop:pl-[6.5em] tablet:pl-[6.5em]">
        <Titulo titulo="Valores Controladoria" />
        {load && <LoadingGet></LoadingGet>}
        <div className="mt-10 w-full">
          <div className="flex mx-auto w-fit mb-4 ">
            <select
              id="large"
              value={mes}
              className={
                "block w-fit px-3 py-3 laptop:text-2xl desktop:text-2xl tablet:text-xl mx-2 font-bold text-gray-900 border-2 focus:-outline-offset-0 focus:outline-none " +
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
                "block w-fit px-3 py-3 text-2xl font-bold mx-2 tablet:text-xl text-gray-900 border-2 focus:-outline-offset-0 focus:outline-none " +
                styleAll.inputSemW
              }
            >
              <option value={new Date().getFullYear() + 1}>
                {new Date().getFullYear() + 1}
              </option>
              <option value={new Date().getFullYear()}>
                {new Date().getFullYear()}
              </option>
              <option value={new Date().getFullYear() - 1}>
                {new Date().getFullYear() - 1}
              </option>
            </select>
          </div>
          <div className="desktop:flex">
            <div className="desktop:w-[48%] mx-auto laptop:mx-10 tablet:mx-5">
              <h1 className="text-center w-full font-bold text-3xl tablet:text-2xl mb-4">
                Budget
              </h1>
              <table className="w-full">
                <thead className=" ">
                  <tr className="text-xl tablet:text-xl  font-extrabold">
                    <th className="relative text-center w-[5%] p-3  border-r-0 border-2 bg-[#2d8339]  "></th>
                    <th className="relative text-center w-[19%] p-3 border-y-2 border-r-2 bg-[#2d8339]  ">
                      311250
                    </th>
                    <th className="relative text-center w-[19%] p-3 border-2 border-l-2 bg-[#2d8339] ">
                      311249
                    </th>
                    <th className="relative text-center w-[19%] p-3 border-2 border-l-2 bg-[#2d8339] ">
                      311212
                    </th>
                    <th className="relative text-center w-[19%] p-3 border-2 border-l-2 bg-[#2d8339] ">
                      311217
                    </th>
                    <th className="relative text-center w-[19%] p-3 border-2 border-l-2 bg-[#2d8339] ">
                      311258
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="relative text-center border-x-2 text-2xl tablet:text-2xl font-bold rounded-ss-md p-3 ">
                      CV:
                    </td>
                    <td className="text-center  py-3 px-3  box-border border-y-2 border-r-2 break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) => {
                          setvalCV50Bud(toFixedS(e.target.value));
                        }}
                        value={valCV50Bud}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalCV49Bud(toFixedS(e.target.value))
                        }
                        value={valCV49Bud}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalCV12Bud(toFixedS(e.target.value))
                        }
                        value={valCV12Bud}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalCV17Bud(toFixedS(e.target.value))
                        }
                        value={valCV17Bud}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalCV58Bud(toFixedS(e.target.value))
                        }
                        value={valCV58Bud}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td className="relative text-center border-x-2 border-b-2 tablet:text-2xl text-2xl font-bold rounded-es-md p-3 ">
                      LV:
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2 break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalLV50Bud(toFixedS(e.target.value))
                        }
                        value={valLV50Bud}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalLV49Bud(toFixedS(e.target.value))
                        }
                        value={valLV49Bud}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalLV12Bud(toFixedS(e.target.value))
                        }
                        value={valLV12Bud}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalLV17Bud(toFixedS(e.target.value))
                        }
                        value={valLV17Bud}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalLV58Bud(toFixedS(e.target.value))
                        }
                        value={valLV58Bud}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="desktop:w-[48%]  mx-auto laptop:mx-10 tablet:mt-5 tablet:mx-5">
              <h1 className="text-center w-full font-bold text-3xl tablet:text-2xl mb-4">
                Provisão
              </h1>
              <table className="w-full">
                <thead className=" ">
                  <tr className="text-xl tablet:text-xl font-extrabold ">
                    <th className="relative text-center w-[5%]  p-3  border-r-0 border-2  bg-[#f59300]  "></th>
                    <th className="relative text-center w-[19%] p-3 border-y-2 border-r-2 bg-[#f59300]">
                      311250
                    </th>
                    <th className="relative text-center w-[19%] p-3 border-2  border-l-2  bg-[#f59300]">
                      311249
                    </th>
                    <th className="relative text-center w-[19%] p-3 border-2 border-l-2 bg-[#f59300] ">
                      311212
                    </th>
                    <th className="relative text-center w-[19%] p-3 border-2 border-l-2 bg-[#f59300] ">
                      311217
                    </th>
                    <th className="relative text-center w-[19%] p-3 border-2 border-l-2 bg-[#f59300] ">
                      311258
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="relative text-center border-x-2 text-2xl tablet:text-2xl font-bold rounded-ss-md p-3 ">
                      CV:
                    </td>
                    <td className="text-center  py-3 px-3  box-border border-y-2 border-r-2 break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalCV50Pro(toFixedS(e.target.value))
                        }
                        value={valCV50Pro}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalCV49Pro(toFixedS(e.target.value))
                        }
                        value={valCV49Pro}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalCV12Pro(toFixedS(e.target.value))
                        }
                        value={valCV12Pro}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalCV17Pro(toFixedS(e.target.value))
                        }
                        value={valCV17Pro}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalCV58Pro(toFixedS(e.target.value))
                        }
                        value={valCV58Pro}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td className="relative text-center border-x-2 border-b-2 text-2xl tablet:text-2xl font-bold rounded-es-md p-3 ">
                      LV:
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2 break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalLV50Pro(toFixedS(e.target.value))
                        }
                        value={valLV50Pro}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2 break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalLV49Pro(toFixedS(e.target.value))
                        }
                        value={valLV49Pro}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalLV12Pro(toFixedS(e.target.value))
                        }
                        value={valLV12Pro}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalLV17Pro(toFixedS(e.target.value))
                        }
                        value={valLV17Pro}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                    <td className="text-center  py-3 px-3  box-border  border-2  break-words   flex-wrap">
                      <input
                        type="number"
                        onChange={(e) =>
                          setvalLV58Pro(toFixedS(e.target.value))
                        }
                        value={valLV58Pro}
                        className={styleAll.inputSoWBudg + "tablet:text-xl"}
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-1/3 mx-auto mt-5 laptop:mt-8 desktop:mt-8">
            <h1 className="text-center w-full font-bold text-3xl tablet:text-2xl mb-4">
              Deduções
            </h1>
            <table className="w-full">
              <thead className=" ">
                <tr className="text-2xl tablet:text-xl font-extrabold ">
                  <th className="relative text-center w-[10%]      "></th>
                  <th className="relative text-center w-[40%]"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="relative text-center border-2 text-2xl tablet:text-2xl font-bold rounded-ss-md p-3 ">
                    CV:
                  </td>
                  <td className="text-center  py-3 px-3  box-border border-y-2 border-r-2 break-words   flex-wrap">
                    <input
                      type="number"
                      onChange={(e) => setresumoCV(toFixedS(e.target.value))}
                      value={resumoCV}
                      className={styleAll.inputSoWBudg + "tablet:text-xl"}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className="relative text-center border-x-2 border-b-2 text-2xl tablet:text-2xl font-bold rounded-es-md p-3 ">
                    LV:
                  </td>
                  <td className="text-center  py-3 px-3  box-border  border-2 break-words   flex-wrap">
                    <input
                      type="number"
                      onChange={(e) => setresumoLV(toFixedS(e.target.value))}
                      value={resumoLV}
                      className={styleAll.inputSoWBudg + "tablet:text-xl"}
                    ></input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full">
            <div className="flex w-fit mx-auto">
              <div className="mx-5 w-fit mt-16 tablet:mt-8">
                <button
                  onClick={() => editarVal()}
                  className="p-3 text-2xl font-bold mx-2 bg-[#2d8339]  rounded-xl"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => nav("/AcessoAdmin")}
                  className="bg-dana p-3 text-2xl font-bold mx-2  rounded-xl"
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
