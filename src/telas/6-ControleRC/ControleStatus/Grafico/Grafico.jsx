import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";

import Titulo from "../../../components/NavBar/Titulo";

import { ToastContainer } from "react-toastify";

import getLogin from "../../../components/Login/getLogin";
import { useFetcher, useNavigate } from "react-router-dom";
import LoadingGet from "../../../components/Loading/LoadingGet";

import axios from "axios";
import Notificacao from "../../../components/Notificacao";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import FiltroClick from "../../../components/Graficos/FiltroClick";
import GraficoBackLog from "./GraficoBackLog";
import GraficoPrazo from "./GraficoPrazo";
import { HiOutlineRefresh } from "react-icons/hi";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Grafico() {
  const nav = useNavigate();

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
  useEffect(() => {
    getDataBackLOG();
  }, [divisao, conta]);

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
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        getDataBackLOG();
      } else if (event.key === "Escape") {
        event.preventDefault();
        nav(-1);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [divisao, conta]);

  useEffect(() => {
    getStatus();
    getTipos();
  }, []);

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
      <div className="w-full pl-[8.5em] pr-10 laptop:pl-[6.5em] tablet:pl-[6.5em] ">
        {load && <LoadingGet></LoadingGet>}
        <Titulo titulo="Gráficos" />
        <div className="laptop:flex desktop:flex">
          <div className="block p-5">
            <div className="mt-0 w-full">
              <button
                className="flex bg-dana text-center mx-auto rounded-md laptop:px-3 desktop:px-6 duration-200 hover:scale-105 text-2xl tablet:text-xl font-bold p-2"
                onClick={() => {
                  getDataBackLOG();
                }}
              >
                Atualizar
                <HiOutlineRefresh className="my-auto mx-auto ml-[0.25em] text-3xl tablet:text-2xl" />
              </button>
            </div>
            <div className="tablet:flex tablet:mx-auto">
              <div className="tablet:mx-auto">
                <div className="my-5">
                  <FiltroClick
                    titulo={"Conta"}
                    items={conta}
                    setItems={setConta}
                  />
                </div>
                <div className="my-5">
                  <FiltroClick
                    titulo={"Divisão"}
                    items={divisao}
                    setItems={setDivisao}
                  />
                </div>
              </div>
              <div className="my-5 tablet:mx-auto">
                <FiltroClick
                  titulo={"Tipo"}
                  items={itemsTipo}
                  setItems={setitemsTipo}
                />
              </div>
              <div className="my-5 tablet:mx-auto">
                <FiltroClick
                  titulo={"Status"}
                  items={status}
                  setItems={setStatus}
                />
              </div>
            </div>
          </div>
          <div className="w-[40%] laptop:w-[40%] tablet:w-[85%] tablet:mx-auto">
            <GraficoBackLog
              itemsTipo={itemsTipo}
              setitemsTipo={setitemsTipo}
              databackLog={databackLog}
              setDataBackLOG={setDataBackLOG}
            ></GraficoBackLog>
          </div>
          <div className="w-[50%] laptop:w-[40%] tablet:w-[100%] tablet:mx-auto">
            <GraficoPrazo
              status={status}
              setStatus={setStatus}
              databackLog={databackLog}
              setDataBackLOG={setDataBackLOG}
            ></GraficoPrazo>
          </div>
        </div>
      </div>
    </div>
  );
}
