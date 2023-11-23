import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { styleAll } from "../../css";
import Titulo from "../components/Titulo";
import FiltrosConserto from "./FiltrosConserto";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { BsFillCameraFill } from "react-icons/bs";
import ImgPopUp from "../components/ImgPopUp";
import Notificacao from "../components/Notificacao";
import { ToastContainer } from "react-toastify";
import { ImSearch } from "react-icons/im";
import ItemTr from "./ItemTr";
import getLogin from "../components/getLogin";
import TelaItem from "./Items/TelaItem";
import NumRC from "./AltNumRC/NumRC";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import Loading from "../components/Loading";
import Excel from "./Excel/Excel";
import { FaFileExcel } from "react-icons/fa6";
import LoadingGet from "../components/LoadingGet";

export default function Conserto() {
  var DataHoje = new Date();
  const defaultValueFin = DataHoje.toLocaleDateString("en-CA");
  DataHoje.setMonth(DataHoje.getMonth() - 1);
  const defaultValueIni = DataHoje.toLocaleDateString("en-CA");
  const navigate = useNavigate();
  const state = useLocation().state;
  const [logado, setLogado] = useState(null);
  useEffect(() => {
    getLogin().then((val) => {
      setLogado(val);
      if (!val) {
        navigate("/");
      }
    });
  }, []);
  const [load2, setLoad2] = useState(false);

  const [telaItem, setTelaItem] = useState(false);
  const [consertos, setConsertos] = useState();
  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);
  const [selecQtdPag, setSelecQtdPag] = useState(10);
  const [ativoImg, setAtivoImg] = useState(false);
  const [img, setImg] = useState("");
  const [filtroAll, setFiltroAll] = useState(
    state?.conCod == undefined
      ? [["ConCod", ""]]
      : [["ConCod", state.conCod.toString()]]
  );
  const [itens, setItens] = useState([]);
  const [order, setOrder] = useState("ConData");
  const [orderVal, setorderVal] = useState("desc");
  const [dataIni, setDataIni] = useState(
    state?.conCod == undefined
      ? defaultValueIni
      : new Date(DataHoje.setFullYear(2020, 0, 1)).toLocaleDateString("en-CA")
  );
  const [dataFin, setDataFin] = useState(defaultValueFin);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    changePage({ selected: 0 }).then(getConserto());
  }, [selecQtdPag]);

  const [ultimaData, setUltimaData] = useState(new Date());
  const firstUpdate2 = useRef(true);
  useEffect(() => {
    if (firstUpdate2.current) {
      firstUpdate2.current = false;
      return;
    }
    getConserto();
  }, [pageN]);

  useEffect(() => {
    getCooldown().then((res) => {
      var agr = new Date();
      var ultimo5 = new Date(res.getTime() + 80000 + 180 * 60000);
      if (ultimo5 <= agr) {
        getConserto();
      } else {
        setLoad(true);
      }
    });
  }, []);

  const getCooldown = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getCooldownRC`
      );
      var ultimo = new Date(res?.data[0].CooldownRC);
      setUltimaData(ultimo);
      return ultimo;
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar ultima data de atualização " + err]);
      console.log(err);
    }
  };

  const [load, setLoad] = useState(false);
  const [timer, setTimer] = useState(80);

  const [horario, setHorario] = useState(new Date());

  useEffect(() => {
    if (horario.getMinutes() == 0 && horario.getSeconds() == 3) {
      getCooldown().then((res) => {
        var agr = new Date();
        var ultimo5 = new Date(res.getTime() + 80000 + 180 * 60000);
        if (ultimo5 >= agr) {
          setLoad(true);
        }
      });
    }

    const timeoutFunction = setInterval(() => {
      setHorario(new Date());
    }, 1000);

    return () => clearInterval(timeoutFunction);
  }, [horario]);

  useEffect(() => {
    if (load) {
      var agr = new Date();
      var ultimo5 = new Date(ultimaData.getTime() + 80000 + 180 * 60000);
      var seconds = (ultimo5.getTime() - agr.getTime()) / 1000;

      if (timer <= 0) {
        setLoad(false);
        setTimer(80);
        getConserto();
        return;
      }

      const timeoutFunction = setInterval(() => {
        setTimer(seconds);
      }, 1000);

      return () => clearInterval(timeoutFunction);
    }
  }, [timer, load]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        getConserto();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [pageN, selecQtdPag, filtroAll, dataIni, dataFin, order, orderVal]);

  //GET ESTOQUCEN POR DESCRICAO
  const getConserto = async () => {
    setLoad2(true);

    getConsertoCount({
      filtroAll,
      dataIni,
      dataFin,
      tabela: "Conserto",
      tabdata: "ConData",
    });

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getFiltros`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            filtroAll: filtroAll,
            dataIni: dataIni,
            dataFin: dataFin,
            tabela: "Conserto",
            tabdata: "ConData",
            order: order,
            orderVal: orderVal,
          },
        }
      );
      setConsertos(res?.data);
      setLoad2(false);

      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhum Conserto foi encontrado."]);
      }
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar os itens do Conserto" + err]);
      setLoad2(false);
    }
  };

  //--COUNT
  const getConsertoCount = async (props) => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getFiltroCount`,
        { params: props }
      );

      setTotal(res?.data[0][""]);
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar os itens do Conserto" + err]);
    }
  };

  const pagesTotal = Math.ceil(total / selecQtdPag);

  const dadosMat = () => {
    return consertos?.map((conserto, index) => (
      <ItemTr
        conserto={conserto}
        key={index}
        setAtivoImg={setAtivoImg}
        setImg={setImg}
        setTelaItem={setTelaItem}
        setItens={setItens}
        ativarNumRC={ativarNumRC}
      />
    ));
  };

  const changePage = async ({ selected }) => {
    setPageN(selected);
  };

  const [ativoNUMRC, setativoNUMRC] = useState(false);
  const [infos, setInfos] = useState([]);
  const ativarNumRC = ({ conserto }) => {
    setInfos(conserto);
    setativoNUMRC(true);
  };

  const getExcel = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getExcel`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            filtroAll: filtroAll,
            dataIni: dataIni,
            dataFin: dataFin,
            tabela: "Conserto",
            tabdata: "ConData",
            order: order,
            orderVal: orderVal,
            orderItem: "ConCodItem",
          },
        }
      );

      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhum conserto foi encontrado."]);
      } else {
        Excel({ conserto: res.data });
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar consertos " + err]);
      console.log(err);
    }
  };

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

      <NavBar ativo="5"></NavBar>
      <div className="w-full pl-[8.5em] pr-10">
        <Titulo titulo="Conserto Externo" />
        {ativoImg && <ImgPopUp img={img} setAtivoImg={setAtivoImg}></ImgPopUp>}
        {telaItem && (
          <TelaItem itens={itens} setTelaItem={setTelaItem}></TelaItem>
        )}
        <div id="iframeContainer"></div>

        {ativoNUMRC && (
          <NumRC
            infos={infos}
            setativoNUMRC={setativoNUMRC}
            getConserto={getConserto}
          ></NumRC>
        )}
        {load && <Loading></Loading>}
        {load2 && <LoadingGet></LoadingGet>}

        <div>
          <div>
            <div className="my-9 flex">
              <div>
                <FiltrosConserto
                  setFiltroAll={setFiltroAll}
                  filtroAll={filtroAll}
                ></FiltrosConserto>
              </div>

              <div className="flex h-full ml-4">
                <h1 className="my-auto mx-4 text-2xl font-bold">Data:</h1>
                <input
                  value={dataIni}
                  onChange={(e) => {
                    setDataIni(e.target.value);
                  }}
                  className={
                    "h-full py-[0.55em] px-2 w-[10.3rem] text-xl " +
                    styleAll.inputSemW +
                    " focus:-outline-offset-0"
                  }
                  type="date"
                ></input>
                <h1 className="my-auto mx-3 text-xl font-bold">até</h1>
                <input
                  value={dataFin}
                  onChange={(e) => {
                    setDataFin(e.target.value);
                  }}
                  className={
                    "h-full py-[0.55em] px-2 w-[10.3rem] text-xl " +
                    styleAll.inputSemW +
                    " focus:-outline-offset-0"
                  }
                  type="date"
                ></input>
              </div>
              <div className="flex h-full ml-4">
                <h1 className="my-auto mx-4 text-2xl font-bold">Ordem:</h1>
                <select
                  id="large"
                  onChange={(e) => setOrder(e.target.value)}
                  className={
                    "block w-fit px-3 py-3 text-xl  text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                    styleAll.inputSemW
                  }
                >
                  <option value="ConData">Data</option>
                  <option value="ConManNome">Manutentor</option>
                  <option value="ConNum">Número</option>
                  <option value="ConMaqDesc">Descrição da Máquina</option>
                  <option value="ConMaqDiv">Divisão da Máquina</option>
                  <option value="ConMaqSetor">Setor da Máquina</option>
                  <option value="ConMaqDivEBS">Divisão EBS da Máquina</option>
                  <option value="ConForDesc">Fornecedor</option>
                  <option value="ConNumSo">Número SO</option>
                  <option value="ConNF">Nº Nota Fiscal</option>
                  <option value="ConOrc">Nº Orçamento</option>
                  <option value="ConNumRC">Número RC</option>
                  <option value="ConNumOC">Número OC</option>
                  <option value="ConObs">Observação</option>
                </select>

                <button
                  onClick={() =>
                    setorderVal(orderVal == "desc" ? "asc" : "desc")
                  }
                >
                  {orderVal == "desc" ? (
                    <BiSortDown className="ml-5 bg-dana text-[3.3em] p-2 duration-200 hover:scale-105 rounded-md"></BiSortDown>
                  ) : (
                    <BiSortUp className="ml-5 bg-dana text-[3.3em] p-2 pt-2 duration-200 hover:scale-105 rounded-md"></BiSortUp>
                  )}
                </button>
              </div>
            </div>
            <div className="flex">
              <div className="flex relative mx-5 -mt-6">
                <button
                  className="flex bg-dana duration-200 hover:scale-105 rounded-md text-2xl font-bold p-2"
                  onClick={() => {
                    changePage({ selected: 0 }).then(getConserto());
                  }}
                >
                  Buscar
                  <ImSearch className="my-auto mx-auto ml-3" />
                </button>
              </div>
              <div className="flex relative mx-5 -mt-6">
                <button
                  onClick={() =>
                    navigate("./ItemConserto", { state: { tipo: 1 } })
                  }
                  className="flex bg-dana rounded-md duration-200 hover:scale-105 text-2xl font-bold p-2"
                >
                  Novo+
                </button>
              </div>
              <div className="flex relative mx-5 -mt-6">
                <button
                  className="flex bg-[#107C41] rounded-md duration-200 hover:scale-105 text-2xl font-bold p-2"
                  onClick={() => {
                    getExcel();
                  }}
                >
                  Excel
                  <FaFileExcel className="my-auto mx-auto ml-[0.35em]" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto w-full mt-8 mb-10 rounded-xl ">
              <table className="table rounded-lg mx-auto overflow-x-auto w-max">
                <thead>
                  <tr className="text-xl bg-dana font-extrabold">
                    <th className=" rounded-ss-xl"></th>
                    <th className="p-3 w-[5em]">Cod.</th>
                    <th className="w-[11em]">Data</th>
                    <th className="w-[6em]">Número OS</th>
                    <th className="w-[5em]">Nº RC</th>
                    <th className="w-[13em]">Status</th>
                    <th className="w-[10em]">Manutentor</th>
                    <th className="w-[19em]">Máq. Descrição</th>
                    <th className="w-[10em]">Máq. Divisão</th>
                    <th className="w-[10em]">Máq. Setor</th>
                    <th className="w-[10em]">Máq. Div. EBS</th>
                    <th className="w-[5em]">Nº SO</th>
                    <th className="w-[15em]">Fornecedor</th>
                    <th className="w-[5em]">Nº NF</th>
                    <th className="w-[5em]">Nº Orçamento </th>
                    <th className="w-[12em]">Nº OC</th>
                    <th className="w-[20em] rounded-se-xl">Observação</th>
                  </tr>
                </thead>
                <tbody className="[&>*:nth-child(odd)]:bg-fundo [&>*:nth-child(even)]:bg-[#292929]">
                  {dadosMat()}
                </tbody>
              </table>
            </div>
            <div className=" mb-14 flex float-right relative">
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Próxima"}
                pageCount={pagesTotal}
                forcePage={pageN}
                onPageChange={changePage}
                containerClassName="bg-[#3B3B3B] flex rounded-lg h-full text-xl text-white font-bold"
                previousClassName="py-2 duration-200 rounded-s-lg  hover:bg-dana"
                previousLinkClassName="py-2 px-5"
                nextClassName="py-2 duration-200 rounded-e-lg  hover:bg-dana"
                nextLinkClassName="py-2 px-5"
                activeClassName="bg-dana"
                pageClassName="py-2 duration-200 hover:bg-dana"
                pageLinkClassName="px-4 py-2"
                pageRangeDisplayed={3}
                breakClassName="py-2 duration-200 hover:bg-dana"
                breakLinkClassName="py-2 px-5"
              />
              <div>
                <select
                  value={selecQtdPag}
                  onChange={(e) => setSelecQtdPag(e.target.value)}
                  className={
                    " py-2 px-3 ml-5 rounded-md text-xl font-bold border-0 " +
                    styleAll.inputSemW
                  }
                >
                  <option value={10}>10 por página</option>
                  <option value={20}>20 por página</option>
                  <option value={50}>50 por página</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
