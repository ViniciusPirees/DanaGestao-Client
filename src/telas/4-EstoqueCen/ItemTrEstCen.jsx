import React, { useEffect, useRef, useState } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import axios from "axios";

import { BsFillImageFill } from "react-icons/bs";
import Notificacao from "../components/Notificacao";
import { FaBars } from "react-icons/fa6";

import { FaHistory, FaExchangeAlt } from "react-icons/fa";
import { RiDeleteBin6Fill, RiPencilFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function ItemTrEstCen({ estoque, index, setInfosEst }) {
  const refBtn = useRef();
  const refBtn2 = useRef();
  const nav = useNavigate();

  const [ativo, setAtivo] = useState(false);

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        refBtn.current &&
        !refBtn.current.contains(event.target) &&
        refBtn2.current &&
        !refBtn2.current.contains(event.target)
      ) {
        setAtivo(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refBtn, refBtn2]);

  return (
    <>
      <tr className="text-xl border-b-4 border-[#4f4f4f]  " key={index}>
        <td className="text-center border-x-4 border-[#4f4f4f] break-words flex-wrap  p-4">
          {estoque?.ITEM}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap p-4">
          {estoque?.DESCRIPTION}
        </td>
        <td className="text-center border-r-4 border-[#4f4f4f]  break-words flex-wrap p-4">
          {Number(estoque?.QUANTITY).toFixed(2).toString().replace(".", ",")}
        </td>
      </tr>
    </>
  );
}
