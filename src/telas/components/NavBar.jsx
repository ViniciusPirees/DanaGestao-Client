import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FaBars,
  FaFileCirclePlus,
  FaMagnifyingGlass,
  FaBoxesPacking,
  FaBoxesStacked,
  FaWrench,
  FaBridgeLock,
} from "react-icons/fa6";
import { AiOutlineControl } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import DanaPng from "../../assets/DANAPNG.png";
import { useNavigate } from "react-router-dom";
import getLogin from "./getLogin";

import { MdOutlineLogout } from "react-icons/md";

export default function NavBar({ ativo }) {
  const navigate = useNavigate();

  const [logado, setLogado] = useState(true);
  const [nivel, setNivel] = useState(0)
  const [nome, setNome] = useState('')
  const [login, setLogin] = useState('')

  useLayoutEffect(() => {
    getLogin().then((val) => {
      setNivel(val.n)
      setLogado(val.val);
      setNome(val.nome)
      setLogin(val.login)
      if (!val) {
        navigate('/')
      }
    });
  }, []);



  const styleNav = {
    menup: "h-screen fixed  bg-[#2E2E2E] z-[91] duration-300 z-50",
    centerp: "relative",
    centerf: "absolute top-1/2 w-[3em] translate-y-[-50%]",
    texto:
      "absolute ml-10 font-semibold text-[1.7em] w-full translate-y-[-50%] top-1/2 leading-8 text-center duration-300",
    iconsmenu: "h-20 hover:cursor-pointer duration-300 hover:bg-[#1F1F1F]  ",
    fotodana: "absolute w-28 mt-5 left-[14rem] duration-300",
  };

  const [aberto, setAberto] = useState(false);

  const [styleMenu, setstyleMenu] = useState(" w-[6em] min-w-[0%]");
  const [textMenu, setTextMenu] = useState(" opacity-0 translate-x-[-5em]");
  const [fotoDana, setFotoDana] = useState(" opacity-0 translate-x-[-30em]");
  const [usuario, setUsuario] = useState(" opacity-0 translate-x-[-15em]")
  const [fundo, setFundo] = useState("opacity-0");
  useEffect(() => {
    if (aberto) {
      setstyleMenu(" w-[30em] min-w-[21%]");
      setTextMenu(" opacity-100 ");
      setFotoDana(" opacity-100 ");
      setUsuario(" opacity-100 ");
      setFundo("opacity-50");
    } else {
      setstyleMenu(" w-[6em] min-w-[0%]");
      setTextMenu(" opacity-0 translate-x-[-5em]");
      setFotoDana(" opacity-0 translate-x-[-30em] ");
      setFundo("opacity-0");
      setUsuario(" opacity-0 translate-x-[-15em] ");
    }
  }, [aberto]);

  return (

    <>
      {logado && <div>
        {aberto && (
          <div
            onClick={() => setAberto(false)}
            className={
              fundo +
              " bg-[#000] fixed z-[90] top-0 left-0 w-full h-full duration-700"
            }
          ></div>
        )}
        <div className={styleNav.menup + styleMenu}>
          <div
            className={styleNav.centerp + " h-24 hover: cursor-pointer "}
            onClick={() => setAberto(!aberto)}
          >
            <FaBars className={styleNav.centerf + " text-4xl -ml-2.5"} />
            <img
              onClick={() => navigate("/")}
              className={styleNav.fotodana + fotoDana}
              src={DanaPng}
            />
          </div>
          <div className="mt-2">
            <div
              onClick={() => navigate("/SolicitarMateriais", { state: { itens: [], solic: [], tipo: 1 } })}
              className={
                styleNav.iconsmenu +
                styleNav.centerp +
                (ativo == "1" ? " bg-[#1F1F1F]" : "")
              }
            >
              <FaFileCirclePlus className={styleNav.centerf + " text-3xl"} />
              <div className={styleNav.texto + textMenu}>Solicitar Material</div>
            </div>
            <div
              onClick={() => navigate("/ConsultarSolicitacao")}
              className={
                styleNav.iconsmenu +
                styleNav.centerp +
                (ativo == "2" ? " bg-[#1F1F1F]" : "")
              }
            >
              <FaMagnifyingGlass className={styleNav.centerf + " text-3xl"} />
              <div className={styleNav.texto + textMenu}>
                Consultar Solicitação
              </div>
            </div>
            <div
              onClick={() => navigate("/EstoqueManutencao")}
              className={
                styleNav.iconsmenu +
                styleNav.centerp +
                (ativo == "3" ? " bg-[#1F1F1F]" : "")
              }
            >
              <FaBoxesPacking className={styleNav.centerf + " text-3xl"} />
              <div className={styleNav.texto + textMenu}>Estoque Manutenção</div>
            </div>
            <div
              onClick={() => navigate("/EstoqueCentral")}
              className={
                styleNav.iconsmenu +
                styleNav.centerp +
                (ativo == "4" ? " bg-[#1F1F1F]" : "")
              }
            >
              <FaBoxesStacked className={styleNav.centerf + " text-3xl"} />
              <div className={styleNav.texto + textMenu}>Estoque Central</div>
            </div>
            <div
              onClick={() => navigate("/ConsertoExterno")}
              className={
                styleNav.iconsmenu +
                styleNav.centerp +
                (ativo == "5" ? " bg-[#1F1F1F]" : "")
              }
            >
              <FaWrench className={styleNav.centerf + " text-3xl"} />
              <div className={styleNav.texto + textMenu}>Conserto Externo</div>
            </div>
            <div
              onClick={() => navigate("/ControleRC")}
              className={
                styleNav.iconsmenu +
                styleNav.centerp +
                (ativo == "6" ? " bg-[#1F1F1F]" : "")
              }
            >
              <AiOutlineControl
                className={styleNav.centerf + " text-4xl -ml-2.5"}
              />
              <div className={styleNav.texto + textMenu}>
                Controle de Requisição
              </div>
            </div>
            {(nivel == 3 || nivel == 2) &&
              <div
                onClick={() => navigate("/AcessoAdmin/Cadastros")}
                className={
                  styleNav.iconsmenu +
                  styleNav.centerp +
                  (ativo == "7" ? " bg-[#1F1F1F]" : "")
                }
              >
                <RiAdminFill className={styleNav.centerf + " text-4xl -ml-2.5"} />
                <div className={styleNav.texto + textMenu}>
                  Acesso Administrador
                </div>
              </div>
            }
          </div>

          <div className={"mt-12 duration-[280ms] " + usuario}>
            <div className="w-full">
              <div className=" flex ">
                <h1 className="flex text-[1.7em] mx-auto ">
                  Usuário:<span className="font-bold ml-3">{nome}</span>
                </h1>
              </div>
              <div className="mt-4">
                <button className={'flex text-[1.7em] font-bold mx-auto bg-dana p-2 rounded-md'} onClick={() => {
                  sessionStorage.clear()
                  navigate(0)
                }}><MdOutlineLogout className="my-auto mr-2" />Sair</button>
              </div>
            </div>

          </div>
        </div>
      </div>}
    </>
  );
}
