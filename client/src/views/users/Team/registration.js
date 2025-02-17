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
    Input,
    Label
} from "reactstrap";
import { CFormSwitch } from "@coreui/react";  // Assuming CFormSwitch is imported from @coreui/react

const initialData = [
    { id: 1, name_team: "Tariba Lions", technical_director: "Alejandro Torres", color: "yellow and black", isActive: true, homeColor: "#ffff00", awayColor: "#000000", members: [], photo: "" },
    { id: 2, name_team: "Peribeca Tigers", technical_director: "Luis Caceres", color: "red and black", isActive: true, homeColor: "#ff0000", awayColor: "#000000", members: [], photo: "" },
    { id: 3, name_team: "Tucape Panthers", technical_director: "Pedro Vargas", color: "blue and black", isActive: true, homeColor: "#0000ff", awayColor: "#000000", members: [], photo: "" },
    { id: 4, name_team: "Pirineos Bears", technical_director: "Alejo Torre", color: "green and black", isActive: true, homeColor: "#00ff00", awayColor: "#000000", members: [], photo: "" }
];

// Simulated Users
const users = [
    { id: 1, name: "Carlos Ruiz" },
    { id: 2, name: "Ana Gómez" },
    { id: 3, name: "Pedro Fernández" },
    { id: 4, name: "María Torres" },
];

// Extract unique technical directors for dropdown
const uniqueDirectors = [...new Set(initialData.map(team => team.technical_director))];

const App = () => {
    const [data, setData] = useState(initialData);
    const [modal, setModal] = useState({ insert: false, update: false, view: false });
    const [form, setForm] = useState({
        id: "",
        name_team: "",
        technical_director: "",
        isActive: true,
        color: "",
        members: [],
        homeColor: "#ffffff",
        awayColor: "#000000",
        photo: ""
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users);

    const toggleModal = (type, team = null) => {
        setModal((prevState) => ({ ...prevState, [type]: !prevState[type] }));
        if (type === "insert") {
            setForm({
                id: data.length + 1,
                name_team: "",
                technical_director: "",
                isActive: true,
                color: "",
                members: [],
                homeColor: "#ffffff",
                awayColor: "#000000",
                photo: ""
            });
        } else if (type === "update" && team) {
            setForm(team);
        } else if (type === "view" && team) {
            setForm(team);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setForm((prevForm) => ({ ...prevForm, photo: reader.result }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleStatusToggle = (id) => {
        setData(prevData =>
            prevData.map(team =>
                team.id === id ? { ...team, isActive: !team.isActive } : team
            )
        );
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(value.toLowerCase())));
    };

    const handleSelectMember = (user) => {
        setForm((prevForm) => ({
            ...prevForm,
            members: prevForm.members.some(member => member.id === user.id)
                ? prevForm.members
                : [...prevForm.members, user]
        }));
    };

    const handleRemoveMember = (userId) => {
        setForm((prevForm) => ({
            ...prevForm,
            members: prevForm.members.filter(member => member.id !== userId)
        }));
    };

    const handleInsert = () => {
        setData([...data, { ...form }]);
        toggleModal("insert");
    };

    const handleUpdate = () => {
        setData(data.map(team => (team.id === form.id ? form : team)));
        toggleModal("update");
    };

    return (
        <Container>
            <Button color="btn btn-outline-primary" onClick={() => toggleModal("insert")}>Create</Button>
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
                        <tr key={team.id} style={{ color: team.isActive ? "black" : "gray" }}>
                            <td>{team.id}</td>
                            <td>
                                {team.photo && <img src={team.photo} alt="Team" style={{ width: '50px', height: '50px' }} />}
                            </td>
                            <td>{team.name_team}</td>
                            <td>{team.technical_director}</td>
                            <td>{team.color}</td>
                            <td>
                                <span style={{ backgroundColor: team.homeColor, width: '20px', height: '20px', display: 'inline-block', borderRadius: '50%' }}></span>
                            </td>
                            <td>
                                <span style={{ backgroundColor: team.awayColor, width: '20px', height: '20px', display: 'inline-block', borderRadius: '50%' }}></span>
                            </td>
                           
                            <td>
                                <CFormSwitch
                                    label={team.isActive ? "Active" : "Disabled"}
                                    id={`switch-${team.id}`}
                                    defaultChecked={team.isActive}
                                    onChange={() => handleStatusToggle(team.id)}
                                />
                            </td>
                            <td>
                                <Button color="btn btn-outline-info" onClick={() => toggleModal("view", team)}>View</Button>{" "}
                                <Button color="btn btn-outline-success" onClick={() => toggleModal("update", team)}>Edit</Button>{" "}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Insert and Edit Modal */}
            <Modal isOpen={modal.insert || modal.update} toggle={() => toggleModal(modal.insert ? "insert" : "update")}>
                <ModalHeader toggle={() => toggleModal(modal.insert ? "insert" : "update")}>
                    {modal.insert ? "Insert Team" : "Edit Team"}
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Team Name</Label>
                        <Input type="text" name="name_team" value={form.name_team} onChange={handleChange} />
                    </FormGroup>

                    {/* Technical Director Dropdown */}
                    <FormGroup>
                        <Label>Technical Director</Label>
                        <Input type="select" name="technical_director" value={form.technical_director} onChange={handleChange}>
                            <option value="">Select a director</option>
                            {uniqueDirectors.map((director, index) => (
                                <option key={index} value={director}>{director}</option>
                            ))}
                        </Input>
                    </FormGroup>

                    {/* Shirt Colors */}
                    <FormGroup>
                        <Label>Home Shirt Color</Label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input type="color" name="homeColor" value={form.homeColor} onChange={handleChange} />
                            <span style={{ marginLeft: '10px', width: '20px', height: '20px', backgroundColor: form.homeColor, borderRadius: '50%' }}></span>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label>Away Shirt Color</Label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input type="color" name="awayColor" value={form.awayColor} onChange={handleChange} />
                            <span style={{ marginLeft: '10px', width: '20px', height: '20px', backgroundColor: form.awayColor, borderRadius: '50%' }}></span>
                        </div>
                    </FormGroup>

                    {/* Photo Upload */}
                    <FormGroup>
                        <Label>Upload Photo</Label>
                        <Input type="file" name="photo" onChange={handleFileChange} />
                        {form.photo && <img src={form.photo} alt="Team" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                    </FormGroup>

                    {/* Member Search */}
                    <FormGroup>
                        <Label>Search Members</Label>
                        <Input type="text" placeholder="Search users..." value={searchTerm} onChange={handleSearch} />
                        {searchTerm && (
                            <ul style={{ maxHeight: '150px', overflowY: 'auto', listStyle: 'none', padding: 0 }}>
                                {filteredUsers.map(user => (
                                    <li key={user.id}>
                                        <Button color="link" onClick={() => handleSelectMember(user)}>{user.name}</Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </FormGroup>

                    {/* Selected Members */}
                    <FormGroup>
                        <Label>Selected Members</Label>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {form.members && form.members.map(member => (
                                <li key={member.id}>
                                    {member.name}
                                    <Button close onClick={() => handleRemoveMember(member.id)} />
                                </li>
                            ))}
                        </ul>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={modal.insert ? handleInsert : handleUpdate}>{modal.insert ? "Insert" : "Update"}</Button>
                    <Button color="secondary" onClick={() => toggleModal(modal.insert ? "insert" : "update")}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/* View Modal */}
            <Modal isOpen={modal.view} toggle={() => toggleModal("view")}>
                <ModalHeader toggle={() => toggleModal("view")}>View Team Details</ModalHeader>
                <ModalBody>
                <p><strong>Photo:</strong></p>
                {form.photo && <img src={form.photo} alt="Team" style={{ width: '100px', height: '100px' }} />}
                    <p><strong>Team Name:</strong> {form.name_team}</p>
                    <p><strong>Technical Director:</strong> {form.technical_director}</p>
                    <p><strong>Status:</strong> {form.isActive ? "Active" : "Disabled"}</p>
                    <p><strong>Home Shirt Color:</strong> <span style={{ backgroundColor: form.homeColor, width: '20px', height: '20px', display: 'inline-block', borderRadius: '50%' }}></span></p>
                    <p><strong>Away Shirt Color:</strong> <span style={{ backgroundColor: form.awayColor, width: '20px', height: '20px', display: 'inline-block', borderRadius: '50%' }}></span></p>
                    <p><strong>Members:</strong></p>
                    <ul>
                        {form.members && form.members.map(member => (
                            <li key={member.id}>{member.name}</li>
                        ))}
                    </ul>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => toggleModal("view")}>Close</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default App;
