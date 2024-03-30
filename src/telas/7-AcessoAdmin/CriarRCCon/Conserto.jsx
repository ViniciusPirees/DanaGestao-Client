import React, { useEffect, useState } from "react";
import FiltrosConserto from "./FiltrosConserto";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { BsFillCameraFill } from "react-icons/bs";
import ImgPopUp from "../../components/ImgPopUp";
import Notificacao from "../../components/Notificacao";
import { ToastContainer } from "react-toastify";
import { ImSearch } from "react-icons/im";
import ItemTr from "./ItemTr";

import TelaItem from "./Items/TelaItem";
import { styleAll } from "../../../css";

export default function Conserto() {
  const DataHoje = new Date();
  const defaultValue = DataHoje.toLocaleDateString("en-CA");
  const [dataIni, setDataIni] = useState(defaultValue);
  const [dataFin, setDataFin] = useState(defaultValue);
  const navigate = useNavigate();

  const [telaItem, setTelaItem] = useState(false)
  const [consertos, setConsertos] = useState();
  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);
  const [selecQtdPag, setSelecQtdPag] = useState(10);
  const [ativoImg, setAtivoImg] = useState(false);
  const [img, setImg] = useState("");
  const [filtroAll, setFiltroAll] = useState([["ConManNome", ""]]);
  const [itens, setItens] = useState([])

  useEffect(() => {
    getConserto();
  }, [pageN, selecQtdPag]);

  //GET ESTOQUCEN POR DESCRICAO
  const getConserto = async () => {

    getConsertoCount({
      filtroAll,
      dataIni,
      dataFin,
      tabela: "Conserto",
      tabdata: "ConData",
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
            tabela: "Conserto",
            tabdata: "ConData",
          },
        }
      );
      setConsertos(res?.data);
      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhum Conserto foi encontrado."]);
      }

    } catch (err) {
      console.log(err);
      Notificacao([
        "erro",
        "Erro ao buscar os itens do Conserto" + err,
      ]);
    }
  };

  //--COUNT
  const getConsertoCount = async (props) => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getFiltroCount`,
        { params: props }
      );

      setTotal(res?.data[0][""]);
    } catch (err) {
      console.log(err);
      Notificacao([
        "erro",
        "Erro ao buscar os itens do Conserto" + err,
      ]);
    }
  };

  const pagesTotal = Math.ceil(total / selecQtdPag);

  const dadosMat = () => {

    return consertos?.map((conserto, index) => (
      <ItemTr
        conserto={conserto}
        key={index}
        setAtivoImg={setAtivoImg}
        setImg={setImg}
        setTelaItem={setTelaItem}
        setItens={setItens}
      />
    ));
  };


  const changePage = ({ selected }) => {
    setPageN(selected);
  };

  return (
    <div className="flex w-full">


      <div className=" h-full overflow-y-auto w-full ">

        {ativoImg && <ImgPopUp img={img} setAtivoImg={setAtivoImg}></ImgPopUp>}
        {telaItem && <TelaItem itens={itens} setTelaItem={setTelaItem}></TelaItem>}
        <div>
          <div>
            <div className="my-9 flex">
              <div>
                <FiltrosConserto
                  setFiltroAll={setFiltroAll}
                  filtroAll={filtroAll}
                ></FiltrosConserto>
              </div>
              <div className="flex h-full">
                <button onClick={() => {

                  getConserto()
                }}>
                  <ImSearch className="ml-5 tablet:ml-2 bg-dana text-[3.3em] tablet:text-[2.75em] p-2 rounded-md" />
                </button>
              </div>
              <div className="flex h-full ml-10">
                <h1 className="my-auto mx-4 text-[1.7em] font-bold">Data:</h1>
                <input
                  value={dataIni}
                  onChange={(e) => {
                    setDataIni(e.target.value);
                  }}
                  className={"my-auto w-fit " + styleAll.inputSemOutline}
                  type="date"
                ></input>
                <h1 className="my-auto mx-2 text-xl font-bold">até</h1>
                <input
                  value={dataFin}
                  onChange={(e) => {
                    setDataFin(e.target.value);
                  }}
                  className={"my-auto w-fit " + styleAll.inputSemOutline} type="date"
                ></input>
              </div>
            </div>
            <div className="flex mb-5">
              <button
                onClick={() => navigate("./ItemConserto", { state: { tipo: 1 } })}
                className="bg-dana px-4 py-2 mx-4 font-bold text-2xl rounded-lg"
              >
                Novo+
              </button>
              <div className="ml-5 flex right-20 absolute z-[0]">
                <ReactPaginate
                  previousLabel={"Anterior"}
                  nextLabel={"Próxima"}
                  pageCount={pagesTotal}
                  onPageChange={changePage}
                  containerClassName="bg-[#3B3B3B]  flex rounded-lg text-2xl text-white font-bold "
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
                    className={"ml-5 font-bold border-0 " + styleAll.inputSemOutline}
                  >
                    <option value={10}>10 por página</option>
                    <option value={20}>20 por página</option>
                    <option value={50}>50 por página</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto w-full mt-10">
              <table className="table rounded-lg mx-auto overflow-x-auto w-max">
                <thead>
                  <tr className="text-2xl bg-dana font-extrabold">
                    <th></th>
                    <th className="p-3 w-[5em]">Cod.</th>
                    <th className="w-[5em]">Data</th>
                    <th className="w-[10em]">Manutentor</th>
                    <th className="w-[5em]">Número</th>
                    <th className="w-[19em]">Máq. Descrição</th>
                    <th className="w-[10em]">Máq. Divisão</th>
                    <th className="w-[10em]">Máq. Setor</th>
                    <th className="w-[10em]">Máq. Div. EBS</th>
                    <th className="w-[15em]">Fornecedor</th>
                    <th className="w-[5em]">Nº SO</th>
                    <th className="w-[5em]">Nº NF</th>
                    <th className="w-[5em]">Nº Orçamento </th>
                    <th className="w-[5em]">Nº RC</th>
                    <th className="w-[20em]">Observação</th>
                  </tr>
                </thead>
                <tbody>{dadosMat()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
