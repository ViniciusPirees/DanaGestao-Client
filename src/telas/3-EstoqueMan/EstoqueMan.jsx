import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { styleAll } from "../../css";
import Titulo from "../components/Titulo";
import FiltrosEstMan from "./FiltrosEstMan";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { BsFillCameraFill } from "react-icons/bs";
import ImgPopUp from "../components/ImgPopUp";
import Notificacao from "../components/Notificacao";
import { ToastContainer } from "react-toastify";
import { ImSearch } from "react-icons/im";
import ItemTrEstMan from "./ItemTrEstMan";
import AlterarSaldo from "./Abas/Altera/AlterarSaldo";
import getLogin from "../components/getLogin";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { FaFileExcel } from "react-icons/fa6";
import Excel from "./Abas/Excel/Excel";
import LoadingGet from "../components/LoadingGet";

export default function EstoqueMan() {
  const [filtro, setFiltro] = useState("De");

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

  const [load, setLoad] = useState(false);
  const [estoques, setEstoques] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);
  const [selecQtdPag, setSelecQtdPag] = useState(10);
  const [ativoImg, setAtivoImg] = useState(false);
  const [img, setImg] = useState("");
  const [input, setInput] = useState("");
  const [filtroAll, setFiltroAll] = useState([["EstManDesc", ""]]);
  const [infosEst, setInfosEst] = useState("");
  const [order, setOrder] = useState("EstManDesc");
  const [orderVal, setorderVal] = useState("asc");
  const [ativoIna, setAtivoIna] = useState("A");
  const firstUpdate = useRef(true);
  const [estMinimo, setEstMinimo] = useState(false);

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
        getEstoqueMan();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [pageN, selecQtdPag, filtroAll, order, orderVal, ativoIna]);
  //GET ESTOQUEMAN POR DESCRICAO
  const getEstoqueMan = async () => {
    setLoad(true);
    getEstoqueCount({
      filtroAll,
      dataIni: "",
      dataFin: "",
      tabela: "EstoqueManutencao",
      tabdata: "",
      ativo: ativoIna,
      estMinimo: estMinimo,
    });

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getFiltros`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            filtroAll: filtroAll,
            dataIni: "",
            dataFin: "",
            tabela: "EstoqueManutencao",
            tabdata: "EstManId",
            order: order,
            orderVal: orderVal,
            ativo: ativoIna,
            estMinimo: estMinimo,
          },
        }
      );

      setEstoques(res?.data);
      setLoad(false);
      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhum item foi encontrado."]);
      }
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
        `http://${import.meta.env.VITE_IP}:4400/getFiltroCount`,
        { params: props }
      );
      setTotal(res?.data[0][""]);
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar itens estoque" + err]);
    }
  };

  const pagesTotal = Math.ceil(total / selecQtdPag);
  const renderTableData = () => {
    return estoques?.map((estoque, index) => (
      <ItemTrEstMan
        estoque={estoque}
        key={index}
        setAtivoImg={setAtivoImg}
        setImg={setImg}
        setInfosEst={setInfosEst}
      />
    ));
  };

  const changePage = async ({ selected }) => {
    setPageN(selected);
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
            dataIni: "",
            dataFin: "",
            tabela: "EstoqueManutencao",
            tabdata: "EstManId",
            order: order,
            orderVal: orderVal,
            ativo: ativoIna,
            estMinimo: estMinimo,
          },
        }
      );
      console.log(res);
      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhum item foi encontrado."]);
      } else {
        Excel({ estman: res.data });
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
      <div className="w-full pl-[8.5em] pr-10 ">
        <Titulo titulo="Estoque Manutenção" />
        {ativoImg && <ImgPopUp img={img} setAtivoImg={setAtivoImg}></ImgPopUp>}
        {infosEst != "" && (
          <AlterarSaldo
            setInfosEst={setInfosEst}
            infosEst={infosEst}
          ></AlterarSaldo>
        )}
        {load && <LoadingGet></LoadingGet>}

        <div>
          <div>
            <div className="my-9 flex">
              <div>
                <FiltrosEstMan
                  setFiltroAll={setFiltroAll}
                  filtroAll={filtroAll}
                ></FiltrosEstMan>
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
                  <option value="EstManDesc">Descrição</option>
                  <option value="EstManId">Cód. Estoque</option>
                  <option value="EstManAreaDesc">Área</option>
                  <option value="EstManSta">Status</option>
                  <option value="EstManTipMatDesc">Tipo Material</option>
                  <option value="EstManLoc">Local</option>
                  <option value="EstManEstMin">Est. Mínimo</option>
                  <option value="EstManEstMax">Est. Máximo</option>
                  <option value="EstManSaldo">Saldo</option>
                </select>

                <button
                  className="duration-200 hover:scale-105"
                  onClick={() =>
                    setorderVal(orderVal == "desc" ? "asc" : "desc")
                  }
                >
                  {orderVal == "desc" ? (
                    <BiSortDown className="ml-5 bg-dana text-[3.3em] p-2  rounded-md"></BiSortDown>
                  ) : (
                    <BiSortUp className="ml-5 bg-dana text-[3.3em] p-2 pt-2 rounded-md"></BiSortUp>
                  )}
                </button>
              </div>
              <div className="flex h-full ml-4">
                <h1 className="my-auto mx-4 text-2xl font-bold">Status:</h1>
                <select
                  id="large"
                  onChange={(e) => setAtivoIna(e.target.value)}
                  className={
                    "block w-fit px-3 py-3 text-xl  text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                    styleAll.inputSemW
                  }
                >
                  <option value="A">Ativo</option>
                  <option value="I">Inativo</option>
                  <option value="">Todos</option>
                </select>
              </div>
              <div className="flex h-full mt-[.65em] ml-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  onChange={(e) => {
                    setEstMinimo(e.target.checked);
                  }}
                  className="w-8"
                  checked={estMinimo}
                />
                <label className="ms-2 text-xl font-medium text-gray-900 dark:text-gray-300">
                  Itens com estoque mínimo excedido
                </label>
              </div>
            </div>
            <div className="flex">
              <div className="flex relative mx-5 -mt-6">
                <button
                  className="flex bg-dana rounded-md duration-200 hover:scale-105  text-2xl font-bold p-2"
                  onClick={() =>
                    changePage({ selected: 0 }).then(getEstoqueMan())
                  }
                >
                  Buscar
                  <ImSearch className="my-auto mx-auto ml-3" />
                </button>
              </div>
              {nivel > 1 && (
                <div className="flex relative mx-5 -mt-6">
                  <button
                    onClick={() =>
                      navigate("./ItemEstoque", { state: { tipo: 1, val: "" } })
                    }
                    className="bg-dana px-4 py-2  font-bold duration-200 hover:scale-105 text-2xl rounded-lg"
                  >
                    Novo+
                  </button>
                </div>
              )}
              <div className="flex relative mx-5 -mt-6">
                <button
                  onClick={() =>
                    navigate("./Movimentacao", { state: { tipo: 1, val: "" } })
                  }
                  className="bg-dana px-4 py-2  font-bold duration-200 hover:scale-105 text-2xl rounded-lg"
                >
                  Movimentação
                </button>
              </div>
              <div className="flex relative ml-5 -mt-6">
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
            <div className="flex mt-6 text-[#ffffffc2]">
              <div className="flex mx-3">
                <div className="w-5 h-5 bg-[#c23636] border-2 border-[#ffffffc2] mr-2"></div>
                <h1>Item com estoque 0</h1>
              </div>
              <div className="flex mx-3">
                <div className="w-5 h-5  bg-[#ff951c] border-2 border-[#ffffffc2] mr-2"></div>
                <h1>Item com estoque abaixo ou igual ao mínimo </h1>
              </div>
            </div>
            <div className="overflow-x-auto w-full mt-5 mb-10 rounded-xl ">
              <table className="table rounded-lg mx-auto overflow-x-auto w-max">
                <thead className="">
                  <tr className="text-xl bg-dana font-extrabold">
                    <th className=" w-[1em] rounded-ss-xl"></th>
                    <th className="p-3 w-[6em]">Cod. Item</th>
                    <th className="w-[6em]">Status</th>
                    <th className="w-[25em]">Descrição</th>
                    <th className="w-[13em]">Área</th>
                    <th className="w-[13em]">Tipo Material</th>
                    <th className="w-[7em]">Local</th>
                    <th className="w-[7em]">Estoque Min.</th>
                    <th className="w-[7em]">Estoque Máx.</th>
                    <th className="w-[7em] rounded-se-xl">Saldo</th>
                  </tr>
                </thead>
                <tbody className="[&>*:nth-child(odd)]:bg-fundo [&>*:nth-child(even)]:bg-[#292929]">
                  {renderTableData()}
                </tbody>
              </table>
            </div>
            <div className="mb-14 flex float-right relative">
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
