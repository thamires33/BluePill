import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação
import api from "../../api"; // Instância do Axios para requisições autenticadas
import { ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN } from "../../token";
import Especialidades from "../Especialidades"; // Importa o componente de especialidades
import EstadoBrasil from "../Estados";

const FormRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [estado, setEstado] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("As senhas não correspondem!");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/registro/", {
        email,
        password,
        password2,
        estado,
        especialidade,
      });

      if (response.status === 201) {
        alert("Registro realizado com sucesso!");
        navigate("/login");
      } else {
        alert("Erro ao registrar. Verifique os dados fornecidos.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao registrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <form onSubmit={handleRegister} style={{ marginBottom: "20px" }}>
        <h1>Registro</h1>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Confirme a Senha"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>

        {/* Componente de estados */}
        <EstadoBrasil value={estado} onChange={(e) => setEstado(e.target.value)} />

        {/* Componente de especialidades */}
        <Especialidades
          value={especialidade}
          onChange={(e) => setEspecialidade(e.target.value)}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
};

export default FormRegister;