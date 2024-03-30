import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import { styleAll } from "../../css";
import Titulo from "../components/NavBar/Titulo";
import FiltrosEstMan from "./FiltrosEstMan";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

import ImgPopUp from "../components/Camera/ImgPopUp";
import Notificacao from "../components/Notificacao";
import { ToastContainer } from "react-toastify";
import { ImSearch } from "react-icons/im";
import ItemTrEstMan from "./ItemTrEstMan";
import AlterarSaldo from "./Abas/Altera/AlterarSaldo";
import getLogin from "../components/Login/getLogin";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { FaFileExcel } from "react-icons/fa6";
import Excel from "./Abas/Excel/Excel";
import LoadingGet from "../components/Loading/LoadingGet";
import ExcluirEstMan from "./Abas/Excluir/ExcluirEstMan";

import Table from "../components/Table/Tables";
import { ColumnResizer } from "@column-resizer/core";
import { HiMiniViewColumns } from "react-icons/hi2";
import Colunas from "../components/Table/Colunas";
import { RiGridFill } from "react-icons/ri";
import { FaExchangeAlt } from "react-icons/fa";
import { MdOutlineViewKanban, MdViewKanban } from "react-icons/md";
export default function EstoqueMan() {
  const navigate = useNavigate();

  const [nivel, setNivel] = useState(0);

  useEffect(() => {
    getLogin().then((val) => {
      setNivel(val.n);
      if (!val) {
        navigate("/");
      }
    });
  }, []);

  const localstorage = localStorage;
  const filtrosSalvos =
    localstorage?.filtrosEstoqueMan == undefined
      ? [["EstManDesc", ""]]
      : JSON.parse(localstorage?.filtrosEstoqueMan);

  const colunasLocal =
    localstorage?.colunasEst == undefined
      ? ""
      : JSON.parse(localstorage?.colunasEst);

  const orderValSalvos =
    localstorage?.orderValEstoqueMan == undefined
      ? "asc"
      : localstorage?.orderValEstoqueMan;

  const orderSalvos =
    localstorage?.orderEstoqueMan == undefined
      ? "EstManDesc"
      : localstorage?.orderEstoqueMan;

  const ativoSalvos =
    localstorage?.ativoEstoqueMan == undefined
      ? "A"
      : localstorage?.ativoEstoqueMan;

  const estMiniSalvo =
    localstorage?.estMinimoEstoqueMan == undefined
      ? ""
      : localstorage?.estMinimoEstoqueMan;

  const tableHeaders = [
    ["", 62, 62, true, ""],
    ["Núm. Item", 103, 50, true, "EstManNum", 100],
    ["Status", 115, 50, true, "EstManSta", 80],
    ["Nível", 62, 50, true, "EstManNivel"],
    ["Descrição", 520, 50, true, "EstManDesc", 350],
    ["Área", 170, 50, true, "EstManAreaDesc", 170],
    ["Tipo Material", 200, 50, true, "EstManTipMatDesc", 200],
    ["Local", 128, 50, true, "EstManLoc", 80],
    ["Saldo", 100, 20, true, "EstManSaldo"],
    ["Estoque Min.", 140, 20, true, "EstManEstMin"],
    ["Estoque Máx.", 140, 20, true, "EstManEstMax"],
  ];

  const [colunas, setColunas] = useState(
    colunasLocal == "" ? tableHeaders : colunasLocal
  );

  useEffect(() => {
    localStorage.setItem("colunasEst", JSON.stringify(colunas));
  }, [colunas]);

  const [colAtivo, setColAtivo] = useState(false);
  const [load, setLoad] = useState(false);
  const [estoques, setEstoques] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);
  const qtdPagSalvoEstMan =
    localstorage?.qtdPagSalvoEstMan == undefined
      ? "10"
      : localstorage?.qtdPagSalvoEstMan;

  const [selecQtdPag, setSelecQtdPag] = useState(qtdPagSalvoEstMan);
  const [ativoImg, setAtivoImg] = useState(false);
  const [img, setImg] = useState([]);
  const [filtroAll, setFiltroAll] = useState(filtrosSalvos);
  const [infosEst, setInfosEst] = useState("");
  const [order, setOrder] = useState(orderSalvos);
  const [orderVal, setorderVal] = useState(orderValSalvos);
  const [ativoIna, setAtivoIna] = useState(ativoSalvos);
  const firstUpdate = useRef(true);
  const [estMinimo, setEstMinimo] = useState(estMiniSalvo);

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
      if (event.key === "Enter") {
        event.preventDefault();
        changePage({ selected: 0 }).then(getEstoqueMan());
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [pageN, selecQtdPag, filtroAll, order, orderVal, ativoIna, estMinimo]);

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
    localStorage.setItem("filtrosEstoqueMan", JSON.stringify(filtroAll));
    localStorage.setItem("orderEstoqueMan", order);
    localStorage.setItem("orderValEstoqueMan", orderVal);
    localStorage.setItem("ativoEstoqueMan", ativoIna);
    localStorage.setItem("estMinimoEstoqueMan", estMinimo);
    localStorage.setItem("qtdPagSalvoEstMan", selecQtdPag);
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
        if (res?.data == 0 || res.data.length == undefined) {
          setEstoques([]);
          Notificacao(["atencao", "Nenhum item do Estoque foi encontrado."]);
        } else {
          setEstoques(res?.data);
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

  const [ativoExc, setAtivoExc] = useState(false);
  const pagesTotal = Math.ceil(total / selecQtdPag);

  const renderTableData = () => {
    return estoques?.map((estoque, index) => (
      <ItemTrEstMan
        estoque={estoque}
        key={index}
        setAtivoImg={setAtivoImg}
        setImg={setImg}
        setInfosEst={setInfosEst}
        ativarExc={ativarExc}
        colunas={colunas}
      />
    ));
  };
  const [infos, setInfos] = useState("");
  const ativarExc = ({ estman }) => {
    setInfos(estman);
    setAtivoExc(true);
  };

  const changePage = async ({ selected }) => {
    setPageN(selected);
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
            tabela: "EstoqueManutencao",
            order: order,
            orderVal: orderVal,
            ativo: ativoIna,
            estMinimo: estMinimo,
          },
        }
      );

      if (res?.data?.code) {
        Notificacao(["atencao", "Nenhum item do Estoque foi encontrado."]);
      } else {
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhum item do Estoque foi encontrado."]);
        } else {
          Excel({ estman: res.data });
        }
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar os items do estoque " + err]);
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
      <NavBar ativo="3"></NavBar>
      <div className="w-full pl-[8.5em] pr-10 laptop:pl-[6.5em] tablet:pl-[6.5em] ">
        <Titulo titulo="Estoque Manutenção" />
        {ativoImg && <ImgPopUp img={img} setAtivoImg={setAtivoImg}></ImgPopUp>}
        {infosEst != "" && (
          <AlterarSaldo
            setInfosEst={setInfosEst}
            infosEst={infosEst}
          ></AlterarSaldo>
        )}
        {ativoExc && (
          <ExcluirEstMan
            setAtivoExc={setAtivoExc}
            estman={infos}
            getEstoqueMan={getEstoqueMan}
          ></ExcluirEstMan>
        )}
        {load && <LoadingGet></LoadingGet>}

        <div>
          <div>
            <div className="desktop:my-9 laptop:my-4 tablet:my-4 desktop:flex">
              <div className="desktop:flex h-fit">
                <div className="flex tablet:mb-3">
                  <div>
                    <FiltrosEstMan
                      setFiltroAll={setFiltroAll}
                      filtroAll={filtroAll}
                    ></FiltrosEstMan>
                  </div>
                  <div className="flex h-full laptop:my-0 desktop:ml-4 desktop:hidden my-auto">
                    <h1 className="my-auto mx-4 text-2xl tablet:text-xl font-bold">
                      Status:
                    </h1>
                    <select
                      id="large"
                      value={ativoIna}
                      onChange={(e) => setAtivoIna(e.target.value)}
                      className={
                        "block w-fit p-3 tablet:p-2 text-xl tablet:text-lg  text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                        styleAll.inputSemW
                      }
                    >
                      <option value="A">Ativo</option>
                      <option value="I">Inativo</option>
                      <option value="">Todos</option>
                    </select>
                  </div>
                </div>
                <div className="flex h-fit">
                  <div className="flex h-full desktop:ml-4 ">
                    <h1 className="my-auto mx-4 text-2xl tablet:text-xl font-bold">
                      Ordem:
                    </h1>
                    <select
                      id="large"
                      value={order}
                      onChange={(e) => setOrder(e.target.value)}
                      className={
                        "block w-fit p-3 tablet:p-2  text-xl tablet:text-lg text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                        styleAll.inputSemW
                      }
                    >
                      <option value="EstManDesc">Descrição</option>
                      <option value="EstManNum">Número Item</option>
                      <option value="EstManAreaDesc">Área</option>
                      <option value="EstManSta">Status</option>
                      <option value="EstManTipMatDesc">Tipo Material</option>
                      <option value="EstManLoc">Local</option>
                      <option value="EstManEstMin">Est. Mínimo</option>
                      <option value="EstManEstMax">Est. Máximo</option>
                      <option value="EstManSaldo">Saldo</option>
                      <option value="EstManNivel">Nível</option>
                    </select>

                    <button
                      className="duration-200 hover:scale-105"
                      onClick={() =>
                        setorderVal(orderVal == "desc" ? "asc" : "desc")
                      }
                    >
                      {orderVal == "desc" ? (
                        <BiSortDown className="ml-5 bg-dana text-[3.3em] p-2 tablet:ml-2 tablet:text-[2.8em] rounded-md"></BiSortDown>
                      ) : (
                        <BiSortUp className="ml-5 bg-dana text-[3.3em] p-2 tablet:ml-2 pt-2 tablet:text-[2.8em] rounded-md"></BiSortUp>
                      )}
                    </button>
                  </div>
                  <div className="flex h-full ml-4 desktop:hidden my-auto">
                    <h1 className="my-auto mx-4 text-2xl tablet:text-xl font-bold">
                      Saldo:
                    </h1>
                    <select
                      id="large"
                      value={estMinimo}
                      onChange={(e) => setEstMinimo(e.target.value)}
                      className={
                        "block w-fit p-3 tablet:p-2 text-xl tablet:text-lg  text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                        styleAll.inputSemW
                      }
                    >
                      <option value="">Todos</option>
                      <option value=" (EstManSaldo > 0) ">
                        Saldo maior que Zero
                      </option>
                      <option value=" (EstManSaldo = EstManEstMin) ">
                        Saldo igual ao mínimo
                      </option>
                      <option value=" (EstManSaldo < EstManEstMin) ">
                        Saldo mínimo excedido
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex h-fit tablet:my-3 tablet:hidden laptop:hidden">
                <div className="flex h-full desktop:ml-4">
                  <h1 className="my-auto mx-4 text-2xl tablet:text-xl font-bold">
                    Status:
                  </h1>
                  <select
                    id="large"
                    value={ativoIna}
                    onChange={(e) => setAtivoIna(e.target.value)}
                    className={
                      "block w-fit p-3 tablet:p-2 text-xl tablet:text-lg  text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                      styleAll.inputSemW
                    }
                  >
                    <option value="A">Ativo</option>
                    <option value="I">Inativo</option>
                    <option value="">Todos</option>
                  </select>
                </div>
                <div className="flex h-full ml-4">
                  <h1 className="my-auto mx-4 text-2xl tablet:text-xl font-bold">
                    Saldo:
                  </h1>
                  <select
                    id="large"
                    value={estMinimo}
                    onChange={(e) => setEstMinimo(e.target.value)}
                    className={
                      "block w-fit p-3 tablet:p-2 text-xl tablet:text-lg  text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                      styleAll.inputSemW
                    }
                  >
                    <option value="">Todos</option>
                    <option value=" (EstManSaldo > 0) ">
                      Saldo maior que Zero
                    </option>
                    <option value=" (EstManSaldo = EstManEstMin) ">
                      Saldo igual ao mínimo
                    </option>
                    <option value=" (EstManSaldo < EstManEstMin) ">
                      Saldo mínimo excedido
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex mb-8 ">
              <div className="flex relative laptop:mx-5 desktop:mx-5 tablet:mx-2  desktop:-mt-6">
                <button
                  className="flex bg-dana rounded-md duration-200 hover:scale-105  text-2xl tablet:text-xl font-bold my-auto p-2"
                  onClick={() =>
                    changePage({ selected: 0 }).then(getEstoqueMan())
                  }
                >
                  Buscar
                  <ImSearch className="my-auto mx-auto laptop:ml-3 desktop:ml-3 tablet:ml-1 tablet:text-lg" />
                </button>
              </div>
              {nivel > 1 && (
                <div className="flex relative laptop:mx-5 desktop:mx-5 tablet:mx-2  desktop:-mt-6">
                  <button
                    onClick={() =>
                      navigate("./ItemEstoque", { state: { tipo: 1, val: "" } })
                    }
                    className="bg-dana px-4 tablet:px-2 py-2  font-bold duration-200 hover:scale-105 text-2xl tablet:text-xl my-auto  rounded-lg"
                  >
                    Novo+
                  </button>
                </div>
              )}
              <div className="flex relative laptop:mx-5 desktop:mx-5 tablet:mx-2 desktop:-mt-6">
                <button
                  onClick={() =>
                    navigate("./Movimentacao", { state: { tipo: 1, val: "" } })
                  }
                  className="bg-dana laptop:px-4 desktop:px-4 tablet:px-2 py-2 flex font-bold duration-200 hover:scale-105 text-2xl tablet:text-xl my-auto rounded-lg"
                >
                  Movimentação
                  <FaExchangeAlt className="my-auto mx-auto ml-[0.35em] tablet:text-lg"></FaExchangeAlt>
                </button>
              </div>
              <div className="flex relative laptop:mx-5 desktop:mx-5 tablet:mx-2  desktop:-mt-6">
                <button
                  className="flex bg-[#107C41] rounded-md duration-200 hover:scale-105 text-2xl tablet:text-xl my-auto font-bold p-2"
                  onClick={() => {
                    getExcel();
                  }}
                >
                  Excel
                  <FaFileExcel className="my-auto mx-auto ml-[0.35em] text-lg" />
                </button>
              </div>
              <div className="flex relative laptop:mx-5 desktop:mx-5 tablet:mx-2  desktop:-mt-6">
                <button
                  onClick={() =>
                    navigate("./Kanban", { state: { tipo: 1, val: "" } })
                  }
                  className="bg-dana laptop:px-4 desktop:px-4 py-2 tablet:px-2  font-bold duration-200 flex hover:scale-105 text-2xl tablet:text-xl my-auto rounded-lg"
                >
                  Kanban
                  <MdViewKanban className="my-auto mx-auto ml-[0.35em] text-2xl tablet:text-xl" />
                </button>
              </div>
            </div>
            <div className="flex mt-6 text-[#ffffffc2] tablet:text-sm">
              <div className="flex mx-3 tablet:mx-2">
                <div className="w-5 h-5 bg-[#c23636] border-2 border-[#ffffffc2] mr-2"></div>
                <h1>Item com estoque 0</h1>
              </div>
              <div className="flex mx-3 tablet:mx-2">
                <div className="w-5 h-5  bg-[#ff951c] border-2 border-[#ffffffc2] mr-2"></div>
                <h1>Item com estoque abaixo ou igual ao mínimo </h1>
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

            <Table headers={colunas} tableContent={renderTableData()}></Table>

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
