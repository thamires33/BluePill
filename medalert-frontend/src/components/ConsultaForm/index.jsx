import React, { useState } from 'react';
import axios from 'axios';

const ConsultaForm = ({ onConsulta }) => {
  const [sintomas, setSintomas] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get('http://localhost:8000/consulta', {
        params: { sintomas },
      });
      onConsulta(response.data.medicamentos);
    } catch (error) {
      console.error('Erro na consulta:', error);
      alert('Erro ao realizar a consulta. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="consulta-form">
      <input
        type="text"
        placeholder="Digite os sintomas separados por vírgula"
        value={sintomas}
        onChange={(e) => setSintomas(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Carregando...' : 'Consultar'}
      </button>
    </form>
  );
};

export default ConsultaForm;
