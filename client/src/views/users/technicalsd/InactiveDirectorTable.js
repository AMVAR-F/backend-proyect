import React from 'react'
import { Table, Button } from 'reactstrap'

const InactiveTechnicalDirectorTable = ({ data = [], onView, onActivate }) => {
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
          data.map((TechnicalDirector) => (
            <tr key={`inactive-TechnicalDirector-${TechnicalDirector.id_td}`}>
              <td>{TechnicalDirector.id_td}</td>
              <td>{TechnicalDirector.firstname || 'N/A'}</td>
              <td>{TechnicalDirector.lastname || 'N/A'}</td>
              <td>{TechnicalDirector.id_card || 'N/A'}</td>
              <td>{TechnicalDirector.gen || 'N/A'}</td>
              <td>
                <Button color="info" onClick={() => onView(TechnicalDirector)}>
                  Ver detalles
                </Button>{' '}
                <Button color="success" onClick={() => onActivate(TechnicalDirector)}>
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
  )
}

export default InactiveTechnicalDirectorTable
