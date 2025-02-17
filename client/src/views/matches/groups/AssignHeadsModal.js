import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, ListGroup, ListGroupItem } from 'reactstrap';
import SearchTeamBar from './SearchTeamBar';

const AssignHeadsModal = ({ isOpen, toggle, categories, groups, setGroups }) => {
  const handleSelectTeam = (team, groupIndex, category) => {
    const newGroups = { ...groups };
    if (!newGroups[category]) {
      newGroups[category] = { A: { head: null, teams: [] }, B: { head: null, teams: [] }, C: { head: null, teams: [] }, D: { head: null, teams: [] }, E: { head: null, teams: [] } };
    }
    newGroups[category][groupIndex].head = team;
    setGroups(newGroups);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} className="bg-primary text-white">Assign Group Heads</ModalHeader>
      <ModalBody>
        {categories.map((category) => (
          <div key={category}>
            <h5>{category}</h5>
            {["A", "B", "C", "D", "E"].map((groupIndex) => (
              <div key={groupIndex}>
                <h6>Group {groupIndex}</h6>
                <SearchTeamBar onSelectTeam={(team) => handleSelectTeam(team, groupIndex, category)} />
                {groups[category] && groups[category][groupIndex].head && (
                  <ListGroup className="mt-2">
                    <ListGroupItem>{groups[category][groupIndex].head.name}</ListGroupItem>
                  </ListGroup>
                )}
              </div>
            ))}
          </div>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AssignHeadsModal;
