import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container } from 'reactstrap'
import TeamTable from './TeamTable.js'
import TeamFormModal from './TeamFormModal.js'
import TeamViewModal from './TeamViewModal.js'

const App = () => {
  const [data, setData] = useState([])

  const [users, setUsers] = useState([
    { id: 1, name: 'Carlos Pérez' },
    { id: 2, name: 'Ana Gómez' },
    { id: 3, name: 'Luis Mendoza' },
    { id: 4, name: 'Sandra Torres' },
  ])
  const [modal, setModal] = useState({ insert: false, update: false, view: false })
  const [form, setForm] = useState({
    id: '',
    name_team: '',
    technical_director: '',
    isActive: true,
    color: '',
    members: [],
    homeColor: '#ffffff',
    awayColor: '#000000',
    photo: '',
  })

  const toggleModal = (type, team = null) => {
    setModal((prev) => ({ ...prev, [type]: !prev[type] }))
    if (type === 'insert') {
      setForm({
        id: data.length + 1,
        name_team: '',
        technical_director: '',
        isActive: true,
        color: '',
        members: [],
        homeColor: '#ffffff',
        awayColor: '#000000',
        photo: '',
      })
    } else if ((type === 'update' || type === 'view') && team) {
      setForm(team)
    }
  }

  const handleInsert = () => {
    setData([...data, { ...form }])
    toggleModal('insert')
  }

  const handleUpdate = () => {
    setData(data.map((team) => (team.id === form.id ? form : team)))
    toggleModal('update')
  }

  const handleStatusToggle = (id) => {
    setData((prev) =>
      prev.map((team) => (team.id === id ? { ...team, isActive: !team.isActive } : team)),
    )
  }

  return (
    <Container>
      <Button color="btn btn-outline-primary" onClick={() => toggleModal('insert')}>
        Create
      </Button>
      <TeamTable data={data} toggleModal={toggleModal} handleStatusToggle={handleStatusToggle} />
      <TeamFormModal
        modal={modal}
        toggleModal={toggleModal}
        form={form}
        setForm={setForm}
        handleInsert={handleInsert}
        handleUpdate={handleUpdate}
        users={users}
      />
      <TeamViewModal modal={modal} toggleModal={toggleModal} form={form} />
    </Container>
  )
}

export default App
