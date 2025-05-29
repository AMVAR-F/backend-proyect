import React from 'react'
import { Table, Button } from 'reactstrap'

const TechnicalDirectorTable = ({ data = [], onEdit, onDelete, onView }) => {
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
        {data.map((TechnicalDirector) => (
          <tr key={`TechnicalDirector-${TechnicalDirector.id_td}`}>
            <td>{TechnicalDirector.id_td}</td>
            <td>{TechnicalDirector.firstname || 'N/A'}</td>
            <td>{TechnicalDirector.lastname || 'N/A'}</td>
            <td>{TechnicalDirector.id_card || 'N/A'}</td>
            <td>{TechnicalDirector.gen || 'N/A'}</td>
            <td>
              <Button color="primary" onClick={() => onEdit(TechnicalDirectors)}>
                Editar
              </Button>{' '}
              <Button color="danger" onClick={() => onDelete(TechnicalDirectors)}>
                Desactivar
              </Button>{' '}
              <Button color="info" onClick={() => onView(TechnicalDirectors)}>
                Ver
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TechnicalDirectorTable
