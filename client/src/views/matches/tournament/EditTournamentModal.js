import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  Label,
  ModalFooter,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Badge
} from 'reactstrap';
import { DatePicker } from 'antd';
import moment from 'moment';
import SearchTeamBar from './SearchTeamBar';

const { RangePicker } = DatePicker;

const EditTournamentModal = ({ isOpen, toggle, tournament, onSave, categories, statuses }) => {
  const [form, setForm] = useState({ ...tournament });
  const [dropdownCategory, setDropdownCategory] = useState(false);
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    if (tournament) {
      setForm({ ...tournament });
      setSelectedTeams(tournament.teams || []);
    }
  }, [tournament]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (dates, dateStrings) => {
    setForm((prevState) => ({
      ...prevState,
      start_date: dateStrings[0],
      end_date: dateStrings[1],
    }));
  };

  const handleInscriptionsChange = (dates, dateStrings) => {
    setForm((prevState) => ({
      ...prevState,
      start_inscriptions: dateStrings[0],
      end_inscriptions: dateStrings[1],
    }));
  };

  const handleCategoryChange = (category) => {
    setForm((prevState) => ({ ...prevState, category }));
    setDropdownCategory(false);
  };

  const handleStatusChange = (status) => {
    setForm((prevState) => ({ ...prevState, status }));
    setDropdownStatus(false);
  };

  const handleSave = () => {
    onSave({ ...form, teams: selectedTeams });
  };

  const handleTeamSelect = (team) => {
    setSelectedTeams((prevSelectedTeams) => {
      if (!prevSelectedTeams.some((t) => t.id === team.id)) {
        return [...prevSelectedTeams, team];
      }
      return prevSelectedTeams;
    });
  };

  const handleRemoveTeam = (teamId) => {
    setSelectedTeams((prevSelectedTeams) =>
      prevSelectedTeams.filter((team) => team.id !== teamId)
    );
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Tournament</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            name="championship_name"
            value={form.championship_name}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Category</Label>
          <Dropdown isOpen={dropdownCategory} toggle={() => setDropdownCategory(!dropdownCategory)}>
            <DropdownToggle caret>{form.category || "Select Category"}</DropdownToggle>
            <DropdownMenu>
              {categories.map((category, index) => (
                <DropdownItem key={index} onClick={() => handleCategoryChange(category)}>
                  {category}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
        <FormGroup>
          <Label>Status</Label>
          <Dropdown isOpen={dropdownStatus} toggle={() => setDropdownStatus(!dropdownStatus)}>
            <DropdownToggle caret>{form.status || "Select Status"}</DropdownToggle>
            <DropdownMenu>
              {statuses.map((status, index) => (
                <DropdownItem key={index} onClick={() => handleStatusChange(status)}>
                  {status}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
        <FormGroup>
          <Label>Start and End Dates</Label>
          <RangePicker
            value={[moment(form.start_date), moment(form.end_date)]}
            onChange={handleDateChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Inscription Dates</Label>
          <RangePicker
            value={[moment(form.start_inscriptions), moment(form.end_inscriptions)]}
            onChange={handleInscriptionsChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Search and Select Teams</Label>
          <SearchTeamBar onSelectTeam={handleTeamSelect} />
        </FormGroup>
        {selectedTeams.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <h4>Selected Teams:</h4>
            <ListGroup>
              {selectedTeams.map((team) => (
                <ListGroupItem key={team.id}>
                  <Row>
                    <Col xs="2">
                      <img
                        src={team.image}
                        alt={team.name}
                        style={{ width: 30, borderRadius: "50%" }}
                      />
                    </Col>
                    <Col>{team.name}</Col>
                    <Col xs="2">
                      <Badge color="danger" onClick={() => handleRemoveTeam(team.id)} style={{ cursor: 'pointer' }}>
                        X
                      </Badge>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={handleSave}>Save</Button>
        <Button color="danger" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTournamentModal;
