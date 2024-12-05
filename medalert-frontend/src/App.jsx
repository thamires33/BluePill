import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import Home from "./containers/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Medicamentos from "./components/Medicamentos";
import FormRegister from "./components/FormRegister";
import RedirectGoogleAuth from "./components/GoogleredirectHandler";
import Cadastro from "./containers/Cadastro";
import Dashboard from "./components/Dashboard";
import axios from "axios";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login/callback" element={<RedirectGoogleAuth />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/register" element={<FormRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
