import React from "react";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

export default async function Excel({ estman }) {
  const wb = new Workbook();

  const ws = wb.addWorksheet("Planilha 1");

  ws.getRow(1).font = { bold: true, color: { argb: "FFFFFF" } };

  ws.getRow(1).values = [
    "Cod. Item",
    "Status",
    "Descrição",
    "Área",
    "Tipo Material",
    "Local",
    "Est. Min.	",
    "Est. Máx.",
    "Saldo",
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


  ws.columns = [
    { key: "coditem", width: 10 },
    { key: "status", width: 10 },
    { key: "desc", width: 40 },
    { key: "area", width: 25 },
    { key: "tipmat", width: 30 },
    { key: "local", width: 25 },
    { key: "estmin", width: 10 },
    { key: "estmax", width: 10 },
    { key: "saldo", width: 10 },
  ];

  const rows = estman.map((valor) => [
    valor.EstManNum,
    valor.EstManSta == "A" ? "Ativo" : "Inativo",
    valor.EstManDesc,
    valor.EstManAreaDesc,
    valor.EstManTipMatDesc,
    valor.EstManLoc,
    valor.EstManEstMin,
    valor.EstManEstMax,
    valor.EstManSaldo,
  ]);

  ws.addRows(rows);

  estman.map((val, index) => {
    if (val.EstManSaldo == 0) {
      ws.getCell(`A${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "c23636" },
      };
      ws.getCell(`A${index + 2}`).font = {
        color: { argb: "FFFFFF" },
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
        fgColor: { argb: "c23636" },
      };
      ws.getCell(`B${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`B${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`C${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "c23636" },
      };
      ws.getCell(`C${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`C${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`D${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "c23636" },
      };
      ws.getCell(`D${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`D${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`E${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "c23636" },
      };
      ws.getCell(`E${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`E${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`F${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "c23636" },
      };
      ws.getCell(`F${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`F${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`G${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "c23636" },
      };
      ws.getCell(`G${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`G${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`H${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "c23636" },
      };
      ws.getCell(`H${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`H${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`I${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "c23636" },
      };
      ws.getCell(`I${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`I${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
    } else if (val.EstManEstMin >= val.EstManSaldo) {
      ws.getCell(`A${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ff951c" },
      };
      ws.getCell(`A${index + 2}`).font = {
        color: { argb: "FFFFFF" },
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
        fgColor: { argb: "ff951c" },
      };
      ws.getCell(`B${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`B${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`C${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ff951c" },
      };
      ws.getCell(`C${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`C${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`D${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ff951c" },
      };
      ws.getCell(`D${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`D${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`E${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ff951c" },
      };
      ws.getCell(`E${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`E${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`F${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ff951c" },
      };
      ws.getCell(`F${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`F${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`G${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ff951c" },
      };
      ws.getCell(`G${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`G${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`H${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ff951c" },
      };
      ws.getCell(`H${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`H${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
      ws.getCell(`I${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ff951c" },
      };
      ws.getCell(`I${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`I${index + 2}`).font = {
        color: { argb: "FFFFFF" },
      };
    } else {
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

      ws.getCell(`D${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      ws.getCell(`E${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      ws.getCell(`F${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      ws.getCell(`G${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      ws.getCell(`H${index + 2}`).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      ws.getCell(`I${index + 2}`).border = {
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

  const buf = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buf]), `EstoqueManutencao.xlsx`);
}
