import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom"; // Para navegação
import api from "../../api"; // Instância do Axios para requisições autenticadas
import {ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN} from "../../token";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Login com credenciais tradicionais
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/login/", { email, password });

      if (response.data.access) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access); // Armazenando o token
        alert("Login realizado com sucesso!");
        navigate("/home"); // Redireciona para a home após o login
      } else {
        alert("Token não encontrado. Verifique a resposta da API.");
      }
    } catch (error) {
      alert("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  // Login com Google OAuth
  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/accounts/google/login/";
  };

  return (
    <GoogleOAuthProvider clientId="202974754746-ud9jhk2ab8lao4sha4jlkqgehp4b3vgs.apps.googleusercontent.com">
      <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
        <form onSubmit={handleLogin} style={{ marginBottom: "20px" }}>
          <h1>Login</h1>
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
          </div>
          <button
            type="submit"
            style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        <div>
          <h2 style={{ textAlign: "center" }}>Ou entre com:</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              onClick={handleGoogleLogin}
              onError={() => alert("Erro ao autenticar com o Google.")}
            />
          </div>
          <button type="button" className="google-button" onClick={handleGoogleLogin}>
            TESTE
          </button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default FormLogin;
