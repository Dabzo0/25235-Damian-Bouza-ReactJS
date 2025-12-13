import { useEffect, useState } from 'react';
import { Row, Col, Spinner, Container, Form }from 'react-bootstrap';
import CardProducto from './CardProducto';
import ListaDeCategorias from './ListaCategoria'
import { filtrarProductos } from '../Utils/filtrarProducto';

const ListaDeProductos=()=>{
    const [productos,setProductos]=useState([]);
    const [productoABuscar, setProductoABuscar] =useState('');
    const [categoriaElegida,setCategoriaElegida] = useState('');
    const [todosLosProductos,setTodosLosProductos]=useState([]);
    const [loading,setLoading]=useState(true);

    const handleAgregarAlCarrito=(producto)=>{
        alert(`Se agregó al carrito: ${producto.nombre} `);
    };

    const normalizarFakestore=(data)=>{
        const datosNormalizados= data.map((prod) =>{
            return{
                'nombre': prod.title,
                'descripcion': prod.description,
                'precio': prod.price,
                'stock':15,
                'descuento': 0,
                'imagen': prod.image,
                'io': true,
                'preciofinal': prod.price,
                'categoria': prod.category,
                'id': 'F'+prod.id             
            } 
        })

        return datosNormalizados
    }

    useEffect(()=>{
        setLoading(true);
        const urlMockapi = 'https://69093d7f2d902d0651b316ac.mockapi.io/productos';
        const urlFakestoreapi = 'https://fakestoreapi.com/products';
        let datosMockapi=[];
        fetch(urlMockapi)
            .then(response => {
                if (!response.ok) {throw new Error(`Error HTTP: ${response.status}`);}
                return response.json()
            })
            .then(data => {
                datosMockapi = data;
                return fetch(urlFakestoreapi)
            })
            .then(response=>{
                if (!response.ok) {throw new Error(`Error HTTP: ${response.status}`);}
                return response.json()
            })
            .then(data2=>{
                const datos2=normalizarFakestore(data2);
                const listaTodos = [...datosMockapi, ...datos2];
                const listaSoloVivos = listaTodos.filter(prod => prod.io === true)
                setTodosLosProductos(listaSoloVivos);
                setProductos(listaSoloVivos.sort((a,b)=>{ return a.nombre.localeCompare(b.nombre);}))
            })                                  
            .catch((error)=>{
                console.error('error fetcheo de datos: ',error);
            })
            .finally(()=>{
                setLoading(false);
            });
    },[]);

    useEffect(()=>{
        const resultadoProductos =filtrarProductos(todosLosProductos,productoABuscar,categoriaElegida,false); 
        setProductos(resultadoProductos)

    },[categoriaElegida,productoABuscar]);

    if (loading)  {
        return(
            <div>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2"/>
                Buscando productos...
            </div>
        )
    };
    
    return(
        <Container>
            <Row className="align-items-end mt-2 mb-3">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label className="fw-bold mb-0">Buscar producto</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Buscar coincidencias parciales..."
                        value={productoABuscar}
                        onChange={(e)=> setProductoABuscar(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={5}>
                    <Form.Label className="fw-bold mb-0">Categoíra</Form.Label>
                    <Form.Group controlId="selCategoría">
                        <ListaDeCategorias
                            tipo={false}
                            value={categoriaElegida}
                            onChange={(e)=> setCategoriaElegida(e.target.value)}>
                        </ListaDeCategorias>
                    </Form.Group>
                </Col>
            </Row>
            {/*</Row><Col md={3} className="text-end">
            <Button
                onClick={() => irACarrito()}> 
                Mi carrito
            </Button>
            </Col>  */}

            <Row className="justify-content-center">
                {productos.length === 0 && !loading && (
                    <Col xs={12} className="mt-5 text-center">
                        <div className="alert alert-info" role="alert">
                            <h2> No se encontraron productos</h2>
                        </div>
                    </Col>
                )}
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
                ))}
            </Row>
        </Container>
    );
                  
};

export default ListaDeProductos;