import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Titulo from "../../components/NavBar/Titulo";
import SearchDropdown from "../../components/Dropdowns/SearchDropdown";
import axios from "axios";
import CamPopUp from "../../components/Camera/CamPopUp";
import { BsFillCameraFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import Notificacao from "../../components/Notificacao";
import ItensConserto from "./ItensConserto";
import getLogin from "../../components/Login/getLogin";
import { FaHistory } from "react-icons/fa";
import HistoricoCons from "./HistoricoCons";
import { styleAll } from "../../../css";
import PDF from "../PDF/pdf";
import LoadingGet from "../../components/Loading/LoadingGet";
import EnviaEmail from "./EnviaEmail";

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

  const [semRep, setSemRep] = useState(false);
  //MANUTENTOR
  const [manutentores, setManutentores] = useState([]);
  const [manutentor, setManutentor] = useState("");
  useEffect(() => {
    const getManutentor = async () => {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}/getSearchDrop`,
          {
            params: {
              tabela: "Manutentor",
              order: "ManNome",
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

    if (maquina[0]?.length > 0) {
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
          `http://${import.meta.env.VITE_IP}/GetMaquinas`
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
          `http://${import.meta.env.VITE_IP}/getSearchDrop`,
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
  const [anexoArray, setAnexoArray] = useState([]);
  const [anexotela, setAnexoTela] = useState(false);

  //NÚMERO SO
  const [numSO, setnumSO] = useState("");

  //NÚMERO NF
  const [nf, setNF] = useState("");
  const [garantia, setGarantia] = useState(false);
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
  const [qtdret, setQtdRet] = useState("");
  const [qtdsai, setQtdSai] = useState("");
  const [saldope, setSaldope] = useState("");
  //CRIAR
  const terminaEnvia = (i) => {
    if (i == 2) {
      buscaItensPDF({ conCod: codCon }).then((res) => {
        navigate("/ConsertoExterno");
        PDF({ conserto: res }).then(() => console.log());
      });
    } else if (i == 1) {
      getLastCon().then((res) => {
        buscaItensPDF({ conCod: res[0][""] }).then((res) => {
          navigate("/ConsertoExterno");
          PDF({ conserto: res }).then(() => console.log());
        });
      });
    }
  };
  const [enviar, setEnviar] = useState(false);

  const [enviaEmail, setEnviaEmail] = useState(0);

  const getLastCon = async () => {
    setLoad2(true);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getLastCon`
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
        `http://${import.meta.env.VITE_IP}/getItensConPDF`,
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
      setLoad2(false);
      return Notificacao(["erro", `Necessário digitar o Número OS.`]);
    }

    if (num.toString().length != 6) {
      setLoad2(false);
      return Notificacao([
        "erro",
        `Necessário que o Número OS tenha exatamente 6 digitos.`,
      ]);
    }

    /*if (numSO.length > 0 && nf.length == 0 && fornecedor.length == 0) {
      return Notificacao([
        "erro",
        `Digite um número de SO existente ou deixe o campo vazio`,
      ]);
    }*/

    if (numSO.length == 0 && numrc.length > 0) {
      setLoad2(false);
      return Notificacao([
        "erro",
        `Obrigatório ter número da SO se digitado RC`,
      ]);
    }

    /*if (numrc.length > 0 && (status == "RC não existe" || status == "Sem RC")) {
      return Notificacao([
        "erro",
        `Digite um número de RC existente ou deixe o campo vazio`,
      ]);
    }
    */

    if (manutentor.length == 0) {
      setLoad2(false);
      return Notificacao(["erro", `Necessário selecionar o manutentor.`]);
    }

    if (maquina.length == 0) {
      setLoad2(false);
      return Notificacao(["erro", `Necessário selecionar a máquina.`]);
    }

    if (items.length == 0) {
      setLoad2(false);
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
      setLoad2(false);
      return Notificacao(["erro", `Verifique as informaçoes dos items`]);
    }

    const formdata = new FormData();
    anexoArray.forEach((file, i) => {
      formdata.append("image", file, i);
    });

    if (state?.tipo == 2) {
      try {
        const res = await axios.post(
          `http://${import.meta.env.VITE_IP}/EditarConserto`,
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
              numrc: garantia ? "G" : numrc,
              status: status,
              obs: obs,
              items: items,
              conCod: codCon,
              numoc: numoc,
              usuAlt: usuAlt,
              usuEnv: usuEnv,
              semRep: semRep,
              enviar: enviar,
            },
          }
        );
        setLoad2(false);

        if (semRep) {
          setEnviaEmail(2);
        } else {
          terminaEnvia(2);
        }
      } catch (err) {
        setLoad2(false);
        Notificacao(["erro", "Erro ao criar Conserto"]);
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post(
          `http://${import.meta.env.VITE_IP}/CriarConserto`,
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
              numrc: garantia ? "G" : numrc,
              status: status,
              obs: obs,
              items: items,
              numoc: numoc,
              usuEnv: usuEnv,
              enviar: enviar,
            },
          }
        );
        setLoad2(false);
        if (semRep) {
          setEnviaEmail(1);
        } else {
          terminaEnvia(1);
        }
      } catch (err) {
        setLoad2(false);
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
          `http://${import.meta.env.VITE_IP}/GetSearchDrop`,
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
        `http://${import.meta.env.VITE_IP}/getAnexoCon`,
        { params: { conCod: state?.conserto.ConCod } }
      );

      if (res?.data.length > 0) {
        let imgsArray = [];
        res?.data?.forEach((file) => {
          var buffer = file.ConAnexo.data;
          var base64 = _arrayBufferToBase64(buffer);
          var image = convertBase64ToFile(base64);
          imgsArray.push(image);
        });
        setAnexoArray(imgsArray);
      }
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar anexo. " + err]);
    }
  };

  const StatusbyRC = ({ conserto }) => {
    if (conserto?.ConNumRC == "") {
      return "Sem RC";
    } else if (conserto?.ConNumRC == "G") {
      return "Garantia";
    } else if (
      conserto.REQ_STATUS == "PRE-APPROVED" ||
      (conserto.REQ_STATUS == "APPROVED" &&
        conserto.PO_NUM == null &&
        conserto.REQ_APPROVER == conserto.PREPARER &&
        (conserto.LINE_TOTAL_RC == 0 || conserto.LINE_TOTAL_RC == null) &&
        conserto.PENDING_TOTAL_RC == 0 &&
        conserto.RECEIVED_TOTAL_RC == 0)
    ) {
      return "RC em orçamento de compras";
    } else if (
      conserto?.REQ_STATUS == "INCOMPLETE" ||
      (conserto?.REQ_STATUS == "IN PROCESS" &&
        conserto?.PO_NUM == null &&
        conserto?.REQ_APPROVER == conserto?.PREPARER &&
        (conserto?.LINE_TOTAL_RC > 0 ||
          conserto.PENDING_TOTAL_RC > 0 ||
          conserto.RECEIVED_TOTAL_RC > 0))
    ) {
      return "Requer aprovação do solicitante";
    } else if (
      conserto?.REQ_STATUS == "IN PROCESS" &&
      conserto?.PO_NUM == null
    ) {
      return "RC Em aprovação";
    } else if (conserto?.REQ_STATUS == "APPROVED" && conserto?.PO_NUM == null) {
      return "RC Aprovada sem pedido";
    } else if (
      conserto?.REQ_STATUS == "APPROVED" &&
      conserto?.PO_NUM != null &&
      conserto.CLOSED_CODE == "OPEN"
    ) {
      return "RC Aprovada com pedido aberto";
    } else if (
      conserto?.REQ_STATUS == "APPROVED" &&
      conserto?.PO_NUM != null &&
      conserto.CLOSED_CODE == "CLOSED"
    ) {
      return "RC Aprovada com pedido entregue";
    } else if (
      conserto?.REQ_STATUS != "APPROVED" &&
      conserto?.REQ_STATUS != "IN PROCESS" &&
      conserto?.REQ_STATUS != null
    ) {
      return "RC Cancelada";
    } else {
      return "RC não existe";
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
      setFornecedor(
        state?.conserto.PARTY_NAME == null ? "" : state?.conserto.PARTY_NAME
      );
      setnumSO(state?.conserto.ConNumSo);
      setNF(state?.conserto.NF == null ? "" : state?.conserto.NF);
      setOrcamento(state?.conserto.ConOrc);
      if (state?.conserto.ConNumRC == "G") {
        setNumrc("");
        setGarantia(true);
      } else {
        setNumrc(state?.conserto.ConNumRC);
        setGarantia(false);
      }
      setObs(state?.conserto.ConObs);
      setNumOC(
        state?.conserto.CLOSED_CODE == null
          ? ""
          : `${state?.conserto.PO_NUM} ${state?.conserto.CLOSED_CODE}`
      );

      setcodCon(state?.conserto.ConCod);
      setUsuEnv(state?.conserto.ConUsuEnv);
      getAnexo();
      setQtdRet(
        state?.conserto.QTDE_RET == null ? "" : state?.conserto.QTDE_RET
      );
      setQtdSai(state?.conserto.QUANT == null ? "" : state?.conserto.QUANT);
      setSaldope(
        state?.conserto.SALDO_DISPONIVEL == null
          ? ""
          : state?.conserto.SALDO_DISPONIVEL
      );
      var status = StatusbyRC({ conserto: state?.conserto });
      setSemRep(
        state?.conserto.ConSemRep == null || state?.conserto.ConSemRep == "N"
          ? false
          : true
      );
      setStatus(status);
    }
  }, []);

  const getSalesOrder = async () => {
    if (numSO.length > 0) {
      setLoad2(true);

      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}/getSalesOrder`,
          { params: { numSO: numSO } }
        );
        if (res?.data == 0) {
          Notificacao(["atencao", "Não existe esse número de Sales Order."]);
          setNF("");
          setFornecedor("");
          setQtdRet("");
          setQtdSai("");
          setSaldope("");
          setUsuEnv("");
        } else {
          setNF(res.data[0].NF);
          setFornecedor(res.data[0].PARTY_NAME);
          setQtdRet(res.data[0].QTDE_RET);
          setQtdSai(res.data[0].QUANT);
          setSaldope(res.data[0].SALDO_DISPONIVEL);
          setUsuEnv(usuEnvAnt);
        }
        setLoad2(false);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar Sales Order. " + err]);
      }
    } else {
      setNF("");
      setFornecedor("");
      setQtdRet("");
      setQtdSai("");
      setSaldope("");
      setUsuEnv("");
    }
  };

  const getRCS = async () => {
    if (numrc.length > 5) {
      setLoad2(true);

      var position = numrc.search("/");
      var numrc1 = numrc.substring(0, position);
      var numrc2 = numrc.substring(position + 1);
      if (position >= 0) {
        try {
          const res = await axios.get(
            `http://${import.meta.env.VITE_IP}/getRCS`,
            { params: { numrc1: numrc1, numrc2: numrc2 } }
          );
          if (res?.data == 0) {
            Notificacao(["atencao", "Não existe esse número de RC."]);
            setStatus("Sem RC");
            setNumOC("");
          } else {
            var status = StatusbyRC({ conserto: res.data[0] });
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
            "Número da RC deve seguir o padrão: XXXXXX/XX (Barra Obrigatória)",
          ]);
        }
        setLoad2(false);
        setStatus("Sem RC");
        setNumOC("");
      }
    } else {
      if (numrc.length > 0) {
        Notificacao([
          "atencao",
          "Número da RC deve seguir o padrão: XXXXXX/XX (Barra Obrigatória)",
        ]);
      }
      setLoad2(false);
      setStatus("Sem RC");
      setNumOC("");
    }
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setLoad2(true);
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
    anexoArray,
    orcamento,
    numrc,
    status,
    obs,
    items,
    codCon,
    numoc,
    usuAlt,
    semRep,
    enviar,
    garantia,
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
      <div className="flex tablet:h-screen">
        <NavBar ativo="5"></NavBar>
        <div className="w-full desktop:pl-[8.5em] laptop:pr-10 desktop:pr-10 laptop:pl-[6.5em] tablet:pl-[6.5em] tablet:pr-10">
          <div className="">
            {anexotela && (
              <CamPopUp
                setAnexoTela={setAnexoTela}
                anexoArray={anexoArray}
                setAnexoArray={setAnexoArray}
              ></CamPopUp>
            )}
          </div>
          {load2 && <LoadingGet></LoadingGet>}
          {enviaEmail > 0 && (
            <EnviaEmail
              terminaEnvia={terminaEnvia}
              setEnviaEmail={setEnviaEmail}
              enviaEmail={enviaEmail}
              setEnviar={setEnviar}
            ></EnviaEmail>
          )}
          <Titulo titulo="Conserto Externo" />

          <div className="mt-10 tablet:mt-5">
            {state?.tipo != 2 ? (
              <div className="laptop:flex desktop:flex">
                <div className="flex laptop:w-[50%] desktop:w-[50%] ">
                  <div className="tablet:w-[30%] w-[30%] tablet:ml-3 laptop:mx-6 desktop:mx-6">
                    <h1 className="text-[26px]  font-bold mb-2">Data:</h1>
                    <input
                      disabled
                      type="text"
                      defaultValue={defaultValue}
                      className={styleAll.inputSoW}
                      placeholder=""
                    />
                  </div>
                  <div className="tablet:w-[70%] w-[70%] tablet:ml-12 laptop:mx-6 desktop:mx-6">
                    <h1 className="text-[26px] font-bold mb-2">Manutentor:</h1>
                    <SearchDropdown
                      options={manutentores}
                      setValue={setManutentor}
                      opt={4}
                      defValue={""}
                      textTablet={"tablet:text-2xl laptop:text-2xl"}
                    ></SearchDropdown>
                  </div>
                </div>
                <div className="flex tablet:mt-5">
                  <div className="laptop:w-[30%] desktop:w-[30%] tablet:w-[35%] tablet:ml-3 laptop:mx-6 desktop:mx-6">
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

                  <div className="laptop:w-[40%] desktop:w-[40%] tablet:ml-12 tablet:w-[65%] laptop:mx-6 desktop:mx-6">
                    <h1 className="text-[26px] font-bold mb-2">Máquina:</h1>
                    <SearchDropdown
                      options={maquinas}
                      setValue={setMaquina}
                      opt={1}
                      defValue={""}
                      textTablet={"tablet:text-2xl laptop:text-2xl"}
                    ></SearchDropdown>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex laptop:mb-10 desktop:mb-10 tablet:mb-5">
                  <div className="laptop:w-[15%] desktop:w-[15%] tablet:w-[15%] laptop:mx-6 desktop:mx-6 ml-3 ">
                    <h1 className="text-[26px] tablet:text-2xl tablet:hidden font-bold mb-2">
                      Cód. Conserto:
                    </h1>
                    <h1 className="text-[26px] tablet:text-2xl laptop:hidden desktop:hidden font-bold mb-2">
                      Cód.:
                    </h1>
                    <input
                      disabled
                      type="text"
                      defaultValue={codCon}
                      className={styleAll.inputSoWDis}
                      placeholder=""
                    />
                  </div>
                  <div className="w-[20%] laptop:w-[25%] tablet:w-[45%] laptop:mx-6 desktop:mx-6 tablet:ml-3">
                    <h1 className="text-[26px] tablet:text-2xl font-bold mb-2">
                      Data:
                    </h1>
                    <input
                      disabled
                      type="text"
                      defaultValue={data}
                      className={styleAll.inputSoWDis}
                      placeholder=""
                    />
                  </div>
                  <div className="w-[20%] laptop:w-[25%] tablet:w-[45%] laptop:mx-6 desktop:mx-6 tablet:ml-3">
                    <h1 className="text-[26px] tablet:text-2xl font-bold mb-2">
                      Data Alteração:
                    </h1>
                    <input
                      disabled
                      type="text"
                      defaultValue={dataAlt}
                      className={styleAll.inputSoWDis}
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="laptop:flex desktop:flex ">
                  <div className="flex">
                    <div className="w-[75%] tablet:w-[75%] laptop:mx-6 desktop:mx-6 ml-3">
                      <h1 className="text-[26px] tablet:text-2xl font-bold mb-2">
                        Manutentor:
                      </h1>
                      <SearchDropdown
                        options={manutentores}
                        setValue={setManutentor}
                        opt={4}
                        defValue={conserto.ConManNome}
                        textTablet={"tablet:text-2xl laptop:text-2xl"}
                      ></SearchDropdown>
                    </div>
                    <div className="w-[25%] laptop:mx-6 desktop:mx-6 tablet:ml-3">
                      <h1 className="text-[26px] tablet:text-2xl font-bold mb-2 laptop:hidden">
                        Número OS:
                      </h1>
                      <h1 className="text-[26px] tablet:text-2xl font-bold mb-2 hidden laptop:block">
                        Núm. OS:
                      </h1>
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
                  </div>
                  <div className="flex tablet:mt-5">
                    <div className="w-[50%] tablet:w-[40%] laptop:mx-6 desktop:mx-6 ml-3">
                      <h1 className="text-[26px] font-bold mb-2 ">
                        Orçamento:
                      </h1>
                      <input
                        autoComplete="off"
                        type="text"
                        className={styleAll.inputSoW}
                        placeholder=""
                        value={orcamento}
                        onChange={(e) => setOrcamento(e.target.value)}
                      />
                    </div>
                    <div className="w-[50%] tablet:w-[60%] laptop:w-[50%] laptop:mx-6 desktop:mx-6 ml-3">
                      <h1 className="text-[26px] font-bold mb-2">Máquina:</h1>
                      <SearchDropdown
                        options={maquinas}
                        setValue={setMaquina}
                        opt={1}
                        defValue={conserto.ConMaqCod}
                        textTablet={"tablet:text-2xl laptop:text-2xl"}
                      ></SearchDropdown>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="laptop:flex desktop:flex mt-10 tablet:mt-5">
              <div className="w-[40%] tablet:w-[98%] laptop:mx-6 desktop:mx-6 tablet:ml-3">
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
              <div className="flex laptop:w-[60%] desktop:w-[60%] tablet:mt-5">
                <div className="w-[33%] tablet:w-[33%] laptop:mx-6 desktop:mx-6 tablet:ml-3">
                  <h1 className="text-[26px] tablet:text-2xl font-bold mb-2 ">
                    Divisão:
                  </h1>
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
                <div className="w-[33%] tablet:w-[57%] laptop:mx-6 desktop:mx-6 tablet:ml-3">
                  <h1 className="text-[26px] tablet:text-2xl font-bold mb-2 ">
                    Setor:
                  </h1>
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
                <div className="w-[33%] tablet:w-[10%] laptop:mx-6 desktop:mx-6 tablet:ml-3">
                  <h1 className="text-[26px] tablet:text-2xl font-bold mb-2 tablet:hidden">
                    Divisão EBS:
                  </h1>
                  <h1 className="text-[26px] tablet:text-2xl font-bold laptop:hidden desktop:hidden mb-2 ">
                    EBS:
                  </h1>
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
            </div>
            {state?.tipo == 2 && (
              <div className="flex laptop:mt-10 desktop:mt-10 mt-5">
                <div className="w-[25%] tablet:w-[20%] laptop:mx-6 desktop:mx-6 tablet:ml-3 ">
                  <h1 className="text-[26px] tablet:hidden tablet:text-2xl font-bold mb-2 ">
                    Número SO:
                  </h1>
                  <h1 className="text-[26px] laptop:hidden desktop:hidden tablet:text-2xl font-bold mb-2 ">
                    Núm. SO:
                  </h1>
                  <InputMask
                    onBlurCapture={() => getSalesOrder()}
                    className={styleAll.inputSoW}
                    mask="999999"
                    maskChar=""
                    value={numSO}
                    onChange={(e) => setnumSO(e.target.value)}
                  ></InputMask>
                </div>
                <div className="w-[60%] laptop:mx-6 desktop:mx-6 tablet:ml-3">
                  <h1 className="text-[26px] tablet:text-2xl font-bold mb-2 ">
                    Fornecedor:
                  </h1>
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

                <div className="w-[25%] tablet:w-[20%] laptop:mx-6 desktop:mx-6 tablet:ml-3">
                  <h1 className="text-[26px] tablet:hidden tablet:text-2xl font-bold mb-2 ">
                    Nota Fiscal:
                  </h1>
                  <h1 className="text-[26px] laptop:hidden desktop:hidden tablet:text-2xl font-bold mb-2 ">
                    NF:
                  </h1>
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
              </div>
            )}
            {state?.tipo == 2 && (
              <div className="flex laptop:mt-10 desktop:mt-10 tablet:mt-5">
                <div className="w-[33%] laptop:mx-6 desktop:mx-6 ml-3">
                  <h1 className="text-[26px] font-bold mb-2 tablet:hidden ">
                    Quantidade Saída:
                  </h1>
                  <h1 className="text-2xl font-bold mb-2 laptop:hidden desktop:hidden">
                    Qtd. Saída:
                  </h1>
                  <input
                    autoComplete="off"
                    type="text"
                    className={styleAll.inputSoWDis}
                    placeholder=""
                    value={qtdsai}
                    disabled
                    readOnly
                  />
                </div>
                <div className="w-[33%] laptop:mx-6 desktop:mx-6 ml-3">
                  <h1 className="text-[26px] font-bold mb-2 tablet:hidden ">
                    Quantidade Retorno:
                  </h1>
                  <h1 className="text-2xl font-bold mb-2 laptop:hidden desktop:hidden">
                    Qtd. Retorno:
                  </h1>
                  <input
                    autoComplete="off"
                    type="text"
                    className={styleAll.inputSoWDis}
                    placeholder=""
                    value={qtdret}
                    disabled
                    readOnly
                  />
                </div>

                <div className="w-[33%] laptop:mx-6 desktop:mx-6 ml-3">
                  <h1 className="text-[26px] font-bold mb-2 tablet:hidden ">
                    Saldo Pendente:
                  </h1>
                  <h1 className="text-2xl font-bold mb-2 laptop:hidden desktop:hidden">
                    Saldo Pendente:
                  </h1>
                  <input
                    autoComplete="off"
                    type="text"
                    className={styleAll.inputSoWDis}
                    placeholder=""
                    value={saldope}
                    readOnly
                    disabled
                  />
                </div>
              </div>
            )}
            {state?.tipo == 2 && (
              <>
                <div className="flex laptop:mt-10 desktop:mt-10 tablet:mt-5">
                  <div className="w-[25%] tablet:w-[40%] laptop:mx-6 desktop:mx-6 ml-3">
                    <h1 className="text-[26px] tablet:text-2xl font-bold mb-2 ">
                      Número RC:
                    </h1>
                    <div className="flex">
                      <input
                        onBlurCapture={() => getRCS()}
                        className={
                          garantia ? styleAll.inputSoWDis : styleAll.inputSoW
                        }
                        value={numrc}
                        disabled={garantia}
                        onChange={(e) => {
                          if (e.target.value.length > 9) {
                            setNumrc(e.target.value.slice(0, 9));
                          } else {
                            setNumrc(e.target.value);
                          }
                        }}
                      ></input>
                      <div className="flex my-auto mx-5 h-full ">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          onChange={(e) => {
                            setNumrc("");
                            setStatus(e.target.checked ? "Garantia" : "Sem RC");
                            setGarantia(e.target.checked);
                          }}
                          className="relative  h-10 w-10 cursor-pointer "
                          checked={garantia}
                        />
                        <h1 className="text-2xl mx-2 text-center my-auto">
                          Garantia
                        </h1>
                      </div>
                    </div>
                  </div>
                  {
                    <div className="w-[35%] tablet:w-[50%] tablet:hidden laptop:mx-auto desktop:mx-auto ml-3">
                      <h1 className="text-[26px] tablet:text-2xl font-bold mb-2">
                        Status:
                      </h1>
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
                  <div className="w-[20%] tablet:w-[60%] laptop:mx-6 desktop:mx-6 ml-3 ">
                    <h1 className="text-[26px] tablet:text-2xl font-bold mb-2 ">
                      Núm. OC:
                    </h1>
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
                <div className="w-[98%] mt-5 laptop:hidden desktop:hidden laptop:mx-auto desktop:mx-auto ml-3">
                  <h1 className="text-[26px] tablet:text-2xl font-bold mb-2">
                    Status:
                  </h1>
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
              </>
            )}
            <div className="flex mt-10 tablet:mt-5 desktop:mx-6">
              <div
                className={`flex w-[25%] mt-12 desktop:px-6 ${
                  semRep && saldope > 0
                    ? "bg-[#9f3333]"
                    : semRep && saldope == 0
                    ? "bg-[#38761d]"
                    : ""
                } `}
              >
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="relative h-10 w-10 cursor-pointer my-auto "
                  checked={semRep}
                  onChange={(e) => setSemRep(e.target.checked)}
                />
                <h1 className="text-2xl my-auto mx-2">Item sem Reposição</h1>
              </div>
              <div className="w-[90%] tablet:w-[80%] desktop:mx-6 ml-3">
                <h1 className="text-[26px] font-bold mb-2 ">Observação:</h1>
                <input
                  autoComplete="off"
                  type="text"
                  className={styleAll.inputSoW}
                  placeholder=""
                  value={obs}
                  onChange={(e) => {
                    if (e.target.value.length > 4999) {
                      setObs(e.target.value.slice(0, 4999));
                    } else {
                      setObs(e.target.value);
                    }
                  }}
                />
              </div>

              <div className="w-[10%] desktop:mx-6 tablet:w-[20%] mt-12 ml-3">
                <button
                  className="p-3 text-2xl flex w-full font-bold duration-200 hover:scale-105 bg-dana text-center rounded-md"
                  placeholder=""
                  onClick={() => setAnexoTela(true)}
                >
                  <BsFillCameraFill className="mr-2 ml-3 text-3xl"></BsFillCameraFill>
                  Anexo
                </button>
                <div className="">
                  {anexoArray.length > 0 && (
                    <h1 className="text-center mt-2">Imagem Anexada</h1>
                  )}
                </div>
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
                onClick={() => {
                  setLoad2(true);
                  criarCons();
                }}
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
