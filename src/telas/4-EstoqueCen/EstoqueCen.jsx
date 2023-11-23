import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { styleAll } from "../../css";
import Titulo from "../components/Titulo";
import FiltrosEstCen from "./FiltrosEstCen";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { BsFillCameraFill } from "react-icons/bs";
import ImgPopUp from "../components/ImgPopUp";
import Notificacao from "../components/Notificacao";
import { ToastContainer } from "react-toastify";
import { ImSearch } from "react-icons/im";
import ItemTrEstCen from "./ItemTrEstCen";
import getLogin from "../components/getLogin";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { HiRefresh } from "react-icons/hi";
import Loading from "../components/Loading";
import { FaFileExcel } from "react-icons/fa6";
import Excel from "./Abas/Excel/Excel";
import LoadingGet from "../components/LoadingGet";

export default function EstoqueCen() {
  const navigate = useNavigate();

  const [logado, setLogado] = useState(null);
  useEffect(() => {
    getLogin().then((val) => {
      setLogado(val);
      if (!val) {
        navigate("/");
      }
    });

    getCooldown();
  }, []);

  const [estoques, setEstoques] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);
  const [selecQtdPag, setSelecQtdPag] = useState(10);
  const [ativoImg, setAtivoImg] = useState(false);
  const [img, setImg] = useState("");
  const [input, setInput] = useState("");
  const [filtroAll, setFiltroAll] = useState([["DESCRIPTION", ""]]);
  const [infosEst, setInfosEst] = useState("");
  const [order, setOrder] = useState("DESCRIPTION");
  const [orderVal, setorderVal] = useState("asc");

  const firstUpdate = useRef(true);
  const [ultimaData, setUltimaData] = useState(new Date());
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    changePage({ selected: 0 }).then(getEstoqueCen());
  }, [selecQtdPag, infosEst]);

  const firstUpdate2 = useRef(true);
  useEffect(() => {
    if (firstUpdate2.current) {
      firstUpdate2.current = false;
      return;
    }
    getEstoqueCen();
  }, [pageN]);

  const [load, setLoad] = useState(false);
  const [timer, setTimer] = useState(80);

  const [horario, setHorario] = useState(new Date());
  const [load2, setLoad2] = useState(false);

  useEffect(() => {
    getCooldown().then((res) => {
      var agr = new Date();
      var ultimo5 = new Date(res.getTime() + 15000 + 180 * 60000);
      if (ultimo5 <= agr) {
        getEstoqueCen();
      } else {
        setLoad(true);
      }
    });
  }, []);

  useEffect(() => {
    if (horario.getMinutes() == 15 && horario.getSeconds() == 3) {
      getCooldown().then((res) => {
        var agr = new Date();
        var ultimo5 = new Date(res.getTime() + 15000 + 180 * 60000);
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
      var ultimo5 = new Date(ultimaData.getTime() + 15000 + 180 * 60000);
      var seconds = (ultimo5.getTime() - agr.getTime()) / 1000;

      if (timer <= 0) {
        setLoad(false);
        setTimer(80);
        getEstoqueCen();
        Notificacao(["sucesso", "Atualizado com sucesso!"]);
        return;
      }

      const timeoutFunction = setInterval(() => {
        setTimer(seconds);
      }, 1000);

      return () => clearInterval(timeoutFunction);
    }
  }, [timer, load]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        getEstoqueCen();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [pageN, selecQtdPag, filtroAll, order, orderVal]);

  //GET ESTOQUECen POR DESCRICAO
  const getEstoqueCen = async () => {
    setLoad2(true);
    getEstoqueCount({
      filtroAll,
      dataIni: "",
      dataFin: "",
      tabela: "EstoqueCentral",
      tabdata: "",
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
            tabela: "EstoqueCentral",
            tabdata: "",
            order: order,
            orderVal: orderVal,
          },
        }
      );

      setEstoques(res?.data);
      setLoad2(false);
      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhum item foi encontrado."]);
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar itens estoque " + err]);
      console.log(err);
      setLoad2(false);
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
      <ItemTrEstCen
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

  const getCooldown = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getCooldownEst`
      );
      var ultimo = new Date(res?.data[0].CooldownEst);
      setUltimaData(ultimo);
      return ultimo;
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar última data de atualização " + err]);
      console.log(err);
    }
  };

  const atualizaDados = async () => {
    var agr = new Date();
    var ultimo5 = new Date(ultimaData.getTime() + 5 * 60000 + 180 * 60000);
    if (ultimo5 <= agr) {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}:4400/getControleEst`
        );

        Notificacao(res.data);
        getCooldown().then((res) => {
          var agr = new Date();
          var ultimo5 = new Date(res.getTime() + 15000 + 180 * 60000);
          if (ultimo5 <= agr) {
            getEstoqueCen();
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
            dataIni: "",
            dataFin: "",
            tabela: "EstoqueCentral",
            tabdata: "",
            order: order,
            orderVal: orderVal,
          },
        }
      );
      console.log(res);
      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhum item foi encontrado."]);
      } else {
        Excel({ estcen: res.data });
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
      <NavBar ativo="4"></NavBar>
      <div className="w-full pl-[8.5em] pr-10 ">
        <Titulo titulo="Estoque Central" />
        {ativoImg && <ImgPopUp img={img} setAtivoImg={setAtivoImg}></ImgPopUp>}
        {load && <Loading></Loading>}
        {load2 && <LoadingGet></LoadingGet>}

        <div>
          <div>
            <div className="my-9 flex">
              <div>
                <FiltrosEstCen
                  setFiltroAll={setFiltroAll}
                  filtroAll={filtroAll}
                ></FiltrosEstCen>
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
                  <option value="DESCRIPTION">Descrição</option>
                  <option value="ITEM">Item</option>

                  <option value="QUANTITY">Quantidade</option>
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
            </div>
            <div className="flex">
              <div className="flex relative mx-5 h-full -mt-6">
                <button
                  className="flex bg-dana rounded-md duration-200 hover:scale-105  text-2xl font-bold p-2"
                  onClick={() =>
                    changePage({ selected: 0 }).then(getEstoqueCen())
                  }
                >
                  Buscar
                  <ImSearch className="my-auto mx-auto ml-3" />
                </button>
              </div>

              <div className="flex relative h-full mx-5 -mt-6">
                <button
                  className="flex duration-200 h-full hover:scale-105 bg-dana rounded-md text-2xl font-bold p-2"
                  onClick={() => {
                    atualizaDados();
                  }}
                >
                  Atualizar Dados
                  <HiRefresh className="my-auto mx-auto ml-1 text-3xl" />
                </button>
                <div className="h-full">
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
              <div className="flex relative h-full mx-5 -mt-6">
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
            <div className="overflow-x-auto w-full mt-8 mb-10 rounded-xl ">
              <table className="table rounded-lg mx-auto overflow-x-auto w-max">
                <thead className="">
                  <tr className="text-xl bg-dana font-extrabold">
                    <th className=" w-[25em] rounded-ss-xl">Item</th>
                    <th className="p-3 w-[40em]">Descrição</th>
                    <th className="w-[20em] rounded-se-xl">Quantidade</th>
                  </tr>
                </thead>
                <tbody className="[&>*:nth-child(odd)]:bg-fundo [&>*:nth-child(even)]:bg-[#292929]">
                  {renderTableData()}
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
    </div>
  );
}
