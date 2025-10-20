import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login'
import { useContext } from 'react';
import { UsuarioData } from '../contexts/UsuarioReconocido';

export default function Header() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('auth') === 'true';
  const { usuario } = useContext(UsuarioData);

  const cerrarSesion = () => {
        localStorage.removeItem('auth');
        navigate('/');
    };


 
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/"><h2>[BBH] Better Buy Here!!!</h2></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>

          <Nav className="me-auto">
            {/* Pue que en algun momento utilice esta etiqueta! XD
            
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            
            {/* Enlaces que solo se muestran si el usuario está autenticado*
            {isAuth && (
              <>
                <Nav.Link as={Link} to="/perfil/usuario">Perfil</Nav.Link>
                <Nav.Link as={Link} to="/admin">Administrar</Nav.Link>
              </>
            )}*/}
          </Nav>   
        
          <Nav >
            <Nav.Link as={Link} to="/">Comprar</Nav.Link>
            {/* Mostrar botón de "Login" o "Cerrar seción" según autenticación */}
            {!isAuth ? (
              <Login/>
            ) : (
              <>
              <Nav.Link as={Link} to="/perfil/usuario">Perfil</Nav.Link>
              {usuario?.nivel === 'administrador' && (
                <Nav.Link as={Link} to="/admin">Administrar</Nav.Link>
              )}
              <Button variant="outline-light" onClick={cerrarSesion}>Cerrar sesión</Button>
              </>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}