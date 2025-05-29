import React, { useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Button,
} from 'reactstrap'

const TeamFormModal = ({ modal, toggleModal, form, setForm, handleInsert, handleUpdate, users }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => setForm((prev) => ({ ...prev, photo: reader.result }))
    if (file) reader.readAsDataURL(file)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    // simulado para ahora, dejar vacío
    setFilteredUsers([])
  }

  const handleSelectMember = (user) => {
    setForm((prev) => ({
      ...prev,
      members: prev.members.some((m) => m.id === user.id) ? prev.members : [...prev.members, user],
    }))
  }

  const handleRemoveMember = (userId) => {
    setForm((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.id !== userId),
    }))
  }

  return (
    <Modal
      isOpen={modal.insert || modal.update}
      toggle={() => toggleModal(modal.insert ? 'insert' : 'update')}
    >
      <ModalHeader toggle={() => toggleModal(modal.insert ? 'insert' : 'update')}>
        {modal.insert ? 'Insert Team' : 'Edit Team'}
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Team Name</Label>
          <Input name="name_team" value={form.name_team} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Technical Director</Label>
          <Input
            type="select"
            name="technical_director"
            value={form.technical_director}
            onChange={handleChange}
          >
            <option value="">Select a Technical Director</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Delegate</Label>
          <Input type="select" name="delegate" value={form.delegate} onChange={handleChange}>
            <option value="">Select a Delegate</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Home Color</Label>
          <Input type="color" name="homeColor" value={form.homeColor} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Away Color</Label>
          <Input type="color" name="awayColor" value={form.awayColor} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Upload Photo</Label>
          <Input type="file" name="photo" onChange={handleFileChange} />
          {form.photo && <img src={form.photo} alt="Team" style={{ width: 100, height: 100 }} />}
        </FormGroup>
        <FormGroup>
          <Label>Search Members</Label>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search users..."
          />
          {searchTerm && (
            <ul style={{ maxHeight: 150, overflowY: 'auto', padding: 0, listStyle: 'none' }}>
              {filteredUsers.map((user) => (
                <li key={user.id}>
                  <Button color="link" onClick={() => handleSelectMember(user)}>
                    {user.name}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Selected Members</Label>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {form.members.map((member) => (
              <li key={member.id}>
                {member.name} <Button close onClick={() => handleRemoveMember(member.id)} />
              </li>
            ))}
          </ul>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={modal.insert ? handleInsert : handleUpdate}>
          {modal.insert ? 'Insert' : 'Update'}
        </Button>
        <Button color="secondary" onClick={() => toggleModal(modal.insert ? 'insert' : 'update')}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default TeamFormModal
