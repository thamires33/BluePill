import axios from "axios";

// Criação da instância do Axios
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Substitua pela URL da sua API
});

// Adiciona o interceptor para incluir o token nos headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Recupera o token do localStorage (ou outro local de armazenamento)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Adiciona o token no header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Lida com erros de configuração
  }
);

export default api
