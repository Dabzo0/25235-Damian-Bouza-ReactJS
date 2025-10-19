import { useEffect, useState, useContext } from 'react';
import { CategoriaSeleccionada } from '../contexts/SelectorCategoria';

function ListaDeCategorias() {
  const [categorias, setCategorias] = useState([]);
  const { setCategoriaElegida } = useContext(CategoriaSeleccionada);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => a.localeCompare(b));
        setCategorias(['Todos los productos', ...sorted]);
      });
  }, []);

  return (
    <select className="form-select" onChange={(e) => setCategoriaElegida(e.target.value)}>
      {categorias.map((cat, index) => (
        <option key={index} value={cat}>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default ListaDeCategorias;
