import React, { useEffect } from "react";
import { ImCross } from "react-icons/im";

export default function TelaItem({ itens, setTelaItem }) {
  const renderItens = () => {
    return itens?.map((item, i) => {
      return (
        <tr className="text-xl border-b-4 border-[#4f4f4f]  " key={i}>
          <td className="text-center border-r-4 border-[#4f4f4f] break-words  flex-wrap max-w-xs p-4">
            {item.MatItemDescricao}
          </td>
          <td className="text-center border-l-4 border-[#4f4f4f] break-words  flex-wrap max-w-xs p-4">
            {item.MatItemQtd}
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setTelaItem(false);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <>
      <div
        onClick={() => setTelaItem(false)}
        className=" opacity-50 bg-[#000] z-[7] fixed top-0 left-0 w-full h-full"
      ></div>
      <div className="fixed bg-[#1f1f1f] left-0 tablet:left-[4.5em] right-0 z-[8] mx-auto top-0 bottom-0 my-auto h-fit w-[70%] p-10 border-2 rounded-md ">
        <button
          onClick={() => setTelaItem(false)}
          className="absolute -mt-6 -ml-6 text-2xl"
        >
          <ImCross></ImCross>
        </button>
        <h1 className="text-2xl font-bold text-center mb-8">
          Itens do Conserto {}
        </h1>
        <div className="overflow-x-auto w-full mt-10">
          <table className="table rounded-lg mx-auto overflow-x-auto w-full">
            <thead>
              <tr className="text-xl bg-dana font-extrabold text-[#fff]">
                <th className="p-3 w-[80%] rounded-s-md">Descrição.</th>
                <th className="w-[20%]  rounded-e-md">Quantidade</th>
              </tr>
            </thead>
            <tbody>{renderItens()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
