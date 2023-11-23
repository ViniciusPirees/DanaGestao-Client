import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Titulo from "../components/Titulo";
import SearchDropdown from "../components/SearchDropdown";
import axios from "axios";
import CamPopUp from "../components/CamPopUp";
import { BsFillCameraFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ConfirmarControlePopUp from "./ConfirmarControlePopUp";
import Notificacao from "../components/Notificacao";

export default function CriarControle() {
  const navigate = useNavigate();
  //COD ITEM
  const [codItem, setCodItem] = useState("");

  //DESCRICAO
  const [descricao, setDescricao] = useState("");

  //AREA
  const [areas, setAreas] = useState();
  const [area, setArea] = useState("");
  useEffect(() => {
    const getArea = async () => {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}:4400/GetArea`
        );
        setAreas(res.data);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar Area" + err]);
      }
    };
    getArea();
  }, []);

  //LOCALIZACAO
  const [local, setLocal] = useState("");

  //ANEXO
  const [anexotela, setAnexoTela] = useState(false);
  const [anexofile, setAnexoFile] = useState(null);

  //CRIAR

  const [ativoConfirm, setConfirm] = useState(false);
  const [params, setParams] = useState(null);
  const criarEst = () => {
    if (codItem.length == 0) {
      console.log(codItem.length);
      return Notificacao(["erro", `Necessário digitar o Código do Item.`]);
    }
    if (descricao.length == 0) {
      console.log(descricao);
      return Notificacao(["erro", `Necessário digitar a Descrição.`]);
    }

    if (area.length == 0) {
      console.log(area);
      return Notificacao(["erro", `Necessário selecionar a Área.`]);
    }

    if (local.length == 0) {
      console.log(local);
      return Notificacao(["erro", `Necessário digitar a Localização.`]);
    }

    setParams({
      codItem: codItem,
      descricao: descricao,
      area: area,
      local: local,
    });

    setConfirm(true);
  };

  return (
    <>
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
      <div className="flex">
        <NavBar ativo="4"></NavBar>
        <div className="w-full ml-[8.5em] mr-10 h-full overflow-y-auto">
          <div className="">
            {anexotela && (
              <CamPopUp
                setAnexoTela={setAnexoTela}
                setAnexoFile={setAnexoFile}
                anexofile={anexofile}
              ></CamPopUp>
            )}
            {ativoConfirm && (
              <ConfirmarControlePopUp
                params={params}
                anexo={anexofile}
                setConfirm={setConfirm}
              ></ConfirmarControlePopUp>
            )}
          </div>
          <Titulo titulo="ControleRC" />

          <div className="mt-10">
            <div className="flex">
              <div className="w-[20%] mx-10">
                <h1 className="text-[26px]  font-bold mb-2">Cod. Item:</h1>
                <input
                  type="number"
                  className="p-3 text-2xl bg-transparent w-full border-[2px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder=""
                  value={codItem}
                  onChange={(e) => setCodItem(e.target.value)}
                />
              </div>
              <div className="w-[80%] mx-10">
                <h1 className="text-[26px]  font-bold mb-2">Descrição:</h1>
                <input
                  type="text"
                  className="p-3 text-2xl bg-transparent w-full border-[2px] rounded-md"
                  placeholder=""
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mt-10">
              <div className="w-[40%] mx-10">
                <h1 className="text-[26px] font-bold mb-2">Área:</h1>
                <SearchDropdown
                  options={areas}
                  setValue={setArea}
                  opt={3}
                ></SearchDropdown>
              </div>
              <div className="w-[45%] mx-10">
                <h1 className="text-[26px] font-bold mb-2">Localização:</h1>
                <input
                  type="text"
                  className="p-3 text-2xl bg-transparent w-full border-[2px] rounded-md"
                  placeholder=""
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                />
              </div>

              <div className="w-[15%] mx-10">
                <h1 className="text-[26px] font-bold mb-2">Anexo:</h1>
                <button
                  className="p-3 text-3xl bg-transparent w-full border-[2px] rounded-md"
                  placeholder=""
                  onClick={() => setAnexoTela(true)}
                >
                  <BsFillCameraFill className="mx-auto "></BsFillCameraFill>
                </button>
                <div className="">
                  {anexofile?.size > 0 && (
                    <h1 className="text-center mt-2">Imagem Anexada</h1>
                  )}
                </div>
              </div>
            </div>
           
            <div className="flex mx-auto w-fit my-6">
              <button
                onClick={() => criarEst()}
                className="py-3 px-6 mt-6 mx-10 bg-[#249433] text-3xl font-bold rounded-md"
              >
                Confirmar
              </button>
              <button
                className="py-3 px-6 mt-6 mx-10 bg-dana text-3xl font-bold rounded-md"
                onClick={() => navigate("/EstoqueCentral")}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
