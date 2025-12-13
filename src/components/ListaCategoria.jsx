import { useEffect, useState } from 'react';

const ListaDeCategorias= ({tipo=true,value,onChange,disabled=false}) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => {
        const catOrdenadas = data.sort((a, b) => a.localeCompare(b));
        tipo? setCategorias(['Sin categoría', ...catOrdenadas]):
        setCategorias(['Todos los productos', ...catOrdenadas,'Sin categoría']);
      });
  }, []);

  return (
    <select className="form-select"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {categorias.map((cat, index) => (
        <option key={index} value={cat} onChange={onChange}>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default ListaDeCategorias;
