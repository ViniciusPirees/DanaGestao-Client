import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import { styleAll } from "../../../../css";
import Titulo from "../../../components/NavBar/Titulo";
import FiltrosKanban from "./FiltrosKanban";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

import ImgPopUp from "../../../components/Camera/ImgPopUp";
import Notificacao from "../../../components/Notificacao";
import { ToastContainer } from "react-toastify";
import { ImSearch } from "react-icons/im";
import ItemTrKanban from "./ItemTrKanban";
import getLogin from "../../../components/Login/getLogin";

import LoadingGet from "../../../components/Loading/LoadingGet";

import { ColumnResizer } from "@column-resizer/core";
import TableImprimir from "./TableImprimir/TableImprimir";

export default function Kanban() {
  const navigate = useNavigate();
  const [arrPrint, setArrPrint] = useState([]);
  const [nivel, setNivel] = useState(0);

  useEffect(() => {
    getLogin().then((val) => {
      setNivel(val.n);
      if (!val) {
        navigate("/");
      }
    });
  }, []);

  const tableHeaders = [
    ["", 62, 62, true, ""],
    ["Núm. Item", 103, 50, true, "EstManNum"],
    ["Descrição", 520, 50, true, "EstManDesc"],
    ["Status", 115, 50, true, "EstManSta"],
    ["Área", 170, 50, true, "EstManAreaDesc"],
    ["Local", 128, 50, true, "EstManLoc"],
  ];

  const localstorage = localStorage;
  const filtrosSalvos =
    localstorage?.filtrosKanban == undefined
      ? [["EstManDesc", ""]]
      : JSON.parse(localstorage?.filtrosKanban);

  const orderValSalvos =
    localstorage?.orderValKanban == undefined
      ? "asc"
      : localstorage?.orderValKanban;

  const orderSalvos =
    localstorage?.orderKanban == undefined
      ? "EstManDesc"
      : localstorage?.orderKanban;

  const ativoSalvos =
    localstorage?.ativoKanban == undefined ? "A" : localstorage?.ativoKanban;

  const [colunas, setColunas] = useState(tableHeaders);

  const [colAtivo, setColAtivo] = useState(false);
  const [load, setLoad] = useState(false);
  const [estoques, setEstoques] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);
  const [selecQtdPag, setSelecQtdPag] = useState(10);
  const [ativoImg, setAtivoImg] = useState(false);
  const [img, setImg] = useState("");
  const [input, setInput] = useState("");
  const [filtroAll, setFiltroAll] = useState(filtrosSalvos);
  const [infosEst, setInfosEst] = useState("");
  const [order, setOrder] = useState(orderSalvos);
  const [orderVal, setorderVal] = useState(orderValSalvos);
  const [ativoIna, setAtivoIna] = useState(ativoSalvos);
  const firstUpdate = useRef(true);
  const [estMinimo, setEstMinimo] = useState("");

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    changePage({ selected: 0 }).then(getEstoqueMan());
  }, [selecQtdPag, infosEst]);

  useEffect(() => {
    getEstoqueMan();
  }, [pageN]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        navigate(-1);
      } else if (event.key === "Enter") {
        event.preventDefault();
        changePage({ selected: 0 }).then(getEstoqueMan());
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [pageN, selecQtdPag, filtroAll, order, orderVal, ativoIna]);

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

  //GET ESTOQUEMAN POR DESCRICAO
  const getEstoqueMan = async () => {
    setLoad(true);
    localStorage.setItem("filtrosKanban", JSON.stringify(filtroAll));
    localStorage.setItem("orderKanban", order);
    localStorage.setItem("orderValKanban", orderVal);
    localStorage.setItem("ativoKanban", ativoIna);

    getEstoqueCount({
      filtroAll,
      tabela: "EstoqueManutencao",
      ativo: ativoIna,
      tabdata: "EstManId",
      estMinimo: estMinimo,
    });

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getFiltros`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            filtroAll: filtroAll,
            tabela: "EstoqueManutencao",
            order: order,
            orderVal: orderVal,
            ativo: ativoIna,
            estMinimo: estMinimo,
          },
        }
      );

      if (res?.data?.code) {
        setEstoques([]);
        Notificacao(["atencao", "Nenhum item do Estoque foi encontrado."]);
      } else {
        setEstoques(res?.data);
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhum item do Estoque foi encontrado."]);
        }
      }

      setLoad(false);
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar itens estoque " + err]);
      console.log(err);
      setLoad(false);
    }
  };

  //--COUNT
  const getEstoqueCount = async (props) => {
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
      Notificacao(["erro", "Erro ao buscar itens estoque" + err]);
    }
  };

  const pagesTotal = Math.ceil(total / selecQtdPag);

  const renderTableData = () => {
    return estoques?.map((estoque, index) => (
      <ItemTrKanban
        estoque={estoque}
        key={index}
        setArrPrint={setArrPrint}
        arrPrint={arrPrint}
        colunas={colunas}
      />
    ));
  };

  const changePage = async ({ selected }) => {
    setPageN(selected);
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
      <NavBar ativo="3"></NavBar>
      <div className="w-full pl-[8.5em] pr-10 laptop:pl-[6.5em] tablet:pl-[6.5em] ">
        <Titulo titulo="Kanban" />

        {load && <LoadingGet></LoadingGet>}

        <div className="desktop:flex laptop:flex">
          <div>
            <div className="my-9 mt-4 desktop:flex ">
              <div>
                <FiltrosKanban
                  setFiltroAll={setFiltroAll}
                  filtroAll={filtroAll}
                ></FiltrosKanban>
              </div>
              <div className="flex h-full desktop:ml-4">
                <div className="flex h-full desktop:ml-4">
                  <h1 className="my-auto mx-4 text-2xl laptop:text-xl tablet:text-xl font-bold">
                    Status:
                  </h1>
                  <select
                    id="large"
                    value={ativoIna}
                    onChange={(e) => setAtivoIna(e.target.value)}
                    className={
                      "block w-fit px-3 py-3 text-xl laptop:text-lg tablet:text-lg text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                      styleAll.inputSemW
                    }
                  >
                    <option value="A">Ativo</option>
                    <option value="I">Inativo</option>
                    <option value="">Todos</option>
                  </select>
                </div>
                <div className="flex relative mx-5 h-full ">
                  <button
                    className="flex bg-dana rounded-md duration-200 hover:scale-105 laptop:text-xl tablet:text-xl text-2xl font-bold p-2"
                    onClick={() =>
                      changePage({ selected: 0 }).then(getEstoqueMan())
                    }
                  >
                    Buscar
                    <ImSearch className="my-auto mx-auto ml-3" />
                  </button>
                </div>
              </div>
            </div>

            <table className="table rounded-lg -mt-10 laptop:-mt-6 tablet:-mt-6 overflow-x-auto w-[100-vh - 8.5em] laptop:hidden tablet:hidden">
              <thead className="">
                <tr className="text-lg laptop:text-base tablet:text-base bg-dana font-extrabold">
                  <th className=" w-[0em] rounded-ss-xl"></th>
                  <th className="p-3 w-[7em] laptop:w-[4em] tablet:w-[4em]">
                    Item
                  </th>
                  <th className="desktop:w-[20em] laptop:w-[15em] tablet:w-[15em]">
                    Descrição
                  </th>
                  <th className="p-3 w-[7em]">Status</th>
                  <th className="p-3 w-[7em]">Área</th>
                  <th className="p-3 w-[7em] rounded-se-xl">Local</th>
                </tr>
              </thead>
              <tbody className="[&>*:nth-child(odd)]:bg-fundo [&>*:nth-child(even)]:bg-[#292929]">
                {renderTableData()}
              </tbody>
            </table>

            <div className="w-[100vh - 8.5em] overflow-x-auto mt-8 mb-10 rounded-xl desktop:hidden ">
              <table className="table w-max rounded-lg mx-auto overflow-x-auto ">
                <thead className="">
                  <tr className="text-lg laptop:text-base tablet:text-base bg-dana font-extrabold">
                    <th className=" w-[0em] rounded-ss-xl"></th>
                    <th className="p-3 w-[7em] laptop:w-[4em] tablet:w-[4em]">
                      Item
                    </th>
                    <th className="desktop:w-[20em] laptop:w-[16em] tablet:w-[16em]">
                      Descrição
                    </th>
                    <th className="p-3 w-[5em]">Status</th>
                    <th className="p-3 w-[7em]">Área</th>
                    <th className="p-3 w-[5em] rounded-se-xl">Local</th>
                  </tr>
                </thead>
                <tbody className="[&>*:nth-child(odd)]:bg-fundo [&>*:nth-child(even)]:bg-[#292929]">
                  {renderTableData()}
                </tbody>
              </table>
            </div>
            <div className="mb-14 laptop:mb-8 tablet:mb-8 desktop:mt-4 desktop:flex float-right relative">
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Próxima"}
                pageCount={pagesTotal}
                forcePage={pageN}
                onPageChange={changePage}
                containerClassName="bg-[#3B3B3B] flex rounded-lg h-full text-xl laptop:text-lg tablet:text-lg text-white font-bold"
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
                    " py-2 px-3 ml-5 rounded-md text-xl laptop:text-lg tablet:text-lg laptop:float-right tablet:float-right laptop:mt-5 tablet:mt-5 font-bold border-0 " +
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
          <div className="mx-auto ">
            <TableImprimir
              arrPrint={arrPrint}
              setArrPrint={setArrPrint}
            ></TableImprimir>
          </div>
        </div>
      </div>
    </div>
  );
}
