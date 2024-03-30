import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import NavBar from "../components/NavBar/NavBar";
import { styleAll } from "../../css";
import Titulo from "../components/NavBar/Titulo";
import axios from "axios";
import FiltrosRC from "./FiltrosRC";
import ReactLoading from "react-loading";
import { SlArrowRight } from "react-icons/sl";
import ItemTr from "./ItemTr";
import ImgPopUp from "../components/Camera/ImgPopUp";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import Notificacao from "../components/Notificacao";
import { ImSearch } from "react-icons/im";
import getLogin from "../components/Login/getLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { HiRefresh } from "react-icons/hi";
import Loading from "../components/Loading/Loading";
import LoadingGet from "../components/Loading/LoadingGet";
import { FaFileExcel } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import { MdOutlineEditCalendar } from "react-icons/md";
import Excel from "./Excel/Excel";
import Colunas from "../components/Table/Colunas";
import { RiGridFill } from "react-icons/ri";
import Table from "../components/Table/Tables";
import { AiOutlineControl } from "react-icons/ai";
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

  const localstorage = localStorage;
  const filtrosSalvos =
    localstorage?.filtrosControleRC == undefined
      ? [
          [
            "(Consulta.REQUISITION+'/'+CONVERT(varchar,Consulta.RE_LINE_NUM))",
            "",
          ],
        ]
      : JSON.parse(localstorage?.filtrosControleRC);

  const orderValSalvos =
    localstorage?.orderValControleRC == undefined
      ? "desc"
      : localstorage?.orderValControleRC;

  const orderSalvos =
    localstorage?.orderControleRC == undefined
      ? "CREATION_DATE"
      : localstorage?.orderControleRC;

  //GET rCS
  const [rcs, setrcs] = useState([]);

  const [ativoImg, setAtivoImg] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);
   const qtdPagSalvoRcs =
     localstorage?.qtdPagSalvoRcs == undefined
       ? "10"
       : localstorage?.qtdPagSalvoRcs;

   const [selecQtdPag, setSelecQtdPag] = useState(qtdPagSalvoRcs);
  const [order, setOrder] = useState(orderSalvos);
  const [orderVal, setorderVal] = useState(orderValSalvos);
  const [filtroAll, setFiltroAll] = useState(
    state?.numRC == undefined
      ? filtrosSalvos
      : [
          [
            "(Consulta.REQUISITION+'/'+CONVERT(varchar,Consulta.RE_LINE_NUM))",
            state?.numRC.toString(),
          ],
        ]
  );

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
        changePage({ selected: 0 }).then(getRCS());
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [pageN, selecQtdPag, filtroAll, order, orderVal]);

  useEffect(() => {
    getCooldown().then((res) => {
      var agr = new Date();
      var ultimo5 = new Date(res.getTime() + 120000 + 180 * 60000);
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
        `http://${import.meta.env.VITE_IP}/getCooldownRC`
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
  const [timer, setTimer] = useState(120);

  const [horario, setHorario] = useState(new Date());

  useEffect(() => {
    if (horario.getMinutes() == 0 && horario.getSeconds() == 3) {
      getCooldown().then((res) => {
        var agr = new Date();
        var ultimo5 = new Date(res.getTime() + 120000 + 180 * 60000);
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
      var ultimo5 = new Date(ultimaData.getTime() + 120000 + 180 * 60000);
      var seconds = (ultimo5.getTime() - agr.getTime()) / 1000;

      if (timer <= 0) {
        setLoad(false);
        setTimer(120);
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

  //GET ControleRC POR DESCRICAO
  const getRCS = async () => {
    setLoad2(true);
    localStorage.setItem("filtrosControleRC", JSON.stringify(filtroAll));
    localStorage.setItem("orderControleRC", order);
    localStorage.setItem("orderValControleRC", orderVal);
    localStorage.setItem("qtdPagSalvoRcs", selecQtdPag);
    getControleRCCount({
      filtroAll,
      tabela: "Consulta",
    });

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getFiltros`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            filtroAll: filtroAll,
            tabela: "Consulta",
            order: order,
            orderVal: orderVal,
          },
        }
      );

      if (res?.data?.code) {
        setrcs([]);
        Notificacao(["atencao", "Nenhuma RC foi encontrada."]);
      } else {
        setrcs(res?.data);
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhuma RC foi encontrada."]);
        }
      }

      setLoad2(false);
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
      Notificacao(["erro", "Erro ao buscar as rcs " + err]);
    }
  };

  const pagesTotal = Math.ceil(total / selecQtdPag);
  const dadosMat = () => {
    return rcs?.map((rc, index) => (
      <ItemTr rc={rc} key={index} colunas={colunas} />
    ));
  };

  const changePage = async ({ selected }) => {
    setPageN(selected);
  };

  const atualizaDados = async () => {
    var agr = new Date();
    var ultimo5 = new Date(ultimaData.getTime() + 3 * 60000 + 180 * 60000);

    if (ultimo5 <= agr) {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}/getControleRC`
        );

        Notificacao(res.data);
        getCooldown().then((res) => {
          var agr = new Date();
          var ultimo5 = new Date(res.getTime() + 120000 + 180 * 60000);
          if (ultimo5 <= agr) {
            getRCS();
          } else {
            setLoad(true);
          }
        });
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar RCs " + err]);
      }
    } else {
      Notificacao([
        "atencao",
        `Por favor, aguardar 3 minutos desde da última atualização. Última atualização foi as ${new Date(
          ultimaData.getTime() + 180 * 60000
        ).toLocaleString()}`,
      ]);
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
            tabela: "Consulta",
            order: order,
            orderVal: orderVal,
          },
        }
      );
      if (res?.data?.code) {
        Notificacao(["atencao", "Nenhuma RC foi encontrada."]);
      } else {
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhuma RC foi encontrada."]);
        } else {
          Excel({ rcs: res.data });
        }
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar RCs" + err]);
      console.log(err);
    }
  };

  const colunasLocal =
    localstorage?.colunasRC == undefined
      ? ""
      : JSON.parse(localstorage?.colunasRC);

  const tableHeaders = [
    ["ORG.", 80, 30, true, "ORG"],
    ["Data de Criação", 180, 50, true, "CREATION_DATE", 170],
    ["Preparador", 150, 30, true, "PREPARER", 130],
    ["Status", 260, 30, true, "Status", 180],
    ["Requisição", 110, 30, true, "REQUISITION"],
    ["Aprovador", 150, 50, true, "REQ_APPROVER", 130],
    ["Fornecedor", 350, 50, true, "VENDOR_NAME", 300],
    ["Nota Fiscal", 110, 50, true, "NR_NOTA_FISCAL"],
    ["Valor NF", 110, 50, true, "VALOR_LIQUIDO"],
    ["Data Recebimento", 180, 50, true, "DATA_RECEBIMENTO", 170],
    ["Item", 150, 50, true, "ITEM", 200],
    ["Descrição", 350, 50, true, "ITEM_DESCRIPTION", 350],
    ["Qtd. Pendente", 90, 50, true, "PENDING_QUANTITY_RC"],
    ["Valor Unid. RC", 110, 50, true, "UNIT_RC"],
    ["Valor Total RC", 110, 50, true, "LINE_TOTAL_RC"],
    ["Valor Pendente RC", 110, 50, true, "PENDING_TOTAL_RC"],
    ["Valor Recebido RC", 110, 50, true, "RECEIVED_TOTAL_RC"],
    ["Valor Unid. OC", 110, 50, true, "UNIT_OC"],
    ["Valor Pendente OC", 110, 50, true, "PENDING_TOTAL_OC"],
    ["Valor Pendente", 110, 50, true, "PENDENTE"],
    ["Local", 110, 50, true, "LOCAL", 100],
    ["Conta Cobrança", 250, 50, true, "CHARGE_ACCOUNT"],
    ["Requisitante", 150, 50, true, "PREPARER", 130],
    ["Justificação", 350, 50, true, "DESCRIPTION", 350],
    ["Status REQ", 150, 50, true, "REQ_STATUS", 110],
    ["Code", 150, 50, true, "CLOSED_CODE"],
    ["OBC", 150, 50, true, "OBC_SDCV"],
    ["PO_NUM", 150, 50, true, "PO_NUM"],
  ];

  const [colunas, setColunas] = useState(
    colunasLocal == "" ? tableHeaders : colunasLocal
  );

  useEffect(() => {
    localStorage.setItem("colunasRC", JSON.stringify(colunas));
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
      <NavBar ativo="6"></NavBar>
      <div className="w-full pl-[8.5em] pr-10 laptop:pl-[6.5em] tablet:pl-[6.5em] ">
        {ativoImg && <ImgPopUp img={img} setAtivoImg={setAtivoImg}></ImgPopUp>}
        {load && <Loading></Loading>}
        {load2 && <LoadingGet></LoadingGet>}
        <Titulo titulo="Controle RC (311250 - 311249)" />
        <div className="">
          <div className="my-9 tablet:my-5 laptop:flex desktop:flex">
            <div>
              <FiltrosRC
                setFiltroAll={setFiltroAll}
                filtroAll={filtroAll}
              ></FiltrosRC>
            </div>

            <div className="flex h-full laptop:ml-4 desktop:ml-4 mb-12">
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
                <option value="CREATION_DATE">Data de Criação</option>
                <option value="(Consulta.REQUISITION+'/'+CONVERT(varchar,Consulta.RE_LINE_NUM))">
                  Requisição Cód.
                </option>
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
                <option value="DESCRIPTION">Justificação</option>
              </select>

              <button
                onClick={() => setorderVal(orderVal == "desc" ? "asc" : "desc")}
              >
                {orderVal == "desc" ? (
                  <BiSortDown className="ml-5 tablet:ml-2 bg-dana text-[3.3em] p-2 tablet:text-[2.8em] duration-200 hover:scale-105 rounded-md"></BiSortDown>
                ) : (
                  <BiSortUp className="ml-5 tablet:ml-2 bg-dana text-[3.3em] p-2 tablet:text-[2.8em] pt-2 duration-200 hover:scale-105 rounded-md"></BiSortUp>
                )}
              </button>
              <div className="h-full laptop:hidden desktop:hidden">
                <h1 className="text-xl tablet:text-lg my-auto ml-5 ">
                  {`Última atualização: `}
                </h1>
                <h1 className="text-xl tablet:text-lg my-auto ml-5 ">
                  {`${new Date(
                    ultimaData.getTime() + 180 * 60000
                  ).toLocaleString()}`}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex tablet:-mt-2 laptop:-mt-4 desktop:-mt-4">
            <div className="flex relative mx-5 tablet:mx-2 h-fit -mt-6">
              <button
                className="flex bg-dana duration-200 tablet:text-xl hover:scale-105 rounded-md text-2xl font-bold p-2"
                onClick={() => {
                  changePage({ selected: 0 }).then(getRCS());
                }}
              >
                Buscar
                <ImSearch className="my-auto mx-auto ml-3 tablet:ml-2" />
              </button>
            </div>
            <div className="laptop:flex desktop:flex relative h-full laptop:mx-5 desktop:mx-5 tablet:mx-2 -mt-6">
              <button
                className="flex duration-200 h-full hover:scale-105 bg-dana rounded-md tablet:text-xl text-2xl font-bold p-2"
                onClick={() => {
                  atualizaDados();
                }}
              >
                Atualizar Dados
                <HiRefresh className="my-auto mx-auto ml-1 tablet:text-2xl text-3xl" />
              </button>
              <div className="h-full tablet:hidden">
                <h1 className="text-xl tablet:text-lg my-auto ml-5 ">
                  {`Última atualização: `}
                </h1>
                <h1 className="text-xl tablet:text-lg my-auto ml-5 ">
                  {`${new Date(
                    ultimaData.getTime() + 180 * 60000
                  ).toLocaleString()}`}
                </h1>
              </div>
            </div>
            <div className="flex relative h-full laptop:ml-5 desktop:ml-5 ml-2 -mt-6">
              <button
                className="flex bg-[#107C41] rounded-md tablet:text-xl duration-200 hover:scale-105 text-2xl font-bold p-2"
                onClick={() => {
                  getExcel();
                }}
              >
                Excel
                <FaFileExcel className="my-auto mx-auto ml-[0.35em]" />
              </button>
            </div>
            <div className="flex relative h-full laptop:ml-5 desktop:ml-5 ml-4 -mt-6">
              <button
                className="flex bg-dana rounded-md duration-200 tablet:text-xl hover:scale-105 text-2xl font-bold p-2"
                onClick={() => {
                  nav("./ControleStatus");
                }}
              >
                Controle Status
                <MdOutlineEditCalendar className="my-auto mx-auto ml-[0.35em]" />
              </button>
            </div>
            <div className="flex relative h-full laptop:ml-5 desktop:ml-5 ml-4 -mt-6">
              <button
                className="flex bg-dana rounded-md duration-200 tablet:text-xl hover:scale-105 text-2xl font-bold p-2"
                onClick={() => {
                  nav("./OutrasContas");
                }}
              >
                Outras Contas
                <AiOutlineControl className="my-auto mx-auto ml-[0.35em]" />
              </button>
            </div>
          </div>

          <div className="flex right-20 tablet:right-12 -mt-12 tablet:mt-5 absolute  ">
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

          <div className="tablet:mt-20">
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
