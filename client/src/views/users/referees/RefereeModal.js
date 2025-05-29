import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap'
import RefereeForm from './RefereeForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons'

const getPhotoUrl = (photo) => {
  if (!photo) return null

  // Si es una cadena (base64 o URL)
  if (typeof photo === 'string') {
    if (photo.startsWith('data:') || photo.startsWith('http')) {
      return photo
    }
    return `http://localhost:4001${photo.startsWith('/') ? photo : `/${photo}`}`
  }

  // Si es un objeto File (desde el frontend)
  if (photo instanceof File) {
    return URL.createObjectURL(photo)
  }

  // Si es un buffer (desde el backend)
  if (photo.type === 'Buffer' && photo.data) {
    try {
      const base64String = btoa(String.fromCharCode(...new Uint8Array(photo.data)))
      return `data:image/jpeg;base64,${base64String}`
    } catch (error) {
      console.error('Error converting buffer to base64:', error)
      return null
    }
  }

  return null
}
const formatDate = (dateString) => {
  if (!dateString) return 'No especificada';
  try {
    const date = new Date(dateString.includes('T') ? dateString : `${dateString}T00:00:00`);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};
const RefereeModal = ({
  isOpen,
  toggle,
  mode,
  form,
  onChange,
  onFileChange,
  onSave,
  onDelete,
  selectedReferee,
}) => {
  const [imageError, setImageError] = React.useState(false)
  const photoUrl = selectedReferee?.photo ? getPhotoUrl(selectedReferee.photo) : null

  // Limpiar URL creada con createObjectURL cuando el componente se desmonte
  React.useEffect(() => {
    return () => {
      if (selectedReferee?.photo && selectedReferee.photo instanceof File) {
        URL.revokeObjectURL(photoUrl)
      }
    }
  }, [selectedReferee, photoUrl])

  const handleImageError = () => {
    setImageError(true)
  }

  const renderPhoto = () => {
    // Si no hay foto o hubo error al cargarla
    if (!photoUrl || imageError) {
      return (
        <FontAwesomeIcon
          icon={faUserCircle}
          style={{
            fontSize: '150px',
            color: '#6c757d',
          }}
        />
      )
    }

    // Si hay foto válida
    return (
      <img
        src={photoUrl}
        alt="Árbitro"
        className="img-thumbnail"
        style={{
          width: '150px',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '50%',
        }}
        onError={handleImageError}
      />
    )
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {mode === 'insert'
          ? 'Nuevo Árbitro'
          : mode === 'edit'
            ? 'Editar Árbitro'
            : mode === 'delete'
              ? 'Confirmar Desactivación'
              : 'Detalles del Árbitro'}
      </ModalHeader>

      <ModalBody>
        {mode === 'insert' || mode === 'edit' ? (
          <RefereeForm
            form={form}
            onChange={onChange}
            onFileChange={onFileChange}
            mode={mode}
            selectedReferee={selectedReferee}
          />
        ) : mode === 'delete' ? (
          <p>
            ¿Seguro de desactivar al árbitro: <b>{selectedReferee && selectedReferee.firstname}</b>?
          </p>
        ) : mode === 'view' && selectedReferee ? (
          <>
            <Row className="mb-3">
              <div className="text-center">{renderPhoto()}</div>
            </Row>

            <p>
              <b>DNI:</b> {selectedReferee.id_card || 'N/A'}
            </p>

            <p>
              <b>Nombre:</b> {selectedReferee.firstname}
            </p>

            <p>
              <b>Apellido:</b> {selectedReferee.lastname}
            </p>

            <p>
              <b>Fecha de nacimiento:</b> {formatDate(selectedReferee.date_of_birth)}
            </p>

            <p>
              <b>Género:</b>{' '}
              {selectedReferee.gen === 'M'
                ? 'Masculino'
                : selectedReferee.gen === 'F'
                  ? 'Femenino'
                  : 'N/A'}
            </p>
          </>
        ) : null}
      </ModalBody>

      <ModalFooter>
        {mode === 'insert' || mode === 'edit' ? (
          <>
            <Button color="success" onClick={onSave}>
              {mode === 'insert' ? 'Insertar' : 'Guardar cambios'}
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancelar
            </Button>
          </>
        ) : mode === 'delete' ? (
          <>
            <Button color="danger" onClick={() => onDelete(selectedReferee)}>
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

export default RefereeModal
