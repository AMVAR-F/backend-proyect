import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from "reactstrap";

const GroupModal = ({ isOpen, toggle, onSubmit }) => {
  const [numGroups, setNumGroups] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleSubmit = () => {
    const num = parseInt(numGroups);
    if (num > 0 && num <= 5) {
      onSubmit(num);
      toggle();
    } else {
      setErrorModalOpen(true);
    }
  };

  const toggleErrorModal = () => setErrorModalOpen(!errorModalOpen);

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle} className="bg-primary text-white">
          Crear Grupos
        </ModalHeader>
        <ModalBody>
          <p>¿Cuántos grupos desea crear? (Máximo 5)</p>
          <Input
            type="number"
            value={numGroups}
            onChange={(e) => setNumGroups(e.target.value)}
            min="1"
            max="5"
            placeholder="Ingrese un número entre 1 y 5"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Confirmar
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={errorModalOpen} toggle={toggleErrorModal}>
        <ModalHeader toggle={toggleErrorModal} className="bg-danger text-white">
          Error
        </ModalHeader>
        <ModalBody>
          Por favor ingrese un número válido entre 1 y 5.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleErrorModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default GroupModal;
