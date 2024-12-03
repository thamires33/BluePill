import React from "react";
import { estadosBrasil } from "../data/estados";

const EstadoBrasil = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      required
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    >
      <option value="" disabled>
        Selecione o Estado
      </option>
      {estadosBrasil.map((state) => (
        <option key={state.value} value={state.value}>
          {state.label}
        </option>
      ))}
    </select>
  );
};

export default EstadoBrasil;