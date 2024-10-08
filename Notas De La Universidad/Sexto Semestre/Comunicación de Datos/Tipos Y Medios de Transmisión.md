---
tags:
  - Redes
date: 2024-03-20
---

Tercera clase de [[Comunicación de Datos]]

***Tabla de Contenido***

```table-of-contents
```

# Medios de Transmisión.
Un medio de transmisión constituye el soporte físico a través del cual el emisor y el receptor van a enviar un mensaje en un sistema de transmisión de datos.

Los medios de transmisión son las vias por las que se transportan los datos. Se clasifican en dos grandes grupos:

- Guiados o Alámbricos
- No guiados o inalámbricos.

## Guiados
Conducen las odas a través de un camino físico. Algunos ejemplos son:
### El Par Trenzado
![[cableParTrenzado.png]]
Consiste en un par de hilos conductores de cobre cruzados entre si, con el objetivo de reducir el ruido de diafonía. A mayor número de cruces por unidad de longitud, mejor comportamiento ante el problema de diafonía.

*Tipo de Conector: RJ-45*
![[conectorRJ-45.png]]

El par trenzado reduce el ruido pero no lo elimina.

> Cuando recibimos una llamada y tenemos conectado un celular a un parlante, se produce una interferencia. Esto debido al ruido electromagnético que se presenta al recibir información.

Existen dos tipos:

![[stpVsUtp.png]]
#### Protegido (Shielded Twisted Pair) (STP)
Presenta una cubierta de plástico que protege el cable de contacto directo. 
#### No Protegido (Unshielded Twisted Pair) (UTP)

Dispone de una cobertura exterior en forma de malla conductora, además de la de plástico final, que sirve para reducir las interferencias electromagnéticas externas.

Los pares trenzados STP presentan mejores características de transmisión de los UTP, aunque la ventaja que presentan es que son más caros que los UTP.

#### Normatividad de los Cables Trenzados
![[normatividadCablesTrenzados.png]]

***Naranja Blanco/ Naranja***: *Recibe Datos*
***Verde Blanco/Verde:*** *Transmite Datos*
##### Diferencia Entre T568A y T568B

- A partir de 2018, ANSI/TIA aún **recomienda T568A** para instalaciones residenciales para **compatibilidad** con versiones anteriores de tecnología antigua, como máquinas de fax o una base de conexión para teléfonos inalámbricos. Si no está utilizando ninguno de estos dispositivos, o no tiene la intención de conectar los antiguos enchufes RJ11 a los conectores de pared RJ45 , entonces vuelve a ser una preferencia personal. En realidad, ¿cuántas personas siguen usando este viejo fax o teléfono?

- En el pasado, específicamente con la antigua revisión TIA/EIA 568-B-2 escrita y ratificada alrededor de 2001, esta recomendación era diferente para los espacios comerciales y gubernamentales de EE. UU. TIA recomendó T568A en ese momento y los contratos del gobierno de EE. UU. Anotados adicionalmente requieren T568A. Esto fue para mantener la **compatibilidad con versiones anteriores de equipos más antiguos**, como en el espacio residencial (máquinas de fax, etc.).

- El patrón de cableado T568A se reconoce como el patrón de cableado preferido para este estándar porque proporciona compatibilidad con versiones anteriores para los esquemas de cableado USOC de un par y dos pares.

- El estándar T568B coincide con el antiguo código de color AT&T 258A.

- A partir de la revisión “D”, este ya no es el caso y se eliminaron la recomendación y la notación. El estándar comercial ANSI/TIA 568.2-D ahora es mudo sobre el tema a menos que tenga una razón contractual o técnica para optar por uno u otro. Hay una advertencia en el estándar comercial sobre asegurarse de que ambos extremos del cable estén terminados en el mismo esquema.

- Otra diferencia es que mientras que el estándar **TIA/EIA 568A** proporciona compatibilidad hacia atrás **con varios esquemas** de cableado USOC, el estándar **TIA/EIA 568B** solo proporciona compatibilidad hacia atrás con **un solo esquema** de cableado USOC.
##### Referencia
- [Soporte Lan](https://soportelan.com/2022/06/11/diferencia-entre-t568a-y-t568b/)

#### Categorías de un Par Trenzado

Los Cables de red de par trenzado están categorizado de acuerdo con su capacidad de transportar tráfico a través de la red. Estas categorías

| Nivel De Categoría | Evaluación del Desempeño |
| ---- | ---- |
| Categoría 1 | Sin evaluación de desempeño |
| Categoría 2 | 1 Mbps |
| Categoría 3 | 10 Mbps |
| Categoría 4 | 16 Mbps |
| Categoría 5 | 100 Mbps a 1 Gbps |
| Categoría 6 | 1 Gbps |
### El Cable Coaxial

Es menos propenso al ruido y más económico, sin embargo el volumen de datos es reducido y su velocidad al enviar archivos es muy lenta.

#### TIpos
Existen múltiples tipos de cable coaxial, cada uno con un diámetro e impedancia diferentes.

- **RG-58/U:** Núcleo de cobre sólido.
		[Recurso]([RG_58.pdf (idc-online.com)](https://www.idc-online.com/technical_references/pdfs/data_communications/RG_58.pdf))
		Por cada 30m tiene una atenuación de 9db.
		Es inmune los ruidos que llegan por una interferencia.
		Es utilizado para transmisiones de baja frecuencia.
		Es utilizado para trabajos de cortas distancias.

- **RG-58 A/U:** Núcleo de Hilos Trenzados.
		Por cada 60m tiene una atenuación de 5db.
		Es de ámbito militar.
		Es utilizado para trabajos de cortas distancias.
		
- **RG-59:** Transmisión en Banda Ancha
		Tiene una impedancia de 75 ${\ohm}$.
		Es adecuado para transmitir señales de televisión, pero no para señales de alta definición.

- **RG-6:** Tiene mayor diámetro que el *RG-59* y es considerado para frecuencias más altas que este, pero también es utilizado para transmisiones de banda ancha.
		Flexible y de Bajas Pérdidas
		Tiene una frecuencia de $3GHz$ y un ancho de banda de hasta $3GHz$
		Tiene una impedancia de 75 ${\ohm}$.
		Tiene una velocidad de propagación del 85%.
		Hay una atenuación de $6.5db$ por cada 10m.
		Una velocidad de 10Gbps.

- **RG-62:** Utilizado para redes de área local.
### La Fibra Óptica

Consta de tres secciones concéntricas. La más interna, el núcleo, consiste en una o más hebras o fibras hechas de cristal o plástico. Cada una de ellas lleva un revestimiento de cristal o plástico con propiedades ópticas distintas a las del núcleo. La capa más exterior, que recubre una o más fibras, debe ser de un material opaco y resistente.

No se puede dar un ángulo de 90° porque tanto el núcleo como el revestimiento se parten. Hay un problema de la refacción a nivel de la luz y la información se pierde por completo.

#### Modos de Propagación

##### Fibra Monomodo
Solo se propaga un modo de luz a través de ella. Se logra reduciendo el diámetro del núcleo de la fibra hasta un tamaño (8,3 a 10 micrones) que solo permite un modo de propagación. Su transmisión es paralela al eje de la fibra. Es casi inmune al ruido electromagnético. Puede haber alteraciones cuando esta fibra se somete a frecuencias muy altas.

Los costos de la fibra monomodo son extremadamente costosos, pero vale la pena debido a la velocidad de transferencia de archivos. Esta fibra debe ser de alta calidad, debido a que si en algún punto del revestimiento hay algún componente no deseado, destruye todo el sistema de fibra.

Las fibras monomodo permiten alcanzar grandes distancias (hasta 400km máximo mediante un laser de alta intensidad) y transmitir elevadas tasas de información (Decenas de Gbits/s).
##### Fibra Multimodo
Se propagan múltiples modos de luz y señales a través de ella, debido a que tiene un núcleo de mayor diámetro dentro del cable; Esto significa que se transfieren más tipos de datos. 

La fibra multimodo comprende una menor distancia a comparación de la monomodo, por lo que suele ser usada en un entorno de aplicaciones locales. Una fibra monomodo obtiene sus velocidades gracias a que al transmitir la luz en un solo modo, se anula el retardo de modo diferencial, que es un factor limitante del ancho de banda de una fibra multimodo.

#### Tipos de Pulido
Los extremos de la fibra necesitan un acabado específico en función de su forma de conexión. los acabados más habituales son:

- Plano: Las fibras se terminan de forma plana perpendicular a su eje.
- PC: las fibras son terminadas de forma convexa poniendo en contacto los nucleos de ambas fibras.
## Inalámbricos
