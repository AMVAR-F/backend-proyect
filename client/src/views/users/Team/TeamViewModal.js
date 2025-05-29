import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

const TeamViewModal = ({ modal, toggleModal, form }) => (
  <Modal isOpen={modal.view} toggle={() => toggleModal('view')}>
    <ModalHeader toggle={() => toggleModal('view')}>View Team Details</ModalHeader>
    <ModalBody>
      {form.photo && <img src={form.photo} alt="Team" style={{ width: 100, height: 100 }} />}
      <p>
        <strong>Team Name:</strong> {form.name_team}
      </p>
      <p>
        <strong>Technical Director:</strong> {form.technical_director}
      </p>
      <p>
        <strong>Delegate:</strong> {form.delegate}
      </p>
      <p>
        <strong>Status:</strong> {form.isActive ? 'Active' : 'Disabled'}
      </p>
      <p>
        <strong>Home Color:</strong>{' '}
        <span
          style={{
            backgroundColor: form.homeColor,
            width: 20,
            height: 20,
            display: 'inline-block',
            borderRadius: '50%',
          }}
        />
      </p>
      <p>
        <strong>Away Color:</strong>{' '}
        <span
          style={{
            backgroundColor: form.awayColor,
            width: 20,
            height: 20,
            display: 'inline-block',
            borderRadius: '50%',
          }}
        />
      </p>
      <p>
        <strong>Members:</strong>
      </p>
      <ul>
        {form.members.map((m) => (
          <li key={m.id}>{m.name}</li>
        ))}
      </ul>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={() => toggleModal('view')}>
        Close
      </Button>
    </ModalFooter>
  </Modal>
)

export default TeamViewModal
