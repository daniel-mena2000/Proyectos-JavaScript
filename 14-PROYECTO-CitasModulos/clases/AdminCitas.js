import { contenedorCitas } from "../selectores.js";
import { cargarEdicion } from "../funciones.js";
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
//Para editar recorreremos el array de citas y usaremos Map para esto ya que map a diferencia de foreach este nos permite modificarlo y nos regresa un array nuevo que va a tener la informacion actualizada de la cita que editamos
    editarCita(citaActualizada){
    //Veremos si el id de la cita recorrida conicide con la que le pasamos por parametro que seria a la que le dimos editar, si coincide mandamos la "citaActualizada" a editar y lo que no pues se queda igual
        this.citas = this.citas.map(item => item.id === citaActualizada.id ? citaActualizada : item)
        this.mostrarCitas();
    }

    eliminar(id){
        this.citas = this.citas.filter(item => item.id !== id);
        this.mostrarCitas();
    }

    mostrarCitas(){
//Para mostrar primero limpiamos el HTML previo
while (contenedorCitas.firstChild) {
    contenedorCitas.removeChild(contenedorCitas.firstChild)
}
//mensaje que se mostrara si hay citas o no
if (this.citas.length === 0) {
    contenedorCitas.innerHTML = '<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>';
    return;
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
    btnEliminar.onclick = () => this.eliminar(cita.id);

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


export default AdminCitas;
