import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { PaymentContext } from './PaymentContext';

const EditPaymentModal = ({ show, onHide }) => {
  const { currentPayment, updatePayment } = useContext(PaymentContext);
  const [status, setStatus] = useState('');
  const [amountPaid, setAmountPaid] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (currentPayment) {
      setAmountPaid(currentPayment.amountPaid || 0);
      setHistory(currentPayment.history || []);
      setStatus(currentPayment.amountPaid >= currentPayment.amount ? 'Pagado' : 'Pendiente');
    }
  }, [currentPayment]);

  const handleAmountPaidChange = (e) => {
    const newAmountPaid = parseFloat(e.target.value) || 0;
    setAmountPaid(newAmountPaid);
    setStatus(newAmountPaid >= currentPayment.amount ? 'Pagado' : 'Pendiente');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPayment = {
      ...currentPayment,
      status,
      amountPaid,
      history: [...history, { date: new Date().toLocaleDateString(), amountPaid, status }],
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
            <Form.Control type="text" value={currentPayment?.team || ''} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Delegado</Form.Label>
            <Form.Control type="text" value={currentPayment?.delegate || ''} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Monto Pagado</Form.Label>
            <InputGroup>
              <Form.Control type="number" value={amountPaid} onChange={handleAmountPaidChange} />
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit">Guardar</Button>
          <Button variant="secondary" className="ml-2" onClick={onHide}>Cancelar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPaymentModal;
