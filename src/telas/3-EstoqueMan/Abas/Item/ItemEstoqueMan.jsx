import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import Titulo from "../../../components/NavBar/Titulo";
import SearchDropdown from "../../../components/Dropdowns/SearchDropdown";
import axios from "axios";
import CamPopUp from "../../../components/Camera/CamPopUp";
import { BsFillCameraFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmarEstPopUp from "./ConfirmarEstPopUp";
import Notificacao from "../../../components/Notificacao";
import Dropdown from "../../../components/Dropdowns/Dropdown";
import getLogin from "../../../components/Login/getLogin";
import { styleAll } from "../../../../css";
import LoadingGet from "../../../components/Loading/LoadingGet";
import SelectOpt from "../../../components/Graficos/SelectOpt";

export default function ItemEstoqueMan() {
  const navigate = useNavigate();
  const [usuAlt, setUsuAlt] = useState("");

  useEffect(() => {
    getLogin().then((val) => {
      setUsuAlt(`${val.cod} - ${val.nome}`);

      if (!val) {
        navigate("/");
      }
    });
  }, []);

  const [load, setLoad] = useState(false);

  const state = useLocation().state;
  //DESCRICAO
  const [descricao, setDescricao] = useState("");

  //TIPO DE MATERIAL
  const [tipomat, setTipoMat] = useState("");
  const [tiposmat, setTiposMat] = useState("");
  useEffect(() => {
    const getTipMat = async () => {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}/GetSearchDrop`,
          {
            params: {
              tabela: "TipoMaterial",
              order: "TipMatDesc",
            },
          }
        );
        setTiposMat(res.data);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar Tipo Material" + err]);
      }
    };
    getTipMat();
  }, []);

  //AREA
  const [areas, setAreas] = useState();
  const [area, setArea] = useState("");
  useEffect(() => {
    const getArea = async () => {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}/GetArea`
        );
        setAreas(res.data);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar Area" + err]);
      }
    };
    getArea();
  }, []);

  //MAQUIANS
  const [maquinasel, setmaquinasel] = useState("");
  const [maquinas, setmaquinas] = useState("");
  useEffect(() => {
    const getMaquinas = async () => {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}/GetMaquinas`
        );

        var maq = res.data.map((item) => {
          return { value: item.MaqCodigo, label: item.MaqCodigo };
        });

        setmaquinas(maq);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar Maquinas" + err]);
      }
    };
    getMaquinas();
  }, []);

  const getMaquinasSel = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getMaquinasItem`,
        {
          params: {
            estId: itemEst.EstManId,
          },
        }
      );

      var maq = res.data.map((item) => {
        return { value: item.EstManMaqCod, label: item.EstManMaqCod };
      });

      setmaquinasel(maq);
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar Maquinas" + err]);
    }
  };

  //LOCALIZACAO
  const [local, setLocal] = useState("");

  //ANEXO
  const [anexoArray, setAnexoArray] = useState([]);
  const [anexotela, setAnexoTela] = useState(false);

  //ESTOQUE MINIMO
  const [estmin, setEstMin] = useState("");

  //ESTOQUE MAXIMO
  const [estmax, setEstMax] = useState("");

  //SALDO
  const [saldo, setSaldo] = useState("");

  //STATUS
  const [status, setStatus] = useState("A");
  const [estNum, setEstNum] = useState("");
  //CRIAR
  const [nivel, setNivel] = useState("A");

  const criarEst = async () => {

    if (descricao.length == 0) {
      setLoad(false);
      return Notificacao(["erro", `Necessário digitar a Descrição.`]);
    }

    if (tipomat.length == 0) {
      setLoad(false);
      return Notificacao(["erro", `Necessário selecionar o Tipo do Material.`]);
    }

    if (area.length == 0) {
      setLoad(false);
      return Notificacao(["erro", `Necessário selecionar a Área.`]);
    }

    if (local.length == 0) {
      setLoad(false);
      return Notificacao(["erro", `Necessário digitar a Localização.`]);
    }

    if (estmin.length == 0) {
      setLoad(false);
      return Notificacao(["erro", `Necessário digitar o Estoque Mínimo`]);
    } else {
      if (estmin == 0) {
        setLoad(false);
        return Notificacao(["erro", `Estoque Mínimo tem que ser maior que 0`]);
      }
    }

    if (estmax.length == 0) {
      setLoad(false);
      return Notificacao(["erro", `Necessário digitar o Estoque Máximo`]);
    } else {
      if (Number(estmax) == 0) {
        setLoad(false);
        return Notificacao(["erro", `Estoque Máximo tem que ser maior que 0`]);
      } else if (Number(estmax) < Number(estmin)) {
        setLoad(false);
        return Notificacao([
          "erro",
          `Estoque Máximo tem que ser maior que o Estoque Mínimo`,
        ]);
      }
    }

    if (saldo.length == 0) {
      setLoad(false);
      return Notificacao(["erro", `Necessário digitar o Saldo`]);
    }

    const formdata = new FormData();
    anexoArray.forEach((file, i) => {
      formdata.append("image", file, i);
    });

    if (state.tipo == 1) {
      try {
        const res = await axios.post(
          `http://${import.meta.env.VITE_IP}/CriarEstMan`,
          formdata,
          {
            params: {
              descricao: descricao,
              area: area,
              local: local,
              estmin: estmin,
              estmax: estmax,
              saldo: saldo,
              tipmat: tipomat,
              status: status,
              estNum: estNum,
              nivel: nivel,
              maquinasel: maquinasel,
            },
          }
        );
        navigate("/EstoqueManutencao");
      } catch (err) {
        setLoad(false);
        Notificacao(["erro", "Erro ao criar Estoque"]);
        console.log(err);
      }
    } else if (state.tipo == 2) {
      try {
        const res = await axios.post(
          `http://${import.meta.env.VITE_IP}/EditarEstMan`,
          formdata,
          {
            params: {
              descricao: descricao,
              area: area,
              local: local,
              estmin: estmin,
              estmax: estmax,
              saldo: saldo,
              tipmat: tipomat,
              estId: estId,
              status: status,
              saldoAnt: itemEst.EstManSaldo,
              usuAlt: usuAlt,
              estNum: estNum,
              nivel: nivel,
              maquinasel: maquinasel,
            },
          }
        );
        navigate("/EstoqueManutencao");
      } catch (err) {
        setLoad(false);
        Notificacao(["erro", "Erro ao criar Estoque"]);
        console.log(err);
      }
    } else if (state.tipo == 3) {
    }
  };
  const [estId, setEstId] = useState("");
  const itemEst = state.val;

  useEffect(() => {
    if (state.tipo != 1) {
      setEstId(itemEst.EstManId);
      setDescricao(itemEst.EstManDesc);
      setArea([itemEst.EstManAreaDesc, itemEst.EstManAreaCod]),
        setTipoMat([itemEst.EstManTipMatDesc, itemEst.EstManTipMatCod]),
        setLocal(itemEst.EstManLoc),
        setEstMin(itemEst.EstManEstMin);
      setEstMax(itemEst.EstManEstMax);
      setSaldo(itemEst.EstManSaldo);
      setStatus(itemEst.EstManSta);
      setEstNum(itemEst.EstManNum);
      setNivel(itemEst.EstManNivel);
      getMaquinasSel();
      getAnexo();
    }
  }, []);

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const convertBase64ToFile = function (image) {
    const byteString = atob(image.replace(/-/g, "+").replace(/_/g, "/"));
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const newBlob = new Blob([ab], {
      type: "image/jpeg",
    });
    return newBlob;
  };

  const getAnexo = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getAnexoEstMan`,
        { params: { EstManId: itemEst.EstManId } }
      );
      if (res?.data.length > 0) {
        let imgsArray = [];
        res?.data?.forEach((file) => {
          var buffer = file.EstManAnexo.data;
          var base64 = _arrayBufferToBase64(buffer);
          var image = convertBase64ToFile(base64);
          imgsArray.push(image);
        });
        setAnexoArray(imgsArray);
      }
    } catch (err) {
      Notificacao(["erro", "Erro ao encontrar Imagem"]);
      console.log(err);
    }
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        criarEst();
      } else if (event.key === "Escape") {
        event.preventDefault();
        navigate("/EstoqueManutencao");
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [
    descricao,
    area,
    local,
    estmin,
    estmax,
    saldo,
    tipomat,
    anexoArray,
    estId,
    status,
    itemEst,
    usuAlt,
    maquinasel,
    nivel,
  ]);

  return (
    <>
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
      <div className="flex">
        <NavBar ativo="3"></NavBar>
        <div className="w-full pl-[8.5em] pr-10 tablet:pl-[6.5em] laptop:pl-[6.5em] h-screen overflow-y-auto">
          <div className="">
            {anexotela && (
              <CamPopUp
                setAnexoTela={setAnexoTela}
                anexoArray={anexoArray}
                setAnexoArray={setAnexoArray}
              ></CamPopUp>
            )}
            {load && <LoadingGet></LoadingGet>}
          </div>
          <Titulo titulo="Estoque Manutenção" />

          {state.tipo == 1 && ( //TIPO CRIAR --------------------------------------------------------------------------------------------
            <div className="mt-10 tablet:mt-6">
              <div className="flex tablet:hidden">
                <div className="laptop:w-[20%] desktop:w-[15%] tablet:w-[25%] mx-10">
                  <h1 className="text-[26px] font-bold mb-2">Número Item:</h1>
                  <input
                    type="text"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={estNum}
                    onChange={(e) => setEstNum(e.target.value)}
                  />
                </div>
                <div className="laptop:w-[75%] desktop:w-[65%] tablet:w-[65%] mx-10">
                  <h1 className="text-[26px]  font-bold mb-2">Descrição:</h1>
                  <input
                    type="text"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={descricao}
                    onChange={(e) => {
                      if (e.target.value.length > 250) {
                        setDescricao(e.target.value.slice(0, 250));
                      } else {
                        setDescricao(e.target.value);
                      }
                    }}
                  />
                </div>
                <div className="laptop:w-[15%] desktop:w-[15%] tablet:w-[20%] mx-10">
                  <h1 className="text-[26px]  font-bold mb-2">Status:</h1>
                  <Dropdown
                    options={["A", "I"]}
                    setValue={setStatus}
                    defaultValue={status == "A" ? "Ativo" : "Inativo"}
                    tipo={1}
                    textTablet={"tablet:text-2xl laptop:text-2xl "}
                  ></Dropdown>
                </div>
                <div className="laptop:w-[15%] desktop:w-[15%] tablet:w-[20%] mx-10">
                  <h1 className="text-[26px]  font-bold mb-2">Nível:</h1>
                  <Dropdown
                    options={["A", "B", "C", "D"]}
                    setValue={setNivel}
                    defaultValue={"Nível " + nivel}
                    tipo={2}
                    textTablet={"tablet:text-2xl laptop:text-2xl "}
                  ></Dropdown>
                </div>
              </div>
              <div className=" laptop:hidden desktop:hidden">
                <div className="flex">
                  <div className="laptop:w-[15%] desktop:w-[15%] tablet:w-[33%] tablet:ml-3">
                    <h1 className="text-[26px] font-bold mb-2">Número Item:</h1>
                    <input
                      type="text"
                      className={styleAll.inputSoW}
                      placeholder=""
                      value={estNum}
                      onChange={(e) => setEstNum(e.target.value)}
                    />
                  </div>

                  <div className="laptop:w-[15%] desktop:w-[15%] tablet:w-[33%] tablet:ml-12 ">
                    <h1 className="text-[26px]  font-bold mb-2">Status:</h1>
                    <Dropdown
                      options={["A", "I"]}
                      setValue={setStatus}
                      defaultValue={status == "A" ? "Ativo" : "Inativo"}
                      tipo={1}
                      textTablet={"tablet:text-2xl laptop:text-2xl "}
                    ></Dropdown>
                  </div>

                  <div className="laptop:w-[15%] desktop:w-[15%] tablet:w-[33%] tablet:ml-12">
                    <h1 className="text-[26px]  font-bold mb-2">Nível:</h1>
                    <Dropdown
                      options={["A", "B", "C", "D"]}
                      setValue={setNivel}
                      defaultValue={"Nível " + nivel}
                      tipo={2}
                      textTablet={"tablet:text-2xl laptop:text-2xl "}
                    ></Dropdown>
                  </div>
                </div>
                <div className="mt-4 laptop:mt-8 desktop:mt-8 laptop:ml-12 desktop:ml-12 laptop:w-[65%] desktop:w-[65%] tablet:mt-5 tablet:ml-3 tablet:w-[98%] ">
                  <h1 className="text-[26px]  font-bold mb-2">Descrição:</h1>
                  <input
                    type="text"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={descricao}
                    onChange={(e) => {
                      if (e.target.value.length > 250) {
                        setDescricao(e.target.value.slice(0, 250));
                      } else {
                        setDescricao(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="laptop:flex desktop:flex mt-10 tablet:mt-5">
                <div className="flex laptop:w-[65%] desktop:w-[65%]">
                  <div className="laptop:w-[50%] desktop:w-[50%] tablet:w-[65%] laptop:mx-10 desktop:mx-10 tablet:ml-3">
                    <h1 className="text-[26px]  font-bold mb-2">
                      Tipo Material:
                    </h1>
                    <SearchDropdown
                      options={tiposmat}
                      setValue={setTipoMat}
                      opt={6}
                      defValue={""}
                      textTablet={" tablet:text-2xl laptop:text-2xl "}
                    ></SearchDropdown>
                  </div>
                  <div className="laptop:w-[50%] desktop:w-[50%]  laptop:mx-10 desktop:mx-10 tablet:mx-8 tablet:hidden">
                    <h1 className="text-[26px] font-bold mb-2">Área:</h1>
                    <SearchDropdown
                      options={areas}
                      setValue={setArea}
                      opt={3}
                      defValue={""}
                      textTablet={" tablet:text-2xl laptop:text-2xl"}
                    ></SearchDropdown>
                  </div>
                  <div className="laptop:w-[100%] desktop:w-[100%] tablet:w-[35%] laptop:mx-10 desktop:mx-10 tablet:ml-12 laptop:hidden desktop:hidden">
                    <h1 className="text-[26px] font-bold mb-2">Localização:</h1>
                    <input
                      type="text"
                      className={styleAll.inputSoW}
                      placeholder=""
                      value={local}
                      onChange={(e) => {
                        if (e.target.value.length > 49) {
                          setLocal(e.target.value.slice(0, 49));
                        } else {
                          setLocal(e.target.value);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="laptop:w-[100%] desktop:w-[100%] tablet:w-[35%] laptop:mx-10 desktop:mx-10 tablet:mx-8 tablet:hidden">
                    <h1 className="text-[26px] font-bold mb-2">Localização:</h1>
                    <input
                      type="text"
                      className={styleAll.inputSoW}
                      placeholder=""
                      value={local}
                      onChange={(e) => {
                        if (e.target.value.length > 49) {
                          setLocal(e.target.value.slice(0, 49));
                        } else {
                          setLocal(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="laptop:w-[50%] desktop:w-[50%] tablet:w-[80%] laptop:mx-10 desktop:mx-10 tablet:ml-3 tablet:mt-5 laptop:hidden desktop:hidden">
                    <h1 className="text-[26px] font-bold mb-2">Área:</h1>
                    <SearchDropdown
                      options={areas}
                      setValue={setArea}
                      opt={3}
                      defValue={""}
                      textTablet={" tablet:text-2xl laptop:text-2xl"}
                    ></SearchDropdown>
                  </div>

                  <div className=" tablet:w-[20%] mt-12 tablet:mt-[4.25rem] laptop:mx-10 desktop:mx-10 tablet:ml-12">
                    <button
                      className="p-3 text-2xl flex w-full font-bold duration-200 hover:scale-105 bg-dana text-center rounded-md"
                      placeholder=""
                      onClick={() => setAnexoTela(true)}
                    >
                      <BsFillCameraFill className="mr-2  text-3xl"></BsFillCameraFill>
                      Anexo
                    </button>
                    <div className="">
                      {anexoArray?.length > 0 && (
                        <h1 className="text-center mt-2">Imagem Anexada</h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex laptop:mt-10 desktop:mt-10 tablet:mt-6">
                <div className="w-[20%] tablet:w-1/3 laptop:mx-10 desktop:mx-10 tablet:ml-3">
                  <h1 className="text-[26px] tablet:text-2xl font-bold mb-2">
                    Estoque Mínimo:
                  </h1>
                  <input
                    type="number"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={estmin}
                    onChange={(e) => setEstMin(e.target.value)}
                  />
                </div>
                <div className="w-[20%] tablet:w-1/3 laptop:mx-10 desktop:mx-10 tablet:ml-12">
                  <h1 className="text-[26px] tablet:text-2xl font-bold mb-2">
                    Estoque Máximo:
                  </h1>
                  <input
                    type="number"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={estmax}
                    onChange={(e) => setEstMax(e.target.value)}
                  />
                </div>
                <div className="w-[20%] tablet:w-1/3 laptop:mx-10 desktop:mx-10 tablet:ml-12">
                  <h1 className="text-[26px] tablet:text-2xl  font-bold mb-2">
                    Saldo:
                  </h1>
                  <input
                    type="number"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={saldo}
                    onChange={(e) => setSaldo(e.target.value)}
                  />
                </div>
                <div className="w-[45%]  hidden desktop:block laptop:mx-10 desktop:mx-10 tablet:ml-3">
                  <h1 className="text-[26px] tablet:text-2xl font-bold mb-2">
                    Máquinas:
                  </h1>
                  <SelectOpt
                    options={maquinas}
                    setOpt={setmaquinasel}
                    opt={maquinasel}
                    placeholder={"Máquinas"}
                    css={"text-2xl "}
                    cssprefix={"text-2xl p-1 "}
                  />
                </div>
              </div>
              <div className="w-[100%]  desktop:hidden mt-6 laptop:mx-10 desktop:mx-10 tablet:ml-3">
                <h1 className="text-[26px] tablet:text-2xl font-bold mb-2">
                  Máquinas:
                </h1>

                {maquinasel && (
                  <SelectOpt
                    options={maquinas}
                    setOpt={setmaquinasel}
                    opt={maquinasel}
                    placeholder={"Máquinas"}
                    css={"text-2xl "}
                    cssprefix={"text-2xl p-1 "}
                  />
                )}
              </div>
              <div className="flex mx-auto w-fit my-6">
                <button
                  onClick={() => {
                    setLoad(true);
                    criarEst();
                  }}
                  className="py-3 px-6 mt-6 mx-10 bg-[#249433] duration-200 hover:scale-105 text-3xl tablet:text-2xl font-bold rounded-md"
                >
                  Confirmar
                </button>
                <button
                  className="py-3 px-6 mt-6 mx-10 bg-dana duration-200 hover:scale-105 text-3xl tablet:text-2xl font-bold rounded-md"
                  onClick={() => navigate("/EstoqueManutencao")}
                >
                  Voltar
                </button>
              </div>
            </div>
          )}
          {state.tipo == 2 && ( //-------EDITAR---------------------------------------------------------------------------------------------------------------
            <div className="mt-10 tablet:mt-6">
              <div className="laptop:flex desktop:flex tablet:hidden">
                <div className="flex laptop:w-[35%] desktop:w-[30%] tablet:mb-5">
                  <div className="laptop:w-[50%] desktop:w-[50%] desktop:mx-10 laptop:ml-10">
                    <h1 className="text-[26px]  font-bold mb-2">
                      Cód. Estoque:
                    </h1>
                    <input
                      type="text"
                      className={styleAll.inputSoWDis}
                      placeholder=""
                      value={estId}
                      readOnly
                      disabled
                      onChange={(e) => setEstId(e.target.value)}
                    />
                  </div>
                  <div className="laptop:w-[50%] desktop:w-[50%] desktop:mx-10 laptop:mx-2">
                    <h1 className="text-[26px]  font-bold mb-2">
                      Número Item:
                    </h1>
                    <input
                      type="text"
                      className={styleAll.inputSoW}
                      placeholder=""
                      value={estNum}
                      onChange={(e) => setEstNum(e.target.value)}
                    />
                  </div>
                </div>
                <div className="laptop:w-[65%] desktop:w-[70%] flex">
                  <div className="w-[85%] desktop:mx-10">
                    <h1 className="text-[26px]  font-bold mb-2">Descrição:</h1>
                    <input
                      type="text"
                      className={styleAll.inputSoW}
                      placeholder=""
                      value={descricao}
                      onChange={(e) => {
                        if (e.target.value.length > 250) {
                          setDescricao(e.target.value.slice(0, 250));
                        } else {
                          setDescricao(e.target.value);
                        }
                      }}
                    />
                  </div>

                  <div className="w-[15%] laptop:ml-2 desktop:mx-10">
                    <h1 className="text-[26px]  font-bold mb-2">Status:</h1>
                    <Dropdown
                      options={["A", "I"]}
                      setValue={setStatus}
                      defaultValue={status == "A" ? "Ativo" : "Inativo"}
                      tipo={1}
                      textTablet={"tablet:text-2xl laptop:text-2xl "}
                    ></Dropdown>
                  </div>
                  <div className="laptop:w-[15%] desktop:w-[15%] tablet:w-[20%] mx-10">
                    <h1 className="text-[26px]  font-bold mb-2">Nível:</h1>
                    <Dropdown
                      options={["A", "B", "C", "D"]}
                      setValue={setNivel}
                      defaultValue={"Nível " + nivel}
                      tipo={2}
                      textTablet={"tablet:text-2xl laptop:text-2xl "}
                    ></Dropdown>
                  </div>
                </div>
              </div>

              <div className="laptop:hidden desktop:hidden">
                <div className="flex tablet:mb-5">
                  <div className="w-[35%] ml-3">
                    <h1 className="text-[26px]  font-bold mb-2">
                      Cód. Estoque:
                    </h1>
                    <input
                      type="text"
                      className={styleAll.inputSoWDis}
                      placeholder=""
                      value={estId}
                      readOnly
                      disabled
                      onChange={(e) => setEstId(e.target.value)}
                    />
                  </div>
                  <div className="w-[35%] ml-12">
                    <h1 className="text-[26px]  font-bold mb-2">
                      Número Item:
                    </h1>
                    <input
                      type="text"
                      className={styleAll.inputSoW}
                      placeholder=""
                      value={estNum}
                      onChange={(e) => setEstNum(e.target.value)}
                    />
                  </div>
                  <div className="w-[30%] ml-12">
                    <h1 className="text-[26px]  font-bold mb-2">Status:</h1>
                    <Dropdown
                      options={["A", "I"]}
                      setValue={setStatus}
                      defaultValue={status == "A" ? "Ativo" : "Inativo"}
                      tipo={1}
                      textTablet={"tablet:text-2xl laptop:text-2xl "}
                    ></Dropdown>
                  </div>
                  <div className="laptop:w-[15%] desktop:w-[15%] tablet:w-[20%] mx-10">
                    <h1 className="text-[26px]  font-bold mb-2">Nível:</h1>
                    <Dropdown
                      options={["A", "B", "C", "D"]}
                      setValue={setNivel}
                      defaultValue={nivel}
                      tipo={2}
                      textTablet={"tablet:text-2xl laptop:text-2xl "}
                    ></Dropdown>
                  </div>
                </div>
                <div className=" flex">
                  <div className="w-[100%] ml-3">
                    <h1 className="text-[26px]  font-bold mb-2">Descrição:</h1>
                    <input
                      type="text"
                      className={styleAll.inputSoW}
                      placeholder=""
                      value={descricao}
                      onChange={(e) => {
                        if (e.target.value.length > 250) {
                          setDescricao(e.target.value.slice(0, 250));
                        } else {
                          setDescricao(e.target.value);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="laptop:flex desktop:flex mt-10 tablet:mt-5">
                <div className="flex laptop:w-[65%] desktop:w-[65%]">
                  <div className="laptop:w-[50%] desktop:w-[50%] tablet:w-[65%] laptop:mx-10 desktop:mx-10 tablet:ml-3">
                    <h1 className="text-[26px]  font-bold mb-2">
                      Tipo Material:
                    </h1>
                    <SearchDropdown
                      options={tiposmat}
                      setValue={setTipoMat}
                      opt={6}
                      defValue={itemEst.EstManTipMatDesc}
                      textTablet={" tablet:text-2xl laptop:text-2xl "}
                    ></SearchDropdown>
                  </div>
                  <div className="laptop:w-[50%] desktop:w-[50%]  laptop:mx-10 desktop:mx-10 tablet:mx-8 tablet:hidden">
                    <h1 className="text-[26px] font-bold mb-2">Área:</h1>
                    <SearchDropdown
                      options={areas}
                      setValue={setArea}
                      opt={3}
                      defValue={itemEst.EstManAreaDesc}
                      textTablet={" tablet:text-2xl laptop:text-2xl"}
                    ></SearchDropdown>
                  </div>
                  <div className="laptop:w-[100%] desktop:w-[100%] tablet:w-[35%] laptop:mx-10 desktop:mx-10 tablet:ml-12 laptop:hidden desktop:hidden">
                    <h1 className="text-[26px] font-bold mb-2">Localização:</h1>
                    <input
                      type="text"
                      className={styleAll.inputSoW}
                      placeholder=""
                      value={local}
                      onChange={(e) => {
                        if (e.target.value.length > 49) {
                          setLocal(e.target.value.slice(0, 49));
                        } else {
                          setLocal(e.target.value);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="laptop:w-[100%] desktop:w-[100%] tablet:w-[35%] laptop:mx-10 desktop:mx-10 tablet:mx-8 tablet:hidden">
                    <h1 className="text-[26px] font-bold mb-2">Localização:</h1>
                    <input
                      type="text"
                      className={styleAll.inputSoW}
                      placeholder=""
                      value={local}
                      onChange={(e) => {
                        if (e.target.value.length > 49) {
                          setLocal(e.target.value.slice(0, 49));
                        } else {
                          setLocal(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="laptop:w-[50%] desktop:w-[50%] tablet:w-[80%] laptop:mx-10 desktop:mx-10 tablet:ml-3 tablet:mt-5 laptop:hidden desktop:hidden">
                    <h1 className="text-[26px] font-bold mb-2">Área:</h1>
                    <SearchDropdown
                      options={areas}
                      setValue={setArea}
                      opt={3}
                      defValue={itemEst.EstManAreaDesc}
                      textTablet={" tablet:text-2xl laptop:text-2xl"}
                    ></SearchDropdown>
                  </div>

                  <div className=" tablet:w-[20%] mt-12 tablet:mt-[4.25rem] laptop:mx-10 desktop:mx-10 tablet:ml-12">
                    <button
                      className="p-3 text-2xl flex w-full font-bold duration-200 hover:scale-105 bg-dana text-center rounded-md"
                      placeholder=""
                      onClick={() => setAnexoTela(true)}
                    >
                      <BsFillCameraFill className="mr-2  text-3xl"></BsFillCameraFill>
                      Anexo
                    </button>
                    <div className="">
                      {anexoArray?.length > 0 && (
                        <h1 className="text-center mt-2">Imagem Anexada</h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex laptop:mt-10 desktop:mt-10 tablet:mt-6">
                <div className="w-[20%] tablet:w-1/3 laptop:mx-10 desktop:mx-10 tablet:ml-3">
                  <h1 className="text-[26px] tablet:text-2xl font-bold mb-2">
                    Estoque Mínimo:
                  </h1>
                  <input
                    type="number"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={estmin}
                    onChange={(e) => setEstMin(e.target.value)}
                  />
                </div>
                <div className="w-[20%] tablet:w-1/3 laptop:mx-10 desktop:mx-10 tablet:ml-12">
                  <h1 className="text-[26px] tablet:text-2xl font-bold mb-2">
                    Estoque Máximo:
                  </h1>
                  <input
                    type="number"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={estmax}
                    onChange={(e) => setEstMax(e.target.value)}
                  />
                </div>
                <div className="w-[20%] tablet:w-1/3 laptop:mx-10 desktop:mx-10 tablet:ml-12">
                  <h1 className="text-[26px] tablet:text-2xl  font-bold mb-2">
                    Saldo:
                  </h1>
                  <input
                    type="number"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={saldo}
                    onChange={(e) => setSaldo(e.target.value)}
                  />
                </div>
                <div className="w-[45%]  hidden desktop:block laptop:mx-10 desktop:mx-10 tablet:ml-3">
                  <h1 className="text-[26px] tablet:text-2xl font-bold mb-2">
                    Máquinas:
                  </h1>
                  {maquinasel && (
                    <SelectOpt
                      options={maquinas}
                      setOpt={setmaquinasel}
                      opt={maquinasel}
                      placeholder={"Máquinas"}
                      css={"text-2xl "}
                      cssprefix={"text-2xl p-1 "}
                    />
                  )}
                </div>
              </div>
              <div className="w-[100%] mt-6  desktop:hidden laptop:mx-10 desktop:mx-10 tablet:ml-3">
                <h1 className="text-[26px] tablet:text-2xl font-bold mb-2">
                  Máquinas:
                </h1>
                {maquinasel && (
                  <SelectOpt
                    options={maquinas}
                    setOpt={setmaquinasel}
                    opt={maquinasel}
                    placeholder={"Máquinas"}
                    css={"text-2xl "}
                    cssprefix={"text-2xl p-1 "}
                  />
                )}
              </div>
              <div className="flex mx-auto w-fit my-6">
                <button
                  onClick={() => {
                    setLoad(true);
                    criarEst();
                  }}
                  className="py-3 px-6 mt-6 mx-10 bg-[#249433] duration-200 hover:scale-105 text-3xl tablet:text-2xl font-bold rounded-md"
                >
                  Confirmar
                </button>
                <button
                  className="py-3 px-6 mt-6 mx-10 bg-dana duration-200 hover:scale-105 text-3xl tablet:text-2xl font-bold rounded-md"
                  onClick={() => navigate("/EstoqueManutencao")}
                >
                  Voltar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
