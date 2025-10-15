import React, {useEffect,useState} from 'react';
import {Row,Col,Spinner}from 'react-bootstrap';
import CardProducto from './CardProducto';

const ListaDeProductos=({categoria="electronics"})=>{
    const [productos,setProductos]=useState([]);
    const [loading,setLoading]=useState(true);

    const handleAgregarAlCarrito=(producto)=>{
        alert(`Se agregó al carrito: ${producto.title} `);
    };

    useEffect(()=>{
        fetch(`https://fakestoreapi.com/products/category/${categoria}`)
            .then(response => response.json())
            .then(data => {
                setProductos(data);
                setLoading(false);

            })
            .catch((error)=>{
                console.error('error fetching data: ',error);
                setLoading(false);
            });
    },[categoria]);    

    if (loading)  {
        return(
            <div>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2"/>
                Buscando productos...
            </div>
        )
    };
    
    return(
        <Row>
            {productos.map((producto)=> (
                <Col md={3} key={producto.id} className="mb-4">
                    <CardProducto producto={producto} AgregarAlCarrito={handleAgregarAlCarrito}/>
                </Col>
            ))
            }
        </Row>
    );
                  
};

export default ListaDeProductos;