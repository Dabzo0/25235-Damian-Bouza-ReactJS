import { Container } from 'react-bootstrap';
import FichaUsuario from '../components/FichaUsuario';

const PerfilUsuario=()=>{
  
  return (    
    <Container className="mt-4">
      <h2>Perfil del usuario</h2>
      {!!localStorage.getItem('auth')?(
        <FichaUsuario />
      ):(
        <div className="d-flex justify-content-center mt-4">
        <p>Por favor, inicia sesión para ver tu perfil.</p>
        </div>
      )}      
    </Container>          
  );
}

export default PerfilUsuario;