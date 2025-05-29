import React from 'react';
import { Table, Button } from 'reactstrap';

const TreasurerTable = ({ data = [], onEdit, onDelete, onView }) => {
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
        {data.map((treasurer) => (
          <tr key={`treasurer-${treasurer.id_treasurer}`}>
            <td>{treasurer.id_treasurer}</td>
            <td>{treasurer.firstname || 'N/A'}</td>
            <td>{treasurer.lastname || 'N/A'}</td>
            <td>{treasurer.id_card || 'N/A'}</td>
            <td>{treasurer.gen || 'N/A'}</td>
            <td>
              <Button color="primary" onClick={() => onEdit(treasurer)}>
                Editar
              </Button>{' '}
              <Button color="danger" onClick={() => onDelete(treasurer)}>
                Desactivar
              </Button>{' '}
              <Button color="info" onClick={() => onView(treasurer)}>
                Ver
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TreasurerTable;