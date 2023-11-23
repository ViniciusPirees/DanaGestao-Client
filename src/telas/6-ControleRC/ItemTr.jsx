import React, { useEffect, useRef, useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import axios from "axios";

import { FaBars } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import { FaBoxes, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsFillImageFill } from "react-icons/bs";
import Notificacao from "../components/Notificacao";

export default function ItemTr({ rc, index }) {
  const nav = useNavigate();

  const status = () => {
    if (rc?.REQ_STATUS == "IN PROCESS" && rc?.PO_NUM == null) {
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
      rc.CLOSED_CODE == "CLOSED"
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
      <tr className="text-xl border-b-4 border-[#4f4f4f]  " key={index}>
        <td className="text-center border-r-4 border-[#4f4f4f] break-words flex-wrap max-w-xs p-4">
          {rc.ORG}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {`${rc.CREATION_DATE.substring(8, 10)}/${rc.CREATION_DATE.substring(
            5,
            7
          )}/${rc.CREATION_DATE.substring(2, 4)} - ${rc.CREATION_DATE.substring(
            11,
            19
          )}`}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {rc.PREPARER}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          {status()}
        </td>
        {/*<td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap  max-w-xs p-4">
          {rc.REQUISITION}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {rc.RE_LINE_NUM}
  </td>*/}
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap  max-w-xs p-4">
          {rc.ConCod == null &&
            rc.MatSolicitacao == null &&
            rc.REQUISITION + "/" + rc.RE_LINE_NUM}
          {rc.ConCod > 0 && rc.MatSolicitacao == null && (
            <button
              className="underline text-dana"
              onClick={() => {
                nav("/rcExterno", {
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

        <td className="text-center border-r-4 border-[#4f4f4f]  break-words max-w-xs p-4">
          {rc.REQ_APPROVER}
        </td>

        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          {rc.VENDOR_NAME}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          {rc.ITEM}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          {rc.ITEM_DESCRIPTION}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          {rc.PENDING_QUANTITY_RC}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          R$ {Number(rc.UNIT_RC).toFixed(2).toString().replace(".", ",")}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          R$ {Number(rc.LINE_TOTAL_RC).toFixed(2).toString().replace(".", ",")}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          R${" "}
          {Number(rc.PENDING_TOTAL_RC).toFixed(2).toString().replace(".", ",")}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          R${" "}
          {Number(rc.RECEIVED_TOTAL_RC).toFixed(2).toString().replace(".", ",")}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          R$ {Number(rc.UNIT_OC).toFixed(2).toString().replace(".", ",")}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          R${" "}
          {Number(rc.PENDING_TOTAL_OC).toFixed(2).toString().replace(".", ",")}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
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

        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          {rc.LOCAL}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          {rc.CHARGE_ACCOUNT}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          {rc.PREPARER}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          {rc.JUSTIFICATION}
        </td>
        <td className="text-center  border-r-4 border-[#4f4f4f]  break-words max-w-xs p-4">
          {rc.REQ_STATUS}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          {rc.CLOSED_CODE}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          {rc.OBC_SDCV}
        </td>
        <td className="border-r-4 border-[#4f4f4f] text-center  break-words max-w-xs p-4">
          {rc.PO_NUM}
        </td>
      </tr>
    </>
  );
}
