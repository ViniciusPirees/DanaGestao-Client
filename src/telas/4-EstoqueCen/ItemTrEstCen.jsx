import React from "react";

export default function ItemTrEstCen({ estoque, index }) {
  return (
    <>
      <tr
        className="text-xl tablet:text-lg border-b-4 border-[#4f4f4f]  "
        key={index}
      >
        <td className="text-center border-x-4 border-[#4f4f4f] break-words flex-wrap  p-4">
          {estoque?.ITEM}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap p-4">
          {estoque?.DESCRIPTION}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap p-4">
          {Number(estoque?.QUANTITY).toFixed(2).toString().replace(".", ",")}
        </td>
      </tr>
    </>
  );
}
