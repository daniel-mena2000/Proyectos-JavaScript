
const carrito = document.querySelector("#carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos")
let articuloCarrito = [];


cargarEventListeners()
function cargarEventListeners() {
    listaCursos.addEventListener("click", agregarCurso)

    carrito.addEventListener('click', eliminarCurso);
}

vaciarCarritoBtn.addEventListener('click', () =>{
    articuloCarrito = []; //Vaciamos carrito
    carritoHTML(); // Vaciamos del HTML

})

function agregarCurso(e) {
    e.preventDefault();

// Para evitar el event Bubling y que el evento se disperse por todo el componente seleccionamos que solo se active la funcion si contiene la clase "agregar-carrito"
    if (e.target.classList.contains('agregar-carrito')) {
// Seleccionamos todo el componente para poder acceder a la imagen titulo etc
// Seria seleccionar el padre de "agregar-carrito" que es "info-card" y seleccionar su padre de este que es "card"
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}

function eliminarCurso(e) {
    console.log(e.target.classList);
// Identificamos que de todo el componente estemos presionando el que tenga la clase "borrar-curso"
    if (e.target.classList.contains('borrar-curso')) {
// Obtenemos el data-id que nos ayudara a identificar el elemento que queremos eliminar
        const cursoId = e.target.getAttribute('data-id');

        articuloCarrito = articuloCarrito.filter(item => item.id !== cursoId); //Lo eliminamos del array no del HTML


    carritoHTML(); //iterar sobre el carrito y mostrar su HTML


    }

}

function leerDatosCurso(curso) {
    //console.log(curso);
// crear un objeto con el contenido del curso actual
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}
// REVISA SI UN ELEMNTO YA EXISTE EN EL CARRITO
// Recordar que some itera un array de objetos, lo usaremos para verificar si un elemento ya existe

const existe = articuloCarrito.some(item => item.id === infoCurso.id);

if (existe) {

    const cursos = articuloCarrito.map(itemD => {
        if (itemD.id === infoCurso.id) {
// Es necesario retornar el "cursos" con el nuevo valor
            itemD.cantidad++;
            return itemD;
        }else{
// Si hay elementos que no necesitan aumentar cantidad es decir ser editados, esos elementos se devuelven como estan
            return itemD
        }
    });

    articuloCarrito= [...cursos]
}else{
// Agregando elemento al array de articuloCarrito, Para que se vallan agregando hacemos copia
articuloCarrito = [...articuloCarrito, infoCurso]
console.log(articuloCarrito);
}
        carritoHTML();
}


// generar carrito

function carritoHTML(params) {
// Cuando damos click limpia en HTML previo del tbody y se vuelve a ejecutar el iterador para agregar nuevamente
    limpiarHTML();

    articuloCarrito.forEach(item => {
        const {imagen, titulo, precio, cantidad, id} = item
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width='100' ></td>

        <td>${titulo}</td>

        <td>${precio}</td>

        <td>${cantidad}</td>

        <td><a href="#" class='borrar-curso' data-id='${id}'>X</a></td>
        `;
// Agrega el HTML del carrito en el tbody
contenedorCarrito.appendChild(row);
    });
}


// como usamos appendChill, se van a ir agregando los curso al carrito desde el principio es decir se van a duplicar a cada click ejemplo: primer click: curso1, segundo click: curso1, curso1, curso 2, como vemos el curso1 se volvio a agregar y eso no lo deseamos.
function limpiarHTML(params) {
// forma lenta
    // contenedorCarrito.innerHTML = ''

// forma rapida con while
// elimina el primer hijo si es que contenedorCarrito tiene ya algo previo
while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
}
}
