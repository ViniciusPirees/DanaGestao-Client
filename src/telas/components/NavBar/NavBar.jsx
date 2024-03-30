import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import DanaPng from "../../../assets/DANAPNG.png";
import { useNavigate } from "react-router-dom";
import getLogin from "../Login/getLogin";

import { MdOutlineLogout } from "react-icons/md";
import TrocaSenha from "../../0-Login/TrocaSenha";
import { FaChartPie } from "react-icons/fa";

export default function NavBar({ ativo }) {
  const navigate = useNavigate();

  const [logado, setLogado] = useState(true);
  const [nivel, setNivel] = useState(0);
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");

  useLayoutEffect(() => {
    getLogin().then((val) => {
      setNivel(val.n);
      setLogado(val.val);
      setNome(val.nome);
      setLogin(val.login);

      if (!val || (ativo == 6 && val.n == 1) || (ativo == 7 && val.n != 3)) {
        navigate("/");
      }
    });
  }, []);

  const styleNav = {
    menup:
      "phone:absolute phone:w-full laptop:h-screen desktop:h-screen tablet:h-screen desktop:fixed laptop:fixed tablet:fixed  bg-[#2E2E2E] z-[91] duration-300  ",
    centerp: "relative",
    centerf:
      " absolute top-3 desktop:left-0 laptop:left-0 tablet:left-0 desktop:top-1/2 laptop:top-1/2 tablet:top-1/2 desktop:w-[3em] laptop:w-[3em] tablet:w-[3em] tablet:translate-y-[-50%] desktop:translate-y-[-50%] laptop:translate-y-[-50%]",
    texto:
      "relative desktop:absolute tablet:absolute laptop:absolute desktop:ml-10 tablet:ml-5 laptop:ml-5 font-semibold text-2xl tablet:text-[1.5em] laptop:text-[1.5em] desktop:text-[1.7em]  w-full desktop:translate-y-[-50%] tablet:translate-y-[-50%] laptop:translate-y-[-50%] desktop:top-1/2 tablet:top-1/2 laptop:top-1/2 desktop:leading-8 tablet:leading-8 laptop:leading-8 text-center duration-300",

    iconsmenu:
      "h-16 desktop:h-20 tablet:h-20 laptop:h-12 hover:cursor-pointer duration-300 desktop:hover:bg-[#1F1F1F] tablet:hover:bg-[#1F1F1F] laptop:hover:bg-[#1F1F1F]  ",
    fotodana:
      "hidden desktop:block tablet:block laptop:block absolute w-28 tablet:w-24 laptop:w-24 desktop:mt-5 tablet:mt-2 laptop:mt-2 left-[14rem] tablet:left-[10.5rem] laptop:left-[10.5rem] duration-300",
  };

  const [aberto, setAberto] = useState(false);
  const [ativoSenha, setAtivoSenha] = useState(false);
  const [styleMenu, setstyleMenu] = useState(
    "w-full desktop:w-[6em] tablet:w-[4.5em] laptop:w-[3.5em] min-w-[0%]"
  );
  const [textMenu, setTextMenu] = useState(
    " opacity-0 desktop:translate-x-[-5em] tablet:translate-x-[-5em] laptop:translate-x-[-5em]"
  );
  const [fotoDana, setFotoDana] = useState(" opacity-0 translate-x-[-30em]");
  const [usuario, setUsuario] = useState(" opacity-0 translate-x-[-15em]");
  const [fundo, setFundo] = useState("opacity-0");
  useEffect(() => {
    if (aberto) {
      setstyleMenu(" w-[30em] tablet:w-[25em] laptop:w-[25em] min-w-[21%]");
      setTextMenu(" opacity-100 ");
      setFotoDana(" opacity-100 ");
      setUsuario(" opacity-100 ");
      setFundo(
        "desktop:opacity-50 tablet:opacity-50 laptop:opacity-50 opacity-90"
      );
    } else {
      setstyleMenu(" w-[6em] tablet:w-[4.5em] laptop:w-[3.5em] min-w-[0%]");
      setTextMenu(" opacity-0 translate-x-[-5em]");
      setFotoDana(" opacity-0 translate-x-[-30em] ");
      setFundo("opacity-0");
      setUsuario(" opacity-0 translate-x-[-15em] ");
    }
  }, [aberto]);
  const ref = useRef();

  return (
    <>
      {logado && (
        <div>
          {aberto && (
            <div
              onClick={() => setAberto(false)}
              className={
                fundo +
                " bg-[#000] fixed z-[90] top-0 left-0 w-full h-full duration-700"
              }
            ></div>
          )}
          <div ref={ref} className={styleNav.menup + styleMenu}>
            <div
              className={
                styleNav.centerp +
                " h-16 desktop:h-24 tablet:h-16 laptop:h-16 hover: cursor-pointer "
              }
              onClick={() => setAberto(!aberto)}
            >
              <FaBars
                className={
                  styleNav.centerf +
                  " text-4xl tablet:text-3xl laptop:text-2xl desktop:-ml-2.5 tablet:-ml-2.5 laptop:-ml-2.5 phone:mx-auto phone:w-full"
                }
              />
              <img
                onClick={() => navigate("/")}
                className={styleNav.fotodana + fotoDana}
                src={DanaPng}
              />
            </div>

            {/** Desktop e Tablet */}
            <div className="mt-2 tablet:mt-0 laptop:mt-0 hidden desktop:block tablet:block laptop:block">
              <div
                onClick={() =>
                  navigate("/SolicitarMateriais", {
                    state: { itens: [], solic: [], tipo: 1 },
                  })
                }
                className={
                  styleNav.iconsmenu +
                  styleNav.centerp +
                  (ativo == "1" ? " bg-[#1F1F1F]" : "")
                }
              >
                <FaFileCirclePlus
                  className={
                    styleNav.centerf +
                    " text-3xl tablet:text-2xl laptop:text-xl"
                  }
                />
                <div className={styleNav.texto + textMenu}>
                  Solicitar Material
                </div>
              </div>
              <div
                onClick={() => navigate("/ConsultarSolicitacao")}
                className={
                  styleNav.iconsmenu +
                  styleNav.centerp +
                  (ativo == "2" ? " bg-[#1F1F1F]" : "")
                }
              >
                <FaMagnifyingGlass
                  className={
                    styleNav.centerf +
                    " text-3xl tablet:text-2xl laptop:text-xl laptop:-ml[0.1em]"
                  }
                />
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
                <FaBoxesPacking
                  className={
                    styleNav.centerf +
                    " text-3xl tablet:text-2xl laptop:text-xl"
                  }
                />
                <div className={styleNav.texto + textMenu}>
                  Estoque Manutenção
                </div>
              </div>
              <div
                onClick={() => navigate("/EstoqueCentral")}
                className={
                  styleNav.iconsmenu +
                  styleNav.centerp +
                  (ativo == "4" ? " bg-[#1F1F1F]" : "")
                }
              >
                <FaBoxesStacked
                  className={
                    styleNav.centerf +
                    " text-3xl tablet:text-2xl laptop:text-xl"
                  }
                />
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
                <FaWrench
                  className={
                    styleNav.centerf +
                    " text-3xl tablet:text-2xl laptop:text-xl"
                  }
                />
                <div className={styleNav.texto + textMenu}>
                  Conserto Externo
                </div>
              </div>
              {(nivel == 3 || nivel == 2) && (
                <div
                  onClick={() => navigate("/ControleRC")}
                  className={
                    styleNav.iconsmenu +
                    styleNav.centerp +
                    (ativo == "6" ? " bg-[#1F1F1F]" : "")
                  }
                >
                  <AiOutlineControl
                    className={
                      styleNav.centerf +
                      " text-4xl tablet:text-3xl laptop:text-2xl -ml-2.5"
                    }
                  />
                  <div className={styleNav.texto + textMenu}>
                    Controle de Requisição
                  </div>
                </div>
              )}

              {nivel == 3 && (
                <div
                  onClick={() => navigate("/AcessoAdmin")}
                  className={
                    styleNav.iconsmenu +
                    styleNav.centerp +
                    (ativo == "7" ? " bg-[#1F1F1F]" : "")
                  }
                >
                  <RiAdminFill
                    className={
                      styleNav.centerf +
                      " text-4xl tablet:text-3xl laptop:text-2xl -ml-2.5"
                    }
                  />
                  <div className={styleNav.texto + textMenu}>
                    Acesso Administrador
                  </div>
                </div>
              )}
            </div>

            <div
              className={
                "mt-8 duration-[280ms] hidden desktop:block tablet:block laptop:block " +
                usuario
              }
            >
              <div className="w-full">
                <div className=" flex justify-center text-center w-full">
                  <h1 className="flex text-[1.7em]  text-center">
                    Usuário: {nome}
                  </h1>
                </div>
                <div className=" flex ">
                  <h1
                    onClick={() => {
                      setAberto(false);
                      setAtivoSenha(true);
                    }}
                    className="flex text-[1.6em] text-[#cacaca] mx-auto hover:cursor-pointer"
                  >
                    Trocar Senha
                  </h1>
                </div>
                <div className="mt-4">
                  <button
                    className={
                      "flex text-[1.7em] font-bold mx-auto bg-dana p-2 rounded-md"
                    }
                    onClick={() => {
                      sessionStorage.clear();
                      navigate(0);
                    }}
                  >
                    <MdOutlineLogout className="my-auto mr-2" />
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              aberto
                ? "desktop:hidden tablet:hidden laptop:hidden"
                : "hidden desktop:hidden tablet:hidden laptop:hidden"
            }
          >
            <div className="mt-24 absolute w-full z-[91]">
              <div
                onClick={() =>
                  navigate("/SolicitarMateriais", {
                    state: { itens: [], solic: [], tipo: 1 },
                  })
                }
                className={styleNav.iconsmenu + styleNav.centerp}
              >
                <div className={"w-full mx-auto" + styleNav.texto + textMenu}>
                  Solicitar Material
                </div>
              </div>
              <div
                onClick={() => navigate("/ConsultarSolicitacao")}
                className={styleNav.iconsmenu + styleNav.centerp}
              >
                <div className={styleNav.texto + textMenu}>
                  Consultar Solicitação
                </div>
              </div>
              <div
                onClick={() => navigate("/EstoqueManutencao")}
                className={styleNav.iconsmenu + styleNav.centerp}
              >
                <div className={styleNav.texto + textMenu}>
                  Estoque Manutenção
                </div>
              </div>
              <div
                onClick={() => navigate("/EstoqueCentral")}
                className={styleNav.iconsmenu + styleNav.centerp}
              >
                <div className={styleNav.texto + textMenu}>Estoque Central</div>
              </div>
              <div
                onClick={() => navigate("/ConsertoExterno")}
                className={styleNav.iconsmenu + styleNav.centerp}
              >
                <div className={styleNav.texto + textMenu}>
                  Conserto Externo
                </div>
              </div>
              {(nivel == 3 || nivel == 2) && (
                <div
                  onClick={() => navigate("/ControleRC")}
                  className={styleNav.iconsmenu + styleNav.centerp}
                >
                  <div className={styleNav.texto + textMenu}>
                    Controle de Requisição
                  </div>
                </div>
              )}

              {nivel == 3 && (
                <div
                  onClick={() => navigate("/AcessoAdmin")}
                  className={styleNav.iconsmenu + styleNav.centerp}
                >
                  <div className={styleNav.texto + textMenu}>
                    Acesso Administrador
                  </div>
                </div>
              )}
              <div className={styleNav.iconsmenu + styleNav.centerp}>
                <div className="w-full">
                  <div className=" flex ">
                    <h1 className="flex text-2xl mx-auto ">
                      Usuário:<span className="font-bold ml-3">{nome}</span>
                    </h1>
                  </div>
                  <div className=" flex ">
                    <h1
                      onClick={() => {
                        setAberto(false);
                        setAtivoSenha(true);
                      }}
                      className="flex text-2xl text-[#cacaca] mx-auto hover:cursor-pointer"
                    >
                      Trocar Senha
                    </h1>
                  </div>
                  <div className="mt-4">
                    <button
                      className={
                        "flex text-[1.7em] font-bold mx-auto bg-dana p-2 rounded-md"
                      }
                      onClick={() => {
                        sessionStorage.clear();
                        navigate(0);
                      }}
                    >
                      <MdOutlineLogout className="my-auto mr-2" />
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              aberto
                ? "desktop:hidden tablet:hidden laptop:hidden"
                : "hidden desktop:hidden tablet:hidden laptop:hidden"
            }
          >
            <div
              className={
                "duration-[280ms] top- z-[91] absolute desktop:block tablet:block laptop:block " +
                usuario
              }
            ></div>
          </div>

          <div>
            {ativoSenha && (
              <TrocaSenha
                setAtivoSenha={setAtivoSenha}
                usuario={login}
              ></TrocaSenha>
            )}
          </div>
        </div>
      )}
    </>
  );
}
