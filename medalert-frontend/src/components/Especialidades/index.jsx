import React from "react";
import { especialidades } from "../data/especialidades";

const Especialidades = ({ onChange, value }) => {
    return (
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="especialidade" style={{ display: "block", marginBottom: "5px" }}>
          Especialidade:
        </label>
        <select
          id="especialidade"
          value={value}
          onChange={onChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Selecione uma especialidade</option>
          {especialidades.map((especialidade) => (
            <option key={especialidade.id} value={especialidade.id}>
              {especialidade.nome}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Especialidades;