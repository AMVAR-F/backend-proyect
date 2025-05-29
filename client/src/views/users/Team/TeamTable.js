import React from 'react'
import { Table, Button } from 'reactstrap'
import { CFormSwitch } from '@coreui/react'

const TeamTable = ({ data, toggleModal, handleStatusToggle }) => (
  <Table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Photo</th>
        <th>Team Name</th>
        <th>Technical Director</th>
        <th>Color</th>
        <th>Home Color</th>
        <th>Away Color</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((team) => (
        <tr key={team.id} style={{ color: team.isActive ? 'black' : 'gray' }}>
          <td>{team.id}</td>
          <td>
            {team.photo && <img src={team.photo} alt="Team" style={{ width: 50, height: 50 }} />}
          </td>
          <td>{team.name_team}</td>
          <td>{team.technical_director}</td>
          <td>{team.color}</td>
          <td>
            <span
              style={{
                backgroundColor: team.homeColor,
                width: 20,
                height: 20,
                display: 'inline-block',
                borderRadius: '50%',
              }}
            />
          </td>
          <td>
            <span
              style={{
                backgroundColor: team.awayColor,
                width: 20,
                height: 20,
                display: 'inline-block',
                borderRadius: '50%',
              }}
            />
          </td>
          <td>
            <CFormSwitch
              label={team.isActive ? 'Active' : 'Disabled'}
              id={`switch-${team.id}`}
              defaultChecked={team.isActive}
              onChange={() => handleStatusToggle(team.id)}
            />
          </td>
          <td>
            <Button color="btn btn-outline-info" onClick={() => toggleModal('view', team)}>
              View
            </Button>{' '}
            <Button color="btn btn-outline-success" onClick={() => toggleModal('update', team)}>
              Edit
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)

export default TeamTable
