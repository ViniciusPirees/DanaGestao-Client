import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <>
      <div className=" opacity-50 bg-[rgb(0,0,0)] z-[5] fixed top-0 left-0 w-full h-full"></div>
      <div className=" opacity-100 text-center fixed top-1/2 left-1/2 z-[6] -translate-y-1/2 -translate-x-1/2 ">
        <ReactLoading
          className="mx-auto"
          type="spin"
          color="#fff"
          height={"10em"}
          width={"10em"}
        ></ReactLoading>
        <h1 className="text-3xl mt-5 font-bold ">Aguarde atualizar os dados</h1>
      </div>
    </>
  );
}
