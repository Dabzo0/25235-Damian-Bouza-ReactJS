import React, { useState } from 'react';
import { Button, Modal ,Container, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const VentanaLogin = () => {
  const navigate = useNavigate();

  {/*Estado para controlar la visibilidad del Modal*/}
  const [show, setShow] = useState(false);
  {/*Estado Loading del boton Ingresar*/}
  const [loading, setLoading] = useState(false);

  {/*Funciones para abrir y cerrar*/}
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = () => {
    setLoading(true); // Al iniciar
    localStorage.setItem('auth', 'true');
    setShow(false);
    setLoading(false);
    navigate('/perfil/AdminPro');
  };


  return (
    <>
      {/* Botón que activa la mini-ventana */}
      <Button variant="primary" onClick={handleShow}>Loguin</Button>

      {/*EL COMPONENTE MODAL (LA MINI-VENTANA)*/}
      <Modal 
        show={show} // Controla la visibilidad con el estado 'show'
        onHide={handleClose} 
        centered 
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fw-bold mb-2">Iniciar sesión</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" placeholder='Ingrese usuario' required />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder='Ingrese contraseña' required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2"/>
                      Ingresando...
                    </>
                  ) : (
                    'Ingresar'
                  )}
                </Button>
            </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VentanaLogin;