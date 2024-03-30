import React from "react";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

export default async function Excel({ rcs }) {
  const wb = new Workbook();

  const ws = wb.addWorksheet("Planilha 1");

  ws.getRow(1).font = { bold: true, color: { argb: "FFFFFF" } };
  ws.getRow(1).values = [
    "Org.",
    "Data",
    "Preparador",
    "Status",
    "Requisição",
    "Aprovador",
    "Fornecedor",
    "Nota Fiscal",
    "Valor NF",
    "Data Recebimento",
    "Item",
    "Descrição",
    "Qtd. Pendente",
    "Valor Unid. RC",
    "Valor Total RC",
    "Valor Pendente RC",
    "Valor Recebido RC",
    "Valor Unid. OC",
    "Valor Pendente OC",
    "Valor Pendente",
    "Local",
    "Conta Cobrança",
    "Requisitante",
    "Justificação",
    "Status REQ",
    "Code",
    "OBC",
    "PO_NUM",
  ];

  ws.getCell("A1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("B1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("C1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("D1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("E1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("F1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("G1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("H1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("I1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("J1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("K1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };

  ws.getCell("L1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };

  ws.getCell("M1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };

  ws.getCell("N1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("O1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("P1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("Q1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("R1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("S1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("T1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("U1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };

  ws.getCell("V1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };

  ws.getCell("W1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("X1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("Y1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("Z1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("AA1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };
  ws.getCell("AB1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1C85C7" },
  };

  ws.columns = [
    { key: "ORG", width: 8 },
    { key: "data", width: 20 },
    { key: "prep", width: 20 },
    { key: "stat", width: 30 },
    { key: "req", width: 12 },
    { key: "appr", width: 20 },
    { key: "forn", width: 35 },
    { key: "nf", width: 15 },
    { key: "valornf", width: 15 },
    { key: "datarece", width: 15 },
    { key: "item", width: 20 },
    { key: "desc", width: 40 },
    { key: "qtd", width: 15 },
    { key: "valorRC", width: 15 },
    { key: "valtotrc", width: 15 },
    { key: "valpendrc", width: 15 },
    { key: "valorrecprc", width: 15 },
    { key: "valorunidoc", width: 15 },
    { key: "valorpendoc", width: 15 },
    { key: "valorpend", width: 15 },
    { key: "local", width: 15 },
    { key: "contaco", width: 60 },
    { key: "reqs", width: 20 },
    { key: "just", width: 60 },
    { key: "staqre", width: 17 },
    { key: "code", width: 10 },
    { key: "obc", width: 10 },
    { key: "ponum", width: 15 },
  ];

  const status = ({ rc }) => {
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
  const rows = rcs.map((valor) => [
    valor.ORG,
    `${valor.CREATION_DATE.substring(8, 10)}/${valor.CREATION_DATE.substring(
      5,
      7
    )}/${valor.CREATION_DATE.substring(2, 4)} - ${valor.CREATION_DATE.substring(
      11,
      19
    )}`,
    valor.PREPARER,
    status({
      rc: valor,
    }),
    `${valor.REQUISITION}/${valor.RE_LINE_NUM}`,
    valor.REQ_APPROVER,
    valor.VENDOR_NAME,
    valor.NR_NOTA_FISCAL,
    valor.VALOR_LIQUIDO,
    valor.DATA_RECEBIMENTO == null
      ? ""
      : `${valor.DATA_RECEBIMENTO.toString().substring(
          8,
          10
        )}/${valor.DATA_RECEBIMENTO.toString().substring(
          5,
          7
        )}/${valor.DATA_RECEBIMENTO.toString().substring(2, 4)}`,
    valor.ITEM,
    valor.ITEM_DESCRIPTION,
    valor.PENDING_QUANTITY_RC,
    valor.UNIT_RC,
    valor.LINE_TOTAL_RC,
    valor.PENDING_TOTAL_RC,
    valor.PENDING_TOTAL_OC == null ?? valor.PENDING_TOTAL_OC == 0
      ? Number(valor.PENDING_TOTAL_RC).toFixed(2).toString().replace(".", ",")
      : Number(valor.PENDING_TOTAL_OC).toFixed(2).toString().replace(".", ","),
    valor.RECEIVED_TOTAL_RC,
    valor.UNIT_OC,
    valor.PENDING_TOTAL_OC,
    valor.LOCAL,
    valor.CHARGE_ACCOUNT,
    valor.PREPARER,
    valor.DESCRIPTION,
    valor.REQ_STATUS,
    valor.CLOSED_CODE,
    valor.OBC_SDCV,
    valor.PO_NUM,
  ]);
  //#e8f2f9

  ws.addRows(rows);

  let lastName = rcs[0]?.REQUISITION;
  let rowState = false;
  rcs.map((val, index) => {
    if (lastName !== val.REQUISITION) {
      rowState = !rowState;
      lastName = val.REQUISITION;
    }
    if (!rowState) {
      ws.getCell(`A${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`A${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`B${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`B${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`C${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`C${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`D${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`D${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`E${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`E${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`F${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`F${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`G${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`G${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`H${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`H${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`I${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`I${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`J${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`J${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`K${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`K${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`L${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`L${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`M${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`M${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`N${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`N${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`O${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`O${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`P${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`P${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`Q${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`Q${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`R${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`R${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`S${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`S${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`T${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`T${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`U${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`U${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`V${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`V${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`W${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`W${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`X${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`X${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`Y${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`Y${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`Z${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`Z${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`AA${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`AA${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`AB${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f5f9fc" },
      };
      ws.getCell(`AB${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    } else {
      ws.getCell(`A${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`A${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`B${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`B${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`C${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`C${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`D${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`D${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`E${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`E${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`F${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`F${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`G${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`G${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`H${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`H${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`I${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`I${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`J${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`J${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`K${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`K${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`L${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`L${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`M${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`M${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`N${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`N${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`O${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`O${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`P${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`P${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`Q${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`Q${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`R${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`R${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`S${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`S${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`T${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`T${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`U${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`U${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`V${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`V${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`W${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`W${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`X${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`X${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`Y${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`Y${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`Z${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`Z${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`AA${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`AA${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`AB${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF" },
      };
      ws.getCell(`AB${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    }
  });

  ws.getColumn(1).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(2).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(3).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(4).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(5).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(6).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(7).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(8).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(9).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(10).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(11).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(12).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(13).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(14).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(15).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(16).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(17).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(18).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(19).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(20).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(21).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(22).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(23).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(24).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(25).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(26).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(27).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  ws.getColumn(28).alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
  const buf = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buf]), `ControleRCs.xlsx`);
}
