import { Container } from 'react-bootstrap';
import ListaCategoria from '../components/ListaCategoria';
import ListaProductos from '../components/ListaProductos';
import { CategoriasProductosContext } from '../contexts/SelectorCategoria'


const Productos=()=> {  
  return (    
    <CategoriasProductosContext>
      <Container className="mt-4">        
        <h2>Productos</h2>      
        <ListaCategoria className='mb-2'/>
        <ListaProductos />
      </Container>
    </CategoriasProductosContext>
  );
}
export default Productos;