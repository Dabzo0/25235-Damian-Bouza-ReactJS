import React from "react";
import {Card,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const CardProducto=({producto,AgregarAlCarrito})=>{
    const isAuth = !!localStorage.getItem('auth');
    //const handleClick = () => {
        //AgregarAlCarrito(producto); 
    //};
    return(
        <Card className="h-80 d-flex flex-column rounded-3 shadow-lg"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                cursor: 'default',
                maxWidth: '250px'
            }}>

            <Card.Img
                variant="top"
                src={producto.imagen}
                alt={producto.nombre}
                className="rounded-top-3"
                style={{ height: '200px', objectFit: 'contain' }}
            />

            <Card.Body className="d-flex flex-column">
                <Card.Title
                    className="text-truncate" 
                    title={producto.nombre}
                >{producto.nombre}</Card.Title>

                <Card.Text 
                    className="flex-grow-1 fs-3 text-success">
                    $ {producto.precio}
                </Card.Text>

                <Button
                    variant="primary"
                    onClick={()=>AgregarAlCarrito(producto)}
                    className="mt-auto border-top pt-2"
                    disabled={!isAuth}>
                    <FontAwesomeIcon icon={faCartPlus} className="me-2" />
                    {/*<FontAwesomeIcon icon={faCartPlus} style={{color: "#ffffff",}} />*/}
                Agregar al carrito</Button>
            </Card.Body>
        </Card>
    )
};
export default CardProducto;