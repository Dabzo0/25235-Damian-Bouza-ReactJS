import { useState } from 'react';
import { Button, Modal ,Spinner, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const VentanaLogin = () => {
  
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [esAdmin, setEsAdmin] = useState(false);


  {/*Controles de estado para la visibilidad del Modal*/}
  const [show, setShow] = useState(false);
  {/*Control de estado Loading del boton Ingresar*/}
  const [loading, setLoading] = useState(false);

  {/*Funciones para abrir y cerrar*/}
  const handleClose = () => {
    setShow(false)
    setUsuario('');
    setContrasena('');
    setEsAdmin(false);
  };
  //const handleShow = () => setShow(true);

  const handleEsAdmin = (e) => {
    const isChecked = e.target.checked;
    setEsAdmin(isChecked); // Actualiza el estado de administrador

    // Si el checkbox está marcado, autocompleta los campos
    if (isChecked) {
      setUsuario('Admin');
      setContrasena('1234');
    } else {
      // Si se desmarca, limpia los campos (o puedes dejar el valor anterior si lo prefieres)
      setUsuario('');
      setContrasena('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();// Previene el recargo de la página por el formulario
    setLoading(true); // Al iniciar   
    
    fetch('https://randomuser.me/api') // Este fetch deberia cargar UsuarioData solo con el ID de usuario.

      .then(res => {
        if (!res.ok) { throw new Error('Error de red o respuesta del servidor fallida');}
        return res.json();
      })// Es caso de haya conexión, pero el servidor responde que la solicitud es inválida o que él falló.

      .then(data=>{
        localStorage.setItem('auth', data.info.seed);
        localStorage.setItem('nivel', esAdmin ? 'administrador' : 'usuario');
        setShow(false);
        navigate('/');
      })
      
      .catch(error=>{
        console.error('Error al cargar usuario',error)
        alert('No se pudo cargar el usuario. Inténtalo de nuevo.');
      })// No hay conexión con el servidor.

      .finally(() => {
        setLoading(false); // Siempre desactiva el loading, sin importar el resultado
      }) 
  }

  return (
    <>
      {/* Botón que moestra el modal */}
      <Button variant="primary" onClick={() => setShow(true)}>Loguin</Button>

      {/*EL COMPONENTE MODAL (LA MINI-VENTANA)*/}
      <Modal 
        show={show} // Controla la visibilidad con el estado 'show'
        onHide={handleClose} 
        centered>
      
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fw-bold mb-2">Iniciar sesión</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form onSubmit={handleLogin}>

            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder='Ingrese usuario'
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder='Ingrese contraseña'
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="administradorCheck">
              <Form.Check
                type="checkbox"
                label="Ingresar como administrador"
                checked={esAdmin}
                onChange={handleEsAdmin}
              />
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