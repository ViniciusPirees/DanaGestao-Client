import React, { useEffect, useState } from "react";
import Notificacao from "../components/Notificacao";
import axios from "axios";
import getLogin from "../components/getLogin";
import setLogin from "../components/setLogin";
import { useNavigate } from "react-router-dom";
import { styleAll } from "../../css";

export default function Login({ setLogado }) {
  const [loginNome, setLoginNome] = useState("");
  const [senha, setSenha] = useState("");
  const nav = useNavigate();
  const tryLogin = async () => {
    console.log(loginNome, senha);
    try {
      const res = await axios.post(
        `http://${import.meta.env.VITE_IP}:4400/getLogin/`,
        {
          params: {
            login: loginNome,
            senha: senha,
          },
        }
      );

      if (res?.data == 0) {
        Notificacao(["erro", "Verifique o login e senha, por favor."]);
      } else {
        var result = setLogin(res?.data);
        if (result == true) {
          nav(0);
        }
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar o login " + err]);
      console.log(err);
    }
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        tryLogin();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [loginNome, senha]);

  return (
    <div className="text-[#fff] absolute bg-[#1f1f1f] left-0 right-0 z-[4] max-w-[70em]  mx-auto top-0 bottom-0 my-auto h-fit p-10 w-fit border-2 rounded-md ">
      <h1 className="text-center text-4xl font-bold mb-10">Login</h1>
      <div className="w-[30em] mx-auto">
        <input
          onChange={(e) => setLoginNome(e.target.value)}
          value={loginNome}
          type="text"
          className={"mb-10 " + styleAll.inputSoW}
          placeholder="Login"
        />
      </div>
      <div className="w-[30em] mx-auto">
        <input
          onChange={(e) => setSenha(e.target.value)}
          value={senha}
          type="password"
          className={"mb-10 " + styleAll.inputSoW}
          placeholder="Senha"
        />
      </div>
      <div className="flex mx-auto w-[50%] mb-4">
        <button
          onClick={() => tryLogin()}
          className="px-5 mx-auto py-3 bg-dana text-3xl rounded-lg font-bold"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
