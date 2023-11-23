import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { styleAll } from "../../../css"

export default class Filtros extends React.Component {
  constructor(props) {
    super(props);

    var itemsprop = props.filtroAll;
    this.state = {
      items: itemsprop,
    };
  }

  handleAdd() {
    var items = this.state.items;

    items.push(["MatItemQtd", ""]);

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

  handleChangeS(i, event) {
    var items = this.state.items;

    items[i][0] = event.target.value;
    items[i][1] = "";
    this.props.setFiltroAll(items);

    this.setState({
      items: items,
    });
  }

  handleSub(i) {
    console.log(i);
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
        <div className="flex mb-5" key={i}>
          <div className="mx-4">
            <select
              id="large"
              onChange={context.handleChangeS.bind(context, i)}
              className={"block w-fit px-4 py-3 "+ styleAll.inputSoW}
            >
              <option value="MatDescricao">Descrição</option>
              <option value="MatSolicitacao">Cód. Solicitação</option>
              <option value="MatMaquina">Máquina</option>
              <option value="MatOs">OS</option>
              <option value="MatSolicitanteDesc">Solicitante</option>
              <option value="MatObservacao">Observação</option>
              <option value="MatItemDescricao">Item - Descrição</option>
              <option value="MatItemQtd">Item - Quantidade</option>
            </select>
          </div>
          <div className="flex">
            <input
              onChange={context.handleChangeI.bind(context, i)}
              className={styleAll.inputSoW} type='text'
              value={o[1]}
            ></input>
          </div>
          <div className="flex">
            {i == 0 ? (
              <button onClick={context.handleAdd.bind(context)}>
                <FaPlus className="ml-5 bg-dana text-[3.3em] p-2 rounded-md" />
              </button>
            ) : (
              <button onClick={context.handleSub.bind(context, i)}>
                <FaMinus className="ml-5 bg-dana text-[3.3em] p-2 rounded-md" />
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
