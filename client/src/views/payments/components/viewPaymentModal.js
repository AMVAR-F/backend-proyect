import React, { useContext } from 'react';
import { PaymentContext } from './PaymentContext';
import { Modal, Button, Table, Badge } from 'react-bootstrap';

const ViewPaymentModal = ({ show, onHide }) => {
  const { currentPayment } = useContext(PaymentContext);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Historial de Pagos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Equipo:</strong> {currentPayment?.team}</p>
        <p><strong>Delegado:</strong> {currentPayment?.delegate}</p>
        <p><strong>Monto Total:</strong> {currentPayment?.amount} {currentPayment?.currency}</p>
        <p><strong>Estado:</strong> <Badge variant={currentPayment?.status === 'Pagado' ? 'success' : 'danger'}>{currentPayment?.status}</Badge></p>
        <h4>Historial</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto Pagado</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {currentPayment?.history?.length > 0 ? currentPayment.history.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.amountPaid} {currentPayment.currency}</td>
                <td><Badge variant={entry.status === 'Pagado' ? 'success' : 'danger'}>{entry.status}</Badge></td>
              </tr>
            )) : <tr><td colSpan="3">No hay pagos registrados.</td></tr>}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewPaymentModal;
