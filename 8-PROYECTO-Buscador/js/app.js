const year = document.querySelector('#year');
const precioMin = document.querySelector('#minimo');
const precioMax = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const marca = document.querySelector('#marca');

const resultado = document.querySelector('#resultado');

//A la fecha maxima le restamos 11 años para una fecha minima
const maxFechaActual = new Date().getFullYear();
const minFecha = maxFechaActual - 11;


// Generar un objeto con la busqueda
//La idea es que cuando seleccionemos la marca se llene el apartado de marca de este objeto
const datosBusqueda = {
    marca: '',
    modelo: '',
    year: '',
    precioMin: '',
    precioMax: '',
    puertas: '',
    color: '',
    transmision: ''
}

//Eventos
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos);
    llenarSelect();
})

//evnts Listener para los select
//Una forma para leer los select es con "change" es decir cuando cambie el "select"
//Iremos llenando nuestro objeto con el valor del select
marca.addEventListener('change', (e) => {
    console.log(e.target.value);
    datosBusqueda.marca = e.target.value

    filtrarAuto()
})

year.addEventListener('change', (e) => {
    datosBusqueda.year = e.target.value;

    filtrarAuto()
})


precioMin.addEventListener('change', (e) => {
    datosBusqueda.precioMin = e.target.value

    filtrarAuto()
})


precioMax.addEventListener('change', (e) => {
    datosBusqueda.precioMax = e.target.value
    filtrarAuto();
})


puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = e.target.value

    filtrarAuto();
})

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value

    filtrarAuto()
})

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value

    filtrarAuto();
})

//En lugar de agregar addEventListener a cada select, podemos usar document.addEventListener('change', ...) en un solo evento.
//Nota: Cambiar el nombre de los precios minimo y maximo y que coincidan con los de los ID ya que no coinciden los nombres y no funcionara
/*
document.addEventListener('change', (e) => {
    if (e.target.matches('select')) {
        const campo = e.target.id;
        datosBusqueda[campo] = e.target.value;
        filtrarAuto();
    }
});*/

//Funciones
//Le pasamos como parametro el resultado del filtrado en este caso lo llamaremos autos y no resultado y en caso de llamarlo de otra forma hay que modificar el foreach ejemplo: resultado.foreach() ya que ya no iterara desde la lista "autos" si no desde el filtrado que viene igualmente desde la lista "autos" pero ya con un filtro
function mostrarAutos(autos) {
//Mandamos llamar LimpiarHTML antes de recorrer e imprimir el resultado
LimpiarHTML() //Elimina el HTML previo

    autos.forEach(item => {
        const {marca, modelo, year, precio, puertas, color, transmision} = item
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} - ${modelo} - ${year} -$${precio} - ${puertas} - ${color} - ${transmision}
        `;

        //insertar en HTML
        resultado.appendChild(autoHTML);
    })
}

//Limpiar HTML para el filtrado
//La función LimpiarHTML() borra todo el contenido del elemento resultado antes de agregar nuevos elementos.
//Verifica si resultado tiene hijos con resultado.firstChild.
//Mientras haya un primer hijo, lo elimina con removeChild(resultado.firstChild).
//Repite el proceso hasta que resultado esté vacío.
function LimpiarHTML() {
//Usamos while para que vaya recorriendo y eliminando cada hijo de la lista
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
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


// Funcion que filtra en base a la busqueda de los selects

function filtrarAuto(params) {
//Le pasaremos una funcion filter otra funcion
    const resultado = autos.filter( filtrarMarca ).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarColor).filter(filtrarPuertas).filter(filtrarTransmision);
    console.log(resultado);
//Para actualizar el HTML mandamos llamar la funcion que muestra la lista, y le pasamos nuestro filtrado

    if (resultado.length) {
        mostrarAutos(resultado)
    }else{
        noResultado()
    }
}

function noResultado() {

    LimpiarHTML()
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados :(';
    resultado.appendChild(noResultado)
}

function filtrarMarca(item) {
//Veremos primero que nuestro objeto "datosBusqueda" coincide el apartado "marca" con lo que tenemos en nuestra lista de autos que estamos iterando con el filter es decir que si el objeto tiene BMW este este en la lista de autos
    const {marca} = datosBusqueda;
//Este codigo se ejecuta si hay un "marca"
    if (marca) {
        return item.marca === marca;
    }
//Si el usuario no a seleccionado nada devolvemos la item completo es decir toda la lista
        return item
}

function filtrarYear(item) {
    const {year} = datosBusqueda;
    if (year) {
//Nos dara un error si compara year en string de la lista con el numero year del objeto por eso hay que covertirlo
        return item.year === parseInt(year);
    }
        return item
}

function filtrarMinimo(item) {
    const {precioMin} = datosBusqueda;
    if (precioMin) {
//No vamos a comparar por un precio minimo si no por el precio del automovil
//Y queremos que nos retorne los autos con mayor o igual del precio minimo
//Podemos observar que igualmente como el aterior son string y numeros pero en este caso ">=" no es tan estricto
        return item.precio >= precioMin
    }
    return item;
}

function filtrarMaximo(item) {
    const {precioMax} = datosBusqueda;
    if (precioMax) {
//En este caso queremos que nos filtre los autos que NO excedan cierto precio
        return item.precio <= precioMax
    }
    return item;
}

function filtrarColor(item) {
    const {color} = datosBusqueda;

    if (color) {
        return item.color === color;
    }
    return item
}

function filtrarPuertas(item) {
    const {puertas} = datosBusqueda;

    if (puertas) {
        return item.puertas === parseInt(puertas);
    }
    return item
}

function filtrarTransmision(item) {
    const {transmision} = datosBusqueda;

    if (transmision) {
        return item.transmision === transmision;
    }
    return item
}
