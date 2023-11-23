import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";

export default function FiltrosControle({ setFiltro, buscardados, setInput }) {
  const [value, setValue] = useState("De");
  const [codItem, setCodItem] = useState();
  const [descricao, setDescricao] = useState("");
  const [area, setArea] = useState("");
  const [local, setLocal] = useState("");

  const handleClick = () => {
    if (value == "De") {
      buscardados([descricao, "EstCenDesc"]);
      setInput(descricao);
    } else if (value == "Ci") {
      buscardados([codItem, "EstCenCod"]);
      setInput(codItem);
    } else if (value == "Ar") {
      buscardados([area, "EstCenAreaDesc"]);
      setInput(area);
    } else if (value == "Lo") {
      buscardados([local, "EstCenLoc"]);
      setInput(local);
    }
  };

  const filtrosMateriais = () => {
    if (value == "De") {
      return (
        <div className="flex">
          <input
            onChange={(e) => {
              setDescricao(e.target.value);
            }}
            value={descricao}
            className="p-3 text-2xl my-auto bg-transparent w-[100%] border-[0px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="text"
          ></input>
        </div>
      );
    }

    if (value == "Ci") {
      return (
        <div className="flex">
          <input
            onChange={(e) => {
              setCodItem(e.target.value);
            }}
            value={codItem}
            className="p-3 text-2xl my-auto bg-transparent w-[100%] border-[0px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
          ></input>
        </div>
      );
    }

    if (value == "Ar") {
      return (
        <div className="flex">
          <input
            onChange={(e) => {
              setArea(e.target.value);
            }}
            value={area}
            className="p-3 text-2xl my-auto bg-transparent w-[100%] border-[0px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="text"
          ></input>
        </div>
      );
    }

    if (value == "Lo") {
      return (
        <div className="flex">
          <input
            onChange={(e) => {
              setLocal(e.target.value);
            }}
            value={local}
            className="p-3 text-2xl my-auto bg-transparent w-[100%] border-[0px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="text"
          ></input>
        </div>
      );
    }
  };

  useEffect(() => {
    setInput("");
    setCodItem("");
    setArea("");
    setLocal("");
    setDescricao("");
    setFiltro(value);
  }, [value]);

  return (
    <div className="flex">
      <div className="mx-4">
        <select
          id="large"
          onChange={(e) => setValue(e.target.value)}
          className="block w-fit px-4 py-3 text-2xl text-gray-900 rounded-lg"
        >
          <option value="De">Descrição</option>
          <option value="Ci">Cód. Item</option>
          <option value="Ar">Área</option>
          <option value="Lo">Local</option>
        </select>
      </div>
      {filtrosMateriais()}
      <div className="flex">
        <button onClick={handleClick}>
          <ImSearch className="ml-5 bg-dana text-[3.3em] p-2 rounded-md" />
        </button>
      </div>
    </div>
  );
}
