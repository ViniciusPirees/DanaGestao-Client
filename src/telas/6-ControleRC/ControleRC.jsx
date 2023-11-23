import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import NavBar from "../components/NavBar";
import { styleAll } from "../../css";
import Titulo from "../components/Titulo";
import axios from "axios";
import FiltrosRC from "./FiltrosRC";
import ReactLoading from "react-loading";
import { SlArrowRight } from "react-icons/sl";
import ItemTr from "./ItemTr";
import ImgPopUp from "../components/ImgPopUp";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import Notificacao from "../components/Notificacao";
import { ImSearch } from "react-icons/im";
import getLogin from "../components/getLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { HiRefresh } from "react-icons/hi";
import Loading from "../components/Loading";
import LoadingGet from "../components/LoadingGet";
import { FaFileExcel } from "react-icons/fa6";
import Excel from "./Excel/Excel";
export default function ControleRC() {
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
  const [load2, setLoad2] = useState(false);

  //GET rCS
  const [rcs, setrcs] = useState([]);

  const [ativoImg, setAtivoImg] = useState(false);
  var DataHoje = new Date();
  const defaultValueFin = DataHoje.toLocaleDateString("en-CA");
  DataHoje.setMonth(DataHoje.getMonth() - 1);
  const defaultValueIni = DataHoje.toLocaleDateString("en-CA");
  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);
  const [selecQtdPag, setSelecQtdPag] = useState(10);
  const [order, setOrder] = useState("CREATION_DATE");
  const [orderVal, setorderVal] = useState("desc");
  const [filtroAll, setFiltroAll] = useState([
    [
      "(REQUISITION+'/'+CONVERT(varchar,RE_LINE_NUM))",
      state?.numRC == undefined ? "" : state?.numRC.toString(),
    ],
  ]);
  const [dataIni, setDataIni] = useState(
    state?.numRC == undefined
      ? defaultValueIni
      : new Date(DataHoje.setFullYear(2020, 0, 1)).toLocaleDateString("en-CA")
  );
  const [dataFin, setDataFin] = useState(defaultValueFin);

  const [img, setImg] = useState("");

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    changePage({ selected: 0 }).then(getRCS());
  }, [selecQtdPag]);

  const [ultimaData, setUltimaData] = useState(new Date());
  const firstUpdate2 = useRef(true);
  useEffect(() => {
    if (firstUpdate2.current) {
      firstUpdate2.current = false;
      return;
    }
    getRCS();
  }, [pageN]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        getRCS();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [pageN, selecQtdPag, filtroAll, dataIni, dataFin, order, orderVal]);

  useEffect(() => {
    getCooldown().then((res) => {
      var agr = new Date();
      var ultimo5 = new Date(res.getTime() + 80000 + 180 * 60000);
      if (ultimo5 <= agr) {
        getRCS();
      } else {
        setLoad(true);
      }
    });
  }, []);

  const getCooldown = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getCooldownRC`
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
        getRCS();
        Notificacao(["sucesso", "Atualizado com sucesso!"]);
        return;
      }

      const timeoutFunction = setInterval(() => {
        setTimer(seconds);
      }, 1000);

      return () => clearInterval(timeoutFunction);
    }
  }, [timer, load]);

  //GET ESTOQUEMAN POR DESCRICAO
  const getRCS = async () => {
    setLoad2(true);
    getControleRCCount({
      filtroAll,
      dataIni,
      dataFin,
      tabela: "Consulta",
      tabdata: "CREATION_DATE",
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
            tabela: "Consulta",
            tabdata: "CREATION_DATE",
            order: order,
            orderVal: orderVal,
          },
        }
      );
      setLoad2(false);
      setrcs(res?.data);
      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhuma RC foi encontrada."]);
      }
    } catch (err) {
      setLoad2(false);
      Notificacao(["erro", "Erro ao buscar as rcs " + err]);
      console.log(err);
    }
  };

  //--COUNT
  const getControleRCCount = async (props) => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getFiltroCount`,
        { params: props }
      );
      setTotal(res?.data[0][""]);
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar as rcs " + err]);
    }
  };

  const pagesTotal = Math.ceil(total / selecQtdPag);
  const dadosMat = () => {
    return rcs?.map((rc, index) => <ItemTr rc={rc} key={index} />);
  };

  const changePage = async ({ selected }) => {
    setPageN(selected);
  };

  const atualizaDados = async () => {
    var agr = new Date();
    var ultimo5 = new Date(ultimaData.getTime() + 5 * 60000 + 180 * 60000);

    if (ultimo5 <= agr) {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}:4400/getControleRC`
        );

        Notificacao(res.data);
        getCooldown().then((res) => {
          var agr = new Date();
          var ultimo5 = new Date(res.getTime() + 80000 + 180 * 60000);
          if (ultimo5 <= agr) {
            getRCS();
          } else {
            setLoad(true);
          }
        });
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar as Solicitações " + err]);
      }
    } else {
      Notificacao([
        "atencao",
        `Por favor, aguardar 5 minutos desde da última atualização. Última atualização foi as ${new Date(
          ultimaData.getTime() + 180 * 60000
        ).toLocaleString()}`,
      ]);
    }
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
            dataIni: dataIni,
            dataFin: dataFin,
            tabela: "Consulta",
            tabdata: "CREATION_DATE",
            order: order,
            orderVal: orderVal,
          },
        }
      );
      console.log(res);
      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhuma RC foi encontrada."]);
      } else {
        Excel({ rcs: res.data });
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar RCs" + err]);
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
      <NavBar ativo="6"></NavBar>
      <div className="w-full pl-[8.5em] pr-10 ">
        {ativoImg && <ImgPopUp img={img} setAtivoImg={setAtivoImg}></ImgPopUp>}
        {load && <Loading></Loading>}
        {load2 && <LoadingGet></LoadingGet>}
        <Titulo titulo="Controle RC" />
        <div className="">
          <div className="my-9 flex">
            <div>
              <FiltrosRC
                setFiltroAll={setFiltroAll}
                filtroAll={filtroAll}
              ></FiltrosRC>
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
                <option value="CREATION_DATE">Data de Criação</option>
                <option value="REQUISITION">Requisição Cód.</option>
                <option value="PREPARER">Preparador</option>
                <option value="ORG">Organização</option>
                <option value="RE_LINE_NUM">Requisição Linha</option>
                <option value="REQ_APPROVER">Aprovador</option>
                <option value="VENDOR_NAME">Fornecedor</option>
                <option value="ITEM">Item</option>
                <option value="ITEM_DESCRIPTION">Descrição</option>
                <option value="PENDING_QUANTITY_RC">Qtd. Pendente</option>
                <option value="UNIT_RC">Valor Unid. RC</option>
                <option value="PENDING_TOTAL_RC">Valor Pendente RC</option>
                <option value="RECEIVED_TOTAL_RC">Valor Recebido RC</option>
                <option value="UNIT_OC">Valor Unid. OC</option>
                <option value="PENDING_TOTAL_OC">Valor Pendente OC</option>
                <option value="LOCAL">Local</option>
                <option value="CHARGE_ACCOUNT">Conta Cobrança</option>
                <option value="PREPARER">Requisitante</option>
                <option value="JUSTIFICATION">Justificação</option>
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
          <div className="flex">
            <div className="flex relative h-full ml-5 -mt-6">
              <button
                className="flex duration-200 hover:scale-105 bg-dana rounded-md text-2xl font-bold p-2"
                onClick={() => {
                  changePage({ selected: 0 }).then(getRCS());
                }}
              >
                Buscar
                <ImSearch className="my-auto mx-auto ml-3" />
              </button>
            </div>

            <div className="flex relative h-full  ml-5 -mt-6">
              <button
                className="flex bg-dana rounded-md text-2xl h-full font-bold p-2 duration-200 hover:scale-105 "
                onClick={() => {
                  atualizaDados();
                }}
              >
                Atualizar Dados
                <HiRefresh className=" ml-1 text-3xl" />
              </button>
              <div>
                <h1 className="text-xl my-auto ml-5 ">
                  {`Última atualização: `}
                </h1>
                <h1 className="text-xl my-auto ml-5 ">
                  {`${new Date(
                    ultimaData.getTime() + 180 * 60000
                  ).toLocaleString()}`}
                </h1>
              </div>
            </div>
            <div className="flex relative h-full ml-5 -mt-6">
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
          <div className="overflow-x-auto w-full mt-14 mb-10 rounded-xl ">
            <table className="table rounded-lg mx-auto overflow-x-auto w-max">
              <thead className="">
                <tr className="text-xl bg-dana font-extrabold">
                  <th className="w-[5em] rounded-ss-xl">Org.</th>
                  <th className="p-3 w-[11em]">Data de Criação</th>
                  <th className="p-3 w-[10em]">Preparador</th>
                  <th className="p-3  w-[12em]">Status</th>
                  <th className="p-3 w-[5.5em]">Requisição</th>
                  <th className="p-3  w-[10em]">Aprovador</th>
                  <th className="p-3  w-[25em]">Fornecedor</th>
                  <th className="p-3  w-[11em]">Item</th>
                  <th className="p-3  w-[25em]">Descrição</th>
                  <th className="p-3  w-[5em]">Qtd. Pendente</th>
                  <th className="p-3  w-[9em]">Valor Unid. RC</th>
                  <th className="p-3  w-[9em]">Valor Total RC</th>
                  <th className="p-3  w-[9em]">Valor Pendente RC</th>
                  <th className="p-3  w-[9em]">Valor Recebido RC</th>
                  <th className="p-3  w-[9em]">Valor Unid. OC</th>
                  <th className="p-3  w-[9em]">Valor Pendente OC</th>
                  <th className="p-3  w-[9em]">Valor Pendente</th>
                  <th className="p-3  w-[8em]">Local</th>
                  <th className="p-3  w-[35em]">Conta Cobrança</th>
                  <th className="p-3  w-[10em]">Requisitante</th>
                  <th className="p-3  w-[30em] ">Justificação</th>
                  <th className="p-3  w-[8em]">Status REQ</th>
                  <th className="p-3  w-[5em]">Code</th>
                  <th className="p-3  w-[5em]">OBC</th>
                  <th className="p-3  w-[9em] rounded-se-xl">PO_NUM</th>
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
