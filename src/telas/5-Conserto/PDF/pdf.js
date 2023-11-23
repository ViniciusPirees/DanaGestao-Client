import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Read HTML Template

// playground requires you to assign document definition to a variable called dd

export default async function PDF({ conserto }) {
  const content = conserto.map((con, i) => {
    var pgb = "after"
    if (i + 1 == conserto.length){
      pgb = ""
    }
    return {
      style: "tableExample",
      pageBreak: pgb,
      table: {
        widths: ["*", "*", "*", "*", "*", "*"],
        body: [
          [
            {
              text: "FICHA DE CONTROLE DE SAÍDA DE MATERIAL PARA REPARO EXTERNO",
              style: "miniheader",
              colSpan: 6,
            },
            "",
            "",
            "",
            "",
            "",
          ],
          [
            {
              text: "Atenção: ESTA FICHA DEVE RETORNAR COM O MATERIAL",
              style: "subheader",
              colSpan: 6,
            },
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
              colSpan: 2,
            },
            "",
            {
              text: `Manutentor: ${con.ConManNome}`,
              style: "hedtext",
              colSpan: 4,
            },
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
              colSpan: 2,
            },
            "",
          ],
          [
            {
              text: `Descrição da máquina: ${con.ConMaqDesc}`,
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
            {
              text: `Descrição do material: ${con.ConItemDescricao}`,
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
            {
              text: `Problema apresentado: ${con.ConItemProblema}`,
              style: "hedtext",
              colSpan: 6,
            },
            "",
            "",
            "",
            "",
            "",
          ],
          [{ text: "", style: "hedtext", colSpan: 6 }, "", "", "", "", ""],
          [
            {
              text: "ESSE CAMPO SERÁ PREENCHIDO PELO SETOR ADMINISTRATIVO",
              style: "subsubhed",
              colSpan: 6,
            },
            "",
            "",
            "",
            "",
            "",
          ],
          [
            {
              text: `Enviar para: ${con.ConForDesc}`,
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
            {
              text: `Enviado por: ${con.ConUsuEnv}`,
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
            { text: `RC: ${con.ConNumRC}`, style: "hedtext", colSpan: 2 },
            "",
            { text: `SO: ${con.ConNumSo}`, style: "hedtext", colSpan: 2 },
            "",
            { text: `NF: ${con.ConNF}`, style: "hedtext", colSpan: 2 },
            "",
          ],
        ],
      },
    };
  });

  var dd = {
    content: [content],
    pageSize: "A5",
    pageOrientation: "landscape",
    styles: {
      miniheader: {
        fontSize: 12,
        bold: true,
        margin: [0, 2, 0, 2],
        alignment: "center",
      },
      hedtext: {
        bold: true,
        margin: [0, 2, 0, 2],
      },
      subheader: {
        fontSize: 15,
        bold: true,
        margin: [0, 9, 0, 9],
        alignment: "center",
      },
      tableExample: {
        margin: [0, 0, 0, 25],
      },
      subsubhed: {
        fontSize: 11,
        bold: true,
        margin: [0, 1, 0, 1],
        alignment: "center",
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };
  console.log(dd)
  pdfMake.createPdf(dd).open();
}
