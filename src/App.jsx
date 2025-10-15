import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { useState } from 'react'
//import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import RutaProtegida from './components/RutaProtegida'
import Administracion from './pages/Administracion'
import Inicio from './pages/Inicio'
import NoEncontrado from './pages/NoEncontrado'
import Perfil from './pages/Perfil'
import Productos from './pages/Productos'
import LoginFail from './pages/LoginFail';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
    <BrowserRouter>
      <Header />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/perfil/:id" element={<RutaProtegida><Perfil /></RutaProtegida>} />
            <Route path="/admin" element={<RutaProtegida><Administracion /></RutaProtegida>} />
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
