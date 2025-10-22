import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import './App.css' <-- Puede que en algun necesite recurrir a CSS por estilos que bootstrap no provee
import Header from './components/Header'
import Footer from './components/Footer'
import RutaProtegidaUsuario from './components/RutaProtegidaUsuario'
import RutaProtegidaAdmin from './components/RutaProtegidaAdmin'
import Administracion from './pages/Administracion'
//import Inicio from './pages/Inicio' <-- Puede que en un futuro se agregue una pagina de inicio a la web
import NoEncontrado from './pages/NoEncontrado'
import Perfil from './pages/Perfil'
import Productos from './pages/Productos'
import LoginFail from './pages/LoginFail'


function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter basename='/25235-Damian-Bouza-ReactJS'>
          <Header />
            <div className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Productos />} /> {/* Puede que en algun futuro se incorpore una pagino de inicio*/}
                <Route path="/productos" element={<Productos />} />
                <Route path="/perfil/:id" element={<RutaProtegidaUsuario><Perfil /></RutaProtegidaUsuario>} />
                <Route path="/admin" element={<RutaProtegidaAdmin><Administracion /></RutaProtegidaAdmin>} />
                <Route path="/loginFail" element={<LoginFail />}/>
                <Route path="*" element={<NoEncontrado />} />
              </Routes>
            </div>   
          <Footer />
    </BrowserRouter>
    </div>
  )
}

export default App
