import { createContext, useState } from 'react';

export const CategoriaSeleccionada = createContext();

// En lugar de CategoriasProvider uso CategoriasProductosContex.
// De esta manera me resulta mas facil entender la estructura del useContext.
// En furturos contexts se utilizara ejemploProvider

export function CategoriasProductosContext({ children }) {
  
  const [categoriaElegida, setCategoriaElegida] = useState('Todos los productos');

  return (
    <CategoriaSeleccionada.Provider value={{ categoriaElegida, setCategoriaElegida }}>
      {children}
    </CategoriaSeleccionada.Provider>
  );
}
