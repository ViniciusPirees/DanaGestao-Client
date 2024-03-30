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

export default function SaldoEmTerceiros({ saldo }) {

  const chartData = {
    labels: ["Qtd. Saída", "Qtd. Retorno "],
    datasets: [
      {
        label: "Valores: ",
        data: [saldo.QUANT, saldo.QTDE_RET],
        borderWidth: 3,
        barThickness: 50,
        borderColor: ["#a30000", "#cc7716", "#1a6b21"],
        backgroundColor: ["#cc0000", "#ff951c", "#21862a"],
      },
    ],
  };

  var maxV = 0;

  if (Math.max(saldo.QUANT, saldo.QTDE_RET) > 1000) {
    maxV = Number(
      Number(
        Math.ceil(
          Math.max(saldo.QUANT, saldo.QTDE_RET) / 1000
        ) * 1000
      )
    );

    if (maxV == Math.max(saldo.QUANT, saldo.QTDE_RET)) {
      maxV = maxV + 1000;
    }
  } else if (
    Math.max(saldo.QUANT, saldo.QTDE_RET) > 100
  ) {
    maxV = Number(
      Number(
        Math.ceil(
          Math.max(saldo.QUANT, saldo.QTDE_RET) / 100
        ) * 100
      )
    );
    if (maxV == Math.max(saldo.QUANT, saldo.QTDE_RET)) {
      maxV = maxV + 100;
    }
  } else if (
    Math.max(saldo.QUANT, saldo.QTDE_RET) > 10
  ) {
    maxV = Number(
      Number(
        Math.ceil(
          Math.max(saldo.QUANT, saldo.QTDE_RET) / 10
        ) * 10
      )
    );
    if (maxV == Math.max(saldo.QUANT, saldo.QTDE_RET)) {
      maxV = maxV + 10;
    }
  } else {
    maxV = 10;
    if (maxV == Math.max(saldo.QUANT, saldo.QTDE_RET)) {
      maxV = maxV + 5;
    }
  }

  const options = {
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
    aspectRatio: 1 / 1,
    animation: true,
  };

  return (
    <>
      <h1 className="text-center w-full text-2xl font-bold">
        Saldo em Terceiros
      </h1>
      <Chart type="bar" data={chartData} options={options} />
    </>
  );
}
