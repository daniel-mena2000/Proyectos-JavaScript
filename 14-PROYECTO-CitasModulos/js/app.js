import { pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput, formulario,  } from "../../14-PROYECTO-CitasModulos/selectores.js";

import { datosCita, submitCita } from "../funciones.js";

//Usamos 'change' para detectar cuando el input cambie su valor
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);
formulario.addEventListener('submit', submitCita)
