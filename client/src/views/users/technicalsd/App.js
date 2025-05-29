import React, { Component } from 'react'
import { Container, Button, Input } from 'reactstrap'
import { CPagination, CPaginationItem } from '@coreui/react'
import TechnicalDirectorTable from './DirectorTable'
import TechnicalDirectorsModal from './DirectorModal'
import InactiveTechnicalDirectorsTable from './InactiveDirectorTable'
import {
  fetchTechnicalDirectors,
  createTechnicalDirectors,
  getTechnicalDirectorsById,
  updateTechnicalDirectors,
  deactivateTechnicalDirectors,
  activateTechnicalDirectors,
} from '../../services/technicalDirector.services.js'

class TechnicalDirectors extends Component {
  state = {
    data: [],
    modalInsert: false,
    modalUpdate: false,
    modalDelete: false,
    modalView: false,
    selectedTechnicalDirector: null,
    currentPage: 1,
    itemsPerPage: 10,
    searchTerm: '',
    form: {
      firstname: '',
      lastname: '',
      id_card: '',
      gen: '',
      date_of_birth: '',
      photo: null,
    },
    showInactive: false,
    inactiveData: [],
    mode: 'insert',
  }

  loadDirectors = async () => {
    try {
      const response = await fetchTechnicalDirectors()
      this.setState({ data: response })
    } catch (error) {
      console.error('Error fetching technical directors:', error)
    }
  }

  loadInactiveTechnicalDirectors = async () => {
    try {
      const response = await fetchTechnicalDirectors(true)
      this.setState({ inactiveData: response })
    } catch (error) {
      console.error('Error fetching inactive TechnicalDirectors:', error)
    }
  }

  componentDidMount() {
    this.loadDirectors()
  }

  insertDirector = async () => {
    try {
      const { form } = this.state
      const formData = new FormData()

      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== undefined && key !== 'photo') {
          formData.append(key, form[key])
        }
      })

      if (form.photo) {
        formData.append('photo', form.photo)
      }

      const response = await createTechnicalDirectors(formData)

      this.setState((prevState) => ({
        data: [...prevState.data, response.TechnicalDirector],
        modalInsert: false,
        form: this.resetForm(),
      }))
    } catch (error) {
      console.error('Error al crear director:', error)
    }
  }

  // En el método updateTechnicalDirector, asegurar que todos los campos se envían
  updateTechnicalDirectors = async () => {
    try {
      const { form, selectedTechnicalDirector } = this.state
      if (!selectedTechnicalDirector || !selectedTechnicalDirector.id_td) {
        throw new Error('Director tecnico seleccionado no tiene ID válido')
      }

      const formData = new FormData()

      // Asegurar que todos los campos se incluyan
      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== undefined) {
          if (key === 'photo' && form[key] instanceof File) {
            formData.append(key, form[key])
          } else if (key !== 'photo') {
            formData.append(key, form[key])
          }
        }
      })

      const updatedTechnicalDirectors = await updateTechnicalDirectors(
        selectedTechnicalDirector.id_td,
        formData,
      )

      this.setState((prevState) => ({
        data: prevState.data.map((t) =>
          t.id_td === selectedTechnicalDirector.id_ ? updatedTechnicalDirector : t.id_td,
        ),
        selectedTechnicalDirector: updatedTechnicalDirector,
        form: {
          firstname: updatedTechnicalDirectors.firstname || '',
          lastname: updatedTechnicalDirectors.lastname || '',
          id_card: updatedTechnicalDirectors.id_card || '',
          gen: updatedTechnicalDirectors.gen || '',
          date_of_birth: updatedTechnicalDirectors.date_of_birth
            ? new Date(updatedTechnicalDirectors.date_of_birth).toISOString().split('T')[0]
            : '',
          photo: updatedTechnicalDirectors.photo || null,
        },
        modalUpdate: false,
      }))
    } catch (error) {
      console.error('Error al actualizar director:', error)
      alert(`Error: ${error.message}`)
    }
  }

  deleteTechnicalDirectors = async (TechnicalDirectors) => {
    try {
      if (!TechnicalDirectors || !TechnicalDirectors.id_td) {
        throw new Error('Director no tiene ID válido')
      }

      await deactivateTechnicalDirectors(TechnicalDirectors.id_td)

      this.setState((prevState) => ({
        data: prevState.data.filter((t) => t.id_td !== TechnicalDirectors.id_td),
        inactiveData: [...prevState.inactiveData, { ...TechnicalDirectors, status: false }],
        modalDelete: false,
      }))

      alert('Delegado desactivado correctamente')
    } catch (error) {
      console.error('Error al desactivar delegado:', error)
      alert(`Error: ${error.message}`)
    }
  }

  activateTechnicalDirectors = async (TechnicalDirectors) => {
    try {
      if (!TechnicalDirectors || !TechnicalDirectors.id_td) {
        throw new Error('Director no tiene ID válido')
      }

      await activateTechnicalDirectors(TechnicalDirectors.id_td)

      this.setState((prevState) => ({
        inactiveData: prevState.inactiveData.filter((t) => t.id_td !== TechnicalDirectors.id_td),
        data: [...prevState.data, { ...TechnicalDirectors, status: true }],
      }))

      alert('Delegado activado correctamente')
    } catch (error) {
      console.error('Error al activar delegado:', error)
      alert(`Error: ${error.message}`)
    }
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'radio' ? value : type === 'checkbox' ? checked : value
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: newValue,
      },
    }))
  }

  handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('El tamaño máximo permitido es 5MB')
        return
      }
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          photo: file,
        },
      }))
    }
  }

  viewModalInsert = () => {
    this.setState({
      modalInsert: true,
      mode: 'insert',
      form: this.resetForm(),
    })
  }

  viewModalEdit = async (TechnicalDirectors) => {
    try {
      const fullTechnicalDirectorsData = await getTechnicalDirectorsById(TechnicalDirectors.id_td)

      this.setState({
        modalUpdate: true,
        mode: 'edit',
        selectedTechnicalDirector: fullTechnicalDirectorsData,
        form: {
          firstname: fullTechnicalDirectorsData.firstname || '',
          lastname: fullTechnicalDirectorsData.lastname || '',
          id_card: fullTechnicalDirectorsData.id_card || '',
          gen: fullTechnicalDirectorsData.gen || '',
          date_of_birth: fullTechnicalDirectorsData.date_of_birth
            ? new Date(fullTechnicalDirectorsData.date_of_birth).toISOString().split('T')[0]
            : '',
          photo: fullTechnicalDirectorsData.photo || null,
        },
      })
    } catch (error) {
      console.error('Error al preparar la edición:', error)
      alert('Error al cargar los datos del director para edición')
    }
  }

  viewModalDelete = (TechnicalDirectors) => {
    this.setState({
      modalDelete: true,
      selectedTechnicalDirector: TechnicalDirectors,
    })
  }

  viewModalView = (TechnicalDirectors) => {
    this.setState({
      modalView: true,
      selectedTechnicalDirector: TechnicalDirectors,
    })
  }

  toggleInactiveView = () => {
    this.setState(
      (prevState) => ({ showInactive: !prevState.showInactive }),
      () => {
        if (this.state.showInactive) {
          this.loadInactiveTechnicalDirectors()
        } else {
          this.loadDirectors()
        }
      },
    )
  }

  resetForm() {
    return {
      firstname: '',
      lastname: '',
      id_card: '',
      gen: '',
      date_of_birth: '',
      photo: null,
    }
  }

  render() {
    const {
      modalInsert,
      modalUpdate,
      modalDelete,
      modalView,
      selectedTechnicalDirector,
      form,
      currentPage,
      itemsPerPage,
      searchTerm,
      showInactive,
      inactiveData,
      data,
    } = this.state

    return (
      <Container>
        <br />
        <div className="d-flex justify-content-between mb-3">
          <Button
            color={showInactive ? 'primary' : 'secondary'}
            onClick={this.toggleInactiveView}
            className="mr-2"
          >
            {showInactive ? (
              <>
                <i className="fas fa-users mr-2"></i>
                Ver directores activos
              </>
            ) : (
              <>
                <i className="fas fa-user-slash mr-2"></i>
                Ver directores inactivos
              </>
            )}
          </Button>
          {!showInactive && (
            <Button color="primary" onClick={this.viewModalInsert}>
              <i className="fas fa-user-plus mr-2"></i>
              Registrar nuevo DT
            </Button>
          )}
        </div>

        {showInactive ? (
          <div className="inactive-view">
            <h3>
              <i className="fas fa-user-slash mr-2"></i>
              Directores inactivos
            </h3>
            <InactiveTechnicalDirectorsTable
              data={inactiveData}
              onView={this.viewModalView}
              onActivate={this.activateTechnicalDirectors}
            />
          </div>
        ) : (
          <>
            <Input
              type="text"
              placeholder="Buscar por Nombre o CI"
              value={searchTerm}
              onChange={(e) => this.setState({ searchTerm: e.target.value, currentPage: 1 })}
              className="mb-3"
            />
            <TechnicalDirectorTable
              data={data.filter(
                (t) =>
                  (t.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    t.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    t.id_card?.includes(searchTerm)) &&
                  t.status !== false,
              )}
              onEdit={this.viewModalEdit}
              onDelete={this.viewModalDelete}
              onView={this.viewModalView}
            />
          </>
        )}

        <TechnicalDirectorsModal
          isOpen={modalInsert}
          toggle={() => this.setState({ modalInsert: false })}
          mode="insert"
          form={form}
          onChange={this.handleChange}
          onFileChange={this.handleFileChange}
          onSave={this.insertDirector}
        />

        <TechnicalDirectorsModal
          isOpen={modalUpdate}
          toggle={() => this.setState({ modalUpdate: false })}
          mode="edit"
          form={form}
          onChange={this.handleChange}
          onFileChange={this.handleFileChange}
          onSave={this.updateTechnicalDirectors}
        />

        <TechnicalDirectorsModal
          isOpen={modalDelete}
          toggle={() => this.setState({ modalDelete: false })}
          mode="delete"
          selectedTechnicalDirector={selectedTechnicalDirector}
          onDelete={this.deleteTechnicalDirectors}
        />

        <TechnicalDirectorsModal
          isOpen={modalView}
          toggle={() => this.setState({ modalView: false })}
          mode="view"
          selectedTechnicalDirector={selectedTechnicalDirector}
        />
      </Container>
    )
  }
}

export default TechnicalDirectors
