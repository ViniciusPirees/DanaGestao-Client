import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { styleAll } from "../../css";

export default class Filtros extends React.Component {
  constructor(props) {
    super(props);
    var DataHoje = new Date();
    const defaultValueFin = DataHoje.toLocaleDateString("en-CA");
    DataHoje.setMonth(DataHoje.getMonth() - 1);
    const defaultValueIni = DataHoje.toLocaleDateString("en-CA");
    var itemsprop = props.filtroAll;
    this.state = {
      items: itemsprop,
      defaultValueFin,
      defaultValueIni,
    };
  }

  handleAdd() {
    var items = this.state.items;

    items.push(["SolicMaterial.MatSolicitacao", ""]);

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

    if (event.target.value == "MatData") {
      items[i][0] = event.target.value;
      items[i][1] = this.state.defaultValueIni;
      items[i][2] = this.state.defaultValueFin;
      this.props.setFiltroAll(items);
    } else if (event.target.value == "Status") {
      items[i][0] = event.target.value;
      items[i][1] = "2";
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
              id="large"
              value={o[0]}
              onChange={context.handleChangeS.bind(context, i)}
              className={
                "block w-fit px-3 py-3 text-xl tablet:text-lg text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                styleAll.inputSemW
              }
            >
              <option value="SolicMaterial.MatSolicitacao">
                Cód. Solicitação
              </option>
              <option value="MatData">Data de Criação</option>
              <option value="MatRC">Número RC</option>
              <option value="Status">Status</option>
              <option value="MatDescricao">Descrição</option>
              <option value="MatMaquina">Máquina</option>
              <option value="MatOs">OS</option>
              <option value="MatSolicitanteDesc">Solicitante</option>
              <option value="MatObservacao">Observação</option>
              <option value="SolicMaterialItem.MatItemDescricao">
                Item - Descrição
              </option>
              <option value="SolicMaterialItem.MatItemQtd">
                Item - Quantidade
              </option>
            </select>
          </div>
          <div className="flex">
            {o[0] == "Status" ? (
              <select
                id="large"
                value={o[1]}
                onChange={context.handleChangeI.bind(context, i)}
                className={
                  "block w-fit px-3 py-3 text-xl tablet:text-lg   text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                  styleAll.inputSemW
                }
              >
                <option value="2">Sem RC</option>
                <option value="9">RC Em orçamento por compras</option>
                <option value="10">Requer aprovação do solicitante</option>
                <option value="3">RC Em aprovação</option>
                <option value="4">RC Aprovada sem pedido</option>
                <option value="5">RC Aprovada com pedido aberto</option>
                <option value="6">RC Aprovada com pedido entregue</option>
                <option value="7">RC Cancelada </option>
                <option value="8">RC não existe</option>
              </select>
            ) : o[0] == "MatData" ? (
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
            ) : (
              <input
                onChange={context.handleChangeI.bind(context, i)}
                className={
                  "text-xl tablet:text-lg  h-full py-2 px-3 focus:-outline-offset-0 border-0 " +
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
