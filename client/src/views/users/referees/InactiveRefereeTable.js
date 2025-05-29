import React from 'react';
import { Table, Button } from 'reactstrap';

const InactiveRefereeTable = ({ data = [], onView, onActivate }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>DNI</th>
          <th>Género</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((referee) => (
            <tr key={`inactive-referee-${referee.id_referee}`}>
              <td>{referee.id_referee}</td>
              <td>{referee.firstname || 'N/A'}</td>
              <td>{referee.lastname || 'N/A'}</td>
              <td>{referee.id_card || 'N/A'}</td>
              <td>{referee.gen || 'N/A'}</td>
              <td>
                <Button color="info" onClick={() => onView(referee)}>
                  Ver detalles
                </Button>{' '}
                <Button color="success" onClick={() => onActivate(referee)}>
                  Activar
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No hay árbitros inactivos</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default InactiveRefereeTable;