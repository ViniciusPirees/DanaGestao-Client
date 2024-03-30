import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import NavBar from "../../../components/NavBar/NavBar";
import { styleAll } from "../../../../css";
import Titulo from "../../../components/NavBar/Titulo";
import axios from "axios";
import FiltrosStaCon from "./FiltrosStaCon";
import ReactLoading from "react-loading";
import { SlArrowRight } from "react-icons/sl";
import ItemTr from "./ItemTr";
import ImgPopUp from "../../../components/Camera/ImgPopUp";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import Notificacao from "../../../components/Notificacao";
import { ImSearch } from "react-icons/im";
import getLogin from "../../../components/Login/getLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { HiRefresh } from "react-icons/hi";
import Loading from "../../../components/Loading/Loading";
import LoadingGet from "../../../components/Loading/LoadingGet";
import { FaChartPie, FaFileExcel } from "react-icons/fa6";
import { RiGridFill } from "react-icons/ri";
import Colunas from "../../../components/Table/Colunas";
import Table from "../../../components/Table/Tables";
import Excel from "./Excel/Excel";

export default function StatusContas() {
  const nav = useNavigate();
  const [logado, setLogado] = useState(null);

  const state = useLocation().state;
  const [load2, setLoad2] = useState(false);

  const localstorage = localStorage;
  const filtrosSalvos =
    localstorage?.filtrosStatusContas == undefined
      ? [
          [
            "(Consulta.REQUISITION+'/'+CONVERT(varchar,Consulta.RE_LINE_NUM))",
            "",
          ],
        ]
      : JSON.parse(localstorage?.filtrosStatusContas);

  const orderValSalvos =
    localstorage?.orderValStatusContas == undefined
      ? "desc"
      : localstorage?.orderValStatusContas;

  const orderSalvos =
    localstorage?.orderStatusContas == undefined
      ? "CREATION_DATE"
      : localstorage?.orderStatusContas;

  //GET rCS
  const [rcs, setrcs] = useState([]);

  const [ativoImg, setAtivoImg] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);
  const qtdPagSalvoStaCon =
    localstorage?.qtdPagSalvoStaCon == undefined
      ? "10"
      : localstorage?.qtdPagSalvoStaCon;

  const [selecQtdPag, setSelecQtdPag] = useState(qtdPagSalvoStaCon);
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

  var mesAtual = 0;
  var anoAtual = new Date().getFullYear();
  if (new Date().getMonth() == 11) {
    anoAtual = anoAtual + 1;
  } else {
    mesAtual = new Date().getMonth();
  }
  const monthNames = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];

  const getStatus = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getResumoFil`,
        {
          params: {
            tabela: "StatusPrev",
            order: "StaPreDesc",
          },
        }
      );
      if (res?.data?.code) {
        setStatus([]);
        Notificacao(["atencao", "Nenhum resultado foi encontrado."]);
      } else {
        var statusSel = [];
        res?.data?.forEach((val) => {
          statusSel.push(val.StaPreDesc);
        });
        var comecou = true;
        for (var i = 0; i < 12; i++) {
          if (comecou) {
            if (mesAtual + i == 12) {
              comecou = false;
              mesAtual = 0;
              anoAtual = anoAtual + 1;
              statusSel.push(
                `${monthNames[mesAtual]}/${anoAtual
                  .toString()
                  .replace("20", "")}`
              );
            } else {
              statusSel.push(
                `${monthNames[mesAtual + i]}/${anoAtual
                  .toString()
                  .replace("20", "")}`
              );
            }
          } else {
            mesAtual++;
            statusSel.push(
              `${monthNames[mesAtual]}/${anoAtual.toString().replace("20", "")}`
            );
          }
        }
        setStatus(statusSel);
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhum resultado foi encontrado."]);
        }
      }

      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [status, setStatus] = useState([]);

  const [itemsTipo, setitemsTipo] = useState([]);

  const getTipos = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getResumoFil`,
        {
          params: {
            tabela: "TipoStatus",
            order: "TipStaDesc",
          },
        }
      );
      if (res?.data?.code) {
        setStatus([]);
        Notificacao(["atencao", "Nenhum resultado foi encontrado."]);
      } else {
        var statusSel = [];
        res?.data?.forEach((val, i) => {
          statusSel.push(val.TipStaDesc);
        });

        setitemsTipo(statusSel);
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhum resultado foi encontrado."]);
        }
      }

      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    getTipos();
    getStatus();
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
    setrcs([]);
    setLoad2(true);
    localStorage.setItem("filtrosStatusContas", JSON.stringify(filtroAll));
    localStorage.setItem("orderStatusContas", order);
    localStorage.setItem("orderValStatusContas", orderVal);
    localStorage.setItem("qtdPagSalvoStaCon", selecQtdPag);
    getControleRCCount({
      filtroAll,
      tabela: "ControleStatusContas",
      status: 1,
    });

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getFiltros`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            filtroAll: filtroAll,
            tabela: "ControleStatusContas",
            order: order,
            orderVal: orderVal,
            status: 1,
          },
        }
      );
      console.log(res);
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
        setTotalValue(0);
      } else {
        setTotal(res?.data[0][""][1]);
        setTotalValue(res?.data[0][""][0]);
      }
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar as rcs " + err]);
    }
  };

  const pagesTotal = Math.ceil(total / selecQtdPag);
  const dadosMat = () => {
    return rcs?.map((rc, index) => (
      <ItemTr
        rc={rc}
        key={index}
        getRCS={getRCS}
        setrcs={setrcs}
        colunas={colunas}
        statusPrev={status}
        itemsTipo={itemsTipo}
      />
    ));
  };

  const changePage = async ({ selected }) => {
    setrcs([]);
    setPageN(selected);
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        nav(-1);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const colunasLocal =
    localstorage?.colunasSta == undefined
      ? ""
      : JSON.parse(localstorage?.colunasSta);

  const tableHeaders = [
    ["", 62, 62, true, ""],
    ["Tipo", 190, 30, true, ""],
    ["Data Prevista.", 150, 30, true, ""],
    ["Status Prev", 190, 50, true, ""],
    ["Requisição", 110, 30, true, "REQUISITION"],
    ["ORG.", 80, 30, true, "ORG"],
    ["Preparador", 150, 30, true, "PREPARER", 130],
    ["Status", 260, 30, true, "Status", 230],
    ["Data de Criação", 180, 50, true, "CREATION_DATE", 170],
    ["Fornecedor", 350, 50, true, "VENDOR_NAME", 300],
    ["Descrição", 350, 50, true, "ITEM_DESCRIPTION", 300],
    ["Qtd.", 90, 50, true, "PENDING_QUANTITY_RC"],
    ["Valor Unid. RC", 110, 50, true, "UNIT_RC"],
    ["Valor Pendente", 110, 50, true, "PENDENTE"],
    ["Local", 110, 50, true, "LOCAL"],
    ["Status REQ", 150, 50, true, "REQ_STATUS"],
    ["Code", 150, 50, true, "CLOSED_CODE"],
    ["Nº Pedido", 150, 50, true, "PO_NUM"],
  ];

  const [colunas, setColunas] = useState(
    colunasLocal == "" ? tableHeaders : colunasLocal
  );

  useEffect(() => {
    localStorage.setItem("colunasSta", JSON.stringify(colunas));
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
            status: 1,
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

  function numberWithCommas(x) {
    return x
      .toString()
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

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
        {load && <Loading></Loading>}
        {load2 && <LoadingGet></LoadingGet>}
        <Titulo titulo="Controle Status (311212 - 311217 - 311258)" />
        <div className="">
          <div className="my-5 tablet:my-5 laptop:flex desktop:flex">
            <div>
              <FiltrosStaCon
                setFiltroAll={setFiltroAll}
                filtroAll={filtroAll}
                status={status}
                itemsTipo={itemsTipo}
              ></FiltrosStaCon>
            </div>

            <div className="flex h-full laptop:ml-4 desktop:ml-4 tablet:mb-12">
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
                  Requisição
                </option>
                <option value="PREPARER">Preparador</option>
                <option value="ORG">Organização</option>
                <option value="RE_LINE_NUM">Requisição Linha</option>
                <option value="VENDOR_NAME">Fornecedor</option>
                <option value="ITEM_DESCRIPTION">Descrição</option>
                <option value="PENDING_QUANTITY_RC">Qtd. Pendente</option>
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
            </div>
          </div>
          <div className="flex tablet:-mt-2 ">
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
            <div className="flex relative mx-5 tablet:mx-2 h-fit -mt-6">
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
          </div>

          <div className="flex right-20 tablet:right-12 -mt-8  absolute  ">
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
          <Table headers={colunas} tableContent={dadosMat()}></Table>
          <div className="my-auto tablet:-mt-5 laptop:hidden desktop:hidden tablet:mb-5 float-right">
            <h1 className="font-normal text-2xl mx-5">
              Valor Pendente Total: R${" "}
              <span className="font-bold text-2xl ">
                {numberWithCommas(Number(totalValue).toFixed(0))}
              </span>
            </h1>
          </div>
          <div className=" mb-14 laptop:flex desktop:flex float-right relative">
            <div className="my-auto tablet:hidden tablet:mb-5 float-right">
              <h1 className="font-normal text-2xl mx-5">
                Valor Pendente Total: R${" "}
                <span className="font-bold text-2xl ">
                  {numberWithCommas(Number(totalValue).toFixed(0))}
                </span>
              </h1>
            </div>
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
