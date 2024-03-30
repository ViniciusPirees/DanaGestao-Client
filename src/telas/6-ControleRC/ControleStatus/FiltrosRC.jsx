import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { styleAll } from "../../../css";
import axios from "axios";

export default class FiltrosRC extends React.Component {
  constructor(props) {
    super(props);

    var itemsprop = props.filtroAll;
    var DataHoje = new Date();
    const defaultValueFin = DataHoje.toLocaleDateString("en-CA");
    DataHoje.setMonth(DataHoje.getMonth() - 1);
    const defaultValueIni = DataHoje.toLocaleDateString("en-CA");

    this.state = {
      items: itemsprop,
      defaultValueFin,
      defaultValueIni,
      mesprev: props.status,
      itemsTipo: props.itemsTipo,
    };
  }

  getStatus = async () => {
    var mesAtual = 0;
    var anoAtual = new Date().getFullYear();
    if (new Date().getMonth() == 11) {
      anoAtual = anoAtual + 1;
    } else {
      mesAtual = new Date().getMonth();
    }
    const monthNames = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ];

    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getResumoFil`,
        {
          params: {
            tabela: "StatusPrev",
            order: "StaPreDesc",
          },
        }
      );
      if (res?.data?.code) {
        this.setState({
          mesprev: [],
        });
      } else {
        var statusSel = [];
        res?.data?.forEach((val) => {
          statusSel.push(val.StaPreDesc);
        });
        var comecou = true;
        for (var i = 0; i < 12; i++) {
          if (comecou) {
            if (mesAtual + i == 12) {
              comecou = false;
              mesAtual = 0;
              anoAtual = anoAtual + 1;
              statusSel.push(
                `${monthNames[mesAtual]}/${anoAtual
                  .toString()
                  .replace("20", "")}`
              );
            } else {
              statusSel.push(
                `${monthNames[mesAtual + i]}/${anoAtual
                  .toString()
                  .replace("20", "")}`
              );
            }
          } else {
            mesAtual++;
            statusSel.push(
              `${monthNames[mesAtual]}/${anoAtual.toString().replace("20", "")}`
            );
          }
        }

        this.setState({
          mesprev: statusSel,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  getTipo = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/getResumoFil`,
        {
          params: {
            tabela: "TipoStatus",
            order: "TipStaDesc",
          },
        }
      );
      if (res?.data?.code) {
        this.setState({
          itemsTipo: [],
        });
      } else {
        var statusSel = [];
        res?.data?.forEach((val) => {
          statusSel.push(val.TipStaDesc);
        });

        this.setState({
          itemsTipo: statusSel,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getTipo.call();
    this.getStatus.call();
  }

  handleAdd() {
    var items = this.state.items;

    items.push([
      "(Consulta.REQUISITION+'/'+CONVERT(varchar,Consulta.RE_LINE_NUM))",
      "",
    ]);

    this.props.setFiltroAll(items);

    this.setState({
      items: items,
    });
  }

  handleChangeI(i, event) {
    var items = this.state.items;

    items[i][1] = event.target.value;

    this.props.setFiltroAll(items);

    this.setState({
      items: items,
    });
  }

  handleChangeDateIni(i, event) {
    var items = this.state.items;

    items[i][1] = event.target.value;

    this.props.setFiltroAll(items);

    this.setState({
      items: items,
    });
  }

  handleChangeDateFin(i, event) {
    var items = this.state.items;

    items[i][2] = event.target.value;

    this.props.setFiltroAll(items);

    this.setState({
      items: items,
    });
  }

  handleChangeS(i, event) {
    var items = this.state.items;

    if (
      event.target.value == "DataPrev" ||
      event.target.value == "CREATION_DATE"
    ) {
      items[i][0] = event.target.value;
      items[i][1] = this.state.defaultValueIni;
      items[i][2] = this.state.defaultValueFin;
      this.props.setFiltroAll(items);
    } else {
      items[i][0] = event.target.value;
      items[i][1] = "";
      this.props.setFiltroAll(items);
    }
    this.setState({
      items: items,
    });
  }

  handleSub(i) {
    var items = this.state.items;

    items.splice(i, 1);

    this.props.setFiltroAll(items);

    this.setState({
      items: items,
    });
  }

  renderRows() {
    var context = this;

    return this.state.items.map((o, i) => {
      return (
        <div className="flex mb-5 tablet:mb-3" key={i}>
          <div className="mx-4 tablet:ml-4 tablet:mr-2">
            <select
              value={o[0]}
              id="large"
              onChange={context.handleChangeS.bind(context, i)}
              className={
                "block w-fit px-3 py-3 text-xl tablet:text-lg text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                styleAll.inputSemW
              }
            >
              <option value="(Consulta.REQUISITION+'/'+CONVERT(varchar,Consulta.RE_LINE_NUM))">
                Requisição Cód.
              </option>
              <option value="CREATION_DATE">Data de Criação</option>
              <option value="PREPARER">Preparador</option>
              <option value="ORG">Organização</option>
              <option value="Status">Status</option>
              <option value="TIPO">Tipo</option>
              <option value="DataPrev">Data Prevista</option>
              <option value="DataPrevTxt">Data Prevista (NF)</option>
              <option value="MesPrev">Status Prev</option>
              <option value="VENDOR_NAME">Fornecedor</option>
              <option value="ITEM_DESCRIPTION">Descrição</option>
              <option value="PENDING_QUANTITY_RC">Qtd. Pendente</option>
              <option value="PO_NUM">Nº do Pedido</option>
            </select>
          </div>
          <div className="flex">
            {o[0] == "Status" ? (
              <select
                id="large"
                value={o[1]}
                onChange={context.handleChangeI.bind(context, i)}
                className={
                  "block w-fit px-3 py-3 text-xl tablet:text-lg  text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                  styleAll.inputSemW
                }
              >
                <option value="1">Todos</option>
                <option value="9">RC Em orçamento por compras</option>
                <option value="10">Requer aprovação do solicitante</option>
                <option value="3">RC Em aprovação</option>
                <option value="4">RC Aprovada sem pedido</option>
                <option value="5">RC Aprovada com pedido aberto</option>
                <option value="6">RC Aprovada com pedido entregue</option>
                <option value="7">RC Cancelada </option>
              </select>
            ) : o[0] == "TIPO" ? (
              <select
                id="large"
                value={o[1]}
                onChange={context.handleChangeI.bind(context, i)}
                className={
                  "block w-fit px-3 py-3 text-xl tablet:text-lg  text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                  styleAll.inputSemW
                }
              >
                <option key="Todos" value="">
                  Todos (Campo Preenchido)
                </option>
                <option key="NULL" value="NULL">
                  Campo Vazio
                </option>
                ;
                {context.state.itemsTipo.map((item, i) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            ) : o[0] == "DataPrev" ? (
              <>
                <input
                  value={o[1]}
                  onChange={context.handleChangeDateIni.bind(context, i)}
                  className={
                    "h-full py-[0.55em] px-2 w-[10.3rem] tablet:text-lg tablet:w-[9rem] text-xl " +
                    styleAll.inputSemW +
                    " focus:-outline-offset-0"
                  }
                  type="date"
                ></input>
                <h1 className="my-auto mx-3 text-xl tablet:text-lg font-bold">
                  até
                </h1>
                <input
                  value={o[2]}
                  onChange={context.handleChangeDateFin.bind(context, i)}
                  className={
                    "h-full py-[0.55em] px-2 w-[10.3rem] tablet:text-lg tablet:w-[9rem] text-xl " +
                    styleAll.inputSemW +
                    " focus:-outline-offset-0"
                  }
                  type="date"
                ></input>
              </>
            ) : o[0] == "CREATION_DATE" ? (
              <>
                <input
                  value={o[1]}
                  onChange={context.handleChangeDateIni.bind(context, i)}
                  className={
                    "h-full py-[0.55em] px-2 w-[10.3rem] tablet:text-lg tablet:w-[9rem] text-xl " +
                    styleAll.inputSemW +
                    " focus:-outline-offset-0"
                  }
                  type="date"
                ></input>
                <h1 className="my-auto mx-3 text-xl tablet:text-lg font-bold">
                  até
                </h1>
                <input
                  value={o[2]}
                  onChange={context.handleChangeDateFin.bind(context, i)}
                  className={
                    "h-full py-[0.55em] px-2 w-[10.3rem] tablet:text-lg tablet:w-[9rem] text-xl " +
                    styleAll.inputSemW +
                    " focus:-outline-offset-0"
                  }
                  type="date"
                ></input>
              </>
            ) : o[0] == "MesPrev" ? (
              <select
                id="large"
                value={o[1]}
                onChange={context.handleChangeI.bind(context, i)}
                className={
                  "block w-fit px-3 py-3 text-xl tablet:text-lg  text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                  styleAll.inputSemW
                }
              >
                <option key="todos" value="">
                  Todos (Campo Preenchido)
                </option>
                ;
                <option key="null" value="NULL">
                  Campo Vazio
                </option>
                ;
                {context.state.mesprev.map((item, i) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            ) : (
              <input
                onChange={context.handleChangeI.bind(context, i)}
                className={
                  "text-xl h-full py-2 px-3 tablet:text-lg focus:-outline-offset-0 border-0 " +
                  styleAll.input
                }
                type="text"
                value={o[1]}
              ></input>
            )}
          </div>
          <div className="flex">
            {i == 0 ? (
              <button
                className="duration-200 hover:scale-105"
                onClick={context.handleAdd.bind(context)}
              >
                <FaPlus className="ml-5 tablet:ml-2 bg-dana text-[3.3em] tablet:text-[2.75em] p-2 rounded-md" />
              </button>
            ) : (
              <button
                className="duration-200 hover:scale-105"
                onClick={context.handleSub.bind(context, i)}
              >
                <FaMinus className="ml-5 tablet:ml-2 bg-dana text-[3.3em] tablet:text-[2.75em] p-2 rounded-md" />
              </button>
            )}
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderRows()}</div>;
  }
}
