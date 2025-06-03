import { formulario } from "../selectores.js";
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

export default Notificacion;
