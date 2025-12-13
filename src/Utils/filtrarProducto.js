
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
    
    lista.sort((a, b) => { // Esto me lo tiro Gemini porque no lagraba que me quede ordenada como yo queria ._.
        // 1. Manejar productos sin nombre para evitar errores
        const nombreA = a.nombre || '';
        const nombreB = b.nombre || '';

        // 2. Usar localeCompare para una comparación alfabética robusta
        //    (especialmente útil para idiomas con acentos o caracteres especiales)
        return nombreA.localeCompare(nombreB);
    });

    return lista;
};
