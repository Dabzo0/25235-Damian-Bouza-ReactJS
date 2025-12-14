import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const AvisosToasts = ({ show, onClose, mensage, tipo }) => {
    
    // Función para mapear el tipo a un color de Bootstrap (header)
    const getTypeHeader = (tipo) => {
        switch (tipo) {
            case 'success':
                return 'Éxito';
            case 'danger':
            case 'error':
                return 'Error';
            case 'warning':
                return 'Advertencia';
            case 'info':
                return 'Información';
            default:
                return 'Aviso';
        }
    };

    // Función para mapear el tipo a un color de fondo (bg)
    const getTypeColor = (tipo) => {
        switch (tipo) {
            case 'success':
                return 'success';
            case 'danger':
            case 'error':
                return 'danger';
            case 'warning':
                return 'warning';
            case 'info':
                return 'info';
            default:
                return 'primary';
        }
    };

    return (
        <ToastContainer 
            position="bottom-end" // 💡 Posición: Abajo a la derecha (común para toasts)
            className="p-3" 
            style={{ zIndex: 10000 }} // Asegurar que esté por encima de otros elementos
        >
            <Toast 
                onClose={onClose} 
                show={show} 
                delay={4000} // 💡 Auto-cierre después de 4 segundos
                autohide // Habilitar el auto-cierre
                bg={getTypeColor(tipo)} // Color del fondo basado en el tipo
            >
                {/* Header (Encabezado) */}
                <Toast.Header>
                    <strong className={`me-auto text-white`}>
                        {getTypeHeader(tipo)} 
                    </strong>
                    <small className="text-white">Justo ahora</small>
                </Toast.Header>
                
                {/* Body (Cuerpo del mensaje) */}
                <Toast.Body className="text-white">
                    {mensage}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default AvisosToasts;