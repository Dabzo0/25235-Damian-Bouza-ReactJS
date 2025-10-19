import { createContext, useState } from 'react';

export const UsuarioData = createContext();

export function UsuarioProvider({ children }) {
  
  const [usuario, setUsuario] = useState({});

  return (
    <UsuarioData.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioData.Provider>
  );
}
