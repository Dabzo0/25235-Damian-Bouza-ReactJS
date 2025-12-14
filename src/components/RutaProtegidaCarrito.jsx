import { Navigate } from "react-router-dom";

const RutaProtegidaCarrito=({children})=>{
    const auth=!!localStorage.getItem('auth');
    return auth ? children : <Navigate to="/loginFail" />  
};

export default RutaProtegidaCarrito;
