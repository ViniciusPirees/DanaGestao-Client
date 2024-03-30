import React, { useEffect, useState } from "react";
import LoadingGet from "../../components/Loading/LoadingGet";
import { useNavigate } from "react-router-dom";
import getLogin from "../../components/Login/getLogin";
import axios from "axios";
import SelectOpt from "../../components/Graficos/SelectOpt";
import CustosTV from "./Items/Custos/CustosTV";
import GraficoConsertoTV from "./Items/GraficoAdmin/GraficoConsertoTV";
import GraficoManTV from "./Items/GraficoAdmin/GraficoManTV";
import GraficoSolicTV from "./Items/GraficoAdmin/GraficoSolicTV";
import GraficoRcsCriadasTV from "./Items/GraficoAdmin/GraficoRcsCriadasTV";
import GraficoBackLogTV from "./Items/GraficoStatus/GraficoBackLogTV";
import GraficoPrazoTV from "./Items/GraficoStatus/GraficoPrazoTV";
import FiltroClick from "../../components/Graficos/FiltroClick";
import { HiOutlineRefresh } from "react-icons/hi";
import EditarTV from "./EditarTV.JSX";
import SaldoEmTerceiros from "./Items/SaldoEmTerc/SaldoemTerceiros";
import { ToastContainer } from "react-toastify";

export default function TelaTV() {
  const nav = useNavigate();
  const [logado, setLogado] = useState(null);
  useEffect(() => {
    getLogin().then((val) => {
      setLogado(val);
      if (!val) {
        nav("/");
      }
    });
  }, []);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();

        if (edit) {
          setEdit(false);
        } else {
          nav("/AcessoAdmin");
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [edit]);

  const localstorage = localStorage;
  const prep1L =
    localstorage?.prep1 == undefined ? "" : JSON.parse(localstorage?.prep1);
  const prep2L =
    localstorage?.prep2 == undefined ? "" : JSON.parse(localstorage?.prep2);
  const atualizaL =
    localstorage?.atualizaL == undefined
      ? ""
      : JSON.parse(localstorage?.atualizaL);

  const [prep, setPrep] = useState(prep1L);
  const [prep2, setPrep2] = useState(prep2L);
  const [load, setLoad] = useState(false);

  const [conta, setConta] = useState([
    { id: "311249", ativo: true, cor: 0 },
    { id: "311250", ativo: true, cor: 0 },
  ]);
  const [divisao, setDivisao] = useState([
    { id: "SLV", ativo: true, cor: 0 },
    { id: "SSA", ativo: true, cor: 0 },
  ]);

  const [databackLog, setDataBackLOG] = useState([]);
  const getDataBackLOG = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getGraficos`,
        {
          params: {
            tabela: "Consulta",
            conta: conta,
            divisao: divisao,
          },
        }
      );

      if (res?.data?.code) {
        setDataBackLOG([]);
        Notificacao(["atencao", "Nenhum resultado foi encontrado."]);
      } else {
        setDataBackLOG(res.data);
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhum resultado foi encontrado."]);
        }
      }

      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getSaldo = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getGraficos`,
        {
          params: {
            tabela: "Saldo",
          },
        }
      );

      if (res?.data?.code) {
        setSaldo([]);
        Notificacao(["atencao", "Nenhum resultado foi encontrado."]);
      } else {
        setSaldo(res.data[0]);
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhum resultado foi encontrado."]);
        }
      }
      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDataBackLOG();
  }, []);

  useEffect(() => {
    getSaldo();
  }, []);

  var mesAtual = 0;
  var anoAtual = new Date().getFullYear();
  if (new Date().getMonth() == 11) {
    anoAtual = anoAtual + 1;
  } else {
    mesAtual = new Date().getMonth();
  }
  const monthNames = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];

  const getStatus = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getResumoFil`,
        {
          params: {
            tabela: "StatusPrev",
            order: "StaPreDesc",
          },
        }
      );
      if (res?.data?.code) {
        setStatus([]);
        Notificacao(["atencao", "Nenhum resultado foi encontrado."]);
      } else {
        var statusSel = [];
        res?.data?.forEach((val) => {
          statusSel.push({
            id: val.StaPreDesc,
            ativo: true,
          });
        });
        var comecou = true;
        for (var i = 0; i < 12; i++) {
          if (comecou) {
            if (mesAtual + i == 12) {
              comecou = false;
              mesAtual = 0;
              anoAtual = anoAtual + 1;
              statusSel.push({
                id: `${monthNames[mesAtual]}/${anoAtual
                  .toString()
                  .replace("20", "")}`,
                ativo: true,
              });
            } else {
              statusSel.push({
                id: `${monthNames[mesAtual + i]}/${anoAtual
                  .toString()
                  .replace("20", "")}`,
                ativo: true,
              });
            }
          } else {
            mesAtual++;
            statusSel.push({
              id: `${monthNames[mesAtual]}/${anoAtual
                .toString()
                .replace("20", "")}`,
              ativo: true,
            });
          }
        }
        setStatus(statusSel);

        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhum resultado foi encontrado."]);
        }
      }

      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [status, setStatus] = useState([]);
  const cores = [
    "#70AD47",
    "#5B9BD5",
    "#FFC000",
    "#ED7D30",
    "#FF0000",
    "#7030A0",
    "#D9E1F2",
    "#002060",
    "#C00000",
    "#375623",
    "#235645",
    "#364b91",
    "#8f3572",
    "#635f5c",
    "#70AD47",
    "#5B9BD5",
    "#FFC000",
    "#ED7D30",
    "#FF0000",
    "#7030A0",
    "#D9E1F2",
    "#002060",
    "#C00000",
    "#375623",
    "#235645",
    "#364b91",
    "#8f3572",
    "#635f5c",
  ];

  const [itemsTipo, setitemsTipo] = useState([]);
  //{ id: "OUTROS SOL.", ativo: true, cor: "#70AD47" },

  const getTipos = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getResumoFil`,
        {
          params: {
            tabela: "TipoStatus",
            order: "TipStaDesc",
          },
        }
      );
      if (res?.data?.code) {
        setStatus([]);
        Notificacao(["atencao", "Nenhum resultado foi encontrado."]);
      } else {
        var statusSel = [];
        res?.data?.forEach((val, i) => {
          statusSel.push({
            id: val.TipStaDesc,
            ativo: true,
            cor: cores[i],
          });
        });

        setitemsTipo(statusSel);
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhum resultado foi encontrado."]);
        }
      }

      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStatus();
    getTipos();
  }, []);

  const [saldo, setSaldo] = useState([]);
  const [atualiza, setAtualiza] = useState(atualizaL);

  useEffect(() => {
    const interval = setInterval(() => {
      if (atualiza) {
        getSaldo();
        getDataBackLOG();
      }
    }, 300000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [atualiza]);

  return (
    <>
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
      {load && <LoadingGet></LoadingGet>}
      {edit && (
        <EditarTV
          setEdit={setEdit}
          setPrep={setPrep}
          prep={prep}
          conta={conta}
          setConta={setConta}
          divisao={divisao}
          setDivisao={setDivisao}
          itemsTipo={itemsTipo}
          setitemsTipo={setitemsTipo}
          status={status}
          setStatus={setStatus}
          getDataBackLOG={getDataBackLOG}
          setPrep2={setPrep2}
          prep2={prep2}
          setAtualiza={setAtualiza}
          atualiza={atualiza}
        ></EditarTV>
      )}
      <div className="flex">
        <button
          className="flex bg-dana text-center rounded-md px-2 duration-200 hover:scale-105 m-2 text-xl font-bold p-1"
          onClick={() => setEdit(true)}
        >
          Editar
        </button>
        <button
          className="flex bg-dana text-center rounded-md px-2 duration-200 hover:scale-105 m-2 text-xl font-bold p-1"
          onClick={() => nav(-1)}
        >
          Voltar
        </button>
      </div>
      <div className="">
        <div className="w-[100%] laptop:flex desktop:flex">
          <div className="flex laptop:w-1/2 desktop:w-1/2">
            <div className="laptop:w-[40%] desktop:w-[40%] laptop:max-w-[55em] desktop:max-w-[55em] w-[40%] mx-auto ">
              <GraficoConsertoTV
                setLoad={setLoad}
                ratio={true}
                atualiza={atualiza}
              ></GraficoConsertoTV>
            </div>
            <div className="laptop:w-[40%] desktop:w-[40%] laptop:max-w-[55em] desktop:max-w-[55em] w-[40%] mx-auto ">
              <GraficoManTV
                setLoad={setLoad}
                ratio={true}
                atualiza={atualiza}
              ></GraficoManTV>
            </div>
          </div>
          <div className="mt-5 laptop:w-1/2 desktop:w-1/2">
            <CustosTV
              setLoad={setLoad}
              prep={prep}
              tv={true}
              atualiza={atualiza}
            ></CustosTV>
          </div>
        </div>

        <div className="w-full laptop:flex desktop:flex">
          <div className="flex laptop:w-[40%] desktop:w-[40%] ">
            <div className="laptop:w-[40%] desktop:w-[40%] max-w-[55em] tablet:w-[30%] mx-auto mt-10">
              <GraficoSolicTV
                setLoad={setLoad}
                ratio={true}
                atualiza={atualiza}
              ></GraficoSolicTV>
            </div>
            <div className="laptop:w-[40%] desktop:w-[40%] max-w-[55em] tablet:w-[30%] mx-auto mt-10">
              <GraficoRcsCriadasTV
                setLoad={setLoad}
                prep={prep2}
                atualiza={atualiza}
              ></GraficoRcsCriadasTV>
            </div>
          </div>

          <div className="flex laptop:w-[40%] desktop:w-[40%] tablet:w-[65%] tablet:hidden">
            <div className="w-[40%] mx-auto mt-10">
              <GraficoBackLogTV
                itemsTipo={itemsTipo}
                setitemsTipo={setitemsTipo}
                databackLog={databackLog}
                setDataBackLOG={setDataBackLOG}
              ></GraficoBackLogTV>
            </div>
            <div className="w-[50%] mx-auto">
              <GraficoPrazoTV
                status={status}
                setStatus={setStatus}
                databackLog={databackLog}
                setDataBackLOG={setDataBackLOG}
              ></GraficoPrazoTV>
            </div>
          </div>
          <div className="laptop:w-[20%] desktop:w-[20%] tablet:w-[35%] flex tablet:hidden">
            <div className="w-[90%] ">
              <SaldoEmTerceiros saldo={saldo}></SaldoEmTerceiros>
            </div>
          </div>

          <div className="flex laptop:hidden desktop:hidden">
            <div className="flex laptop:w-[40%] desktop:w-[40%] tablet:w-[65%] ">
              <div className="w-[40%] mx-auto mt-10">
                <GraficoBackLogTV
                  itemsTipo={itemsTipo}
                  setitemsTipo={setitemsTipo}
                  databackLog={databackLog}
                  setDataBackLOG={setDataBackLOG}
                ></GraficoBackLogTV>
              </div>
              <div className="w-[50%] mx-auto">
                <GraficoPrazoTV
                  status={status}
                  setStatus={setStatus}
                  databackLog={databackLog}
                  setDataBackLOG={setDataBackLOG}
                ></GraficoPrazoTV>
              </div>
            </div>
            <div className="laptop:w-[20%] desktop:w-[20%] tablet:w-[35%] flex">
              <div className="w-[90%] ">
                <SaldoEmTerceiros saldo={saldo}></SaldoEmTerceiros>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
