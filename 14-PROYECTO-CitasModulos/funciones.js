import { citaObj, editando } from "./variables.js";
import Notificacion from "./clases/Notificacion.js";
import AdminCitas from "./clases/AdminCitas.js";
import { formulario, formularioInput, pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput } from "./selectores.js";

const citas = new AdminCitas();
//Para insyectar en el objeto lo que el usuario escriba, usaremos la propiedad de 'name' que tiene el HTML en los inputs, esto solo funciona si el valor del objeto se llama igual que el name del input y ya solo le asginamos el valor, esto lo hacemos para no ir propiedad por propiedad ejemplo: citaObj.paciente = e.target.value etc. y con la funcion la reultilizamos en cada input ya que seria el mismo codigo
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

export function submitCita(e) {
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
//Este if entrara una vez que editando sea TRUE y esto se hace una vez demos click en editar que llama a la funcion cargarEdicion que coloca a editando en "TRUE".
    if (editando.value) {
//Mandamos llamar el metodo editarCita que espera como parametro el objeto con las citas para poder iterarlo y ver si es el que coincide con el ID
        citas.editarCita({...citaObj});
        new Notificacion({
            texto: 'Editado correctamente',
            tipo: 'exito'
        })
//Si no se esta editando simplemente se hace el registro nuevo
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
    formularioInput.value = "Registrar Paciente";
    editando.value = false;

};

//Necesitamos reiniciar el objeto una vez agregada la citas ya que la informacion se queda en memoria
export function reiniciarObjetoCita(params) {
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


export function generarId(params) {
    return Math.random().toString(36).substring(2) + Date.now();
}


//La finalidad de esta funcion es tomar la cita a la que le dimos editar y asiganarla a nuestro formulario
export function cargarEdicion(cita) {
//Queremos que al dar "editar" el objeto tenga los datos de la tarjeta a la que le dimos click en editar
    Object.assign(citaObj, cita);
//Igualmente queremos que al dar click en editar la informacion se pase al formulario, y le asiganamos lo que tengamos en cita
    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    editando.value = true;
    formularioInput.value = "Guardar Cambios"
}
