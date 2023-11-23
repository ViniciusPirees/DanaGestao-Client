import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { styleAll } from "../../css";

export default class FiltrosRC extends React.Component {
  constructor(props) {
    super(props);

    var itemsprop = props.filtroAll;
    this.state = {
      items: itemsprop,
    };
  }

  handleAdd() {
    var items = this.state.items;

    items.push(["(REQUISITION+'/'+CONVERT(varchar,RE_LINE_NUM))", ""]);

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
        <div className="flex mb-5" key={i}>
          <div className="mx-4">
            <select
              id="large"
              onChange={context.handleChangeS.bind(context, i)}
              className={
                "block w-fit px-3 py-3 text-xl  text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                styleAll.inputSemW
              }
            >
              <option value="(REQUISITION+'/'+CONVERT(varchar,RE_LINE_NUM))">
                Requisição Cód.
              </option>
              <option value="PREPARER">Preparador</option>
              <option value="ORG">Organização</option>
              <option value="Status">Status</option>
              <option value="REQ_APPROVER">Aprovador</option>
              <option value="VENDOR_NAME">Fornecedor</option>
              <option value="ITEM">Item</option>
              <option value="ITEM_DESCRIPTION">Descrição</option>
              <option value="PENDING_QUANTITY_RC">Qtd. Pendente</option>
              <option value="UNIT_RC">Valor Unid. RC</option>
              <option value="PENDING_TOTAL_RC">Valor Pendente RC</option>
              <option value="RECEIVED_TOTAL_RC">Valor Recebido RC</option>
              <option value="UNIT_OC">Valor Unid. OC</option>
              <option value="PENDING_TOTAL_OC">Valor Pendente OC</option>
              <option value="LOCAL">Local</option>
              <option value="CHARGE_ACCOUNT">Conta Cobrança</option>
              <option value="PREPARER">Requisitante</option>
              <option value="JUSTIFICATION">Justificação</option>
            </select>
          </div>
          <div className="flex">
            {o[0] == "Status" ? (
              <select
                id="large"
                onChange={context.handleChangeI.bind(context, i)}
                className={
                  "block w-fit px-3 py-3 text-xl  text-gray-900 border-0 focus:-outline-offset-0 focus:outline-none " +
                  styleAll.inputSemW
                }
              >
                <option value="1">Todos</option>
                <option value="3">RC Em aprovação</option>
                <option value="4">RC Aprovada sem pedido</option>
                <option value="5">RC Aprovada com pedido aberto</option>
                <option value="6">RC Aprovada com pedido entregue</option>
                <option value="7">RC Cancelada </option>
              </select>
            ) : (
              <input
                onChange={context.handleChangeI.bind(context, i)}
                className={
                  "text-xl h-full py-2 px-3 focus:-outline-offset-0 border-0 " +
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
                <FaPlus className="ml-5 bg-dana text-[3.3em] p-2 rounded-md" />
              </button>
            ) : (
              <button
                className="duration-200 hover:scale-105"
                onClick={context.handleSub.bind(context, i)}
              >
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
