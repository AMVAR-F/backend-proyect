import React, { Component } from 'react'
import { Container, Button, Input } from 'reactstrap'
import { CPagination, CPaginationItem } from '@coreui/react'
import TreasurerTable from './TreasurerTable'
import TreasurerModal from './TreasurerModal'
import InactiveTreasurerTable from './InactiveTreasurerTable'
import {
  fetchTreasurers,
  createTreasurer,
  updateTreasurer,
  deactivateTreasurer,
  activateTreasurer,
  getTreasurerById,
} from '../../services/treasurer.services.js'

class Treasurers extends Component {
  state = {
    data: [],
    modalInsert: false,
    modalUpdate: false,
    modalDelete: false,
    modalView: false,
    selectedTreasurer: null,
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

  loadTreasurers = async () => {
    try {
      const response = await fetchTreasurers()
      this.setState({ data: response })
    } catch (error) {
      console.error('Error fetching treasurers:', error)
    }
  }

  loadInactiveTreasurers = async () => {
    try {
      const response = await fetchTreasurers(true)
      this.setState({ inactiveData: response })
    } catch (error) {
      console.error('Error fetching inactive treasurers:', error)
    }
  }

  componentDidMount() {
    this.loadTreasurers()
  }

  insertTreasurer = async () => {
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

      const response = await createTreasurer(formData)

      this.setState((prevState) => ({
        data: [...prevState.data, response.treasurer],
        modalInsert: false,
        form: this.resetForm(),
      }))
    } catch (error) {
      console.error('Error al crear delegado:', error)
      alert(`Error al crear delegado: ${error.message}`)
    }
  }

 // En el método updateTreasurer, asegurar que todos los campos se envían
updateTreasurer = async () => {
  try {
    const { form, selectedTreasurer } = this.state;
    if (!selectedTreasurer || !selectedTreasurer.id_treasurer) {
      throw new Error('Delegado seleccionado no tiene ID válido');
    }

    const formData = new FormData();
    
    // Asegurar que todos los campos se incluyan
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== undefined) {
        if (key === 'photo' && form[key] instanceof File) {
          formData.append(key, form[key]);
        } else if (key !== 'photo') {
          formData.append(key, form[key]);
        }
      }
    });

    const updatedTreasurer = await updateTreasurer(
      selectedTreasurer.id_treasurer, 
      formData
    );

    this.setState((prevState) => ({
      data: prevState.data.map((t) =>
        t.id_treasurer === selectedTreasurer.id_treasurer ? updatedTreasurer : t
      ),
      selectedTreasurer: updatedTreasurer,
      form: {
        firstname: updatedTreasurer.firstname || '',
        lastname: updatedTreasurer.lastname || '',
        id_card: updatedTreasurer.id_card || '',
        gen: updatedTreasurer.gen || '',
        date_of_birth: updatedTreasurer.date_of_birth
          ? new Date(updatedTreasurer.date_of_birth).toISOString().split('T')[0]
          : '',
        photo: updatedTreasurer.photo || null,
      },
      modalUpdate: false,
    }));
  } catch (error) {
    console.error('Error al actualizar delegado:', error);
    alert(`Error: ${error.message}`);
  }
};

  deleteTreasurer = async (treasurer) => {
    try {
      if (!treasurer || !treasurer.id_treasurer) {
        throw new Error('Delegado no tiene ID válido')
      }

      await deactivateTreasurer(treasurer.id_treasurer)

      this.setState((prevState) => ({
        data: prevState.data.filter((t) => t.id_treasurer !== treasurer.id_treasurer),
        inactiveData: [...prevState.inactiveData, { ...treasurer, status: false }],
        modalDelete: false,
      }))

      alert('Delegado desactivado correctamente')
    } catch (error) {
      console.error('Error al desactivar delegado:', error)
      alert(`Error: ${error.message}`)
    }
  }

  activateTreasurer = async (treasurer) => {
    try {
      if (!treasurer || !treasurer.id_treasurer) {
        throw new Error('Delegado no tiene ID válido')
      }

      await activateTreasurer(treasurer.id_treasurer)

      this.setState((prevState) => ({
        inactiveData: prevState.inactiveData.filter(
          (t) => t.id_treasurer !== treasurer.id_treasurer,
        ),
        data: [...prevState.data, { ...treasurer, status: true }],
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

  viewModalEdit = async (treasurer) => {
    try {
      const fullTreasurerData = await getTreasurerById(treasurer.id_treasurer)

      this.setState({
        modalUpdate: true,
        mode: 'edit',
        selectedTreasurer: fullTreasurerData,
        form: {
          firstname: fullTreasurerData.firstname || '',
          lastname: fullTreasurerData.lastname || '',
          id_card: fullTreasurerData.id_card || '',
          gen: fullTreasurerData.gen || '',
          date_of_birth: fullTreasurerData.date_of_birth
            ? new Date(fullTreasurerData.date_of_birth).toISOString().split('T')[0]
            : '',
          photo: fullTreasurerData.photo || null,
        },
      })
    } catch (error) {
      console.error('Error al preparar la edición:', error)
      alert('Error al cargar los datos del delegado para edición')
    }
  }

  viewModalDelete = (treasurer) => {
    this.setState({
      modalDelete: true,
      selectedTreasurer: treasurer,
    })
  }

  viewModalView = (treasurer) => {
    this.setState({
      modalView: true,
      selectedTreasurer: treasurer,
    })
  }

  toggleInactiveView = () => {
    this.setState(
      (prevState) => ({ showInactive: !prevState.showInactive }),
      () => {
        if (this.state.showInactive) {
          this.loadInactiveTreasurers()
        } else {
          this.loadTreasurers()
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
      selectedTreasurer,
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
                Ver delegados activos
              </>
            ) : (
              <>
                <i className="fas fa-user-slash mr-2"></i>
                Ver delegados inactivos
              </>
            )}
          </Button>
          {!showInactive && (
            <Button color="primary" onClick={this.viewModalInsert}>
              <i className="fas fa-user-plus mr-2"></i>
              Registrar nuevo delegado
            </Button>
          )}
        </div>

        {showInactive ? (
          <div className="inactive-view">
            <h3>
              <i className="fas fa-user-slash mr-2"></i>
              Delegados Inactivos
            </h3>
            <InactiveTreasurerTable
              data={inactiveData}
              onView={this.viewModalView}
              onActivate={this.activateTreasurer}
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
            <TreasurerTable
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

        <TreasurerModal
          isOpen={modalInsert}
          toggle={() => this.setState({ modalInsert: false })}
          mode="insert"
          form={form}
          onChange={this.handleChange}
          onFileChange={this.handleFileChange}
          onSave={this.insertTreasurer}
        />

        <TreasurerModal
          isOpen={modalUpdate}
          toggle={() => this.setState({ modalUpdate: false })}
          mode="edit"
          form={form}
          onChange={this.handleChange}
          onFileChange={this.handleFileChange}
          onSave={this.updateTreasurer}
        />

        <TreasurerModal
          isOpen={modalDelete}
          toggle={() => this.setState({ modalDelete: false })}
          mode="delete"
          selectedTreasurer={selectedTreasurer}
          onDelete={this.deleteTreasurer}
        />

        <TreasurerModal
          isOpen={modalView}
          toggle={() => this.setState({ modalView: false })}
          mode="view"
          selectedTreasurer={selectedTreasurer}
        />
      </Container>
    )
  }
}

export default Treasurers
