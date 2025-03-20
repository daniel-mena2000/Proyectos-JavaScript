const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

misEventListener()
function misEventListener(params) {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
}

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
        this.calcularRestante()
    }

    calcularRestante(){
//Iremos sumando todos los gastos
const gastado = this.gastos.reduce((total, item) => total + item.cantidad, 0);
//El restante va a ser igual a nuestro total del presupuesto menos la suma de lo que hemos gastado
this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter(item => item.id !== id);
// Una vez eliminado hay que calcular nuevamente el restante del presupuesto
        this.calcularRestante();
    }
}


//Clase para el UI del HTML
class UI {
    insertarPresupuesto(cantidad) {
        const {presupuesto, restante} = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;

        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    agregarGastoListado(gastos){
        limpiarHTML()
//Iteramos sobre los gastos
        gastos.forEach(element => {
            const {cantidad, nombre, id} = element;

            const li = document.createElement('li');
//ClassName y classList hacen lo mismo pero con diferente sintaxis
            li.className = 'list-group-item d-flex justify-content-between aling-items-center'

            //li.setAttribute('data-id', id)Forma antigua de agregar un dataId
            li.dataset.id = id; //Nueva forma
            //Agregamos el HTML del gasto
            li.innerHTML = `
            ${nombre} <span class='text-success fw-bold'>$${cantidad}</span>`
            ;
            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btn.textContent = 'X';
            btn.addEventListener('click', () => eliminarGasto(id))
            li.appendChild(btn)

            //Agregamos el HTML
            gastoListado.appendChild(li);
        });
    }
//Actualizamos el restante
    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }
//Metodo para dependiendo el presupuesto cambie de color el restante
    comprobarpresupuesto(presupuestoOb){
        const {presupuesto, restante} = presupuestoOb;
        const restantaDiv = document.querySelector('.restante')
        //comprobar si ya se gasto mas del 25% del presupuesto
        if ((presupuesto / 4) > restante) {
            restantaDiv.classList.remove('alert-success', 'alert-warning');
            restantaDiv.classList.add('alert-danger');
        //comprobar si ya se gasto mas del 50% del presupuesto
        }else if((presupuesto / 2) > restante){
            restantaDiv.classList.remove('alert-success');
            restantaDiv.classList.add('alert-warning');
        }else{
//Esto nos servira si eliminamos un gasto vuelva al color verde
            restantaDiv.classList.remove('alert-danger', 'alert-warning');
            restantaDiv.classList.add('alert-success');
        };
//Comprobar si el presuúesto ya se hagoto y bloquear el boton
        if (restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');

            formulario.querySelector("button[type='submit']").disabled = true;
        }else{
            formulario.querySelector("button[type='submit']").disabled = false;

        }
    }
}
//Colocandolo global podremos instanciar desde cualquier funcion
const ui = new UI();
//Variable global para poder asignar el presupuesto dentro de la funcion e instanciarlo y poder usarlo fuera
let miPresupuesto;

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');
//Recargamos si es que entra en alguna validacion
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario || presupuestoUsuario <= 0)) {
        alert('Por favor, ingresa un presupuesto válido.');
        window.location.reload();
        return;
    }
    //instancia
    miPresupuesto = new Presupuesto(presupuestoUsuario)
    console.log(miPresupuesto);
//Le asiganamos "miPresupuesto" para poder tener acceso a estos datos desde UI
    ui.insertarPresupuesto(miPresupuesto)

}


function agregarGasto(e) {
    e.preventDefault();

const nombre = document.querySelector('#gasto').value;
const cantidad = Number(document.querySelector('#cantidad').value);

if (nombre === '' || cantidad === '') {
    ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
    return;
}else if(cantidad <= 0 || isNaN(cantidad)){
    ui.imprimirAlerta('Cantidad NO VALIDA', 'error');
    return;
}
//Una vez llegado aqui y esten llenos los campos tenemos que agregar el nuevo gasto hacia la clase de presupuesto, restar la cantidad he ir listando los gastos en el apartado de Listado.
//Ya no asignamos valores ya que tienen el mismo nombre
const gasto = {
    nombre,
    cantidad,
    id: Date.now()
}
miPresupuesto.nuevoGasto(gasto)

ui.imprimirAlerta('Gasto agregado correctamente');

//imprimir los gastos, y como solo quiero los gastos hago destrucuturing
const {gastos, restante} = miPresupuesto
ui.agregarGastoListado(gastos)

//Creamos un nuevo metodo para actualizar el restante
ui.actualizarRestante(restante)

ui.comprobarpresupuesto(miPresupuesto)


//Reiciniamos formulario una vez se envie el formulario
formulario.reset();
}

function limpiarHTML() {
    gastoListado.innerHTML = '';
}

function eliminarGasto(id) {
    miPresupuesto.eliminarGasto(id);
    const {gastos, restante} = miPresupuesto;
//Hay que mandar llamar las funciones nuevamente para acualizar cada que se elimine un gasto
    ui.agregarGastoListado(gastos);

    ui.actualizarRestante(restante)

ui.comprobarpresupuesto(miPresupuesto)

}
