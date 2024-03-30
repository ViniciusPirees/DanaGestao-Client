import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "../../../components/NavBar/NavBar";
import Titulo from "../../../components/NavBar/Titulo";
import ConfirmarAlterarSaldo from "./ConfirmarAlterarSaldo";
import Notificacao from "../../../components/Notificacao";
import { useNavigate } from "react-router-dom";
import getLogin from "../../../components/Login/getLogin";
import { styleAll } from "../../../../css";
import SearchDropdown from "../../../components/Dropdowns/SearchDropdown";
import axios from "axios";
import InputMask from "react-input-mask";
import { ImCross, ImMinus } from "react-icons/im";
import { BiPlusMedical } from "react-icons/bi";
import { FaMinus } from "react-icons/fa6";

export default function AlterarSaldo({ setInfosEst, infosEst }) {
  const [saldo, setSaldo] = useState(infosEst.EstManSaldo);
  const [ativo, setAtivo] = useState(false);
  const [os, setOS] = useState("");
  const navigate = useNavigate();
  const [qtdMov, setqtdMov] = useState(Number(0));

  const [maquinas, setMaquinas] = useState([]);
  const [maquina, setMaquina] = useState("");

  useEffect(() => {
    const getMaquinas = async () => {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}/GetMaquinas`
        );
        setMaquinas(res.data);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar Máquinas" + err]);
      }
    };
    getMaquinas();
  }, []);

  //MANUTENTOR
  const [manutentores, setManutentores] = useState([]);
  const [manutentor, setManutentor] = useState("");
  useEffect(() => {
    const getManutentor = async () => {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}/getSearchDrop`,
          {
            params: {
              tabela: "Manutentor",
              order: "ManNome",
            },
          }
        );
        setManutentores(res.data);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar manutentores" + err]);
      }
    };
    getManutentor();
  }, []);

  const confirmar = async () => {
    if (manutentor.length == 0) {
      return Notificacao(["erro", `Necessário selecionar o manutentor.`]);
    } else if (saldo == infosEst.EstManSaldo) {
      Notificacao(["erro", "Saldo anterior tem o mesmo valor do novo Saldo"]);
    } else if (saldo < 0) {
      Notificacao(["erro", "Saldo não pode ser negativo"]);
    } else if (
      maquina.length == 0 &&
      saldo < infosEst.EstManSaldo &&
      manutentor[2] != 1
    ) {
      Notificacao(["erro", "Necessário selecionar a máquina"]);
    } else if (
      os.length == 0 &&
      saldo < infosEst.EstManSaldo &&
      manutentor[2] != 1
    ) {
      Notificacao(["erro", "Necessário digitar OS"]);
    } else if (
      os.length != 6 &&
      saldo < infosEst.EstManSaldo &&
      manutentor[2] != 1
    ) {
      Notificacao(["erro", "OS tem que ter 6 digitos"]);
    } else {
      try {
        const res = await axios.post(
          `http://${import.meta.env.VITE_IP}/alteraSaldo`,
          {
            params: {
              saldo: saldo,
              itemEst: infosEst,
              maquina:
                saldo > infosEst.EstManSaldo ||
                (manutentor[2] == 1 && maquina.length == 0)
                  ? ""
                  : maquina[1],
              manutentor: manutentor[0],
              os:
                saldo > infosEst.EstManSaldo ||
                (manutentor[2] == 1 && maquina.length == 0)
                  ? null
                  : os,
            },
          }
        );
        setInfosEst("");

        Notificacao(["sucesso", "Movimentação feita com sucesso"]);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao alterar o saldo" + err]);
      }
    }
  };

  useEffect(() => {
    setSaldo(Number(infosEst.EstManSaldo) + Number(qtdMov));
  }, [qtdMov]);

  return (
    <>
      <div
        onClick={() => setInfosEst("")}
        className=" opacity-50 bg-[#000] z-[5] fixed top-0 left-0 w-full h-full"
      ></div>
      <div className="absolute bg-[#1f1f1f] left-0 laptop:left-[4.5em] tablet:left-[4.5em] right-0 z-[6] mx-auto top-0 bottom-0 my-auto h-fit desktop:w-[70em] laptop:w-[90%] tablet:w-[90%]  p-10 border-2 rounded-md ">
        <div className="flex mb-10">
          <div className="w-[20%] desktop:mx-10 laptop:mx-3 tablet:mx-3">
            <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2">Cód. Item:</h1>
            <input
              disabled
              type="number"
              defaultValue={infosEst.EstManNum}
              className={styleAll.inputSoWDis+ ' laptop:text-xl tablet:text-xl'}
            ></input>
          </div>
          <div className="w-[80%] desktop:mx-10 laptop:mx-3 tablet:mx-3">
            <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2">Descrição:</h1>
            <input
              disabled
              defaultValue={infosEst.EstManDesc}
              type="text"
              className={styleAll.inputSoWDis + ' laptop:text-xl tablet:text-xl'}
            ></input>
          </div>
        </div>
        <div className="flex mb-10">
          <div className="w-[20%] desktop:mx-10 laptop:mx-3 tablet:mx-3">
            <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2">Est. Mínimo:</h1>
            <input
              disabled
              type="number"
              defaultValue={infosEst.EstManEstMin}
              className={styleAll.inputSoWDis+ ' laptop:text-xl tablet:text-xl'}
            ></input>
          </div>
          <div className="w-[20%] desktop:mx-10 laptop:mx-3 tablet:mx-3">
            <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2">Est. Máximo:</h1>
            <input
              disabled
              defaultValue={infosEst.EstManEstMax}
              type="number"
              className={styleAll.inputSoWDis+ ' laptop:text-xl tablet:text-xl'}
            ></input>
          </div>
          <div className="w-[50%] desktop:mx-10 laptop:mx-3 tablet:mx-3">
            <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2">Manutentor:</h1>
            <SearchDropdown
              options={manutentores}
              setValue={setManutentor}
              opt={4}
              defValue={""}
              textTablet={'laptop:text-xl tablet:text-xl'}
            ></SearchDropdown>
          </div>
        </div>
        <div className="flex mb-10">
          <div className="w-[20%] desktop:mx-10 laptop:mx-3 tablet:mx-3">
            <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2">OS:</h1>
            <InputMask
              className={styleAll.inputSoW+ ' laptop:text-xl tablet:text-xl'}
              mask="999999"
              maskChar=""
              value={os}
              onChange={(e) => setOS(e.target.value)}
            ></InputMask>
          </div>
          <div className="w-[80%] desktop:mx-10 laptop:mx-3 tablet:mx-3">
            <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2">Máquina:</h1>
            <SearchDropdown
              options={maquinas}
              setValue={setMaquina}
              opt={7}
              defValue={""}
              textTablet={'laptop:text-xl tablet:text-xl'}
            ></SearchDropdown>
          </div>
        </div>
        <div className="flex">
          <div className="w-[25%] desktop:mx-10 laptop:mx-3 tablet:mx-3">
            <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2">Saldo Atual:</h1>
            <input
              autoFocus
              disabled
              defaultValue={infosEst.EstManSaldo}
              type="number"
              className={styleAll.inputSoWDis+ ' laptop:text-xl tablet:text-xl'}
            ></input>
          </div>
          <div className="w-[50%] desktop:mx-10 laptop:mx-3 tablet:mx-3">
            <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2">Qtd. Movimentar:</h1>
            <div className="flex">
              <button
                className="my-auto"
                onClick={() => setqtdMov(Number(qtdMov) - 1)}
              >
                <ImMinus className="text-5xl bg-dana  p-3 laptop:p-4 tablet:p-4 rounded-lg"></ImMinus>
              </button>
              <input
                autoFocus
                value={qtdMov}
                onChange={(e) => {
                  setqtdMov(e.target.value);
                }}
                type="number"
                className={"mx-2 " + styleAll.inputSoW+ ' laptop:text-xl tablet:text-xl'}
              ></input>
              <button
                className="my-auto"
                onClick={() => setqtdMov(Number(qtdMov) + 1)}
              >
                <BiPlusMedical className="text-5xl  bg-dana  font-extrabold p-2 laptop:p-3 tablet:p-3 rounded-lg"></BiPlusMedical>
              </button>
            </div>
          </div>
          <div className="w-[25%] desktop:mx-10 laptop:mx-3 tablet:mx-3">
            <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2">Novo Saldo:</h1>
            <input
              autoFocus
              disabled
              value={saldo}
              type="number"
              className={styleAll.inputSoWDis+ ' laptop:text-xl tablet:text-xl'}
            ></input>
          </div>
        </div>
        <div className="mx-auto w-fit flex">
          <button
            onClick={() => confirmar()}
            className="bg-[#21862a] p-2 mr-10 duration-200 hover:scale-105 text-2xl laptop:text-xl tablet:text-xl font-bold rounded-md mt-10"
          >
            Confirmar
          </button>
          <button
            onClick={() => setInfosEst("")}
            className="bg-[#cc0000] p-2 text-2xl duration-200 hover:scale-105 laptop:text-xl tablet:text-xl font-bold rounded-md mt-10"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
