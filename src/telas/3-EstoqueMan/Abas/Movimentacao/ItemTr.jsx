import React from "react";
import { BsBox2, BsBoxArrowInDown, BsBoxArrowUp } from "react-icons/bs";
import { styleAll } from "../../../../css";

export default function ItemTr({ historico, index, colunas }) {
  var data = `${historico.HisData.substring(
    8,
    10
  )}/${historico.HisData.substring(5, 7)}/${historico.HisData.substring(
    2,
    4
  )} - ${historico.HisData.substring(11, 19)}`;

  return (
    <>
      <tr
        className="text-base tablet:text-sm border-b-4 border-[#4f4f4f]  "
        key={index}
      >
        {colunas.map((col, i) => {
          if (col[3]) {
            if (col[4] == "") {
              return historico?.HisSaldoAnt - historico?.HisSaldoAtu > 0 ? (
                <td className={styleAll.tabletd}>
                  <BsBoxArrowUp className=" m-2 tablet:m-1 bg-[#ff2222] rounded-lg p-1 text-5xl tablet:text-4xl" />
                </td>
              ) : (
                <td className={styleAll.tabletd}>
                  <BsBoxArrowInDown className=" m-2 tablet:m-1 bg-[#2a7a2a] rounded-lg p-1 text-5xl tablet:text-4xl" />
                </td>
              );
            } else if (col[4] == "HisData") {
              return <td className={styleAll.tabletd}>{data}</td>;
            } else if (col[4] == "QtdMovi") {
              return (
                <td className={styleAll.tabletd}>
                  {historico?.HisSaldoAtu - historico?.HisSaldoAnt > 0
                    ? "+" +
                      (
                        historico?.HisSaldoAtu - historico?.HisSaldoAnt
                      ).toString()
                    : historico?.HisSaldoAtu - historico?.HisSaldoAnt}
                </td>
              );
            } else if (col[4] == "HisEstManId") {
              return (
                <td className={styleAll.tabletd}>
                  {historico.EstManNum + " - " + historico.EstManDesc}
                </td>
              );
            } else if (col[4] == "MaqDescricao") {
              return (
                <td className={styleAll.tabletd}>
                  {historico.HisMaqCod == ""
                    ? ""
                    : historico.HisMaqCod + " - " + historico.MaqDescricao}
                </td>
              );
            } else {
              return (
                <td className={styleAll.tabletd}>{historico?.[col[4]]}</td>
              );
            }
          }
        })}
      </tr>
    </>
  );
}
