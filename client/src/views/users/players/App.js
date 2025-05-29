import React, { Component } from 'react'
import { Container, Button, Input, Row, Col } from 'reactstrap'
import { CPagination, CPaginationItem } from '@coreui/react'
import PlayersTable from './PlayersTable'
import PlayerModal from './PlayersModal'
import InactivePlayersTable from './InactivePlayersTable'
import {
  fetchPlayers,
  createPlayer,
  updatePlayer,
  deactivatePlayer,
  getPlayer,
  activatePlayer,
} from '../../services/players.service.js'

class PlayersView extends Component {
  state = {
    players: [],
    inactivePlayers: [],
    modalInsert: false,
    modalUpdate: false,
    modalDelete: false,
    modalView: false,
    selectedPlayer: null,
    currentPage: 1,
    itemsPerPage: 10,
    searchTerm: '',
    showInactive: false,
    form: {
      id_card: '',
      firstname: '',
      lastname: '',
      date_of_birth: '',
      gen: '',
      type_position: '',
      id_shirt: '',
      photo: null,
    },
    errors: {},
    mode: 'insert',
  }

  componentDidMount() {
    this.loadPlayers()
  }

  loadPlayers = async () => {
    try {
      const players = await fetchPlayers()
      this.setState({ players })
    } catch (error) {
      console.error('Error loading players:', error)
    }
  }
  loadInactivePlayers = async () => {
    try {
      this.setState({ isLoading: true });
      const inactivePlayers = await fetchPlayers(true);
      this.setState({
        inactivePlayers,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading inactive players:', error);
      this.setState({ isLoading: false });
      // Mostrar error al usuario
      alert('Error al cargar jugadores inactivos: ' + error.message);
    }
  };
  toggleInactiveView = () => {
    this.setState(
      (prevState) => ({ showInactive: !prevState.showInactive }),
      () => {
        if (this.state.showInactive) {
          this.loadInactivePlayers();
        } else {
          this.loadPlayers();
        }
      }
    );
  };

  handleSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
      currentPage: 1,
    })
  }
  handleRegisterPlayer = async () => {
    // Validar campos obligatorios
    if (!this.validateForm()) {
      return
    }

    const { form } = this.state

    try {
      // Crear FormData para enviar archivos
      const formData = new FormData()

      // Agregar todos los campos del formulario
      formData.append('id_card', form.id_card)
      formData.append('firstname', form.firstname)
      formData.append('lastname', form.lastname)
      formData.append('date_of_birth', form.date_of_birth)
      formData.append('gen', form.gen)
      formData.append('type_position', form.type_position)
      formData.append('id_shirt', form.id_shirt)

      // Agregar la foto si existe
      if (form.photo) {
        formData.append('photo', form.photo)
      }

      // Mostrar loading
      this.setState({ isLoading: true })

      // Llamar al servicio para crear el jugador
      const newPlayer = await createPlayer(formData)

      // Actualizar el estado con el nuevo jugador
      this.setState((prevState) => ({
        players: [newPlayer, ...prevState.players],
        modalInsert: false,
        form: this.resetForm(),
        isLoading: false,
      }))

      // Mostrar notificación de éxito
      this.showNotification('success', 'Jugador registrado exitosamente')
    } catch (error) {
      console.error('Error al registrar jugador:', error)
      this.setState({ isLoading: false })

      // Manejar errores específicos
      if (error.message.includes('cédula')) {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            id_card: error.message,
          },
        }))
      } else {
        this.showNotification('danger', error.message || 'Error al registrar jugador')
      }
    }
  }

  getFilteredData = () => {
    const { players, searchTerm } = this.state
    return players.filter((player) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        (player.firstname?.toLowerCase().includes(searchLower) ||
          player.lastname?.toLowerCase().includes(searchLower) ||
          player.id_card?.includes(searchTerm)) &&
        player.status !== false
      )
    })
  }

  getCurrentPageData = () => {
    const { currentPage, itemsPerPage } = this.state
    const filteredData = this.getFilteredData()
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }

  viewModalInsert = () => {
    this.setState({
      modalInsert: true,
      mode: 'insert',
      form: this.resetForm(),
      errors: {},
    })
  }

  viewModalEdit = async (player) => {
    try {
      const fullPlayerData = await getPlayer(player.id_player)

      this.setState({
        modalUpdate: true,
        mode: 'edit',
        selectedPlayer: fullPlayerData,
        form: {
          id_card: fullPlayerData.id_card || '',
          firstname: fullPlayerData.firstname || '',
          lastname: fullPlayerData.lastname || '',
          date_of_birth: fullPlayerData.date_of_birth
            ? new Date(fullPlayerData.date_of_birth).toISOString().split('T')[0]
            : '',
          gen: fullPlayerData.gen || '',
          type_position: fullPlayerData.type_position || '',
          id_shirt: fullPlayerData.id_shirt || '',
          photo: fullPlayerData.photo || null,
        },
        errors: {},
      })
    } catch (error) {
      console.error('Error preparing edit:', error)
    }
  }

  viewModalDelete = (player) => {
    this.setState({
      modalDelete: true,
      selectedPlayer: player,
    })
  }

  viewModalView = (player) => {
    this.setState({
      modalView: true,
      selectedPlayer: player,
    })
  }

  closeModal = () => {
    this.setState({
      modalInsert: false,
      modalUpdate: false,
      modalDelete: false,
      modalView: false,
      selectedPlayer: null,
      errors: {},
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: null,
      },
    }))
  }

  handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            photo: 'El tamaño máximo permitido es 5MB',
          },
        }))
        return
      }

      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          photo: file,
        },
        errors: {
          ...prevState.errors,
          photo: null,
        },
      }))
    }
  }

  validateForm = () => {
    const { form } = this.state
    const errors = {}
    let isValid = true

    if (!form.firstname) {
      errors.firstname = 'Nombre es requerido'
      isValid = false
    }

    if (!form.lastname) {
      errors.lastname = 'Apellido es requerido'
      isValid = false
    }

    if (!form.date_of_birth) {
      errors.date_of_birth = 'Fecha de nacimiento es requerida'
      isValid = false
    }

    if (!form.gen) {
      errors.gen = 'Género es requerido'
      isValid = false
    }

    if (!form.type_position) {
      errors.type_position = 'Posición es requerida'
      isValid = false
    }

    if (!form.id_shirt) {
      errors.id_shirt = 'Número de camisa es requerido'
      isValid = false
    }

    this.setState({ errors })
    return isValid
  }

  handleSave = async () => {
    if (!this.validateForm()) return
    const { form, mode, selectedPlayer } = this.state

    try {
      const formData = new FormData()

      // Agregar todos los campos al FormData
      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== undefined) {
          // Para campos de fecha, asegurar formato correcto
          if (key === 'date_of_birth' && form[key]) {
            formData.append(key, new Date(form[key]).toISOString())
          } else {
            formData.append(key, form[key])
          }
        }
      })

      if (mode === 'insert') {
        await createPlayer(formData)
        this.loadPlayers()
      } else if (mode === 'edit') {
        await updatePlayer(selectedPlayer.id_player, formData)
        this.loadPlayers()
      }

      this.closeModal()
    } catch (error) {
      console.error('Error saving player:', error)
      if (error.message.includes('cédula')) {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            id_card: error.message,
          },
        }))
      } else {
        // Mostrar error genérico al usuario
        alert('Error al guardar: ' + (error.message || 'Error desconocido'))
      }
    }
    console.log('Form data before sending:', this.state.form)
  }

  handleDelete = async () => {
    const { selectedPlayer } = this.state;
    try {
      await deactivatePlayer(selectedPlayer.id_player);
      // Actualizar ambas listas
      await this.loadPlayers();
      await this.loadInactivePlayers();
      this.closeModal();
    } catch (error) {
      console.error('Error deactivating player:', error);
    }
  };

  handleActivate = async (player) => {
    try {
      await activatePlayer(player.id_player);
      this.loadInactivePlayers();
      this.loadPlayers();
      // Mostrar éxito al usuario
      alert('Jugador reactivado exitosamente');
    } catch (error) {
      console.error('Error activating player:', error);
      // Mostrar error al usuario
      alert('Error al reactivar jugador: ' + error.message);
    }
  };
  resetForm = () => ({
    id_card: '',
    firstname: '',
    lastname: '',
    date_of_birth: '',
    gen: '',
    type_position: '',
    id_shirt: '',
    photo: null,
  })

  render() {
    const {
      modalInsert,
      modalUpdate,
      modalDelete,
      modalView,
      selectedPlayer,
      currentPage,
      itemsPerPage,
      searchTerm,
      showInactive,
      inactivePlayers,
      isLoading,
      form,
      mode,
      errors,
    } = this.state

    const currentData = showInactive ? inactivePlayers : this.getCurrentPageData()

    const totalPages = Math.ceil(this.getFilteredData().length / itemsPerPage)

    return (
      <Container>
        <Row className="mb-3 align-items-center">
          <Col md={6}>
            <Button
              color={showInactive ? 'primary' : 'secondary'}
              onClick={this.toggleInactiveView}
              className="mr-2"
            >
              {showInactive ? (
                <>
                  <i className="fas fa-users mr-2"></i>
                  Ver jugadores activos
                </>
              ) : (
                <>
                  <i className="fas fa-user-slash mr-2"></i>
                  Ver jugadores inactivos
                </>
              )}
            </Button>

            {!showInactive && (
              <Button color="primary" onClick={this.viewModalInsert}>
                <i className="fas fa-user-plus mr-2"></i>
                Nuevo jugador
              </Button>
            )}
          </Col>

          {!showInactive && (
            <Col md={6}>
              <Input
                type="text"
                placeholder="Buscar por nombre, apellido o DNI"
                value={searchTerm}
                onChange={this.handleSearchChange}
              />
            </Col>
          )}
        </Row>

        {showInactive ? (
          <div className="inactive-view">
            <h3>
              <i className="fas fa-user-slash mr-2"></i>
              Jugadores Inactivos
            </h3>
            <InactivePlayersTable
              data={inactivePlayers}
              onView={this.viewModalView || []}
              onActivate={this.handleActivate}
            />
          </div>
        ) : (
          <>
            <PlayersTable
              data={currentData}
              onEdit={this.viewModalEdit}
              onDelete={this.viewModalDelete}
              onView={this.viewModalView}
            />

            {totalPages > 1 && (
              <CPagination aria-label="Page navigation" className="mt-3">
                <CPaginationItem
                  disabled={currentPage === 1}
                  onClick={() => this.setState({ currentPage: currentPage - 1 })}
                >
                  &laquo;
                </CPaginationItem>

                {Array.from({ length: totalPages }, (_, index) => (
                  <CPaginationItem
                    key={index + 1}
                    active={currentPage === index + 1}
                    onClick={() => this.setState({ currentPage: index + 1 })}
                  >
                    {index + 1}
                  </CPaginationItem>
                ))}

                <CPaginationItem
                  disabled={currentPage === totalPages}
                  onClick={() => this.setState({ currentPage: currentPage + 1 })}
                >
                  &raquo;
                </CPaginationItem>
              </CPagination>
            )}
          </>
        )}

        {/* Modales */}
        <PlayerModal
          isOpen={modalInsert}
          toggle={this.closeModal}
          mode="insert"
          form={form}
          onChange={this.handleChange}
          onFileChange={this.handleFileChange}
          onSave={this.handleSave}
          errors={errors}
        />

        <PlayerModal
          isOpen={modalUpdate}
          toggle={this.closeModal}
          mode="edit"
          form={form}
          onChange={this.handleChange}
          onFileChange={this.handleFileChange}
          onSave={this.handleSave}
          errors={errors}
        />

        <PlayerModal
          isOpen={modalDelete}
          toggle={this.closeModal}
          mode="delete"
          selectedPlayer={selectedPlayer}
          onDelete={this.handleDelete}
        />

        <PlayerModal
          isOpen={modalView}
          toggle={this.closeModal}
          mode="view"
          selectedPlayer={selectedPlayer}
        />
      </Container>
    )
  }
}

export default PlayersView
