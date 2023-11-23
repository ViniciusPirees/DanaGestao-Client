import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { styleAll } from "../../css";
import Titulo from "../components/Titulo";
import axios from "axios";
import Filtros from "./Filtros";

import { SlArrowRight } from "react-icons/sl";
import ItemTr from "./ItemTr";
import ImgPopUp from "../components/ImgPopUp";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import Notificacao from "../components/Notificacao";
import { ImSearch } from "react-icons/im";
import getLogin from "../components/getLogin";
import { useLocation, useNavigate } from "react-router-dom";
import TelaItem from "./Items/TelaItem";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import NumRC from "./AltNumRC/NumRC";
import { FaFileExcel } from "react-icons/fa6";
import Excel from "./Excel/Excel";
import LoadingGet from "../components/LoadingGet";

export default function ConsultarMateriais() {
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
  //GET MATERIAIS
  const [materiais, setMateriais] = useState();
  const [load, setLoad] = useState(false);
  const [ativoImg, setAtivoImg] = useState(false);
  var DataHoje = new Date();
  const defaultValueFin = DataHoje.toLocaleDateString("en-CA");
  DataHoje.setMonth(DataHoje.getMonth() - 1);
  const defaultValueIni = DataHoje.toLocaleDateString("en-CA");

  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);
  const [selecQtdPag, setSelecQtdPag] = useState(10);

  const [filtroAll, setFiltroAll] = useState(
    state?.matCod == undefined
      ? [["MatSolicitacao", ""]]
      : [["MatSolicitacao", state.matCod.toString()]]
  );
  const [dataIni, setDataIni] = useState(
    state?.matCod == undefined
      ? defaultValueIni
      : new Date(DataHoje.setFullYear(2020, 0, 1)).toLocaleDateString("en-CA")
  );
  const [dataFin, setDataFin] = useState(defaultValueFin);
  const [order, setOrder] = useState("MatData");
  const [orderVal, setorderVal] = useState("desc");
  const [img, setImg] = useState("");

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    changePage({ selected: 0 }).then(getMateriais());
  }, [selecQtdPag]);

  useEffect(() => {
    getMateriais();
  }, [pageN]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        getMateriais();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [pageN, selecQtdPag, filtroAll, dataIni, dataFin, order, orderVal]);

  //GET ESTOQUEMAN POR DESCRICAO
  const getMateriais = async () => {
    setLoad(true);
    getMateriaisCount({
      filtroAll,
      dataIni,
      dataFin,
      tabela: "SolicMaterial",
      tabdata: "MatData",
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
            tabela: "SolicMaterial",
            tabdata: "MatData",
            order: order,
            orderVal: orderVal,
          },
        }
      );
      setMateriais(res?.data);
      setLoad(false);
      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhuma Solicitação foi encontrada."]);
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar as Solicitações " + err]);
      console.log(err);
      setLoad(false);
    }
  };

  //--COUNT
  const getMateriaisCount = async (props) => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getFiltroCount`,
        { params: props }
      );
      setTotal(res?.data[0][""]);
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar as Solicitações " + err]);
    }
  };

  const pagesTotal = Math.ceil(total / selecQtdPag);
  const dadosMat = () => {
    return materiais?.map((lista, index) => (
      <ItemTr
        lista={lista}
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
  const [itens, setItens] = useState([]);
  const [telaItem, setTelaItem] = useState(false);

  const [ativoNUMRC, setativoNUMRC] = useState(false);
  const [infos, setInfos] = useState([]);

  const ativarNumRC = ({ lista }) => {
    setInfos(lista);
    setativoNUMRC(true);
  };

  const getExcel = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getExcel`,
        {
          params: {
            filtroAll: filtroAll,
            dataIni: dataIni,
            dataFin: dataFin,
            tabela: "SolicMaterial",
            tabdata: "MatData",
            order: order,
            orderVal: orderVal,
            orderItem: "MatSolicitacaoItem",
          },
        }
      );

      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhuma Solicitação foi encontrada."]);
      } else {
        Excel({ solic: res.data });
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar as Solicitações " + err]);
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
      <NavBar ativo="2"></NavBar>
      <div className="w-full pl-[8.5em] pr-10">
        {ativoImg && <ImgPopUp img={img} setAtivoImg={setAtivoImg}></ImgPopUp>}
        {telaItem && (
          <TelaItem itens={itens} setTelaItem={setTelaItem}></TelaItem>
        )}
        {ativoNUMRC && (
          <NumRC
            infos={infos}
            setativoNUMRC={setativoNUMRC}
            getMateriais={getMateriais}
          ></NumRC>
        )}
        {load && <LoadingGet></LoadingGet>}
        <Titulo titulo="Consultar Materiais" />
        <div className="">
          <div className="my-9 flex">
            <div>
              <Filtros
                setFiltroAll={setFiltroAll}
                filtroAll={filtroAll}
              ></Filtros>
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
                <option value="MatData">Data</option>
                <option value="MatDescricao">Descrição</option>
                <option value="MatSolicitacao">Cód. Solicitação</option>
                <option value="MatRC">Número RC</option>
                <option value="MatMaquina">Máquina</option>
                <option value="MatOs">OS</option>
                <option value="MatSolicitanteDesc">Solicitante</option>
                <option value="MatObservacao">Observação</option>
                <option value="MatItemDescricao">Item - Descrição</option>
                <option value="MatItemQtd">Item - Quantidade</option>
              </select>

              <button
                className="duration-200 hover:scale-105"
                onClick={() => setorderVal(orderVal == "desc" ? "asc" : "desc")}
              >
                {orderVal == "desc" ? (
                  <BiSortDown className="ml-5 bg-dana text-[3.3em] p-2  rounded-md"></BiSortDown>
                ) : (
                  <BiSortUp className="ml-5 bg-dana text-[3.3em] p-2 pt-2 rounded-md"></BiSortUp>
                )}
              </button>
            </div>
          </div>
          <div className=" w-full flex justify-between">
            <div className="flex">
              <div className="flex relative ml-5 -mt-6">
                <button
                  className="flex bg-dana rounded-md duration-200 hover:scale-105 text-2xl font-bold p-2"
                  onClick={() => {
                    changePage({ selected: 0 }).then(getMateriais());
                  }}
                >
                  Buscar
                  <ImSearch className="my-auto mx-auto ml-3" />
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
          </div>
          <div className="overflow-x-auto w-full mt-8 mb-10 rounded-xl ">
            <table className="table rounded-lg mx-auto overflow-x-auto w-max">
              <thead className=" ">
                <tr className="text-xl bg-dana font-extrabold">
                  <th className="rounded-ss-xl"></th>
                  <th className="p-3 w-[7em] ">Solicitação</th>
                  <th className="w-[12em]">Data</th>
                  <th className="w-[6em]">Nº RC</th>
                  <th className="w-[13em]">Status</th>
                  <th className="w-[6em]">Máquina</th>
                  <th className="w-[25em]">Descrição</th>
                  <th className="w-[6em]">OS</th>
                  <th className="w-[18em]">Solicitante</th>
                  <th className="w-[18em] rounded-se-xl">Observação</th>
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
  );
}
