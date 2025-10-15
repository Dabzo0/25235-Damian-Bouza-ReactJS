import React from "react";
import {Card,Button} from 'react-bootstrap';

const CardProducto=({producto,AgregarAlCarrito})=>{
    return(
        <Card className="h-80 d-flex flex-column">
            <Card.Img variant="top" src={producto.image} alt={producto.title}  />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.title}</Card.Title>
                <Card.Text>
                    <h3>$ {producto.price}</h3>
                </Card.Text>
                <Button variant="primary" onClick={()=>AgregarAlCarrito(producto)}>
                    Agregar al carrito
                </Button>
            </Card.Body>
        </Card>
    )
};
export default CardProducto;