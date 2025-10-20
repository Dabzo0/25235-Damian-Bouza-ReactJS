import { useContext } from 'react';
import { Card, Container } from 'react-bootstrap';
import {UsuarioData} from '../contexts/UsuarioReconocido';

const PerfilUsuario=()=>{
  const {usuario}=useContext(UsuarioData)

  // Esta validacion no es estictamente necesaria, pero "a veces pasan cosas"! XD
  if (!usuario || Object.keys(usuario).length === 0) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <p>Por favor, inicia sesión para ver tu perfil.</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Perfil del usuario</h2>
      <div className="d-flex justify-content-center mt-4">
        <Card>
          <Card.Img  variant='top' src={usuario.picture.large}/>
          <Card.Body>
            {/*<h3>{usuario.nivel.toUpperCase()}</h3>*/}
            <Card.Title>
              <strong>{usuario.nivel.toUpperCase()}: </strong>
              {usuario.name.first}; {usuario.name.last}
            </Card.Title>
            <Card.Text>
              <strong>Email: </strong>{usuario.email}<br />
              <strong>Ciudad: </strong> {usuario.location.city}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Container>          
  );
}

export default PerfilUsuario;