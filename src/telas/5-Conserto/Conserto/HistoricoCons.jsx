import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "../../components/NavBar";
import Titulo from "../../components/Titulo";
import { useLocation, useNavigate } from "react-router-dom";
import { ImCross, ImSearch } from "react-icons/im";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Notificacao from "../../components/Notificacao";
import { BsBoxArrowInDown, BsBoxArrowInUp, BsBoxArrowUp } from "react-icons/bs";
import getLogin from "../../components/getLogin";
import { styleAll } from "../../../css";
import LoadingGet from "../../components/LoadingGet";
export default function HistoricoCons({ setHisAtivo }) {
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

  const item = useLocation().state.conserto;
  console.log(item);
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
const [load2, setLoad2] = useState(false);
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
    setLoad2(true);
    getHistoricoCount({
      dataIni,
      dataFin,
      tabela: "HistoricoConserto",
      tabdata: "HisData",
      col: "HisConCod",
      hisCod: item.ConCod,
    });

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getHistorico`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            dataIni: dataIni,
            dataFin: dataFin,
            tabela: "HistoricoConserto",
            tabdata: "HisData",
            col: "HisConCod",
            hisCod: item.ConCod,
          },
        }
      );
      setHistorico(res?.data);
      setLoad2(false);
      if (res?.data == 0) {
        Notificacao([
          "atencao",
          "Nenhum Histórico foi encontrado para o conserto.",
        ]);
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar as Solicitações " + err]);
      console.log(err);
      setLoad2(false);
    }
  };

  //--COUNT
  const getHistoricoCount = async (props) => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getHistoricoCount`,
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
      <NavBar ativo="5"></NavBar>
      <div className="w-full pl-[8.5em] pr-10">
        <Titulo titulo="Conserto - Histórico" />
        {load2 && <LoadingGet></LoadingGet>}

        <div className="">
          <div className="my-9 flex">
            <h1 className="my-auto mx-4 text-[1.7em] font-bold">Data:</h1>
            <div className="flex h-full ml-1">
              <input
                value={dataIni}
                onChange={(e) => {
                  setDataIni(e.target.value);
                }}
                className={styleAll.inputSemW + " focus:-outline-offset-0"}
                type="date"
              ></input>
              <h1 className="my-auto mx-2 text-xl font-bold">até</h1>
              <input
                value={dataFin}
                onChange={(e) => {
                  setDataFin(e.target.value);
                }}
                className={styleAll.inputSemW + " focus:-outline-offset-0"}
                type="date"
              ></input>
            </div>
            <div className="flex">
              <button
                className="duration-200 hover:scale-105"
                onClick={getHistorico}
              >
                <ImSearch className="ml-5 bg-dana text-[3.3em] p-2 rounded-md" />
              </button>
            </div>
            <div className="ml-5 mt-20 flex right-20 absolute">
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Próxima"}
                pageCount={pagesTotal}
                forcePage={pageN}
                onPageChange={changePage}
                containerClassName="bg-[#3B3B3B] flex rounded-lg text-2xl text-white font-bold"
                previousClassName="py-3 duration-200 rounded-s-lg  hover:bg-dana"
                previousLinkClassName="py-3 px-5"
                nextClassName="py-3 duration-200 rounded-e-lg  hover:bg-dana"
                nextLinkClassName="py-3 px-5"
                activeClassName="bg-dana"
                pageClassName="py-3 duration-200 hover:bg-dana"
                pageLinkClassName="px-4 py-3"
                pageRangeDisplayed={3}
                breakClassName="py-2 duration-200 hover:bg-dana"
                breakLinkClassName="py-2 px-5"
              />
              <div>
                <select
                  value={selecQtdPag}
                  onChange={(e) => setSelecQtdPag(e.target.value)}
                  className={
                    "p-3 ml-5 rounded-md text-2xl font-bold border-0 " +
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
          <div className="overflow-x-auto w-full mt-28 mb-6 rounded-xl ">
            <table className="table rounded-lg mx-auto overflow-x-auto w-max">
              <thead className="">
                <tr className="text-2xl  bg-dana font-extrabold">
                  <th className="w-[20em] p-3 rounded-ss-xl">Data</th>
                  <th className="w-[20em] p-3 ">Usuário</th>
                  <th className="w-[30em] p-3 rounded-se-xl">Mensagem</th>
                </tr>
              </thead>
              <tbody className="[&>*:nth-child(odd)]:bg-fundo [&>*:nth-child(even)]:bg-[#292929]">
                {renderTableData()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
