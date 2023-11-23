import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { styleAll } from "../../../css";
import Notificacao from "../../components/Notificacao";
import axios from "axios";
import getLogin from "../../components/getLogin";
import InputMask from "react-input-mask";

export default function NumRC({ infos, setativoNUMRC, getConserto }) {
  const [numRC, setNumRC] = useState(infos.ConNumRC);

  const [usuAlt, setUsuAlt] = useState("");

  useEffect(() => {
    getLogin().then((res) => {
      setUsuAlt(`${res.cod} - ${res.nome}`);
    });
  }, []);

  const confirmar = async () => {
    if (numRC.length >= 8) {
      try {
        const res = await axios.post(
          `http://${import.meta.env.VITE_IP}:4400/alteraNRC`,
          {
            params: {
              conCod: infos.ConCod,
              numRC: numRC,
              colCod: "ConCod",
              tabela: "Conserto",
              colNum: "ConNumRC",
              rcAnt: infos?.ConNumRC,
              colDataAlt: "ConDataAlt",
              usuAlt: usuAlt,
            },
          }
        );
        getConserto();
        setativoNUMRC(false);
        Notificacao([
          "sucesso",
          `Alterado Número de RC do Conserto Cód: "${infos.ConCod}", de "${infos.ConNumRC}" para "${numRC}"`,
        ]);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao concluir" + err]);
      }
    } else {
      if (numRC.length > 0) {
        Notificacao([
          "atencao",
          "Número da RC deve ter ao menos 8 caracteres. Exemplo: XXXXXX/XX",
        ]);
      }
    }
  };
  return (
    <>
      <div
        onClick={() => setativoNUMRC(false)}
        className=" opacity-50 bg-[#000] z-[3] fixed top-0 left-0 w-full h-full"
      ></div>
      <div className="fixed bg-[#1f1f1f] left-0 right-0 z-[4] mx-auto top-0 bottom-0 my-auto h-fit w-[40%] p-10 border-2 rounded-md ">
        <button
          onClick={() => setativoNUMRC(false)}
          className="absolute -mt-6 -ml-6 text-2xl"
        >
          <ImCross></ImCross>
        </button>
        <h1 className="text-3xl font-bold text-center mb-8">
          Conserto - Alterar RC
        </h1>
        <div className="overflow-x-auto w-full mt-10">
          <div className="flex mx-10">
            <div className="w-[35%] mr-[5%]">
              <h1 className="text-[26px] font-bold mb-2">Cód Conserto:</h1>
              <input
                disabled={true}
                value={infos.ConCod}
                className={styleAll.input}
              ></input>
            </div>
            <div className="w-[60%]">
              <h1 className="text-[26px] font-bold mb-2">Número RC:</h1>
              <InputMask
                className={styleAll.inputSoW}
                mask="999999/99"
                maskChar=""
                value={numRC}
                onChange={(e) => setNumRC(e.target.value)}
              ></InputMask>
            </div>
          </div>
        </div>
        <div className="mx-auto w-fit flex">
          <button
            onClick={() => confirmar()}
            className="bg-[#21862a] p-2 mr-10 text-2xl duration-200 hover:scale-105 font-bold rounded-md mt-10"
          >
            Confirmar
          </button>
          <button
            onClick={() => setativoNUMRC(false)}
            className="bg-[#cc0000] p-2 text-2xl duration-200 hover:scale-105 font-bold rounded-md mt-10"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
