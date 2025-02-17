import React, { useState } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import GroupMenu from "../groups/GroupMenu"; 

const categories = [
  "Semillitas",
  "Teteritos",
  "Compoticas",
  "Sub 7",
  "Sub 9",
  "Sub 11",
  "Sub 13",
  "Sub 17",
  "Sub 20",
  "Categoria Libre",
  "Veteranos",
  "Supra 50",
];

const MatchResults = () => {
  const [matches, setMatches] = useState([
    { id: 1, team1: "Equipo A", team2: "Equipo B", status: "Finalizado", score: "0-0", category: "Sub 7" },
    { id: 2, team1: "Equipo C", team2: "Equipo D", status: "Finalizado", score: "0-0", category: "Sub 9" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matchDetails, setMatchDetails] = useState({
    score: "",
    goals: [],
    cards: [],
    penalties: false,
    penaltyScore: "",
  });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedMatch(null);
    setMatchDetails({
      score: "",
      goals: [],
      cards: [],
      penalties: false,
      penaltyScore: "",
    });
  };

  const handleShow = (match) => {
    setSelectedMatch(match);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMatchDetails({ ...matchDetails, [name]: value });
  };

  const handleSave = () => {
    const updatedMatches = matches.map((match) =>
      match.id === selectedMatch.id ? { ...match, ...matchDetails } : match
    );
    setMatches(updatedMatches);
    handleClose();
  };

  return (
    <div className="container mt-4">
      {/* GroupMenu integration */}
      <GroupMenu categories={categories} onCategorySelect={handleCategorySelect} />

      {/* Category feedback */}
      <h3 className="text-center mt-3">
        {selectedCategory ? `Selected Category: ${selectedCategory}` : "Select a Category"}
      </h3>

      <h2>Resultados de Partidos Finalizados</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Equipo Local</th>
            <th>Equipo Visitante</th>
            <th>Estado</th>
            <th>Resultado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {matches
            .filter((match) => !selectedCategory || match.category === selectedCategory) // Filter by category
            .map((match) => (
              <tr key={match.id}>
                <td>{match.team1}</td>
                <td>{match.team2}</td>
                <td>{match.status}</td>
                <td>{match.score}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShow(match)}>
                    Ingresar Resultados
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Resultados del Partido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMatch && (
            <Form>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Resultado</Form.Label>
                    <Form.Control
                      type="text"
                      name="score"
                      value={matchDetails.score}
                      onChange={handleInputChange}
                      placeholder="Ej: 2-1"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Goles</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="goals"
                      value={matchDetails.goals}
                      onChange={handleInputChange}
                      placeholder="Jugador, Minuto, Equipo (uno por línea)"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Tarjetas</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="cards"
                      value={matchDetails.cards}
                      onChange={handleInputChange}
                      placeholder="Jugador, Tipo, Minuto, Equipo (uno por línea)"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      label="¿Hubo penales?"
                      name="penalties"
                      checked={matchDetails.penalties}
                      onChange={(e) =>
                        setMatchDetails({ ...matchDetails, penalties: e.target.checked })
                      }
                    />
                  </Form.Group>
                </Col>
                {matchDetails.penalties && (
                  <Col>
                    <Form.Group>
                      <Form.Label>Resultado de Penales</Form.Label>
                      <Form.Control
                        type="text"
                        name="penaltyScore"
                        value={matchDetails.penaltyScore}
                        onChange={handleInputChange}
                        placeholder="Ej: 5-4"
                      />
                    </Form.Group>
                  </Col>
                )}
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MatchResults;
