import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o Bootstrap

function App() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [classe, setClasse] = useState('');
  const [principio, setPrincipio] = useState('');
  const [classes, setClasses] = useState([]);
  const [sintomas, setSintomas] = useState('');
  const [tipoPesquisa, setTipoPesquisa] = useState('medicamento'); // 'medicamento' ou 'sintomas'

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

  // Função de busca por medicamentos
  const handleSearchMedicamentos = () => {
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

  // Função de busca por sintomas
  const handleSearchSintomas = () => {
    if (!sintomas) {
      alert('Por favor, insira pelo menos um sintoma');
      return;
    }

    const params = {
      sintomas: sintomas,
    };

    axios.get('http://localhost:8000/consulta', { params })
      .then(response => {
        setMedicamentos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar medicamentos para sintomas:', error);
      });
  };

  // Função de pesquisa, dependendo do tipo selecionado
  const handleSearch = () => {
    if (tipoPesquisa === 'medicamento') {
      handleSearchMedicamentos();
    } else if (tipoPesquisa === 'sintomas') {
      handleSearchSintomas();
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pesquisa de Medicamentos ou Sintomas</h1>

      {/* Seletor para tipo de pesquisa */}
      <div className="d-flex justify-content-center mb-4">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            value="medicamento"
            checked={tipoPesquisa === 'medicamento'}
            onChange={() => setTipoPesquisa('medicamento')}
            id="medicamentoRadio"
          />
          <label className="form-check-label" htmlFor="medicamentoRadio">Pesquisa por Medicamento</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            value="sintomas"
            checked={tipoPesquisa === 'sintomas'}
            onChange={() => setTipoPesquisa('sintomas')}
            id="sintomasRadio"
          />
          <label className="form-check-label" htmlFor="sintomasRadio">Pesquisa por Sintomas</label>
        </div>
      </div>

      {/* Campos de pesquisa por medicamento */}
      {tipoPesquisa === 'medicamento' && (
        <div className="mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Pesquisar medicamento ou princípio ativo"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <select className="form-select mb-2" onChange={(e) => setClasse(e.target.value)} value={classe}>
            <option value="">Selecione uma classe terapêutica</option>
            {classes.map((classe, index) => (
              <option key={index} value={classe}>{classe}</option>
            ))}
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="Princípio ativo"
            value={principio}
            onChange={(e) => setPrincipio(e.target.value)}
          />
        </div>
      )}

      {/* Campo de pesquisa por sintomas */}
      {tipoPesquisa === 'sintomas' && (
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Insira sintomas (separados por vírgula)"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
      )}

      <button className="btn btn-primary w-100" onClick={handleSearch}>Pesquisar</button>

      {/* Exibição dos resultados em cards ou lista */}
      <div className="mt-4">
        <h2 className="text-center">Resultados</h2>
        {medicamentos.length > 0 ? (
          <div className="row">
            {medicamentos.map((med, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{med.produto}</h5> {/* Exibe o nome do produto */}
                    {/* Exibir uso apenas se for busca por sintomas */}
                    {tipoPesquisa === 'sintomas' && (
                      <>
                        <p className="card-text"><strong>Medicamento indicado:</strong> {med.medicamento}</p>
                        <p className="card-text"><strong>Uso:</strong> {med.uso}</p>
                      </>
                    )}
                    {tipoPesquisa === 'medicamento' && (
                      <>
                        <p className="card-text"><strong>Classe Terapêutica:</strong> {med.classe_terapeutica || 'Não especificada'}</p>
                        <p className="card-text"><strong>Princípio Ativo:</strong> {med.principio_ativo || 'Não especificado'}</p>
                        <p className="card-text"><strong>Laboratório:</strong> {med.laboratorio || 'Não disponível'}</p>
                        <p className="card-text"><strong>CNPJ:</strong> {med.cnpj || 'Não disponível'}</p>
                        <p className="card-text"><strong>Registro:</strong> {med.registro || 'Não disponível'}</p>
                        <p className="card-text"><strong>EAN:</strong> {med.ean || 'Não disponível'}</p>
                        <p className="card-text"><strong>Apresentação:</strong> {med.apresentacao || 'Não disponível'}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">Nenhum medicamento encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default App;
