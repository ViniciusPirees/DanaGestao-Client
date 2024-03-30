import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { styleAll } from "../../../css";

export default class FiltrosConserto extends React.Component {
  constructor(props) {
    super(props);

    var itemsprop = props.filtroAll;
    this.state = {
      items: itemsprop,
    };
  }

  handleAdd() {
    var items = this.state.items;

    items.push(["ConManNome", ""]);

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
        <div className="flex mb-5 tablet:mb-3" key={i}>
          <div className="mx-4">
            <select
              id="large"
              onChange={context.handleChangeS.bind(context, i)}
              className={"block w-fit px-4 py-3 " + styleAll.inputSoW}
            >
              <option value="ConManNome">Manutentor</option>
              <option value="ConNum">Número</option>
              <option value="ConMaqDesc">Descrição da Máquina</option>
              <option value="ConMaqDiv">Divisão da Máquina</option>
              <option value="ConMaqSetor">Setor da Máquina</option>
              <option value="ConMaqDivEBS">Divisão EBS da Máquina</option>
              <option value="ConForDesc">Fornecedor</option>
              <option value="ConNumSo">Número SO</option>
              <option value="ConNF">Nº Nota Fiscal</option>
              <option value="ConOrc">Nº Orçamento</option>
              <option value="ConNumRC">Valor</option>
              <option value="ConNumOC">Nº Ordem de Compra</option>
              <option value="ConObs">Observação</option>
              <option value="ConItemDescricao">Item - Descrição</option>
              <option value="ConItemProblema">Item - Problema</option>
            </select>
          </div>
          <div className="flex">
            <input
              onChange={context.handleChangeI.bind(context, i)}
              className={styleAll.inputSoW} type="text"
              value={o[1]}
            ></input>
          </div>
          <div className="flex">
            {i == 0 ? (
              <button onClick={context.handleAdd.bind(context)}>
                <FaPlus className="ml-5 tablet:ml-2 bg-dana text-[3.3em] tablet:text-[2.75em] p-2 rounded-md" />
              </button>
            ) : (
              <button onClick={context.handleSub.bind(context, i)}>
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
