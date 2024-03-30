import React, { useState } from "react";
import { styleAll } from "../../css";
import Notificacao from "../components/Notificacao";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TrocaSenha({ setAtivoSenha, usuario }) {
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [senhaConfi, setSenhaConfi] = useState("");
  const navigate = useNavigate();

  const mudarSenha = async () => {
    if (senhaAntiga.length == 0) {
      return Notificacao(["erro", "Digite a Senha antiga ."]);
    }
    if (senhaNova.length == 0) {
      return Notificacao(["erro", "Digite a Senha nova ."]);
    }
    if (senhaConfi.length == 0) {
      return Notificacao(["erro", "Digite a confirmação da senha ."]);
    }
    if (senhaNova != senhaConfi) {
      return Notificacao([
        "erro",
        "Senha nova diferente da senha de confirmação.",
      ]);
    }
    if (senhaAntiga == senhaNova) {
      return Notificacao(["erro", "Senha nova igual a senha anterior."]);
    }

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getLoginS`,
        {
          params: {
            login: usuario,
            senha: senhaAntiga,
          },
        }
      );

      if (res?.data == 0) {
        Notificacao(["erro", "Senha antiga incorreta."]);
      } else {
        try {
          const res = await axios.post(
            `http://${import.meta.env.VITE_IP}/TrocaSenha`,
            {
              params: {
                login: usuario,
                senha: senhaNova,
              },
            }
          );

          /*sessionStorage.clear();
          navigate(0);*/
          Notificacao(["sucesso", "Senha alterada com sucesso."]);
          setAtivoSenha(false);
        } catch (err) {
          console.log(err);
          Notificacao(["erro", "Erro ao buscar Máquinas" + err]);
        }
      }
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar Máquinas" + err]);
    }
  };
  return (
    <>
      <div className=" opacity-50 bg-[#000] z-[91] fixed top-0 left-0 w-full h-full"></div>

      <div className="fixed bg-[#1f1f1f] left-0 right-0 z-[92]  mx-auto top-0 bottom-0 my-auto h-fit w-fit p-14 border-2 rounded-md ">
        <h1 className="text-center text-3xl font-bold mb-10">Trocar Senha</h1>
        <div className="w-[30em] mx-auto">
          <input
            onChange={(e) => setSenhaAntiga(e.target.value)}
            value={senhaAntiga}
            autoFocus
            type="password"
            className={"mb-10 " + styleAll.inputSoW}
            placeholder="Senha Atual"
          />
        </div>
        <div className="w-[30em] mx-auto">
          <input
            onChange={(e) => setSenhaNova(e.target.value)}
            value={senhaNova}
            type="password"
            className={"mb-10 " + styleAll.inputSoW}
            placeholder="Nova Senha"
          />
        </div>
        <div className="w-[30em] mx-auto">
          <input
            onChange={(e) => setSenhaConfi(e.target.value)}
            value={senhaConfi}
            type="password"
            className={"mb-10 " + styleAll.inputSoW}
            placeholder="Confirmar Senha"
          />
        </div>
        <div className="flex mx-auto w-[100%]">
          <button
            onClick={() => mudarSenha()}
            className="px-4 mx-auto py-3 bg-confirm text-2xl rounded-lg font-bold"
          >
            Confirmar
          </button>
          <button
            onClick={() => setAtivoSenha(false)}
            className="px-4 mx-auto py-3 bg-cancela text-2xl rounded-lg font-bold"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
