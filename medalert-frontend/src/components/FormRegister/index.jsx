import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação
import api from "../../api"; // Instância do Axios para requisições autenticadas
import Especialidades from "../Especialidades"; // Importa o componente de especialidades
import EstadoBrasil from "../Estados";
import { ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN } from "../../token";

const FormRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState(""); // Username
  const [firstName, setFirstName] = useState(""); // Primeiro nome
  const [lastName, setLastName] = useState(""); // Sobrenome
  const [crm, setCrm] = useState(""); // CRM
  const [estado, setEstado] = useState(""); // Estado
  const [especialidade, setEspecialidade] = useState(""); // Especialidade
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função de validação de email
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Função de registro
  const handleRegister = async (e) => {
    e.preventDefault();

    // Verifica se as senhas correspondem
    if (password !== password2) {
      alert("As senhas não correspondem!");
      return;
    }

    // Verifica se o email é válido
    if (!validateEmail(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    setLoading(true);
    try {

      let data = {
        email: email,
        username: username,
        first_name: firstName,
        last_name: lastName,
        password1: password,
        password2: password2,
        user_type: "MED",
        crm: crm,
        estado: estado,
        especialidade: especialidade,
      }

      const response = await api.post("/registro/", data);

      if (response.status === 201) {
        alert("Registro realizado com sucesso!");
        navigate("/");
      } else {
        alert("Erro ao registrar. Verifique os dados fornecidos.");
      }
    } catch (error) {
      console.error("Erro de registro:", error);
      alert("Erro ao registrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <form onSubmit={handleRegister} style={{ marginBottom: "20px" }}>
        <h1>Registro - Médico</h1>

        {/* Campos obrigatórios do formulário */}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            type="text"
            placeholder="Primeiro Nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            type="text"
            placeholder="Sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
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
          <input
            type="text"
            placeholder="CRM"
            value={crm}
            onChange={(e) => setCrm(e.target.value)}
            required
            maxLength={7}
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

        <h4 style={{ textAlign: "center", marginTop: "10px" }}>
          Já possui uma conta?
        </h4>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#1591ea",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
          disabled={loading}
          onClick={() => navigate("/")}
        >
          Fazer login
        </button>
      </form>
    </div>
  );
};

export default FormRegister;
