import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const IncidentView = ({ isOpen, toggle, incident }) => {
  if (!incident || !incident.incidents) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Detalles del Incidente</ModalHeader>
      <ModalBody>
        <p><strong>Árbitro:</strong> {incident.referee}</p>
        <p><strong>Partido:</strong> {incident.match}</p>
        {incident.incidents.map((inc, index) => (
          <div key={index} className="border p-2 my-2">
            <h5>Incidente {index + 1}</h5>
            <p><strong>Equipo:</strong> {inc.team}</p>
            <p><strong>Minuto:</strong> {inc.minute}</p>
            <p><strong>Tipo:</strong> {inc.type}</p>
            <p><strong>Tarjeta:</strong> {inc.card}</p>
            <p><strong>Descripción:</strong> {inc.description}</p>
          </div>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default IncidentView;