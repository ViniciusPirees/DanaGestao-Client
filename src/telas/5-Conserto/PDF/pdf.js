import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import DanaPng from "../../../assets/DANAPNG.png";
// Read HTML Template

// playground requires you to assign document definition to a variable called dd

export default async function PDF({ conserto }) {
  const content = conserto.map((con, i) => {
    var pgb = "after";
    if (i + 1 == conserto.length) {
      pgb = "";
    }
    return {
      style: "tableExample",
      pageBreak: pgb,

      table: {
        widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*"],
        body: [
          [
            {
              border: [true, true, true, false],
              text: "FICHA DE CONTROLE DE SAÍDA DE MATERIAL PARA REPARO EXTERNO",
              style: "miniheader",
              colSpan: 9,
            },
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            {
              border: [true, false, true, false],
              text: "MANUTENÇÃO DANA SOROCABA",
              style: "miniheader",
              colSpan: 9,
            },
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            {
              text: "Atenção: ESTA FICHA DEVE RETORNAR COM O MATERIAL",
              italics: true,
              style: "subheader",
              colSpan: 9,
            },
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            {
              text: `Data: ${con.ConData.substring(
                8,
                10
              )}/${con.ConData.substring(5, 7)}/${con.ConData.substring(
                2,
                4
              )} - ${con.ConData.substring(11, 19)}`,
              style: "hedtext",
              colSpan: 3,
            },
            "",
            "",
            {
              text: `Manutentor: ${con.ConManNome}`,
              style: "hedtext",
              colSpan: 6,
            },
            "",
            "",
            "",
            "",
            "",
          ],
          [
            { text: `OS: ${con.ConNum}`, style: "hedtext", colSpan: 1 },

            {
              text: `Nº Máquina: ${con.ConMaqCod}`,
              style: "hedtext",
              colSpan: 2,
            },
            "",
            {
              text: `Divisão: ${con.ConMaqDivEBS}`,
              style: "hedtext",
              colSpan: 1,
            },
            {
              text: `Setor: ${con.ConMaqSetor}`,
              style: "hedtext",
              colSpan: 5,
            },
            "",
            "",
            "",
            "",
          ],
          [
            {
              text: `Descrição da máquina: ${con.ConMaqDesc}`,
              style: "hedtext",
              colSpan: 9,
            },
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            {
              text: `Descrição do material: ${con.ConItemDescricao}`,
              style: "hedtext",
              colSpan: 8,
            },
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            {
              text: `Qtde.: ${con.ConItemValor}`,
              style: "hedtext",
              colSpan: 1,
            },
          ],
          [
            {
              text: `Problema apresentado: ${con.ConItemProblema}`,
              style: "hedtext",
              colSpan: 9,
            },
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            {
              text: "",
              style: "hedtext",

              fillColor: "#000000",

              colSpan: 9,
            },
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            {
              italics: true,
              text: "ESSE CAMPO SERÁ PREENCHIDO PELO SETOR ADMINISTRATIVO",
              style: "subsubhed",
              colSpan: 9,
            },
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            {
              text: `Enviar para: ${
                con.PARTY_NAME == null ? "" : con.PARTY_NAME
              }`,
              style: "hedtext",
              colSpan: 9,
            },
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            {
              text: `Enviado por: ${
                con.ConUsuEnv == null ? "" : con.ConUsuEnv
              }`,
              style: "hedtext",
              colSpan: 9,
            },
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            {
              text: `RC: ${(con.ConNumRC = "G" ? "Garantia" : con.ConNumRC)}`,
              style: "hedtext",
              colSpan: 3,
            },
            "",
            "",
            { text: `SO: ${con.ConNumSo}`, style: "hedtext", colSpan: 3 },
            "",
            "",
            {
              text: `NF: ${con.NF == null ? "" : con.NF}`,
              style: "hedtext",
              colSpan: 3,
            },
            "",
            "",
          ],
          [
            { text: "", style: "hedtext", colSpan: 9, fillColor: "#000000" },
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            {
              italics: true,
              text: "ESSE CAMPO SERÁ PREENCHIDO PELO FORNECEDOR",
              style: "subsubhed",
              colSpan: 9,
            },
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            {
              text: `NF Retorno:`,
              style: "hedtext",
              colSpan: 4,
            },
            "",
            "",
            "",
            {
              layout: {
                defaultBorder: false,
              },
              text: `Data Retorno:`,
              style: "hedtext",
              colSpan: 5,
            },
            "",
            "",
            "",
            "",
          ],
        ],
      },
    };
  });

  var dd = {
    content: [content],
    pageSize: {
      width: 650,
      height: 400,
    },
    pageOrientation: "landscape",
    pageMargins: [1, 1, 1, 1],
    styles: {
      miniheader: {
        fontSize: 19,
        bold: true,
        margin: [0, 2, 0, 2],
        alignment: "center",
      },
      hedtext: {
        bold: true,
        margin: [0, 2, 0, 2],
      },
      subheader: {
        fontSize: 20,
        bold: true,
        italic: true,
        margin: [0, 0, 0, 0],
        alignment: "center",
      },
      tableExample: {
        margin: [0, 0, 0, 25],
      },
      subsubhed: {
        fontSize: 19,
        bold: true,
        margin: [0, 1, 0, 1],
        alignment: "center",
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };

  pdfMake.createPdf(dd).open();
}
