
export const filtrarProductos = (productos=[], productoABuscar='', productoCategoria='', verBorrados=false) => {
    if (!productos || productos.length === 0) {return [];}
    
    let lista = [...productos];

    lista = lista.filter(prod => !!prod.io === !verBorrados); // La doble negación (!!) fuerza a cualquier valor a convertirse en true o false

    if(productoCategoria==='Todos los productos') {productoCategoria=''}
    if(productoCategoria!='') {lista = lista.filter(prod => prod.categoria && prod.categoria.includes(productoCategoria));} //No deberían existir conflictos (mayusculas y minusculas), en las categorías

    if (productoABuscar.trim() !== '') {
        lista = lista.filter(prod => 
            prod.nombre && prod.nombre.toUpperCase().includes(productoABuscar.toUpperCase().trim()) ||
            prod.descripcion && prod.descripcion.toUpperCase().includes(productoABuscar.toUpperCase().trim())
            );
        }
    
    lista.sort((a, b) => {
        const nombreA = a.nombre || '';
        const nombreB = b.nombre || '';
        return nombreA.localeCompare(nombreB);
    });

    return lista;
};
