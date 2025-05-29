import React, { Component } from 'react'
import { Container, Button, Input } from 'reactstrap'
import { CPagination, CPaginationItem } from '@coreui/react'
import RefereeTable from './RefereeTable.js'
import RefereeModal from './RefereeModal.js'
import InactiveRefereeTable from './InactiveRefereeTable.js'
import {
  fetchReferees,
  createReferee,
  updateReferee,
  deactivateReferee,
  getRefereeById,
  activateReferee,
} from '../../services/referee.service.js'

class Referees extends Component {
  state = {
    data: [],
    modalInsert: false,
    modalUpdate: false,
    modalDelete: false,
    modalView: false,
    selectedReferee: null,
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

  loadReferees = async () => {
    try {
      const response = await fetchReferees()
      this.setState({ data: response })
    } catch (error) {
      console.error('Error fetching referees:', error)
    }
  }

  loadInactiveReferees = async () => {
    try {
      const response = await fetchReferees(true)
      this.setState({ inactiveData: response })
    } catch (error) {
      console.error('Error fetching inactive referees:', error)
      this.setState({ inactiveData: [] })
    }
  }

  componentDidMount() {
    this.loadReferees()
  }
  insertReferee = async () => {
    try {
      const { form } = this.state

      // Preparar datos para enviar
      const refereeData = {
        firstname: form.firstname,
        lastname: form.lastname,
        id_card: form.id_card,
        gen: form.gen || 'M', // Valor por defecto
        date_of_birth: form.date_of_birth,
        photo: form.photo,
      }

      console.log('Datos a enviar:', refereeData) // Para depuración

      const response = await createReferee(refereeData)

      // Actualizar el estado
      this.setState((prevState) => ({
        data: [...prevState.data, response.referee],
        modalInsert: false,
        form: this.resetForm(),
      }))

    } catch (error) {
      console.error('Error al crear árbitro:', error)
      alert(`Error: ${error.message}`)
    }
  }

  onSave = async () => {
    const { form, selectedReferee, mode } = this.state

    try {
      const updateData = {
        firstname: form.firstname,
        lastname: form.lastname,
        id_card: form.id_card,
        date_of_birth: form.date_of_birth,
        gen: form.gen,
        photo: form.photo,
      }

      // Verificar datos antes de enviar
      console.log('Datos a enviar:', updateData)

      const response = await (mode === 'insert'
        ? createReferee(updateData)
        : updateReferee(selectedReferee.id_referee, updateData))

      // Actualizar el estado de manera completa
      this.setState((prevState) => {
        const updatedReferee = {
          ...(mode === 'insert' ? {} : selectedReferee),
          ...response.referee,
          date_of_birth: form.date_of_birth || response.referee.date_of_birth,
          gen: form.gen || response.referee.gen,
        }

        return {
          data:
            mode === 'insert'
              ? [...prevState.data, updatedReferee]
              : prevState.data.map((item) =>
                  item.id_referee === selectedReferee.id_referee ? updatedReferee : item,
                ),
          inactiveData:
            mode === 'insert'
              ? prevState.inactiveData
              : prevState.inactiveData.map((item) =>
                  item.id_referee === selectedReferee.id_referee ? updatedReferee : item,
                ),
          selectedReferee: updatedReferee,
          modalInsert: false,
          modalUpdate: false,
          form: this.resetForm(),
        }
      })

      alert(mode === 'insert' ? 'Árbitro creado' : 'Cambios guardados')
    } catch (error) {
      console.error('Error al guardar:', error)
      alert(`Error: ${error.message}`)
    }
  }

  deleteReferee = async (referee) => {
    try {
      if (!referee || !referee.id_referee) {
        throw new Error('Árbitro no tiene ID válido')
      }

      await deactivateReferee(referee.id_referee)

      this.setState((prevState) => ({
        data: prevState.data.filter((r) => r.id_referee !== referee.id_referee),
        inactiveData: [...prevState.inactiveData, { ...referee, status: false }],
        modalDelete: false,
      }))
    } catch (error) {
      console.error('Error al desactivar árbitro:', error)
      alert(`Error: ${error.message}`)
    }
  }

  activateReferee = async (referee) => {
    try {
      if (!referee || !referee.id_referee) {
        throw new Error('Árbitro no tiene ID válido')
      }

      await activateReferee(referee.id_referee)

      this.setState((prevState) => ({
        inactiveData: prevState.inactiveData.filter((r) => r.id_referee !== referee.id_referee),
        data: [...prevState.data, { ...referee, status: true }],
      }))
    } catch (error) {
      console.error('Error al activar árbitro:', error)
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

  closeModalInsert = () => {
    this.setState({ modalInsert: false })
  }

  viewModalEdit = async (referee) => {
    try {
      const fullRefereeData = await getRefereeById(referee.id_referee)

      // Formatear fecha para el input (YYYY-MM-DD)
      const formattedDate = fullRefereeData.date_of_birth
        ? new Date(fullRefereeData.date_of_birth).toISOString().split('T')[0]
        : ''

      this.setState({
        modalUpdate: true,
        mode: 'edit',
        selectedReferee: {
          ...fullRefereeData,
          // Mantener la referencia original para la vista
          originalData: fullRefereeData,
        },
        form: {
          firstname: fullRefereeData.firstname || '',
          lastname: fullRefereeData.lastname || '',
          id_card: fullRefereeData.id_card || '',
          gen: fullRefereeData.gen || '',
          date_of_birth: formattedDate,
          photo: fullRefereeData.photo || null,
        },
      })
    } catch (error) {
      console.error('Error al preparar la edición:', error)
      alert('Error al cargar los datos del árbitro para edición')
    }
  }

  closeModalEdit = () => {
    this.setState({
      modalUpdate: false,
      selectedReferee: null,
      form: this.resetForm(),
    })
  }

  viewModalDelete = (referee) => {
    this.setState({ modalDelete: true, selectedReferee: referee })
  }

  closeModalDelete = () => {
    this.setState({ modalDelete: false, selectedReferee: null })
  }

  viewModalView = (referee) => {
    this.setState({ modalView: true, selectedReferee: referee })
  }

  closeModalView = () => {
    this.setState({ modalView: false, selectedReferee: null })
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value, currentPage: 1 })
  }

  getFilteredData = () => {
    const { data, searchTerm } = this.state
    return data.filter((referee) => {
      const idCard = referee.id_card || ''
      const firstName = referee.firstname || ''
      const lastName = referee.lastname || ''

      const matchesIdCard = idCard.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesName =
        firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lastName.toLowerCase().includes(searchTerm.toLowerCase())

      return (matchesIdCard || matchesName) && referee.status === true
    })
  }

  getCurrentPageData = () => {
    const { currentPage, itemsPerPage } = this.state
    const filteredData = this.getFilteredData()
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }

  toggleInactiveView = () => {
    this.setState(
      (prevState) => ({ showInactive: !prevState.showInactive }),
      () => {
        if (this.state.showInactive) {
          this.loadInactiveReferees()
        } else {
          this.loadReferees()
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
      selectedReferee,
      form,
      currentPage,
      itemsPerPage,
      searchTerm,
      showInactive,
      inactiveData,
    } = this.state

    const currentData = showInactive ? inactiveData : this.getCurrentPageData()

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
                Ver árbitros activos
              </>
            ) : (
              <>
                <i className="fas fa-user-slash mr-2"></i>
                Ver árbitros inactivos
              </>
            )}
          </Button>

          {!showInactive && (
            <Button color="primary" onClick={this.viewModalInsert}>
              <i className="fas fa-user-plus mr-2"></i>
              Registrar árbitro
            </Button>
          )}
        </div>

        {!showInactive && (
          <>
            <Input
              type="text"
              placeholder="Buscar por Nombre o CI"
              value={searchTerm}
              onChange={this.handleSearchChange}
              className="mb-3"
            />
          </>
        )}

        {showInactive ? (
          <div className="inactive-view">
            <h3>
              <i className="fas fa-user-slash mr-2"></i>
              Árbitros Inactivos
            </h3>
            <InactiveRefereeTable
              data={inactiveData}
              onView={this.viewModalView}
              onActivate={this.activateReferee}
            />
          </div>
        ) : (
          <RefereeTable
            data={currentData}
            onEdit={this.viewModalEdit}
            onDelete={this.viewModalDelete}
            onView={this.viewModalView}
          />
        )}

        {!showInactive && (
          <CPagination aria-label="Page navigation example" className="mt-3">
            <CPaginationItem
              aria-label="Previous"
              disabled={currentPage === 1}
              onClick={() => this.setState({ currentPage: currentPage - 1 })}
            >
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>

            {Array.from(
              { length: Math.ceil(this.state.data.length / itemsPerPage) },
              (_, index) => (
                <CPaginationItem
                  key={index + 1}
                  active={currentPage === index + 1}
                  onClick={() => this.setState({ currentPage: index + 1 })}
                >
                  {index + 1}
                </CPaginationItem>
              ),
            )}

            <CPaginationItem
              aria-label="Next"
              disabled={currentPage === Math.ceil(this.state.data.length / itemsPerPage)}
              onClick={() => this.setState({ currentPage: currentPage + 1 })}
            >
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        )}

        <RefereeModal
          isOpen={modalInsert}
          toggle={this.closeModalInsert}
          mode="insert"
          form={form}
          onChange={this.handleChange}
          onFileChange={this.handleFileChange}
          onSave={this.onSave}
        />

        <RefereeModal
          isOpen={modalUpdate}
          toggle={this.closeModalEdit}
          mode="edit"
          form={form}
          onChange={this.handleChange}
          onFileChange={this.handleFileChange}
          onSave={this.onSave}
        />

        <RefereeModal
          isOpen={modalDelete}
          toggle={this.closeModalDelete}
          mode="delete"
          selectedReferee={selectedReferee}
          onDelete={this.deleteReferee}
        />

        <RefereeModal
          isOpen={modalView}
          toggle={this.closeModalView}
          mode="view"
          selectedReferee={selectedReferee}
        />
      </Container>
    )
  }
}

export default Referees
