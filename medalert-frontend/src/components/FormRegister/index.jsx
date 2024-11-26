import React, { useState, useEffect } from 'react';
import './FormRegister.css';

const FormRegister = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [userType, setUserType] = useState("PAC"); // PAC, MED, ADM
  const [idade, setIdade] = useState("");
  const [estado, setEstado] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [loading, setLoading] = useState(false);
  const [estados, setEstados] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar estados
        const statesResponse = await fetch("http://localhost:8000/api/states/");
        const statesData = await statesResponse.json();
        setEstados(statesData);

        // Carregar especialidades
        const specialtiesResponse = await fetch("http://localhost:8000/api/specialties/");
        const specialtiesData = await specialtiesResponse.json();
        console.log("Especialidades carregadas: ", specialtiesData); // Verifique se os dados estão corretos
        setEspecialidades(specialtiesData);
      } catch (error) {
        console.error("Erro ao carregar estados e especialidades:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email,
      username,
      first_name: firstName,
      last_name: lastName,
      password1,
      password2,
      user_type: userType,
      idade,
      estado,
      especialidade,
    };

    try {
      const response = await fetch("http://localhost:8000/api/v1/registro/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
      } else {
        alert("Erro ao realizar o cadastro: " + data.message);
      }
    } catch (error) {
      alert("Erro ao enviar dados para a API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Primeiro Nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Senha"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirme a Senha"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="PAC">Paciente</option>
            <option value="MED">Médico</option>
            <option value="ADM">Administrador</option>
          </select>
        </div>
        
        {/* Campos Condicionais Baseados no Tipo de Usuário */}
        {userType === 'PAC' && (
          <>
            <div className="form-group">
              <input
                type="number"
                placeholder="Idade"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              >
                <option value="">Selecione o Estado</option>
                {estados.map((estadoItem) => (
                  <option key={estadoItem.sigla} value={estadoItem.sigla}>
                    {estadoItem.nome}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {userType === 'MED' && (
          <>
            <div className="form-group">
              <select
                value={especialidade}
                onChange={(e) => setEspecialidade(e.target.value)}
                required
              >
                <option value="">Selecione a Especialidade</option>
                {especialidades.map((especialidadeItem) => (
                  <option key={especialidadeItem.id} value={especialidadeItem.id}>
                    {especialidadeItem.nome}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {userType === 'ADM' && (
          <p>Como Administrador, você tem acesso completo ao sistema.</p>
        )}

        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
