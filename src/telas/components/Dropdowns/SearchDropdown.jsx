import React, { useEffect, useRef, useState } from "react";

import { MdClose } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
export default function SearchDropdown({
  options,
  setValue,
  opt,
  defValue,
  reset,
  setState,
  textTablet,
}) {
  const [selectedOption, setSelectedOption] = useState(defValue);
  const [searchText, setSearchText] = useState(defValue);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [ulstyle, setulstyle] = useState("hidden");
  const ref = useRef(null);

  useEffect(() => {
    if (reset) {
      setSearchText("");
      setSelectedOption("");
      setState({ reset: false });
    }
  }, [reset]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option[0]);
    setSearchText(option[0]);
    setValue(option);
  };

  // Function to handle input text change
  const handleInputChange = (event) => {
    const text = event.target.value;
    setSearchText(text);

    switch (opt) {
      case 1:
        var filtered = options.filter((maquina) =>
          maquina.MaqCodigo.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredOptions(filtered);
        break;
      case 2:
        var filtered = options.filter((solic) =>
          solic.SntDescricao.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredOptions(filtered);
        break;
      case 3:
        var filtered = options.filter((area) =>
          area.AreaDesc.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredOptions(filtered);
        break;
      case 4:
        var filtered = options.filter((manut) =>
          manut.ManNome.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredOptions(filtered);
        break;
      case 5:
        var filtered = options.filter((forn) =>
          forn.ForDes.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredOptions(filtered);
        break;
      case 6:
        var filtered = options.filter((tipm) =>
          tipm.TipMatDesc.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredOptions(filtered);
        break;
      case 7:
        var filtered = options.filter((maquina) => {
          return (
            maquina.MaqCodigo.toLowerCase().includes(text.toLowerCase()) +
            maquina.MaqDescricao.toLowerCase().includes(text.toLowerCase())
          );
        });
        setFilteredOptions(filtered);
        break;
    }
  };

  const optOptions = () => {
    if (filteredOptions?.length == 0) {
      return (
        <li
          className={`text-xl desktop:text-2xl  p-2 text-[#979797] bg-[#1f1f1f]`}
        >
          Não encontrado
        </li>
      );
    }

    if (opt == 1) {
      return filteredOptions?.map((opt, index) => (
        <li
          key={index}
          onMouseDown={() =>
            handleOptionSelect([
              opt.MaqCodigo,
              opt.MaqDescricao,
              opt.MaqDiv,
              opt.MaqSetor,
              opt.MaqDivEbs,
            ])
          }
          className={`text-xl desktop:text-2xl ${textTablet} p-2  pl-4 bg-[#1f1f1f] transition-[1s] hover:cursor-pointer hover:bg-[#353535]`}
        >
          {opt.MaqCodigo}
        </li>
      ));
    } else if (opt == 2) {
      return filteredOptions?.map((opt, index) => (
        <li
          key={index}
          onMouseDown={() => handleOptionSelect([opt.SntDescricao, opt.SntCod])}
          className={`text-xl desktop:text-2xl ${textTablet} p-2  pl-4 bg-[#1f1f1f] transition-[1s] hover:cursor-pointer hover:bg-[#353535]`}
        >
          {opt.SntDescricao}
        </li>
      ));
    } else if (opt == 3) {
      return filteredOptions?.map((opt, index) => (
        <li
          key={index}
          onMouseDown={() => handleOptionSelect([opt.AreaDesc, opt.AreaCod])}
          className={`text-xl desktop:text-2xl ${textTablet} p-2  pl-4 bg-[#1f1f1f] transition-[1s] hover:cursor-pointer hover:bg-[#353535]`}
        >
          {opt.AreaDesc}
        </li>
      ));
    } else if (opt == 4) {
      return filteredOptions?.map((opt, index) => (
        <li
          key={index}
          onMouseDown={() =>
            handleOptionSelect([opt.ManNome, opt.ManCod, opt.ManAltera])
          }
          className={`text-xl desktop:text-2xl ${textTablet} p-2  pl-4 bg-[#1f1f1f] transition-[1s] hover:cursor-pointer hover:bg-[#353535]`}
        >
          {opt.ManNome}
        </li>
      ));
    } else if (opt == 5) {
      return filteredOptions?.map((opt, index) => (
        <li
          key={index}
          onMouseDown={() => handleOptionSelect([opt.ForDes, opt.ForCod])}
          className={`text-xl desktop:text-2xl ${textTablet} p-2  pl-4 bg-[#1f1f1f] transition-[1s] hover:cursor-pointer hover:bg-[#353535]`}
        >
          {opt.ForDes}
        </li>
      ));
    } else if (opt == 6) {
      return filteredOptions?.map((opt, index) => (
        <li
          key={index}
          onMouseDown={() =>
            handleOptionSelect([opt.TipMatDesc, opt.TipMatCod])
          }
          className={`text-xl desktop:text-2xl ${textTablet} p-2  pl-4 bg-[#1f1f1f] transition-[1s] hover:cursor-pointer hover:bg-[#353535]`}
        >
          {opt.TipMatDesc}
        </li>
      ));
    } else if (opt == 7) {
      return filteredOptions?.map((opt, index) => (
        <li
          key={index}
          onMouseDown={() =>
            handleOptionSelect([
              opt.MaqCodigo + " - " + opt.MaqDescricao,
              opt.MaqCodigo,
              opt.MaqDescricao,
            ])
          }
          className={
            "text-xl desktop:text-2xl tablet:text-2xl p-2 desktop:text-ellipsis pl-4 bg-[#1f1f1f] transition-[1s] hover:cursor-pointer hover:bg-[#353535]"
          }
        >
          {opt.MaqCodigo + " - " + opt.MaqDescricao}
        </li>
      ));
    }
  };

  return (
    <div className="dropdown">
      {selectedOption == "" ? (
        <div className="float-right pointer-events-none">
          <FaAngleDown className="absolute mt-4 -ml-10 z-[0] text-3xl"></FaAngleDown>
        </div>
      ) : (
        <div
          className="float-right hover:cursor-pointer"
          onClick={() => {
            setSelectedOption("");
            setSearchText("");
            setValue("");
          }}
        >
          <MdClose className="absolute mt-[0.29em] -ml-11 z-[0] text-4xl"></MdClose>
        </div>
      )}
      <input
        type="text"
        onFocus={() => setulstyle("block")}
        onBlur={() => setulstyle("hidden")}
        autoComplete="off"
        ref={ref}
        placeholder="Pesquisar"
        value={searchText}
        className={`p-3 pr-10 text-xl desktop:text-2xl ${textTablet} bg-input focus:outline-1 focus:outline-[#fff] focus:-outline-offset-2 w-full z-100 border-[2px] desktop:text-ellipsis rounded-md hover:cursor-pointer placeholder-shown:text-ellipsis`}
        onChange={handleInputChange}
      />

      <div className="relative  z-50 ">
        <ul
          className={`w-full border-x-[4px] max-h-[15em] tablet:max-h-[20em] shadow overflow-y-auto border-b-[4px] absolute rounded-b-md pt-2 -mt-2 ${ulstyle} `}
        >
          {optOptions()}
        </ul>
      </div>
    </div>
  );
}
