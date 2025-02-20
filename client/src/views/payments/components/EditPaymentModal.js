import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { PaymentContext } from './PaymentContext';
import { tournamentFee } from '../data';

const EditPaymentModal = ({ show, onHide }) => {
  const { currentPayment, updatePayment } = useContext(PaymentContext);
  const [amountPaid, setAmountPaid] = useState(0);
  const [status, setStatus] = useState("Pendiente");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (currentPayment) {
      setAmountPaid(0);
      setHistory(currentPayment.history || []);
      setStatus(currentPayment.status || "Pendiente");
    }
  }, [currentPayment]);

  useEffect(() => {
    if (currentPayment) {
      const totalPaid = history.reduce((sum, entry) => sum + entry.amountPaid, 0);
      setStatus(totalPaid >= tournamentFee ? "Pagado" : "Pendiente");
    }
  }, [history, currentPayment]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status === "Pagado") {
      alert("El pago ya está completo. No se pueden realizar más abonos.");
      return;
    }

    const newPayment = parseFloat(amountPaid) || 0;

    if (newPayment <= 0) {
      alert("El monto a abonar debe ser mayor que 0.");
      return;
    }

    const totalPaid = history.reduce((sum, entry) => sum + entry.amountPaid, 0) + newPayment;

    if (totalPaid > tournamentFee) {
      alert("El monto abonado supera el monto total a pagar.");
      return;
    }

    const newHistoryEntry = {
      date: new Date().toLocaleDateString(),
      amountPaid: newPayment,
      status: totalPaid >= tournamentFee ? "Pagado" : "Pendiente",
    };

    const updatedPayment = {
      ...currentPayment,
      status: totalPaid >= tournamentFee ? "Pagado" : "Pendiente",
      amountPaid: totalPaid,
      history: [...history, newHistoryEntry],
    };

    updatePayment(currentPayment.id, updatedPayment);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Equipo</Form.Label>
            <Form.Control type="text" value={currentPayment.team} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Delegado</Form.Label>
            <Form.Control type="text" value={currentPayment.delegate} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Monto a Pagar</Form.Label>
            <Form.Control type="text" value={`${tournamentFee} ${currentPayment.currency || '$'}`} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Monto Abonado</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
                disabled={status === "Pagado"}
              />
              <InputGroup.Text>{currentPayment.currency || 'S'}</InputGroup.Text>
            </InputGroup>
          
          </Form.Group>
          <Button variant="primary" type="submit" disabled={status === "Pagado"}>
            Guardar
          </Button>
          
          <Button variant="secondary" className="ml-2" onClick={onHide}>
            Cancelar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPaymentModal;