import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import Titulo from "../../../components/NavBar/Titulo";
import { styleAll } from "../../../../css";
import { ToastContainer } from "react-toastify";
import FiltroUsuarios from "./FiltroUsuarios";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { RiDeleteBin6Fill, RiPencilFill } from "react-icons/ri";
import EditPopup from "../EditPopup";
import { useNavigate } from "react-router-dom";
import Notificacao from "../../../components/Notificacao";
import getLogin from "../../../components/Login/getLogin";

export default function Usuarios() {
  const [filtro, setFiltro] = useState("UsuNome");
  const [tipo, setTipo] = useState(0);
  const [Usuarios, setUsuarios] = useState([]);
  const [total, setTotal] = useState();
  const [pageN, setPageN] = useState(0);
  const [selecQtdPag, setSelecQtdPag] = useState(10);
  const [input, setInput] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [values, setValues] = useState("");

  const nav = useNavigate();
  const [logado, setLogado] = useState(null);
  const [nivel, setNivel] = useState(0);
  useEffect(() => {
    getLogin().then((val) => {
      setNivel(val.n);
      setLogado(val.val);
      if (!val || val.n != 3) {
        navigate("/AcessoAdmin");
      }
    });
  }, []);

  const buscardados = (props) => {
    getUsuarios(props);
  };

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (nivel != 0) {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      changePage({ selected: 0 }).then(getUsuarios([input, filtro]));
      setSucesso(false);
    }
  }, [selecQtdPag, sucesso, nivel]);

  useEffect(() => {
    getUsuarios([input, filtro]);
  }, [pageN]);

  const getUsuarios = async (props) => {
    getUsuCount([props[1], props[0], "Usuario"]);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getCadastros`,
        {
          params: {
            pageN: pageN,
            selecQtdPag: selecQtdPag,
            input: props[0],
            col: props[1],
            tabela: "Usuario",
            ordem: "UsuNome",
          },
        }
      );
      if (res?.data?.code) {
        setUsuarios([]);
        Notificacao(["atencao", "Nenhum Usuário foi encontrado."]);
      } else {
        setUsuarios(res?.data);
        if (res?.data == 0) {
          Notificacao(["atencao", "Nenhum Usuário foi encontrado."]);
        }
      }
      setUsuarios(res?.data);
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar as Usuários" + err]);
    }
  };

  //--COUNT
  const getUsuCount = async (props) => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getCadastroCount`,
        { params: props }
      );
      if (res?.data?.code) {
        setTotal(0);
      } else {
        setTotal(res?.data[0][""]);
      }
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar os usuários" + err]);
    }
  };

  const pagesTotal = Math.ceil(total / selecQtdPag);

  const renderTableData = () => {
    return Usuarios?.map((Usuario, index) => (
     <tr
        className="text-xl tablet:text-base border-b-4 border-[#4f4f4f]  "
        key={index}
      >       <td className="text-center border-x-4 border-[#4f4f4f] break-words flex-wrap max-w-xs p-4">
          {Usuario?.UsuCod}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {Usuario?.UsuNome}
        </td>

        <td className="text-center  border-[#4f4f4f] duration-500 hover:scale-105">
          <button className="duration-500 hover:scale-105">
            <RiDeleteBin6Fill
              onClick={() => {
                setValues(Usuario);
                setTipo(3);
              }}
              className="text-[2.5em] rounded-md bg-[#cc0000] p-2 m-1 -mb-[3px]"
            />
          </button>
        </td>
        <td className="text-center border-[#4f4f4f] ">
          <button className="duration-500 hover:scale-105">
            <RiPencilFill
              onClick={() => {
                setValues(Usuario);
                setTipo(2);
              }}
              className="text-[2.5em] rounded-md  bg-[#ff8838] p-2 m-1 -mb-[3px] "
            />
          </button>
        </td>
      </tr>
    ));
  };

  const changePage = async ({ selected }) => {
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
      <NavBar ativo="7"></NavBar>
      <div className="w-full ml-[8.5em] mr-10 h-full overflow-y-auto">
        {tipo > 0 && (
          <EditPopup
            setTipo={setTipo}
            criacao={7}
            tipo={tipo}
            setSucesso={setSucesso}
            values={values}
          ></EditPopup>
        )}
        <Titulo titulo="Cadastros - Usuários" />
        <div>
          <div>
            <div className="my-9 flex">
              <FiltroUsuarios
                setFiltro={setFiltro}
                buscardados={buscardados}
                setInput={setInput}
                changePage={changePage}
              ></FiltroUsuarios>
            </div>
            <div className="flex ">
              <button
                onClick={() => nav("/AcessoAdmin/Cadastros")}
                className="flex bg-dana duration-200 tablet:text-xl hover:scale-105 rounded-md text-2xl font-bold p-2"
              >
                Voltar
              </button>
              <button
                onClick={() => setTipo(1)}
                className="flex bg-dana duration-200 tablet:text-xl hover:scale-105 ml-3 rounded-md text-2xl font-bold p-2"
              >
                Novo +
              </button>

              
            </div>
            </div>
            <div className="overflow-x-auto mt-5 tablet:mt-5 mb-5">
              <table className="table table-auto tablet:table-fixed rounded-lg mx-auto  w-full">
                <thead>
                  <tr className="text-xl tablet:text-lg  bg-dana font-extrabold">
                    <th className="w-[8%] tablet:w-[5em]">Cód.</th>
                    <th className="p-3 w-">Nome do Usuário </th>
                    <th className="w-0 tablet:w-[3em]"></th>
                    <th className="w-0 rounded-se-lg tablet:w-[3em]"></th>
                  </tr>
                </thead>
                <tbody>{renderTableData()}</tbody>
              </table>
            </div>
            <div className="mb-14 desktop:flex float-right relative">
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
