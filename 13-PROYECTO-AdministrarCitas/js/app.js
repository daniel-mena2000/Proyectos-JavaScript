const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita')
//Crearemos un objeto y lo que el usuario vaya escribiendo en los inputs se va a ir guardando en el objeto

const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
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

function submitCita(e) {
    e.preventDefault();
//Al hacer submit queremos validar que todos los campos esten llenos y que ninguno este vacio
//Recordar que todo lo que escriba el usuario se va air guardando en el objeto, y recordar que los objetos tienen llave valor,
//1.Entramos a los valores del objeto con Objet.values().
//2.Con el metodo 'some' dara true o false a la condicion en este caso si alguno de los valores incluye un string vacio.
//3.Trim para evitar espacios en blanco

    if (Object.values(citaObj).some(item => item.trim() === '')) {
        const notificacion = new Notificacion({texto:'Todos los campos son obligatorios', tipo: 'error'})
        notificacion.mostrarNoti();
        return;
    }
    console.log('ok');

};

//Clase para mandar llamar mensajes de error
class Notificacion {
    constructor({texto, tipo}) {
        this.texto = texto;
        this.tipo = tipo;
    }
    mostrarNoti() {
        const alerta = document.createElement('DIV');
//Clases generales para una alerta
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');
//Clases dependiendo el tipo de alerta
//Podemos usar un IF pero usaremos ternario
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');
//Asignamos el mensaje de error
        alerta.textContent = this.texto
//Insertamos en el DOM, del formulario vamos hacia su padre y asi lo insertamos anter del form
//Con insertBefore() le decimos que queremos insertar la alerta antes del formulario
        formulario.parentElement.insertBefore(alerta, formulario)
    };


};
