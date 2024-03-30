import React from "react";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

export default async function Excel({ estcen }) {
  const wb = new Workbook();

  const ws = wb.addWorksheet("Planilha 1");

  ws.getRow(1).font = { bold: true, color: { argb: "FFFFFF" } };

  ws.getRow(1).values = ["Item", "Descrição", "Quantidade"];

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

  ws.columns = [
    { key: "coditem", width: 20 },
    { key: "desc", width: 60 },
    { key: "qtd", width: 15 },
  ];

  const rows = estcen.map((valor) => [
    valor.ITEM,
    valor.DESCRIPTION,
    valor.QUANTITY,
  ]);

  ws.addRows(rows);

  estcen.map((val, index) => {
    ws.getCell(`A${index + 2}`).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    ws.getCell(`B${index + 2}`).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    ws.getCell(`C${index + 2}`).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
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

  const buf = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buf]), `EstoqueCentral.xlsx`);
}
