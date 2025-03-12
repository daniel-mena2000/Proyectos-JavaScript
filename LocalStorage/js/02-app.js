
const nombre = localStorage.getItem('nombre')

//Obtener el objeto
const productoJSON = localStorage.getItem('producto')
JSON.parse( productoJSON )
//Volvemos a covertir el objeto de string a objeto original

//Obtener el array

const mesesJSON = localStorage.getItem('meses');
JSON.parse(mesesJSON);

//Tambien puedes simplificarlo obtenerlo y convertirlo en un solo paso

const mesesArray = JSON.parse(localStorage.getItem('meses'))

//Actualizar array con nuevo elemento:
mesesArray.push('Abril');

localStorage.setItem('meses', JSON.stringify( mesesArray ))
