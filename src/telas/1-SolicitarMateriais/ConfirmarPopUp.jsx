import React, { useState } from "react";
import ImgPopUp from "../components/ImgPopUp";
import { useNavigate } from "react-router-dom";
import Notificacao from "../components/Notificacao";
import axios from "axios";

export default function ConfirmarPopUp({ params, anexo, setConfirm }) {
  const [ativoImg, setAtivoImg] = useState(false);
  const navigate = useNavigate();
  var data = `${params.data.substring(8, 10)}/${params.data.substring(
    5,
    7
  )}/${params.data.substring(2, 4)}`;

  const criarSolic = async () => {
    const formdata = new FormData();
    formdata.append("image", anexo);

    try {
      const res = await axios.post(
        `http://${import.meta.env.VITE_IP}:4400/CriarSolic`,
        formdata,
        {
          params: params,
        }
      );
      navigate("/ConsultarSolicitacao");
    } catch (err) {
      Notificacao(["erro", "Erro ao criar Solicitação"]);
      console.log(err);
    }
  };

  const itemMap = () => {
    return params.items.map((item, i) => {
      return (
        <tr key={i} className="">
          <td className="break-words flex-wrap max-w-[30em] ">{item[0]}</td>
          <td className="break-words flex-wrap max-w-[10em]">{item[1]}</td>
        </tr>
      );
    });
  };
  return (
    <>
      <div className=" opacity-50 bg-[#000] z-[3] absolute top-0 left-0 w-full h-full"></div>
      <div className="text-[#fff] absolute bg-[#1f1f1f] left-0 right-0 z-[4] max-w-[70em] mx-auto top-0 bottom-0 my-auto h-fit w-fit p-2 border-2 rounded-md ">
        {ativoImg && (
          <ImgPopUp
            img={""}
            setAtivoImg={setAtivoImg}
            imgComData={anexo}
          ></ImgPopUp>
        )}
        <h1 className="text-[1.7rem] mx-5 my-3 text-center text-[#fff] font-bold">
          Solicitação
        </h1>
        <div className="flex px-5 mb-2 min-w-[70em] w-full">
          <div className="flex mx-auto">
            <h1 className="text-2xl text-[#fff] ">Data:</h1>
            <h1 className="text-2xl font-bold ml-3 text-[#fff]">{data}</h1>
          </div>
          <div className="flex mx-auto ">
            <h1 className="text-2xl text-[#fff]">Maquina:</h1>
            <h1 className="text-2xl font-bold ml-3 text-[#fff]">
              {params.maquina[0] +
                (params.maquina[1]?.length > 0 && " - " + params.maquina[1])}
            </h1>
          </div>
          <div className="flex mx-auto">
            <h1 className="text-2xl text-[#fff]">OS:</h1>
            <h1 className="text-2xl font-bold ml-3 text-[#fff]">{params.os}</h1>
          </div>
          <div className="flex mx-auto">
            <h1 className="text-2xl text-[#fff]">Solicitante:</h1>
            <h1 className="text-2xl font-bold ml-3  text-[#fff]">
              {params.solicitante[0]}
            </h1>
          </div>
        </div>
        <div className="flex mx-auto px-16 flex-wrap mb-2">
          <div className="text-2xl flex text-[#fff]">
            Descrição:{" "}
            <h1 className="text-2xl font-bold ml-2 max-w-[40em] text-[#fff]">
              {params.descricao}
            </h1>
          </div>
        </div>

        <div className="flex mx-auto  px-16  flex-wrap mb-2">
          <div className="text-2xl flex text-[#fff]">
            Observação:
            <h1 className="text-2xl font-bold ml-2 max-w-[40em] text-[#fff]">
              {params.observacao}
            </h1>
          </div>
        </div>
        <div className="flex mx-5 flex-wrap mb-2">
          <table className="table-auto text-white mt-4 rounded-1xl mx-auto w-full">
            <thead>
              <tr className="text-2xl">
                <th className="text-center">Item</th>
                <th className="text-center">Quantidade</th>
              </tr>
            </thead>
            <tbody className="text-xl wrap max-w-[30em]  text-center">
              {itemMap()}
            </tbody>
          </table>
        </div>

        <div className="flex mx-auto w-[50%] mb-4 mt-10">
          <button
            onClick={() => setAtivoImg(true)}
            className="px-7 mx-auto py-2 bg-dana text-2xl hover:scale-105  rounded-xl font-bold"
          >
            Anexo
          </button>
          <button
            onClick={() => {
              criarSolic();
            }}
            className="px-3 mx-auto py-2 bg-[#249433] hover:scale-105  text-2xl rounded-xl font-bold"
          >
            Confirmar
          </button>
          <button
            className="px-4 mx-auto py-2 bg-[#cf3434] hover:scale-105 text-2xl rounded-xl font-bold"
            onClick={() => setConfirm(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
