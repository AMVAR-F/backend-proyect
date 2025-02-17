import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Badge
} from 'reactstrap';
import moment from 'moment';

const ViewTournamentModal = ({ isOpen, toggle, tournament }) => {
  if (!tournament) return null;

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} className="bg-primary text-white">Tournament Details</ModalHeader>
      <ModalBody>
        <Row>
          <Col md="6">
            <h5 className="text-muted">Name</h5>
            <p>{tournament.championship_name}</p>
          </Col>
          <Col md="6">
            <h5 className="text-muted">Category</h5>
            <p>{tournament.category}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <h5 className="text-muted">Status</h5>
            <Badge color="info">{tournament.status}</Badge>
          </Col>
          <Col md="6">
            <h5 className="text-muted">Start Date</h5>
            <p>{moment(tournament.start_date).format('YYYY-MM-DD')}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <h5 className="text-muted">End Date</h5>
            <p>{moment(tournament.end_date).format('YYYY-MM-DD')}</p>
          </Col>
          <Col md="6">
            <h5 className="text-muted">Start Inscriptions</h5>
            <p>{moment(tournament.start_inscriptions).format('YYYY-MM-DD')}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <h5 className="text-muted">End Inscriptions</h5>
            <p>{moment(tournament.end_inscriptions).format('YYYY-MM-DD')}</p>
          </Col>
        </Row>
        <h5 className="text-muted">Selected Teams</h5>
        {tournament.teams && tournament.teams.length > 0 ? (
          <ListGroup>
            {tournament.teams.map((team) => (
              <ListGroupItem key={team.id}>
                <Row className="align-items-center">
                  <Col xs="3">
                    <img
                      src={team.image}
                      alt={team.name}
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                  </Col>
                  <Col>{team.name}</Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        ) : (
          <p>No teams selected</p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewTournamentModal;
