import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";

import Titulo from "../../components/NavBar/Titulo";

import { ToastContainer } from "react-toastify";

import getLogin from "../../components/Login/getLogin";
import { useNavigate } from "react-router-dom";
import LoadingGet from "../../components/Loading/LoadingGet";

import GraficoMan from "./GraficoMan";
import GraficoConserto from "./GraficoConserto";
import GraficoSolic from "./GraficoSolic";
import GraficoRcsCriadas from "./GraficoRcsCriadas";

export default function Graficos() {
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

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        nav("/AcessoAdmin");
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const [load, setLoad] = useState(false);

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
        <div>
          <div className="laptop:flex desktop:flex">
            <div className="laptop:w-[50%] desktop:w-[40%] laptop:max-w-[55em] desktop:max-w-[55em] tablet:w-[100%] mx-auto  mt-10">
              <GraficoConserto
                setLoad={setLoad}
                ratio={false}
              ></GraficoConserto>
            </div>
            <div className="laptop:w-[50%] desktop:w-[40%] laptop:max-w-[55em] desktop:max-w-[55em] tablet:w-[100%] mx-auto mt-10">
              <GraficoMan setLoad={setLoad} ratio={false}></GraficoMan>
            </div>
          </div>
          <div className="laptop:flex desktop:flex ">
            <div className="laptop:w-[50%] desktop:w-[40%] laptop:max-w-[55em] desktop:max-w-[55em] tablet:w-[100%] mx-auto mt-10">
              <GraficoSolic setLoad={setLoad} ratio={false}></GraficoSolic>
            </div>
            <div className="laptop:w-[50%] desktop:w-[40%] laptop:max-w-[55em] desktop:max-w-[55em] tablet:w-[100%] mx-auto mt-10">
              <GraficoRcsCriadas
                setLoad={setLoad}
                ratio={false}
              ></GraficoRcsCriadas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
