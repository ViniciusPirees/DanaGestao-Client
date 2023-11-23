import React, { useState } from "react";
import { ImCross } from "react-icons/im";

import { BiPlusMedical } from "react-icons/bi";
import Notificacao from "../../components/Notificacao";
import SearchDropdown from "../../components/SearchDropdown";
import { styleAll } from "../../../css";
export default class ItensConserto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      desc: "",
      prob: "",
      valor: Number(0).toFixed(0),
      tipo: "",
      items: [],
      reset: false,
    };
  }

  componentDidMount() {
    var itemCatch = [];
    if (this.props.itemsRec?.length > 0) {
      var itemRec = this.props.itemsRec;
      itemCatch = itemRec.map((val) => {
        return [
          val.ConItemDescricao,
          val.ConItemProblema,
          val.ConItemValor,
          [val.ConItemTipMatDesc, val.ConItemTipMatCod],
        ];
      });
    }
    this.setState({
      items: itemCatch,
    });
    this.props.setItems(itemCatch);
  }

  updateDesc(event) {
    this.setState({
      desc: event.target.value,
    });
  }

  updateprob(event) {
    this.setState({
      prob: event.target.value,
    });
  }

  updateVal(event) {
    var value = event.target.value;
    value = Number(value).toFixed(0);
    this.setState({
      valor: value,
    });
  }

  updateTipo(event) {
    this.setState({
      tipo: event,
    });
  }
  handleTipoZera() {
    this.setState({
      reset: false,
    });
  }
  handleClick() {
    if (
      this.state.desc.length == 0 ||
      this.state.prob.length == 0 ||
      this.state.tipo.length == 0 ||
      this.state.valor == 0
    ) {
      return Notificacao([
        "atencao",
        "Verifique o campo dos itens para adicionar ao conserto",
      ]);
    } else {
      var items = this.state.items;

      items.push([
        this.state.desc,
        this.state.prob,
        this.state.valor,
        this.state.tipo,
      ]);

      this.props.setItems(items);

      this.setState({
        items: items,
        desc: "",
        prob: "",
        valor: Number(0).toFixed(0),
        tipo: "",
        reset: true,
      });
    }
  }

  handleDescChanged(i, event) {
    var items = this.state.items;

    items[i][0] = event.target.value;

    this.props.setItems(items);

    this.setState({
      items: items,
    });
  }

  handleProbChanged(i, event) {
    var items = this.state.items;
    items[i][1] = event.target.value;

    this.props.setItems(items);

    this.setState({
      items: items,
    });
  }

  handleValChanged(i, event) {
    var value = event.target.value;

    var items = this.state.items;

    value = Number(value).toFixed(0);

    items[i][2] = value;

    this.props.setItems(items);

    this.setState({
      items: items,
    });
  }

  handleTipoChanged(i, event) {
    var items = this.state.items;
    items[i][3] = event;

    this.props.setItems(items);

    this.setState({
      items: items,
    });
  }

  handleItemDeleted(i) {
    var items = this.state.items;

    items.splice(i, 1);

    this.props.setItems(items);

    this.setState({
      items: items,
    });
  }

  renderRows() {
    var context = this;

    return this.state.items.map(function (o, i) {
      return (
        <tr className="pt-3" key={"item-" + i}>
          <td className="px-4">
            <input
              type="text"
              className={"mt-3 " + styleAll.inputSoW}
              value={o[0]}
              onChange={context.handleDescChanged.bind(context, i)}
            />
          </td>
          <td className="px-4">
            <div className="w-full mt-3">
              <SearchDropdown
                options={context.props.tiposMat}
                setValue={context.handleTipoChanged.bind(context, i)}
                opt={6}
                defValue={o[3][0]}
              ></SearchDropdown>
            </div>
          </td>
          <td className="px-4">
            <input
              type="text"
              className={"mt-3 " + styleAll.inputSoW}
              value={o[1]}
              onChange={context.handleProbChanged.bind(context, i)}
            />
          </td>
          <td className="px-4">
            <input
              type="number"
              className={"mt-3 " + styleAll.inputSoW}
              value={o[2]}
              onChange={context.handleValChanged.bind(context, i)}
            />
          </td>
          <td className="px-4 flex">
            <button
              className="w-full my-auto mt-3 duration-200 hover:scale-105"
              onClick={context.handleItemDeleted.bind(context, i)}
            >
              <ImCross className="text-5xl bg-[#E53935] mb-2  p-3 rounded-lg"></ImCross>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <table className="table-auto text-white rounded-1xl mt-4 w-full">
          <thead>
            <tr className="text-2xl font-extrabold p-3">
              <th className="px-4 w-[35%]">Descrição do Material</th>
              <th className="px-4 w-[20%]">Tipo Material</th>
              <th className="px-4 w-[30%]">Problema Apresentado</th>
              <th className="px-4 w-[10%]">Qtd.</th>
              <th className="px-4 w-[5%]"></th>
            </tr>
          </thead>

          <tbody>{this.renderRows()}</tbody>
        </table>
        <hr className="border-2 mt-6" />
        <div className="flex">
          <table className="table-auto text-white rounded-1xl  w-full">
            <thead>
              <tr className="text-2xl font-extrabold p-3">
                <th className="p-3 w-[35%]"></th>
                <th className="p-3 w-[20%]"></th>
                <th className="p-3 w-[30%]"></th>
                <th className="p-3 w-[10%]"></th>
                <th className="p-3 w-[5%]"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4">
                  <input
                    type="text"
                    className={styleAll.inputSoW}
                    value={this.state.desc}
                    onChange={this.updateDesc.bind(this)}
                  />
                </td>
                <td className="px-4">
                  <div className="w-full">
                    <SearchDropdown
                      options={this.props.tiposMat}
                      setValue={this.updateTipo.bind(this)}
                      opt={6}
                      defValue={this.state.tipo}
                      reset={this.state.reset}
                      setState={this.handleTipoZera.bind(this)}
                    ></SearchDropdown>
                  </div>
                </td>
                <td className="px-4">
                  <input
                    type="text"
                    className={styleAll.inputSoW}
                    value={this.state.prob}
                    onChange={this.updateprob.bind(this)}
                  />
                </td>
                <td className="px-4">
                  <input
                    type="number"
                    className={styleAll.inputSoW}
                    value={this.state.valor}
                    onChange={this.updateVal.bind(this)}
                  />
                </td>
                <td className="px-4 flex">
                  <button
                    className="w-full my-auto duration-200 hover:scale-105"
                    onClick={this.handleClick.bind(this)}
                  >
                    <BiPlusMedical className="text-5xl mt-2 bg-[#4CAF50] mb-2 font-extrabold p-3 rounded-lg"></BiPlusMedical>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
