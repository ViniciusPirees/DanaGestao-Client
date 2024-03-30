import React from "react";
import Select from "react-select";

export default function SelectOpt({
  options,
  setOpt,
  opt,
  placeholder,
  css,
  cssprefix,
}) {
  return (
    <Select
      isMulti
      placeholder={placeholder}
      options={options}
      className={css + "react-select-container"}
      classNamePrefix={cssprefix + "react-select"}
      defaultValue={opt}
      onChange={(e) => {
        if (e.length == 0) {
          if (placeholder == "Máquinas") {
            setOpt([]);
          } else {
            setOpt("");
          }
        } else {
          setOpt(e);
        }
      }}
      noOptionsMessage={() => "Sem opções"}
    />
  );
}
