import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import DirectorForm from './DirectorForm'

const TechnicalDirectorModal = ({
  isOpen,
  toggle,
  mode,
  form,
  onChange,
  onFileChange,
  onSave,
  onDelete,
  selectedTechnicalDirector,
}) => {
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  // Función para traducir el género
  const translateGender = (gen) => {
    switch (gen) {
      case 'M':
        return 'Masculino'
      case 'F':
        return 'Femenino'
      default:
        return 'N/A'
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} size={mode === 'view' ? 'lg' : ''}>
      <ModalHeader toggle={toggle}>
        {mode === 'insert'
          ? 'Nuevo Delegado'
          : mode === 'edit'
            ? 'Editar Delegado'
            : mode === 'delete'
              ? 'Confirmar Desactivación'
              : 'Detalles del Delegado'}
      </ModalHeader>

      <ModalBody>
        {mode === 'insert' || mode === 'edit' ? (
          <DirectorForm
            form={form}
            onChange={onChange}
            onFileChange={onFileChange}
            mode={mode}
            selectedTechnicalDirector={selectedTechnicalDirector}
          />
        ) : mode === 'delete' ? (
          <p>
            ¿Seguro de desactivar al delegado:{' '}
            <b>
              {selectedTechnicalDirector?.firstname} {selectedTechnicalDirector?.lastname}
            </b>
            ?
          </p>
        ) : mode === 'view' && selectedTechnicalDirector ? (
          <div className="TechnicalDirector-details">
            <div className="row">
              <div className="col-md-4 text-center">
                {selectedTechnicalDirector.photo ? (
                  <img
                    src={
                      selectedTechnicalDirector.photo.startsWith('data:') ||
                      selectedTechnicalDirector.photo.startsWith('http')
                        ? selectedTechnicalDirector.photo
                        : `http://localhost:4001${selectedTechnicalDirector.photo}`
                    }
                    alt="Foto del delegado"
                    className="img-thumbnail mb-3"
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="no-photo mb-3">
                    <i className="fas fa-user-circle fa-5x text-secondary"></i>
                    <p className="text-muted">Sin foto</p>
                  </div>
                )}
              </div>

              <div className="col-md-8">
                <div className="detail-item">
                  <h5>Información Personal</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>DNI:</strong> {selectedTechnicalDirector.id_card || 'N/A'}
                      </p>
                      <p>
                        <strong>Nombre:</strong> {selectedTechnicalDirector.firstname || 'N/A'}
                      </p>
                      <p>
                        <strong>Apellido:</strong> {selectedTechnicalDirector.lastname || 'N/A'}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Fecha de Nacimiento:</strong>{' '}
                        {formatDate(selectedTechnicalDirector.date_of_birth)}
                      </p>
                      <p>
                        <strong>Género:</strong> {translateGender(selectedTechnicalDirector.gen)}
                      </p>
                      <p>
                        <strong>Estado:</strong>
                        <span
                          className={`badge ${selectedTechnicalDirector.status ? 'bg-success' : 'bg-danger'}`}
                        >
                          {selectedTechnicalDirector.status ? 'Activo' : 'Inactivo'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </ModalBody>

      <ModalFooter>
        {mode === 'insert' || mode === 'edit' ? (
          <>
            <Button color="primary" onClick={onSave}>
              {mode === 'insert' ? 'Guardar' : 'Actualizar'}
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancelar
            </Button>
          </>
        ) : mode === 'delete' ? (
          <>
            <Button color="danger" onClick={() => onDelete(selectedTechnicalDirector)}>
              Desactivar
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancelar
            </Button>
          </>
        ) : (
          <Button color="secondary" onClick={toggle}>
            Cerrar
          </Button>
        )}
      </ModalFooter>
    </Modal>
  )
}

export default TechnicalDirectorModal
