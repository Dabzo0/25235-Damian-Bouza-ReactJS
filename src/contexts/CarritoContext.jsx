import React, { createContext, useState, useContext, useEffect } from 'react';

const storageCarrito = 'carrito';
// Se crearel Contexto
export const CarritoContext = createContext();

// Hook personalizado para usar el carrito fácilmente en otros componentes
export const useCarrito = () => {
    return useContext(CarritoContext);
};


// SE crea el Provider (el contenedor de la lógica)
export const CarritoProvider = ({ children }) => {
    // El estado inicial del carrito: un array de productos
    // Cada objeto en el array debe tener el producto y la cantidad.
    const [carrito, setCarrito] = useState(()=>{
        try {
            const carritoGuardado = localStorage.getItem(storageCarrito);
            // Si hay datos, se lo parsea (JSON.parse) y se retorna
            return carritoGuardado ? JSON.parse(carritoGuardado) : [];
        } catch (error) {
            return []; // Retorna vacío si hay un error
        }
    });

    useEffect(() => {
        try {
            // Se Convierte el array de carrito a una cadena JSON (JSON.stringify)
            localStorage.setItem(storageCarrito, JSON.stringify(carrito));
        } catch (error) {
            console.error("Error al guardar el carrito en localStorage:", error);
        }
    }, [carrito]);// Este efecto se ejecuta cada vez que 'carrito' cambia

    // Función para agregar un producto (+1 unidad)
    const agregarProducto = (producto) => {
        // Buscamos si el producto ya existe en el carrito
        const productoExistente = carrito.find(item => item.id === producto.id);
        
        if (productoExistente) {
            // Si existe, actualizamos su cantidad
            setCarrito(
                carrito.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 } // Suma 1 a la cantidad
                        : item
                )
            );
        } else {
            // Si no existe, lo agregamos con cantidad 1
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    // Función para quitar una unidad de un producto (-1 unidad)
    const quitarProducto = (id) => {
        setCarrito(
            carrito.map(item =>
                item.id === id
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            )
            // Filtramos los productos con cantidad mayor a 0 (para eliminarlo si llega a cero)
            .filter(item => item.cantidad > 0)
        );
    };

    // Función para eliminar un producto completamente del carrito
    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter(item => item.id !== id));
    };

    // Función para vaciar el carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const calcularTotal = () => {
        let total=carrito.reduce((acumulado, item) => acumulado + (item.preciofinal*item.cantidad), 0)
        return total.toFixed(2);
    };
    
    const calcularAhorro = () => {
        let totalBruto= carrito.reduce((acumulado,item)=>acumulado+(item.precio*item.cantidad),0)
        let totalNeto= totalBruto - carrito.reduce((acumulado, item) => acumulado + (item.preciofinal*item.cantidad), 0)
        return totalNeto.toFixed(2);
    };
    // Objeto que se proveerá a todos los componentes hijos
    const contextValue = {
        carrito, // El array (contenedor de productos)
        agregarProducto,
        quitarProducto,
        eliminarDelCarrito,
        vaciarCarrito,
        total:calcularTotal(),
        ahorro:calcularAhorro()
    };

    return (
        <CarritoContext.Provider value={contextValue}>
            {children}
        </CarritoContext.Provider>
    );
};
export default CarritoProvider;