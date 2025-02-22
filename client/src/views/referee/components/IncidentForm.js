import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Button } from "reactstrap";
import { referees, incidentData } from "../data";

const IncidentForm = ({ isOpen, toggle, onSave, incident }) => {
  const [selectedReferee, setSelectedReferee] = useState(incident?.referee || "");
  const [incidentCount, setIncidentCount] = useState(incident?.incidents?.length || 1);
  const [incidentDetails, setIncidentDetails] = useState(
    incident?.incidents || Array.from({ length: incidentCount }, () => ({ type: "", description: "", minute: "", card: "", team: "" }))
  );

  const handleIncidentCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setIncidentCount(count);
    setIncidentDetails(Array.from({ length: count }, () => ({ type: "", description: "", minute: "", card: "", team: "" })));
  };

  const handleIncidentDetailChange = (index, field, value) => {
    const updatedDetails = [...incidentDetails];
    updatedDetails[index][field] = value;
    setIncidentDetails(updatedDetails);
  };

  const handleSave = () => {
    onSave({ id: incident?.id || Date.now(), referee: selectedReferee, incidents: incidentDetails });
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>{incident ? "Editar Incidente" : "Registrar Incidente"}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <label>Árbitro</label>
          <select className="form-control" value={selectedReferee} onChange={(e) => setSelectedReferee(e.target.value)}>
            {referees.map((ref) => (
              <option key={ref.id} value={ref.name}>{ref.name}</option>
            ))}
          </select>
        </FormGroup>

        <FormGroup>
          <label>¿Cuántas faltas ocurrieron?</label>
          <input
            type="number"
            className="form-control"
            min="1"
            max="10"
            value={incidentCount}
            onChange={handleIncidentCountChange}
          />
        </FormGroup>

        {incidentDetails.map((incident, index) => (
          <div key={index} className="border p-2 my-2">
            <h5>Incidente {index + 1}</h5>
            <FormGroup>
              <label>Equipo</label>
              <select className="form-control" value={incident.team} onChange={(e) => handleIncidentDetailChange(index, "team", e.target.value)}>
                <option value="">Seleccionar</option>
                <option value="Local">Local</option>
                <option value="Visitante">Visitante</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Minuto</label>
              <input type="number" className="form-control" value={incident.minute} onChange={(e) => handleIncidentDetailChange(index, "minute", e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>Tipo de Incidente</label>
              <select className="form-control" value={incident.type} onChange={(e) => handleIncidentDetailChange(index, "type", e.target.value)}>
                <option value="">Seleccionar</option>
                <option value="Falta">Falta</option>
                <option value="Balonmano">Balonmano</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Tarjeta</label>
              <select className="form-control" value={incident.card} onChange={(e) => handleIncidentDetailChange(index, "card", e.target.value)}>
                <option value="">Ninguna</option>
                <option value="Amarilla">Amarilla</option>
                <option value="Roja">Roja</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Descripción</label>
              <textarea className="form-control" value={incident.description} onChange={(e) => handleIncidentDetailChange(index, "description", e.target.value)} />
            </FormGroup>
          </div>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={handleSave}>Guardar</Button>
        <Button color="danger" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default IncidentForm;