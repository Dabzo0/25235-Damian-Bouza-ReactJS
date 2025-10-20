import React, { useEffect, useState} from "react";
import { Card, Spinner } from "react-bootstrap";

const FichaUsuario=()=>{
    const [usuario,setUsuario]=useState({});
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        fetch(`https://randomuser.me/api/?seed=${localStorage.getItem('auth')}`) // Este fetch deberia cargar UsuarioData solo con el ID de usuario.

            .then(res => {
                if (!res.ok) { throw new Error('Error de red o respuesta del servidor fallida');}
                return res.json();
            })// Es caso de haya conexión, pero el servidor responde que la solicitud es inválida o que él falló.

            .then(data=>{
                setUsuario(data.results[0]);
            })
            
            .catch(error=>{
                console.error('Error al cargar usuario',error)
                alert('No se pudo cargar el usuario. Inténtalo de nuevo.');
            })// No hay conexión con el servidor.

            .finally(() => {
                setLoading(false); // Siempre desactiva el loading, sin importar el resultado
            })
    },[])

    if (loading){
        return(
        <div>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2"/>
            Buscando Datos...
        </div>)
    }
    

    return(
            <div className="d-flex justify-content-center mt-4">
                <Card>
                    <Card.Img  variant='top' src={usuario.picture.large}/>
                    <Card.Body>
                        {/*<h3>{usuario.nivel.toUpperCase()}</h3>*/}
                        <Card.Title>
                        <strong>{localStorage.getItem('nivel').toUpperCase()}: </strong>
                        {usuario.name.first}; {usuario.name.last}
                        </Card.Title>
                        <Card.Text>
                        <strong>Email: </strong>{usuario.email}<br />
                        <strong>Ciudad: </strong> {usuario.location.city}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>       
    )
}

export default FichaUsuario;