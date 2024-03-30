import pdfMake from "pdfmake/build/pdfmake";
//import pdfFonts from "pdfmake/build/vfs_fonts";
//pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Read HTML Template

// playground requires you to assign document definition to a variable called dd

export default async function Kanban({ arrPrint }) {
  //3 = 16.6
  //2 = 8.3
  //1 = 5.53
  let qtda = 0;
  arrPrint.forEach((item) => {
    qtda = qtda + item.qtd;
  });
  let qtdf = 0;
  const content = arrPrint.flatMap((item, i) => {
    var folhas = [];
    for (var x = 1; x <= item.qtd; x++) {
      qtdf = qtdf + 1;
      var pgb = qtdf % 6 == 0 ? "after" : "";
      var folha = {
        style: "tableExample",
        pageBreak: pgb,
        table: {
          widths: ["16.6%", "16.6%", "16.6%", "16.6%", "16.6%", "16.6%"],
          body: [
            [
              {
                text: "Kanban Almoxarifado de Manutenção",
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
                text: "Local:",
                style: "subsubhed",
                colSpan: 3,
              },
              "",
              "",
              {
                text: item.EstManLoc,
                style: "subsubhed",
                colSpan: 3,
              },
              "",
              "",
            ],
            [
              {
                text: "Nº:",
                style: "subsubhed",
                colSpan: 3,
              },
              "",
              "",
              {
                text: item.EstManNum,
                style: "subsubhed",
                colSpan: 3,
              },
              "",
              "",
            ],
            [
              {
                text: "Material:",
                style: "subsubhed",
                colSpan: 3,
              },
              "",
              "",
              {
                text: item.EstManAreaDesc,
                style: "subsubhed",
                colSpan: 3,
              },
              "",
              "",
            ],
            [
              {
                text: "Características:",
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
                text: item.EstManDesc,
                style: "carac",
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
                text: "Usuário/Data",
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
                text: "",
                style: "carac2",
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
                text: "Nº Máquina",
                style: "subsubhed",
                colSpan: 3,
              },
              "",
              "",
              {
                text: "OS",
                style: "subsubhed",
                colSpan: 3,
              },
              "",
              "",
            ],
            [
              {
                text: "",
                style: "carac2",
                colSpan: 3,
              },
              "",
              "",
              {
                text: "",
                style: "carac2",
                colSpan: 3,
              },
              "",
              "",
            ],
          ],
        },
      };
      folhas.push(folha);
    }
    return folhas;
  });
  let columns = [];
  let feitos = [];
  content.forEach((col, i) => {
    if ((i + 1) % 3 == 0) {
      columns.push(col);
      let feito = {
        columns: [
          {
            columns,
          },
        ],
      };
      columns = [];
      feitos.push(feito);
    } else {
      columns.push(col);
    }
  });

  if (columns.length > 0) {
    let feito = {
      columns: [
        {
          columns,
        },
      ],
    };
    columns = [];
    feitos.push(feito);
  }

  feitos.forEach((col, index) => {
    let len = col.columns[0].columns.length;
    if (len == 2) {
      let cols = col.columns[0].columns;
      let newCols = cols.map((val, i) => {
        let newVal = val;
        let newWidth = ["9.8%", "9.8%", "9.8%", "9.8%", "9.8%", "9.8%"];
        newVal.table.widths = newWidth;
        return newVal;
      });
      feitos[index].columns[0].columns = newCols;

    } else if (len == 1) {
      let cols = col.columns[0].columns;
      let newCols = cols.map((val, i) => {
        let newVal = val;
        let newWidth = ["4.37%", "4.37%", "4.37%", "4.37%", "4.37%", "4.37%"];
        newVal.table.widths = newWidth;
        return newVal;
      });
      feitos[index].columns[0].columns = newCols;

    }
  });

  var dd = {
    pageMargins: [5, 5, 5, 5],
    content: [feitos],
    styles: {
      miniheader: {
        fontSize: 14,
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
        fontSize: 13,
        bold: true,
        margin: [0, 1, 0, 1],
        alignment: "center",
      },
      carac: {
        fontSize: 17,

        margin: [1, 25, 1, 25],
        alignment: "center",
      },
      carac2: {
        fontSize: 13,

        margin: [1, 25, 1, 25],
        alignment: "center",
      },
      carac3: {
        fontSize: 13,

        margin: [1, 15, 1, 15],
        alignment: "center",
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };

  pdfMake.createPdf(dd).open();
}
