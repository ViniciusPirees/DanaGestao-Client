import React from "react";
import { BsBox2, BsBoxArrowInDown, BsBoxArrowUp } from "react-icons/bs";

export default function ItemTr({ historico, index }) {
  var data = `${historico.HisData.substring(
    8,
    10
  )}/${historico.HisData.substring(5, 7)}/${historico.HisData.substring(
    2,
    4
  )} - ${historico.HisData.substring(11, 19)}`;

  return (
    <>
      <tr className="text-xl border-b-4 border-[#4f4f4f]  " key={index}>
        {historico?.HisSaldoAnt - historico?.HisSaldoAtu > 0 ? (
          <td className="">
            <BsBoxArrowUp className=" m-2 bg-[#ff2222] rounded-lg p-2 text-6xl" />
          </td>
        ) : (
          <td>
            <BsBoxArrowInDown className=" m-2 bg-[#2a7a2a] rounded-lg p-2 text-6xl" />
          </td>
        )}
        <td className="text-center border-x-4 border-[#4f4f4f] break-words flex-wrap max-w-xs p-4">
          {data}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {historico.HisEstManId +" - "+historico.EstManDesc}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {historico.HisMaqCod + " - " + historico.MaqDescricao}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {historico.HisUsuAlt}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap  max-w-xs p-4">
          {historico.HisSaldoAnt}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap  max-w-xs p-4">
          {historico?.HisSaldoAtu - historico?.HisSaldoAnt > 0 ? '+'+(historico?.HisSaldoAtu - historico?.HisSaldoAnt).toString() : historico?.HisSaldoAtu - historico?.HisSaldoAnt}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {historico.HisSaldoAtu}
        </td>
      </tr>
    </>
  );
}
