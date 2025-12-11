import React from 'react';
import { Container} from 'react-bootstrap'
import AdminProductos from '../components/AdminProductos';


const Administracion=()=> {
  return (
    <Container className="mt-4">
      <h2>Administración</h2>
      <AdminProductos/>      
    </Container>
  );
}
export default Administracion;