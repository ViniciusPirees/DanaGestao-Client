import React, { useEffect, useState } from "react";
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
import getLogin from "../components/getLogin";

export default function EstoqueCentral() {
  const [filtro, setFiltro] = useState("De");

  const navigate = useNavigate();
  
  const [logado, setLogado] = useState(null);
  useEffect(() => {
    getLogin().then((val) => {
      setLogado(val);
      if (!val) {
        navigate('/')
      }
    });
  }, []);

  const [estoques, setEstoques] = useState();
  const [total, setTotal] = useState();
  const [pageN, setPageN] = useState(0);
  const [selecQtdPag, setSelecQtdPag] = useState(10);
  const [ativoImg, setAtivoImg] = useState(false);
  const [img, setImg] = useState("");
  const [input, setInput] = useState("");

  const buscardados = (props) => {
    getEstoqueCen(props);
  };

  useEffect(() => {
    if (filtro == "De") {
      getEstoqueCen([input, "EstCenDesc"]);
    } else if (filtro == "Ci") {
      getEstoqueCen([input, "EstCenCod"]);
    } else if (filtro == "Ar") {
      getEstoqueCen([input, "EstCenAreaDesc"]);
    } else if (filtro == "Lo") {
      getEstoqueCen([input, "EstCenLoc"]);
    } 
  }, [pageN, selecQtdPag]);

  //GET ESTOQUCEN POR DESCRICAO
  const getEstoqueCen = async (props) => {
    console.log([props[1], props[0]]);
    getEstoqueCount([props[1], props[0]]);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getEstoqueCen`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            input: props[0],
            col: props[1],
          },
        }
      );
      setEstoques(res?.data);
      console.log(res);
    } catch (err) {
      console.log(err);
      Notificacao([
        "erro",
        "Erro ao buscar os itens do estoque central " + err,
      ]);
    }
  };

  //--COUNT
  const getEstoqueCount = async (props) => {
    console.log(props);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getEstoqueCenCount`,
        { params: props }
      );
      setTotal(res?.data[0][""]);
    } catch (err) {
      console.log(err);
      Notificacao([
        "erro",
        "Erro ao buscar os itens do estoque central " + err,
      ]);
    }
  };

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const getAnexo = async (EstCenId) => {
  
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getAnexoEstCen`,
        { params: { EstCenId } }
      );
      if (res?.data.length > 0) {
        console.log(res?.data);
        var buffer = res?.data[0].EstCenAnexo.data;
        var base64 = _arrayBufferToBase64(buffer);
        console.log(base64);
        setImg(base64);
        setAtivoImg(true);
      } else {
        Notificacao(["atencao", "Nenhum anexo foi encontrado para esse item."]);
      }
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar o anexo " + err]);
    }
  };

  const pagesTotal = Math.ceil(total / selecQtdPag);
  const renderTableData = () => {
    return estoques?.map((estoque, index) => (
      <tr className="text-2xl border-b-4 border-[#4f4f4f]  " key={index}>
        <td className="text-center border-x-4 border-[#4f4f4f] break-words w-[10%] flex-wrap max-w-xs p-4">
          {estoque?.EstCenCod}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap w-[40%] max-w-xs p-4">
          {estoque?.EstCenDesc}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words w-[13%] flex-wrap max-w-xs p-4">
          {estoque?.EstCenAreaDesc}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words w-[13%] flex-wrap max-w-xs p-4">
          {estoque?.EstCenLoc}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words w-[8%] flex-wrap max-w-xs p-4">
          <button onClick={() => getAnexo(estoque?.EstCenId)}>
            <BsFillCameraFill className="text-3xl mb-[-5px]"></BsFillCameraFill>
          </button>
        </td>
      </tr>
    ));
  };

  const changePage = ({ selected }) => {
    setPageN(selected);
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
      <div className="w-full ml-[8.5em] mr-10 h-full overflow-y-auto">
        <Titulo titulo="Estoque Central" />
        {ativoImg && <ImgPopUp img={img} setAtivoImg={setAtivoImg}></ImgPopUp>}
        <div>
          <div>
            <div className="my-9 flex">
              <FiltrosEstCen
                setFiltro={setFiltro}
                buscardados={buscardados}
                setInput={setInput}
              ></FiltrosEstCen>
            </div>
            <div className="flex">
              <button
                onClick={() => navigate("./Criar")}
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
                    className=" p-3 ml-5 rounded-md text-2xl font-bold"
                  >
                    <option value={10}>10 por página</option>
                    <option value={20}>20 por página</option>
                    <option value={50}>50 por página</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto mt-10">
              <table className="table table-auto rounded-lg mx-auto mb-20 w-full">
                <thead>
                  <tr className="text-2xl bg-dana font-extrabold">
                    <th className="">Cod. Item</th>
                    <th className="p-3">Descrição</th>
                    <th>Área</th>
                    <th>Local</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{renderTableData()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
