import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { styleAll } from "../../../css";
import Titulo from "../../components/Titulo";
import { useNavigate } from "react-router-dom";
import { MdPrecisionManufacturing } from "react-icons/md";
import { PiToolboxFill } from "react-icons/pi";
import { FaTruckRampBox, FaLayerGroup, FaUsers } from "react-icons/fa6";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { MdPersonSearch } from "react-icons/md";
import getLogin from "../../components/getLogin";

export default function Cadastros() {
  const nav = useNavigate();
  const [logado, setLogado] = useState(null);
  const [nivel, setNivel] = useState(0);

  useEffect(() => {
    getLogin().then((val) => {
      setLogado(val.val);
      setNivel(val.n);
      if (!val) {
        nav("/AcessoAdmin");
      }
    });
  }, []);

  return (
    <div className="flex">
      <NavBar ativo="7"></NavBar>
      <div className="w-full ml-[8.5em] mr-10">
        <Titulo titulo="Cadastros" />
        {/*<div className="mt-5">
          <button
            onClick={() => nav("/AcessoAdmin")}
            className="bg-dana font-bold p-2 ml-5 rounded-md text-2xl"
          >
            Voltar
          </button>
  </div>*/}
        <div className="flex mt-10 mx-auto w-full">
          <Opcoes
            icon={
              <MdPrecisionManufacturing className="text-[7em] mx-auto mt-6" />
            }
            texto={"Máquinas"}
            caminho={"./Maquinas"}
          />
          <Opcoes
            icon={<PiToolboxFill className="text-[7em] mx-auto mt-6" />}
            texto={"Manutentor"}
            caminho={"./Manutentor"}
          />
          <Opcoes
            icon={
              <VscTypeHierarchySub className="text-[6em] mx-auto mb-3 mt-7" />
            }
            texto={"Área"}
            caminho={"./Area"}
          />

          <Opcoes
            icon={<MdPersonSearch className="text-[7em] mx-auto mt-6" />}
            texto={"Solicitante"}
            caminho={"./Solicitante"}
          />
          <Opcoes
            icon={<FaLayerGroup className="text-[6em] mx-auto mt-7 mb-3" />}
            texto={"Tipo Material"}
            caminho={"./TipoMaterial"}
          />
          {nivel == 3 && (
            <Opcoes
              icon={<FaUsers className="text-[7em] mx-auto mt-6" />}
              texto={"Usuários"}
              caminho={"./Usuarios"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Opcoes({ icon, texto, caminho }) {
  const nav = useNavigate();
  return (
    <div
      onClick={() => nav(caminho)}
      className="text-center w-[13em] h-[13em] mx-5 rounded-md  bg-dana hover:cursor-pointer"
    >
      <div className="duration-500 w-full hover:scale-105 text-[#fff]">
        {icon}
        <h1 className="text-3xl font-bold">{texto}</h1>
      </div>
    </div>
  );
}
