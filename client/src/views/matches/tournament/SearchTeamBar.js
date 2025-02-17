import React, { useState } from "react";
import { Input, ListGroup, ListGroupItem, Row, Col, Badge } from "reactstrap";

// Datos de ejemplo de equipos
const teamsData = [
  {
    id: 1,
    name: "Los Tigres",
    image: "https://via.placeholder.com/50", // URL de imagen
  },
  {
    id: 2,
    name: "Dragones FC",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Águilas Doradas",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Los Guerreros",
    image: "https://via.placeholder.com/50",
  },
];

const SearchTeamBar = ({ onSelectTeam }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  // Manejo de búsqueda
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      // Filtrar equipos por nombre
      const results = teamsData.filter((team) =>
        team.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredTeams(results);
    } else {
      setFilteredTeams([]);
    }
  };

  // Manejo de selección de equipo
  const handleSelectTeam = (team) => {
    setSearchTerm(""); // Limpiar el input
    setFilteredTeams([]); // Limpiar resultados de búsqueda
    setSelectedTeams((prevSelectedTeams) => {
      if (!prevSelectedTeams.some((t) => t.id === team.id)) {
        return [...prevSelectedTeams, team];
      }
      return prevSelectedTeams;
    });
    if (onSelectTeam) {
      onSelectTeam(team); // Llamar a la función de callback si se proporciona
    }
  };

  // Manejo de eliminación de equipo
  const handleRemoveTeam = (teamId) => {
    setSelectedTeams((prevSelectedTeams) =>
      prevSelectedTeams.filter((team) => team.id !== teamId)
    );
  };

  return (
    <div>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar equipo..."
      />
      {/* Mostrar resultados filtrados */}
      {filteredTeams.length > 0 && (
        <ListGroup style={{ position: "absolute", zIndex: 1000 }}>
          {filteredTeams.map((team) => (
            <ListGroupItem
              key={team.id}
              onClick={() => handleSelectTeam(team)}
            >
              <Row>
                <Col xs="2">
                  <img
                    src={team.image}
                    alt={team.name}
                    style={{ width: 30, borderRadius: "50%" }}
                  />
                </Col>
                <Col>{team.name}</Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
      {/* Mostrar equipos seleccionados */}
      {selectedTeams.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <h4>Equipos Seleccionados:</h4>
          <ListGroup>
            {selectedTeams.map((team) => (
              <ListGroupItem key={team.id}>
                <Row>
                  <Col xs="2">
                    <img
                      src={team.image}
                      alt={team.name}
                      style={{ width: 30, borderRadius: "50%" }}
                    />
                  </Col>
                  <Col>{team.name}</Col>
                  <Col xs="2">
                    <Badge color="danger" onClick={() => handleRemoveTeam(team.id)} style={{ cursor: 'pointer' }}>
                      X
                    </Badge>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default SearchTeamBar;
