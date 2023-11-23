import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import Titulo from "../../../components/Titulo";
import SearchDropdown from "../../../components/SearchDropdown";
import axios from "axios";
import CamPopUp from "../../../components/CamPopUp";
import { BsFillCameraFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmarEstPopUp from "./ConfirmarEstPopUp";
import Notificacao from "../../../components/Notificacao";
import Dropdown from "../../../components/Dropdown";
import getLogin from "../../../components/getLogin";
import { styleAll } from "../../../../css";

export default function ItemEstoqueMan() {
  const navigate = useNavigate();
  const [usuAlt, setUsuAlt] = useState("");
  const [logado, setLogado] = useState(null);
  const [nivel, setNivel] = useState(0);
  useEffect(() => {
    getLogin().then((val) => {
      setLogado(val);
      setUsuAlt(`${val.cod} - ${val.nome}`);
      setNivel(val.n)
      if (!val) {
        navigate("/");
      }
    });
  }, []);

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
          `http://${import.meta.env.VITE_IP}:4400/GetSearchDrop`,
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
          `http://${import.meta.env.VITE_IP}:4400/GetArea`
        );
        setAreas(res.data);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao buscar Area" + err]);
      }
    };
    getArea();
  }, []);

  //LOCALIZACAO
  const [local, setLocal] = useState("");

  //ANEXO
  const [anexotela, setAnexoTela] = useState(false);
  const [anexofile, setAnexoFile] = useState(null);

  //ESTOQUE MINIMO
  const [estmin, setEstMin] = useState("");

  //ESTOQUE MAXIMO
  const [estmax, setEstMax] = useState("");

  //SALDO
  const [saldo, setSaldo] = useState("");

  //STATUS
  const [status, setStatus] = useState("A");

  //CRIAR

  const [ativoConfirm, setConfirm] = useState(false);
  const [params, setParams] = useState(null);
  const criarEst = async () => {
    if (descricao.length == 0) {
      return Notificacao(["erro", `Necessário digitar a Descrição.`]);
    }

    if (tipomat.length == 0) {
      return Notificacao(["erro", `Necessário selecionar o Tipo do Material.`]);
    }

    if (area.length == 0) {
      return Notificacao(["erro", `Necessário selecionar a Área.`]);
    }

    if (local.length == 0) {
      return Notificacao(["erro", `Necessário digitar a Localização.`]);
    }

    if (estmin.length == 0) {
      return Notificacao(["erro", `Necessário digitar o Estoque Mínimo`]);
    } else {
      if (estmin == 0) {
        return Notificacao(["erro", `Estoque Mínimo tem que ser maior que 0`]);
      }
    }

    if (estmax.length == 0) {
      return Notificacao(["erro", `Necessário digitar o Estoque Máximo`]);
    } else {
      if (estmax == 0) {
        return Notificacao(["erro", `Estoque Máximo tem que ser maior que 0`]);
      } else if (estmax < estmin) {
        return Notificacao([
          "erro",
          `Estoque Máximo tem que ser maior que o Estoque Mínimo`,
        ]);
      }
    }

    if (saldo.length == 0) {
      return Notificacao(["erro", `Necessário digitar o Saldo`]);
    }

    const formdata = new FormData();
    formdata.append("image", anexofile);

    if (state.tipo == 1) {
      try {
        const res = await axios.post(
          `http://${import.meta.env.VITE_IP}:4400/CriarEstMan`,
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
            },
          }
        );
        navigate("/EstoqueManutencao");
      } catch (err) {
        Notificacao(["erro", "Erro ao criar Estoque"]);
        console.log(err);
      }
    } else if (state.tipo == 2) {
      try {
        const res = await axios.post(
          `http://${import.meta.env.VITE_IP}:4400/EditarEstMan`,
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
            },
          }
        );
        navigate("/EstoqueManutencao");
      } catch (err) {
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
        `http://${import.meta.env.VITE_IP}:4400/getAnexoEstMan`,
        { params: { EstManId: itemEst.EstManId } }
      );
      if (res?.data.length > 0) {
        var buffer = res?.data[0].EstManAnexo.data;
        var base64 = _arrayBufferToBase64(buffer);
        var image = convertBase64ToFile(base64);

        setAnexoFile(image);
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
    estId,
    status,
    itemEst,
    usuAlt,
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
        <div className="w-full ml-[8.5em] mr-10 h-full overflow-y-auto">
          <div className="">
            {anexotela && (
              <CamPopUp
                setAnexoTela={setAnexoTela}
                setAnexoFile={setAnexoFile}
                anexofile={anexofile}
              ></CamPopUp>
            )}
            {ativoConfirm && (
              <ConfirmarEstPopUp
                params={params}
                anexo={anexofile}
                setConfirm={setConfirm}
              ></ConfirmarEstPopUp>
            )}
          </div>
          <Titulo titulo="Estoque Manutenção" />

          {state.tipo == 1 && ( //TIPO CRIAR --------------------------------------------------------------------------------------------
            <div className="mt-10">
              <div className="flex">
                <div className="w-[85%] mx-10">
                  <h1 className="text-[26px]  font-bold mb-2">Descrição:</h1>
                  <input
                    type="text"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
                <div className="w-[15%] mx-10">
                  <h1 className="text-[26px]  font-bold mb-2">Status:</h1>
                  <Dropdown
                    options={["A", "I"]}
                    setValue={setStatus}
                    defaultValue={status == "A" ? "Ativo" : "Inativo"}
                    tipo={1}
                  ></Dropdown>
                </div>
              </div>
              <div className="flex mt-10">
                <div className="w-[30%] mx-10">
                  <h1 className="text-[26px]  font-bold mb-2">
                    Tipo Material:
                  </h1>
                  <SearchDropdown
                    options={tiposmat}
                    setValue={setTipoMat}
                    opt={6}
                    defValue={""}
                  ></SearchDropdown>
                </div>
                <div className="w-[40%] mx-10">
                  <h1 className="text-[26px] font-bold mb-2">Área:</h1>
                  <SearchDropdown
                    options={areas}
                    setValue={setArea}
                    opt={3}
                    defValue={""}
                  ></SearchDropdown>
                </div>
                <div className="w-[45%] mx-10">
                  <h1 className="text-[26px] font-bold mb-2">Localização:</h1>
                  <input
                    type="text"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                  />
                </div>

                <div className="w-[15%] mx-10">
                  <h1 className="text-[26px] font-bold mb-2">Anexo:</h1>
                  <button
                    className="p-3 text-2xl flex w-full font-bold duration-200 hover:scale-105 bg-dana text-center rounded-md"
                    placeholder=""
                    onClick={() => setAnexoTela(true)}
                  >
                    <BsFillCameraFill className="mr-2 ml-3 text-3xl"></BsFillCameraFill>
                    Anexo
                  </button>
                  <div className="">
                    {anexofile?.size > 0 && (
                      <h1 className="text-center mt-2">Imagem Anexada</h1>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex mt-10">
                <div className="w-[33%] mx-10">
                  <h1 className="text-[26px] font-bold mb-2">
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
                <div className="w-[33%] mx-10">
                  <h1 className="text-[26px] font-bold mb-2">
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
                <div className="w-[33%] mx-10">
                  <h1 className="text-[26px] font-bold mb-2">Saldo:</h1>
                  <input
                    type="number"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={saldo}
                    onChange={(e) => setSaldo(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex mx-auto w-fit my-6">
                <button
                  onClick={() => criarEst()}
                  className="py-3 px-6 mt-6 mx-10 bg-[#249433] duration-200 hover:scale-105 text-3xl font-bold rounded-md"
                >
                  Confirmar
                </button>
                <button
                  className="py-3 px-6 mt-6 mx-10 bg-dana duration-200 hover:scale-105 text-3xl font-bold rounded-md"
                  onClick={() => navigate("/EstoqueManutencao")}
                >
                  Voltar
                </button>
              </div>
            </div>
          )}
          {state.tipo == 2 && ( //-------EDITAR---------------------------------------------------------------------------------------------------------------
            <div className="mt-10">
              <div className="flex">
                <div className="w-[15%] mx-10">
                  <h1 className="text-[26px]  font-bold mb-2">Cód. Estoque:</h1>
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
                <div className="w-[75%] mx-10">
                  <h1 className="text-[26px]  font-bold mb-2">Descrição:</h1>
                  <input
                    type="text"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
                <div className="w-[15%] mx-10">
                  <h1 className="text-[26px]  font-bold mb-2">Status:</h1>
                  <Dropdown
                    options={["A", "I"]}
                    setValue={setStatus}
                    defaultValue={status == "A" ? "Ativo" : "Inativo"}
                    tipo={1}
                  ></Dropdown>
                </div>
              </div>
              <div className="flex mt-10">
                <div className="w-[30%] mx-10">
                  <h1 className="text-[26px]  font-bold mb-2">
                    Tipo Material:
                  </h1>
                  <SearchDropdown
                    options={tiposmat}
                    setValue={setTipoMat}
                    opt={6}
                    defValue={itemEst.EstManTipMatDesc}
                  ></SearchDropdown>
                </div>
                <div className="w-[40%] mx-10">
                  <h1 className="text-[26px] font-bold mb-2">Área:</h1>
                  <SearchDropdown
                    options={areas}
                    setValue={setArea}
                    opt={3}
                    defValue={itemEst.EstManAreaDesc}
                  ></SearchDropdown>
                </div>
                <div className="w-[45%] mx-10">
                  <h1 className="text-[26px] font-bold mb-2">Localização:</h1>
                  <input
                    type="text"
                    className={styleAll.inputSoW}
                    placeholder=""
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                  />
                </div>

                <div className="w-[15%] mx-10">
                  <h1 className="text-[26px] font-bold mb-2">Anexo:</h1>
                  <button
                    className="p-3 text-3xl bg-transparent duration-200 hover:scale-105 w-full border-[2px] rounded-md"
                    placeholder=""
                    onClick={() => setAnexoTela(true)}
                  >
                    <BsFillCameraFill className="mx-auto "></BsFillCameraFill>
                  </button>
                  <div className="">
                    {anexofile?.size > 0 && (
                      <h1 className="text-center mt-2">Imagem Anexada</h1>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex mt-10">
                <div className="w-[33%] mx-10">
                  <h1 className="text-[26px] font-bold mb-2">
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
                <div className="w-[33%] mx-10">
                  <h1 className="text-[26px] font-bold mb-2">
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
                <div className="w-[33%] mx-10">
                  <h1 className="text-[26px] font-bold mb-2">Saldo:</h1>
                  <input
                    type="number"
                    disabled
                    className={styleAll.inputSoWDis}
                    placeholder=""
                    value={saldo}
                    onChange={(e) => setSaldo(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex mx-auto w-fit my-6">
                <button
                  onClick={() => criarEst()}
                  className="py-3 px-6 mt-6 mx-10 bg-[#249433] duration-200 hover:scale-105 text-3xl font-bold rounded-md"
                >
                  Confirmar
                </button>
                <button
                  className="py-3 px-6 mt-6 mx-10 bg-dana text-3xl duration-200 hover:scale-105 font-bold rounded-md"
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
