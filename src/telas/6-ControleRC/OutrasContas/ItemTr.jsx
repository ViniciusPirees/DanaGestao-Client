import React, { useEffect, useRef, useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import axios from "axios";

import { FaBars } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import { FaBoxes, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsFillImageFill } from "react-icons/bs";
import Notificacao from "../../components/Notificacao";
import { styleAll } from "../../../css";

export default function ItemTr({ rc, index, colunas }) {
  const nav = useNavigate();

  const status = () => {
    if (
      rc?.REQ_STATUS == "PRE-APPROVED" ||
      (rc?.REQ_STATUS == "APPROVED" &&
        rc?.PO_NUM == null &&
        rc?.REQ_APPROVER == rc?.PREPARER &&
        (rc?.LINE_TOTAL_RC == 0 || rc?.LINE_TOTAL_RC == null) &&
        rc.PENDING_TOTAL_RC == 0 &&
        rc.RECEIVED_TOTAL_RC == 0)
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

  return (
    <>
      <tr className="text-base tablet:text-sm  border-[#4f4f4f]" key={index}>
        {colunas.map((col, i) => {
          if (col[3]) {
            if (col[4] == "CREATION_DATE") {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {" "}
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
            } else if (col[4] == "Status") {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {status()}
                </td>
              );
            } else if (col[4] == "REQUISITION") {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {" "}
                  {rc.ConCod == null &&
                    rc.MatSolicitacao == null &&
                    rc.REQUISITION + "/" + rc.RE_LINE_NUM}
                  {rc.ConCod > 0 && rc.MatSolicitacao == null && (
                    <button
                      className="underline text-dana"
                      onClick={() => {
                        nav("/ConsertoExterno", {
                          state: { conCod: rc.ConCod },
                        });
                      }}
                    >
                      {rc.REQUISITION}/{rc.RE_LINE_NUM}
                    </button>
                  )}
                  {rc.MatSolicitacao > 0 && rc.ConCod == null && (
                    <button
                      className="underline text-dana"
                      onClick={() => {
                        nav("/ConsultarSolicitacao", {
                          state: { matCod: rc.MatSolicitacao },
                        });
                      }}
                    >
                      {rc.REQUISITION}/{rc.RE_LINE_NUM}
                    </button>
                  )}
                </td>
              );
            } else if (col[4] == "DATA_RECEBIMENTO") {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {rc.DATA_RECEBIMENTO != null
                    ? `${rc.DATA_RECEBIMENTO?.substring(
                        8,
                        10
                      )}/${rc.DATA_RECEBIMENTO?.substring(
                        5,
                        7
                      )}/${rc.DATA_RECEBIMENTO?.substring(2, 4)}`
                    : ""}
                </td>
              );
            } else if (col[4] == "VALOR_LIQUIDO") {
              return (
                <td className={styleAll.tabletd} key={i}>
                  {rc.VALOR_LIQUIDO != null
                    ? `R$ ${Number(rc.VALOR_LIQUIDO)
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}`
                    : ""}
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
            } else if (col[0].search("Valor") >= 0) {
              return (
                <td className={styleAll.tabletd} key={i}>
                  R${" "}
                  {Number(rc?.[col[4]]).toFixed(2).toString().replace(".", ",")}
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
