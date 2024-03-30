import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Notificacao from "../../components/Notificacao";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function GraficoSolic({ setLoad, ratio }) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const chartRef = useRef(null);

  useEffect(() => {
    getConserto();
  }, []);
  const [options, setOptions] = useState({});
  const getConserto = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getGraficos`,
        {
          params: {
            tabela: "SolicMaterial",
          },
        }
      );

      var verde = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      var amarelo = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      var vermelho = [0, 0, 0, 0, 0, 0, 0, 0, 0];

      if (res?.data.length > 0) {
        const agr = new Date();
        const dias7 = new Date(agr.getTime() - 7 * 86400000);
        const dias30 = new Date(agr.getTime() - 30 * 86400000);
        res?.data?.map((item, i) => {
          const data = new Date(new Date(item.MatData).getTime() + 180 * 60000);

          if (data >= dias7) {
            if (item.MatRC == "") {
              verde[0] = verde[0] + 1;
            } else if (
                item?.REQ_STATUS == "PRE-APPROVED" ||
              (item?.REQ_STATUS == "APPROVED" &&
                item?.PO_NUM == null &&
                item?.REQ_APPROVER == item?.PREPARER &&
                (item?.LINE_TOTAL_RC == 0 || item?.LINE_TOTAL_RC == null) &&
                item.PENDING_TOTAL_RC == 0 &&
                item.RECEIVED_TOTAL_RC == 0)
            ) {
              verde[1] = verde[1] + 1;
            } else if (
              item?.REQ_STATUS == "INCOMPLETE" ||
      (item?.REQ_STATUS == "IN PROCESS" &&
        item?.PO_NUM == null &&
        item?.REQ_APPROVER == item?.PREPARER &&
        (item?.LINE_TOTAL_RC > 0 ||
          item.PENDING_TOTAL_RC > 0 ||
          item.RECEIVED_TOTAL_RC > 0))
            ) {
              verde[2] = verde[2] + 1;
            } else if (item.REQ_STATUS == "IN PROCESS" && item.PO_NUM == null) {
              verde[3] = verde[3] + 1;
            } else if (item.REQ_STATUS == "APPROVED" && item.PO_NUM == null) {
              verde[4] = verde[4] + 1;
            } else if (
              item.REQ_STATUS == "APPROVED" &&
              item.PO_NUM != null &&
              item.CLOSED_CODE == "OPEN"
            ) {
              verde[5] = verde[5] + 1;
            } else if (
              item.REQ_STATUS == "APPROVED" &&
              item.PO_NUM != null &&
              item.CLOSED_CODE == "CLOSED"
            ) {
              verde[6] = verde[6] + 1;
            } else if (
              item.REQ_STATUS != "APPROVED" &&
              item.REQ_STATUS != "IN PROCESS" &&
              item.REQ_STATUS != null
            ) {
              verde[7] = verde[7] + 1;
            } else {
              verde[8] = verde[8] + 1;
            }
          } else if (dias7 >= data && data >= dias30) {
            if (item.MatRC == "") {
              amarelo[0] = amarelo[0] + 1;
            } else if (
                item?.REQ_STATUS == "PRE-APPROVED" ||
              (item?.REQ_STATUS == "APPROVED" &&
                item?.PO_NUM == null &&
                item?.REQ_APPROVER == item?.PREPARER &&
                (item?.LINE_TOTAL_RC == 0 || item?.LINE_TOTAL_RC == null) &&
                item.PENDING_TOTAL_RC == 0 &&
                item.RECEIVED_TOTAL_RC == 0)
            ) {
              amarelo[1] = amarelo[1] + 1;
            } else if (
              item?.REQ_STATUS == "INCOMPLETE" ||
      (item?.REQ_STATUS == "IN PROCESS" &&
        item?.PO_NUM == null &&
        item?.REQ_APPROVER == item?.PREPARER &&
        (item?.LINE_TOTAL_RC > 0 ||
          item.PENDING_TOTAL_RC > 0 ||
          item.RECEIVED_TOTAL_RC > 0))
            ) {
              amarelo[2] = amarelo[2] + 1;
            } else if (item.REQ_STATUS == "IN PROCESS" && item.PO_NUM == null) {
              amarelo[3] = amarelo[3] + 1;
            } else if (item.REQ_STATUS == "APPROVED" && item.PO_NUM == null) {
              amarelo[4] = amarelo[4] + 1;
            } else if (
              item.REQ_STATUS == "APPROVED" &&
              item.PO_NUM != null &&
              item.CLOSED_CODE == "OPEN"
            ) {
              amarelo[5] = amarelo[5] + 1;
            } else if (
              item.REQ_STATUS == "APPROVED" &&
              item.PO_NUM != null &&
              item.CLOSED_CODE == "CLOSED"
            ) {
              amarelo[6] = amarelo[6] + 1;
            } else if (
              item.REQ_STATUS != "APPROVED" &&
              item.REQ_STATUS != "IN PROCESS" &&
              item.REQ_STATUS != null
            ) {
              amarelo[7] = amarelo[7] + 1;
            } else {
              amarelo[8] = amarelo[8] + 1;
            }
          } else if (dias30 >= data) {
            if (item.MatRC == "") {
              vermelho[0] = vermelho[0] + 1;
            } else if (
                item?.REQ_STATUS == "PRE-APPROVED" ||
              (item?.REQ_STATUS == "APPROVED" &&
                item?.PO_NUM == null &&
                item?.REQ_APPROVER == item?.PREPARER &&
                (item?.LINE_TOTAL_RC == 0 || item?.LINE_TOTAL_RC == null) &&
                item.PENDING_TOTAL_RC == 0 &&
                item.RECEIVED_TOTAL_RC == 0)
            ) {
              vermelho[1] = vermelho[1] + 1;
            } else if (
              item?.REQ_STATUS == "INCOMPLETE" ||
      (item?.REQ_STATUS == "IN PROCESS" &&
        item?.PO_NUM == null &&
        item?.REQ_APPROVER == item?.PREPARER &&
        (item?.LINE_TOTAL_RC > 0 ||
          item.PENDING_TOTAL_RC > 0 ||
          item.RECEIVED_TOTAL_RC > 0))
            ) {
              vermelho[2] = vermelho[2] + 1;
            } else if (item.REQ_STATUS == "IN PROCESS" && item.PO_NUM == null) {
              vermelho[3] = vermelho[3] + 1;
            } else if (item.REQ_STATUS == "APPROVED" && item.PO_NUM == null) {
              vermelho[4] = vermelho[4] + 1;
            } else if (
              item.REQ_STATUS == "APPROVED" &&
              item.PO_NUM != null &&
              item.CLOSED_CODE == "OPEN"
            ) {
              vermelho[5] = vermelho[5] + 1;
            } else if (
              item.REQ_STATUS == "APPROVED" &&
              item.PO_NUM != null &&
              item.CLOSED_CODE == "CLOSED"
            ) {
              vermelho[6] = vermelho[6] + 1;
            } else if (
              item.REQ_STATUS != "APPROVED" &&
              item.REQ_STATUS != "IN PROCESS" &&
              item.REQ_STATUS != null
            ) {
              vermelho[7] = vermelho[7] + 1;
            } else {
              vermelho[8] = vermelho[8] + 1;
            }
          }
        });
      }
      var labels = [];
      var verdeC = [];
      var amareloC = [];
      var vermelhoC = [];

      for (var i = 0; i < 9; i++) {
        if (amarelo[i] > 0 || verde[i] > 0 || vermelho[i] > 0) {
          verdeC.push(verde[i]);
          amareloC.push(amarelo[i]);
          vermelhoC.push(vermelho[i]);

          i == 0 && labels.push("Sem RC");
          i == 1 && labels.push("RC em orçamento de compras");
          i == 2 && labels.push("Requer aprovação do solicitante");
          i == 3 && labels.push("RC em Aprovação");
          i == 4 && labels.push("RC Aprovada sem pedido");
          i == 5 && labels.push("RC Aprovada com pedido Aberto");
          i == 6 && labels.push("RC Aprovada com pedido Entregue");
          i == 7 && labels.push("RC Cancelada");
          i == 8 && labels.push("RC Não Existe");
        }
      }
      var tam =
        40 + 80 - (verdeC.length + vermelhoC.length + amareloC.length) * 4;
      let soma = [];

      for (var i = 0; i < verdeC.length; i++) {
        var sum = verdeC[i] + vermelhoC[i] + amareloC[i];
        soma.push(sum);
      }

      var maxV = 0;

      if (Math.max.apply(Math, soma) > 1000) {
        maxV = Number(
          Number(Math.ceil(Math.max.apply(Math, soma) / 1000) * 1000)
        );
        if (maxV == Math.max.apply(Math, soma)) {
          maxV = maxV + 1000;
        }
      } else if (Math.max.apply(Math, soma) > 100) {
        maxV = Number(
          Number(Math.ceil(Math.max.apply(Math, soma) / 100) * 100)
        );
        if (maxV == Math.max.apply(Math, soma)) {
          maxV = maxV + 100;
        }
      } else if (Math.max.apply(Math, soma) > 10) {
        maxV = Number(Number(Math.ceil(Math.max.apply(Math, soma) / 10) * 10));
        if (maxV == Math.max.apply(Math, soma)) {
          maxV = maxV + 10;
        }
      } else {
        maxV = 10;
        if (maxV == Math.max.apply(Math, soma)) {
          maxV = maxV + 5;
        }
      }

      const chartData2 = {
        labels: labels,
        datasets: [
          {
            label: "Qtde. de solicitações criadas dentro de 7 dias",
            data: verdeC,
            borderWidth: 5,
            barThickness: tam,
            borderColor: ["#1a6b21"],
            backgroundColor: ["#21862a"],
            datalabels: {
              align: "start",
              anchor: "center",
              offset: function (value) {
                var pctBar = (100 * soma[value.dataIndex]) / maxV;

                var pctSta =
                  (100 * value.dataset.data[value.dataIndex]) /
                  soma[value.dataIndex];
                if (pctSta > 50) {
                  return -10;
                } else if (pctSta > 20) {
                  return -20;
                } else {
                  return -30;
                }
              },
            },
          },
          {
            label: "Qtde. de solicitações criadas entre 30 dias à 7 dias",
            data: amareloC,
            borderWidth: 5,
            barThickness: tam,
            borderColor: ["#cc7716"],
            backgroundColor: ["#ff951c"],
            datalabels: {
              align: "start",
              anchor: "center",
              offset: function (value) {
                var pctBar = (100 * soma[value.dataIndex]) / maxV;

                var pctSta =
                  (100 * value.dataset.data[value.dataIndex]) /
                  soma[value.dataIndex];
                if (pctSta > 50) {
                  return -10;
                } else if (pctSta > 20) {
                  return -20;
                } else {
                  return -30;
                }
              },
            },
          },
          {
            label: "Qtde. de solicitações criadas acima de 30 dias",
            data: vermelhoC,
            borderWidth: 5,
            barThickness: tam,
            borderColor: ["#a30000"],
            backgroundColor: ["#cc0000"],
            datalabels: {
              align: "start",
              anchor: "center",
              offset: function (value) {
                var pctBar = (100 * soma[value.dataIndex]) / maxV;

                var pctSta =
                  (100 * value.dataset.data[value.dataIndex]) /
                  soma[value.dataIndex];
                if (pctSta > 50) {
                  return -10;
                } else if (pctSta > 20) {
                  return -20;
                } else {
                  return -30;
                }
              },
            },
          },
          {
            label: "Total",
            data: soma, // 0s are just placeholders
            datalabels: {
              align: "start",
              anchor: "start",
              offset: -40,
              color: function (value, i, values) {
                // valor total só aparece qnd for diferente dos valores child ou se valor child for unico e valor child for menor q 10%
                if (value.dataset.data[value.dataIndex] > 0) {
                  if (
                    verdeC[value.dataIndex] ==
                      value.dataset.data[value.dataIndex] ||
                    vermelhoC[value.dataIndex] ==
                      value.dataset.data[value.dataIndex] ||
                    amareloC[value.dataIndex] ==
                      value.dataset.data[value.dataIndex]
                  ) {
                    let val =
                      (100 * value.dataset.data[value.dataIndex]) / maxV;
                    if (val <= 10) {
                      return "#1f1f1f";
                    } else {
                      return "";
                    }
                  } else {
                    return "#1f1f1f";
                  }
                } else {
                  return "";
                }
              },
              backgroundColor: function (value, i, values) {
                // valor total só aparece qnd for diferente dos valores child ou se valor child for unico e valor child for menor q 10%
                if (value.dataset.data[value.dataIndex] > 0) {
                  if (
                    verdeC[value.dataIndex] ==
                      value.dataset.data[value.dataIndex] ||
                    vermelhoC[value.dataIndex] ==
                      value.dataset.data[value.dataIndex] ||
                    amareloC[value.dataIndex] ==
                      value.dataset.data[value.dataIndex]
                  ) {
                    let val =
                      (100 * value.dataset.data[value.dataIndex]) / maxV;
                    if (val <= 10) {
                      return "#fff";
                    } else {
                      return "";
                    }
                  } else {
                    return "#fff";
                  }
                } else {
                  return "";
                }
              },
            },
            borderColor: ["#fff0"],
            backgroundColor: ["#fff0"],
          },
        ],
      };
      setChartData(chartData2);

      setOptions({
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: true,
            color: function (value, i, values) {
              if (value.dataset.data[value.dataIndex] > 0) {
                let val = (100 * value.dataset.data[value.dataIndex]) / maxV;
                if (val > 10) {
                  return "#1f1f1f";
                } else {
                  return "";
                }
              } else {
                return "";
              }
            },
            formatter: function (value, index, values) {
              if (value > 0) {
                if (value.toString().search(/[.]/g) >= 0) {
                  return Number(value).toFixed(2).toString().replace(".", ",");
                }
                return value;
              } else {
                value = "";
                return value;
              }
            },
            anchor: "center",

            borderRadius: 3,
            font: {
              size: 20,
              weight: "bold",
              family: '"Roboto", sans-serif',
            },

            padding: {
              top: 2,
              bottom: 1,
            },
            textAlign: "center",
            textStrokeColor: "#f00",
            textStrokeWidth: 0.1,

            backgroundColor: function (value, i, values) {
              if (value.dataset.data[value.dataIndex] > 0) {
                let val = (100 * value.dataset.data[value.dataIndex]) / maxV;
                if (val > 10) {
                  return "#fff";
                } else {
                  return "";
                }
              } else {
                return "";
              }
            },
          },
          tooltip: {
            titleFont: {
              size: 18,
              weight: "bold",
              family: '"Roboto", sans-serif',
            },
            bodyFont: {
              size: 16,

              family: '"Roboto", sans-serif',
            },
            bodySpacing: 0,
            boxWidth: 18,
            boxHeight: 18,
            position: "nearest",
            boxPadding: 6,
          },
        },
        scales: {
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              color: "#dbdbdb",
            },
            ticks: {
              color: "#dbdbdb",
              font: {
                size: 18,
              },

              stepSize: maxV / 5,
            },
            min: 0,
            max: maxV,
          },
          x: {
            stacked: true,
            grid: {
              color: "#bdbdbd",
            },
            ticks: {
              color: "#dbdbdb",
              font: {
                size: 22,
              },
            },
          },
        },
        responsive: true,
        aspectRatio: ratio ? 1 : 2 / 1,
        animation: true,
      });

      setLoad(false);
      if (res?.data == 0) {
        Notificacao(["atencao", "Nenhuma item foi encontrado."]);
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao buscar as Itens " + err]);
      console.log(err);
      setLoad(false);
    }
  };
  return (
    <>
      <h1 className="text-center w-full text-3xl font-bold">
        Solicitação de Materiais
      </h1>
      <Chart ref={chartRef} type="bar" data={chartData} options={options} />
    </>
  );
}
