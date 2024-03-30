import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import { styleAll } from "../../../../css";
import Titulo from "../../../components/NavBar/Titulo";
import axios from "axios";
import Filtros from "./Filtros";

import { SlArrowRight } from "react-icons/sl";
import ItemTr from "./ItemTr";
import ImgPopUp from "../../../components/Camera/ImgPopUp";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import Notificacao from "../../../components/Notificacao";
import { ImSearch } from "react-icons/im";
import getLogin from "../../../components/Login/getLogin";
import { useLocation, useNavigate } from "react-router-dom";

import { BiSortDown, BiSortUp } from "react-icons/bi";
import LoadingGet from "../../../components/Loading/LoadingGet";
import { FaFileExcel } from "react-icons/fa6";
import Excel from "./Excel/Excel";
import Colunas from "../../../components/Table/Colunas";
import Table from "../../../components/Table/Tables";
import { RiGridFill } from "react-icons/ri";

export default function Movimentacao() {
  const nav = useNavigate();
  const [logado, setLogado] = useState(null);

  useEffect(() => {
    getLogin().then((val) => {
      setLogado(val);
      if (!val) {
        nav("/");
      }
    });
  }, []);
  const state = useLocation().state;

  const [historico, sethistorico] = useState();
  const [load, setLoad] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);

  const localstorage = localStorage;
  const filtrosSalvos =
    localstorage?.filtrosMovimentacao == undefined
      ? [["EstoqueManutencao.EstManNum", ""]]
      : JSON.parse(localstorage?.filtrosMovimentacao);

  const orderValSalvos =
    localstorage?.orderValMovimentacao == undefined
      ? "desc"
      : localstorage?.orderValMovimentacao;

  const orderSalvos =
    localstorage?.orderMovimentacao == undefined
      ? "HisData"
      : localstorage?.orderMovimentacao;

  const [filtroAll, setFiltroAll] = useState(
    state?.id == undefined
      ? filtrosSalvos
      : [["EstoqueManutencao.EstManNum", state?.id.toString()]]
  );

  const qtdPagSalvoMovEst =
    localstorage?.qtdPagSalvoMovEst == undefined
      ? "10"
      : localstorage?.qtdPagSalvoMovEst;

  const [selecQtdPag, setSelecQtdPag] = useState(qtdPagSalvoMovEst);

  const [order, setOrder] = useState(orderSalvos);
  const [orderVal, setorderVal] = useState(orderValSalvos);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    changePage({ selected: 0 }).then(gethistorico());
  }, [selecQtdPag]);

  useEffect(() => {
    gethistorico();
  }, [pageN]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        nav("/EstoqueManutencao");
      }
      if (event.key === "Enter") {
        event.preventDefault();
        changePage({ selected: 0 }).then(gethistorico());
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [pageN, selecQtdPag, filtroAll, order, orderVal]);

  //GET ESTOQUEMAN POR DESCRICAO
  const gethistorico = async () => {
    setLoad(true);
    localStorage.setItem("filtrosMovimentacao", JSON.stringify(filtroAll));
    localStorage.setItem("orderMovimentacao", order);
    localStorage.setItem("orderValMovimentacao", orderVal);
    localStorage.setItem("qtdPagSalvoMovEst", selecQtdPag);
    gethistoricoCount({
      filtroAll,
      tabdata: "HisData",
      tabela: "HistoricoEst",
    });

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getFiltros`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            filtroAll: filtroAll,

            tabela: "HistoricoEst",

            order: order,
            orderVal: orderVal,
          },
        }
      );
      if (res?.data?.code) {
        sethistorico([]);
        Notificacao(["atencao", "Nenhuma movimentação foi encontrada."]);
      } else {
        sethistorico(res?.data);
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhuma movimentação foi encontrada."]);
        }
      }

      setLoad(false);
    } catch (err) {
      setLoad(false);
      Notificacao(["erro", "Erro ao buscar as Solicitações " + err]);
      console.log(err);
    }
  };

  //--COUNT
  const gethistoricoCount = async (props) => {
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
      Notificacao(["erro", "Erro ao buscar as Solicitações " + err]);
    }
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
            tabela: "HistoricoEst",
            order: order,
            orderVal: orderVal,
          },
        }
      );
      if (res?.data?.code) {
        Notificacao(["atencao", "Nenhuma movimentação foi encontrada."]);
      } else {
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhuma movimentação foi encontrada."]);
        } else {
          Excel({ historico: res.data });
        }
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar movimentações " + err]);
      console.log(err);
    }
  };

  const pagesTotal = Math.ceil(total / selecQtdPag);
  const dadosMat = () => {
    return historico?.map((historico, index) => (
      <ItemTr historico={historico} key={index} colunas={colunas} />
    ));
  };

  const changePage = async ({ selected }) => {
    setPageN(selected);
  };

  const colunasLocal =
    localstorage?.colunasMov == undefined
      ? ""
      : JSON.parse(localstorage?.colunasMov);

  const tableHeaders = [
    ["", 62, 62, true, ""],
    ["Data", 170, 30, true, "HisData", 150],
    ["Item", 350, 50, true, "HisEstManId", 300],
    ["Manutentor", 300, 30, true, "HisManut", 180],
    ["Saldo Anterior", 120, 30, true, "HisSaldoAnt"],
    ["Qtd. Movimentada", 120, 50, true, "QtdMovi"],
    ["Saldo Atual", 120, 20, true, "HisSaldoAtu"],
    ["Máquina", 350, 20, true, "MaqDescricao", 300],
    ["OS", 120, 20, true, "HisOS", 90],
  ];

  const [colunas, setColunas] = useState(
    colunasLocal == "" ? tableHeaders : colunasLocal
  );

  useEffect(() => {
    localStorage.setItem("colunasMov", JSON.stringify(colunas));
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
      <NavBar ativo="3"></NavBar>
      <div className="w-full pl-[8.5em] pr-10 laptop:pl-[6.5em] tablet:pl-[6.5em]">
        <Titulo titulo="Estoque Manutenção - Movimentação" />
        {load && <LoadingGet></LoadingGet>}
        <div className="">
          <div className="my-9 laptop:flex desktop:flex">
            <div>
              <Filtros
                setFiltroAll={setFiltroAll}
                filtroAll={filtroAll}
              ></Filtros>
            </div>

            <div className="flex h-full laptop:ml-4 desktop:ml-4 tablet:mb-12">
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
                <option value="HisData">Data</option>
                <option value="EstoqueManutencao.EstManNum">Num. Item</option>
                <option value="EstoqueManutencao.EstManDesc">
                  Descrição Item Estoque
                </option>
                <option value="HisMaqCod">Cód. Máquina</option>
                <option value="HisOS">Ordem de Serviço</option>
                <option value="Maquinas.MaqDescricao">Máquina Descrição</option>
                <option value="HisManut">Manutentor</option>
                <option value="HisSaldoAtu - HisSaldoAnt">
                  Qtd. Movimentada
                </option>
              </select>

              <button
                className="duration-200 hover:scale-105"
                onClick={() => setorderVal(orderVal == "desc" ? "asc" : "desc")}
              >
                {orderVal == "desc" ? (
                  <BiSortDown className="ml-5 tablet:ml-2 bg-dana text-[3.3em] tablet:text-[2.75em] p-2  rounded-md"></BiSortDown>
                ) : (
                  <BiSortUp className="ml-5 tablet:ml-2 bg-dana text-[3.3em] tablet:text-[2.75em] p-2 pt-2 rounded-md"></BiSortUp>
                )}
              </button>
            </div>
          </div>
          <div className="flex">
            <div className="flex relative ml-5 -mt-6">
              <button
                className="flex bg-dana rounded-md duration-200 hover:scale-105 text-2xl tablet:text-xl font-bold p-2"
                onClick={() => {
                  changePage({ selected: 0 }).then(gethistorico());
                }}
              >
                Buscar
                <ImSearch className="my-auto mx-auto ml-3 " />
              </button>
            </div>
            <div className="flex relative mx-5 -mt-6">
              <button
                className="flex bg-[#107C41] rounded-md duration-200 hover:scale-105 text-2xl tablet:text-xl font-bold p-2"
                onClick={() => {
                  getExcel();
                }}
              >
                Excel
                <FaFileExcel className="my-auto mx-auto ml-[0.35em]" />
              </button>
            </div>
          </div>
          <div className="flex float-right relative mr-8 -mt-8">
            <button
              ref={refCol}
              className="flex bg-dana rounded-md duration-200 hover:scale-105 text-xl font-bold p-2"
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

          <Table headers={colunas} tableContent={dadosMat()}></Table>

          <div className=" mb-14 laptop:flex desktop:flex float-right relative">
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
                  " py-2 px-3 ml-5 tablet:mt-2 rounded-md tablet:float-right text-xl tablet:text-lg font-bold border-0 " +
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
  );
}
