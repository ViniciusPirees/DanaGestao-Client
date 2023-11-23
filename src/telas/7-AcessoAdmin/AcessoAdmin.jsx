import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { styleAll } from "../../css";
import Titulo from "../components/Titulo";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import getLogin from "../components/getLogin";
import ConsultarMateriais from "./CriarRCSolic/ConsultarMateriais";
import Conserto from "./CriarRCCon/Conserto";

export default function AcessoAdmin() {
  const nav = useNavigate();
  const [logado, setLogado] = useState(null);
  useEffect(() => {
    getLogin().then((val) => {
      setLogado(val);
      if (!val) {
        nav('/')
      }
    });
  }, []);
  const [solicAtivo, setSolicAtivo] = useState(true)
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
      {logado && (
        <div className="w-full pl-[8.5em] pr-10">
          <Titulo titulo="Acesso Administrador" />
          <div className="mt-5 float-right mr-10">
            <button
              onClick={() => nav("./Cadastros")}
              className="bg-dana font-bold p-2 rounded-md text-2xl "
            >
              Cadastros
            </button>
          </div>
          <div className="mt-10 w-full">
            <div className="flex mt-5 ml-5">
              <button onClick={() => setSolicAtivo(true)} className={`${solicAtivo ? 'bg-[#104F77]' : 'bg-dana'} text-2xl font-bold p-3 rounded-ss-md duration-200 hover:brightness-110`}>
                Solicitações
              </button>
              <button onClick={() => setSolicAtivo(false)} className={`${!solicAtivo ? 'bg-[#104F77]' : 'bg-dana'} text-2xl font-bold p-3 rounded-se-md duration-200 hover:brightness-110`}>
                Conserto
              </button>

            </div>
            {solicAtivo &&
              <div className="border-t-2 rounded-md px-4 "><ConsultarMateriais></ConsultarMateriais></div>}
            {!solicAtivo && <div className="border-t-2 rounded-md px-4 "><Conserto></Conserto></div>}
          </div>
        </div>
      )}
    </div>
  );
}
