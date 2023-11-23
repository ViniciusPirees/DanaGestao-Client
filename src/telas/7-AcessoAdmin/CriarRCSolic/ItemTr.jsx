import React, { useEffect, useRef, useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import axios from "axios";

import { FaBars } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import { FaBoxes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsFillImageFill } from "react-icons/bs";
import Notificacao from "../../components/Notificacao";
import { BiPlusMedical } from "react-icons/bi";
import { IoIosCreate, IoMdCreate } from "react-icons/io";

export default function ItemTr({ lista, index, setAtivoImg, setImg, setTelaItem, setItens }) {
  var data = `${lista.MatData.substring(8, 10)}/${lista.MatData.substring(
    5,
    7
  )}/${lista.MatData.substring(2, 4)}`;
  const nav = useNavigate()
  const refBtn = useRef()
  const refBtn2 = useRef()
  const [ativo, setAtivo] = useState(false);
  const [itensEdit, setItensEdit] = useState();
  const [tamanho, setTamanho] = useState("h-[130px]");
  const matCod = lista.MatSolicitacao;
  useEffect(() => {
    if (ativo) {
      buscaItens();
    }
  }, [ativo]);



  const buscaItens = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getItens`,
        { params: { matCod } }
      );
      setItens(res?.data);
      return (res?.data);

    } catch (err) {
      console.log(err);
      Notificacao(['erro', 'Erro ao buscar itens. ' + err])
    }
  };


  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const getAnexo = async () => {
    try {
      const res = await axios.get(
        `http://${import.meta.env.VITE_IP}:4400/getAnexo`,
        { params: { matCod } }
      );
      if (res?.data.length > 0) {
        console.log(res?.data);
        var buffer = res?.data[0].MatAnexo.data;
        var base64 = _arrayBufferToBase64(buffer);
        console.log(base64);
        setImg(base64);
        setAtivoImg(true);
      } else {
        Notificacao(['atencao', 'Nenhum anexo foi encontrado para essa solicitação.'])
      }
    } catch (err) {
      console.log(err);
      Notificacao(['erro', 'Erro ao buscar anexo. ' + err])
    }
  };

  return (
    <>
      <tr className="text-2xl border-b-4 border-[#4f4f4f]  " key={index}>
        <td className="text-center  border-[rgb(79,79,79)] p-3 ">
          <button ref={refBtn2} onClick={() => setAtivo(!ativo)} className="flex mx-2 duration-200 hover:brightness-75 ">
            <FaBars className="bg-dana p-2 text-5xl rounded-md my-auto text-[#fff]" />
          </button>
          {ativo &&
            <>
              <div ref={refBtn} className="absolute mt-[-2em] rounded-lg ml-[2.37em]  bg-[#fff]">
                <button onClick={() => {
                  buscaItens()
                  setAtivo(false)
                  setTelaItem(true)
                }} className="text-fundo flex font-bold text-2xl rounded-lg py-2 px-3 w-full duration-200 hover:bg-[#a0a0a0] "><FaBoxes className="text-2xl my-auto mr-2 " /> Itens</button>
                <button onClick={() => {

                  buscaItens().then((val) => nav('/SolicitarMateriais', { state: { itens: val, solic: lista, tipo: 2 } }))

                }} className="text-fundo flex font-bold text-2xl rounded-lg py-2 px-3 w-full duration-200 hover:bg-[#a0a0a0] "><IoIosCreate className="text-2xl my-auto mr-2 " /> Criar RC</button>
                <button onClick={() => {
                  getAnexo()
                  setAtivo(false)
                }} className="text-fundo flex font-bold text-2xl rounded-lg py-2 px-3 w-full duration-200 hover:bg-[#a0a0a0] "><BsFillImageFill className="text-2xl my-auto mr-2 " /> Anexo</button>
              </div>
            </>
          }
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f] break-words flex-wrap max-w-xs p-4">
          {lista.MatSolicitacao}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {data}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {lista.MatMaquina}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap w-full max-w-xs p-4">
          {lista.MatDescricao}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap max-w-xs p-4">
          {lista.MatOs}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap w-full max-w-xs p-4">
          {lista.MatSolicitanteDesc}
        </td>
        <td className="text-center  break-words w-full max-w-xs p-4">
          {lista.MatObservacao}
        </td>
      </tr>


    </>
  );
}
