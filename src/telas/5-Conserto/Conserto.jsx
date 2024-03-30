import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import { styleAll } from "../../css";
import Titulo from "../components/NavBar/Titulo";
import FiltrosConserto from "./FiltrosConserto";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { BsFillCameraFill } from "react-icons/bs";
import ImgPopUp from "../components/Camera/ImgPopUp";
import Notificacao from "../components/Notificacao";
import { ToastContainer } from "react-toastify";
import { ImSearch } from "react-icons/im";
import ItemTr from "./ItemTr";
import getLogin from "../components/Login/getLogin";
import TelaItem from "./Items/TelaItem";
import NumRC from "./AltNumRC/NumRC";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import Loading from "../components/Loading/Loading";
import Excel from "./Excel/Excel";
import { FaFileExcel } from "react-icons/fa6";
import LoadingGet from "../components/Loading/LoadingGet";
import ExcluirConserto from "./Excluir/ExcluirConserto";
import { RiGridFill } from "react-icons/ri";
import Colunas from "../components/Table/Colunas";
import Table from "../components/Table/Tables";

export default function Conserto() {
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
  const localstorage = localStorage;

  const filtrosSalvos =
    localstorage?.filtrosConserto == undefined
      ? [["Conserto.ConCod", ""]]
      : JSON.parse(localstorage?.filtrosConserto);

  const orderValSalvos =
    localstorage?.orderValConserto == undefined
      ? "desc"
      : localstorage?.orderValConserto;

  const orderSalvos =
    localstorage?.orderConserto == undefined
      ? "ConData"
      : localstorage?.orderConserto;

  const [load2, setLoad2] = useState(false);

  const [telaItem, setTelaItem] = useState(false);
  const [consertos, setConsertos] = useState();
  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);
  const qtdPagSalvoCons =
    localstorage?.qtdPagSalvoCons == undefined
      ? "10"
      : localstorage?.qtdPagSalvoCons;

  const [selecQtdPag, setSelecQtdPag] = useState(qtdPagSalvoCons);
  const [ativoImg, setAtivoImg] = useState(false);
  const [img, setImg] = useState([]);
  const [filtroAll, setFiltroAll] = useState(
    state?.conCod == undefined
      ? filtrosSalvos
      : [["Conserto.ConCod", state.conCod.toString()]]
  );
  const [itens, setItens] = useState([]);
  const [order, setOrder] = useState(orderSalvos);
  const [orderVal, setorderVal] = useState(orderValSalvos);

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
        `http://${import.meta.env.VITE_IP}/getCooldownRC`
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
        changePage({ selected: 0 }).then(getConserto());
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [pageN, selecQtdPag, filtroAll, order, orderVal]);

  //GET ESTOQUCEN POR DESCRICAO
  const getConserto = async () => {
    setLoad2(true);
    localStorage.setItem("filtrosConserto", JSON.stringify(filtroAll));
    localStorage.setItem("orderConserto", order);
    localStorage.setItem("orderValConserto", orderVal);
    localStorage.setItem("qtdPagSalvoCons", selecQtdPag);
    getConsertoCount({
      filtroAll,
      tabela: "Conserto",
    });

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getFiltros`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            filtroAll: filtroAll,
            tabela: "Conserto",
            order: order,
            orderVal: orderVal,
          },
        }
      );
      if (res?.data?.code) {
        setConsertos([]);
        Notificacao(["atencao", "Nenhum Conserto foi encontrado."]);
      } else {
        setConsertos(res?.data);
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhum Conserto foi encontrado."]);
        }
      }
      setLoad2(false);
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
        `http://${import.meta.env.VITE_IP}/getFiltroCount`,
        { params: props }
      );
      if (res?.data?.code) {
        setTotal(0);
      } else {
        setTotal(res?.data[0][""]);
      }
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
        ativarExc={ativarExc}
        getConserto={getConserto}
        colunas={colunas}
      />
    ));
  };
  const [ativoExc, setAtivoExc] = useState(false);
  const changePage = async ({ selected }) => {
    setPageN(selected);
  };

  const [ativoNUMRC, setativoNUMRC] = useState(false);
  const [infos, setInfos] = useState([]);
  const ativarNumRC = ({ conserto }) => {
    setInfos(conserto);
    setativoNUMRC(true);
  };

  const ativarExc = ({ conserto }) => {
    setInfos(conserto);
    setAtivoExc(true);
  };

  const getExcel = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getExcel`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            filtroAll: filtroAll,
            tabela: "Conserto",
            order: order,
            orderVal: orderVal,
            orderItem: "ConsertoItem.ConCodItem",
          },
        }
      );

      if (res?.data?.code) {
        Notificacao(["atencao", "Nenhum conserto foi encontrado."]);
      } else {
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhum conserto foi encontrado."]);
        } else {
          Excel({ conserto: res.data });
        }
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar consertos " + err]);
      console.log(err);
    }
  };

  const colunasLocal =
    localstorage?.colunasCon == undefined
      ? ""
      : JSON.parse(localstorage?.colunasCon);

  const tableHeaders = [
    ["", 24, 24, true, ""],
    ["Cod.", 80, 30, true, "ConCod", 50],
    ["Data", 180, 50, true, "ConData", 140],
    ["OS", 90, 30, true, "ConNum", 70],
    ["RC", 120, 30, true, "ConNumRC"],
    ["Status", 210, 30, true, "Status", 150],
    ["Manutentor", 260, 50, true, "ConManNome", 200],
    ["Máq. Descrição", 270, 50, true, "ConMaqDesc", 300],
    ["Divisão", 150, 50, true, "ConMaqDiv", 110],
    ["Setor", 200, 50, true, "ConMaqSetor", 150],
    ["EBS", 90, 50, true, "ConMaqDivEBS"],
    ["SO", 90, 50, true, "ConNumSo"],
    ["Fornecedor", 230, 50, true, "PARTY_NAME", 200],
    ["NF", 90, 50, true, "NF"],
    ["Qtd. Saída", 70, 50, true, "QUANT"],
    ["Qtd. Retorno", 70, 50, true, "QTDE_RET"],
    ["Saldo Disponível", 70, 50, true, "SALDO_DISPONIVEL"],
    ["Orçamento", 70, 50, true, "ConOrc"],
    ["OC", 70, 50, true, "PO_NUM"],
    ["Observação", 250, 50, true, "ConObs", 200],
  ];

  /*const [colunas, setColunas] = useState(
    colunasLocal == "" ? tableHeaders : colunasLocal
  );*/

  const [colunas, setColunas] = useState(tableHeaders);

  useEffect(() => {
    localStorage.setItem("colunasCon", JSON.stringify(colunas));
  }, [colunas]);

  const [colAtivo, setColAtivo] = useState(false);

  const refCol = useRef();
  const refCol2 = useRef();

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        refCol.current &&
        !refCol.current.contains(event.target) &&
        refCol2.current &&
        !refCol2.current.contains(event.target)
      ) {
        setColAtivo(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refCol, refCol2]);

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
      <div className="w-full pl-[8.5em] pr-10 laptop:pl-[6.5em] tablet:pl-[6.5em]">
        <Titulo titulo="Conserto Externo" />
        {ativoImg && <ImgPopUp img={img} setAtivoImg={setAtivoImg}></ImgPopUp>}
        {telaItem && (
          <TelaItem itens={itens} setTelaItem={setTelaItem}></TelaItem>
        )}
        {ativoExc && (
          <ExcluirConserto
            conserto={infos}
            setAtivoExc={setAtivoExc}
            getConserto={getConserto}
          />
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
            <div className="my-9 tablet:my-5 laptop:flex desktop:flex">
              <div>
                <FiltrosConserto
                  setFiltroAll={setFiltroAll}
                  filtroAll={filtroAll}
                ></FiltrosConserto>
              </div>

              <div className="flex h-full ml-4 tablet:mb-12">
                <h1 className="my-auto mx-4 text-2xl tablet:text-xl font-bold">
                  Ordem:
                </h1>
                <select
                  id="large"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className={
                    "block w-fit px-3 py-3 text-xl tablet:text-lg text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
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
                  <option value="GetSalesOrder.PARTY_NAME">Fornecedor</option>
                  <option value="ConNumSo">Número SO</option>
                  <option value="GetSalesOrder.NF">Nº Nota Fiscal</option>
                  <option value="GetSalesOrder.QUANT">Quantidade Saída</option>
                  <option value="GetSalesOrder.QTDE_RET">
                    Quantidade Retorno
                  </option>
                  <option value="GetSalesOrder.SALDO_DISPONIVEL">
                    Saldo Disponível
                  </option>
                  <option value="ConOrc">Nº Orçamento</option>
                  <option value="ConNumRC">Número RC</option>
                  <option value="(Consulta.PO_NUM+' '+ Consulta.CLOSED_CODE)">
                    Número OC
                  </option>
                  <option value="ConObs">Observação</option>
                </select>

                <button
                  onClick={() =>
                    setorderVal(orderVal == "desc" ? "asc" : "desc")
                  }
                >
                  {orderVal == "desc" ? (
                    <BiSortDown className="ml-5 tablet:ml-2 bg-dana text-[3.3em] p-2 tablet:text-[2.8em] duration-200 hover:scale-105 rounded-md"></BiSortDown>
                  ) : (
                    <BiSortUp className="ml-5 tablet:ml-2 bg-dana text-[3.3em] p-2 tablet:text-[2.8em] pt-2 duration-200 hover:scale-105 rounded-md"></BiSortUp>
                  )}
                </button>
              </div>
            </div>
            <div className="flex -mt-2">
              <div className="flex relative mx-5 tablet:mx-2 -mt-10 tablet:-mt-7">
                <button
                  className="flex bg-dana duration-200 tablet:text-xl hover:scale-105 rounded-md text-2xl font-bold p-2"
                  onClick={() => {
                    changePage({ selected: 0 }).then(getConserto());
                  }}
                >
                  Buscar
                  <ImSearch className="my-auto mx-auto ml-3 tablet:ml-2" />
                </button>
              </div>
              <div className="flex relative mx-5 tablet:mx-2 -mt-10 tablet:-mt-7">
                <button
                  onClick={() =>
                    navigate("./ItemConserto", { state: { tipo: 1 } })
                  }
                  className="flex bg-dana rounded-md duration-200 tablet:text-xl hover:scale-105 text-2xl font-bold p-2"
                >
                  Novo+
                </button>
              </div>
              <div className="flex relative mx-5 tablet:mx-2 -mt-10 tablet:-mt-7">
                <button
                  className="flex bg-[#107C41] rounded-md tablet:text-xl duration-200 hover:scale-105 text-2xl font-bold p-2"
                  onClick={() => {
                    getExcel();
                  }}
                >
                  Excel
                  <FaFileExcel className="my-auto mx-auto ml-[0.35em]" />
                </button>
              </div>
            </div>
            <div className="flex mt-6 text-[#ffffffc2] tablet:text-sm">
              <div className="flex mx-3 tablet:mx-2">
                <div className="w-5 h-5 bg-[#c23636] border-2 border-[#ffffffc2] mr-2"></div>
                <h1>Item sem reposição - Sem retorno</h1>
              </div>
              <div className="flex mx-3 tablet:mx-2">
                <div className="w-5 h-5  bg-[#38761d] border-2 border-[#ffffffc2] mr-2"></div>
                <h1>Item sem reposição - Com retorno</h1>
              </div>
            </div>
            <div className="flex right-20 tablet:right-12 -mt-12 tablet:-mt-10 absolute  ">
              <button
                ref={refCol}
                className="flex bg-dana rounded-md duration-200 hover:scale-105 text-xl tablet:text-lg font-bold p-2"
                onClick={() => {
                  setColAtivo(!colAtivo);
                }}
              >
                Colunas
                <RiGridFill className="my-auto mx-auto ml-[0.35em]" />
              </button>
              {colAtivo && (
                <Colunas
                  colunas={colunas}
                  setColunas={setColunas}
                  refCol2={refCol2}
                  setColAtivo={setColAtivo}
                ></Colunas>
              )}
            </div>

            <div className="-mt-5">
              <Table headers={colunas} tableContent={dadosMat()}></Table>
            </div>

            <div className="mb-14 laptop:flex desktop:flex float-right relative">
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Próxima"}
                pageCount={pagesTotal}
                forcePage={pageN}
                onPageChange={changePage}
                containerClassName="bg-[#3B3B3B] flex rounded-lg h-full text-xl tablet:text-lg text-white font-bold"
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
                    " py-2 px-3 ml-5 rounded-md text-xl tablet:text-lg tablet:float-right tablet:mt-5 font-bold border-0 " +
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
