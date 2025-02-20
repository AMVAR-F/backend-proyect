import React, { useState, useEffect, useContext } from 'react'; 

import { PaymentContext } from './PaymentContext';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const InsertPaymentModal = ({ show, onHide }) => { 
  const { insertPayment, teams, payments } = useContext(PaymentContext); 
  const [selectedTeam, setSelectedTeam] = useState(''); 
  const [amount, setAmount] = useState(''); 
  const [currency, setCurrency] = useState('USD'); 

  // Filtrar equipos que no tienen pagos aún
  const availableTeams = teams.filter(team => !payments.some(payment => payment.team === team.name));

  // Autoseleccionar el primer equipo disponible cuando se abre el modal
  useEffect(() => { 
    if (availableTeams.length > 0) { 
      setSelectedTeam(availableTeams[0].name); 
    } 
  }, [show, availableTeams]); 

  // Encuentra el delegado del equipo seleccionado
  const selectedDelegate = teams.find(t => t.name === selectedTeam)?.delegate || '';

  // Manejar cambios en el monto asegurando un formato decimal correcto
  const handleAmountChange = (e) => { 
    const input = e.target.value.replace(/[^0-9.]/g, ''); // Solo números y punto decimal
    setAmount(input); // Evita valores vacíos
  };

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    insertPayment({ 
      team: selectedTeam, 
      delegate: selectedDelegate, 
      amount: parseFloat(amount) || 0, 
      currency, 
      status: 'Pendiente', 
      history: [] 
    }); 
    onHide(); 
  }; 

  return ( 
    <Modal show={show} onHide={onHide} centered> 
      <Modal.Header closeButton> 
        <Modal.Title>Registrar Pago</Modal.Title> 
      </Modal.Header> 
      <Modal.Body> 
        <Form onSubmit={handleSubmit}> 
          {/* Equipo seleccionado automáticamente */}
          <Form.Group> 
            <Form.Label>Equipo</Form.Label> 
            <Form.Control type="text" value={selectedTeam} readOnly /> 
          </Form.Group> 

          {/* Delegado seleccionado automáticamente */}
          <Form.Group> 
            <Form.Label>Delegado</Form.Label> 
            <Form.Control type="text" value={selectedDelegate} readOnly /> 
          </Form.Group> 

          {/* Monto con formato decimal */}
          <Form.Group> 
            <Form.Label>Monto Total</Form.Label> 
            <InputGroup> 
              <Form.Control type="text" value={amount} onChange={handleAmountChange} /> 
              <InputGroup.Text>{currency}</InputGroup.Text> 
            </InputGroup> 
          </Form.Group> 
          <br />
          <Button variant="primary" type="submit">Registrar</Button> 
        </Form> 
      </Modal.Body> 
    </Modal> 
  ); 
}; 

export default InsertPaymentModal;
