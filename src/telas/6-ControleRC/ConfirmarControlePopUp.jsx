import React, { useState } from "react";
import ImgPopUp from "../components/ImgPopUp";
import { useNavigate } from "react-router-dom";
import Notificacao from "../components/Notificacao";
import axios from "axios";

export default function ConfirmarControlePopUp({ params, anexo, setConfirm }) {
  const [ativoImg, setAtivoImg] = useState(false);
  const navigate = useNavigate();

  const criarEstCen = async () => {
    const formdata = new FormData();
    formdata.append("image", anexo);
    console.log(params)
    try {
      const res = await axios.post(
        `http://${import.meta.env.VITE_IP}:4400/CriarEstCen`,
        formdata,
        {
          params: params,
        }
      );
      navigate("/EstoqueCentral");
    } catch (err) {
      Notificacao(["erro", "Erro ao criar"]);
      console.log(err);
    }
  };

  return (
    <>
      <div className=" opacity-50 bg-[#000] z-[3] absolute top-0 left-0 w-full h-full"></div>
      <div className="absolute bg-[#1f1f1f] left-0 right-0 z-[4] max-w-[70em] min-w-[50em] mx-auto top-0 bottom-0 my-auto h-fit w-fit p-2 border-2 rounded-md ">
        {ativoImg && (
          <ImgPopUp
            img={""}
            setAtivoImg={setAtivoImg}
            imgComData={anexo}
          ></ImgPopUp>
        )}
        <h1 className="text-[1.7rem] mx-5 my-4 text-center text-[#fff] font-bold">
          Item Estoque Manutenção
        </h1>

        <div className="flex mx-auto px-16 flex-wrap mb-4  ">
          <div className="text-2xl text-[#fff]  mx-auto flex">
            Cod Item:
            <h1 className="text-2xl font-bold ml-3 text-[#fff]">
              {params.codItem}
            </h1>
          </div>
        </div>

        <div className="flex  px-16 flex-wrap mb-4">
          <div className="text-2xl mx-auto flex text-[#fff]">
            Descrição:{" "}
            <h1 className="text-2xl font-bold ml-2 max-w-[40em] text-[#fff]">
              {params.descricao}
            </h1>
          </div>
        </div>
        <div className="flex mb-4">
          <div className="flex mx-auto  px-16  flex-wrap mb-2">
            <div className="text-2xl flex text-[#fff]">
              Área:
              <h1 className="text-2xl font-bold ml-2 max-w-[40em] text-[#fff]">
                {params.area[0]}
              </h1>
            </div>
          </div>
          <div className="flex mx-auto  px-16  flex-wrap mb-2">
            <div className="text-2xl flex text-[#fff]">
              Local:
              <h1 className="text-2xl font-bold ml-2 max-w-[40em] text-[#fff]">
                {params.local}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex mx-auto w-[50%] mb-4 mt-10">
          <button
            onClick={() => {
              if (anexo?.size > 0) {
                setAtivoImg(true);
              }
            }}
            className="px-7 mx-auto py-2 bg-dana text-2xl rounded-xl font-bold"
          >
            Anexo
          </button>
          <button
            onClick={() => {
              criarEstCen();
            }}
            className="px-3 mx-auto py-2 bg-[#249433] text-2xl rounded-xl font-bold"
          >
            Confirmar
          </button>
          <button
            className="px-4 mx-auto py-2 bg-[#cf3434] text-2xl rounded-xl font-bold"
            onClick={() => setConfirm(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
