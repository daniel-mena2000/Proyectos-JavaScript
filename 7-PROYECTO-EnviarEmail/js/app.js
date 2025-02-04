
document.addEventListener('DOMContentLoaded', function() {

// objeto principal para validar y sincronizar datos

const emailObjet = {
    email: '',
    asunto: '',
    mensaje: ''
}
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')

    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);

// REINICIAR FORMULARIO
    btnReset.addEventListener('click', (e) => {
        e.preventDefault();

        reseteo()
    });

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            reseteo()

            const alertaExito = document.createElement('P');

            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');

            alertaExito.textContent = 'Mesnaje enviado correctamente';

            formulario.appendChild(alertaExito)
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }


    function validar(e) {
if (e.target.value.trim() === '') {
console.log(e.target.parentElement);

    mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
// Este codigo ayuda a primero que si el usuario borra lo que escribio y se queda vacio el formulario, tambien se borre o reinicie el objeto donde se esta guardando la informacion para desahabilitar los botones
//Segundo mandamos llamar la funcion para ver si el input esta vacio
    emailObjet[e.target.name] = ''
    comprobarEmails()
    return;
}
if (e.target.id === 'email' && !validarEmail(e.target.value)) {
    mostrarAlerta('El email no es valido', e.target.parentElement);
    emailObjet[e.target.name] = ''
    comprobarEmails()
    return;
}
// cuando ya no se cumpla la validacion anterior es decir que ya no esta vacio el input ejecutamos la funcion de limpiar, y mientras este vacio el "return" seguira ejecutando el mensaje
limpiarAlerta(e.target.parentElement);

// Asignar valores al objeto
//Usamos el "name" para identificar el input
    emailObjet[e.target.name] = e.target.value.trim().toLowerCase();
    console.log(emailObjet);


    comprobarEmails()

    }

// Le pasaremos el parametro de "referencia" para que coloque el error dependiendo el input
    function mostrarAlerta(mensaje, referencia) {
// comprueba que la alaerta esta activa, nos ayudaremos de la clase "bg-red-600" para verificar si esta ya esta en el input, verificara que ese elemento de la referencia tenga el "bg-red-600" en vez de buscar en todo el elemento con document
const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove()
        }

        const error = document.createElement('P');
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')
// Ya no le daremos el appendChild a "formulario" si no a la referencia que apunta dependiendo el input
        // formulario.appendChild(error)
        referencia.appendChild(error)

    }

// funcion para limpiar el mensaje cuando el input ya no este vacio
    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove()
        }
    }


    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
// con test dara true o false en caso de que no se cumpla la expresion regular
        return regex.test(email);
    }


    function comprobarEmails(params) {
    // Tomamos los valores del objeto "emailObjet" y los asignamos a un array de solo los valores, y con includes verificamos si alguna de la propiedades de los valores es un string vacio esto nos va a  retornar true, y si ya estan todas llenas dara false es decir que el formulario se lleno completamente

    if (Object.values(emailObjet).includes('')) {
// Si hace falta un campo que este vacio se le vuelven a agregar las clases y el disabled
        btnSubmit.classList.add('opacity-50');
        btnSubmit.disabled = true;
    }else{
//cuando ya este lleno el formulario habilitaremos el boton de submit y quitaremos la opacidad

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }
    }

    function reseteo() {

        emailObjet.email = '';
        emailObjet.asunto = '';
        emailObjet.mensaje = '';

        formulario.reset();
        comprobarEmails();
    }
})
