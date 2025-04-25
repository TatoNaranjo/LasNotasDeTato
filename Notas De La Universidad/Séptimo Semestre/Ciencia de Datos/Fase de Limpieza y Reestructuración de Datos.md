---
date: 2024-10-11
tags:
  - Scripting
  - Algoritmos
  - Automatización
  - CienciaDeDatos
---

> Por: Santiago Naranjo Herrera y Edgar Duván Bernal Acero

El código se encuentra en el siguiente [Link](https://gist.github.com/dvnber10/dc06a1e2733576ca37e5c1de0ac54dd0)

### 1. **Introducción**

El objetivo de este script es realizar la recolección, limpieza y reestructuración de datos obtenidos desde diferentes fuentes, procesarlos, y luego almacenarlos en una base de datos MongoDB. Se procesan datos en formato JSON y se integran diversas fuentes, como la API `ipinfo.io` y un archivo de texto para validar posibles ataques en los recursos obtenidos.

### 2. **Descripción del Código**

#### 2.1. **Importación de Librerías**

El script hace uso de librerías clave para la gestión de datos y comunicación con APIs externas:

- `json`: para trabajar con datos en formato JSON.
- `requests`: para realizar solicitudes HTTP a una API.
- `pymongo`: para interactuar con una base de datos MongoDB.
- `dotenv`: para cargar variables de entorno de manera segura.

#### 2.2. **Obtención de Datos JSON**

El método `obtain_json(path)` se encarga de leer un archivo JSON que contiene datos de entrada. Este archivo se limita a las primeras 2000 entradas para evitar sobrecarga en el procesamiento:

```python
`def obtain_json(path):     
	limite = 2000     
	with open(path, 'r') as file:         
		data = json.load(file)     
	datos_limitados = data[:limite]       
	return datos_limitados`
```


#### 2.3. **Reestructuración de Datos: Ordenación por Región**

El método `order_data(datos)` toma los datos obtenidos y, usando una API externa (`ipinfo.io`), determina la región asociada a la dirección IP de cada entrada. Los resultados son almacenados en un archivo `resultados.json`.


```python
`def order_data(datos):     # Solicita información de la IP desde una API`
```
Este método es clave para la geolocalización de las IPs, lo que añade valor al análisis de datos.

#### 2.4. **Detección de Ataques**

El método `checkPurpose(data)` examina cada recurso en los datos y lo compara con las entradas de un archivo grande (`big.txt`) que contiene posibles ataques. Si se detecta una coincidencia, marca el recurso como potencialmente comprometido.

```python
`def checkPurpose(data):     # Valida si el recurso fue hackeado`
```

Este proceso es crítico para identificar y etiquetar amenazas o compromisos de seguridad.

#### 2.5. **Interacción con la Base de Datos MongoDB**

El script utiliza variables de entorno (`dotenv`) para obtener las credenciales de MongoDB y conectar con las colecciones correspondientes. Inserta los datos procesados en tres colecciones:

- `table3`: Datos generales.
- `table1`: Datos ordenados por región.
- `table2`: Recursos detectados como atacados.

### 3. **Fases del Proceso**

#### 3.1. **Carga de Datos**

El proceso empieza cargando los datos desde un archivo JSON. La limitación a 2000 registros ayuda a evitar sobrecarga de datos.

![[Pasted image 20241011102154.png]]

![[Pasted image 20241011102207.png]]

![[Pasted image 20241011102218.png]]

#### 3.2. **Transformación de Datos**

Se reestructuran los datos mediante el enriquecimiento con información de región y la validación contra una lista de posibles ataques.

#### 3.3. **Almacenamiento en MongoDB**

Finalmente, los datos transformados son almacenados en diferentes colecciones de una base de datos MongoDB, lo que permite un fácil acceso para análisis posteriores.

### 4. **Conclusión**

Este script implementa una fase importante de un pipeline de datos, realizando tanto limpieza como enriquecimiento de los datos originales. La integración con servicios externos y la estructuración en diferentes colecciones de MongoDB permite una gestión eficiente de la información.