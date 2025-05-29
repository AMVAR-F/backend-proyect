import React from 'react';
import { Table, Button, Badge } from 'reactstrap';

const positionTranslations = {
  portero: 'Portero',
  lateral: 'Lateral',
  defensa: 'Defensa',
  pivote: 'Pivote'
};

const PlayersTable = ({ data = [], onEdit, onDelete, onView }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>DNI</th>
          <th>Posición</th>
          <th>N° Camisa</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((player, index) => (
          <tr key={`player-${player.id_player}`}>
            <td>{index + 1}</td>
            <td>{player.firstname || 'N/A'}</td>
            <td>{player.lastname || 'N/A'}</td>
            <td>{player.id_card || 'N/A'}</td>
            <td>
              <Badge color="info">
                {positionTranslations[player.type_position] || player.type_position || 'N/A'}
              </Badge>
            </td>
            <td>{player.id_shirt || 'N/A'}</td>
            <td>
              <Button color="primary" size="sm" onClick={() => onView(player)} className="mr-2">
                <i className="fas fa-eye"></i>
              </Button>
              <Button color="warning" size="sm" onClick={() => onEdit(player)} className="mr-2">
                <i className="fas fa-edit"></i>
              </Button>
              <Button color="danger" size="sm" onClick={() => onDelete(player)}>
                <i className="fas fa-user-slash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PlayersTable;