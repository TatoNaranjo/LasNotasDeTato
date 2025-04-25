---
date: 2024-10-20
tags:
  - Emprendimiento
  - Documentacion
---

## Solución del Problema

1.  **Determinar el Número de Camiones Necesarios Para Cada Centro Comercial**:
	Para determinar cuántos camiones se requieren para abastecer cada centro comercial, dividimos el volumen total de productos necesarios para cada uno entre la capacidad de los camiones (60 m³):
		
	- Centro Comercial Andino (250 m³): $\frac{250m^3}{60m³/\text{camión}} = \text{5 camiones}$
	- Centro Comercial La Cerrezuela (300 m³): $\frac{300m^3}{60m³/\text{camión}} = \text{5 camiones}$
	- Centro Comercial Unicentro (350 m³): $\frac{350m^3}{60m³/\text{camión}} = \text{6 camiones}$
	- Centro Comercial Santa Fé (400 m³): $\frac{400m^3}{60m³/\text{camión}} = \text{7 camiones}$
	- Centro Comercial Parque La Colina (500 m³): $\frac{500m^3}{60m³/\text{camión}} = \text{9 camiones}$

	Por lo tanto, el número requerido de camiones semanalmente es: $5+5+6+7+9 = \text{32 camiones}$

2. **Calcular el Coste Del Transporte**: Para optimizar el costo de transporte, debemos considerar las distancias de la bodega a cada centro comercial y el número de viajes necesarios. El costo total de transporte se puede calcular multiplicando el número de viajes por la distancia al centro comercial y el costo por Kilómetro ($C$, en $ por $Km$)
   
	- Centro Comercial Andino (50 km con 5 Camiones): $5 * 50 * 2 *C = \text{500C en Pesos}$ 
	- Centro  Comercial La Cerrezuela (60 km con 5 camiones): $5 * 60 * 2 *C = \text{600C en Pesos}$
	- Centro Comercial Unicentro (100 km con 6 camiones): $6 * 100 * 2 *C = \text{1200C en Pesos}$
	- Centro Comercial Santa Fé (150 km con 7 camiones): $7 * 150 * 2 *C = \text{2100C en Pesos}$
	- Centro Comercial Parque La Colina (200 km con 9 camiones): $9 * 200 * 2 *C = \text{3600C en Pesos}$

	El costo comercial semanal del transporte sería la suma de todos los costos para todos los centros comerciales: $500C+600C+1200C+2100C+3600C = 8000C$ ($).
	
3. **Optimización del espacio de la bodega:**

	La capacidad de la bodega es de 2000 m³. Si sumamos los volúmenes semanales requeridos por cada centro comercial:
	
	$300 m³+250 m³+400 m³+350 m³+500 m³=1800 m³$
	
	El total es menor que la capacidad de la bodega (2000 m³), lo que indica que no se requiere implementar medidas adicionales para manejar el inventario en la bodega, ya que esta puede almacenar todos los productos necesarios sin problema.