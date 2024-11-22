import React, { useState, useEffect } from "react";
import Cabecalho from "../../components/Cabecalho";
import { FaEye } from "react-icons/fa";
import api from "../../api"; // Importa a configuração do Axios

const token = localStorage.getItem("token");

const Home = () => {
  const [receitas, setReceitas] = useState([]); // Estado para armazenar as receitas
  const [showModal, setShowModal] = useState(false); // Controle da modal
  const [newReceita, setNewReceita] = useState({
    paciente: "",
    recomendacao: "",
    dose: "",
    medicamento: "",
    alarme: {
      inicio: "",
      intervalo_horas: 0,
      duracao_dias: 0,
      medicamento: "",
    },
  });
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(""); // Estado de erro

  // Buscar receitas ao carregar a página
  useEffect(() => {
    const fetchReceitas = async () => {
      setLoading(true);
      try {
        const response = await api.get("/receitas/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReceitas(response.data); // Atualiza o estado com os dados recebidos
      } catch (error) {
        setError("Erro ao buscar receitas.");
        console.error("Erro ao buscar receitas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceitas();
  }, []);

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

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReceita((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para lidar com mudanças nos campos do alarme
  const handleAlarmeChange = (e) => {
    const { name, value } = e.target;
    setNewReceita((prev) => ({
      ...prev,
      alarme: {
        ...prev.alarme,
        [name]: value,
      },
    }));
  };

  // Função para adicionar nova receita
  const handleAddReceita = async () => {
    if (!newReceita.paciente || !newReceita.medicamento || !newReceita.dose) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/receitas/", newReceita);
      setReceitas([...receitas, response.data]); // Adiciona a nova receita à lista
      setShowModal(false); // Fecha a modal
      // Reseta o formulário
      setNewReceita({
        paciente: "",
        recomendacao: "",
        dose: "",
        medicamento: "",
        alarme: {
          inicio: "",
          intervalo_horas: 0,
          duracao_dias: 0,
          medicamento: "",
        },
      });
      setError(""); // Limpa erro
    } catch (error) {
      setError("Erro ao adicionar receita.");
      console.error("Erro ao adicionar receita:", error.response || error);
    } finally {
      setLoading(false);
    }
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
          {loading ? (
            <div>Carregando receitas...</div>
          ) : (
            <>
              {error && <div style={{ color: "red" }}>{error}</div>}
              <div style={styles.cardContainer}>
                {receitas.map((receita) => (
                  <div
                    key={receita.id}
                    style={styles.card}
                    onClick={() => handleCardClick(receita)}
                  >
                    <h3>{receita.paciente}</h3>
                    <p><strong>Medicamento:</strong> {receita.medicamento}</p>
                    <p><strong>Dose:</strong> {receita.dose}</p>
                    <div style={styles.iconContainer}>
                      <FaEye style={styles.eyeIcon} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Modal para adicionar nova receita */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2>Adicionar Receita</h2>
              {error && <div style={{ color: "red" }}>{error}</div>}
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
                name="recomendacao"
                value={newReceita.recomendacao}
                onChange={handleInputChange}
                placeholder="Recomendação"
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
              <h3>Alarme</h3>
              <input
                type="datetime-local"
                name="inicio"
                value={newReceita.alarme.inicio}
                onChange={handleAlarmeChange}
                style={styles.input}
              />
              <input
                type="number"
                name="intervalo_horas"
                value={newReceita.alarme.intervalo_horas}
                onChange={handleAlarmeChange}
                placeholder="Intervalo em horas"
                style={styles.input}
              />
              <input
                type="number"
                name="duracao_dias"
                value={newReceita.alarme.duracao_dias}
                onChange={handleAlarmeChange}
                placeholder="Duração em dias"
                style={styles.input}
              />
              <input
                type="text"
                name="medicamento"
                value={newReceita.alarme.medicamento}
                onChange={handleAlarmeChange}
                placeholder="Medicamento do alarme"
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
  pageContainer: { display: "flex", flexDirection: "column", height: "100vh" },
  menu: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#006da5",
    padding: "10px 0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  menuItem: { color: "#fff", fontSize: "18px", cursor: "pointer" },
  contentContainer: { flex: 1, padding: "20px", marginTop: "20px" },
  headerContainer: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#006da5",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  cardContainer: { display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" },
  card: {
    width: "200px",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  iconContainer: { display: "flex", justifyContent: "flex-end" },
  eyeIcon: { fontSize: "20px", color: "#006da5" },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "400px",
    maxWidth: "90%",
  },
  input: { 
    width: "100%", 
    padding: "10px", 
    marginBottom: "10px", 
    borderRadius: "4px", 
    border: "1px solid #ccc" 
  },
  modalButtons: { display: "flex", justifyContent: "space-between" },
  modalButton: {
    padding: "10px 20px",
    backgroundColor: "#006da5",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Home;
