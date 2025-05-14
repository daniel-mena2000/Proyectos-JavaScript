const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');
const contenedorCitas = document.querySelector('#citas');
const formulario = document.querySelector('#formulario-cita')
//Crearemos un objeto y lo que el usuario vaya escribiendo en los inputs se va a ir guardando en el objeto

let editando = false;

const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: '',
    id: generarId()
}

//Clase para mandar llamar mensajes de error
class Notificacion {
    constructor({texto, tipo}) {
        this.texto = texto;
        this.tipo = tipo;
//Mandamos llamar la notificacion desde la clase aun que tambien se puede desde el if
        this.mostrarNoti();
    }
    mostrarNoti() {
        const alerta = document.createElement('DIV');
//Clases generales para una alerta
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');
//Para que la alerta solo se muestre una vez, nos ayudara la clase alert que creamos anteriormente esta no pertene a tailwind.Lo podemos hacer con un if pero usaremos optionalOnChaning, si ya existe la alerta la remueve y asi sucesivamente para evitar multiples alertas
const alertaPrevia = document.querySelector('.alert');
alertaPrevia?.remove()
//Clases dependiendo el tipo de alerta
//Podemos usar un IF pero usaremos ternario
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');
//Asignamos el mensaje de error
        alerta.textContent = this.texto
//Insertamos en el DOM, del formulario vamos hacia su padre y asi lo insertamos anter del form
//Con insertBefore() le decimos que queremos insertar la alerta antes del formulario
        formulario.parentElement.insertBefore(alerta, formulario);
//Quitando alerta
        setTimeout(() => {
            alerta.remove();
        }, 3000);

    };
};


class AdminCitas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita){
    //Hacemos una copia de nuestras citas y le pasamos las nuevas citas
        this.citas = [...this.citas, cita];
    //Podemos mandar llamar mostrarCitas desde la funcion del submit pero lo haremos desde aqui y se mandara llamar cada que se agregue una cita ya que esta si esta en el submit
        this.mostrarCitas()
    };
    mostrarCitas(){
//Para mostrar primero limpiamos el HTML previo
while (contenedorCitas.firstChild) {
    contenedorCitas.removeChild(contenedorCitas.firstChild)
}
//Generando citas
this.citas.forEach(cita => {
    const divCita = document.createElement('div');
    divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');

    const paciente = document.createElement('p');
    paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
    paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

    const propietario = document.createElement('p');
    propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
    propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

    const email = document.createElement('p');
    email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
    email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;

    const fecha = document.createElement('p');
    fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
    fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;

    const sintomas = document.createElement('p');
    sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
    sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;
// BOTONES DE ELIMINAR Y EDITAR
    const btnEditar = document.createElement('button');
    btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
    btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
//Clonamos la cita con una nueva funcion de JS en vez del spreed {...cita}
    const cloneCita = structuredClone(cita)
    btnEditar.onclick = () => {
        cargarEdicion(cloneCita)
    }

    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
    btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

    const contenedorBotones = document.createElement('DIV');
    contenedorBotones.classList.add('flex', 'justify-between', 'mt-10');
    contenedorBotones.appendChild(btnEditar);
    contenedorBotones.appendChild(btnEliminar);


    // Agregar al HTML
    divCita.appendChild(paciente);
    divCita.appendChild(propietario);
    divCita.appendChild(email);
    divCita.appendChild(fecha);
    divCita.appendChild(sintomas);
    divCita.appendChild(contenedorBotones);
    contenedorCitas.appendChild(divCita);
});

    }
}

//Usamos 'change' para detectar cuando el input cambie su valor
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);

formulario.addEventListener('submit', submitCita)

//Para insyectar en el objeto lo que el usuario escriba, usaremos la propiedad de 'name' que tiene el HTML en los inputs, esto solo funciona si el valor del objeto se llama igual que el name del input y ya solo le asginamos el valor, esto lo hacemos para no ir propiedad por propiedad ejemplo: citaObj.paciente = e.target.value etc. y con la funcion la reultilizamos en cada input ya que seria el mismo codigo
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}
//Instanciamos global la clase
const citas = new AdminCitas();

function submitCita(e) {
    e.preventDefault();
//Al hacer submit queremos validar que todos los campos esten llenos y que ninguno este vacio
//Recordar que todo lo que escriba el usuario se va air guardando en el objeto, y recordar que los objetos tienen llave valor,
//1.Entramos a los valores del objeto con Objet.values().
//2.Con el metodo 'some' dara true o false a la condicion en este caso si alguno de los valores incluye un string vacio.
//3.Trim para evitar espacios en blanco

    if (Object.values(citaObj).some(item => item.trim() === '')) {
        new Notificacion({texto:'Todos los campos son obligatorios', tipo: 'error'})
        return;
    };
//If que nos servira para ver si es un registro nuevo o estamos editando un registro
    if (editando) {
        console.log('editando');

    }else{
        console.log('registro nuevo');
    //Para que no se reescriba el objeto cada que agregamos una citas le pasaremos una copia
    citas.agregarCita({...citaObj});
    //Mandamos alerta de exito
    new Notificacion({
        texto: 'Paciente Registrado',
        tipo: 'exito'
    })
    }
//Dejamos por fuera del if esto ya que independientemente de que se este editando o no esto se tiene que hacer resetear el formulario y el objeto cada que se de submit
//Reiniciamos formulario al hacer submit
    formulario.reset();
    reiniciarObjetoCita();

};
//Necesitamos reiniciar el objeto una vez agregada la citas ya que la informacion se queda en memoria
function reiniciarObjetoCita(params) {
//Podriamos asiganar el objeto a vacio pero en este caso usaremos un metodo de Objetc llamado 'assing'
//primero le pasamos el objeto y despues con que lo queremos remplazar, en este caso con los mismo pero vacio
Object.assign(citaObj, {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: '',
    id: generarId(),
})
}

function generarId(params) {
    return Math.random().toString(36).substring(2) + Date.now();
}

//La finalidad de esta funcion es tomar la cita a la que le dimos editar y asiganarla a nuestro formulario
function cargarEdicion(cita) {
//Queremos que al dar "editar" el objeto tenga los datos de la tarjeta a la que le dimos click en editar
    Object.assign(citaObj, cita);
//Igualmente queremos que al dar click en editar la informacion se pase al formulario, y le asiganamos lo que tengamos en cita
    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    editando = true;
}
