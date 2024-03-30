import React from "react";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

export default async function Excel({ historico }) {
  const wb = new Workbook();

  const ws = wb.addWorksheet("Planilha 1");

  ws.getRow(1).font = { bold: true, color: { argb: "FFFFFF" } };

  ws.getRow(1).values = [
    "E/S",
    "Data",
    "Item",
    "Máquina",
    "OS",
    "Manutentor",
    "Saldo Anterior",
    "Qtde. Movimentada",
    "Saldo Atual",
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
    { key: "es", width: 12 },
    { key: "data", width: 20 },
    { key: "item", width: 30 },
    { key: "maquina", width: 30 },
    { key: "os", width: 12 },
    { key: "manut", width: 30 },
    { key: "saldoant", width: 12 },
    { key: "qtd", width: 12 },
    { key: "saldoatual", width: 12 },
  ];

  const rows = historico.map((valor) => [
    valor?.HisSaldoAnt - valor?.HisSaldoAtu > 0 ? "Saída" : "Entrada",
    `${valor.HisData.substring(8, 10)}/${valor.HisData.substring(
      5,
      7
    )}/${valor.HisData.substring(2, 4)} - ${valor.HisData.substring(11, 19)}`,
    valor.EstManNum + " - " + valor.EstManDesc,
    valor.HisMaqCod == "" ? "" : valor.HisMaqCod + " - " + valor.MaqDescricao,
    valor.HisOS,
    valor.HisManut,
    valor.HisSaldoAnt,
    valor?.HisSaldoAtu - valor?.HisSaldoAnt > 0
      ? "+" + (valor?.HisSaldoAtu - valor?.HisSaldoAnt).toString()
      : valor?.HisSaldoAtu - valor?.HisSaldoAnt,
    valor.HisSaldoAtu,
  ]);
  //#e8f2f9

  ws.addRows(rows);

  let lastName = historico[0]?.ConCod;
  let rowState = false;
  historico.map((val, index) => {
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
    }
    if (val?.HisSaldoAnt - val?.HisSaldoAtu > 0) {
      ws.getCell(`A${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ff2222" },
      };
    } else {
      ws.getCell(`A${index + 2}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "2a7a2a" },
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
  saveAs(new Blob([buf]), `Movimentações.xlsx`);
}
