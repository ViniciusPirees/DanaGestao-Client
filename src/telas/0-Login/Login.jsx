import React, { useEffect, useState } from "react";
import Notificacao from "../components/Notificacao";
import axios from "axios";
import getLogin from "../components/Login/getLogin";
import setLogin from "../components/Login/setLogin";
import { useNavigate } from "react-router-dom";
import { styleAll } from "../../css";

export default function Login({ setLogado }) {
  const [loginNome, setLoginNome] = useState("");
  const [senha, setSenha] = useState("");
  const nav = useNavigate();
  const tryLogin = async () => {
    try {
      const res = await axios.post(
        `http://${import.meta.env.VITE_IP}/getLogin`,
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
    <div className="text-[#fff] absolute bg-[#1f1f1f] desktop:left-0 desktop:right-0 tablet:left-0 tablet:right-0 laptop:left-0 laptop:right-0  z-[4] max-w-[70em]  mx-auto top-0 bottom-0 my-auto h-fit p-10 w-fit border-2 rounded-md">
      <h1 className="text-center desktop:text-4xl tablet:text-4xl laptop:text-4xl text-3xl font-bold desktop:mb-10 laptop:mb-10 mb-5 tablet:mb-10">
        Login
      </h1>
      <div className="desktop:w-[30em] laptop:w-[30em] tablet:w-[25em] mx-auto">
        <input
          onChange={(e) => setLoginNome(e.target.value)}
          value={loginNome}
          autoFocus
          type="text"
          className={
            "desktop:mb-10 laptop:mb-10 mb-5 tablet:mb-10 " + styleAll.inputSoW + " text-sm"
          }
          placeholder="Login"
        />
      </div>
      <div className="desktop:w-[30em] laptop:w-[30em] tablet:w-[25em] mx-auto">
        <input
          onChange={(e) => setSenha(e.target.value)}
          value={senha}
          type="password"
          className={
            "desktop:mb-10 laptop:mb-10 mb-5 tablet:mb-10 " + styleAll.inputSoW + " text-sm"
          }
          placeholder="Senha"
        />
      </div>
      <div className="flex mx-auto w-[50%] mb-4">
        <button
          onClick={() => tryLogin()}
          className="desktop:px-5 laptop:px-5 tablet:px-5 px-3 mx-auto desktop:py-3 laptop:py-3 tablet:py-3 py-2 bg-dana tablet:text-3xl desktop:text-3xl laptop:text-3xl rounded-lg font-bold"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
