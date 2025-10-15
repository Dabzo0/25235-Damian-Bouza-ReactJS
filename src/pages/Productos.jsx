import { Container } from 'react-bootstrap';
import ListaProductos from '../components/ListaProductos';

const Productos=()=> {
  return (
    <Container className="mt-4">
      <h2>Productos</h2>
      <ListaProductos />

    </Container>
  );
}
export default Productos;