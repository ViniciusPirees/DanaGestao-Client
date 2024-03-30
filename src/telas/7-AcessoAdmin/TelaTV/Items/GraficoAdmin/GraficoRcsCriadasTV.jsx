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
import { styleAll } from "../../../../../css";
import SelectOpt from "../../../../components/Graficos/SelectOpt";
import { FaEye } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function GraficoRcsCriadasTV({
  setLoad,
  ratio,
  prep,
  atualiza,
}) {
  const [items, setItems] = useState([]);
  const [options, setOptions] = useState({
    aspectRatio: 1 / 1,
  });

  var groupBy = function (xs) {
    return xs.reduce(function (rv, x) {
      (rv[x["CREATION_DATE"]] = rv[x["CREATION_DATE"]] || []).push(x);
      return rv;
    }, {});
  };

  const getRcsCriadas = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getGraficos`,
        {
          params: {
            tabela: "RcsCriadas",
            prep: prep,
          },
        }
      );

      if (res?.data?.code) {
        setLoad(false);
        const chartData2 = {
          labels: [""],
          datasets: [
            {
              label: "Qtde. de RCs criadas no dia",
              data: [0],
              borderWidth: 5,
              barThickness: tam,
              borderColor: ["#206ba3"],
              backgroundColor: ["#2986cc "],
            },
          ],
        };
        setDataBack(chartData2);

        return Notificacao([
          "atencao",
          `Nenhuma RC foi encontrada pelo preparador(a): ${prep}.`,
        ]);
      }
      if (res?.data == 0) {
        setLoad(false);
        const chartData2 = {
          labels: [""],
          datasets: [
            {
              label: "Qtde. de RCs criadas no dia",
              data: [0],
              borderWidth: 5,
              barThickness: tam,
              borderColor: ["#206ba3"],
              backgroundColor: ["#2986cc "],
            },
          ],
        };
        setDataBack(chartData2);

        return Notificacao([
          "atencao",
          `Nenhuma RC foi encontrada pelo preparador(a): ${prep}.`,
        ]);
      }

      var group = groupBy(res.data);

      var data = [],
        labels = [];

     Object.keys(group)
       .sort()
       .map(function (key, index) {
         labels.push(key);
         data.push(group[key].length);
       });

      var dataF = [],
        labelsF = [];

      for (var y = 6; y >= 0; y--) {
        let dateEpc = Date.parse(new Date().toDateString()) - y * 86400000;
        let newDate = new Date(dateEpc);
        const yyyy = newDate.getFullYear();
        let mm = newDate.getMonth() + 1; // Months start at 0!
        let dd = newDate.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        const formattedToday =
          dd + "/" + mm + "/" + yyyy.toString().substring(2, 4);
        labelsF.push(formattedToday);
        var verd = false;
        labels.forEach((date, i) => {
          var dp = Date.parse(date);
          if (dp == dateEpc - 10800000) {
            verd = true;
            dataF.push(data[i]);
          }
        });
        if (!verd) {
          dataF.push(0);
        }
      }

      var tam = 20 + 40 - dataF.length * 4;

      var maxV = 0;

      if (Math.max.apply(Math, dataF) > 1000) {
        maxV = Number(
          Number(Math.ceil(Math.max.apply(Math, dataF) / 1000) * 1000)
        );
        if (maxV == Math.max.apply(Math, dataF)) {
          maxV = maxV + 1000;
        }
      } else if (Math.max.apply(Math, dataF) > 100) {
        maxV = Number(
          Number(Math.ceil(Math.max.apply(Math, dataF) / 100) * 100)
        );
        if (maxV == Math.max.apply(Math, dataF)) {
          maxV = maxV + 100;
        }
      } else if (Math.max.apply(Math, dataF) > 10) {
        maxV = Number(Number(Math.ceil(Math.max.apply(Math, dataF) / 10) * 10));
        if (maxV == Math.max.apply(Math, dataF)) {
          maxV = maxV + 10;
        }
      } else {
        maxV = 10;
        if (maxV == Math.max.apply(Math, dataF)) {
          maxV = maxV + 5;
        }
      }

      const chartData2 = {
        labels: labelsF,
        datasets: [
          {
            label: "Qtde. de RCs criadas no dia",
            data: dataF,
            borderWidth: 5,
            barThickness: tam,
            borderColor: ["#206ba3"],
            backgroundColor: ["#2986cc "],
          },
        ],
      };
      setDataBack(chartData2);

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
            stacked: true,
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
            stacked: true,
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

        aspectRatio: 1 / 1,
        animation: true,
      });

      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [dataBack, setDataBack] = useState({
    labels: [""],
    datasets: [
      {
        data: [0],
      },
    ],
  });

  useEffect(() => {
    getRcsCriadas();
  }, [prep]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (atualiza) {
        getRcsCriadas();
      }
    }, 300000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [atualiza]);
  return (
    <>
      <div className="flex mx-auto">
        <h1 className="text-center text-2xl w-full   font-bold">
          Qtde. de RCs Criadas
        </h1>
      </div>
      <Chart type="bar" data={dataBack} options={options} />
    </>
  );
}
