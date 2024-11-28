import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Container, Form, Button, Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [sintomas, setSintomas] = useState(''); // Estado para armazenar os sintomas
  const [medicamentos, setMedicamentos] = useState([]); // Estado para armazenar os medicamentos encontrados
  const [classes, setClasses] = useState([]); // Estado para armazenar as classes terapêuticas
  const [graphData, setGraphData] = useState([]); // Dados para o gráfico
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento da pesquisa

  // Função para buscar medicamentos com base nos sintomas
  const fetchMedicamentos = async () => {
    if (!sintomas) return; // Se não houver sintomas, não fazer a pesquisa

    setLoading(true); // Inicia o carregamento
    try {
      const response = await axios.get(`http://localhost:8000/consulta?sintomas=${sintomas}`);
      setMedicamentos(response.data); // Armazena os medicamentos recebidos
      generateGraph(response.data); // Gera os dados para o gráfico
    } catch (error) {
      console.error("Erro ao buscar medicamentos:", error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Função para gerar os dados para o gráfico de classes terapêuticas
  const generateGraph = (data) => {
    const classeCount = {};
    data.forEach(med => {
      classeCount[med.classe_terapeutica] = (classeCount[med.classe_terapeutica] || 0) + 1;
    });

    const graphData = Object.keys(classeCount).map(classe => ({
      name: classe,
      value: classeCount[classe],
    }));

    setGraphData(graphData); // Atualiza os dados do gráfico
  };

  // Função para buscar as classes terapêuticas disponíveis
  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/produto');
      setClasses(response.data); // Armazena as classes terapêuticas
    } catch (error) {
      console.error("Erro ao buscar classes terapêuticas:", error);
    }
  };

  useEffect(() => {
    fetchClasses(); // Carrega as classes terapêuticas ao iniciar o componente
  }, []);

  return (
    <Container className="my-4">
      <h1>Dashboard de Medicamentos</h1>

      {/* Campo de pesquisa para sintomas */}
      <Row className="my-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Informe os sintomas, separados por vírgula"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)} // Atualiza o estado com os sintomas digitados
          />
        </Col>
        <Col md={4}>
          <Button onClick={fetchMedicamentos} disabled={loading}>
            {loading ? "Carregando..." : "Pesquisar Medicamentos"}
          </Button>
        </Col>
      </Row>

      {/* Exibição do gráfico de classes terapêuticas */}
      <Row className="my-4">
        <Col md={12}>
          <Card>
            <Card.Header><strong>Distribuição por Classe Terapêutica</strong></Card.Header>
            <Card.Body>
              <PieChart width={400} height={400}>
                <Pie
                  data={graphData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {graphData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8c66d4" : "#d4a4ff"} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Exibição dos medicamentos encontrados */}
      <Row>
        {medicamentos.length > 0 ? (
          medicamentos.map((med) => (
            <Col md={4} key={med.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{med.produto}</Card.Title>
                  <Card.Text><strong>Classe Terapêutica:</strong> {med.classe_terapeutica}</Card.Text>
                  <Card.Text><strong>Princípio Ativo:</strong> {med.principio_ativo}</Card.Text>
                  <Card.Text><strong>Laboratório:</strong> {med.laboratorio}</Card.Text>
                  <Card.Text><strong>Registro:</strong> {med.registro}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={12}>
            <p>Nenhum medicamento encontrado. Tente buscar com sintomas diferentes.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
