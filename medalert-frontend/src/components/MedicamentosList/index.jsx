import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Certifique-se de que o Modal esteja associado a um elemento no DOM
Modal.setAppElement('#root');

const MedicamentosList = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [selectedMedicamento, setSelectedMedicamento] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para buscar medicamentos
  const fetchMedicamentos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/medicamentos');
      setMedicamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar medicamentos:', error);
    }
  };

  // Função para buscar detalhes de um medicamento
  const fetchMedicamentoDetails = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/medicamento/${id}`);
      setSelectedMedicamento(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar medicamento:', error);
    }
  };

  // Função para fechar a modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicamento(null);
  };

  // Chama fetchMedicamentos quando o componente é montado
  React.useEffect(() => {
    fetchMedicamentos();
  }, []);

  return (
    <div>
      <h1>Lista de Medicamentos</h1>
      <ul>
        {medicamentos.map(medicamento => (
          <li key={medicamento.id} onClick={() => fetchMedicamentoDetails(medicamento.id)}>
            {medicamento.produto}
          </li>
        ))}
      </ul>

      {/* Modal de Detalhes */}
      {selectedMedicamento && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Detalhes do Medicamento"
        >
          <h2>Detalhes do Medicamento</h2>
          <p><strong>Produto:</strong> {selectedMedicamento.produto}</p>
          <p><strong>Classe Terapêutica:</strong> {selectedMedicamento.classe_terapeutica}</p>
          <p><strong>Princípio Ativo:</strong> {selectedMedicamento.principio_ativo}</p>
          <p><strong>Laboratório:</strong> {selectedMedicamento.laboratorio}</p>
          <p><strong>CNPJ:</strong> {selectedMedicamento.cnpj}</p>
          <p><strong>Registro:</strong> {selectedMedicamento.registro}</p>
          <p><strong>EAN:</strong> {selectedMedicamento.ean}</p>
          <p><strong>Apresentação:</strong> {selectedMedicamento.apresentacao}</p>
          <button onClick={closeModal}>Fechar</button>
        </Modal>
      )}
    </div>
  );
};

export default MedicamentosList;
