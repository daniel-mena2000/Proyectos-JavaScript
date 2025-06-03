import { generarId } from "./funciones.js";

//En JavaScript ES6, los valores primitivos (como let, const con números, booleanos, strings) se pasan por valor, no por referencia. Entonces si haces esto:
//No solo no puedes reasignar, sino que otros archivos no verán el cambio, porque fue importado como copia del valor.
//Los objetos en JavaScript se pasan por referencia,
//Todos los demás módulos que hayan importado editandoRef verán también ese nuevo valor.
export let editando = {
    value: false
};

//Crearemos un objeto y lo que el usuario vaya escribiendo en los inputs se va a ir guardando en el objeto

export const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: '',
    id: generarId()
}
