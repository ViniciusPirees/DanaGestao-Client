import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "../../components/NavBar/NavBar";
import Titulo from "../../components/NavBar/Titulo";
import { useLocation, useNavigate } from "react-router-dom";
import { ImCross, ImSearch } from "react-icons/im";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Notificacao from "../../components/Notificacao";
import { BsBoxArrowInDown, BsBoxArrowInUp, BsBoxArrowUp } from "react-icons/bs";
import getLogin from "../../components/Login/getLogin";
import { styleAll } from "../../../css";
import LoadingGet from "../../components/Loading/LoadingGet";

export default function HistoricoSolic() {
  const navigate = useNavigate();

  const [logado, setLogado] = useState(null);
  useEffect(() => {
    getLogin().then((val) => {
      setLogado(val);
      if (!val) {
        navigate("/");
      }
    });
  }, []);

  const item = useLocation().state.solic;

  const [input, setInput] = useState("");
  const [value, setValue] = useState("HisData");
  var DataHoje = new Date();
  const defaultValueFin = DataHoje.toLocaleDateString("en-CA");
  DataHoje.setMonth(DataHoje.getMonth() - 1);
  const defaultValueIni = DataHoje.toLocaleDateString("en-CA");
  const [dataIni, setDataIni] = useState(defaultValueIni);
  const [dataFin, setDataFin] = useState(defaultValueFin);
  const [total, setTotal] = useState("");
  const [pageN, setPageN] = useState(0);
  const [selecQtdPag, setSelecQtdPag] = useState(10);
  const [historico, setHistorico] = useState([]);
  const [load, setLoad] = useState(false);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    changePage({ selected: 0 }).then(getHistorico());
  }, [selecQtdPag]);

  useEffect(() => {
    getHistorico();
  }, [pageN]);

  //GET ESTOQUEMAN POR DESCRICAO
  const getHistorico = async () => {
    setLoad(true);
    getHistoricoCount({
      dataIni,
      dataFin,
      tabela: "HistoricoSolic",
      tabdata: "HisData",
      col: "HisMatSolicitacao",
      hisCod: item.MatSolicitacao,
    });

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getHistorico`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            dataIni: dataIni,
            dataFin: dataFin,
            tabela: "HistoricoSolic",
            tabdata: "HisData",
            col: "HisMatSolicitacao",
            hisCod: item.MatSolicitacao,
          },
        }
      );
      setHistorico(res?.data);
      setLoad(false);
      if (res?.data == 0) {
        Notificacao([
          "atencao",
          "Histórico não encontrado para essa solicitação.",
        ]);
      }
    } catch (err) {
      setLoad(false);
      Notificacao(["erro", "Erro ao buscar o histórico " + err]);
      console.log(err);
    }
  };

  //--COUNT
  const getHistoricoCount = async (props) => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getHistoricoCount`,
        { params: props }
      );

      setTotal(res?.data[0][""]);
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar histórico " + err]);
    }
  };

  const changePage = async ({ selected }) => {
    setPageN(selected);
  };

  const renderTableData = () => {
    return historico?.map((his, index) => (
      <tr className="text-2xl border-b-4  border-[#4f4f4f]" key={index}>
        <td className="text-center border-x-4 border-[#4f4f4f] break-words flex-wrap max-w-xs p-4">
          {`${his.HisData.substring(8, 10)}/${his.HisData.substring(
            5,
            7
          )}/${his.HisData.substring(2, 4)} - ${his.HisData.substring(11, 19)}`}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {his?.HisUsuAlt}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {his?.HisMsg}
        </td>
      </tr>
    ));
  };

  const pagesTotal = Math.ceil(total / selecQtdPag);
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
        {load && <LoadingGet></LoadingGet>}
        <Titulo titulo="Consultar Matériais - Histórico" />
        <div className="">
          <div className="my-9 flex">
            <h1 className="my-auto mx-4 desktop:text-[1.7em] laptop:text-2xl tablet:text-2xl font-bold">
              Data:
            </h1>
            <div className="flex h-full laptop:w-[60%] tablet:w-[60%] ml-1">
              <input
                value={dataIni}
                onChange={(e) => {
                  setDataIni(e.target.value);
                }}
                className={
                  styleAll.inputSemW + " focus:-outline-offset-0 laptop:text-xl tablet:text-xl"
                }
                type="date"
              ></input>
              <h1 className="my-auto mx-2 text-xl font-bold">até</h1>
              <input
                value={dataFin}
                onChange={(e) => {
                  setDataFin(e.target.value);
                }}
                className={
                  styleAll.inputSemW + " focus:-outline-offset-0 laptop:text-xl tablet:text-xl"
                }
                type="date"
              ></input>
            </div>
            <div className="flex">
              <button
                className="duration-200 hover:scale-105"
                onClick={getHistorico}
              >
                <ImSearch className="ml-5 laptop:ml-2 tablet:ml-2 bg-dana text-[3.3em] laptop:text-[2.75em] tablet:text-[2.75em] p-2 rounded-md" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-14 desktop:flex float-right relative">
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
    </div>
  );
}
