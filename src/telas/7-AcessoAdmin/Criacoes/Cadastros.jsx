import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { styleAll } from "../../../css";
import Titulo from "../../components/NavBar/Titulo";
import { useNavigate } from "react-router-dom";
import { MdPrecisionManufacturing } from "react-icons/md";
import { PiToolboxFill } from "react-icons/pi";
import { FaTruckRampBox, FaLayerGroup, FaUsers } from "react-icons/fa6";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { MdPersonSearch } from "react-icons/md";
import getLogin from "../../components/Login/getLogin";
import { IoIosOptions } from "react-icons/io";
import { GoMultiSelect } from "react-icons/go";

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

  return (
    <div className="flex">
      <NavBar ativo="7"></NavBar>
      <div className="w-full pl-[8.5em] pr-10 laptop:pl-[6.5em] tablet:pl-[6.5em]">
        <Titulo titulo="Cadastros" />
        {/*<div className="mt-5">
          <button
            onClick={() => nav("/AcessoAdmin")}
            className="bg-dana font-bold p-2 ml-5 rounded-md text-2xl"
          >
            Voltar
          </button>
  </div>*/}
        <div className="desktop:flex mt-10 mx-auto w-full">
          <div className="flex">
            <Opcoes
              icon={
                <MdPrecisionManufacturing className="text-[7em] tablet:text-[5em] mx-auto mt-6 " />
              }
              texto={"Máquinas"}
              caminho={"./Maquinas"}
            />
            <Opcoes
              icon={
                <PiToolboxFill className="text-[7em] tablet:text-[5em] mx-auto mt-6" />
              }
              texto={"Manutentor"}
              caminho={"./Manutentor"}
            />
            <Opcoes
              icon={
                <VscTypeHierarchySub className="text-[6em] tablet:text-[5em] mx-auto mb-3 mt-7" />
              }
              texto={"Área"}
              caminho={"./Area"}
            />
          </div>
          <div className="flex tablet:mt-10 laptop:mt-6">
            <Opcoes
              icon={
                <FaLayerGroup className="text-[6em] tablet:text-[5em] mx-auto mt-7 mb-3" />
              }
              texto={"Tipo Material"}
              caminho={"./TipoMaterial"}
            />

            <Opcoes
              icon={
                <IoIosOptions className="text-[6em] tablet:text-[5em] mx-auto mt-7 mb-3" />
              }
              texto={"Tipo Status"}
              caminho={"./TipoStatus"}
            />
            <Opcoes
              icon={
                <GoMultiSelect className="text-[6em] tablet:text-[5em] mx-auto mt-7 mb-3" />
              }
              texto={"Status Prev."}
              caminho={"./StatusPrev"}
            />
          </div>
          <div className="flex tablet:mt-10 laptop:mt-6">
            {nivel == 3 && (
              <Opcoes
                icon={
                  <FaUsers className="text-[7em] tablet:text-[5em] mx-auto mt-6" />
                }
                texto={"Usuários"}
                caminho={"./Usuarios"}
              />
            )}
          </div>
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
      className="text-center w-[13em] tablet:w-[10em] tablet:h-[10em] h-[13em] mx-5 rounded-md  bg-dana hover:cursor-pointer"
    >
      <div className="duration-500 w-full hover:scale-105 text-[#fff]">
        {icon}
        <h1 className="text-3xl tablet:text-xl font-bold">{texto}</h1>
      </div>
    </div>
  );
}
