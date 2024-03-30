import React, { useState } from "react";

export default function FiltroClick({ titulo, items, setItems }) {
  return (
    <>
      <div className="max-h-[15em]     overflow-y-auto select-none w-[15em] tablet:w-[13em] border-2 rounded-md ">
        <div className="sticky top-0 bg-fundo mx-2 pt-1">
          <h1 className="text-2xl tablet:text-xl mx-2 font-bold">{titulo}</h1>
          <hr className="mx-1 border-[#cecece] "></hr>
        </div>
        <div
          className={`p-2 mx-2 ${
            titulo == "Conta" || titulo == "Divisão" ? "flex" : ""
          }`}
        >
          {items.map((item, i) => {
            return (
              <div
                className={`text-xl tablet:text-lg ${
                  titulo == "Conta" || titulo == "Divisão" ? "mx-auto" : ""
                }`}
                key={item.id + item.ativo}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2 tablet:mr-1"
                  defaultChecked={item.ativo}
                  onChange={(e) => {
                    var opt = [...items];
                    opt[i].ativo = e.target.checked;
                    setItems(opt);
                  }}
                />
                {item.id}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
