import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [classe, setClasse] = useState('');
  const [principio, setPrincipio] = useState('');
  const [classes, setClasses] = useState([]);

  // Carregar as classes terapêuticas ao iniciar
  useEffect(() => {
    axios.get('http://localhost:5000/classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar classes:', error);
      });
  }, []);

  // Função de busca
  const handleSearch = () => {
    const params = {
      keyword: keyword,
      classe_terapeutica: classe,
      principio_ativo: principio,
    };

    axios.get('http://localhost:5000/medicamentos', { params })
      .then(response => {
        setMedicamentos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar medicamentos:', error);
      });
  };

  return (
    <div>
      <h1>Pesquisa de Medicamentos</h1>

      <div>
        {/* Campo de pesquisa */}
        <input
          type="text"
          placeholder="Pesquisar por medicamento ou princípio ativo"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* Seletor de classes terapêuticas */}
        <select
          onChange={(e) => setClasse(e.target.value)}
          value={classe}
        >
          <option value="">Selecione uma classe terapêutica</option>
          {classes.map((classe, index) => (
            <option key={index} value={classe}>{classe}</option>
          ))}
        </select>

        {/* Campo para princípio ativo */}
        <input
          type="text"
          placeholder="Princípio ativo"
          value={principio}
          onChange={(e) => setPrincipio(e.target.value)}
        />

        {/* Botão de busca */}
        <button onClick={handleSearch}>Pesquisar</button>
      </div>

      {/* Exibição dos resultados */}
      <div>
        <h2>Resultados</h2>
        {medicamentos.length > 0 ? (
          <ul>
            {medicamentos.map((med) => (
              <li key={med.id}>
                <strong>{med.produto}</strong><br />
                Classe Terapêutica: {med.classe_terapeutica}<br />
                Princípio Ativo: {med.principio_ativo}<br />
                Laboratório: {med.laboratorio}<br />
                Apresentação: {med.apresentacao}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum medicamento encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default App;
