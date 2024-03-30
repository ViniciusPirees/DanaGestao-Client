import React, { useEffect, useState } from "react";

import axios from "axios";
import Notificacao from "../../../components/Notificacao";

export default function ExcluirEstMan({ setAtivoExc, estman, getEstoqueMan }) {
  const confirmar = async () => {
    try {
      const res = await axios.post(
        `http://${import.meta.env.VITE_IP}/ExcluirEstMan`,
        {
          params: {
            EstManId: estman.EstManId,
          },
        }
      );
      setAtivoExc(false);
      Notificacao(["sucesso", "Item excluído com sucesso"]);
      getEstoqueMan()
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao excluir item do Estoque Manutenção" + err]);
    }
  };

  return (
    <>
      <div
        onClick={() => setAtivoExc(false)}
        className=" opacity-50 bg-[#000] z-[5] fixed top-0 left-0 w-full h-full"
      ></div>
      <div className="absolute bg-[#1f1f1f] left-0 tablet:left-[4.5em] tablet:w-[80%] right-0 z-[6] mx-auto top-0 bottom-0 my-auto h-fit w-[50em] p-10 border-2 rounded-md ">
        <div className="text-2xl tablet:text-xl text-center">
          <h1>
            Deseja excluir o item{" "}
            <strong>
              "{estman.EstManId} - {estman.EstManDesc}"
            </strong>{" "}
            e todas suas dependências (Movimentações, Anexos, Etc.)?
          </h1>
        </div>
        <div className="mx-auto w-fit flex">
          <button
            onClick={() => confirmar()}
            className="bg-[#21862a] p-2 mr-10 duration-200 hover:scale-105 tablet:text-xl text-2xl font-bold rounded-md mt-5"
          >
            Confirmar
          </button>
          <button
            onClick={() => setAtivoExc(false)}
            className="bg-[#cc0000] p-2 text-2xl duration-200 hover:scale-105 tablet:text-xl font-bold rounded-md mt-5"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
