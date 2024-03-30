import { useState, useCallback, useEffect, useRef } from "react";
import ThTable from "./ThTable";

export default function Table({ headers, tableContent }) {
  const createHeaders = (headers) => {
    return headers.map((item) => ({
      text: item[0],
      defW: item[1],
      minW: item[2],
      usado: item[3],
      colnam: item[4],
      defWTablet: item[5],
    }));
  };

  const columns = createHeaders(headers);

  var total = 0;
  columns.map((col, i) => {
    if (col.usado == true) {
      total = total + 1;
    }
  });

  const tableRef = useRef();
  const divRef = useRef();
  return (
    <div
      ref={divRef}
      className="w-[100vh - 8.5em] overflow-x-auto mt-8 mb-10 rounded-xl  "
    >
      <table
        ref={tableRef}
        className="table w-max rounded-lg mx-auto overflow-x-auto "
      >
        <thead className="">
          <tr className=" text-lg tablet:text-base  select-none  bg-dana font-extrabold">
            {columns.map(
              ({ text, defW, minW, usado, colnam, defWTablet }, i) =>
                usado && (
                  <ThTable
                    key={i + defW + text}
                    title={text}
                    colnam={colnam}
                    defW={defW}
                    i={i}
                    minW={minW}
                    tableRef={tableRef}
                    divRef={divRef}
                    totalqtd={total - 1}
                    columns={columns}
                    defWTablet={defWTablet}
                  ></ThTable>
                )
            )}
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(odd)]:bg-fundo [&>*:nth-child(even)]:bg-[#292929]">
          {tableContent}
        </tbody>
      </table>
    </div>
  );
}
