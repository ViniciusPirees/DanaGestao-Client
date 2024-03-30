import React, { useEffect, useState } from "react";
import { styleAll } from "../../../../../css";
import TableItemPrint from "./TableItemPrint";
import { FaPrint } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import Kanban from "./kanban";
import Notificacao from "../../../../components/Notificacao";

export default function TableImprimir({ arrPrint, setArrPrint }) {
  const renderTableData = () => {
    return pageArray.map((e, i) => {
      return (
        <TableItemPrint
          item={e}
          key={i}
          setArrPrint={setArrPrint}
          index={i}
          arrPrint={arrPrint}
        />
      );
    });
  };

  const [pageArray, setPageArray] = useState(arrPrint);
  const [pagesTotal, setpagesTotal] = useState();
  const [pageN, setPageN] = useState(0);

  useEffect(() => {
    var min = pageN * 10;
    var max = pageN * 10 + 10;
    var obj = Object.entries(arrPrint)
      .slice(min, max)
      .map((item) => item[1]);
    setPageArray(obj);
    setpagesTotal(Math.ceil(arrPrint.length / 10));
  }, [arrPrint]);

  const changePage = async ({ selected }) => {
    var min = selected * 10;
    var max = selected * 10 + 10;
    var obj = Object.entries(arrPrint)
      .slice(min, max)
      .map((item) => item[1]);
    setPageArray(obj);
    setPageN(selected);
  };

  const printKanban = () => {
    if (arrPrint.length == 0) {
      return Notificacao([
        "atencao",
        "Necessário adicionar item para imprimir.",
      ]);
    } else {
      var pd = false;
      arrPrint.map((val) => {
        if (val.qtd <= 0) {
          pd = true;
          Notificacao(["atencao", "Quantidade dos itens não pode ser 0."]);
        }
      });
      if (!pd) {
        Kanban({ arrPrint: arrPrint });
      }
    }
  };

  return (
    <>
      <div className="laptop:mt-[7.5em] desktop:my-9  tablet:absolute tablet:mt-16 ">
        <div className="laptop:relative desktop:relative  mx-5   ">
          <button
            onClick={() => printKanban()}
            className="flex bg-dana rounded-md duration-200 hover:scale-105  text-2xl tablet:text-xl laptop:text-xl font-bold p-2"
          >
            Imprimir
            <FaPrint className="my-auto mx-auto ml-3" />
          </button>
        </div>
      </div>
      <div className="rounded-lg laptop:mt-6  ">
        <table className="table  rounded-lg mt-[-0.96rem] overflow-x-auto w-[100-vh - 8.5em]">
          <thead className="">
            <tr className="text-lg laptop:text-base bg-dana font-extrabold">
              <th className="p-3 w-[7em] tablet:w-[7em] laptop:w-[4em] rounded-ss-xl">
                Item
              </th>
              <th className="laptop:w-[20em] desktop:w-[20em] tablet:w-[40em] ">Descrição</th>
              <th className=" w-[6em] ">Qtd.</th>
              <th className=" w-[3em] rounded-se-xl"></th>
            </tr>
          </thead>
          <tbody className="[&>*:nth-child(odd)]:bg-fundo [&>*:nth-child(even)]:bg-[#292929]">
            {renderTableData()}
          </tbody>
        </table>
        <div className="mb-14 mt-6 flex float-left tablet:float-right relative">
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Próxima"}
            pageCount={pagesTotal}
            forcePage={pageN}
            onPageChange={changePage}
            containerClassName="bg-[#3B3B3B] flex rounded-lg h-full text-xl laptop:text-lg tablet:text-lg text-white font-bold"
            previousClassName="py-2 duration-200 rounded-s-lg  hover:bg-dana"
            previousLinkClassName="py-2 px-5"
            nextClassName="py-2 duration-200 rounded-e-lg  hover:bg-dana"
            nextLinkClassName="py-2 px-5"
            activeClassName="bg-dana"
            pageClassName="py-2 duration-200 hover:bg-dana"
            pageLinkClassName="px-4 py-2"
            pageRangeDisplayed={3}
            breakClassName="py-2 duration-200 hover:bg-dana"
            breakLinkClassName="py-2 px-5"
          />
        </div>
      </div>
    </>
  );
}
