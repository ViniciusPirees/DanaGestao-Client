import React, { useEffect, useState } from "react";

import Notificacao from "../../components/Notificacao";
import { enviar } from "../../components/Email/EnviarEmails";

export default function EnviaEmail({
  terminaEnvia,
  setEnviaEmail,
  enviaEmail,
  setEnviar,
}) {
  return (
    <>
      <div
        onClick={() => setEnviaEmail(0)}
        className=" opacity-50 bg-[#000] z-[5] fixed top-0 left-0 w-full h-full"
      ></div>
      <div className="fixed bg-[#1f1f1f] left-0 right-0 z-[6] mx-auto top-0 bottom-0 my-auto h-fit w-[50em] p-10 border-2 rounded-md ">
        <div className="text-2xl text-center">
          <h1>
            Deseja enviar email aos emails cadastrados sobre o Item sem
            Reposição?
          </h1>
        </div>
        <div className="mx-auto w-fit flex">
          <button
            onClick={() => {
              setEnviar(true);
              terminaEnvia(enviaEmail);
            }}
            className="bg-[#21862a] p-2 mr-10 duration-200 hover:scale-105 text-2xl font-bold rounded-md mt-5"
          >
            Sim
          </button>
          <button
            onClick={() => {
              setEnviar(false);
              terminaEnvia(enviaEmail);
            }}
            className="bg-[#cc0000] p-2 text-2xl duration-200 hover:scale-105 font-bold rounded-md mt-5"
          >
            Não
          </button>
        </div>
      </div>
    </>
  );
}
