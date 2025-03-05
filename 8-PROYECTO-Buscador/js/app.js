const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');

//A la fecha maxima le restamos 11 años para una fecha minima
const maxFechaActual = new Date().getFullYear();
const minFecha = maxFechaActual - 11
//Eventos
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos();
    llenarSelect();
})

//Funciones
function mostrarAutos(params) {

    autos.forEach(item => {
        const {marca, modelo, year, precio, puertas, color, transmision} = item
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} - ${modelo} - ${year} - ${precio} - ${puertas} - ${color} - ${transmision}
        `;

        //insertar en HTML
        resultado.appendChild(autoHTML);
    })
}


// Genera los años del select

function llenarSelect(params) {
// Para que las fechas vallan de ascendente a descendente
    for (let index = maxFechaActual; index >= minFecha; index--) {
        const opcion = document.createElement('option');
        opcion.value = index;
        opcion.textContent = index;
//Le insertmos la opciones de año al select
        year.appendChild(opcion);
    }
}
