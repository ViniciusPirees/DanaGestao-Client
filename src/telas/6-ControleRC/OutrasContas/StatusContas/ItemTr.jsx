import React, { useEffect, useReducer, useRef, useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import axios from "axios";

import { FaBars } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import { FaBoxes, FaCheck, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsFillImageFill } from "react-icons/bs";
import Notificacao from "../../../components/Notificacao";
import DropdownTable from "../../../components/Dropdowns/DropdownTable";
import { styleAll } from "../../../../css";
import { ImCross } from "react-icons/im";

export default function ItemTr({
  rc,
  index,
  getRCS,
  setrcs,
  colunas,
  statusPrev,
  itemsTipo,
}) {
  const [tipo, setTipo] = useState(rc?.TIPO == null ? "" : rc?.TIPO);

  const [statusM, setStatusM] = useState(
    rc?.MesPrev == null ? "" : rc?.MesPrev
  );

  const [dataPrev, setDataPrev] = useState(
    rc?.DataPrev == null ? "" : rc?.DataPrev
  );
  const [dataPrevTxt, setDataPrevTxt] = useState(
    rc?.DataPrevTxt == null ? "" : rc?.DataPrevTxt
  );
  const nav = useNavigate();
  const [editar, setEditar] = useState(false);
  const status = () => {
    if (
      (rc?.REQ_STATUS == "APPROVED" ||
        rc?.REQ_STATUS == "PRE-APPROVED") &&
      rc?.PO_NUM == null &&
      rc?.REQ_APPROVER == rc?.PREPARER &&
      (rc?.LINE_TOTAL_RC == 0 || rc?.LINE_TOTAL_RC == null) &&
      rc.PENDING_TOTAL_RC == 0 &&
      rc.RECEIVED_TOTAL_RC == 0
    ) {
      return "RC em orçamento de compras";
    } else if (
      rc?.REQ_STATUS == "INCOMPLETE" ||
      (rc?.REQ_STATUS == "IN PROCESS" &&
        rc?.PO_NUM == null &&
        rc?.REQ_APPROVER == rc?.PREPARER &&
        (rc?.LINE_TOTAL_RC > 0 ||
          rc.PENDING_TOTAL_RC > 0 ||
          rc.RECEIVED_TOTAL_RC > 0))
    ) {
      return "Requer aprovação do solicitante";
    } else if (rc?.REQ_STATUS == "IN PROCESS" && rc?.PO_NUM == null) {
      return "RC Em aprovação";
    } else if (rc?.REQ_STATUS == "APPROVED" && rc?.PO_NUM == null) {
      return "RC Aprovada sem pedido";
    } else if (
      rc?.REQ_STATUS == "APPROVED" &&
      rc?.PO_NUM != null &&
      rc.CLOSED_CODE == "OPEN"
    ) {
      return "RC Aprovada com pedido aberto";
    } else if (
      rc?.REQ_STATUS == "APPROVED" &&
      rc?.PO_NUM != null &&
      (rc.CLOSED_CODE == "CLOSED" || rc.CLOSED_CODE == "CLOSED FOR RECEIVING")
    ) {
      return "RC Aprovada com pedido entregue";
    } else if (
      rc?.REQ_STATUS != "APPROVED" &&
      rc?.REQ_STATUS != "IN PROCESS" &&
      rc?.REQ_STATUS != null
    ) {
      return "RC Cancelada";
    }
  };
  const DataHoje = new Date();
  const defaultValue = DataHoje.toLocaleDateString("en-CA");

  const alteraLinha = async () => {
    try {
      const res = await axios.post(
        `http://${import.meta.env.VITE_IP}/EditarRC`,

        {
          params: {
            rcCod: rc.REQUISITION,
            rcLine: rc.RE_LINE_NUM,
            tipo: tipo,
            statusM: statusM,
            dataPrev: dataPrev,
            dataPrevTxt: dataPrevTxt,
          },
        }
      );

      Notificacao(["sucesso", "RC alterada com sucesso"]);
    } catch (err) {
      Notificacao(["erro", "Erro ao editar RC Solicitação"]);
      console.log(err);
    }
  };

  return (
    <>
      <tr className="text-base tablet:text-sm border-b-4 border-[#4f4f4f]  " key={index}>
        {colunas.map((col, i) => {
          if (col[3]) {
            if (col[0] == "") {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {!editar ? (
                    <button
                      className="duration-500 hover:scale-105"
                      onClick={() => setEditar(true)}
                    >
                      <RiPencilFill className="text-[2.5em] rounded-md  bg-[#ff8838] p-2 tablet:p-1 m-1 -mb-[3px] " />{" "}
                    </button>
                  ) : (
                    <>
                      <div className="">
                        <button
                          className="duration-500 w-[90%] mt-[0.2rem] mx-auto hover:scale-105"
                          onClick={() => {
                            if (
                              (dataPrev >=
                                defaultValue.replace(
                                  new Date().getFullYear().toString(),
                                  String(new Date().getFullYear() + 1)
                                ) ||
                                dataPrev <= defaultValue) && (statusM != 'ENTREGUE') && (dataPrev.length > 0)
                            ) {
                              return Notificacao([
                                "atencao",
                                "Confira a data.",
                              ]);
                            } else {
                              setEditar(false);

                              alteraLinha().then(() => {
                                getRCS().then(() => {
                                  setDataPrev(
                                    rc?.DataPrev == null ? "" : rc?.DataPrev
                                  );
                                  setTipo(rc?.TIPO == null ? "" : rc?.TIPO);
                                  setStatusM(
                                    rc?.MesPrev == null ? "" : rc?.MesPrev
                                  );
                                });
                              });
                            }
                          }}
                        >
                          <FaCheck className="text-[1.25em] mx-auto rounded-t-md w-full   bg-confirm py-[0.2rem] -mb-[3px] " />{" "}
                        </button>
                        <button
                          className="duration-500   w-[90%] hover:scale-105"
                          onClick={() => {
                            setEditar(false);
                            getRCS().then(() => {
                              setDataPrev(
                                rc?.DataPrev == null ? "" : rc?.DataPrev
                              );
                              setTipo(rc?.TIPO == null ? "" : rc?.TIPO);
                              setStatusM(
                                rc?.MesPrev == null ? "" : rc?.MesPrev
                              );
                            });
                          }}
                        >
                          <ImCross className="text-[1.25em] rounded-b-md w-full bg-cancela py-[0.30rem] -mb-[3px] " />{" "}
                        </button>
                      </div>
                    </>
                  )}
                </td>
              );
            } else if (col[0] == "Tipo") {
              return (
                <td className={styleAll.tabletd + ' tablet:w-[13em]'} key={i}>
                  <DropdownTable
                    options={itemsTipo}
                    setValue={setTipo}
                    defValue={tipo}
                    disabled={!editar}
                    textTablet={"tablet:text-base"}
                  />
                </td>
              );
            } else if (col[0] == "Data Prevista.") {
              return statusM == "ENTREGUE" ? (
                <td className={styleAll.tabletd+ ' tablet:w-[10em]'} key={i}>
                  <input
                    type="text"
                    className={
                      !editar
                        ? (dataPrev.length == 0 && "text-opacity-0 ") +
                          " w-full bg-fundo  focus:outline-none focus:outline-[#fff] focus:-outline-offset-0 p-2 text-lg tablet:text-base border-[2px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        : (dataPrev.length == 0 && "text-opacity-100  ") +
                          " w-full bg-input focus:outline-none focus:outline-[#fff] focus:-outline-offset-0 p-2 text-lg tablet:text-base border-[2px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    }
                    onChange={(e) => {
                      if (e.target.value.length > 9) {
                        setDataPrevTxt(e.target.value.slice(0, 9));
                      } else {
                        setDataPrevTxt(e.target.value);
                      }
                      
                    }}
                    value={dataPrevTxt}
                    disabled={!editar}
                  />
                </td>
              ) : (
                <td className={styleAll.tabletd+ ' tablet:w-[10em]'} key={i}>
                  <input
                    type="date"
                    className={
                      !editar
                        ? (dataPrev.length == 0 && "text-opacity-0 ") +
                          " w-full bg-fundo  focus:outline-none tablet:text-base focus:outline-[#fff] focus:-outline-offset-0 p-2 text-lg  border-[2px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        : (dataPrev.length == 0 && "text-opacity-100  ") +
                          " w-full bg-input focus:outline-none tablet:text-base focus:outline-[#fff] focus:-outline-offset-0 p-2 text-lg  border-[2px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    }
                    min={defaultValue}
                    max={defaultValue.replace(
                      new Date().getFullYear().toString(),
                      String(new Date().getFullYear() + 1)
                    )}
                    onChange={(e) => {
                      setDataPrev(e.target.value);
                    }}
                    value={dataPrev}
                    disabled={!editar}
                  />
                </td>
              );
            } else if (col[0] == "Status Prev") {
              return (
                <td className={styleAll.tabletd+ ' tablet:w-[13em]'} key={i}>
                  <DropdownTable
                    options={statusPrev}
                    setValue={setStatusM}
                    defValue={statusM}
                    disabled={!editar}
                    textTablet={"tablet:text-base"}
                  />
                </td>
              );
            } else if (col[4] == "REQUISITION") {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {rc.REQUISITION + "/" + rc.RE_LINE_NUM}
                </td>
              );
            } else if (col[4] == "Status") {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {status()}
                </td>
              );
            } else if (col[4] == "CREATION_DATE") {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {`${rc.CREATION_DATE.substring(
                    8,
                    10
                  )}/${rc.CREATION_DATE.substring(
                    5,
                    7
                  )}/${rc.CREATION_DATE.substring(
                    2,
                    4
                  )} - ${rc.CREATION_DATE.substring(11, 19)}`}
                </td>
              );
            } else if (col[4] == "UNIT_RC") {
              return (
                <td className={styleAll.tabletd} key={i}>
                  R${" "}
                  {Number(rc.UNIT_RC).toFixed(2).toString().replace(".", ",")}
                </td>
              );
            } else if (col[4] == "PENDENTE") {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {rc.PENDING_TOTAL_OC == null ?? rc.PENDING_TOTAL_OC == 0
                    ? "R$ " +
                      Number(rc.PENDING_TOTAL_RC)
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")
                    : "R$ " +
                      Number(rc.PENDING_TOTAL_OC)
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}
                </td>
              );
            } else {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {rc?.[col[4]]}
                </td>
              );
            }
          }
        })}
      </tr>
    </>
  );
}
