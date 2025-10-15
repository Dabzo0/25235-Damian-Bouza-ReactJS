import { Container } from 'react-bootstrap';

const LoginFail=()=> {
  return (
    <Container className="mt-4">
        <h1>Ups !!</h1>
        <h2>Requiere autentificación para acceder a la ruta especificada.</h2>
    </Container>
  );
}
export default LoginFail;