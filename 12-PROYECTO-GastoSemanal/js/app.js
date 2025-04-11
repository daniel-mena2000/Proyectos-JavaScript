const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

misEventListeners()
function misEventListeners(params) {
//Cuando cargue el documento mandara llamar la funcion
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);

}


//TENDREMOS 2 CLASES UNA QUE CONTROLE EL PRESUPUESTO Y OTRA LA INTERFAZ DE USUARIO

class Presupuesto {
    constructor(presupuesto) {
//El prompt del usuario viene por defecto como string por eso lo convertimos a numero desde aqui
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto) //El restante sera el presupuesto menos lo que valla gastando el usuario
        this.gastos = []; // En este array iremos listando los gastos
    }
//Metodo para ir agregando al array de gastos los gastos que se vayan agregando del input
//Recoradar hacer la copia del array para no perder la referencia
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];


    }
//Para obtener el Restante tenemos que ver cuanto dinero hemos gastado, recordemos que ya hemos agregado elementos en el array de gastos en el metodo anterior y usaremos reduce para sacar la cuenta de cuanto llevamos gastado.
    calcularRestante(){
        const gastado = this.gastos.reduce( (total, item) => total + item.cantidad, 0);
//Ahora restaremos el 100 porciento del presupuesto menos lo que hemos gastado
        this.restante = this.presupuesto - gastado;
        console.log(this.restante);

    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter(item => item.id !== id);
//Una vez elimiado vamos a calcular nuevamente el restante
        this.calcularRestante();
    }
}

//Esta clase no requiere constructor ya que solo se encarga de las funciones para el HTML basado en la clase presupuesto
class UI {
    insertarPresupuesto(cantidad){
//Como vimos ahora cantidad tiene los atributos del la primera clase y podemos destructurar para sacar lo que necesitamos.
//Y en este caso vamos a asiganar los valores al HTML de total y restante
const {presupuesto, restante} = cantidad
//Agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;

    }

    //Metodo para imprimir alertar en el html si algo esta mal
    imprimirAlerta(mensaje, tipoMen){
        //Creando Error
        const divMensaje = document.createElement('div');
        //Agregamos clases de bootstrap para centrar y decir que que una alerta
        divMensaje.classList.add('text-center', 'alert');
        //Condicionamos el tipo de error
        if (tipoMen === 'error') {
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //Agregando mensaje
        divMensaje.textContent = mensaje;
        //insertamos en el html, lo queremos dentro el div que tiene la clase "primario" y queremos insertar nuestro div despues de la clase agregar gasto, pero como ya lo tenemos asigado a formulario pues solomente colocamos formulario
        document.querySelector('.primario').insertBefore(divMensaje, formulario)

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }


    agregarGastoListado(gastos){
//Limpiamos el HTML previo
        this.limpiarHTML()
    //iteramos para acceder a los gatos
         gastos.forEach(element => {
    //Haremos destructuring no es necesario pero simplifica
            const {cantidad, nombre, id} = element;

            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between aling-items-center';
            //Al li le agregamos el id
            li.dataset.id = id;
            //Injectamos en el HTML
            li.innerHTML = `
            ${nombre} <span class="badge badge-primary badge-pill"> $${cantidad} </span>
            `;

            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.textContent = 'X';
            //Mandamos llamar la funcion de liminar
            btnBorrar.addEventListener('click', () => {
                eliminarGasto(id);
            })

            li.appendChild(btnBorrar);

            //agregar al HTML
            gastoListado.appendChild(li);
    });

}
limpiarHTML(){
    while (gastoListado.firstChild) {
        gastoListado.removeChild(gastoListado.firstChild);
    }
}

actualizarRestante(restante){
//Tenemos que mandar llamar nuevamente para que se acualice en el HTML el restante
    document.querySelector('#restante').textContent = restante;

}

comprobarPresupuesto(presupuestoObj){
    const {presupuesto, restante} = presupuestoObj;

    const restanteDiv = document.querySelector('.restante');
//Para comprobrar si ya gastamos el 25% del presupuesto y quedaria el 75% del presupuesto
    if ((presupuesto / 4) > restante) {
        restanteDiv.classList.remove('alert-success', 'alert-warning');
        restanteDiv.classList.add('alert-danger');
    }
    else if((presupuesto / 2) > restante){
        restanteDiv.classList.remove('alert-success');
        restanteDiv.classList.add('alert-warning');
    }else{
        restanteDiv.classList.remove('alert-danger', 'alert-warning');
        restanteDiv.classList.add('alert-success');
        formulario.querySelector('button[type="submit"]').disabled = false;


    }


    //Si el prespuesto ya es 0, mandamos un mensaje y desactivamos el boton
    if (restante <= 0) {
        htmlUI.imprimirAlerta('El presupuesto se ha  agotado', 'error');
        formulario.querySelector('button[type="submit"]').disabled = true;
    }
}

}

//Crearemos esta variable para poder instanciar dentro de la funcion pero tambien tener acceso desde fuera
const htmlUI = new UI();
let miPresupuesto;

function preguntarPresupuesto(params) {
//Usaremos un promt
    const presupuestoUsuario = prompt('¿Cúal es tu presupuesto?');
//Validaremos que el usuario coloque una cantidad y que no sea string, null, NaN, Numero negativo y si es haci recargaremos la pagina hasta que coloque bien la cantidad
if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){} {
    console.log('Cantidad no valida');
}
//El constructor necesita un valor y este valor es el que pase el usuario
miPresupuesto = new Presupuesto(presupuestoUsuario);
console.log(miPresupuesto);

//UI tiene la funcion insertarPresupuesto que requiere una cantidad y le pasaremos "miPresupuesto" que apunta a la primera clase con sus respectivos atributos del constructor y ya con la cantidad que le dio el usuario
htmlUI.insertarPresupuesto(miPresupuesto)
}

//Funcion para validar los inputs, cuando el usuario de click a submit
function agregarGasto(e) {
    e.preventDefault();

    const nombreAct = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    if (nombreAct === '' || cantidad === '') {
        htmlUI.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }
//Verificamos que el usuario no coloque una cantidad negativa o cero y que no coloque letras
    else if(cantidad <= 0 || isNaN(cantidad)){
        htmlUI.imprimirAlerta('Cantidad no valida', 'error');
        return;
    }
//Crearemos un objeto para guardar la informacion del los inputs y le agregaremos un id para idetificarlo

const gastoObj = {
    nombre: nombreAct,
    cantidad,
    id: Date.now()
}

//Todos los gastos se van a ir agregando al array de gastos[] del la clase Presupuesto y recordar que esta clase esta asignada a la variable "miPresupuesto"

miPresupuesto.nuevoGasto(gastoObj)
miPresupuesto.calcularRestante();
//Una vez agregado el gasto queremos mostrar el mensaje de exito y reiniciar el formulario
htmlUI.imprimirAlerta('Gasto agregado correctamente')

//Imprimir los gastos y pasandolos al HTML
const {gastos, restante} = miPresupuesto;

htmlUI.agregarGastoListado(gastos)

htmlUI.actualizarRestante(restante);
//Este metodo nos ayudara a cambiar el color del mensajea dependiendo la cantidad
htmlUI.comprobarPresupuesto(miPresupuesto);
formulario.reset();


}


function eliminarGasto(id) {
    //Elimina gastos del objeto
    miPresupuesto.eliminarGasto(id);
    //Elimina gastos del HTML
    const {gastos, restante} = miPresupuesto;
    htmlUI.agregarGastoListado(gastos);
//Tenemos que mandar llamar nuevamente estos metodos una vez aliminado para actualizar
    htmlUI.actualizarRestante(restante);
    htmlUI.comprobarPresupuesto(miPresupuesto);
}
