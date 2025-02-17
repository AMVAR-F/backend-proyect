import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const ProfileForm = () => {
  const [profileData, setProfileData] = useState({
    name: 'Angela Villamizar',  
    email: 'angelavillamizar900@gmail.com',  
    phone: '04241986745',
    password: 'aw123AASD',  
    newpassword: '', 
  });

  const [modal, setModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario 
  const handleSubmit = (e) => {
    e.preventDefault();
    setModal(true); 
  };

  // Función para cerrar el modal sin hacer cambios
  const closeModal = () => setModal(false);

  // Función para confirmar la actualización de los datos
  const confirmUpdate = () => {
    console.log('Datos actualizados:', profileData);
    setModal(false); 
  };

  return (
    <div>
    
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={profileData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={profileData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input
            type="tel"
            name="phone"
            id="phone"
            value={profileData.phone}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={profileData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label for="newpassword">New Password</Label>
          <Input
            type="password"
            name="newpassword"
            id="newpassword"
            value={profileData.newpassword}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button color="primary" type="submit">Save Changes</Button>
      </Form>

  
      <Modal isOpen={modal} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Confirm Changes</ModalHeader>
        <ModalBody>
          Are you sure you want to save the changes to your profile?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={confirmUpdate}>Yes, Save Changes</Button>
          <Button color="secondary" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProfileForm;
