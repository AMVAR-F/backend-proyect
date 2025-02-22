import React, { useState } from 'react';
import {
  Container, Row, Col, Card, CardBody, CardText, CardImg, Button,
  Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label
} from 'reactstrap';
import { cilSettings } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import './profile.css';
import ProfilePhoto from '../../../src/assets/images/profile.png';

export default function PersonalProfile() {
  const [modalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    username: 'Admin',
    email: 'info@example.com',
    nombres: 'Nombre Ejemplo',
    apellido: 'Apellido Ejemplo',
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [error, setError] = useState('');

  const toggleModal = () => {
    setTempProfile({ ...profile }); // Restaurar datos al abrir/cerrar modal
    setModalOpen(!modalOpen);
  };

  const handleChange = (e) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!tempProfile.username || !tempProfile.email) {
      setError("Los campos Username y Email son obligatorios.");
      return;
    }
    setError('');
    setProfile(tempProfile);
    console.log('Perfil actualizado:', tempProfile);
    toggleModal();
  };

  return (
    <section className="vh-100 d-flex">
     <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">


        <Row className="justify-content-center w-100">
          <Col lg="8">
            <Card className="profile-card mb-3 h-100">
              <Row className="g-0 h-100">
                <Col md="4" className="gradient-custom text-center text-white profile-card-left ">
                  <CardImg src={ProfilePhoto} alt="Avatar" className="my-5 profile-image" fluid />
                  <div className="profile-admin">
                    <h4 className="mb-0">{profile.username}</h4>
                    <Button color="success" outline size="sm" onClick={toggleModal}>
                      <CIcon icon={cilSettings} /> Editar
                    </Button>
                  </div>
                </Col>
                <Col md="8">
                  <CardBody className="p-4">
                    <h6>Información de Perfil</h6>
                    <hr className="mt-0 mb-4" />
                    <Row className="pt-1">
                      <Col sm="6" className="mb-3">
                        <h6>Username</h6>
                        <CardText className="text-muted">{profile.username}</CardText>
                      </Col>
                      <Col sm="6" className="mb-3">
                        <h6>Email</h6>
                        <CardText className="text-muted">{profile.email}</CardText>
                      </Col>
                    </Row>
                    <hr className="mt-0 mb-4" />
                    <Row className="pt-1">
                      <Col sm="6" className="mb-3">
                        <h6>Nombres</h6>
                        <CardText className="text-muted">{profile.nombres}</CardText>
                      </Col>
                      <Col sm="6" className="mb-3">
                        <h6>Apellido</h6>
                        <CardText className="text-muted">{profile.apellido}</CardText>
                      </Col>
                    </Row>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal para editar perfil */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Editar Perfil</ModalHeader>
        <ModalBody>
          {error && <div className="text-danger mb-3">{error}</div>}
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={tempProfile.username}
              onChange={handleChange}
              className="mb-3"
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={tempProfile.email}
              onChange={handleChange}
              className="mb-3"
            />
          </FormGroup>
          <FormGroup>
            <Label for="nombres">Nombres</Label>
            <Input
              id="nombres"
              name="nombres"
              value={tempProfile.nombres}
              onChange={handleChange}
              className="mb-3"
            />
          </FormGroup>
          <FormGroup>
            <Label for="apellido">Apellido</Label>
            <Input
              id="apellido"
              name="apellido"
              value={tempProfile.apellido}
              onChange={handleChange}
              className="mb-3"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
          <Button color="primary" onClick={handleSave}>Guardar Cambios</Button>
        </ModalFooter>
      </Modal>
    </section>
  );
}