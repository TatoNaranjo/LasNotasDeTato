Tercera clase de [[Comunicación de Datos]]

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
##### **DIFERENCIA ENTRE T568A Y T568B**

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
### La Fibra Óptica

## Inalámbricos
