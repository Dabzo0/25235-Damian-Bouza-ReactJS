import { Container } from 'react-bootstrap';
import ListaProductos from '../components/ListaProductos';
import { CategoriasProductosContext } from '../contexts/SelectorCategoria'


const Productos=()=> {  
  return (    
    <CategoriasProductosContext>
      <Container className="mt-4">        
        <h2>Productos</h2>
        <ListaProductos className='mt-4'/>
      </Container>
    </CategoriasProductosContext>
  );
}
export default Productos;