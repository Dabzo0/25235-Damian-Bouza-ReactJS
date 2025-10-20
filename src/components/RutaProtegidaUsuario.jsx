import { Navigate } from "react-router-dom";

const RutaProtegidaUsuario=({children})=>{
    const auth=!!localStorage.getItem('auth');
    return auth ? children : <Navigate to="/loginFail" />  
};

export default RutaProtegidaUsuario;

