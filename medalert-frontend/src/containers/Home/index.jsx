import React, { useState } from "react";
import Cabecalho from "../../components/Cabecalho";
import { FaEye } from "react-icons/fa"; // Importando ícone de olho do react-icons

// Dados mockados
const mockReceitas = [
  { id: 1, paciente: "João", medicamento: "Paracetamol", dose: "500mg" },
  { id: 2, paciente: "Maria", medicamento: "Amoxicilina", dose: "250mg" },
];

const Home = () => {
  const [receitas, setReceitas] = useState(mockReceitas);
  const [showModal, setShowModal] = useState(false);  // Controle da visibilidade da modal
  const [newReceita, setNewReceita] = useState({
    paciente: "",
    medicamento: "",
    dose: "",
  });

  // Função para lidar com o clique no card
  const handleCardClick = (receita) => {
    alert(`Visualizar receita de ${receita.paciente}`);
  };

  // Função para abrir a modal
  const handleAddRecipeClick = () => {
    setShowModal(true);
  };

  // Função para fechar a modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Função para lidar com a mudança nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReceita((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para adicionar nova receita
  const handleAddReceita = () => {
    setReceitas([...receitas, { ...newReceita, id: receitas.length + 1 }]);
    setShowModal(false);
  };

  return (
    <>
      <Cabecalho />
      <div style={styles.pageContainer}>
        <div style={styles.menu}>
          <div style={styles.menuItem}>Home</div>
          <div style={styles.menuItem}>Dashboard</div>
          <div style={styles.menuItem}>Medicamentos</div>
        </div>
        <div style={styles.contentContainer}>
          <div style={styles.headerContainer}>
            <h1>Receitas</h1>
            <button style={styles.addButton} onClick={handleAddRecipeClick}>
              Adicionar Receita
            </button>
          </div>
          <div style={styles.cardContainer}>
            {receitas.map((receita) => (
              <div
                key={receita.id}
                style={styles.card}
                onClick={() => handleCardClick(receita)} // Função de clique
              >
                <h3>{receita.paciente}</h3>
                <p><strong>Medicamento:</strong> {receita.medicamento}</p>
                <p><strong>Dose:</strong> {receita.dose}</p>
                <div style={styles.iconContainer}>
                  <FaEye style={styles.eyeIcon} /> {/* Ícone de olho */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal para adicionar nova receita */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2>Adicionar Receita</h2>
              <input
                type="text"
                name="paciente"
                value={newReceita.paciente}
                onChange={handleInputChange}
                placeholder="Nome do paciente"
                style={styles.input}
              />
              <input
                type="text"
                name="medicamento"
                value={newReceita.medicamento}
                onChange={handleInputChange}
                placeholder="Medicamento"
                style={styles.input}
              />
              <input
                type="text"
                name="dose"
                value={newReceita.dose}
                onChange={handleInputChange}
                placeholder="Dose"
                style={styles.input}
              />
              <div style={styles.modalButtons}>
                <button style={styles.modalButton} onClick={handleAddReceita}>
                  Adicionar
                </button>
                <button style={styles.modalButton} onClick={handleCloseModal}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Estilos para o layout da página
const styles = {
  pageContainer: {
    display: "flex",                // Flexbox para alinhar o menu e o conteúdo
    flexDirection: "column",        // A ordem é coluna, para que o menu fique em cima
    height: "100vh",                // A altura da página vai ocupar a tela toda
  },
  menu: {
    display: "flex",                // Flexbox para o menu horizontal
    justifyContent: "space-around", // Espaçamento entre os itens
    backgroundColor: "#006da5",     // Cor de fundo do menu
    padding: "10px 0",              // Padding para o menu
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombras para o menu
  },
  menuItem: {
    color: "#fff",                 // Cor dos itens de navegação
    fontSize: "18px",               // Tamanho da fonte
    cursor: "pointer",             // Indica que o item é clicável
  },
  contentContainer: {
    flex: 1,                        // O conteúdo ocupa o restante do espaço disponível
    padding: "20px",
    marginTop: "20px",              // Espaço entre o menu e o conteúdo
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#006da5",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cardContainer: {
    display: "flex",                // Flexbox para dispor os cards lado a lado
    flexWrap: "wrap",               // Permite que os cards que não cabem na linha desçam para a linha seguinte
    gap: "20px",                    // Espaço entre os cards
    marginTop: "20px",
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    cursor: "pointer", // Indica que o card é clicável
    transition: "transform 0.2s ease-in-out, background-color 0.3s ease",
  },
  iconContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
  },
  eyeIcon: {
    fontSize: "20px",
    color: "#007BFF", // Cor do ícone de olho
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro para overlay
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: "10px 20px",
    backgroundColor: "#006da5",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
