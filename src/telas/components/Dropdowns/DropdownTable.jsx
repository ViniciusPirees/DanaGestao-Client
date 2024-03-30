import React, { useEffect, useRef, useState } from "react";

import { MdClose } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
export default function DropdownTable({
  options,
  setValue,
  defValue,
  disabled,
  textTablet
}) {
  const [selectedOption, setSelectedOption] = useState(defValue);
  const [searchText, setSearchText] = useState(defValue);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [ulstyle, setulstyle] = useState("hidden");
  const ref = useRef(null);
  useEffect(() => {
    if (defValue.length == 0) {
      setSelectedOption("");
      setSearchText("");
      setValue("");
    }
  }, [defValue]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchText(option);
    setValue(option);
  };

  // Function to handle input text change
  const handleInputChange = (event) => {
    const text = event.target.value;
    setSearchText(text);

    var filtered = options.filter((opt) => {
      return opt.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredOptions(filtered);
  };

  const optOptions = () => {
    if (filteredOptions?.length == 0) {
      return (
        <li className={`text-lg p-2 text-[#979797] bg-[#1f1f1f] ${textTablet}`}>
          Não encontrado
        </li>
      );
    }

    return filteredOptions?.map((opt, index) => (
      <li
        key={index}
        onMouseDown={() => handleOptionSelect(opt)}
        className={
          `text-lg ${textTablet} p-2 desktop:text-ellipsis pl-4 bg-[#1f1f1f] transition-[1s] hover:cursor-pointer hover:bg-[#353535]`
        }
      >
        {opt}
      </li>
    ));
  };

  return (
    <div className="dropdown">
      {!disabled &&
        (selectedOption == "" ? (
          <div className="float-right pointer-events-none">
            <FaAngleDown className="relative mt-[0.68rem] -ml-10 z-[0] text-3xl"></FaAngleDown>
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
            <MdClose className="relative mt-[0.14em] -ml-[2.65rem] z-[0] text-4xl"></MdClose>
          </div>
        ))}
      <input
        type="text"
        onFocus={() => setulstyle("block")}
        onBlur={() => setulstyle("hidden")}
        autoComplete="off"
        ref={ref}
        placeholder={disabled ? "" : "Pesquisar"}
        value={searchText}
        className={
          disabled
            ? `p-2 pr-10 text-lg ${textTablet} bg-fundo focus:outline-1 focus:outline-[#fff] focus:-outline-offset-2 w-full z-100 border-[2px] desktop:text-ellipsis rounded-md hover:cursor-pointer placeholder-shown:text-ellipsis`
            : `p-2 pr-10 text-lg ${textTablet} bg-input focus:outline-1 focus:outline-[#fff] focus:-outline-offset-2 w-full z-100 border-[2px] desktop:text-ellipsis rounded-md hover:cursor-pointer placeholder-shown:text-ellipsis`
        }
        onChange={handleInputChange}
        disabled={disabled}
      />

      <div className="relative  z-50 ">
        <ul
          className={
            "w-full border-x-[4px] z-[51] max-h-[15em] shadow overflow-y-auto border-b-[4px] absolute rounded-b-md pt-2 -mt-2 " +
            ulstyle
          }
        >
          {optOptions()}
        </ul>
      </div>
    </div>
  );
}
