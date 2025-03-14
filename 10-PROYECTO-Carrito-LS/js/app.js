
const carrito = document.querySelector("#carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos")
let articuloCarrito = [];


cargarEventListeners()
function cargarEventListeners() {
    listaCursos.addEventListener("click", agregarCurso)

    carrito.addEventListener('click', eliminarCurso);

    document.addEventListener('DOMContentLoaded', () => {
        articuloCarrito = JSON.parse(localStorage.getItem('card')) || [];
        carritoHTML()
    })
}

vaciarCarritoBtn.addEventListener('click', () =>{
    articuloCarrito = []; //Vaciamos carrito
    carritoHTML(); // Vaciamos del HTML

})

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}

function eliminarCurso(e) {
    console.log(e.target.classList);
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        articuloCarrito = articuloCarrito.filter(item => item.id !== cursoId); //Lo eliminamos del array no del HTML
    carritoHTML();


    }

}

function leerDatosCurso(curso) {
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}

const existe = articuloCarrito.some(item => item.id === infoCurso.id);

if (existe) {

    const cursos = articuloCarrito.map(itemD => {
        if (itemD.id === infoCurso.id) {
            itemD.cantidad++;
            return itemD;
        }else{
            return itemD
        }
    });

    articuloCarrito= [...cursos]
}else{
articuloCarrito = [...articuloCarrito, infoCurso]
console.log(articuloCarrito);
}
        carritoHTML();
}


// generar carrito
function carritoHTML(params) {
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
contenedorCarrito.appendChild(row);
    });

    miLocalStorage()
}

function miLocalStorage() {
    localStorage.setItem('card', JSON.stringify(articuloCarrito));
}

function limpiarHTML(params) {
while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
}
}
