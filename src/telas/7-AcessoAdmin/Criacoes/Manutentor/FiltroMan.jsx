import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { styleAll } from "../../../../css";
export default function FiltroMan({ setFiltro, buscardados, setInput, changePage  }) {
  const [value, setValue] = useState("ManNome");
  const [inputF, setInputF] = useState("");

  const handleClick = () => {
    changePage({ selected: 0 }).then(buscardados([inputF, value]));
    setInput(inputF);
  };

  useEffect(() => {
    setInput("");
    setFiltro(value);
  }, [value]);

  return (
    <div className="flex">
      <div className="mx-4">
        <select
          id="large"
          onChange={(e) => setValue(e.target.value)}
          className={
            " p-3 ml-5 rounded-md text-2xl font-bold border-0 " +
            styleAll.inputSemW
          }
        >
          <option value="ManNome">Nome</option>
          <option value="ManCod">Cód. Manutentor</option>
        </select>
      </div>
      <div className="flex">
        <input
          onChange={(e) => {
            setInputF(e.target.value);
          }}
          value={inputF}
          className={
            " p-3 ml-5 rounded-md text-2xl font-bold border-0 " +
            styleAll.inputSemW
          }
          type="text"
        ></input>
      </div>
      <div className="flex">
        <button onClick={handleClick}>
          <ImSearch className="ml-5 bg-dana text-[3.3em] p-2 rounded-md" />
        </button>
      </div>
    </div>
  );
}
