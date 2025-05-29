import React from 'react'
import { Table, Button, Badge } from 'reactstrap'

const positionTranslations = {
  portero: 'Portero',
  lateral: 'Lateral',
  defensa: 'Defensa',
  pivote: 'Pivote',
}

const InactivePlayersTable = ({ data = [], onView, onActivate }) => {
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
          <tr key={`inactive-player-${player.id_player}`}>
            <td>{index + 1}</td>
            <td>{player.firstname || 'N/A'}</td>
            <td>{player.lastname || 'N/A'}</td>
            <td>{player.id_card || 'N/A'}</td>
            <td>
              <Badge color="secondary">
                {positionTranslations[player.type_position] || player.type_position || 'N/A'}
              </Badge>
            </td>
            <td>{player.id_shirt || 'N/A'}</td>
            <td>
              <Button color="info" size="sm" onClick={() => onView(player)} className="mr-2">
                <i className="fas fa-eye"></i> Ver
              </Button>
              <Button color="success" size="sm" onClick={() => onActivate(player)}>
                <i className="fas fa-user-check"></i> Reactivar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default InactivePlayersTable
