import React from 'react';
import { Container} from 'react-bootstrap'
import CarritoProductos from '../components/CarritoProductos.jsx';


const MiCarrito=()=> {
  return (
    <Container className="mt-4">
      <h2>Mi carrito</h2>
      <CarritoProductos/>      
    </Container>
  );
}
export default MiCarrito;