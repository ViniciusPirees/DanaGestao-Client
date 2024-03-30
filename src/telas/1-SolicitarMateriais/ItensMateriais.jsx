import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { styleAll } from "../../css";
import { BiPlusMedical } from "react-icons/bi";
import Notificacao from "../components/Notificacao";
export default class ItensMateriais extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      desc: "",
      qtd: Number(0).toFixed(0),
      items: [],
    };
  }

  componentDidMount() {
    var itemCatch = [];
    if (this.props.itemsRec?.length > 0) {
      var itemRec = this.props.itemsRec;
      itemCatch = itemRec.map((val) => {
        return [val.MatItemDescricao, val.MatItemQtd];
      });
    }
    this.setState({
      items: itemCatch,
    });
    this.props.setItems(itemCatch);
  }
  updateDesc(event) {
    var txt = "";
    if (event.target.value.length > 254) {
      txt = event.target.value.slice(0, 254);
    } else {
      txt = event.target.value;
    }
    this.setState({
      desc: txt,
    });
  }

  updateQtd(event) {
    var value = event.target.value;
    value = Number(value).toFixed(0);
    this.setState({
      qtd: value,
    });
  }

  handleClick() {
    if (this.state.desc.length == 0 || this.state.qtd == 0) {
      return Notificacao([
        "atencao",
        "Verifique o campo dos itens para adicionar à solicitação",
      ]);
    } else {
      var items = this.state.items;

      items.push([this.state.desc, this.state.qtd]);

      this.props.setItems(items);

      this.setState({
        items: items,
        desc: "",
        qtd: Number(0).toFixed(0),
      });
    }
  }

  handleDescChanged(i, event) {
    var items = this.state.items;

    if (event.target.value.length > 254) {
      items[i][0] = event.target.value.slice(0, 254);
    } else {
      items[i][0] = event.target.value;
    }

    this.props.setItems(items);

    this.setState({
      items: items,
    });
  }

  handleQtdChanged(i, event) {
    var value = event.target.value;
    value = Number(value).toFixed(0);
    var items = this.state.items;
    items[i][1] = value;

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
        <tr className="" key={"item-" + i}>
          <td>
            <input
              type="text"
              className={"mb-2 w-[95%] desktop:w-[90%] desktop:mr-0 desktop:ml-[5%] mr-[5%] " + styleAll.inputSemOutline}
              value={o[0]}
              onChange={context.handleDescChanged.bind(context, i)}
            />
          </td>
          <td>
            <input
              type="number"
              className={"mb-2 w-[90%] ml-[5%] " + styleAll.inputSemOutline}
              value={o[1]}
              onChange={context.handleQtdChanged.bind(context, i)}
            />
          </td>
          <td>
            <button
              className="duration-200 hover:scale-105"
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
      <div className="text-[#fff]">
        <table className="table-auto text-white rounded-1xl mt-4 desktop:-ml-10 w-full">
          <thead>
            <tr className="text-2xl font-extrabold p-3">
              <th className="pr-3 w-[70%]">Descrição</th>
              <th className="p-3">Quantidade</th>
              <th></th>
            </tr>
          </thead>

          <tbody>{this.renderRows()}</tbody>
        </table>
        <hr className="border-2 mt-6" />
        <div className="flex">
          <table className="table-auto text-white rounded-1xl desktop:-ml-10 w-full">
            <thead>
              <tr className="text-2xl font-extrabold p-3">
                <th className="p-3 w-[70%]"></th>
                <th className="p-3"></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="  ">
                  <input
                    type="text"
                    className={
                      "mb-2 w-[95%] desktop:w-[90%] desktop:mr-0 desktop:ml-[5%] mr-[5%] " + styleAll.inputSemOutline
                    }
                    value={this.state.desc}
                    onChange={this.updateDesc.bind(this)}
                  />
                </td>
                <td className="before:absolute">
                  <input
                    type="number"
                    className={
                      "mb-2 w-[90%] ml-[5%] " + styleAll.inputSemOutline
                    }
                    value={this.state.qtd}
                    onChange={this.updateQtd.bind(this)}
                  />
                </td>
                <td className="before:absolute">
                  <button
                    className="duration-200 hover:scale-105"
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
