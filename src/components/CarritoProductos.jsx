import React, {useState} from 'react';
import { useCarrito } from '../contexts/CarritoContext';
import { Container, Button, Table, Row, Col, Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark, faPlus, faMinus, faMoneyCheckDollar} from "@fortawesome/free-solid-svg-icons";

const CarritoProductos=() => {
    // Traer lo que se necesita del contexto
    const { carrito, agregarProducto, quitarProducto, eliminarDelCarrito, vaciarCarrito, total } = useCarrito();

    const [showModal,setShowModal]=useState(false);

    const finalizarCompra=()=>{
        // Aquí se envía el carrito a la api "ventas" para finalizar la gention de la compra
        setShowModal(true);
        vaciarCarrito();

    };

    return(
        <>
        <Container>
            {/*<thead className="thead-dark">
            </thead>*/}
            {carrito.length === 0 ? (
                <p>El carrito está vacío.</p>
                ) : (
                    <>
                    <Table striped bordered hover className='mt-2'>
                        <tbody>
                            {carrito.map(item => (
                                <tr key={item.id}>
                                    <td style={{ width: '60px' }} className='align-middle'>
                                        <div className='d-flex justify-content-center'>
                                            <Button 
                                                className="d-flex align-items-center justify-content-center"
                                                onClick={() => eliminarDelCarrito(item.id)}
                                                style={{ width: '30px', height:'30px', padding:'0'}}
                                                variant="danger"
                                                >
                                                <FontAwesomeIcon icon={faXmark}/>
                                            </Button>
                                        </div>
                                    </td>
                                    <td className='text-center align-middle fw-bold'>
                                        {item.cantidad} 
                                    </td>
                                    <td>
                                        <div>
                                            {item.nombre}
                                        </div>
                                        <div>
                                            {item.descuento>0?(
                                                <>
                                                <span className="fs-9 me-2">Precio: 
                                                    <span className="fs-9 text-decoration-line-through me-2"> ${item.precio*item.cantidad}</span>
                                                    ${item.preciofinal} ( {item.descuento}% OFF )
                                                </span>
                                                <span className="fw-bold text-success fs-9 me-2">Subtotal: ${item.preciofinal*item.cantidad}</span>
                                                </>
                                                ):(
                                                    <>
                                                    <span className="fs-9 me-2">Precio: ${(item.precio).toFixed(2)}</span>
                                                    <span className="fs-9 fw-bold text-success me-2">Subtotal: ${(item.precio*item.cantidad).toFixed(2)}</span>
                                                    </>
                                                )
                                            }
                                        </div>                                          
                                    </td>
                                    <td style={{ width: '200px' }} className='align-middle'>
                                        <div className='d-flex justify-content-end'>
                                            <Button 
                                                onClick={() => quitarProducto(item.id)} 
                                                style={{ width: '30px', height:'30px', padding:'0'}} 
                                                className="me-4 d-flex align-items-center justify-content-center"
                                                variant="outline-danger"
                                                >
                                                <FontAwesomeIcon icon={faMinus}/>
                                            </Button>
                                            <Button
                                                onClick={() => agregarProducto(item)}
                                                style={{ width: '30px', height:'30px',padding:'0' }}
                                                className="d-flex align-items-center justify-content-center"
                                                variant="outline-success"
                                                >
                                                <FontAwesomeIcon icon={faPlus}/>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <hr />
                    <Row>
                        <Col md={2} className='text-center align-middle'>
                            <Button onClick={vaciarCarrito} variant="outline-warning">
                                <FontAwesomeIcon icon={faTrash} className="me-2"/>
                                Vaciar Carrito
                            </Button>
                        </Col>
                        <Col md={10} className='text-end align-top fw-bold'>
                            Total a pagar: ${total}
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-end'>
                        <Button onClick={finalizarCompra} variant="outline-success">
                                <FontAwesomeIcon icon={faMoneyCheckDollar} className="me-2"/>
                                Finalizar compra
                            </Button>
                    </div>
                </>
            )}   
        </Container>
        <Modal
            show={showModal}
            onHide={()=>setShowModal(false)}
            >
            <Modal.Header closeButton>
                <Modal.Title>Compra Finalizada</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>¡Gracias por tu compra!</p>
            </Modal.Body>
            <Modal.Footer>
                <p>Un gerentede ventas te contactará a la brebedad para coordinar el pago y el envío de los productos.</p>
            </Modal.Footer>
        </Modal>
        </>
    )
};

export default CarritoProductos;