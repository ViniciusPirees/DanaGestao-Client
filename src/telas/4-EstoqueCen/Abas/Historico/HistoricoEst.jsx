import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "../../../components/NavBar";
import Titulo from "../../../components/Titulo";
import { useLocation, useNavigate } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Notificacao from "../../../components/Notificacao";
import { BsBoxArrowInDown, BsBoxArrowInUp, BsBoxArrowUp } from "react-icons/bs";
import getLogin from "../../../components/getLogin";
import { styleAll } from "../../../../css";

export default function HistoricoEst() {
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

  const item = useLocation().state;
  const [input, setInput] = useState("");
  const [value, setValue] = useState("HisData");
  const DataHoje = new Date();
  const defaultValue = DataHoje.toLocaleDateString("en-CA");
  const [dataIni, setDataIni] = useState(defaultValue);
  const [dataFin, setDataFin] = useState(defaultValue);
  const [total, setTotal] = useState("");
  const [pageN, setPageN] = useState(0);
  const [selecQtdPag, setSelecQtdPag] = useState(10);
  const [historico, setHistorico] = useState([]);
  useEffect(() => {
    getHistorico();
  }, []);

  //GET ESTOQUEMAN POR DESCRICAO
  const getHistorico = async () => {
    getHistoricoCount({
      dataIni,
      dataFin,
      tabela: "HistoricoEst",
      tabdata: "HisData",
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
            tabela: "HistoricoEst",
            tabdata: "HisData",
          },
        }
      );
      setHistorico(res?.data);
      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhuma Solicitação foi encontrada."]);
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar as Solicitações " + err]);
      console.log(err);
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

  const changePage = ({ selected }) => {
    setPageN(selected);
  };

  const renderTableData = () => {
    return historico?.map((his, index) => (
      <tr className="text-3xl border-b-4  border-[#4f4f4f]" key={index}>
        {his?.HisSaldoAnt - his?.HisSaldoAtu > 0 ? (
          <td>
            <BsBoxArrowUp className=" m-2 bg-[#ff2222] rounded-lg p-2 text-6xl" />
          </td>
        ) : (
          <td>
            <BsBoxArrowInDown className=" m-2 bg-[#2a7a2a] rounded-lg p-2 text-6xl" />
          </td>
        )}
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
          {his?.HisSaldoAnt}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {his?.HisSaldoAtu - his?.HisSaldoAnt}
        </td>
        <td className="text-center break-words flex-wrap max-w-xs p-4">
          {his?.HisSaldoAtu}
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
      <NavBar ativo="3"></NavBar>
      <div className="w-full ml-[8.5em] mr-10 h-full overflow-y-auto">
        <Titulo titulo="Estoque Manutenção - Histórico" />

        <div className="mx-5 mt-10">
          <h1 className="text-3xl mt-8 mb-8">
            Item:{" "}
            <strong>
              {item.EstManId} - {item.EstManDesc}
            </strong>
          </h1>
          <div className="flex">
            <h1 className="my-auto mx-4 text-[1.7em] font-bold">Data:</h1>
            <div className="flex h-full ml-1">
              <input
                value={dataIni}
                onChange={(e) => {
                  setDataIni(e.target.value);
                }}
                className={styleAll.inputSemOutline}
                type="date"
              ></input>
              <h1 className="my-auto mx-2 text-xl font-bold">até</h1>
              <input
                value={dataFin}
                onChange={(e) => {
                  setDataFin(e.target.value);
                }}
                className={styleAll.inputSemOutline}
                type="date"
              ></input>
            </div>
            <div className="flex">
              <button onClick={getHistorico}>
                <ImSearch className="ml-5 bg-dana duration-200 hover:scale-105 text-[3.3em] p-2 rounded-md" />
              </button>
            </div>
            <div className="ml-5 -mt-2 flex right-20 absolute">
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Próxima"}
                pageCount={pagesTotal}
                onPageChange={changePage}
                containerClassName="bg-[#3B3B3B] flex rounded-lg text-2xl text-white font-bold"
                previousClassName="py-3 duration-200 rounded-s-lg  hover:bg-dana"
                previousLinkClassName="py-3 px-5"
                nextClassName="py-3 duration-200 rounded-e-lg  hover:bg-dana"
                nextLinkClassName="py-3 px-5"
                activeClassName="bg-dana"
                pageClassName="py-3 duration-200 hover:bg-dana"
                pageLinkClassName="px-4 py-3"
                pageRangeDisplayed={5}
              />
              <div>
                <select
                  value={selecQtdPag}
                  onChange={(e) => setSelecQtdPag(e.target.value)}
                  className={" p-3 ml-5 border-0 " + styleAll.inputSemOutline}
                >
                  <option value={10}>10 por página</option>
                  <option value={20}>20 por página</option>
                  <option value={50}>50 por página</option>
                </select>
              </div>
            </div>
          </div>
          <table className="table mx-auto mt-10  w-max">
            <thead className="">
              <tr className="text-2xl bg-dana  font-extrabold">
                <th className="w-[] p-3 rounded-s-lg"></th>
                <th className="w-[15em] p-3">Data</th>
                <th className="w-[15em] p-3">Usuário</th>
                <th className="w-[13em]">Saldo Anterior</th>
                <th className="w-[5em]">Qtd. Movimentada</th>
                <th className="w-[14em] rounded-e-lg">Saldo Atual</th>
              </tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
