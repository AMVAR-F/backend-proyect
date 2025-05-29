import React, { useState, useEffect } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

const RefereeForm = ({ form, onChange, onFileChange, mode, selectedReferee }) => {
  const [previewImage, setPreviewImage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      // Manejo seguro de la imagen
      if (selectedReferee?.photo) {
        if (typeof selectedReferee.photo === 'string') {
          setPreviewImage(selectedReferee.photo)
        } else if (selectedReferee.photo instanceof File) {
          const reader = new FileReader()
          reader.onload = () => setPreviewImage(reader.result)
          reader.onerror = () => setError('Error al cargar la imagen')
          reader.readAsDataURL(selectedReferee.photo)
        }
      }
    } catch (err) {
      console.error('Error en RefereeForm useEffect:', err)
      setError('Error al cargar los datos del árbitro')
    }
  }, [selectedReferee])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        setError('El tamaño máximo permitido es 5MB')
        return
      }

      // Validar tipo de archivo
      if (!file.type.match('image.*')) {
        setError('Solo se permiten imágenes')
        return
      }

      // Crear previsualización
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target.result)
        onFileChange({
          target: {
            name: 'photo',
            files: [file],
          },
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenderChange = (event) => {
    onChange({
      target: {
        name: 'gen',
        value: event.target.value,
      },
    })
  }
  const handleDateChange = (e) => {
    onChange({
      target: {
        name: 'date_of_birth',
        value: e.target.value,
      },
    })
  }
  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
        <button className="btn btn-sm btn-link" onClick={() => setError(null)}>
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <>
      {previewImage && (
        <div className="text-center mb-3">
          <img
            src={previewImage}
            alt="Preview"
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </div>
      )}

      <FormGroup>
        <Label>DNI</Label>
        <Input
          type="text"
          name="id_card"
          placeholder="Ingrese DNI"
          required
          pattern="\d{8}"
          maxLength="8"
          title="El DNI debe tener 8 dígitos"
          value={form.id_card || ''}
          onChange={onChange}
          autoComplete="off"
        />
      </FormGroup>

      <FormGroup>
        <Label for="firstname">Nombre</Label>
        <Input
          type="text"
          id="firstname"
          name="firstname"
          required
          value={form.firstname || ''}
          onChange={onChange}
          autoComplete="given-name"
        />
      </FormGroup>

      <FormGroup>
        <Label for="lastname">Apellido</Label>
        <Input
          type="text"
          id="lastname"
          name="lastname"
          required
          value={form.lastname || ''}
          onChange={onChange}
          autoComplete="family-name"
        />
      </FormGroup>

      <FormGroup>
        <Label for="date_of_birth">Fecha de Nacimiento</Label>
        <Input
          type="date"
          id="date_of_birth"
          name="date_of_birth"
          required
          value={form.date_of_birth || ''}
          onChange={handleDateChange}
          min="1900-01-01"
          autoComplete="bday"
        />
      </FormGroup>

      <FormGroup>
        <Label>Género</Label>
        <div>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="gen"
                value="F"
                checked={form.gen === 'F'}
                onChange={handleGenderChange}
              />{' '}
              Femenino (F)
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="gen"
                value="M"
                checked={form.gen === 'M'}
                onChange={handleGenderChange}
              />{' '}
              Masculino (M)
            </Label>
          </FormGroup>
        </div>
      </FormGroup>

      <FormGroup>
        <Label for="photo">Subir Imagen</Label>
        <Input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} />
      </FormGroup>
    </>
  )
}

export default RefereeForm
