import React, { useEffect, useState } from "react";
import { styleAll } from "../../../../css";
import { FaPlus, FaMinus } from "react-icons/fa6";

export default class FiltrosKanban extends React.Component {
  constructor(props) {
    super(props);

    var itemsprop = props.filtroAll;
    this.state = {
      items: itemsprop,
    };
  }

  handleAdd() {
    var items = this.state.items;

    items.push(["EstManDesc", ""]);

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
              value={o[0]}
              onChange={context.handleChangeS.bind(context, i)}
              className={
                "block w-fit px-3 py-3 text-xl tablet:text-lg text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                styleAll.inputSemW
              }
            >
              <option value="EstManDesc">Descrição</option>
              <option value="EstManNum">Número Item</option>
              <option value="EstManAreaDesc">Área</option>
              <option value="EstManLoc">Local</option>
            </select>
          </div>
          <div className="flex">
            <input
              onChange={context.handleChangeI.bind(context, i)}
              className={
                "text-xl h-full py-2 px-3 focus:-outline-offset-0 border-0 " +
                styleAll.input
              }
              type="text"
              value={o[1]}
            ></input>
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
