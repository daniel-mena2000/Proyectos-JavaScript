//API LocalStorage necesita una llave y un valor
//Para agregar elementos utilizamos "setItem"
//La llave es como vas a obtener esos valores o como vas a hacer referencia a ellos
//Y el valor es lo que puede cambiar
localStorage.setItem('nombre', 'daniel');


//OBJETO A STRING
const producto = {
    nombre: 'Monitos 24 pulgadas',
    precio: 200
}

const productoString = JSON.stringify(producto);
localStorage.setItem('producto', productoString)

//ARRAYS A STRING

const meses = ['enero', 'febrero', 'marzo'];
//const mesesString = JSON.stringify( meses );
localStorage.setItem('meses', JSON.stringify( meses ));
