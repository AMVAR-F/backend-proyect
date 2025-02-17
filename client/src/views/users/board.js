import React from "react";

import {
  Table,
  Button,
  Modal,
  Container,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";

const data = [
  { id: 1, firstname: "Alejandro", lastname: "Sanchez", dni: "29345789", typeofuser: "Technical Director", gender: "Male", dob: "1990-01-15" },
  { id: 2, firstname: "Juan", lastname: "Perez", dni: "12345678", typeofuser: "Referee", gender: "Male", dob: "1985-07-25" },

];

class App extends React.Component {
  state = {
    data: data,
    modalUpdate: false,
    modalInsert: false,
    modalDelete: false,
    modalView: false,
    selectedUser: null,
    form: {
      id: "",
      firstname: "",
      lastname: "",
      dni: "",
      typeofuser: "",
      gender: "",
      dob: "",
      image: null,
    },
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 50 * 1024 * 1024) {
      alert("File size exceeds 50 MB");
      event.target.value = null;
    } else {
      this.setState({
        form: {
          ...this.state.form,
          image: file,
        },
      });
    }
  };

  viewModalInsert = () => {
    this.setState({
      modalInsert: true,
      form: { id: "", firstname: "", lastname: "", dni: "", typeofuser: "", image: null },
    });
  };

  closeModalInsert = () => {
    this.setState({ modalInsert: false });
  };

  insert = () => {
    const newRecord = { ...this.state.form };
    newRecord.id = this.state.data.length + 1;
    const list = [...this.state.data, newRecord];
    this.setState({ data: list, modalInsert: false });
  };

  viewModalEdit = (element) => {
    this.setState({
      form: element,
      modalUpdate: true,
    });
  };

  closeModalEdit = () => {
    this.setState({ modalUpdate: false });
  };

  edit = (form) => {
    const list = this.state.data.map((item) => (item.id === form.id ? form : item));
    this.setState({ data: list, modalUpdate: false });
  };

  viewModalDelete = (user) => {
    this.setState({ modalDelete: true, selectedUser: user });
  };

  closeModalDelete = () => {
    this.setState({ modalDelete: false, selectedUser: null });
  };

  delete = () => {
    const list = this.state.data.filter((item) => item.id !== this.state.selectedUser.id);
    this.setState({ data: list, modalDelete: false, selectedUser: null });
  };

  viewModalView = (user) => {
    this.setState({ modalView: true, selectedUser: user });
  };

  closeModalView = () => {
    this.setState({ modalView: false, selectedUser: null });
  };

  render() {
    const { selectedUser } = this.state;
    return (
      <>
        <Container>
          <br />
          <Button color="btn btn-outline-primary" onClick={this.viewModalInsert}>Create</Button>

          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>DNI</th>
                <th>Type of User</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.firstname}</td>
                  <td>{element.lastname}</td>
                  <td>{element.dni}</td>
                  <td>{element.typeofuser}</td>
                  <td>
                    <Button color="btn btn-outline-success" onClick={() => this.viewModalEdit(element)}>Edit</Button>{" "}
                    <Button color="btn btn-outline-danger" onClick={() => this.viewModalDelete(element)}>Delete</Button>{" "}
                    <Button color="btn btn-outline-info" onClick={() => this.viewModalView(element)}>View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
              {/* Modal de Inserción */}
<Modal isOpen={this.state.modalInsert}>
  <ModalHeader>
    <div>Insert User</div>
  </ModalHeader>
  <ModalBody>
    <FormGroup>
      <label htmlFor="dni">DNI</label>
      <input
        type="text"
        className="form-control"
        name="dni"
        placeholder="Enter DNI"
        required
        pattern="\d{8}"
        maxLength="8"
        title="DNI must be 8 digits"
        onChange={this.handleChange}
      />
    </FormGroup>
    <FormGroup>
      <label htmlFor="firstname">First Name</label>
      <input
        type="text"
        className="form-control"
        name="firstname"
        required
        onChange={this.handleChange}
      />
    </FormGroup>
    <FormGroup>
      <label htmlFor="lastname">Last Name</label>
      <input
        type="text"
        className="form-control"
        name="lastname"
        required
        onChange={this.handleChange}
      />
    </FormGroup>
    <FormGroup>
      <label htmlFor="dob">Date of Birth</label>
      <input
        type="date"
        className="form-control"
        name="dob"
        required
        onChange={this.handleChange}
      />
    </FormGroup>
    <FormGroup>
      <label>Gender</label>
      <div>
        <input
          type="radio"
          id="male"
          name="gender"
          value="Male"
          required
          onChange={this.handleChange}
        />
        <label htmlFor="male" className="ms-2">Male</label>
      </div>
      <div>
        <input
          type="radio"
          id="female"
          name="gender"
          value="Female"
          required
          onChange={this.handleChange}
        />
        <label htmlFor="female" className="ms-2">Female</label>
      </div>
    </FormGroup>
    <FormGroup>
      <label htmlFor="typeofuser">Type of User</label>
      <select className="form-select" name="typeofuser" required onChange={this.handleChange}>
        <option value="Technical Director">Technical Director</option>
        <option value="Player">Player</option>
        <option value="Referee">Referee</option>
      </select>
    </FormGroup>
    <FormGroup>
      <label htmlFor="formFile">Upload Image</label>
      <input className="form-control" type="file" id="formFile" accept="image/*" onChange={this.handleFileChange} />
    </FormGroup>
  </ModalBody>
  <ModalFooter>
    <Button color="btn btn-outline-success" onClick={this.insert}>Insert</Button>
    <Button color="btn btn-outline-danger" onClick={this.closeModalInsert}>Cancel</Button>
  </ModalFooter>
</Modal>

{/* Modal de Edición */}
<Modal isOpen={this.state.modalUpdate}>
  <ModalHeader>
    <div>Edit User</div>
  </ModalHeader>
  <ModalBody>
    <FormGroup>
      <label htmlFor="dni">DNI</label>
      <input
        type="text"
        className="form-control"
        name="dni"
        required
        pattern="\d{8}"
        maxLength="8"
        title="DNI must be 8 digits"
        value={this.state.form.dni}
        onChange={this.handleChange}
      />
    </FormGroup>
    <FormGroup>
      <label htmlFor="firstname">First Name</label>
      <input
        type="text"
        className="form-control"
        name="firstname"
        required
        value={this.state.form.firstname}
        onChange={this.handleChange}
      />
    </FormGroup>
    <FormGroup>
      <label htmlFor="lastname">Last Name</label>
      <input
        type="text"
        className="form-control"
        name="lastname"
        required
        value={this.state.form.lastname}
        onChange={this.handleChange}
      />
    </FormGroup>
    <FormGroup>
      <label htmlFor="dob">Date of Birth</label>
      <input
        type="date"
        className="form-control"
        name="dob"
        required
        value={this.state.form.dob}
        onChange={this.handleChange}
      />
    </FormGroup>
    <FormGroup>
      <label>Gender</label>
      <div>
        <input
          type="radio"
          id="male"
          name="gender"
          value="Male"
          required
          checked={this.state.form.gender === "Male"}
          onChange={this.handleChange}
        />
        <label htmlFor="male" className="ms-2">Male</label>
      </div>
      <div>
        <input
          type="radio"
          id="female"
          name="gender"
          value="Female"
          required
          checked={this.state.form.gender === "Female"}
          onChange={this.handleChange}
        />
        <label htmlFor="female" className="ms-2">Female</label>
      </div>
    </FormGroup>
    <FormGroup>
      <label htmlFor="typeofuser">Type of User</label>
      <select className="form-select" name="typeofuser" required value={this.state.form.typeofuser} onChange={this.handleChange}>
        <option value="Technical Director">Technical Director</option>
        <option value="Player">Player</option>
        <option value="Referee">Referee</option>
      </select>
    </FormGroup>
    <FormGroup>
      <label htmlFor="formFile">Upload Image</label>
      <input className="form-control" type="file" id="formFile" accept="image/*" onChange={this.handleFileChange} />
    </FormGroup>
  </ModalBody>
  <ModalFooter>
    <Button color="btn btn-outline-success" onClick={this.edit}>Save Changes</Button>
    <Button color="btn btn-outline-danger" onClick={this.closeModalEdit}>Cancel</Button>
  </ModalFooter>
</Modal>


        {/* Modal de Eliminación */}
        <Modal isOpen={this.state.modalDelete}>
          <ModalHeader>
            <div>Confirm Deletion</div>
          </ModalHeader>
          <ModalBody>
            Are you sure you want to delete the user <b>{selectedUser && selectedUser.firstname}</b>?
          </ModalBody>
          <ModalFooter>
            <Button color="btn btn-outline-danger" onClick={this.delete}>Delete</Button>
            <Button color="btn btn-outline-secondary" onClick={this.closeModalDelete}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* Modal de Visualización */}
        <Modal isOpen={this.state.modalView}>
          <ModalHeader>
            <div>User Details</div>
          </ModalHeader>
          <ModalBody>
            {selectedUser && (
              <>
                <p><b>Id:</b> {selectedUser.id}</p>
                <p><b>First Name:</b> {selectedUser.firstname}</p>
                <p><b>Last Name:</b> {selectedUser.lastname}</p>
                <p><b>DNI:</b> {selectedUser.dni}</p>
                <p><b>Type of User:</b> {selectedUser.typeofuser}</p>
                <p><b>Gender:</b> {selectedUser.gender}</p>
                <p><b>Date of Birth:</b> {selectedUser.dob}</p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="btn btn-outline-secondary" onClick={this.closeModalView}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
