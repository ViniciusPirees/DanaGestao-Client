import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { styleAll } from "../../css";
import Titulo from "../components/Titulo";
import axios from "axios";
import SearchDropdown from "../components/SearchDropdown";
import "react-toastify/dist/ReactToastify.css";
import Notificacao from "../components/Notificacao";
import { BsFillCameraFill } from "react-icons/bs";
import CamPopUp from "../components/CamPopUp";
import ItensMateriais from "./ItensMateriais";
import { ToastContainer, toast } from "react-toastify";
import ConfirmarPopUp from "./ConfirmarPopUp";
import { useLocation, useNavigate } from "react-router-dom";
import getLogin from "../components/getLogin";

export default function SolicitarMateriais() {
  const nav = useNavigate();
  const [logado, setLogado] = useState(null);
  const [usuAlt, setUsuAlt] = useState("");
  const [nivel, setNivel] = useState(0);
  useEffect(() => {
    getLogin().then((val) => {
      setLogado(val.val);
      setNivel(val.n);
      setUsuAlt(`${val.cod} - ${val.nome}`);
      if (!val) {
        nav("/");
      }
    });
  }, []);

  //DESCRICAO
  const ref = useRef();
  const [descricao, setDescricao] = useState("");
  // DATA HOJE
  const DataHoje = new Date();

  const defaultValue = DataHoje.toLocaleDateString("en-CA");

  const [data, setData] = useState(defaultValue);

  const setDataFo = (e) => {
    var DateSelecionada = new Date(e.target.value);
    setData(DateSelecionada.toLocaleDateString("en-CA"));
  };

  // GET MÁQUINAS SELECT
  const [maquinas, setMaquinas] = useState([]);
  const [maquina, setMaquina] = useState("");

  useEffect(() => {
    //DESCRICAO MUDAR
    if (maquina[0]?.toString.length > 0) {
      setDescricao(`${maquina[0]} - ${maquina[1]}`);
    } else {
      setDescricao("");
    }
  }, [maquina]);

  useEffect(() => {
    const getMaquinas = async () => {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}:4400/GetMaquinas`
        );
        setMaquinas(res.data);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar Máquinas" + err]);
      }
    };
    getMaquinas();
  }, []);

  //OS
  const [os, setOS] = useState("");

  //SOLICITANTE
  const [solicitantes, setSolicitantes] = useState([]);
  const [solicitante, setSolicitante] = useState("");

  useEffect(() => {
    const getSolic = async () => {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}:4400/GetSolic`
        );
        setSolicitantes(res.data);
      } catch (err) {
        Notificacao(["erro", "Erro ao buscar Solicitantes" + err]);
        console.log(err);
      }
    };
    getSolic();
  }, []);

  //OBSERVAÇÃO
  const [observacao, setObservacao] = useState("");

  //ANEXO POPUP
  const [anexotela, setAnexoTela] = useState(false);
  const [anexofile, setAnexoFile] = useState(null);

  //ITEMS

  const [items, setItems] = useState([]);

  //CRIAR SOLICITACAO

  const [ativoConfirm, setConfirm] = useState(false);
  const [params, setParams] = useState(null);

  const criarSol = async () => {
    if (maquina.length == 0) {
      return Notificacao(["erro", `Necessário selecionar Máquina.`]);
    }
    if (descricao.length == 0) {
      return Notificacao(["erro", `Necessário digitar Descrição.`]);
    }

    if (os.toString().length == 0) {
      return Notificacao(["erro", `Necessário digitar OS.`]);
    }

    if (os.toString().length != 6) {
      return Notificacao(["erro", `Necessário que a OS tenha 6 dígitos.`]);
    }

    if (solicitante.length == 0) {
      return Notificacao(["erro", `Necessário selecionar Solicitante.`]);
    }

    if (items.length == 0) {
      return Notificacao(["erro", `Necessário inserir os items.`]);
    }

    var verifica = false;
    verifica = items.map((item) => {
      if (item[0].length == 0 || item[1].length == 0 || item[1] == 0) {
        return true;
      }
    });

    if (verifica[0]) {
      return Notificacao(["erro", `Verifique as informaçoes dos items`]);
    }

    const formdata = new FormData();
    formdata.append("image", anexofile);

    if (state?.tipo == 2) {
      try {
        const res = await axios.post(
          `http://${import.meta.env.VITE_IP}:4400/EditarSolic`,
          formdata,
          {
            params: {
              data: data,
              maquina: maquina,
              descricao: descricao,
              os: os,
              solicitante: solicitante,
              observacao: observacao,
              items: items,

              matCod: solic.MatSolicitacao,
              usuAlt: usuAlt,
            },
          }
        );

        nav("/ConsultarSolicitacao");
      } catch (err) {
        Notificacao(["erro", "Erro ao criar Solicitação"]);
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post(
          `http://${import.meta.env.VITE_IP}:4400/CriarSolic`,
          formdata,
          {
            params: {
              data: data,
              maquina: maquina,
              descricao: descricao,
              os: os,
              solicitante: solicitante,
              observacao: observacao,

              items: items,
            },
          }
        );
        nav("/ConsultarSolicitacao");
      } catch (err) {
        Notificacao(["erro", "Erro ao criar Solicitação"]);
        console.log(err);
      }
    }

    /*
    setParams({
      data: data,
      maquina: maquina,
      descricao: descricao,
      os: os,
      solicitante: solicitante,
      observacao: observacao,
      items: items,
    });

    setConfirm(true);*/
  };

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const convertBase64ToFile = function (image) {
    const byteString = atob(image.replace(/-/g, "+").replace(/_/g, "/"));
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const newBlob = new Blob([ab], {
      type: "image/jpeg",
    });
    return newBlob;
  };

  const getAnexo = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getAnexo`,
        { params: { matCod: solic?.MatSolicitacao } }
      );
      if (res?.data.length > 0) {
        var buffer = res?.data[0].MatAnexo.data;
        var base64 = _arrayBufferToBase64(buffer);
        var image = convertBase64ToFile(base64);
        setAnexoFile(image);
      }
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar anexo. " + err]);
    }
  };

  const state = useLocation().state;
  const solic = state?.solic;
  const [dataAlt, setDataAlt] = useState();
  useEffect(() => {
    if (state?.tipo == 2) {
      var data1 = String(solic?.MatData);
      setData(
        `${data1.toString().substring(8, 10)}/${data1
          .toString()
          .substring(5, 7)}/${data1.toString().substring(0, 4)} - ${data1
          .toString()
          .substring(11, 19)}`
      );
      data1 = String(solic?.MatDataAlt);
      setDataAlt(
        `${data1.toString().substring(8, 10)}/${data1
          .toString()
          .substring(5, 7)}/${data1.toString().substring(0, 4)} - ${data1
          .toString()
          .substring(11, 19)}`
      );
      setMaquina([solic?.MatMaquina, solic?.MatMaquinaDesc]),
        setDescricao(solic?.MatDescricao),
        setOS(solic?.MatOs),
        setSolicitante([solic?.MatSolicitanteDesc, solic?.MatSolicitante]),
        setObservacao(solic?.MatObservacao),
        getAnexo();
    }
  }, []);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        criarSol();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [
    data,
    maquina,
    descricao,
    os,
    solicitante,
    observacao,
    items,

    solic,
    usuAlt,
  ]);

  const [hisAtivo, setHisAtivo] = useState(false);

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

      <div className="flex text-[#fff]">
        <NavBar ativo="1"></NavBar>
        <div className="w-full ml-[8.5em] mr-10">
          <div className="">
            {anexotela && (
              <CamPopUp
                setAnexoTela={setAnexoTela}
                setAnexoFile={setAnexoFile}
                anexofile={anexofile}
              ></CamPopUp>
            )}
            {ativoConfirm && (
              <ConfirmarPopUp
                params={params}
                anexo={anexofile}
                setConfirm={setConfirm}
              ></ConfirmarPopUp>
            )}
          </div>
          <Titulo titulo="Solicitar Materiais" />
          <div className="w-[97%] mx-auto ">
            <div className="flex mr-3">
              {state?.tipo != 2 ? (
                <>
                  <div className="mt-8 ml-3 w-[15%]">
                    <h1 className="text-[26px]  font-bold mb-2">Data:</h1>
                    <input
                      disabled
                      type="date"
                      defaultValue={defaultValue}
                      className={styleAll.inputSoWDis}
                      placeholder=""
                    />
                  </div>

                  <div className="mt-8 ml-12 w-[20%]">
                    <h1 className="text-[26px] font-bold mb-2">Máquina:</h1>
                    <SearchDropdown
                      options={maquinas}
                      setValue={setMaquina}
                      opt={1}
                      defValue={""}
                    ></SearchDropdown>
                  </div>
                  <div className="mt-8 ml-12 w-[65%] ">
                    <h1 className="text-[26px]  font-bold mb-2">Descrição:</h1>
                    <input
                      ref={ref}
                      className={styleAll.inputSoWDis}
                      placeholder=""
                      disabled
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full">
                    <div className="flex">
                      <div className="mt-8 ml-3 w-[15%]">
                        <h1 className="text-[26px]  font-bold mb-2">
                          Solicitação:
                        </h1>
                        <input
                          type="text"
                          defaultValue={solic?.MatSolicitacao}
                          disabled
                          className={styleAll.inputSoWDis}
                          placeholder=""
                        />
                      </div>
                      <div className="mt-8 ml-12 w-[20%]">
                        <h1 className="text-[26px]  font-bold mb-2">Data:</h1>
                        <input
                          type="text"
                          defaultValue={`${solic?.MatData.toString().substring(
                            8,
                            10
                          )}/${solic?.MatData.toString().substring(
                            5,
                            7
                          )}/${solic?.MatData.toString().substring(
                            0,
                            4
                          )} - ${solic?.MatData.toString().substring(11, 19)}`}
                          disabled
                          className={styleAll.inputSoWDis}
                          placeholder=""
                        />
                      </div>
                      <div className="mt-8 ml-12 w-[20%]">
                        <h1 className="text-[26px]  font-bold mb-2">
                          Data Alteração:
                        </h1>
                        <input
                          type="text"
                          defaultValue={`${solic?.MatDataAlt.toString().substring(
                            8,
                            10
                          )}/${solic?.MatDataAlt.toString().substring(
                            5,
                            7
                          )}/${solic?.MatDataAlt.toString().substring(
                            0,
                            4
                          )} - ${solic?.MatDataAlt.toString().substring(
                            11,
                            19
                          )}`}
                          disabled
                          className={styleAll.inputSoWDis}
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mt-8 ml-3 w-[25%]">
                        <h1 className="text-[26px] font-bold mb-2">Máquina:</h1>
                        <SearchDropdown
                          options={maquinas}
                          setValue={setMaquina}
                          opt={1}
                          defValue={solic?.MatMaquina}
                        ></SearchDropdown>
                      </div>
                      <div className="mt-8 ml-12 w-[75%] ">
                        <h1 className="text-[26px]  font-bold mb-2">
                          Descrição:
                        </h1>
                        <input
                          ref={ref}
                          className={styleAll.inputSoWDis}
                          placeholder=""
                          disabled
                          value={descricao}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex mr-3">
              <div className="mt-8 ml-3 w-[11%]">
                <h1 className="text-[26px]  font-bold mb-2">OS:</h1>
                <input
                  type="number"
                  value={os}
                  className={styleAll.inputSoW}
                  placeholder=""
                  maxLength={"6"}
                  onChange={(e) => {
                    if (e.target.value.length > 6) {
                      setOS(e.target.value.slice(0, 6));
                    } else {
                      setOS(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="mt-8 ml-12 w-[33%]">
                <h1 className="text-[26px] font-bold mb-2">Solicitante:</h1>
                <SearchDropdown
                  options={solicitantes}
                  setValue={setSolicitante}
                  opt={2}
                  defValue={state.tipo != 2 ? "" : solic?.MatSolicitanteDesc}
                ></SearchDropdown>
              </div>

              <div className="mt-8 ml-12 w-[45%] ">
                <h1 className="text-[26px]  font-bold mb-2">Observação:</h1>
                <input
                  className={styleAll.inputSoW}
                  placeholder=""
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </div>
              <div className="mt-20 ml-12 w-[11%] ">
                <button
                  className="p-3 text-2xl flex w-full font-bold duration-200 hover:scale-105 bg-dana text-center rounded-md"
                  placeholder=""
                  onClick={() => setAnexoTela(true)}
                >
                  <BsFillCameraFill className="mr-2 ml-3 text-3xl"></BsFillCameraFill>
                  Anexo
                </button>
                <div className="">
                  {anexofile?.size > 0 && (
                    <h1 className="text-center mt-2">Imagem Anexada</h1>
                  )}
                </div>
              </div>
            </div>
            <hr className="border-2 mt-6" />
            <div className="">
              <ItensMateriais
                setItems={setItems}
                itemsRec={state.itens}
              ></ItensMateriais>
            </div>
            <hr className="border-2 mt-6" />
            <div className="mt-10 flex items-center justify-center pb-20">
              <button
                className="bg-[#1C85C7] duration-200 hover:scale-105 text-3xl mx-auto font-bold p-3 rounded-lg"
                onClick={() => criarSol()}
              >
                {state?.tipo == 2
                  ? "Editar Solicitação"
                  : "Criar Solicitação +"}
              </button>
              {state?.tipo == 2 && (
                <button
                  className="bg-[#cc0000] text-3xl mx-auto duration-200 hover:scale-105 font-bold p-3 rounded-lg"
                  onClick={() => nav("/ConsultarSolicitacao")}
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
