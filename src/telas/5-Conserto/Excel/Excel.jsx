import React from "react";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

export default async function Excel({ conserto }) {
  const wb = new Workbook();

  const ws = wb.addWorksheet("Planilha 1");

  ws.getRow(1).font = { bold: true, color: { argb: "FFFFFF" } };

  ws.getRow(1).values = [
    "Cód.",
    "Data",
    "Número OS",
    "Nº RC",
    "Status",
    "Manutentor",
    "Máq. Descrição",
    "Máq. Divisão",
    "Máq. Setor",
    "Máq. Div. EBS",
    "Nº SO",
    "Fornecedor",
    "Nº NF",
    "Nº Orçamento",
    "Nº OC",
    "Observação",
    "Item Descrição",
    "Item Tipo Material",
    "Item Problema",
    "Item Valor",
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

  ws.columns = [
    { key: "cod", width: 12 },
    { key: "data", width: 20 },
    { key: "os", width: 12 },
    { key: "rc", width: 12 },
    { key: "sta", width: 30 },
    { key: "manut", width: 30 },

    { key: "descma", width: 35 },
    { key: "div", width: 20 },
    { key: "set", width: 20 },
    { key: "divebs", width: 15 },
    { key: "so", width: 12 },
    { key: "forn", width: 35 },

    { key: "nf", width: 12 },
    { key: "orc", width: 15 },

    { key: "oc", width: 20 },
    { key: "obs", width: 35 },
    { key: "itemdesc", width: 40 },
    { key: "itemtimmat", width: 25 },
    { key: "itemprob", width: 40 },
    { key: "itemvalu", width: 15 },
  ];

  const status = ({ numRC, reqstatus, poNum, closed }) => {
    if (numRC == 0) {
      return "Sem RC";
    } else if (reqstatus == "IN PROCESS" && poNum == null) {
      return "RC Em aprovação";
    } else if (reqstatus == "APPROVED" && poNum == null) {
      return "RC Aprovada sem pedido";
    } else if (reqstatus == "APPROVED" && poNum != null && closed == "OPEN") {
      return "RC Aprovada com pedido aberto";
    } else if (reqstatus == "APPROVED" && poNum != null && closed == "CLOSED") {
      return "RC Aprovada com pedido entregue";
    } else if (
      reqstatus != "APPROVED" &&
      reqstatus != "IN PROCESS" &&
      reqstatus != null
    ) {
      return "RC Cancelada";
    } else {
      return "RC não existe";
    }
  };

  const rows = conserto.map((valor) => [
    `${valor.ConCod}/${valor.ConCodItem}`,
    `${valor.ConData.substring(8, 10)}/${valor.ConData.substring(
      5,
      7
    )}/${valor.ConData.substring(2, 4)} - ${valor.ConData.substring(11, 19)}`,
    valor.ConNum,
    valor.ConNumRC,
    status({
      numRC: valor.ConCod,
      reqstatus: valor.REQ_STATUS,
      poNum: valor.PO_NUM,
      closed: valor.CLOSED_CODE,
    }),
    valor.ConManNome,
    valor.ConMaqDesc,
    valor.ConMaqDiv,
    valor.ConMaqSetor,
    valor.ConMaqDivEBS,
    valor.ConNumSo,
    valor.ConForDesc,
    valor.ConNF,
    valor.ConOrc,
    valor.ConNumOC,
    valor.ConObs,
    valor.ConItemDescricao,
    valor.ConItemTipMatDesc,
    valor.ConItemProblema,
    valor.ConItemValor,
  ]);
  //#e8f2f9

  ws.addRows(rows);

  let lastName = conserto[0]?.ConCod;
  let rowState = false;
  conserto.map((val, index) => {
    if (lastName !== val.ConCod) {
      rowState = !rowState;
      lastName = val.ConCod;
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

  const buf = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buf]), `Conserto.xlsx`);
}
