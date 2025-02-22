import React, { useState } from "react";
import { incidentData } from "./data";
import IncidentList from "./components/IncidentList";
import IncidentForm from "./components/IncidentForm";
import IncidentView from "./components/IncidentView";
import IncidentDelete from "./components/IncidentDelete";

const App = () => {
  const [incidents, setIncidents] = useState(incidentData);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [modalType, setModalType] = useState(null);

  // Abrir modal de vista, edición o eliminación
  const openModal = (type, incident = null) => {
    setSelectedIncident(incident);
    setModalType(type);
  };

  // Cerrar cualquier modal
  const closeModal = () => {
    setModalType(null);
    setSelectedIncident(null);
  };

  // Guardar un nuevo incidente o actualizar uno existente
  const saveIncident = (incident) => {
    if (incident.id) {
      // Editar incidente existente
      setIncidents(incidents.map((item) => (item.id === incident.id ? incident : item)));
    } else {
      // Agregar nuevo incidente
      const newIncident = { ...incident, id: incidents.length + 1 };
      setIncidents([...incidents, newIncident]);
    }
    closeModal();
  };

  // Eliminar incidente
  const deleteIncident = () => {
    setIncidents(incidents.filter((item) => item.id !== selectedIncident.id));
    closeModal();
  };

  return (
    <div className="App">
      <IncidentList
        incidents={incidents}
        onEdit={(incident) => openModal("edit", incident)}
        onDelete={(incident) => openModal("delete", incident)}
        onView={(incident) => openModal("view", incident)}
      />

      {modalType === "edit" && (
        <IncidentForm
          isOpen={true}
          toggle={closeModal}
          onSave={saveIncident}
          incident={selectedIncident}
        />
      )}

      {modalType === "view" && (
        <IncidentView
          isOpen={true}
          toggle={closeModal}
          incident={selectedIncident}
        />
      )}

      {modalType === "delete" && (
        <IncidentDelete
          isOpen={true}
          toggle={closeModal}
          onDelete={deleteIncident}
          incident={selectedIncident}
        />
      )}
    </div>
  );
};

export default App;
