Podemos implementar nuestros propios Hooks en react utilizando la herramienta de react llamada Custom Hooks. Un custom Hook permite mejorar la lógica de programación de nuestras aplicaciones encapsulando lo que queremos implementar dentro de un Hook personalizado de react que es reutilizable.


Por convenciones, debido a que el archivo que creamos como nuestro hook nuevo no tiene una funcionalidad de componente, lo que hacemos es crear una carpeta llamada `hooks` dentro de la carpeta `src`.

#### Ejemplo:
En el caso del proyecto que realizamos para este curso, queremos implementar un hook que pueda ser posiblemente reutilizado en un futuro, y que consiste en saber cuándo tenemos que mostrar o no un cuadro modal.

A continuación muestro un ejemplo de un hook que encapsula los datos una vez hecha la solicitud:

```jsx
import { useContext } from "react";
import globalContext from "../context/globalContext";

function usePhotoModal (){
	const {selectedPhoto, openedModal} = useContext(globalContext);
	const openModal = (photo) =>{
		photo => setSelectedPhoto(photo)
	}

	const closeModal = () =>{
		photo => setSelectedPhoto(null)
	}

const selectedPH = selectedPhoto;
const isOpenedModal = openedModal
return {isOpenedModal,openModal,closeModal,selectedPH}
}

export default usePhotoModal
```