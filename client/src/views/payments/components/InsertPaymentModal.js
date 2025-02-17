import React, { useState, useContext } from 'react';
import { PaymentContext } from './PaymentContext';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const InsertPaymentModal = ({ show, onHide }) => {
  const { insertPayment } = useContext(PaymentContext);
  const [team, setTeam] = useState('');
  const [delegate, setDelegate] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('USD');

  const handleSubmit = (e) => {
    e.preventDefault();
    insertPayment({ team, delegate, amount, currency, status: 'Pendiente', history: [] });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Equipo</Form.Label>
            <Form.Control type="text" value={team} onChange={(e) => setTeam(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Delegado</Form.Label>
            <Form.Control type="text" value={delegate} onChange={(e) => setDelegate(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Monto Total</Form.Label>
            <InputGroup>
              <Form.Control type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} />
              <InputGroup.Text>{currency}</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit">Registrar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default InsertPaymentModal;
