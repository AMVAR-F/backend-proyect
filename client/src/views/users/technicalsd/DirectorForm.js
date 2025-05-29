import React, { useState, useEffect } from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const TechnicalDirectorForm = ({ form, onChange, onFileChange, mode, selectedTechnicalDirector, errors = {} }) => {
  const [previewImage, setPreviewImage] = useState(null)
  const [fileError, setFileError] = useState(null)

  // Efecto para manejar la previsualización de la imagen
  useEffect(() => {
    const handleImagePreview = () => {
      if (!selectedTechnicalDirector) return

      // Si ya hay una imagen en formato base64 o URL
      if (selectedTechnicalDirector.photo && typeof selectedTechnicalDirector.photo === 'string') {
        setPreviewImage(selectedTechnicalDirector.photo)
      }
      // Si es un nuevo archivo seleccionado
      else if (form.photo instanceof File) {
        const reader = new FileReader()
        reader.onload = () => setPreviewImage(reader.result)
        reader.onerror = () => setFileError('Error al cargar la imagen')
        reader.readAsDataURL(form.photo)
      }
      // Si no hay imagen
      else {
        setPreviewImage(null)
      }
    }

    handleImagePreview()
  }, [selectedTechnicalDirector, form.photo])

  // Manejar cambio de archivo con validaciones
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFileError(null)

    if (!file) {
      onFileChange({ target: { name: 'photo', value: null } })
      return
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      setFileError('El tamaño máximo permitido es 5MB')
      return
    }

    // Validar tipo de archivo
    if (!file.type.match('image.*')) {
      setFileError('Solo se permiten imágenes (JPEG, PNG, etc.)')
      return
    }

    // Crear previsualización y actualizar estado
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreviewImage(event.target.result)
      onFileChange({
        target: {
          name: 'photo',
          files: [file],
          value: file,
        },
      })
    }
    reader.readAsDataURL(file)
  }

  // Manejar cambio de género
  const handleGenderChange = (e) => {
    onChange({
      target: {
        name: 'gen',
        value: e.target.value,
      },
    })
  }

  return (
    <div className="TechnicalDirector-form">
      {/* Sección de imagen */}
      <div className="text-center mb-4">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Foto del Director Técnico"
            className="img-thumbnail rounded-circle"
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div className="d-flex flex-column align-items-center">
            <FontAwesomeIcon icon={faUserCircle} className="text-secondary" size="6x" />
            <small className="text-muted mt-2">Sin foto</small>
          </div>
        )}

        <FormGroup className="mt-3">
          <Input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className={fileError ? 'is-invalid' : ''}
          />
          {fileError && <FormFeedback className="d-block">{fileError}</FormFeedback>}
          <small className="form-text text-muted">
            Formatos aceptados: JPG, PNG. Tamaño máximo: 5MB
          </small>
        </FormGroup>
      </div>

      {/* Información básica */}
      <FormGroup>
        <Label for="id_card">DNI *</Label>
        <Input
          type="text"
          id="id_card"
          name="id_card"
          placeholder="Ingrese DNI"
          required
          pattern="[0-9]{8}"
          maxLength="8"
          value={form.id_card || ''}
          onChange={onChange}
          invalid={!!errors.id_card}
        />
        {errors.id_card && <FormFeedback>{errors.id_card}</FormFeedback>}
        <small className="form-text text-muted">8 dígitos sin espacios ni guiones</small>
      </FormGroup>

      <FormGroup>
        <Label for="firstname">Nombres *</Label>
        <Input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Nombres completos"
          required
          value={form.firstname || ''}
          onChange={onChange}
          invalid={!!errors.firstname}
        />
        {errors.firstname && <FormFeedback>{errors.firstname}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Label for="lastname">Apellidos *</Label>
        <Input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Apellidos completos"
          required
          value={form.lastname || ''}
          onChange={onChange}
          invalid={!!errors.lastname}
        />
        {errors.lastname && <FormFeedback>{errors.lastname}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Label for="date_of_birth">Fecha de Nacimiento *</Label>
        <Input
          type="date"
          id="date_of_birth"
          name="date_of_birth"
          required
          value={form.date_of_birth || ''}
          onChange={onChange}
          invalid={!!errors.date_of_birth}
        />
        {errors.date_of_birth && <FormFeedback>{errors.date_of_birth}</FormFeedback>}
      </FormGroup>

      <FormGroup tag="fieldset">
        <Label>Género *</Label>
        <div className="d-flex">
          <FormGroup check className="mr-3">
            <Label check>
              <Input
                type="radio"
                name="gen"
                value="M"
                checked={form.gen === 'M'}
                onChange={handleGenderChange}
                invalid={!!errors.gen}
              />{' '}
              Masculino
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="gen"
                value="F"
                checked={form.gen === 'F'}
                onChange={handleGenderChange}
                invalid={!!errors.gen}
              />{' '}
              Femenino
            </Label>
          </FormGroup>
        </div>
        {errors.gen && <small className="text-danger">{errors.gen}</small>}
      </FormGroup>
    </div>
  )
}

export default TechnicalDirectorForm
