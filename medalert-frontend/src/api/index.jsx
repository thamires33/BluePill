import axios from "axios";
import { ACCESS_TOKEN, GOOGLE_ACCESS_TOKEN } from "../token";

const API_URL = import.meta.env.VITE_API_URL;

const NOTOKEN = ["registro", "login", "refresh"]; // Lista de rotas que não devem receber token

// Criação da instância do Axios
const api = axios.create({
  baseURL: API_URL, // Substitua pela URL da sua API
});

// Adiciona o interceptor para incluir o token nos headers
api.interceptors.request.use(
  (config) => {
    // Verifica se a URL contém algum dos itens da lista NOTOKEN
    const urlIncludesNoToken = NOTOKEN.some((route) => config.url.includes(route));
    
    if (!urlIncludesNoToken) {
      const token = localStorage.getItem(ACCESS_TOKEN); // Recupera o token do localStorage
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // Adiciona o token no header Authorization
      }
    }

    const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN);
    // Descomente se necessário
    // if (googleAccessToken) {
    //   config.headers["X-Google-Access-Token"] = googleAccessToken;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error); // Lida com erros de configuração
  }
);

export default api;
