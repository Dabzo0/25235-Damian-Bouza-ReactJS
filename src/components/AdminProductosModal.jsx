import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ListaDeCategorias from './ListaCategoria'

const AdminProductosModal = ({ show, producto, onClose, onSuccess }) => {
  const [datosProducto, setDatosProducto] = useState({});
  const [loading, setLoading] = useState(false);
  const [categoria,setCategoria]=useState('');
  
  useEffect(() => {
    if (producto) {
      setDatosProducto(producto);
      setCategoria(producto.categoria||'');      
    } else {
      setDatosProducto({ nombre: '', descripcion: '', precio: 0, stock: 0, descuento: 0, imagen: '', io: true, preciofinal: 0, categoria:''});
      setCategoria('');
    }
  }, [producto, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosProducto({
      ...datosProducto,
      [name]: value
    });
  };

  const urlMockapi = 'https://69093d7f2d902d0651b316ac.mockapi.io/productos'; // Esto tambiém podría ser un parámetro
  
  const validarNombreDisponible = () => {
    const urlBusqueda = `${urlMockapi}/?nombre=${encodeURIComponent(datosProducto.nombre)}`;

    return fetch(urlBusqueda)
      .then(response => {
        if (response.status === 404) {// MockApi devuelve 404 si no encuntra coincidencias (total o parcial), por lo que si la API dice 404 (No Encontrado), se lo trata como éxito (array vacío)
            return []; 
        }
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const resultadoMapeado = data.map(producto => ({
            nombre: producto.nombre.toUpperCase().trim(),
            id: producto.id
        }));
        const coincidenciaExacta = resultadoMapeado.filter(prod => {
            return prod.nombre === datosProducto.nombre.toUpperCase().trim(); 
        });
        const esDuplicado = coincidenciaExacta.find(item => item.id !== datosProducto.id);
        if(esDuplicado){throw new Error('Dupe');}
        return datosProducto;
      })     
  };

  const normalizarDatos= ()=>{
    let descripcion=(datosProducto.descripcion || '').trim();
    if (descripcion===""){descripcion="Sin descripción.";}

    let precioInicial = parseFloat(datosProducto.precio || 0);
    if (isNaN(precioInicial)) {precioInicial = 0;}
    if (precioInicial<0){precioInicial=precioInicial*-1;}
    const precioRedondeado = parseFloat(precioInicial.toFixed(2));

    let stock=parseInt(datosProducto.stock || 0);
    if (isNaN(stock)) {stock = 0;}
    if (stock<0){stock=0;}

    let descuento=parseInt(datosProducto.descuento || 0);
    if (isNaN(descuento)) {descuento = 0;}
    if (descuento<0){
      descuento=0;
      }else{
        if (descuento>100){descuento=100;}
    }

    const imagen= (datosProducto.imagen || '').trim()===""?'https://picsum.photos/id/0/200':(datosProducto.imagen || '').trim();
    //if (imagen===""){imagen='https://picsum.photos/id/0/200';}

    const precioFinal = parseFloat((precioRedondeado*(1-descuento/100)).toFixed(2))

    const io=true;

    return{
      ...datosProducto,
      'descripcion':descripcion,
      'precio': precioRedondeado,
      'stock':stock,
      'descuento': descuento,
      'imagen': imagen,
      'io': io,
      'preciofinal':precioFinal,
      'categoria':categoria
    } 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    validarNombreDisponible()
      .then(datosValidos=>{
        const isEditing = !!datosProducto.id; //devuelve numero o falso
        const url = isEditing ? `${urlMockapi}/${datosProducto.id}` : urlMockapi;
        const method = isEditing ? 'PUT' : 'POST';
        const datosNormalizados=normalizarDatos();
        return fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datosNormalizados)
        })
        .then(response => {
          if (!response.ok) throw new Error('Error al guardar');
          return response.json();
        })  
      })
      .then(() => {
        onSuccess();
        onClose();
      })
      .catch(error=>{
        if (error.message === 'Dupe') {
              alert(`El nombre "${datosProducto.nombre}" ya está en uso.`);
            } else{
              alert(error.message);
        }
      })
      .finally(()=>{
        setLoading(false);
      })
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);

    const url = `${urlMockapi}/${datosProducto.id}`;
    
    // Eliminación lógica
    if (datosProducto.io) {
        const productoParaSoftDelete = { ...datosProducto, 'io': false };
        
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoParaSoftDelete)
        })
        .then(response => {
            if (!response.ok) throw new Error('Error al realizar eliminación');
            return response.json();
        })
        .then(() => {
            alert(`Producto "${datosProducto.nombre}" se ha eliminado.`);
            onSuccess();
            onClose();
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        })
        .finally(() => {
            setLoading(false);
        });
    } 
    // Eliminación definitiva
    else {
        if (!window.confirm(`¿Estás seguro de ELIMINAR DEFINITIVAMENTE el producto "${datosProducto.nombre}"? Esta acción no se puede deshacer.`)) {
            setLoading(false);
            return; 
        }

        fetch(url, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) throw new Error('Error al eliminar definitivamente');
            alert(`Producto "${datosProducto.nombre}" eliminado definitivamente.`);
            onSuccess();
            onClose();
        })
        .catch(error => {
            alert(`Error de borrado definitivo: ${error.message}`);
        })
        .finally(() => {
            setLoading(false);
        });
    }
};

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{producto ? 'Editar Producto' : 'Agregar Nuevo'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={datosProducto.nombre} onChange={handleChange} required disabled={!datosProducto.io}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control name="precio" value={datosProducto.precio} onChange={handleChange} type="number" step="0.01" disabled={!datosProducto.io}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control name="stock" value={datosProducto.stock} onChange={handleChange} type="number" disabled={!datosProducto.io}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descuento</Form.Label>
            <Form.Control name="descuento" value={datosProducto.descuento || 0} onChange={handleChange} type="number" disabled={!datosProducto.io}/>
            <Form.Text>Precio final: ${(datosProducto.precio*(1-datosProducto.descuento/100)).toFixed(2)}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <ListaDeCategorias tipo={true} value={categoria} onChange={(e)=> setCategoria(e.target.value)} disabled={!datosProducto.io}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" name="descripcion" value={datosProducto.descripcion || ''} onChange={handleChange} disabled={!datosProducto.io}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imágen</Form.Label>
            <Form.Control name="imagen" value={datosProducto.imagen || ''} onChange={handleChange} disabled={!datosProducto.io}/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {producto && ( // Solo se muestra si se está editando un producto existente
            <Button variant={datosProducto.io ? "danger" : "dark"} onClick={handleDelete} disabled={loading}>
                {datosProducto.io ? 'Eliminar' : 'Eliminar Definitivamente'}
            </Button>
          )}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : (producto ? (datosProducto.io?'Guardar Cambios':'Recuperar') : 'Agregar Producto')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AdminProductosModal;