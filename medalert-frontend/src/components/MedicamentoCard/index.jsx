import React from 'react';

const MedicamentoCard = ({ medicamento }) => {
  return (
    <div className="medicamento-card">
      <h2>{medicamento.medicamento}</h2>
      <p><strong>Princípio Ativo:</strong> {medicamento.principio_ativo.join(', ')}</p>
      <p><strong>Fabricante:</strong> {medicamento.fabricante}</p>
      <p><strong>Uso:</strong> {medicamento.uso}</p>
    </div>
  );
};

export default MedicamentoCard;
