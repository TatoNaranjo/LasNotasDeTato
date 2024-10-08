---
date: 2024-07-20
tags:
  - JavaScript
---

```table-of-contents
```

Lo que podemos hacer para que nuestro formulario sea más robusto es validar los campos por medio de JavaScript utilizando el evento `blur`, el cual nos avisa de algún cambio cuando se le quite el foco al elemento en cuestión. Un ejemplo sería el siguiente:

```js
const campodeformulario = document.querySelectorAll("[required]");
campodeformulario.forEach((campo) =>{
campo.addEventListener("blur",()=> verificarCampo(campo))
});


function verificarCampo(campo){
console.log("cambio",cambio.name)
}
```

Dentro de cada función verificar campo podemos ir validando que cada uno de los datos sea correcto. Una cosa que me pareció interesante y muy buena sobre el curso fue el concepto de modularización, es decir, crear un archivo por cada validación para realizar un manejo por funciones que luego se pasan a la función general llamada verificar campo.

Siguiendo el hilo, entonces el archivo principal, que en este caso llamé `main.js` quedaría de la siguiente forma:

```js

import esUnCuil from "../js/validar-cuil.js";
import esMayorDeEdad from "./validar-fecha.js";

const campodeformulario = document.querySelectorAll("[required]");

campodeformulario.forEach((campo) => {
campo.addEventListener("blur", () => verificarCampo(campo));
});


function verificarCampo(campo) {
console.log("cambio", campo.name);
if (campo.name === "cuil" && campo.value.length>=11) {
esUnCuil(campo)
}

if (campo.name === "fecha_nacimiento") {
esMayorDeEdad(campo);
}

}
```



## Validar mayoría de Edad

A continuación presentaré un ejemplo de como poder validar si una persona es mayor de edad para registrarse en un sitio web sacando los datos desde un campo input tipo fecha.

```javascript
export default function esMayorDeEdad(campo){
const fechaNacimiento = new Date (campo.value);

console.log(fechaNacimiento)

console.log(validarEdad(fechaNacimiento));

if(!validarEdad(fechaNacimiento))return false;

else return true;
}

  

function validarEdad(fecha){
const fechaActual = new Date();
const fechaMas18 = new Date (fecha.getUTCFullYear()+18,fecha.getUTCMonth(),fecha.getUTCDate());
return fechaActual>=fechaMas18;

}
```

## Validity Check

Validity es una propiedad de los campos que nos permite ver diferentes propiedades del campo, como por ejemplo si se encuentra vacío o no tiene suficientes caracteres. Gracias a esto podemos validar nuestros campos de una mejor forma, de la siguiente manera.

```javascript
//Console.log(campo.validity);

tiposError.forEach(error =>{
if(campo.validity[error]){

mensaje = mensajes[campo.name][error];
console.log(mensaje)
}
})

const mensajeError = campo.parentNode.querySelector(".mensaje-error");
const validarInputCheck = campo.checkValidity()

if(!validarInputCheck){
mensajeError.textContent = mensaje;
campo.classList.add("error");
}
else mensajeError.textContent = "";
}
```

En donde podemos mandar los mensajes de error gracias a un archivo externo que podemos crear de la siguiente forma:

```javascript
  

export const tiposError =[
"valueMissing",
"typeMismatch",
"patternMismatch",
"tooShort",
"customError",
]

export const mensajes = {
nombre: {
valueMissing: "El campo nombre no puede estar vacío.",
patternMismatch: "Por favor, ingrese un nombre válido.",
tooShort: "Por favor, ingrese un nombre válido.",
},

email: {
valueMissing: "El campo email no puede estar vacío.",
typeMismatch: "Por favor, ingrese un email válido.",
tooShort: "Por favor, ingrese un e-mail válido.",
},

identificacion: {
valueMissing: "El campo identificación no puede estar vacío.",
patternMismatch: "Por favor, ingrese un número de identificación válido.",
tooShort: "El campo no tiene caracteres suficientes.",
},

cuil: {
valueMissing: "El campo cuil/cuit no puede estar vacío.",
patternMismatch: "Por favor, ingrese un cuil/cuit válido.",
customError: "El cuil/cuit ingresado no existe.",
tooShort: "El campo no tiene caracteres suficientes.",
},

fecha_nacimiento: {
valueMissing: "El campo fecha nacimiento no puede estar vacío.",
customError: "Debes ser mayor de 18 años para registrarte.",
},

terminos: {
valueMissing: "Debes aceptar los términos antes de continuar.",
},

};
``` 

## Permitir Usar una Cámara al Usuario

```javascript

const botonAbrirCamara = document.querySelector("[data-video-boton]")
const video = document.querySelector("[data-video]")
const campoCamara = document.querySelector("[data-camera]")

botonAbrirCamara.addEventListener("click",async (evento)=>{
const iniciarVideo = await navigator.mediaDevices.getUserMedia({video:true, audio:false}) 
botonAbrirCamara.style.display = "none";
campoCamara.style.display = "block";
video.srcObject = iniciarVideo;
})
```

## Guardar los datos de un formulario en un Local Storage

Podemos guardar los datos de un formulario en un Local Storage de la siguiente forma:

```javascript
const campodeformulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");
formulario.addEventListener("submit", (evento) => {
evento.preventDefault();

const listaRespuestas = {
nombre: evento.target.elements["nombre"].value,
email: evento.target.elements["email"].value,
identificacion: evento.target.elements["identificacion"].value,
cuil: evento.target.elements["cuil"].value,
fecha_nacimiento: evento.target.elements["fecha_nacimiento"].value,
terminos: evento.target.elements["terminos"].checked,
};

localStorage.setItem("registro", JSON.stringify(listaRespuestas));
window.location.href = "./abrir-cuenta-form-2.html";

});
```