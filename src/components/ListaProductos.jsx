import {useEffect,useState,useContext} from 'react';
import {Row,Col,Spinner}from 'react-bootstrap';
import CardProducto from './CardProducto';
import { CategoriaSeleccionada } from '../contexts/SelectorCategoria';

const ListaDeProductos=()=>{
    const [productos,setProductos]=useState([]);
    const [loading,setLoading]=useState(true);
    const { categoriaElegida } = useContext(CategoriaSeleccionada);

    const handleAgregarAlCarrito=(producto)=>{
        alert(`Se agregó al carrito: ${producto.title} `);
    };

    

   useEffect(()=>{
        setLoading(true);
        const url =
            categoriaElegida === 'Todos los productos'
            ? 'https://fakestoreapi.com/products'
            : `https://fakestoreapi.com/products/category/${(categoriaElegida)}`;


        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProductos(data);
                setLoading(false);                
            })
            .catch((error)=>{
                console.error('error fetching data: ',error);
                setLoading(false);
            });
    },[categoriaElegida]);

    if (loading)  {
        return(
            <div>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2"/>
                Buscando productos...
            </div>
        )
    };
    
    return(
        <Row className="justify-content-center">
            {productos.map((producto)=> (
                <Col
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3} 
                    key={producto.id}
                    className="mb-4">
                    <CardProducto producto={producto} AgregarAlCarrito={handleAgregarAlCarrito}/>
                </Col>
            ))
            }
        </Row>
    );
                  
};

export default ListaDeProductos;