import React from "react";
import { styleAll } from "../../../css";

export default function Titulo({ titulo }) {
  return (
    <div className="">
      <div className={styleAll.Telas.Titulo}>{titulo}</div>
      <hr className="laptop:border-2 desktop:border-2 tablet:border-2 mx-2 laptop:mx-0 desktop:mx-0 tablet:mx-0" />
    </div>
  );
}
