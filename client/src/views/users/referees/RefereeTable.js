import React from 'react';
import { Table, Button } from 'reactstrap';

const RefereeTable = ({ data = [], onEdit, onDelete, onView }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>DNI</th>
          <th>Género</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((referee) => (
          <tr key={`referee-${referee.id_referee}`}>
            <td>{referee.id_referee}</td>
            <td>{referee.firstname || 'N/A'}</td>
            <td>{referee.lastname || 'N/A'}</td>
            <td>{referee.id_card || 'N/A'}</td>
            <td>{referee.gen || 'N/A'}</td>
            <td>
              <Button color="primary" onClick={() => onEdit(referee)}>
                Editar
              </Button>{' '}
              <Button color="danger" onClick={() => onDelete(referee)}>
                Desactivar
              </Button>{' '}
              <Button color="info" onClick={() => onView(referee)}>
                Ver
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RefereeTable;