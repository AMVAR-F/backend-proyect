import React, { useState } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardHeader, ListGroup, ListGroupItem, Badge, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import GroupMenu from "./GroupMenu";
import SearchTeamBar from "./SearchTeamBar";
import GroupModal from "./GroupModal";

const categories = [
  "Semillitas", "Teteritos", "Compoticas", "Sub7", "Sub9", "Sub11", "Sub13", "Sub17",
  "Sub20", "Categoria Libre", "Veteranos", "Supra50"
];

const App = () => {
  const [groups, setGroups] = useState({});
  const [assignHeadsModalOpen, setAssignHeadsModalOpen] = useState(false);
  const [enrollTeamsModalOpen, setEnrollTeamsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [groupModalOpen, setGroupModalOpen] = useState(false);

  const toggleGroupModal = () => setGroupModalOpen(!groupModalOpen);

  const initializeGroups = (num) => {
    const initialGroups = Array.from({ length: num }, (_, index) => ({
      name: String.fromCharCode(65 + index),
      head: null,
      teams: []
    }));
    setGroups({ ...groups, [currentCategory]: initialGroups });
  };

  const handleCategorySelect = (category) => {
    setCurrentCategory(category);
    if (!groups[category]) {
      toggleGroupModal();
    }
  };

  const toggleEnrollTeamsModal = (group) => {
    setCurrentGroup(group);
    setEnrollTeamsModalOpen(!enrollTeamsModalOpen);
  };
  const toggleAssignHeadsModal = (group) => {
    setCurrentGroup(group);
    setAssignHeadsModalOpen(!assignHeadsModalOpen);
  };
  
  const handleAssignHead = (team) => {
    const updatedGroups = { ...groups };
    const groupIndex = updatedGroups[currentCategory].findIndex((group) => group.name === currentGroup);
  
    if (groupIndex !== -1) {
      updatedGroups[currentCategory][groupIndex].head = team;
      setGroups(updatedGroups);
      setSelectedTeam(null);
      toggleAssignHeadsModal();
    }
  };
  

  const handleSelectTeam = (team) => {
    const updatedGroups = { ...groups };
    const group = updatedGroups[currentCategory].find((g) => g.name === currentGroup);
    if (!group.teams.some((t) => t.id === team.id)) {
      group.teams.push(team);
      setGroups(updatedGroups);
    }
  };

  const handleRemoveTeam = (teamId) => {
    const updatedGroups = { ...groups };
    const group = updatedGroups[currentCategory].find((g) => g.name === currentGroup);
    group.teams = group.teams.filter((team) => team.id !== teamId);
    setGroups(updatedGroups);
  };

  return (
    <Container>
      <h2>Division</h2>

      <GroupMenu categories={categories} onCategorySelect={handleCategorySelect} />

      <Row className="mt-3">
        {currentCategory && groups[currentCategory]?.map((group) => (
          <Col md="6" key={group.name} className="mb-4">
            <Card>
              <CardHeader className="bg-info text-white">Group {group.name}</CardHeader>
              <CardBody>
                <h5>Head: {group.head ? group.head.name : "Not Assigned"}</h5>
                <ListGroup className="mt-3">
                  {group.teams.map((team) => (
                    <ListGroupItem key={team.id}>
                      <Row className="align-items-center">
                        <Col xs="3">
                          <img src={team.image} alt={team.name} style={{ width: 30, borderRadius: "50%" }} />
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
                <Button color="info" className="mt-3" onClick={() => toggleEnrollTeamsModal(group.name)} style={{ margin: "5px" }}>
                  Enroll Teams
                </Button>
                <Button color="warning" className="mt-3 ml-2" onClick={() => toggleAssignHeadsModal(group.name)}>
  Assign Group Head
</Button>

              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <GroupModal
        isOpen={groupModalOpen}
        toggle={toggleGroupModal}
        onSubmit={initializeGroups}
      />

      <Modal isOpen={assignHeadsModalOpen} toggle={toggleAssignHeadsModal}>
        <ModalHeader toggle={toggleAssignHeadsModal} className="bg-info text-white">
          Assign Group Head for {currentCategory} - Group {currentGroup}
        </ModalHeader>
        <ModalBody>
          <SearchTeamBar onSelectTeam={(team) => setSelectedTeam(team)} />
          {selectedTeam && (
            <div className="mt-3">
              <h5>Selected Head: {selectedTeam.name}</h5>
              <Button color="success" onClick={() => handleAssignHead(selectedTeam)}>Assign Head</Button>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleAssignHeadsModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={enrollTeamsModalOpen} toggle={() => setEnrollTeamsModalOpen(false)}>
        <ModalHeader toggle={() => setEnrollTeamsModalOpen(false)} className="bg-primary text-white">
          Enroll Teams in {currentCategory} - Group {currentGroup}
        </ModalHeader>
        <ModalBody>
          <SearchTeamBar onSelectTeam={handleSelectTeam} />
          {groups[currentCategory]?.find((group) => group.name === currentGroup)?.teams.length > 0 && (
            <ListGroup className="mt-2">
              {groups[currentCategory]?.find((group) => group.name === currentGroup)?.teams.map((team) => (
                <ListGroupItem key={team.id}>
                  <Row className="align-items-center">
                    <Col xs="3">
                      <img src={team.image} alt={team.name} style={{ width: 50, height: 50, borderRadius: "50%" }} />
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
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setEnrollTeamsModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default App;
