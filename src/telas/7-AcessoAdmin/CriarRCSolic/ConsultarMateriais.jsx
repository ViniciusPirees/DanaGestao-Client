import React, { useEffect, useState } from "react";

import axios from "axios";
import Filtros from "./Filtros";


import ItemTr from "./ItemTr";
import ImgPopUp from "../../components/ImgPopUp";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import Notificacao from "../../components/Notificacao";
import { ImSearch } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import TelaItem from "./Items/TelaItem";
import { styleAll } from "../../../css"
export default function ConsultarMateriais() {
  const nav = useNavigate();


  //GET MATERIAIS
  const [materiais, setMateriais] = useState();

  const [ativoImg, setAtivoImg] = useState(false);
  const DataHoje = new Date();
  const defaultValue = DataHoje.toLocaleDateString("en-CA");
  const [total, setTotal] = useState(0);
  const [pageN, setPageN] = useState(0);
  const [selecQtdPag, setSelecQtdPag] = useState(10);

  const [filtroAll, setFiltroAll] = useState([["MatDescricao", ""]]);
  const [dataIni, setDataIni] = useState(defaultValue);
  const [dataFin, setDataFin] = useState(defaultValue);

  const [img, setImg] = useState("");

  useEffect(() => {
    getMateriais();
  }, [pageN, selecQtdPag]);

  //GET ESTOQUEMAN POR DESCRICAO
  const getMateriais = async (props) => {
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
          },
        }
      );
      setMateriais(res?.data);
      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhuma Solicitação foi encontrada."]);
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar as Solicitações " + err]);
      console.log(err);
    }
  };

  //--COUNT
  const getMateriaisCount = async (props) => {
    console.log(props);
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
      />
    ));
  };

  const changePage = ({ selected }) => {
    setPageN(selected);
  };
  const [itens, setItens] = useState([])
  const [telaItem, setTelaItem] = useState(false)

  return (
    <div className="flex">
     
      <div className="w-full ">
        {ativoImg && <ImgPopUp img={img} setAtivoImg={setAtivoImg}></ImgPopUp>}
        {telaItem && <TelaItem itens={itens} setTelaItem={setTelaItem}></TelaItem>}

        <div className="">
          <div className="my-9 flex">
            <div>
              <Filtros
                setFiltroAll={setFiltroAll}
                filtroAll={filtroAll}
              ></Filtros>
            </div>
            <div className="flex h-full">
              <button onClick={() => getMateriais()}>
                <ImSearch className="ml-5 bg-dana text-[3.3em] p-2 rounded-md" />
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
                className={"my-auto w-fit " + styleAll.inputSemOutline}
                 type="date"
              ></input>
            </div>
          </div>
          <div className="ml-5 -mt-5 flex right-20 absolute">
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
                className={"ml-5 font-bold border-0 "+ styleAll.inputSemOutline}
              >
                <option value={10}>10 por página</option>
                <option value={20}>20 por página</option>
                <option value={50}>50 por página</option>
              </select>
            </div>
          </div>
          <div className="mt-28">
            <table className="table-auto table text-white rounded-lg w-full mt-6 mx-auto ">
              <thead className=" ">
                <tr className="text-2xl bg-dana rounded-lg font-extrabold">
                  <th className="  "></th>
                  <th className="  ">Solicitação</th>
                  <th className="p-3 ">Data</th>
                  <th className="p-3 ">Máquina</th>
                  <th className="p-3 ">Descrição</th>
                  <th className="p-3 ">OS</th>
                  <th className="p-3 ">Solicitante</th>
                  <th className="p-3 ">Observação</th>
                </tr>
              </thead>
              <tbody>{dadosMat()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
