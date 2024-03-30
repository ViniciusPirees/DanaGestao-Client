import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import SelectOpt from "../../components/Graficos/SelectOpt";
import axios from "axios";
import FiltroClick from "../../components/Graficos/FiltroClick";
import { HiOutlineRefresh } from "react-icons/hi";

export default function EditarTV({
  setEdit,
  setPrep,
  prep,
  conta,
  setConta,
  divisao,
  setDivisao,
  itemsTipo,
  setitemsTipo,
  status,
  setStatus,
  getDataBackLOG,
  setPrep2,
  prep2,
  setAtualiza,
  atualiza,
}) {
  const [preps, setPreps] = useState([]);

  const getPreps = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getPreparers`
      );

      var prepssort = res.data.map(({ PREPARER }) => {
        var virn = PREPARER.search(",");
        var nome =
          PREPARER.substring(virn + 2, PREPARER.length) +
          " " +
          PREPARER.substring(0, virn);
        return [nome, PREPARER];
      });

      var prepsf = prepssort.sort().map((o) => {
        return { value: o[1], label: o[0].toLowerCase() };
      });
      setPreps(prepsf);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPreps();
  }, []);

  useEffect(() => {
    localStorage.setItem("prep1", JSON.stringify(prep));
    localStorage.setItem("prep2", JSON.stringify(prep2));
    localStorage.setItem("atualizaL", JSON.stringify(atualiza));
  }, [prep, prep2, atualiza]);

  return (
    <>
      <div
        onClick={() => setEdit(false)}
        className=" opacity-50 bg-[#000] z-[5] fixed top-0 left-0 w-full h-full"
      ></div>

      <div className="fixed bg-[#1f1f1f] left-0 right-0 z-[6]  mx-auto top-0 bottom-0 my-auto h-fit w-fit p-16 border-2 rounded-md ">
        <button
          onClick={() => setEdit(false)}
          className="absolute -mt-12  right-4 text-2xl"
        >
          <ImCross></ImCross>
        </button>
        <div className="flex relative ">
          <h1 className="my-auto text-xl mx-2 font-bold">
            Atualizar a cada 5 min.
          </h1>
          <input
            id="default-checkbox"
            type="checkbox"
            onChange={(e) => {
              setAtualiza(e.target.checked);
            }}
            className="w-8"
            checked={atualiza}
          />
        </div>
        <hr className="my-5 px-4"></hr>
        <div className="flex relative ">
          <h1 className="my-auto text-xl mx-2 font-bold">
            Cost Amount (Custos):{" "}
          </h1>
          <SelectOpt options={preps} setOpt={setPrep} opt={prep} placeholder={'Requisitante(s)'} />
        </div>
        <hr className="my-5 px-4"></hr>
        <div className="flex relative ">
          <h1 className="my-auto text-xl mx-2 font-bold">Qtd. RCs Criadas:</h1>
          <SelectOpt options={preps} setOpt={setPrep2} opt={prep2} placeholder={'Requisitante(s)'} />
        </div>
        <hr className="my-5 px-4"></hr>
        <div className="relative ">
          <div className="flex">
            <h1 className="my-auto text-xl mx-2 font-bold">
              Backlog e Prazo de Entrega:{" "}
            </h1>
            <div className="mt-0">
              <button
                className="flex bg-dana text-center mx-auto rounded-md px-3 duration-200 hover:scale-105 text-xl font-bold p-2"
                onClick={() => {
                  getDataBackLOG();
                }}
              >
                Atualizar (Apenas Backlog e Prazo)
                <HiOutlineRefresh className="my-auto mx-auto ml-[0.25em] text-3xl" />
              </button>
            </div>
          </div>
          <div className="flex p-5">
            <div className="mx-2">
              <div className="my-5">
                <FiltroClick
                  titulo={"Conta"}
                  items={conta}
                  setItems={setConta}
                />
              </div>
              <div className="my-5">
                <FiltroClick
                  titulo={"Divisão"}
                  items={divisao}
                  setItems={setDivisao}
                />
              </div>
            </div>

            <div className="my-5 mx-2">
              <FiltroClick
                titulo={"Tipo"}
                items={itemsTipo}
                setItems={setitemsTipo}
              />
            </div>
            <div className="my-5 mx-2">
              <FiltroClick
                titulo={"Status"}
                items={status}
                setItems={setStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
