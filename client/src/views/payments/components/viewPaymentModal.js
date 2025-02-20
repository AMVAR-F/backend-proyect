import React, { useContext } from 'react';
import { Modal, Button, Table, Badge } from 'react-bootstrap';
import { PaymentContext } from './PaymentContext';
import { tournamentFee } from '../data';

const ViewPaymentModal = ({ show, onHide }) => {
  const { payments, currentPayment } = useContext(PaymentContext);

  // Encuentra el pago actual en la lista de pagos o usa el pago actual si no se encuentra
  const updatedPayment = payments.find(p => p.id === currentPayment?.id) || currentPayment;

  // Si no hay pago actual, no renderizar nada
  if (!updatedPayment) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Historial de Pagos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Equipo:</strong> {updatedPayment.team}</p>
        <p><strong>Delegado:</strong> {updatedPayment.delegate}</p>
        <p><strong>Monto a Pagar:</strong> {tournamentFee} {updatedPayment.currency}</p>
        <p><strong>Monto Abonado:</strong> {updatedPayment.amountPaid} {updatedPayment.currency}</p>
        <p><strong>Estado:</strong>
          <Badge bg={updatedPayment.status === 'Pagado' ? 'success' : 'danger'}>
            {updatedPayment.status}
          </Badge>
        </p>

        <h4>Historial</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto Abonado</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {updatedPayment.history && updatedPayment.history.length > 0 ? (
              updatedPayment.history.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date instanceof Date ? entry.date.toLocaleDateString() : entry.date}</td>
                  <td>{entry.amountPaid} {updatedPayment.currency}</td>
                  <td>
                    <Badge bg={entry.status === 'Pagado' ? 'success' : 'danger'}>
                      {entry.status}
                    </Badge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No hay pagos registrados.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <br />
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewPaymentModal;