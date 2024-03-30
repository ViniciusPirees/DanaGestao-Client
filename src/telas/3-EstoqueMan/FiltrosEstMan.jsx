import React, { useEffect, useState } from "react";
import { styleAll } from "../../css";
import { FaPlus, FaMinus } from "react-icons/fa6";
import SelectOpt from "../components/Graficos/SelectOpt";
import Notificacao from "../components/Notificacao";
import axios from "axios";
import Dropdown from "../components/Dropdowns/Dropdown";

export default class FiltrosEstMan extends React.Component {
  constructor(props) {
    super(props);

    var itemsprop = props.filtroAll;
    this.state = {
      items: itemsprop,
      maquinas: [],
      maquinasel: [""],
    };
  }

  getMaquinas = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}/GetMaquinas`
      );

      if (res?.data?.code) {
        this.setState({
          maquinas: [],
        });
      } else {
        var maq = res.data.map((item) => {
          return { value: item.MaqCodigo, label: item.MaqCodigo };
        });

        this.setState({
          maquinas: maq,
        });
      }
    } catch (err) {
      console.log(err);
      Notificacao(["erro", "Erro ao buscar Maquinas" + err]);
    }
  };

  componentDidMount() {
    this.getMaquinas.call();
  }

  selectMaq(i, select) {
    var maquinasel = [""];

    if (select.length > 0) {
      maquinasel = select;
    }

    var items = this.state.items;

    items[i][1] = maquinasel;
   
    this.props.setFiltroAll(items);

    this.setState({
      items: items,
    });
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

  handleChangeDropdown(i, event) {

    var items = this.state.items;

    items[i][1] = event;

    this.props.setFiltroAll(items);

    this.setState({
      items: items,
    });
  }

  handleChangeS(i, event) {
    var items = this.state.items;

    if (event.target.value == "EstoqueManutencaoMaquina.EstManMaqCod") {
      items[i][0] = event.target.value;
      items[i][1] = [""];
      this.props.setFiltroAll(items);
    } else if (event.target.value == "EstManNivel") {
      items[i][0] = event.target.value;
      items[i][1] = "A";
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
        <div className="flex mb-5 tablet:mb-0 " key={i}>
          <div className="mx-4 tablet:ml-0 tablet:mr-2 tablet:mt-1">
            <select
              id="large"
              value={o[0]}
              onChange={context.handleChangeS.bind(context, i)}
              className={
                "block w-fit p-3 tablet:p-2 text-xl tablet:text-lg  text-gray-900 border-0 focus:-outline-offset-0 my-auto focus:outline-none " +
                styleAll.inputSemW
              }
            >
              <option value="EstManDesc">Descrição</option>

              <option value="EstManNum">Número Item</option>
              <option value="EstManAreaDesc">Área</option>
              <option value="EstManTipMatDesc">Tipo Material</option>
              <option value="EstManLoc">Local</option>
              <option value="EstManEstMin">Est. Mínimo</option>
              <option value="EstManEstMax">Est. Máximo</option>
              <option value="EstManSaldo">Saldo</option>
              <option value="EstManNivel">Nível</option>
              <option value="EstoqueManutencaoMaquina.EstManMaqCod">
                Máquinas
              </option>
            </select>
          </div>
          <div className="flex ">
            {o[0] == "EstoqueManutencaoMaquina.EstManMaqCod" ? (
              <>
                <SelectOpt
                  options={this.state.maquinas}
                  setOpt={context.selectMaq.bind(context, i)}
                  opt={o[1]}
                  placeholder={"Máquinas"}
                  css={"text-2xl "}
                  cssprefix={"text-2xl p-1 "}
                />
              </>
            ) : o[0] == "EstManNivel" ? (
              <>
                <div className="w-[10em]">
                  <Dropdown
                    options={["A", "B", "C", "D"]}
                    setValue={context.handleChangeDropdown.bind(context, i)}
                    defaultValue={"Nível " + o[1]}
                    tipo={2}
                    textTablet={"tablet:text-xl laptop:text-xl desktop:text-xl"}
                  ></Dropdown>
                </div>
              </>
            ) : (
              <input
                onChange={context.handleChangeI.bind(context, i)}
                className={
                  "text-xl tablet:text-lg h-full py-2 px-3 focus:-outline-offset-0 border-0 " +
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
                className="duration-200 hover:scale-105 ml-5 tablet:ml-2"
                onClick={context.handleAdd.bind(context)}
              >
                <FaPlus className=" bg-dana text-[3.3em] tablet:text-[2.8em] p-2 rounded-md" />
              </button>
            ) : (
              <button
                className="duration-200 hover:scale-105 tablet:ml-2"
                onClick={context.handleSub.bind(context, i)}
              >
                <FaMinus className=" bg-dana text-[3.3em] tablet:text-[2.8em] p-2 rounded-md" />
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
