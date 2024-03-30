import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { styleAll } from "../../../css";
import Notificacao from "../../components/Notificacao";
import getLogin from "../../components/Login/getLogin";
import axios from "axios";
import InputMask from "react-input-mask";

export default function NumRC({ infos, setativoNUMRC, getMateriais }) {
  const [usuAlt, setUsuAlt] = useState("");

  useEffect(() => {
    getLogin().then((res) => {
      setUsuAlt(`${res.cod} - ${res.nome}`);
    });
  }, []);

  const [numRC, setNumRC] = useState(infos?.MatRC);

  const confirmar = async () => {
    if (numRC.length >= 8 || numRC.length == 0) {
      try {
        const res = await axios.post(
          `http://${import.meta.env.VITE_IP}/alteraNRC`,
          {
            params: {
              conCod: infos?.MatSolicitacao,
              numRC: numRC,
              colCod: "MatSolicitacao",
              tabela: "SolicMaterial",
              colNum: "MatRC",
              rcAnt: infos?.MatRC,
              colDataAlt: "MatDataAlt",
              usuAlt: usuAlt,
            },
          }
        );
        getMateriais();
        setativoNUMRC(false);
        Notificacao([
          "sucesso",
          `Alterado Número de RC da Solicitação Cód: "${infos?.MatSolicitacao}", de "${infos?.MatRC}" para "${numRC}"`,
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
        className=" opacity-50 bg-[#000] z-[5] fixed top-0 left-0 w-full h-full"
      ></div>
      <div className="fixed bg-[#1f1f1f] desktop:left-0 tablet:left-[4.5em] laptop:left-[4.5em] right-0 z-[6] mx-auto top-0 bottom-0 my-auto h-fit desktop:w-[40%] laptop:w-[60%] tablet:w-[90%] p-10 border-2 rounded-md ">
        <button
          onClick={() => setativoNUMRC(false)}
          className="absolute -mt-6 -ml-6 text-2xl"
        >
          <ImCross></ImCross>
        </button>
        <h1 className="text-3xl font-bold text-center mb-8">
          Solicitação - Alterar RC
        </h1>
        <div className="overflow-x-auto w-full mt-10">
          <div className="flex mx-10">
            <div className="w-[35%] mr-[5%] ">
              <h1 className="text-[26px] font-bold mb-2">Cód Solicitação:</h1>
              <input
                disabled={true}
                value={infos?.MatSolicitacao}
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
