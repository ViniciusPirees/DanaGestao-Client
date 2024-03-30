import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import Notificacao from "../../components/Notificacao";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Dropdown from "../../components/Dropdowns/Dropdown";
import getLogin from "../../components/Login/getLogin";
import { styleAll } from "../../../css";
export default function EditPopup({
  setTipo,
  criacao,
  tipo,
  setSucesso,
  values,
}) {
  const [height, setHeight] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [titTipo, setTitTipo] = useState(" - Criar");
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");
  const [tabela, settabela] = useState("");
  const [cod, setcod] = useState("");
  const [desc, setdesc] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [alteraAtivo, setAlteraAtivo] = useState(false);

  const [nivel, setNivel] = useState(0);
  useEffect(() => {
    getLogin().then((val) => {
      setNivel(val.n);

      if (!val.val) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    switch (criacao) {
      case 1:
        setHeight(window.innerWidth > 1200 ? 31 : 26);
        setTitulo("Máquinas");
        switch (tipo) {
          case 2:
            setTitTipo(" - Editar");
            setInput(values?.MaqCodigo);
            setInput2(values?.MaqDescricao);
            setInput3(values?.MaqDiv);
            setInput4(values?.MaqSetor);
            setInput5(values?.MaqDivEbs);
            setDisabled(true);
            setDisabled2(false);
            break;
          case 3:
            setTitTipo(" - Excluir");
            setInput(values?.MaqCodigo);
            setInput2(values?.MaqDescricao);
            setInput3(values?.MaqDiv);
            setInput4(values?.MaqSetor);
            setInput5(values?.MaqDivEbs);
            setDisabled(true);
            setDisabled2(true);
            break;
        }
        break;
      case 2:
        setHeight(21);
        settabela("Manutentor");
        setdesc("ManNome");
        setcod("ManCod");
        setTitulo("Manutentor");
        switch (tipo) {
          case 2:
            setTitTipo(" - Editar");
            setInput(values?.ManNome);
            setInput2(values?.ManCod);
            setDisabled2(false);
            break;
          case 3:
            setTitTipo(" - Excluir");
            setInput(values?.ManNome);
            setInput2(values?.ManCod);
            setDisabled2(true);
            break;
        }
        break;
      case 3:
        setHeight(21);
        setTitulo("Área");
        settabela("Area");
        setdesc("AreaDesc");
        setcod("AreaCod");
        switch (tipo) {
          case 2:
            setTitTipo(" - Editar");
            setInput(values?.AreaDesc);
            setInput2(values?.AreaCod);
            setDisabled2(false);
            break;
          case 3:
            setTitTipo(" - Excluir");
            setInput(values?.AreaDesc);
            setInput2(values?.AreaCod);
            setDisabled2(true);
            break;
        }
        break;
      case 4:
        setHeight(21);
        setTitulo("Fornecedor");

        switch (tipo) {
          case 2:
            setTitTipo(" - Editar");
            setInput(values?.ForDes);
            setInput2(values?.ForCod);
            setDisabled2(false);
            break;
          case 3:
            setTitTipo(" - Excluir");
            setInput(values?.ForDes);
            setInput2(values?.ForCod);
            setDisabled2(true);
            break;
        }
        break;
      case 5:
        setHeight(21);
        setTitulo("Solicitante");
        switch (tipo) {
          case 2:
            setTitTipo(" - Editar");
            setInput(values?.SntDescricao);
            setInput2(values?.SntCod);
            setDisabled2(false);
            break;
          case 3:
            setTitTipo(" - Excluir");
            setInput(values?.SntDescricao);
            setInput2(values?.SntCod);
            setDisabled2(true);
            break;
        }
        break;
      case 6:
        setHeight(21);
        setTitulo("Tipo Material");
        settabela("TipoMaterial");
        setdesc("TipMatDesc");
        setcod("TipMatCod");
        switch (tipo) {
          case 2:
            setTitTipo(" - Editar");
            setInput(values?.TipMatDesc);
            setInput2(values?.TipMatCod);
            setDisabled2(false);
            break;
          case 3:
            setTitTipo(" - Excluir");
            setInput(values?.TipMatDesc);
            setInput2(values?.TipMatCod);
            setDisabled2(true);
            break;
        }
        break;
      case 7:
        setHeight(30);
        setTitulo("Usuário");
        switch (tipo) {
          case 1:
            setInput3("1");
            break;
          case 2:
            setHeight(30);
            setTitTipo(" - Editar");
            setInput(values?.UsuCod);
            setInput2(values?.UsuNome);
            setInput3(values?.UsuNivel);
            setInput4(values?.UsuLogin);
            setInput5("");
            setInput6(values?.UsuEmail);
            setDisabled2(false);
            break;
          case 3:
            setHeight(30);
            setTitTipo(" - Excluir");
            setInput(values?.UsuCod);
            setInput2(values?.UsuNome);
            setInput3(values?.UsuNivel);
            setInput4(values?.UsuLogin);
            setInput5("");
            setInput6(values?.UsuEmail);
            setDisabled2(true);
            break;
        }
        break;
      case 8:
        setHeight(21);
        setTitulo("Tipo Status");
        settabela("TipoStatus");
        setdesc("TipStaDesc");
        setcod("TipStaCod");
        switch (tipo) {
          case 2:
            setTitTipo(" - Editar");
            setInput(values?.TipStaDesc);
            setInput2(values?.TipStaCod);
            setDisabled2(false);
            break;
          case 3:
            setTitTipo(" - Excluir");
            setInput(values?.TipStaDesc);
            setInput2(values?.TipStaCod);
            setDisabled2(true);
            break;
        }
        break;
      case 9:
        setHeight(21);
        setTitulo("Status Prev.");
        settabela("StatusPrev");
        setdesc("StaPreDesc");
        setcod("StaPreCod");
        switch (tipo) {
          case 2:
            setTitTipo(" - Editar");
            setInput(values?.StaPreDesc);
            setInput2(values?.StaPreCod);
            setDisabled2(false);
            break;
          case 3:
            setTitTipo(" - Excluir");
            setInput(values?.StaPreDesc);
            setInput2(values?.StaPreCod);
            setDisabled2(true);
            break;
        }
        break;
    }
  }, []);

  const criarCad = async () => {
    if (input.length == 0) {
      if (criacao == 1) {
        Notificacao(["atencao", "Obrigatório digitar o número da máquina."]);
        return;
      }
    }
    if (input.length > 20) {
      if (criacao == 1) {
        Notificacao([
          "atencao",
          "Número da máquina deve ter menos de 20 caracteres",
        ]);
        return;
      }
    }
    if (input2.length == 0 && criacao == 1) {
      Notificacao(["atencao", "Obrigatório digitar descrição da máquina"]);
      return;
    }
    var existe = false;

    if (input2.length == 0 && criacao == 7) {
      Notificacao(["atencao", "Obrigatório digitar o nome do usuário"]);
      return;
    }

    if (input4.length == 0 && criacao == 7) {
      Notificacao(["atencao", "Obrigatório digitar o login do usuário"]);
      return;
    }

    if (input5.length == 0 && criacao == 7 && tipo == 1) {
      Notificacao(["atencao", "Obrigatório digitar a senha do usuário"]);
      return;
    }

    if (criacao == 1 && tipo == 1) {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}/getMaqNum`,
          {
            params: {
              input: input,
            },
          }
        );

        if (res?.data[0][""] > 0) {
          existe = true;
        } else {
          existe = false;
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (criacao == 7 && tipo != 3) {
      try {
        const res = await axios.get(
          `http://${import.meta.env.VITE_IP}/getLoginCad`,
          {
            params: {
              login: input4,
              cod: input,
            },
          }
        );

        if (res?.data.length > 0) {
          existe = true;
        } else {
          existe = false;
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (!existe) {
      try {
        const res = await axios.post(
          `http://${import.meta.env.VITE_IP}/crudCad`,
          {
            params: {
              input1: input,
              input2: input2,
              input3: input3,
              input4: input4,
              input5: input5,
              input6: input6,
              tipo: tipo,
              tabela: tabela,
              cod: cod,
              desc: desc,
              criacao: criacao,
            },
          }
        );
        setSucesso(true);
        setTipo(0);
        if (criacao == 7 && tipo == 2) {
          Notificacao([
            "atencao",
            "Necessário desconectar com o usuário alterado",
          ]);
        }
        Notificacao(["sucesso", "Sucesso ao concluir"]);
      } catch (err) {
        console.log(err);
        Notificacao(["erro", "Erro ao concluir" + err]);
      }
    } else {
      if (criacao == 1) {
        Notificacao([
          "erro",
          "Já existe o cadastro de uma máquina com esse número",
        ]);
      } else {
        Notificacao([
          "erro",
          "Já existe o cadastro de um usuário com esse login",
        ]);
      }
    }
  };

  return (
    <div className="z-[3]">
      <div
        onClick={() => setTipo(0)}
        className="opacity-50 bg-[#000] absolute top-0 left-0 w-full h-full z-[20]"
      ></div>

      <div
        style={{ height: height + "em" }}
        className={`absolute bg-[#1f1f1f] left-0 laptop:left-[4.5em] tablet:left-[4.5em] right-0 z-[30] mx-auto top-0 bottom-0 my-auto w-[81em] laptop:w-[40em] tablet:w-[40em] p-12 border-2 rounded-md`}
      >
        <h1 className="font-bold desktop:text-3xl laptop:text-2xl tablet:text-2xl text-center mb-4">
          {titulo + titTipo}
        </h1>
        {criacao == 1 && (
          <div>
            <div className="flex mx-10 laptop:mx-0 tablet:mx-0">
              <div className="w-[20%]">
                <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2 laptop:mb-1 tablet:mb-1">
                  Número:
                </h1>
                <input
                  disabled={disabled}
                  value={input}
                  type="text"
                  onChange={(e) => setInput(e.target.value)}
                  className={styleAll.input + " laptop:text-lg tablet:text-lg"}
                ></input>
              </div>
              <div className="w-[80%] ml-10 ">
                <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2 laptop:mb-1 tablet:mb-1">
                  Descrição:
                </h1>
                <input
                  disabled={disabled2}
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  className={styleAll.input + " laptop:text-lg tablet:text-lg"}
                ></input>
              </div>
            </div>
            <div className="flex desktop:mt-10 laptop:mt-5 tablet:mt-5 desktop:mx-10">
              <div className="w-[33%]">
                <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2 laptop:mb-1 tablet:mb-1">
                  Divisão:
                </h1>
                <input
                  disabled={disabled2}
                  value={input3}
                  onChange={(e) => setInput3(e.target.value)}
                  className={styleAll.input + " laptop:text-lg tablet:text-lg"}
                ></input>
              </div>

              <div className="w-[33%] ml-10">
                <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2 laptop:mb-1 tablet:mb-1">
                  Setor:
                </h1>
                <input
                  disabled={disabled2}
                  value={input4}
                  onChange={(e) => setInput4(e.target.value)}
                  className={styleAll.input + " laptop:text-lg tablet:text-lg"}
                ></input>
              </div>
              <div className="w-[33%] ml-10">
                <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2 laptop:mb-1 tablet:mb-1">
                  Divisão EBS:
                </h1>
                <input
                  disabled={disabled2}
                  value={input5}
                  onChange={(e) => setInput5(e.target.value)}
                  className={styleAll.input + " laptop:text-lg tablet:text-lg"}
                ></input>
              </div>
            </div>
          </div>
        )}
        {criacao == 7 && (
          <div>
            <div className="flex desktop:mx-10">
              <div className="w-[20%]">
                <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2">
                  Cód:
                </h1>
                <input
                  disabled
                  value={input}
                  type="number"
                  onChange={(e) => setInput(e.target.value)}
                  className={styleAll.input + " laptop:text-lg tablet:text-lg"}
                ></input>
              </div>
              <div className="w-[80%] ml-10">
                <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2 ">
                  Nome:
                </h1>
                <input
                  disabled={disabled2}
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  className={styleAll.input + " laptop:text-lg tablet:text-lg"}
                ></input>
              </div>
              <div className="w-[33%] ml-10">
                <h1 className="text-[26px] laptop:text-xl tablet:text-xl  font-bold mb-2">
                  Nível:
                </h1>
                <Dropdown
                  options={["1", "2", "3"]}
                  setValue={setInput3}
                  defaultValue={`Nível ${input3}`}
                  tipo={2}
                  textTablet={" laptop:text-xl tablet:text-xl "}
                ></Dropdown>
              </div>
            </div>
            <div className="desktop:mx-10 mt-5">
              <div className="w-[100%] ">
                <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2 ">
                  Email:
                </h1>
                <input
                  disabled={disabled2}
                  value={input6}
                  onChange={(e) => setInput6(e.target.value)}
                  className={styleAll.input + " laptop:text-lg tablet:text-lg"}
                ></input>
              </div>
            </div>
            {alteraAtivo && tipo == 2 && (
              <div className="flex  desktop:mt-10 laptop:mt-5 tablet:mt-5">
                <div className="w-[30%] ml-auto mr-10">
                  <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2">
                    Login:
                  </h1>
                  <input
                    value={input4}
                    disabled={disabled2}
                    type="text"
                    onChange={(e) => setInput4(e.target.value)}
                    className={
                      styleAll.input + " laptop:text-lg tablet:text-lg"
                    }
                  ></input>
                </div>
                <div className="w-[30%] mr-auto ml-10">
                  <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2 ">
                    Senha:
                  </h1>
                  <input
                    disabled={disabled2}
                    value={input5}
                    type="password"
                    onChange={(e) => setInput5(e.target.value)}
                    className={
                      styleAll.input + " laptop:text-lg tablet:text-lg"
                    }
                  ></input>
                </div>
              </div>
            )}
            {tipo == 1 && criacao == 7 && (
              <div className="flex  desktop:mt-10 laptop:mt-5 tablet:mt-5">
                <div className="w-[30%] ml-auto mr-10">
                  <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2">
                    Login:
                  </h1>
                  <input
                    value={input4}
                    disabled={disabled2}
                    type="text"
                    onChange={(e) => setInput4(e.target.value)}
                    className={
                      styleAll.input + " laptop:text-lg tablet:text-lg"
                    }
                  ></input>
                </div>
                <div className="w-[30%] mr-auto ml-10">
                  <h1 className="text-[26px] laptop:text-xl tablet:text-xl font-bold mb-2 ">
                    Senha:
                  </h1>
                  <input
                    disabled={disabled2}
                    value={input5}
                    type="password"
                    onChange={(e) => setInput5(e.target.value)}
                    className={
                      styleAll.input + " laptop:text-lg tablet:text-lg"
                    }
                  ></input>
                </div>
              </div>
            )}
          </div>
        )}
        {criacao != 1 && criacao != 7 && (
          <div className="flex desktop:mx-10">
            <div className="w-[15%] mr-[5%]">
              <h1 className="text-[26px] laptop:text-2xl tablet:text-2xl font-bold mb-2">
                Cód:
              </h1>
              <input
                disabled={true}
                value={input2}
                className={styleAll.input + " laptop:text-lg tablet:text-lg"}
              ></input>
            </div>
            <div className="w-[80%]">
              <h1 className="text-[26px] laptop:text-2xl tablet:text-2xl font-bold mb-2">
                Nome:
              </h1>
              <input
                disabled={disabled2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={styleAll.input + " laptop:text-lg tablet:text-lg"}
              ></input>
            </div>
          </div>
        )}
        <div className="mx-auto w-fit flex">
          <button
            onClick={() => criarCad()}
            className="bg-[#21862a] p-2 mr-10 text-2xl laptop:text-xl tablet:text-xl font-bold rounded-md mt-10"
          >
            Confirmar
          </button>
          <button
            onClick={() => setTipo(0)}
            className="bg-[#cc0000] p-2 text-2xl font-bold laptop:text-xl tablet:text-xl rounded-md mt-10"
          >
            Cancelar
          </button>
          {nivel == 3 && criacao == 7 && tipo == 2 && (
            <button
              onClick={() => {
                setHeight(38);
                setAlteraAtivo(true);
              }}
              className="bg-[#ff8636] p-2 ml-10 text-2xl font-bold laptop:text-xl tablet:text-xl rounded-md mt-10"
            >
              Alterar Login/Senha
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
