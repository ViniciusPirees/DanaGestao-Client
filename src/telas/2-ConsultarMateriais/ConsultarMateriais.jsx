import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import { styleAll } from "../../css";
import Titulo from "../components/NavBar/Titulo";
import axios from "axios";
import Filtros from "./Filtros";

import { SlArrowRight } from "react-icons/sl";
import ItemTr from "./ItemTr";
import ImgPopUp from "../components/Camera/ImgPopUp";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import Notificacao from "../components/Notificacao";
import { ImSearch } from "react-icons/im";
import getLogin from "../components/Login/getLogin";
import { useLocation, useNavigate } from "react-router-dom";
import TelaItem from "./Items/TelaItem";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import NumRC from "./AltNumRC/NumRC";
import { FaFileExcel } from "react-icons/fa6";
import Excel from "./Excel/Excel";
import LoadingGet from "../components/Loading/LoadingGet";
import ExcluirSolic from "./Excluir/ExcluirSolic";
import { FaChartBar } from "react-icons/fa";
import Colunas from "../components/Table/Colunas";
import Table from "../components/Table/Tables";
import { RiGridFill } from "react-icons/ri";

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
  const [ativoExc, setAtivoExc] = useState(false);

  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);

  const localstorage = localStorage;
  const filtrosSalvos =
    localstorage?.filtrosConsultaM == undefined
      ? [["SolicMaterial.MatSolicitacao", ""]]
      : JSON.parse(localstorage?.filtrosConsultaM);

  const [filtroAll, setFiltroAll] = useState(
    state?.matCod == undefined
      ? filtrosSalvos
      : [["SolicMaterial.MatSolicitacao", state.matCod.toString()]]
  );
  const orderSalvos =
    localstorage?.orderConsultaM == undefined
      ? "MatData"
      : localstorage?.orderConsultaM;

  const orderValSalvos =
    localstorage?.orderValConsultaM == undefined
      ? "desc"
      : localstorage?.orderValConsultaM;

  const qtdPagSalvoSolic =
    localstorage?.qtdPagSalvoSolic == undefined
      ? "10"
      : localstorage?.qtdPagSalvoSolic;

  const [selecQtdPag, setSelecQtdPag] = useState(qtdPagSalvoSolic);
  const [order, setOrder] = useState(orderSalvos);
  const [orderVal, setorderVal] = useState(orderValSalvos);
  const [img, setImg] = useState([]);

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
      if (event.key === "Escape") {
        event.preventDefault();
        setColAtivo(false);
      }
      if (event.key === "Enter") {
        event.preventDefault();
        changePage({ selected: 0 }).then(getMateriais());
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [pageN, selecQtdPag, filtroAll, order, orderVal]);

  //GET ESTOQUEMAN POR DESCRICAO
  const getMateriais = async () => {
    setLoad(true);
    localStorage.setItem("filtrosConsultaM", JSON.stringify(filtroAll));
    localStorage.setItem("orderConsultaM", order);
    localStorage.setItem("qtdPagSalvoSolic", selecQtdPag);
    getMateriaisCount({
      filtroAll,
      tabdata: "MatData",
      tabela: "SolicMaterial",
    });
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getFiltros`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            filtroAll: filtroAll,
            tabela: "SolicMaterial",
            order: order,
            orderVal: orderVal,
          },
        }
      );

      if (res?.data?.code) {
        setMateriais([]);
        Notificacao(["atencao", "Nenhuma Solicitação foi encontrada."]);
      } else {
        setMateriais(res?.data);
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhuma Solicitação foi encontrada."]);
        }
      }
      setLoad(false);
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
        ativarExc={ativarExc}
        colunas={colunas}
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

  const ativarExc = ({ lista }) => {
    setInfos(lista);
    setAtivoExc(true);
  };

  const getExcel = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getExcel`,
        {
          params: {
            filtroAll: filtroAll,
            tabela: "SolicMaterial",
            order: order,
            orderVal: orderVal,
            orderItem: "MatSolicitacaoItem",
          },
        }
      );

      if (res?.data?.code) {
        Notificacao(["atencao", "Nenhuma Solicitação foi encontrada."]);
      } else {
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhuma Solicitação foi encontrada."]);
        } else {
          Excel({ solic: res.data });
        }
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar as Solicitações " + err]);
      console.log(err);
    }
  };

  const colunasLocal =
    localstorage?.colunasMat == undefined
      ? ""
      : JSON.parse(localstorage?.colunasMat);

  const tableHeaders = [
    ["", 62, 62, true, ""],
    ["Solic", 110, 30, true, "MatSolicitacao"],
    ["Data", 170, 50, true, "MatData", 170],
    ["Nº RC", 110, 30, true, "MatRC"],
    ["Status", 250, 50, true, "Status", 170],
    ["Máquina", 350, 50, true, "MatMaquinaDesc", 300],
    ["OS", 110, 20, true, "MatOs", 80],
    ["Solicitante", 250, 20, true, "MatSolicitanteDesc", 200],
    ["Observação", 330, 20, true, "MatObservacao", 350],
  ];

  const [colunas, setColunas] = useState(
    colunasLocal == "" ? tableHeaders : colunasLocal
  );

  const [colAtivo, setColAtivo] = useState(false);

  const refCol = useRef();
  const refCol2 = useRef();

  useEffect(() => {
    localStorage.setItem("colunasMat", JSON.stringify(colunas));
  }, [colunas]);

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
      <NavBar ativo="2"></NavBar>
      <div className="w-full pl-[8.5em] pr-10 tablet:pl-[6.5em] laptop:pl-[6.5em]">
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
        {ativoExc && (
          <ExcluirSolic
            solic={infos}
            setAtivoExc={setAtivoExc}
            getMateriais={getMateriais}
          ></ExcluirSolic>
        )}
        {load && <LoadingGet></LoadingGet>}
        <Titulo titulo="Consultar Materiais" />
        <div className="">
          <div className="laptop:my-9 desktop:my-9 tablet:my-4 laptop:flex desktop:flex">
            <div>
              <Filtros
                setFiltroAll={setFiltroAll}
                filtroAll={filtroAll}
              ></Filtros>
            </div>

            <div className="flex h-full laptop:ml-4 desktop:ml-4 tablet:mb-10">
              <h1 className="my-auto mx-4 text-2xl tablet:text-xl font-bold">
                Ordem:
              </h1>
              <select
                id="large"
                onChange={(e) => setOrder(e.target.value)}
                value={order}
                className={
                  "block  px-3 py-3 text-xl tablet:text-lg text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                  styleAll.inputSemW
                }
              >
                <option value="MatData">Data</option>
                <option value="MatDescricao">Descrição</option>
                <option value="SolicMaterial.MatSolicitacao">
                  Cód. Solicitação
                </option>
                <option value="MatRC">Número RC</option>
                <option value="MatMaquina">Máquina</option>
                <option value="MatOs">OS</option>
                <option value="MatSolicitanteDesc">Solicitante</option>
                <option value="MatObservacao">Observação</option>
                <option value="SolicMaterialItem.MatItemDescricao">
                  Item - Descrição
                </option>
                <option value="SolicMaterialItem.MatItemQtd">
                  Item - Quantidade
                </option>
              </select>

              <button
                className="duration-200 hover:scale-105"
                onClick={() => setorderVal(orderVal == "desc" ? "asc" : "desc")}
              >
                {orderVal == "desc" ? (
                  <BiSortDown className="ml-5 tablet:ml-2 bg-dana text-[3.3em] p-2 tablet:text-[2.8em]  rounded-md"></BiSortDown>
                ) : (
                  <BiSortUp className="ml-5 tablet:ml-2 bg-dana text-[3.3em] p-2 tablet:text-[2.8em]  pt-2 rounded-md"></BiSortUp>
                )}
              </button>
            </div>
          </div>
          <div className=" w-full flex justify-between">
            <div className="flex">
              <div className="flex relative ml-5 laptop:-mt-10 desktop:-mt-10 tablet:-mt-7">
                <button
                  className="flex bg-dana rounded-md duration-200 hover:scale-105 text-2xl tablet:text-xl font-bold p-2"
                  onClick={() => {
                    changePage({ selected: 0 }).then(getMateriais());
                  }}
                >
                  Buscar
                  <ImSearch className="my-auto mx-auto ml-3" />
                </button>
              </div>
              <div className="flex relative ml-5 laptop:-mt-10 desktop:-mt-10 tablet:-mt-7">
                <button
                  className="flex bg-[#107C41] rounded-md duration-200 tablet:text-xl hover:scale-105 text-2xl font-bold p-2"
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
  );
}
