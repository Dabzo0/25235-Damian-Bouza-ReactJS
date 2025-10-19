import { Navigate } from "react-router-dom";

const RutaProtegida=({children})=>{
    const auth=localStorage.getItem('auth')==='true';
    return auth ? children : <Navigate to="/loginFail" />  
};

export default RutaProtegida;