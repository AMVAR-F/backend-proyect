import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
  faImage,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons'

// Configuración de timeout para Alert
const ALERT_TIMEOUT = {
  enter: 300,
  exit: 300,
}

const PlayerModal = ({
  isOpen,
  toggle,
  mode,
  form = {},
  onChange,
  onFileChange,
  onSave,
  onDelete,
  selectedPlayer = null,
  errors = {},
  isLoading = false,
  apiError = null,
}) => {
  const [imageError, setImageError] = useState(false)
  const [currentImageUrl, setCurrentImageUrl] = useState(null)

  useEffect(() => {
    const photo = mode === 'view' ? selectedPlayer?.photo : form.photo || selectedPlayer?.photo
    setCurrentImageUrl(getPhotoUrl(photo))
    setImageError(false)

    return () => {
      if (currentImageUrl && currentImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(currentImageUrl)
      }
    }
  }, [selectedPlayer, form.photo, mode])

  const getPhotoUrl = (photo) => {
    if (!photo) return null

    // Si es una URL base64
    if (typeof photo === 'string' && photo.startsWith('data:image')) {
      return photo
    }

    // Si ya es una URL completa
    if (typeof photo === 'string' && photo.startsWith('http')) {
      return photo
    }

    // Si es un File o Blob (nuevas imágenes subidas)
    if (photo instanceof File || photo instanceof Blob) {
      return URL.createObjectURL(photo)
    }

    // Si es un objeto Buffer del backend
    if (photo.type === 'Buffer' && photo.data) {
      try {
        const base64String = btoa(String.fromCharCode(...new Uint8Array(photo.data)))
        return `data:image/jpeg;base64,${base64String}`
      } catch (error) {
        console.error('Error converting buffer to base64:', error)
        return null
      }
    }

    // Si es una ruta relativa
    if (typeof photo === 'string') {
      return `http://localhost:4001${photo.startsWith('/') ? photo : `/${photo}`}`
    }
    return null
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const renderPlayerImage = () => {
    return (
      <div className="d-flex justify-content-center mb-4">
        <div className="position-relative" style={{ width: '150px', height: '150px' }}>
          {currentImageUrl && !imageError ? (
            <img
              src={currentImageUrl}
              alt={`Jugador ${selectedPlayer?.firstname || ''} ${selectedPlayer?.lastname || ''}`}
              className="img-fluid rounded-circle border border-4 border-primary"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
              onError={handleImageError}
            />
          ) : (
            <div
              className="d-flex flex-column align-items-center justify-content-center bg-light rounded-circle border border-4 border-secondary"
              style={{
                width: '100%',
                height: '100%',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <FontAwesomeIcon icon={faUserAlt} size="3x" className="text-secondary mb-2" />
              <span className="text-muted small">Sin foto</span>
            </div>
          )}

          {/* Badge de estado */}
          {selectedPlayer && (
            <span
              className={`position-absolute top-0 end-0 badge rounded-pill ${selectedPlayer.status ? 'bg-success' : 'bg-danger'}`}
              style={{ transform: 'translate(30%, -30%)' }}
            >
              {selectedPlayer.status ? 'Activo' : 'Inactivo'}
            </span>
          )}
        </div>
      </div>
    )
  }

  const renderFormField = (label, name, type = 'text', options = null) => (
    <div className="form-field mb-3">
      <label className="form-label">{label}</label>
      {type === 'select' ? (
        <select
          className={`form-select ${errors[name] ? 'is-invalid' : ''}`}
          name={name}
          value={form[name] || ''}
          onChange={onChange}
          disabled={isLoading}
        >
          {options}
        </select>
      ) : (
        <input
          type={type}
          className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
          name={name}
          value={form[name] || ''}
          onChange={onChange}
          disabled={isLoading}
        />
      )}
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  )

  const renderImageUploadButton = () => (
    <div className="mb-3">
      <label className="form-label">Imagen del jugador</label>
      <div className="input-group">
        <label className="form-control d-flex align-items-center justify-content-between">
          <span className="text-muted">
            {form.photo ? 'Imagen seleccionada' : 'Seleccionar imagen...'}
          </span>
          <FontAwesomeIcon icon={faImage} className="text-primary" />
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          disabled={isLoading}
          className="d-none"
          id="playerImageUpload"
        />
        <Button
          tag="label"
          htmlFor="playerImageUpload"
          color="secondary"
          className="form-control"
          style={{ maxWidth: '120px' }}
        >
          Examinar
        </Button>
      </div>
      <small className="form-text text-muted">
        Formatos aceptados: JPEG, PNG. Tamaño máximo: 5MB
      </small>
    </div>
  )

  const renderViewMode = () => {
    if (!selectedPlayer) {
      return (
        <Alert
          color="danger"
          className="api-error"
          transition={{ baseClass: '', timeout: ALERT_TIMEOUT }}
        >
          <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
          {apiError}
        </Alert>
      )
    }

    return (
      <Row>
        <Col md={4} className="player-image-container">
          {renderPlayerImage()}
        </Col>

        <Col md={8} className="player-details">
          <h3 className="player-name">
            {selectedPlayer.firstname || 'Nombre no disponible'} {selectedPlayer.lastname || ''}
          </h3>

          <div className="details-list">
            <div className="detail-item">
              <span className="detail-label">DNI:</span>
              <span className="detail-value">{selectedPlayer.id_card || 'N/A'}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Fecha Nacimiento:</span>
              <span className="detail-value">
                {selectedPlayer.date_of_birth
                  ? new Date(selectedPlayer.date_of_birth).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Género:</span>
              <span className="detail-value">
                {selectedPlayer.gen === 'M'
                  ? 'Masculino'
                  : selectedPlayer.gen === 'F'
                    ? 'Femenino'
                    : 'N/A'}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Posición:</span>
              <span className="detail-value">
                {selectedPlayer.type_position
                  ? selectedPlayer.type_position.charAt(0).toUpperCase() +
                    selectedPlayer.type_position.slice(1)
                  : 'N/A'}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">N° Camisa:</span>
              <span className="detail-value">{selectedPlayer.id_shirt || 'N/A'}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Estado:</span>
              <span
                className={`detail-value ${selectedPlayer.status ? 'text-success' : 'text-danger'}`}
              >
                {selectedPlayer.status ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
        </Col>
      </Row>
    )
  }

  const renderEditMode = () => (
    <div className="player-form-container">
      {apiError && (
        <Alert color="danger" className="api-error" timeout={ALERT_TIMEOUT}>
          <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
          {apiError}
        </Alert>
      )}

      <div className="image-upload-section">
        <div className="image-preview">{renderPlayerImage()}</div>
        {renderImageUploadButton()}
      </div>

      <Row>
        <Col md={6}>
          {renderFormField('DNI *', 'id_card', 'text')}
          {renderFormField('Nombre *', 'firstname', 'text')}
          {renderFormField('Apellido *', 'lastname', 'text')}
        </Col>
        <Col md={6}>
          {renderFormField('Fecha Nacimiento *', 'date_of_birth', 'date')}
          {renderFormField(
            'Género *',
            'gen',
            'select',
            <>
              <option value="">Seleccione</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </>,
          )}
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          {renderFormField(
            'Posición *',
            'type_position',
            'select',
            <>
              <option value="">Seleccione posición</option>
              <option value="portero">Portero</option>
              <option value="lateral">Lateral</option>
              <option value="defensa">Defensa</option>
              <option value="pivote">Pivote</option>
            </>,
          )}
        </Col>
        <Col md={6}>{renderFormField('N° Camisa *', 'id_shirt', 'number')}</Col>
      </Row>
    </div>
  )

  const renderDeleteMode = () => {
    if (!selectedPlayer) {
      return (
        <Alert color="danger" transition={{ baseClass: '', timeout: ALERT_TIMEOUT }}>
          No se encontraron datos del jugador
        </Alert>
      )
    }
    return (
      <div className="delete-confirmation">
        <div className="warning-icon">
          <FontAwesomeIcon icon={faExclamationTriangle} size="4x" />
        </div>
        <h4 className="confirmation-title">¿Confirmar desactivación?</h4>
        <p className="confirmation-message">
          El jugador{' '}
          <strong>
            {selectedPlayer.firstname || 'Nombre no disponible'} {selectedPlayer.lastname || ''}
          </strong>{' '}
          será desactivado.
        </p>
        <p className="confirmation-hint">
          Podrás reactivarlo luego desde la sección de jugadores inactivos.
        </p>
      </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      toggle={!isLoading ? toggle : undefined}
      backdrop={isLoading ? 'static' : true}
      size={mode === 'view' ? 'lg' : ''}
      className={`player-modal player-modal-${mode}`}
      centered
    >
      <ModalHeader
        toggle={!isLoading ? toggle : undefined}
        className={`modal-header modal-header-${mode}`}
      >
        {mode === 'insert' && 'Registrar Nuevo Jugador'}
        {mode === 'edit' && 'Editar Jugador'}
        {mode === 'view' && 'Detalles del Jugador'}
        {mode === 'delete' && 'Confirmar Desactivación'}
      </ModalHeader>

      <ModalBody className="modal-body">
        {mode === 'view' && renderViewMode()}
        {(mode === 'insert' || mode === 'edit') && renderEditMode()}
        {mode === 'delete' && renderDeleteMode()}
      </ModalBody>

      <ModalFooter className="modal-footer justify-content-between">
        {mode === 'view' ? (
          <Button color="secondary" onClick={toggle} className="close-button">
            Cerrar
          </Button>
        ) : mode === 'delete' ? (
          <>
            <Button
              color="secondary"
              onClick={toggle}
              disabled={isLoading}
              className="cancel-button"
            >
              Cancelar
            </Button>
            <Button
              color="danger"
              onClick={onDelete}
              disabled={isLoading || !selectedPlayer}
              className="confirm-button"
            >
              {isLoading ? (
                <Spinner size="sm" className="button-spinner" />
              ) : (
                'Confirmar Desactivación'
              )}
            </Button>
          </>
        ) : (
          <>
            <Button
              color="secondary"
              onClick={toggle}
              disabled={isLoading}
              className="cancel-button"
            >
              Cancelar
            </Button>
            <Button color="primary" onClick={onSave} disabled={isLoading} className="save-button">
              {isLoading ? (
                <>
                  <Spinner size="sm" className="button-spinner me-2" />
                  Procesando...
                </>
              ) : mode === 'insert' ? (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                  Registrar
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  )
}

export default PlayerModal
