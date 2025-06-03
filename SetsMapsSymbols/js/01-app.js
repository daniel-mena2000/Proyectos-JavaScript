const carrito = new Set();

//Agregar un elemento
carrito.add('articulo 1');
carrito.add('articulo 2');
carrito.add('articulo 3');
carrito.add('articulo 1'); // NO LO AGREGA
carrito.add('Articulo 1'); // SI LO AGREGA

console.log(carrito);
console.log(carrito.size);
console.log(carrito.has('articulo 1'));
console.log(carrito.delete('articulo 2')); //true
console.log(carrito.delete('articulo 33')); //false
//carrito.clear();

//Los sets son iterables
carrito.forEach(item => {
    console.log(item);

})

//Si queremos que un array no tenga duplicados
const numeros = [10,20,5,40,10];
const noDuplicados = new Set(numeros);
console.log(noDuplicados);
