import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, ListGroup, ListGroupItem, Row, Col, Badge } from 'reactstrap';
import SearchTeamBar from './SearchTeamBar';

const EnrollTeamsModal = ({ isOpen, toggle, groups, setGroups, selectedCategory, selectedGroup }) => {
  const handleSelectTeam = (team) => {
    const newGroups = { ...groups };
    if (!newGroups[selectedCategory]) {
      newGroups[selectedCategory] = { A: { head: null, teams: [] }, B: { head: null, teams: [] }, C: { head: null, teams: [] }, D: { head: null, teams: [] }, E: { head: null, teams: [] } };
    }
    if (!newGroups[selectedCategory][selectedGroup].teams.some((t) => t.id === team.id)) {
      newGroups[selectedCategory][selectedGroup].teams.push(team);
      setGroups(newGroups);
    }
  };

  const handleRemoveTeam = (teamId) => {
    const newGroups = { ...groups };
    newGroups[selectedCategory][selectedGroup].teams = newGroups[selectedCategory][selectedGroup].teams.filter((team) => team.id !== teamId);
    setGroups(newGroups);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} className="bg-info text-white">Enroll Teams in {selectedCategory} Group {selectedGroup}</ModalHeader>
      <ModalBody>
        <SearchTeamBar onSelectTeam={handleSelectTeam} />
        {groups[selectedCategory] && groups[selectedCategory][selectedGroup].teams.length > 0 && (
          <ListGroup className="mt-2">
            {groups[selectedCategory][selectedGroup].teams.map((team) => (
              <ListGroupItem key={team.id}>
                <Row className="align-items-center">
                  <Col xs="3">
                    <img src={team.image} alt={team.name} style={{ width: 50, height: 50, borderRadius: "50%" }} />
                  </Col>
                  <Col>{team.name}</Col>
                  <Col xs="2">
                    <Badge color="danger" onClick={() => handleRemoveTeam(team.id)} style={{ cursor: 'pointer' }}>X</Badge>
                  </Col>
                  </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EnrollTeamsModal;
