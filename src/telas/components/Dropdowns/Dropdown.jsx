import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

export default function Dropdown({
  options,
  setValue,
  defaultValue,
  tipo,
  textTablet,
}) {
  const [dropAtivo, setDropAtivo] = useState(false);

  const optionsView = () => {
    return options?.map((opt, index) => (
      <li
        key={index}
        onMouseDown={() => {
          setValue(opt);
          setDropAtivo(false);
        }}
        className={`text-xl desktop:text-2xl ${textTablet} p-2 desktop:text-ellipsis pl-4 bg-[#1f1f1f] transition-[1s] hover:cursor-pointer hover:bg-[#353535]`}
      >
        {opt == "A" && tipo == 1 && "Ativo"}
        {opt == "I" && tipo == 1 && "Inativo"}
        {
          //---------------------------------------------------
        }
        {tipo == 2 && `Nível ${opt}`}
      </li>
    ));
  };
  return (
    <div className="dropdown">
      <div className="float-right pointer-events-none">
        <FaAngleDown className="absolute mt-4 -ml-10 z-[0] text-3xl"></FaAngleDown>
      </div>

      <button
        onClick={() => setDropAtivo(!dropAtivo)}
        className={`text-left p-3 text-xl desktop:text-2xl ${textTablet} bg-[#3B3B3B] w-full z-[2] border-[2px] rounded-md hover:cursor-pointer hover:scale-100 placeholder-shown:text-ellipsis`}
      >
        {defaultValue}
      </button>
      {dropAtivo && (
        <div className="relative">
          <ul className="w-full border-x-[3px]  z-[1] border-b-[2px] absolute rounded-b-md pt-2 -mt-2 ">
            {optionsView()}
          </ul>
        </div>
      )}
    </div>
  );
}
