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

export default function GraficoMan({ setLoad, ratio }) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const chartRef = useRef(null);
  const [options, setOptions] = useState({});

  useEffect(() => {
    getSolic();
  }, []);

  const getSolic = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getGraficos`,
        {
          params: {
            tabela: "EstoqueManutencao",
          },
        }
      );

      var A = [0, 0, 0];
      var B = [0, 0, 0];
      var C = [0, 0, 0];
      var D = [0, 0, 0];

      if (res?.data.length > 0) {
        res?.data?.map((item, i) => {
          if (item.EstManNivel == "A") {
            if (item.EstManSaldo == 0) {
              A[0] = A[0] + 1;
            } else if (item.EstManSaldo <= item.EstManEstMin) {
              A[1] = A[1] + 1;
            } else {
              A[2] = A[2] + 1;
            }
          } else if (item.EstManNivel == "B") {
            if (item.EstManSaldo == 0) {
              B[0] = B[0] + 1;
            } else if (item.EstManSaldo <= item.EstManEstMin) {
              B[1] = B[1] + 1;
            } else {
              B[2] = B[2] + 1;
            }
          } else if (item.EstManNivel == "C") {
            if (item.EstManSaldo == 0) {
              C[0] = C[0] + 1;
            } else if (item.EstManSaldo <= item.EstManEstMin) {
              C[1] = C[1] + 1;
            } else {
              C[2] = C[2] + 1;
            }
          } else if (item.EstManNivel == "D") {
            if (item.EstManSaldo == 0) {
              D[0] = D[0] + 1;
            } else if (item.EstManSaldo <= item.EstManEstMin) {
              D[1] = D[1] + 1;
            } else {
              D[2] = D[2] + 1;
            }
          }
        });
      }

      var labels = [];
      var AT = [];
      var BT = [];
      var CT = [];
      var DT = [];

      for (var i = 0; i < 3; i++) {
        if (A[i] > 0 || B[i] > 0 || C[i] > 0 || D[i] > 0) {
          AT.push(A[i]);
          BT.push(B[i]);
          CT.push(C[i]);
          DT.push(D[i]);
          i == 0 && labels.push("Estoque Zero");
          i == 1 && labels.push("Estoque Minímo");
          i == 2 && labels.push("Estoque Normal");
        }
      }

      let soma = [];

      for (var i = 0; i < AT.length; i++) {
        var sum = AT[i] + BT[i] + CT[i] + DT[i];
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
            label: "Nível A",
            data: A,
            borderWidth: 5,
            barThickness: 90,
            borderColor: ["#a30000", "#cc7716", "#1a6b21"],
            backgroundColor: ["#cc0000", "#ff951c", "#21862a"],
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
            label: "Nível B",
            data: B,
            borderWidth: 5,
            barThickness: 90,
            borderColor: ["#a30000", "#cc7716", "#1a6b21"],
            backgroundColor: ["#cc0000", "#ff951c", "#21862a"],
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
            label: "Nível C",
            data: C,
            borderWidth: 5,
            barThickness: 90,
            borderColor: ["#a30000", "#cc7716", "#1a6b21"],
            backgroundColor: ["#cc0000", "#ff951c", "#21862a"],
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
            label: "Nível D",
            data: D,
            borderWidth: 5,
            barThickness: 90,
            borderColor: ["#a30000", "#cc7716", "#1a6b21"],
            backgroundColor: ["#cc0000", "#ff951c", "#21862a"],
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
                    AT[value.dataIndex] ==
                      value.dataset.data[value.dataIndex] ||
                    BT[value.dataIndex] ==
                      value.dataset.data[value.dataIndex] ||
                    CT[value.dataIndex] ==
                      value.dataset.data[value.dataIndex] ||
                    DT[value.dataIndex] == value.dataset.data[value.dataIndex]
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
                    AT[value.dataIndex] ==
                      value.dataset.data[value.dataIndex] ||
                    BT[value.dataIndex] ==
                      value.dataset.data[value.dataIndex] ||
                    CT[value.dataIndex] ==
                      value.dataset.data[value.dataIndex] ||
                    DT[value.dataIndex] == value.dataset.data[value.dataIndex]
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
        Estoque Manutenção
      </h1>
      <Chart ref={chartRef} type="bar" data={chartData} options={options} />
    </>
  );
}
