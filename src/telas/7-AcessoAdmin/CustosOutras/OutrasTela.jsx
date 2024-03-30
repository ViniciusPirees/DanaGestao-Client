import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { styleAll } from "../../../css";
import Titulo from "../../components/NavBar/Titulo";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import getLogin from "../../components/Login/getLogin";
import { TbChartInfographic } from "react-icons/tb";
import { IoIosCreate } from "react-icons/io";
import { FaChartPie } from "react-icons/fa";
import { FaCalculator, FaCoins } from "react-icons/fa6";
import Custos from "./CustosOutras";
import LoadingGet from "../../components/Loading/LoadingGet";
import SelectOpt from "../../components/Graficos/SelectOpt";
import { GrMoney } from "react-icons/gr";
import axios from "axios";
import { PiProjectorScreenChart } from "react-icons/pi";
export default function OutrasTela() {
  const nav = useNavigate();
  const [logado, setLogado] = useState(null);
  useEffect(() => {
    getLogin().then((val) => {
      setLogado(val);
      if (!val) {
        nav("/");
      }
    });
  }, []);
  const [load, setLoad] = useState(false);

  const [preps, setPreps] = useState([]);

  const localstorage = localStorage;
  const prepAcessoContas =
    localstorage?.prepAcessoContas == undefined
      ? ""
      : JSON.parse(localstorage?.prepAcessoContas);
  const [prep, setPrep] = useState(prepAcessoContas);

  const getPreps = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getPreparers`
      );

      var prepssort = res.data.map(({ PREPARER }) => {
        var virn = PREPARER.search(",");
        var nome =
          PREPARER.substring(virn + 2, PREPARER.length) +
          " " +
          PREPARER.substring(0, virn);
        return [nome, PREPARER];
      });

      var prepsf = prepssort.sort().map((o) => {
        return { value: o[1], label: o[0].toLowerCase() };
      });
      setPreps(prepsf);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPreps();
  }, []);

  useEffect(() => {
    localStorage.setItem("prepAcessoContas", JSON.stringify(prep));
  }, [prep]);

  return (
    <div className="flex">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="colored"
      />
      <NavBar ativo="7"></NavBar>
      {logado && (
        <div className="w-full pl-[8.5em] pr-10 laptop:pl-[6.5em] tablet:pl-[6.5em]">
          <Titulo titulo="Custos (311212 - 311217 - 311258)" />
          {load && <LoadingGet></LoadingGet>}

          <div className="flex relative ml-5 mt-5 tablet:mt-5 ">
            <SelectOpt options={preps} setOpt={setPrep} opt={prep} />
          </div>

          <div className="mt-10 w-full">
            <Custos setLoad={setLoad} prep={prep}></Custos>
          </div>
        </div>
      )}
    </div>
  );
}
