import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Notificacao from "../../../components/Notificacao";
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

export default function GraficoPrazo({ setStatus, status, databackLog }) {
  const [dataBack, setDataBack] = useState({
    labels: [""],
    datasets: [
      {
        data: [0],
      },
    ],
  });

  function numberWithCommas(x) {
    return x
      .toString()
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  useEffect(() => {
    var labels = status
      .filter(({ ativo }) => ativo)
      .map((item) => {
        return item.id;
      });

    var data = labels.map((lbl) => {
      var value = 0;
      databackLog
        .filter((item) => lbl == item.MesPrev)
        .map((item) => {
          var pendente =
            item.PENDING_TOTAL_OC == null ?? item.PENDING_TOTAL_OC == 0
              ? item.PENDING_TOTAL_RC
              : item.PENDING_TOTAL_OC;
          return pendente;
        })
        .forEach((num) => {
          value += num;
        });

      return value;
    });

    var dataF = [];
    var labelsF = [];

    labels.forEach((item, i) => {
      if (data[i] > 0) {
        labelsF.push(item);
        dataF.push(data[i]);
      }
    });

    var tam = 20 + 70 - labelsF.length * 4;

    setDataBack({
      labels: labelsF,

      datasets: [
        {
          data: dataF,
          backgroundColor: "#1C85C7",
          barThickness: tam,
          borderColor: "#1f1f1f",
          borderWidth: 3,
        },
      ],
    });
  }, [status, setStatus, databackLog]);

  var maxV = 0;

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
            var num = numberWithCommas(Number(value).toFixed(0))

            return `R$ ${num}`
          } else {
            value = "";
            return value;
          }
        },
        anchor: "end",
        offset: -20,
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
        },
        min: 0,
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

    aspectRatio: 1 / 1,
    animation: true,
  };

  return (
    <div className="p-10 tablet:p-2 w-full">
      <h1 className="text-3xl tablet:text-2xl w-full font-bold uppercase text-center">
        PRAZO DE ENTREGA
      </h1>
      <div className="p-10 tablet:p-2">
        <Chart type="bar" data={dataBack} options={options} />
      </div>
    </div>
  );
}
