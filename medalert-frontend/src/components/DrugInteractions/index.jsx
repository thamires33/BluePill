import React, { useState, useEffect } from 'react';

const DrugInteractions = ({ drugName }) => {
  const [interactions, setInteractions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/drug_interactions/${drugName}`)
      .then(response => response.json())
      .then(data => setInteractions(data))
      .catch(error => setError('Erro ao carregar interações'));
  }, [drugName]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {interactions ? (
        <div>
          <h3>Interações do Medicamento</h3>
          <pre>{JSON.stringify(interactions, null, 2)}</pre>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default DrugInteractions;
