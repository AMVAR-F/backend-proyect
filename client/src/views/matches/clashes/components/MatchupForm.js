import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const MatchupFormModal = ({ show, handleClose, categories, teams, addMatchup }) => {
  const [formData, setFormData] = useState({
    category: categories[0],
    homeTeam: teams[0].name_team,
    awayTeam: teams[1].name_team,
    date: '',
    time: '',
    place: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    addMatchup(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Matchup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" name="category" value={formData.category} onChange={handleChange}>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formHomeTeam">
            <Form.Label>Home Team</Form.Label>
            <Form.Control as="select" name="homeTeam" value={formData.homeTeam} onChange={handleChange}>
              {teams.map((team, index) => (
                <option key={index} value={team.name_team}>{team.name_team}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formAwayTeam">
            <Form.Label>Away Team</Form.Label>
            <Form.Control as="select" name="awayTeam" value={formData.awayTeam} onChange={handleChange}>
              {teams.map((team, index) => (
                <option key={index} value={team.name_team}>{team.name_team}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" name="time" value={formData.time} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formPlace">
            <Form.Label>Place</Form.Label>
            <Form.Control type="text" name="place" value={formData.place} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MatchupFormModal;
