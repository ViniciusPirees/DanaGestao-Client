import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Titulo from "../../components/Titulo";
import SearchDropdown from "../../components/SearchDropdown";
import axios from "axios";
import CamPopUp from "../../components/CamPopUp";
import { BsFillCameraFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import Notificacao from "../../components/Notificacao";
import ItensConserto from "./ItensConserto";
import getLogin from "../../components/getLogin";
import { FaHistory } from "react-icons/fa";
import HistoricoCons from "./HistoricoCons";
import { styleAll } from "../../../css";
import PDF from "../PDF/pdf";
import LoadingGet from "../../components/LoadingGet";

export default function ItemConserto() {
  const navigate = useNavigate();
  const [logado, setLogado] = useState(null);
  const [usuAlt, setUsuAlt] = useState("");
  const [usuEnvAnt, setUsuEnvAnt] = useState("");
  const [load2, setLoad2] = useState(false);

  useEffect(() => {
    getLogin().then((val) => {
      setLogado(val);
      setUsuAlt(`${val.cod} - ${val.nome}`);
      setUsuEnvAnt(val.nome);
      if (!val) {
        navigate("/");
      }
    });
    getRCS();
  }, []);
  const state = useLocation().state;
  const conserto = state?.conserto;

  //DATA FILTROS ===============
  const DataHoje = new Date();
  const dataHojeS = DataHoje.toLocaleDateString("en-CA");
  const defaultValue = `${dataHojeS.substring(8, 10)}/${dataHojeS.substring(
    5,
    7
  )}/${dataHojeS.substring(0, 4)}`;
  const [data, setData] = useState();

  //MANUTENTOR
  const [manutentores, setManutentores] = useState([]);
  const [manutentor, setManutentor] = useState("");
  useEffect(() => {
    const getManutentor = async () => {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}:4400/getSearchDrop`,
          {
            params: {
              tabela: "Manutentor",
            },
          }
        );
        setManutentores(res.data);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar manutentores" + err]);
      }
    };
    getManutentor();
  }, []);

  //NUMERO ...
  const [num, setNum] = useState("");

  // GET MÁQUINAS SELECT
  const [maquinas, setMaquinas] = useState([]);
  const [maquina, setMaquina] = useState("");
  const [descricao, setDescricao] = useState("");
  const [divisao, setDivisao] = useState("");
  const [divisaoEBS, setDivisaoEBS] = useState("");
  const [setor, setSetor] = useState("");
  const [codCon, setcodCon] = useState("");
  useEffect(() => {
    //DESCRICAO MUDAR

    if (maquina[0]?.toString.length > 0) {
      if (maquina[1]?.length > 0) {
        setDescricao(`${maquina[1]}`);
      } else {
        setDescricao("Não Especificado");
      }

      if (maquina[2]?.length > 0) {
        setDivisao(maquina[2]);
      } else {
        setDivisao("Não Especificado");
      }

      if (maquina[3]?.length > 0) {
        setSetor(maquina[3]);
      } else {
        setSetor("Não Especificado");
      }

      if (maquina[4]?.length > 0) {
        setDivisaoEBS(maquina[4]);
      } else {
        setDivisaoEBS("Não Especificado");
      }
    } else {
      setDescricao("");
      setDivisao("");
      setSetor("");
      setDivisaoEBS("");
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

  //FORNECEDOR
  //const [fornecedores, setFornecedores] = useState([]);
  const [fornecedor, setFornecedor] = useState("");
  /*
  useEffect(() => {
    const getFornecedores = async () => {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}:4400/getSearchDrop`,
          {
            params: {
              tabela: "Fornecedor",
            },
          }
        );
        setFornecedores(res.data);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar Fornecedores" + err]);
      }
    };
    getFornecedores();
  }, []);
*/
  //ANEXO
  const [anexotela, setAnexoTela] = useState(false);
  const [anexofile, setAnexoFile] = useState(null);

  //NÚMERO SO
  const [numSO, setnumSO] = useState("");

  //NÚMERO NF
  const [nf, setNF] = useState("");

  //ORcamento
  const [orcamento, setOrcamento] = useState("");

  //NUMERORC
  const [numrc, setNumrc] = useState("");

  //status
  const [status, setStatus] = useState("Sem RC");
  //OC
  const [numoc, setNumOC] = useState("");

  //OBS
  const [obs, setObs] = useState("");

  //ITENS
  const [items, setItems] = useState("");
  const [usuEnv, setUsuEnv] = useState("");
  //CRIAR
  const getLastCon = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getLastCon`
      );
      return res?.data;
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar. " + err]);
    }
  };
  const buscaItensPDF = async ({ conCod }) => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getItensConPDF`,
        { params: { conCod } }
      );
      return res?.data;
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar itens. " + err]);
    }
  };

  const criarCons = async () => {
    if (num.toString().length == 0) {
      return Notificacao(["erro", `Necessário digitar o Número OS.`]);
    }

    if (num.toString().length != 6) {
      return Notificacao([
        "erro",
        `Necessário que o Número OS tenha exatamente 6 digitos.`,
      ]);
    }

    if (manutentor.length == 0) {
      return Notificacao(["erro", `Necessário selecionar o manutentor.`]);
    }

    if (maquina.length == 0) {
      return Notificacao(["erro", `Necessário selecionar a máquina.`]);
    }

    if (items.length == 0) {
      return Notificacao(["erro", `Necessário adicionar um item ao conserto.`]);
    }
    var verifica = false;
    verifica = items.map((item) => {
      var valor = Number(item[2]);
      if (
        item[0].length == 0 ||
        item[1].length == 0 ||
        valor == 0 ||
        item[2] == "NaN" ||
        item[3].length == 0
      ) {
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
        const res = await axios
          .post(
            `http://${import.meta.env.VITE_IP}:4400/EditarConserto`,
            formdata,
            {
              params: {
                manutentor: manutentor,
                num: num,
                maquina: maquina,
                descricao: descricao,
                divisao: divisao,
                setor: setor,
                divisaoEBS: divisaoEBS,
                fornecedor: fornecedor,
                numSO: numSO,
                nf: nf,
                orcamento: orcamento,
                numrc: numrc,
                status: status,
                obs: obs,
                items: items,
                conCod: codCon,
                numoc: numoc,
                usuAlt: usuAlt,
                usuEnv: usuEnv,
              },
            }
          )
          .then(() => {
            buscaItensPDF({ conCod: codCon }).then((res) => {
              console.log(res);
              PDF({ conserto: res }).then(() => {
                navigate("/ConsertoExterno");
              });
            });
          });
      } catch (err) {
        Notificacao(["erro", "Erro ao criar Solicitação"]);
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post(
          `http://${import.meta.env.VITE_IP}:4400/CriarConserto`,
          formdata,
          {
            params: {
              manutentor: manutentor,
              num: num,
              maquina: maquina,
              descricao: descricao,
              divisao: divisao,
              setor: setor,
              divisaoEBS: divisaoEBS,
              fornecedor: fornecedor,
              numSO: numSO,
              nf: nf,
              orcamento: orcamento,
              numrc: numrc,
              status: status,
              obs: obs,
              items: items,
              numoc: numoc,
              usuEnv: usuEnv,
            },
          }
        );
        getLastCon().then((res) => {
          buscaItensPDF({ conCod: res[0][""] }).then((res) => {
            PDF({ conserto: res }).then(() => {
              navigate("/ConsertoExterno");
            });
          });
        });
      } catch (err) {
        Notificacao(["erro", "Erro ao criar Solicitação"]);
        console.log(err);
      }
    }
  };

  //TIPO DE MATERIAL
  const [tipomat, setTipoMat] = useState("");
  const [tiposmat, setTiposMat] = useState("");
  useEffect(() => {
    const getTipMat = async () => {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}:4400/GetSearchDrop`,
          {
            params: {
              tabela: "TipoMaterial",
              order: "TipMatDesc",
            },
          }
        );
        setTiposMat(res.data);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar Tipo Material" + err]);
      }
    };
    getTipMat();
  }, []);

  const [dataAlt, setDataAlt] = useState("");

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

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const getAnexo = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getAnexoCon`,
        { params: { conCod: state?.conserto.ConCod } }
      );

      if (res?.data?.length > 0) {
        var buffer = res?.data[0].ConAnexo.data;
        var base64 = _arrayBufferToBase64(buffer);
        var image = convertBase64ToFile(base64);

        setAnexoFile(image);
      }
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar anexo. " + err]);
    }
  };

  useEffect(() => {
    if (state?.tipo == 2) {
      setManutentor([state?.conserto.ConManNome, state?.conserto.ConManCod]);
      setNum(state?.conserto.ConNum);
      setMaquina([
        state?.conserto.ConMaqCod,
        state?.conserto.ConMaqDesc,
        state?.conserto.ConMaqDiv,
        state?.conserto.ConMaqSetor,
        state?.conserto.ConMaqDivEBS,
      ]);

      var data1 = String(state?.conserto.ConData);
      setData(
        `${data1.substring(8, 10)}/${data1.substring(5, 7)}/${data1.substring(
          0,
          4
        )} - ${data1.substring(11, 19)}`
      );
      data1 = String(state?.conserto.ConDataAlt);
      setDataAlt(
        `${data1.substring(8, 10)}/${data1.substring(5, 7)}/${data1.substring(
          0,
          4
        )} - ${data1.substring(11, 19)}`
      );
      setFornecedor(state?.conserto.ConForDesc);
      setnumSO(state?.conserto.ConNumSo);
      setNF(state?.conserto.ConNF);
      setOrcamento(state?.conserto.ConOrc);
      setNumrc(state?.conserto.ConNumRC);
      setObs(state?.conserto.ConObs);
      setStatus(
        StatusbyRC({
          reqSta: state?.conserto.REQ_STATUS,
          PoNum: state?.conserto.PO_NUM,
          rc: state?.conserto.ConNumRC,
          closedCode: state?.conserto.CLOSED_CODE,
        })
      );
      setNumOC(state?.conserto.ConNumOC);
      setcodCon(state?.conserto.ConCod);
      setUsuEnv(state?.conserto.ConUsuEnv);
      getAnexo();
    }
  }, []);

  const [hisAtivo, setHisAtivo] = useState(false);

  const getSalesOrder = async () => {
    if (numSO.length > 0) {
      setLoad2(true);

      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}:4400/getSalesOrder`,
          { params: { numSO: numSO } }
        );
        if (res?.data == 0) {
          Notificacao(["atencao", "Não existe esse número de Sales Order."]);
          setNF("");
          setFornecedor("");
        } else {
          setNF(res.data[0].NF);
          setFornecedor(res.data[0].PARTY_NAME);
          setUsuEnv(usuEnvAnt);
        }
        setLoad2(false);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar Sales Order. " + err]);
      }
    }
  };

  const getRCS = async () => {
    if (numrc.length >= 8) {
      setLoad2(true);

      var position = numrc.search("/");
      var numrc1 = numrc.substring(0, position);
      var numrc2 = numrc.substring(position + 1);

      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}:4400/getRCS`,
          { params: { numrc1: numrc1, numrc2: numrc2 } }
        );
        if (res?.data == 0) {
          Notificacao(["atencao", "Não existe esse número de RC."]);
          setStatus("Sem RC");
          setNumOC("");
        } else {
          var status = StatusbyRC({
            reqSta: res.data[0].REQ_STATUS,
            PoNum: res.data[0].PO_NUM,
            rc: numrc,
            closedCode: res.data[0].CLOSED_CODE,
          });
          setNumOC(
            res.data[0].CLOSED_CODE == null
              ? ""
              : `${res.data[0].PO_NUM} ${res.data[0].CLOSED_CODE}`
          );

          setStatus(status);
        }
        setLoad2(false);
      } catch (err) {
        console.log(err);
        setLoad2(false);

        Notificacao(["erro", "Erro ao buscar RC. " + err]);
      }
    } else {
      if (numrc.length > 0) {
        Notificacao([
          "atencao",
          "Número da RC deve ter ao menos 8 caracteres. Exemplo: XXXXXX/XX",
        ]);
      }

      setStatus("Sem RC");
    }
  };

  const StatusbyRC = ({ reqSta, PoNum, RC, closedCode }) => {
    if (RC == 0) {
      return "Sem RC";
    } else if (reqSta == "IN PROCESS" && PoNum == null) {
      return "RC Em aprovação";
    } else if (reqSta == "APPROVED" && PoNum == null) {
      return "RC Aprovada sem pedido";
    } else if (reqSta == "APPROVED" && PoNum != null && closedCode == "OPEN") {
      return "RC Aprovada com pedido aberto";
    } else if (
      reqSta == "APPROVED" &&
      PoNum != null &&
      closedCode == "CLOSED"
    ) {
      return "RC Aprovada com pedido entregue";
    } else if (
      reqSta != "APPROVED" &&
      reqSta != "IN PROCESS" &&
      reqSta != null
    ) {
      return "RC Cancelada";
    } else {
      return "RC não existe";
    }
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        criarCons();
      } else if (event.key === "Escape") {
        event.preventDefault();
        navigate("/ConsertoExterno");
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [
    manutentor,
    num,
    maquina,
    descricao,
    divisao,
    setor,
    divisaoEBS,
    fornecedor,
    numSO,
    nf,
    orcamento,
    numrc,
    status,
    obs,
    items,
    codCon,
    numoc,
    usuAlt,
  ]);

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
      <div className="flex">
        <NavBar ativo="5"></NavBar>
        <div className="w-full ml-[8.5em] mr-10 h-full overflow-y-auto">
          <div className="">
            {anexotela && (
              <CamPopUp
                setAnexoTela={setAnexoTela}
                setAnexoFile={setAnexoFile}
                anexofile={anexofile}
              ></CamPopUp>
            )}
          </div>
          {load2 && <LoadingGet></LoadingGet>}

          <Titulo titulo="Conserto" />

          <div className="mt-10">
            {state?.tipo != 2 ? (
              <div className="flex">
                <div className="w-[15%] mx-6">
                  <h1 className="text-[26px]  font-bold mb-2">Data:</h1>
                  <input
                    disabled
                    type="text"
                    defaultValue={defaultValue}
                    className={styleAll.inputSoW}
                    placeholder=""
                  />
                </div>
                <div className="w-[25%] mx-6">
                  <h1 className="text-[26px] font-bold mb-2">Manutentor:</h1>
                  <SearchDropdown
                    options={manutentores}
                    setValue={setManutentor}
                    opt={4}
                    defValue={""}
                  ></SearchDropdown>
                </div>
                <div className="w-[15%] mx-6">
                  <h1 className="text-[26px] font-bold mb-2 ">Número OS:</h1>
                  <input
                    autoComplete="off"
                    type="number"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={num}
                    maxLength={"6"}
                    onChange={(e) => {
                      if (e.target.value.length > 6) {
                        setNum(e.target.value.slice(0, 6));
                      } else {
                        setNum(e.target.value);
                      }
                    }}
                  />
                </div>
                <div className="w-[15%] mx-6">
                  <h1 className="text-[26px] font-bold mb-2 ">Orçamento:</h1>
                  <input
                    autoComplete="off"
                    type="text"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={orcamento}
                    onChange={(e) => setOrcamento(e.target.value)}
                  />
                </div>
                <div className="w-[15%] mx-6">
                  <h1 className="text-[26px] font-bold mb-2">Máquina:</h1>
                  <SearchDropdown
                    options={maquinas}
                    setValue={setMaquina}
                    opt={1}
                    defValue={""}
                  ></SearchDropdown>
                </div>
              </div>
            ) : (
              <>
                <div className="flex mb-10">
                  <div className="w-[15%] mx-6">
                    <h1 className="text-[26px]  font-bold mb-2">
                      Cód Conserto:
                    </h1>
                    <input
                      disabled
                      type="text"
                      defaultValue={codCon}
                      className={styleAll.inputSoW}
                      placeholder=""
                    />
                  </div>
                  <div className="w-[20%] mx-6">
                    <h1 className="text-[26px]  font-bold mb-2">Data:</h1>
                    <input
                      disabled
                      type="text"
                      defaultValue={data}
                      className={styleAll.inputSoW}
                      placeholder=""
                    />
                  </div>
                  <div className="w-[20%] mx-6">
                    <h1 className="text-[26px]  font-bold mb-2">
                      Data Alteração:
                    </h1>
                    <input
                      disabled
                      type="text"
                      defaultValue={dataAlt}
                      className={styleAll.inputSoW}
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-[25%] mx-6">
                    <h1 className="text-[26px] font-bold mb-2">Manutentor:</h1>
                    <SearchDropdown
                      options={manutentores}
                      setValue={setManutentor}
                      opt={4}
                      defValue={conserto.ConManNome}
                    ></SearchDropdown>
                  </div>
                  <div className="w-[15%] mx-6">
                    <h1 className="text-[26px] font-bold mb-2 ">Número OS:</h1>
                    <input
                      autoComplete="off"
                      type="number"
                      className={styleAll.inputSoW}
                      placeholder=""
                      value={num}
                      maxLength={"6"}
                      onChange={(e) => {
                        if (e.target.value.length > 6) {
                          setNum(e.target.value.slice(0, 6));
                        } else {
                          setNum(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="w-[15%] mx-6">
                    <h1 className="text-[26px] font-bold mb-2">Máquina:</h1>
                    <SearchDropdown
                      options={maquinas}
                      setValue={setMaquina}
                      opt={1}
                      defValue={conserto.ConMaqCod}
                    ></SearchDropdown>
                  </div>
                  <div className="w-[35%] mx-6">
                    <h1 className="text-[26px] font-bold mb-2 ">
                      Descrição da Máquina:
                    </h1>
                    <input
                      autoComplete="off"
                      type="text"
                      className={styleAll.inputSoWDis}
                      placeholder=""
                      value={descricao}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
              </>
            )}
            <div className="flex mt-10">
              <div className="w-[40%] mx-6">
                <h1 className="text-[26px] font-bold mb-2 ">
                  Descrição da Máquina:
                </h1>
                <input
                  autoComplete="off"
                  type="text"
                  className={styleAll.inputSoWDis}
                  placeholder=""
                  value={descricao}
                  readOnly
                  disabled
                />
              </div>
              <div className="w-[20%] mx-6">
                <h1 className="text-[26px] font-bold mb-2 ">Divisão:</h1>
                <input
                  autoComplete="off"
                  type="text"
                  className={styleAll.inputSoWDis}
                  placeholder=""
                  value={divisao}
                  disabled
                  readOnly
                />
              </div>
              <div className="w-[20%] mx-6">
                <h1 className="text-[26px] font-bold mb-2 ">Setor:</h1>
                <input
                  autoComplete="off"
                  type="text"
                  className={styleAll.inputSoWDis}
                  placeholder=""
                  value={setor}
                  disabled
                  readOnly
                />
              </div>
              <div className="w-[20%] mx-6">
                <h1 className="text-[26px] font-bold mb-2 ">Divisão EBS:</h1>
                <input
                  autoComplete="off"
                  type="text"
                  className={styleAll.inputSoWDis}
                  placeholder=""
                  value={divisaoEBS}
                  disabled
                  readOnly
                />
              </div>
            </div>

            <div className="flex mt-10">
              <div className="w-[20%] mx-6">
                <h1 className="text-[26px] font-bold mb-2 ">Número SO:</h1>
                <InputMask
                  onBlurCapture={() => getSalesOrder()}
                  className={styleAll.inputSoW}
                  mask="999999"
                  maskChar=""
                  value={numSO}
                  onChange={(e) => setnumSO(e.target.value)}
                ></InputMask>
              </div>
              <div className="w-[50%] mx-6">
                <h1 className="text-[26px] font-bold mb-2 ">Fornecedor:</h1>
                <input
                  autoComplete="off"
                  type="text"
                  className={styleAll.inputSoWDis}
                  placeholder=""
                  value={fornecedor}
                  disabled
                  readOnly
                />
                {/*<SearchDropdown
                  options={fornecedores}
                  setValue={setFornecedor}
                  opt={5}
                  defValue={state?.tipo != 2 ? "" : conserto.ConForDesc}
                    ></SearchDropdown>*/}
              </div>

              <div className="w-[20%] mx-6">
                <h1 className="text-[26px] font-bold mb-2 ">Nota Fiscal:</h1>
                <input
                  autoComplete="off"
                  type="text"
                  className={styleAll.inputSoWDis}
                  placeholder=""
                  value={nf}
                  readOnly
                  disabled
                />
              </div>
              {
                <div className="w-[10%] mt-12 mx-6">
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
              }
            </div>
            <div className="flex mt-10">
              <div className="w-[15%] mx-6">
                <h1 className="text-[26px] font-bold mb-2 ">Número RC:</h1>
                <InputMask
                  onBlurCapture={() => getRCS()}
                  className={styleAll.inputSoW}
                  mask="999999/99"
                  maskChar=""
                  value={numrc}
                  onChange={(e) => setNumrc(e.target.value)}
                ></InputMask>
              </div>

              {
                <div className="w-[35%] mx-auto">
                  <h1 className="text-[26px] font-bold mb-2">Status:</h1>
                  <input
                    autoComplete="off"
                    type="text"
                    className={styleAll.inputSoWDis}
                    placeholder=""
                    value={status}
                    disabled
                    readOnly
                  />
                </div>
              }
              <div className="w-[20%] mx-6">
                <h1 className="text-[26px] font-bold mb-2 ">Núm. OC:</h1>
                <input
                  autoComplete="off"
                  type="text"
                  className={styleAll.inputSoWDis}
                  placeholder=""
                  value={numoc}
                  disabled
                  readOnly
                />
              </div>
            </div>

            <div className="flex mt-10">
              <div className="w-[100%] mx-6">
                <h1 className="text-[26px] font-bold mb-2 ">Observação:</h1>
                <input
                  autoComplete="off"
                  type="text"
                  className={styleAll.inputSoW}
                  placeholder=""
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                />
              </div>
            </div>
            <hr className="border-2 mt-8" />
            <div className="">
              <ItensConserto
                setItems={setItems}
                tiposMat={tiposmat}
                setValue={setTipoMat}
                itemsRec={state?.itens}
              ></ItensConserto>
            </div>

            <div className="flex mx-auto w-fit my-6">
              <button
                onClick={() => criarCons()}
                className="py-3 px-6 mt-6 mx-10 bg-[#28aa53] text-3xl duration-200 hover:scale-105 font-bold rounded-md"
              >
                Confirmar
              </button>
              <button
                className="py-3 px-6 mt-6 mx-10 bg-dana text-3xl duration-200 hover:scale-105 font-bold rounded-md"
                onClick={() => navigate("/ConsertoExterno")}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
