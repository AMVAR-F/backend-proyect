import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Modal,
  Container,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
} from "reactstrap";
import { DatePicker } from "antd";
import moment from "moment";
import SearchTeamBar from './SearchTeamBar';
import EditTournamentModal from './EditTournamentModal';
import ViewTournamentModal from "./ViewTournamentModal"
import GroupMenu from '../groups/GroupMenu'

const { RangePicker } = DatePicker;

const initialData = [
  {
    championship_id: 1,
    championship_name: "Summer Futsal League",
    status: "Ongoing",
    start_date: "2024-06-15",
    end_date: "2024-07-20",
    start_inscriptions: "2024-05-01",
    end_inscriptions: "2024-05-31",
    category: "Sub 11",
    teams: []
  },
  {
    championship_id: 2,
    championship_name: "Autumn Cup",
    status: "Scheduled",
    start_date: "2024-09-10",
    end_date: "2024-10-05",
    start_inscriptions: "2024-08-01",
    end_inscriptions: "2024-08-30",
    category: "Sub 9",
    teams: []
  },
];

const statuses = [
  "Inscriptions Open",
  "Inscriptions Closed",
  "Ongoing",
  "Paused",
  "Completed",
  "Cancelled",
  "Postponed",
];

const categories = [
  "Semillitas",
  "Teteritos",
  "Compoticas",
  "Sub 7",
  "Sub 9",
  "Sub 11",
  "Sub 13",
  "Sub 17",
  "Sub 20",
  "Categoria Libre",
  "Veteranos",
  "Supra 50",
];

const App = () => {

  const [dataList, setDataList] = useState(initialData);
  const [modalInsert, setModalInsert] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [form, setForm] = useState({
    championship_id: "",
    championship_name: "",
    status: "",
    start_date: "",
    end_date: "",
    start_inscriptions: "",
    end_inscriptions: "",
    category: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategorySelect = (category) => {
    console.log("Categoría seleccionada:", category);
    const filteredTournaments = initialData.filter(tournament => tournament.category === category);
    setDataList(filteredTournaments);
   
  };
  // Estados y funciones del modal de edición
  const [modalEdit, setModalEdit] = useState(false);
  const [currentTournament, setCurrentTournament] = useState(null);

  const openEditModal = (tournament) => {
    setCurrentTournament(tournament);
    setModalEdit(true);
  };

  const closeEditModal = () => setModalEdit(false);

  const handleSaveEdit = (updatedTournament) => {
    const updatedData = dataList.map((item) =>
      item.championship_id === updatedTournament.championship_id ? updatedTournament : item
    );
    setDataList(updatedData);
    setModalEdit(false);
  };
//Manejos de estados y funciones del modal de vista
const [modalView, setModalView] = useState(false);
const [tournamentToView, setTournamentToView] = useState(null);

const openViewModal = (tournament) => {
  setTournamentToView(tournament);
  setModalView(true);
};

const closeViewModal = () => setModalView(false);

  // Manejo de Dropdowns del formulario
  const [dropdownCategory, setDropdownCategory] = useState(false);
  const [dropdownStatus, setDropdownStatus] = useState(false);

  const toggleDropdown = (id) => {
    if (dropdownOpen === id) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(id);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedData = dataList.map((item) =>
      item.championship_id === id ? { ...item, status: newStatus } : item
    );
    setDataList(updatedData);
    setDropdownOpen(null);
  };

  const handleCategoryChange = (category) => {
    setForm((prevState) => ({ ...prevState, category }));
    setDropdownCategory(false);
  };

  const handleFormStatusChange = (status) => {
    setForm((prevState) => ({ ...prevState, status }));
    setDropdownStatus(false);
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

  const handleInsert = () => {
    const newRecord = { ...form, championship_id: dataList.length + 1 };
    setDataList((prevList) => [...prevList, newRecord]);
    setModalInsert(false);
  };

  const closeModalInsert = () => setModalInsert(false);

  const viewModalInsert = () => {
    setModalInsert(true);
    setForm({
      championship_id: "",
      championship_name: "",
      status: "",
      start_date: "",
      end_date: "",
      start_inscriptions: "",
      end_inscriptions: "",
      category: "",
    });
  };

  const handleTeamSelect = (team) => {
    console.log("Equipo seleccionado:", team);
  };

  return (
    <Container>
        <GroupMenu categories={categories} onCategorySelect={handleCategorySelect} />
      <Button color="primary" onClick={viewModalInsert}>
        Create Tournament
      </Button>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((tournament) => (
            <tr key={tournament.championship_id}>
              <td>{tournament.championship_id}</td>
              <td>{tournament.championship_name}</td>
              
              <td>
                <Dropdown
                  isOpen={dropdownOpen === tournament.championship_id}
                  toggle={() => toggleDropdown(tournament.championship_id)}
                >
                  <DropdownToggle caret>{tournament.status}</DropdownToggle>
                  <DropdownMenu>
                    {statuses.map((status, index) => (
                      <DropdownItem
                        key={index}
                        onClick={() =>
                          handleStatusChange(tournament.championship_id, status)
                        }
                      >
                        {status}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </td>
              <td>{tournament.start_date}</td>
              <td>{tournament.end_date}</td>
              <td>
              <Button color="info" onClick={() => openViewModal(tournament)}>View</Button>{" "} 
              <Button color="success" onClick={() => openEditModal(tournament)}>Edit</Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Insert */}
      <Modal isOpen={modalInsert}>
        <ModalHeader>Create Tournament</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              value={form.championship_name}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  championship_name: e.target.value,
                }))
              }
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
                  <DropdownItem key={index} onClick={() => handleFormStatusChange(status)}>
                    {status}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label>Start and End Dates</Label>
            <RangePicker onChange={handleDateChange} />
          </FormGroup>
          <FormGroup>
            <Label>Inscription Dates</Label>
            <RangePicker onChange={handleInscriptionsChange} />
          </FormGroup>
          <FormGroup>
            <Label>Search Team</Label>
            <SearchTeamBar onSelectTeam={handleTeamSelect} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleInsert}>Save</Button>
          <Button color="danger" onClick={closeModalInsert}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Modal Edit */}
      <EditTournamentModal
        isOpen={modalEdit}
        toggle={closeEditModal}
        tournament={currentTournament}
        onSave={handleSaveEdit}
        categories={categories} // Pasar categorías
        statuses={statuses}     // Pasar estados
      />
      {/*Modal view*/}
      <ViewTournamentModal isOpen={modalView} toggle={closeViewModal} tournament={tournamentToView}/>

    </Container>
  );
};

export default App;
