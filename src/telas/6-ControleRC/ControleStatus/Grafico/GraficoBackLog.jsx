import React, { useEffect, useRef, useState } from "react";
import LoadingGet from "../../../components/Loading/LoadingGet";
import axios from "axios";
import Notificacao from "../../../components/Notificacao";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import FiltroClick from "../../../components/Graficos/FiltroClick";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraficoBackLog({
  itemsTipo,
  setitemsTipo,
  databackLog,
}) {
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
    var labels = itemsTipo
      .filter(({ ativo }) => ativo)
      .map((item) => {
        return item.id;
      });

    var cores = itemsTipo
      .filter(({ ativo }) => ativo)
      .map((item) => {
        return item.cor;
      });

    var data = labels.map((lbl) => {
      var value = 0;
      databackLog
        .filter((item) => lbl == item.TIPO)
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

    setDataBack({
      labels: labels,

      datasets: [
        {
          data: data,
          backgroundColor: cores,
          borderColor: "#1f1f1f",
          borderWidth: 3,
        },
      ],
    });
  }, [itemsTipo, setitemsTipo, databackLog]);

  const options = {
    plugins: {
      legend: {
        onClick: function () {},
        display: true,
        labels: {
          color: "#fff",
          filter: function (item, chart) {
            if (chart.datasets[0].data[item.index] > 0) {
              return item;
            }
          },
          font: {
            size: 15,
            weight: "bold",
            family: ' "Roboto", sans-serif',
          },
        },
      },

      datalabels: {
        display: true,
        color: "#fff",
        formatter: function (value, ctx) {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });

          if ((value * 100) / sum > 5) {
            var num = numberWithCommas(Number(value).toFixed(0))

            return `R$ ${num}`
          } else {
            value = "";
            return value;
          }
        },

        anchor: "center",

        backgroundColor: function (value, i, values) {
          let sum = 0;
          let dataArr = value.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });

          if ((value.dataset.data[value.dataIndex] * 100) / sum > 5) {
            return "#1f1f1f";
          } else {
            return "";
          }
        },
        borderRadius: 3,
        font: {
          size: 18,
          weight: "bold",
          family: '"Roboto", sans-serif',
        },
        align: "center",
        textAlign: "center",
        padding: {
          top: 3,
          bottom: 0,
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

    animation: true,
  };

  return (
    <div className="p-10 tablet:p-2 w-full">
      <h1 className="text-3xl tablet:text-2xl font-bold mb-16 tablet:mb-4 uppercase text-center">
        Backlog Contas 311259/311250
      </h1>
      <div className="">
        <Pie data={dataBack} options={options} />
      </div>
    </div>
  );
}
