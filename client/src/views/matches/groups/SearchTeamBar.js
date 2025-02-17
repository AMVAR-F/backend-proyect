import React, { useState } from "react";
import { Input, ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import { teamsData } from './InitialData';

const SearchTeamBar = ({ onSelectTeam }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const results = teamsData.filter((team) =>
        team.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredTeams(results);
    } else {
      setFilteredTeams([]);
    }
  };

  const handleSelectTeam = (team) => {
    setSearchTerm("");
    setFilteredTeams([]);
    if (onSelectTeam) {
      onSelectTeam(team);
    }
  };

  return (
    <div>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar equipo..."
       
      />
      {filteredTeams.length > 0 && (
        <ListGroup style={{ position: "absolute", zIndex: 1000 }}>
          {filteredTeams.map((team) => (
            <ListGroupItem key={team.id} onClick={() => handleSelectTeam(team)}>
              <Row>
                <Col xs="2">
                  <img src={team.image} alt={team.name} style={{ width: 30, borderRadius: "50%" }} />
                </Col>
                <Col>{team.name}</Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default SearchTeamBar;
