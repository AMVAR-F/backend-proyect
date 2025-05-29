import React from 'react';
import { Table, Button } from 'reactstrap';

const InactiveTreasurerTable = ({ data = [], onView, onActivate }) => {
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
        {data.length > 0 ? (
          data.map((treasurer) => (
            <tr key={`inactive-treasurer-${treasurer.id_treasurer}`}>
              <td>{treasurer.id_treasurer}</td>
              <td>{treasurer.firstname || 'N/A'}</td>
              <td>{treasurer.lastname || 'N/A'}</td>
              <td>{treasurer.id_card || 'N/A'}</td>
              <td>{treasurer.gen || 'N/A'}</td>
              <td>
                <Button color="info" onClick={() => onView(treasurer)}>
                  Ver detalles
                </Button>{' '}
                <Button color="success" onClick={() => onActivate(treasurer)}>
                  Activar
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No hay delegados inactivos</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default InactiveTreasurerTable;