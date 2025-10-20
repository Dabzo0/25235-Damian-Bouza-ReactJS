import { Navigate } from "react-router-dom";

const RutaProtegidaAdmin=({children})=>{
    const nivel=localStorage.getItem('nivel')==='administrador';
    return nivel ? children : <Navigate to="/loginFail" />  
};

export default RutaProtegidaAdmin;