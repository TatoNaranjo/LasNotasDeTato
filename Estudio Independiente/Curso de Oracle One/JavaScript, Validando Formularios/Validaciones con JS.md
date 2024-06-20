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
