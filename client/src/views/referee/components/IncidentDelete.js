import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const IncidentDelete = ({ isOpen, toggle, onDelete, incident }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Confirmar Eliminación</ModalHeader>
      <ModalBody>
        ¿Seguro que deseas eliminar el incidente de <strong>{incident?.referee}</strong> en el partido <strong>{incident?.match}</strong>?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => onDelete(incident)}>Eliminar</Button>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default IncidentDelete;
