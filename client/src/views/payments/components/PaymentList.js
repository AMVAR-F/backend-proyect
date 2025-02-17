import React, { useContext } from 'react';
import { PaymentContext } from './PaymentContext';
import { Table, Button, Badge, Container } from 'react-bootstrap';
import { FaPlus, FaEye, FaEdit } from 'react-icons/fa';

const PaymentList = ({ onInsert, onView, onEdit }) => {
  const { payments, setCurrentPayment, teams } = useContext(PaymentContext);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Gestión de Pagos del Torneo</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark text-center">
          <tr>
            <th>Equipo</th>
            <th>Delegado</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => {
            const payment = payments.find((p) => p.team === team.name);
            return (
              <tr key={team.id} className="text-center">
                <td>{team.name}</td>
                <td>{team.delegate}</td>
                <td>{payment ? `${payment.amount} ${payment.currency}` : 'No pagado'}</td>
                <td>
                  <Badge pill variant={payment?.status === 'Pagado' ? 'success' : 'danger'}>
                    {payment ? payment.status : 'Pendiente'}
                  </Badge>
                </td>
                <td>
                  {!payment ? (
                    <Button variant="success" size="sm" onClick={() => { setCurrentPayment(team); onInsert(); }}>
                      <FaPlus /> Registrar Pago
                    </Button>
                  ) : (
                    <>
                      <Button variant="info" size="sm" className="mr-2" onClick={() => { setCurrentPayment(payment); onView(); }}>
                        <FaEye /> Ver
                      </Button>
                      <Button variant="warning" size="sm" onClick={() => { setCurrentPayment(payment); onEdit(); }}>
                        <FaEdit /> Editar
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default PaymentList;
