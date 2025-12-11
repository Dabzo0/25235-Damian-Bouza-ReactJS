import { useState, useEffect} from 'react';
import { Container, Button, Table, Form, Row, Col} from 'react-bootstrap'
import AdminProductosModal from './AdminProductosModal';

const AdminProductos=()=> {
  const urlMockapi = 'https://69093d7f2d902d0651b316ac.mockapi.io/productos';

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal,setShowModal]= useState(false);
  const [productoSeleccionado,setProductoSeleccionado]= useState(null);
  
  const [productoABuscar, setProductoABuscar] = useState('');
  const [verBorrados, setVerBorrados] = useState(false); 
  const [filtroProductos, setFiltroProductos] = useState([]);

  const obtenerProductos = () => {
    setLoading(true);
    fetch(urlMockapi)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProductos(data);
      })
      .catch(error => {
        console.error("Error al obtener los productos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filtrarProductos = () => {
        let lista = [...productos];

        lista = lista.filter(prod => prod.io === !verBorrados);

        if (productoABuscar.trim() !== '') {
            lista = lista.filter(prod =>
                prod.nombre && prod.nombre.toUpperCase().includes(productoABuscar.toUpperCase().trim())
            );
        }
        setFiltroProductos(lista);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
        // Llama a filtrarProductos cada vez que productos, productoABuscar o verBorrados cambian.
        filtrarProductos(productos);
    }, [productos, productoABuscar, verBorrados]);

  const handleFiltroProductos = (e) => {
        setProductoABuscar(e.target.value);
    };

  const handleVerBorrados = (e) => {
        setVerBorrados(e.target.checked);
    };
  
  const handleSuccess = () => {
        obtenerProductos(); // Esto llama a obtenerProductos, que a su vez llama a aplicarFiltros
        // También puedes simplemente llamar aplicarFiltros(searchTerm, showDeleted, productos) aquí
    };

  if (loading) return <p>Cargando datos...</p>;

  const abrirModal = (producto = null) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  return(
    <Container>
      <Row className="align-items-end mt-2 mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-bold mb-0">Buscar por Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar coincidencias parciales..."
              value={productoABuscar}
              onChange={handleFiltroProductos}
            />
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="checkBorrados">
            <Form.Check
              type="checkbox"
              label="Ver productos eliminados."
              checked={verBorrados}
              onChange={handleVerBorrados}
              className="mt-4"
            />
          </Form.Group>
        </Col>
        <Col md={3} className="text-end">
          <Button
              onClick={() => abrirModal()}> 
              + Agregar Nuevo Producto
          </Button>
        </Col>     
      </Row>  
        <Table striped bordered hover className='mt-2'>
            <thead className="thead-dark">
            <tr>
                <th style={{ width: '70px' }}></th>
                <th>Producto</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Precio</th>
                <th style={{ width: '150px' }}></th> 
            </tr>
            </thead>
            <tbody>
            {filtroProductos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No se encontraron productos con los filtros aplicados.
                </td>
              </tr>
            ):
            (filtroProductos.map((producto) => (
                <tr key={producto.id}>
                <td className="align-middle text-center">
                    <img 
                    src={producto.imagen}
                    alt={producto.nombre} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    className="img-thumbnail"
                    />
                </td>
                <td>
                    <div className="fw-bold">{producto.nombre}</div>
                    <small className="text-muted">{producto.descripcion.substring(0,30)}.-</small>
                </td>
                <td className="text-end">{producto.stock}</td>
                <td className="text-end">
                    {producto.descuento>0?(
                    <div>
                        <span className="text-decoration-line-through me-2">
                        ${producto.precio}
                        </span>
                        <span >
                        ${(producto.precio*(1-producto.descuento/100)).toFixed(2)}
                        </span>
                        <div>
                        {producto.descuento}% OFF
                        </div>
                    </div>
                    ):(
                    <span>
                        $ {producto.precio}
                    </span>
                    )}
                </td>              
                <td className="text-end align-middle">
                    <Button 
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => abrirModal(producto)}>
                        Editar
                    </Button>
                </td>
                </tr>
            )))}
            </tbody>
        </Table>
        <AdminProductosModal 
            show={showModal}
            producto={productoSeleccionado}
            onClose={() => setShowModal(false)}
            onSuccess={obtenerProductos}
        />
    </Container>
  )
};

export default AdminProductos;
