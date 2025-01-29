
const carrito = document.querySelector("#carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos")

cargarEventListeners()
function cargarEventListeners(params) {
    listaCursos.addEventListener("click", agregarCurso)
}

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

function leerDatosCurso(curso) {
    console.log(curso);
// crear un objeto con el contenido del curso actual
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    ID: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}

console.log(infoCurso);


}
