import React, { useState } from "react";
import { ImCross } from "react-icons/im";

import { BiPlusMedical } from "react-icons/bi";
import Notificacao from "../../components/Notificacao";
import SearchDropdown from "../../components/Dropdowns/SearchDropdown";
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
      retorno: false,
    };
  }

  componentDidMount() {
    var itemCatch = [];
    if (this.props.itemsRec?.length > 0) {
      var itemRec = this.props.itemsRec;
      itemCatch = itemRec.map((val) => {
        var retorno = false;
        if (val.ConItemRetorno == "S") {
          retorno = true;
        }
        return [
          val.ConItemDescricao,
          val.ConItemProblema,
          val.ConItemValor,
          [val.ConItemTipMatDesc, val.ConItemTipMatCod],
          retorno,
        ];
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

  updateprob(event) {
    var txt = "";
    if (event.target.value.length > 254) {
      txt = event.target.value.slice(0, 254);
    } else {
      txt = event.target.value;
    }
    this.setState({
      prob: txt,
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

  updateret(event) {
    this.setState({
      retorno: event.target.checked,
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
        this.state.retorno,
      ]);

      this.props.setItems(items);

      this.setState({
        items: items,
        desc: "",
        prob: "",
        valor: Number(0).toFixed(0),
        tipo: "",
        reset: true,
        retorno: false,
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

  handleProbChanged(i, event) {
    var items = this.state.items;

    if (event.target.value.length > 254) {
      items[i][1] = event.target.value.slice(0, 254);
    } else {
      items[i][1] = event.target.value;
    }

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

  handleRetChanged(i, event) {
    var value = event.target.checked;

    var items = this.state.items;

    items[i][4] = value;

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
      if (window.innerWidth > 1200) {
        return (
          <tr className="pt-3 " key={"item-" + i}>
            <td className="tablet:px-2">
              <input
                id="default-checkbox"
                type="checkbox"
                onChange={context.handleRetChanged.bind(context, i)}
                className="relative h-10 w-10 cursor-pointer mt-4"
                checked={o[4]}
              />
            </td>
            <td className="px-4 tablet:px-2">
              <input
                type="text"
                className={"mt-3 " + styleAll.inputSoW + " tablet:text-xl"}
                value={o[0]}
                onChange={context.handleDescChanged.bind(context, i)}
              />
            </td>
            <td className="px-4 tablet:px-2">
              <div className="w-full mt-3">
                <SearchDropdown
                  options={context.props.tiposMat}
                  setValue={context.handleTipoChanged.bind(context, i)}
                  opt={6}
                  defValue={o[3][0]}
                  textTablet={"tablet:text-2xl laptop:text-2xl"}
                ></SearchDropdown>
              </div>
            </td>
            <td className="px-4 tablet:px-2">
              <input
                type="text"
                className={"mt-3 " + styleAll.inputSoW + " tablet:text-xl"}
                value={o[1]}
                onChange={context.handleProbChanged.bind(context, i)}
              />
            </td>
            <td className="px-4 tablet:px-2">
              <input
                type="number"
                className={"mt-3 " + styleAll.inputSoW + " tablet:text-xl"}
                value={o[2]}
                onChange={context.handleValChanged.bind(context, i)}
              />
            </td>
            <td className="px-4 flex tablet:px-2">
              <button
                className="w-full my-auto mt-3 duration-200 hover:scale-105"
                onClick={context.handleItemDeleted.bind(context, i)}
              >
                <ImCross className="text-5xl bg-[#E53935] mb-2  p-3 rounded-lg"></ImCross>
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <>
            <div
              key={"item-" + i}
              className={`flex pl-[2.75em] pr-[3em] pb-4 relative -ml-[2em] -mr-10 ${
                i % 2 == 0 ? "bg-[#292929]" : "bg-fundo"
              } `}
            >
              <div>
                <button
                  className="w-full h-full  mt-3 duration-200 hover:scale-105"
                  onClick={context.handleItemDeleted.bind(context, i)}
                >
                  <ImCross className="text-5xl h-[90%] bg-[#E53935] p-3 rounded-lg"></ImCross>
                </button>
              </div>
              <div>
                <div className="w-full mt-5 flex">
                  <div className="w-[60%] ml-3">
                    <h1 className="text-xl font-bold mb-2 ">
                      Descrição da Material:
                    </h1>
                    <input
                      type="text"
                      className={styleAll.inputSoW + " tablet:text-xl"}
                      value={o[0]}
                      onChange={context.handleDescChanged.bind(context, i)}
                    />
                  </div>
                  <div className="w-[40%] ml-3">
                    <h1 className="text-xl font-bold mb-2 ">Tipo Material:</h1>
                    <SearchDropdown
                      options={context.props.tiposMat}
                      setValue={context.handleTipoChanged.bind(context, i)}
                      opt={6}
                      defValue={o[3][0]}
                      textTablet={" tablet:text-lg "}
                    ></SearchDropdown>
                  </div>
                  <div className="w-[6%] mt-9 ml-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      onChange={context.handleRetChanged.bind(context, i)}
                      className="relative h-10 w-10 cursor-pointer mt-2"
                      checked={o[4]}
                    />
                  </div>
                </div>
                <div className="w-full mt-5 flex">
                  <div className="w-[80%] ml-3">
                    <h1 className="text-xl font-bold mb-2 ">
                      Problema Apresentado:
                    </h1>
                    <input
                      type="text"
                      className={styleAll.inputSoW + " tablet:text-xl"}
                      value={o[1]}
                      onChange={context.handleProbChanged.bind(context, i)}
                    />
                  </div>
                  <div className="w-[20%] ml-3">
                    <h1 className="text-xl font-bold mb-2 ">Qtd.</h1>
                    <input
                      type="number"
                      className={styleAll.inputSoW + " tablet:text-xl"}
                      value={o[2]}
                      onChange={context.handleValChanged.bind(context, i)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }
    });
  }

  render() {
    if (window.innerWidth > 1200) {
      return (
        <>
          <div className="tablet:hidden">
            <table className="table-auto text-white rounded-1xl mt-4 w-full">
              <thead>
                <tr className="text-2xl tablet:text-lg tablet:p-1 font-extrabold p-3">
                  <th className="px-4 w-[0%]"></th>
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
              <table className="table-auto text-white rounded-xl  w-full">
                <thead>
                  <tr className="text-2xl font-extrabold p-3">
                    <th className="p-3 w-[0%]"></th>
                    <th className="p-3 w-[35%]"></th>
                    <th className="p-3 w-[20%]"></th>
                    <th className="p-3 w-[30%]"></th>
                    <th className="p-3 w-[10%]"></th>
                    <th className="p-3 w-[5%]"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tablet:px-2">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        onChange={this.updateret.bind(this)}
                        className="relative h-10 w-10 cursor-pointer mt-2 "
                        checked={this.state.retorno}
                      />
                    </td>
                    <td className="px-4 tablet:px-2">
                      <input
                        type="text"
                        className={styleAll.inputSoW + " tablet:text-xl"}
                        value={this.state.desc}
                        onChange={this.updateDesc.bind(this)}
                      />
                    </td>
                    <td className="px-4 tablet:px-2">
                      <div className="w-full">
                        <SearchDropdown
                          options={this.props.tiposMat}
                          setValue={this.updateTipo.bind(this)}
                          opt={6}
                          defValue={this.state.tipo}
                          reset={this.state.reset}
                          setState={this.handleTipoZera.bind(this)}
                          textTablet={"tablet:text-2xl laptop:text-2xl"}
                        ></SearchDropdown>
                      </div>
                    </td>
                    <td className="px-4 tablet:px-2">
                      <input
                        type="text"
                        className={styleAll.inputSoW + " tablet:text-xl"}
                        value={this.state.prob}
                        onChange={this.updateprob.bind(this)}
                      />
                    </td>
                    <td className="px-4 tablet:px-2">
                      <input
                        type="number"
                        className={styleAll.inputSoW + " tablet:text-xl"}
                        value={this.state.valor}
                        onChange={this.updateVal.bind(this)}
                      />
                    </td>
                    <td className="px-4 tablet:px-2 flex">
                      <button
                        className="w-full my-auto duration-200 hover:scale-105"
                        onClick={this.handleClick.bind(this)}
                      >
                        <BiPlusMedical className="text-5xl  mt-2 bg-[#4CAF50] mb-2 font-extrabold p-3 rounded-lg"></BiPlusMedical>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="">
            <div className="flex bg-[#141414] pl-[2.75em] pr-[3em] pb-4 relative -ml-[2em] -mr-10">
              <div>
                <button
                  className="w-full h-full mt-3 duration-200 hover:scale-105"
                  onClick={this.handleClick.bind(this)}
                >
                  <BiPlusMedical className="text-5xl h-[90%] bg-[#4CAF50]  font-extrabold p-3 rounded-lg"></BiPlusMedical>
                </button>
              </div>
              <div>
                <div className="w-full mt-5 flex">
                  <div className="w-[60%] ml-3">
                    <h1 className="text-xl font-bold mb-2 ">
                      Descrição da Material:
                    </h1>
                    <input
                      type="text"
                      className={styleAll.inputSoW + " tablet:text-lg"}
                      value={this.state.desc}
                      onChange={this.updateDesc.bind(this)}
                    />
                  </div>
                  <div className="w-[40%] ml-3">
                    <h1 className="text-xl font-bold mb-2 ">Tipo Material:</h1>
                    <SearchDropdown
                      options={this.props.tiposMat}
                      setValue={this.updateTipo.bind(this)}
                      opt={6}
                      defValue={this.state.tipo}
                      reset={this.state.reset}
                      setState={this.handleTipoZera.bind(this)}
                      textTablet={" tablet:text-lg "}
                    ></SearchDropdown>
                  </div>
                  <div className="w-[6%] mt-9 ml-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      onChange={this.updateret.bind(this)}
                      className="relative h-10 w-10 cursor-pointer mt-2 "
                      checked={this.state.retorno}
                    />
                  </div>
                </div>
                <div className="w-full mt-5 flex">
                  <div className="w-[80%] ml-3">
                    <h1 className="text-xl font-bold mb-2 ">
                      Problema Apresentado:
                    </h1>
                    <input
                      type="text"
                      className={styleAll.inputSoW + " tablet:text-lg"}
                      value={this.state.prob}
                      onChange={this.updateprob.bind(this)}
                    />
                  </div>
                  <div className="w-[20%] ml-3">
                    <h1 className="text-xl font-bold mb-2 ">Qtd.</h1>
                    <input
                      type="number"
                      className={styleAll.inputSoW + " tablet:text-lg"}
                      value={this.state.valor}
                      onChange={this.updateVal.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-2 " />
            {this.renderRows()}
          </div>
        </>
      );
    }
  }
}
