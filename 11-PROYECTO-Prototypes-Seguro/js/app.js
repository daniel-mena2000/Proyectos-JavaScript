

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo
}

Seguro.prototype.cotizarSeguro = function () {
    // Cada marca aumenta el valor un porcentaje
    //1 = Americano: 1.15
    //2 = Asiatico : 1.05
    //3 = Europeo = 1.35
    console.log(this.marca);

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
        cantidad = base * 1.15
            break;
        case '2':
        cantidad = base * 1.05
            break;
        case '3':
        cantidad = base * 1.35
            break;

        default:
            break;
    }
console.log(cantidad);
//En base al año del seguro sera mayor o menor y se va a reducir un 3% menos

const diferencia = new Date().getFullYear() - this.year;
cantidad -= ((diferencia * 3) * cantidad) / 100
console.log('Cantidad descuento:', cantidad);

//Si el seguro es básico de multiplica por 30% mas
//Si el seguro es completo de multiplica por 50% mas

if (this.tipo === 'basico') {
    cantidad *= 1.30
}else{
    cantidad *= 1.50
}
return cantidad;
}

//Funcion para nuestra interfaz de usuario
function UI() {}

//Metodo llenar opciones
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let index = max; index > min; index--) {
        let option = document.createElement('option');
        option.value = index;
        option.textContent = index;
        selectYear.appendChild(option)
    }
}

//Mostrar alertas de llenado incompleto
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const miDiv = document.createElement('div');

    if (tipo === 'error') {
        miDiv.classList.add('mensaje', 'error');
    }else{
        miDiv.classList.add('mensaje', 'correcto')
    }
    miDiv.classList.add('mensaje', 'mt-10');
    miDiv.textContent = mensaje

    const formulario = document.querySelector('#cotizar-seguro');
//Insertaremos este div antes del div de resultado, Este toma 2 parametros
    formulario.insertBefore(miDiv, document.querySelector('#resultado'));

    setTimeout(() => {
        miDiv.remove()
    }, 3000);
}

UI.prototype.mostrarResultado = (total, seguro) => {
    limpiar()

    const {marca, year, tipo} = seguro;
    let textoMarca;
    switch (marca) {
        case '1':
            textoMarca = 'Americano'
            break;
         case '2':
            textoMarca = 'Asiatico'
                break;
         case '3':
                textoMarca = 'Europeo'
                break;
        default:
            break;
    }
    const div = document.createElement('div');
    div.classList.add('m-10');
    div.innerHTML = `
        <p class='header'>Tu resumen</p>
        <p class='font-bold'>Informacion: <span class='font-normal'>${textoMarca}/${year}/${tipo}</span></p>
        <p class='font-bold'>Total: <span class='font-normal'>$${total}</span></p>
    `;
    const resultadoDiv = document.querySelector('#resultado');

    //spinner
    const spineer = document.querySelector('#cargando');
    spineer.style.display = 'block';

    setTimeout(() => {
        spineer.style.display = 'none';
        resultadoDiv.appendChild(div);

    }, 3000);
}

function limpiar(params) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = ''
}


//instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones() //Llena el select con los años
})

eventListerners()
function eventListerners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}


function cotizarSeguro(e) {
    e.preventDefault();

    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value; //Asi se lee el input de tipo radio

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return
    }
//Mostrar mesanje de exito si los campos estan todos llenos
    ui.mostrarMensaje('Cotizando...', 'exito');

    const seguro = new Seguro(marca, year, tipo)
    console.log(seguro);

    const total = seguro.cotizarSeguro()

    ui.mostrarResultado(total, seguro)
}
