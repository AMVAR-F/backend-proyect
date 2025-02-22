import React from "react";
import { Table, Button, Container } from "reactstrap";

const IncidentList = ({ incidents, onEdit, onDelete, onView }) => {
  return (
    <Container>
      <h3>🚨 Lista de Incidentes</h3>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Árbitro</th>
            <th>Partido</th>
            <th>Minuto</th>
            <th>Tipo</th>
            <th>Tarjeta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td>{incident.id}</td>
              <td>{incident.referee}</td>
              <td>{incident.match}</td>
              <td>{incident.minute}</td>
              <td>{incident.type}</td>
              <td>{incident.card}</td>
              <td>
                <Button color="info" onClick={() => onView(incident)}>Ver</Button>{" "}
                <Button color="warning" onClick={() => onEdit(incident)}>Editar</Button>{" "}
                <Button color="danger" onClick={() => onDelete(incident)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default IncidentList;
