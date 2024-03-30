import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Notificacao from "../../../../components/Notificacao";
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

export default function GraficoManTV({ setLoad, ratio, atualiza }) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const chartRef = useRef(null);
  const [options, setOptions] = useState({
    aspectRatio: 1 / 1,
  });

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

      var estzero = 0;
      var estmin = 0;
      var estnorm = 0;

      if (res?.data.length > 0) {
        res?.data?.map((item, i) => {
          if (item.EstManSaldo == 0) {
            estzero = estzero + 1;
          } else if (item.EstManSaldo <= item.EstManEstMin) {
            estmin = estmin + 1;
          } else {
            estnorm = estnorm + 1;
          }
        });
      }

      const chartData2 = {
        labels: ["Estoque Zero ", "Estoque Minímo ", "Estoque Normal"],
        datasets: [
          {
            label: "Estoque",
            data: [estzero, estmin, estnorm],
            borderWidth: 3,
            barThickness: 50,
            borderColor: ["#a30000", "#cc7716", "#1a6b21"],
            backgroundColor: ["#cc0000", "#ff951c", "#21862a"],
          },
        ],
      };
      var maxV = 0;
      setChartData(chartData2);
      if (Math.max(estzero, estmin, estnorm) > 1000) {
        maxV = Number(
          Number(Math.ceil(Math.max(estzero, estmin, estnorm) / 1000) * 1000)
        );

        if (maxV == Math.max(estzero, estmin, estnorm)) {
          maxV = maxV + 1000;
        }
      } else if (Math.max(estzero, estmin, estnorm) > 100) {
        maxV = Number(
          Number(Math.ceil(Math.max(estzero, estmin, estnorm) / 100) * 100)
        );
        if (maxV == Math.max(estzero, estmin, estnorm)) {
          maxV = maxV + 100;
        }
      } else if (Math.max(estzero, estmin, estnorm) > 10) {
        maxV = Number(
          Number(Math.ceil(Math.max(estzero, estmin, estnorm) / 10) * 10)
        );
        if (maxV == Math.max(estzero, estmin, estnorm)) {
          maxV = maxV + 10;
        }
      } else {
        maxV = 10;
        if (maxV == Math.max(estzero, estmin, estnorm)) {
          maxV = maxV + 5;
        }
      }

      setOptions({
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: true,
            color: "#1f1f1f",
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
            anchor: "end",
            offset: -20,
            borderRadius: 3,
            font: {
              size: 15,
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
            align: "center",
            backgroundColor: function (value, i, values) {
              if (value.dataset.data[value.dataIndex] > 0) {
                return "#fff";
              } else {
                return "";
              }
            },
          },
          tooltip: {
            titleFont: {
              size: 15,
              weight: "bold",
              family: '"Roboto", sans-serif',
            },
            bodyFont: {
              size: 12,

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
            beginAtZero: true,
            grid: {
              color: "#dbdbdb",
            },
            ticks: {
              color: "#dbdbdb",
              font: {
                size: 15,
              },

              stepSize: maxV / 5,
            },
            min: 0,
            max: maxV,
          },
          x: {
            grid: {
              color: "#bdbdbd",
            },
            ticks: {
              color: "#dbdbdb",
              font: {
                size: 15,
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (atualiza) {
        getSolic();
      }
    }, 300000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [atualiza]);

  return (
    <>
      <h1 className="text-center w-full text-2xl font-bold">
        Estoque Manutenção
      </h1>
      <Chart ref={chartRef} type="bar" data={chartData} options={options} />
    </>
  );
}
