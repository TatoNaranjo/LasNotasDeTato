De Wikipedia, la enciclopedia libre


|   |   |
|---|---|
|[![](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Commons-emblem-question_book_orange.svg/40px-Commons-emblem-question_book_orange.svg.png)](https://es.wikipedia.org/wiki/Archivo:Commons-emblem-question_book_orange.svg)|**Este artículo o sección necesita [referencias](https://es.wikipedia.org/wiki/Wikipedia:VER "Wikipedia:VER") que aparezcan en una [publicación acreditada](https://es.wikipedia.org/wiki/Wikipedia:FF "Wikipedia:FF").**  <br>_Busca fuentes:_ [«Perceptrón»](http://www.google.com/search?as_eq=wikipedia&q=%22Perceptr%C3%B3n%22&num=50) – [noticias](https://www.google.com/search?tbm=nws&&as_src=-newswire+-wire+-presswire+-PR+-press+-release+-wikipedia&q=%22Perceptr%C3%B3n%22) · [libros](http://books.google.com/books?as_brr=0&as_pub=-icon&q=%22Perceptr%C3%B3n%22) · [académico](http://scholar.google.com/scholar?q=%22Perceptr%C3%B3n%22) · [imágenes](http://images.google.com/images?safe=off&as_rights=\(cc_publicdomain%7ccc_attribute%7ccc_sharealike%7ccc_noncommercial%7ccc_nonderived\)&q=%22Perceptr%C3%B3n%22)<br><br>Este aviso fue puesto el 15 de julio de 2015.|

[![](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Perceptr%C3%B3n_5_unidades.svg/400px-Perceptr%C3%B3n_5_unidades.svg.png)](https://es.wikipedia.org/wiki/Archivo:Perceptr%C3%B3n_5_unidades.svg)

Diagrama de un perceptrón con cinco señales de entrada.

En el campo de las Redes Neuronales, el **perceptrón**, creado por [Frank Rosenblatt](https://es.wikipedia.org/wiki/Frank_Rosenblatt "Frank Rosenblatt"), se refiere a:

- La [neurona artificial](https://es.wikipedia.org/wiki/Neurona_artificial "Neurona artificial") o unidad básica de inferencia en forma de [discriminador lineal](https://es.wikipedia.org/wiki/Clasificador_lineal "Clasificador lineal"), a partir de lo cual se desarrolla un algoritmo capaz de generar un criterio para seleccionar un subgrupo a partir de un grupo de componentes más grande.

La limitación de este algoritmo es que si dibujamos en un gráfico estos elementos, se deben poder separar con un [hiperplano](https://es.wikipedia.org/wiki/Hiperplano "Hiperplano") únicamente los elementos «deseados» discriminándolos (separándolos) de los «no deseados».

- El perceptrón puede utilizarse con otros tipos de perceptrones o de neurona artificial, para formar una [red neuronal artificial](https://es.wikipedia.org/wiki/Red_neuronal_artificial "Red neuronal artificial") más compleja.

El modelo biológico más simple de un perceptrón es una neurona y viceversa. Es decir, el [modelo matemático](https://es.wikipedia.org/wiki/Modelo_matem%C3%A1tico "Modelo matemático") más simple de una neurona es un perceptrón. La [neurona](https://es.wikipedia.org/wiki/Neurona "Neurona") es una célula especializada y caracterizada por poseer una cantidad indefinida de canales de entrada llamados [dendritas](https://es.wikipedia.org/wiki/Dendrita "Dendrita") y un canal de salida llamado [axón](https://es.wikipedia.org/wiki/Axon "Axon"). Las dendritas operan como sensores que recogen información de la región donde se hallan y la derivan hacia el cuerpo de la neurona que reacciona mediante una [sinapsis](https://es.wikipedia.org/wiki/Sinapsis "Sinapsis") que envía una respuesta hacia el cerebro.[[2]](#cite_note-2)​

Una neurona sola y aislada carece de razón de ser. Su labor especializada se torna valiosa en la medida en que se asocia a otras neuronas, formando una red. Normalmente, el [axón](https://es.wikipedia.org/wiki/Axon "Axon") de una neurona entrega su información como «señal de entrada» a una dendrita de otra neurona y así sucesivamente. El perceptrón que capta la señal en adelante se extiende formando una red de neuronas, sean éstas biológicas o de sustrato [semiconductor](https://es.wikipedia.org/wiki/Semiconductor "Semiconductor") (compuertas lógicas).

El perceptrón usa una [matriz](https://es.wikipedia.org/wiki/Matriz_\(matem%C3%A1tica\) "Matriz (matemática)") para representar las redes neuronales y es un discriminador terciario que traza su entrada ![{\displaystyle x}](https://wikimedia.org/api/rest_v1/media/math/render/svg/87f9e315fd7e2ba406057a97300593c4802b53e4) (un [vector](https://es.wikipedia.org/wiki/Vector "Vector") [binario](https://es.wikipedia.org/wiki/Dato_binario "Dato binario")) a un único valor de salida ![{\displaystyle f(x)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/202945cce41ecebb6f643f31d119c514bec7a074) (un solo valor binario) a través de dicha matriz.

![{\displaystyle f(x)={\begin{cases}1&{\text{si }}w\cdot x-u>0\\0&{\text{en otro caso}}\end{cases}}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/50f2b5077f8fa933c912c6ca0571d6c7d3709d83)

Donde ![{\displaystyle w}](https://wikimedia.org/api/rest_v1/media/math/render/svg/88b1e0c8e1be5ebe69d18a8010676fa42d7961e6) es un vector de pesos reales y ![{\displaystyle w\cdot x}](https://wikimedia.org/api/rest_v1/media/math/render/svg/69b9832ae727dd93d743ed1daf1f7940ebc16f43) es el [producto escalar](https://es.wikipedia.org/wiki/Producto_escalar "Producto escalar") (que computa una [suma ponderada](https://es.wikipedia.org/wiki/Suma_ponderada "Suma ponderada")). ![{\displaystyle u}](https://wikimedia.org/api/rest_v1/media/math/render/svg/c3e6bb763d22c20916ed4f0bb6bd49d7470cffd8) es el 'umbral', el cual representa el grado de inhibición de la neurona, es un término constante que no depende del valor que tome la entrada.

El valor de ![{\displaystyle f(x)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/202945cce41ecebb6f643f31d119c514bec7a074) (0 o 1) se usa para clasificar ![{\displaystyle x}](https://wikimedia.org/api/rest_v1/media/math/render/svg/87f9e315fd7e2ba406057a97300593c4802b53e4) como un caso positivo o un caso negativo, en el caso de un problema de clasificación binario. El umbral puede entenderse como una manera de compensar la [función de activación](https://es.wikipedia.org/wiki/Funci%C3%B3n_de_activaci%C3%B3n "Función de activación"), o una forma de fijar un nivel mínimo de actividad a la neurona para considerarse como activa. La suma ponderada de las entradas debe producir un valor mayor que ![{\displaystyle u}](https://wikimedia.org/api/rest_v1/media/math/render/svg/c3e6bb763d22c20916ed4f0bb6bd49d7470cffd8) para cambiar la neurona de estado 0 a 1. [[3]](#cite_note-3)​

En el perceptrón, existen dos tipos de aprendizaje, el primero utiliza una tasa de aprendizaje mientras que el segundo no la utiliza. Esta tasa de aprendizaje amortigua el cambio de los valores de los pesos.[[4]](#cite_note-Aprendizaje-4)​

El algoritmo de aprendizaje es el mismo para todas las neuronas, todo lo que sigue se aplica a una sola neurona en el aislamiento. Se definen algunas variables primero:

Los dos tipos de aprendizaje difieren en este paso. Para el primer tipo de aprendizaje, utilizando tasa de aprendizaje, utilizaremos la siguiente regla de actualización de los pesos:

![{\displaystyle w(j)'=w(j)+\alpha (\delta -y)x(j)\,}](https://wikimedia.org/api/rest_v1/media/math/render/svg/dc416c6b3193296c4e6f0c4e00200ae296e81cc5)

Para el segundo tipo de aprendizaje, sin utilizar tasa de aprendizaje, la regla de actualización de los pesos será la siguiente:

![{\displaystyle w(j)'=w(j)+(\delta -y)x(j)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/401e2e6b859d636629a220b3b9feec62c037dee2)

Por lo cual, el aprendizaje es modelado como la actualización del vector de peso después de cada iteración, lo cual sólo tendrá lugar si la salida ![{\displaystyle y}](https://wikimedia.org/api/rest_v1/media/math/render/svg/b8a6208ec717213d4317e666f1ae872e00620a0d) difiere de la salida deseada ![{\displaystyle \delta }](https://wikimedia.org/api/rest_v1/media/math/render/svg/c5321cfa797202b3e1f8620663ff43c4660ea03a). Para considerar una neurona al interactuar en múltiples iteraciones debemos definir algunas variables más:

En cada iteración el vector de peso es actualizado como sigue:

El periodo de aprendizaje ![{\displaystyle D_{m}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/f93cd525be900a7ce9ffda3bc18ec1799c056326) se dice que es separable linealmente si existe un valor positivo ![{\displaystyle \gamma }](https://wikimedia.org/api/rest_v1/media/math/render/svg/a223c880b0ce3da8f64ee33c4f0010beee400b1a) y un vector de peso ![{\displaystyle w}](https://wikimedia.org/api/rest_v1/media/math/render/svg/88b1e0c8e1be5ebe69d18a8010676fa42d7961e6) tal que: ![{\displaystyle y_{i}\cdot \left(\langle w,x_{i}\rangle +u\right)>\gamma }](https://wikimedia.org/api/rest_v1/media/math/render/svg/8e413b2645e15b3fc743d9fc5f6a7eba29f00dd2) para todos los ![{\displaystyle i}](https://wikimedia.org/api/rest_v1/media/math/render/svg/add78d8608ad86e54951b8c8bd6c8d8416533d20).

Novikoff (1962) probó que el algoritmo de aprendizaje converge después de un número finito de iteraciones si los datos son separables linealmente y el número de errores está limitado a: ![{\displaystyle \left({\frac {2R}{\gamma }}\right)^{2}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/5c5d152900dc53eab02000355c75300ba96741f6).

Sin embargo si los datos no son separables linealmente, la línea de algoritmo anterior no se garantiza que converja.

Considere las funciones [AND](https://es.wikipedia.org/wiki/AND "AND") y [OR](https://es.wikipedia.org/wiki/Disyunci%C3%B3n_l%C3%B3gica "Disyunción lógica"). Estas funciones son linealmente separables y por lo tanto pueden ser aprendidas por un perceptrón.

[![AND, las salidas de valor alto se representan en verde](https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Computer.Science.AI.Neuron.AND.svg/150px-Computer.Science.AI.Neuron.AND.svg.png)](https://es.wikipedia.org/wiki/Archivo:Computer.Science.AI.Neuron.AND.svg "AND, las salidas de valor alto se representan en verde")[![OR, las salidas de valor alto se representan en verde](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Computer.Science.AI.Neuron.OR.svg/150px-Computer.Science.AI.Neuron.OR.svg.png)](https://es.wikipedia.org/wiki/Archivo:Computer.Science.AI.Neuron.OR.svg "OR, las salidas de valor alto se representan en verde")

La función [XOR](https://es.wikipedia.org/wiki/Disyunci%C3%B3n_exclusiva "Disyunción exclusiva") no puede ser aprendida por un único perceptrón puesto que requiere al menos de dos líneas para separar las clases (0 y 1). Debe utilizarse al menos una capa adicional de perceptrones para permitir su aprendizaje.

[![XOR, las salidas de valor alto se representan en verde](https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Computer.Science.AI.Neuron.XOR.svg/150px-Computer.Science.AI.Neuron.XOR.svg.png)](https://es.wikipedia.org/wiki/Archivo:Computer.Science.AI.Neuron.XOR.svg "XOR, las salidas de valor alto se representan en verde")

Un perceptrón aprende a realizar la función binaria [NAND](https://es.wikipedia.org/wiki/NAND "NAND") con entradas ![{\displaystyle x_{1}\,}](https://wikimedia.org/api/rest_v1/media/math/render/svg/6e43e4dbe894c6812fc4ef377bafc4dc5ff14ce4) y ![{\displaystyle x_{2}\,}](https://wikimedia.org/api/rest_v1/media/math/render/svg/e3892c72a14aa6e51f1d169e5082e2a1cd961765).

En lo que sigue, los pesos finales de una iteración se convierten en los pesos iniciales de la siguiente. Cada ciclo sobre todas las muestras en el conjunto de formación está marcado con líneas gruesas.

|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|Entrada|   |   |   |Pesos iniciales|   |   |Salida|   |   |   |   |Error|Corrección|Pesos finales|   |   |
|Valores de sensor|   |   |Salida deseada|Sensor|   |   |Suma|Red|
|![{\displaystyle x_{0}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/86f21d0e31751534cd6584264ecf864a6aa792cf)|![{\displaystyle x_{1}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/a8788bf85d532fa88d1fb25eff6ae382a601c308)|![{\displaystyle x_{2}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/d7af1b928f06e4c7e3e8ebfd60704656719bd766)|![{\displaystyle z}](https://wikimedia.org/api/rest_v1/media/math/render/svg/bf368e72c009decd9b6686ee84a375632e11de98)|![{\displaystyle w_{0}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/7aa052386ec49846179aa8bbe2b279b57a675e00)|![{\displaystyle w_{1}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/2f6728d2b30f42f88b52281be5ae0584fdc9df64)|![{\displaystyle w_{2}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/8998e0957bb573a19e7d9d934ced62ee68ab8fb8)|![{\displaystyle c_{0}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/1882ba8f1dc60f0c68a642abb5af093c73910921)|![{\displaystyle c_{1}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/77b7dc6d279091d354e0b90889b463bfa7eb7247)|![{\displaystyle c_{2}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/0b30ba1b247fb8d334580cec68561e749d24aff2)|![{\displaystyle s}](https://wikimedia.org/api/rest_v1/media/math/render/svg/01d131dfd7673938b947072a13a9744fe997e632)|![{\displaystyle n}](https://wikimedia.org/api/rest_v1/media/math/render/svg/a601995d55609f2d9f5e233e36fbe9ea26011b3b)|![{\displaystyle e}](https://wikimedia.org/api/rest_v1/media/math/render/svg/cd253103f0876afc68ebead27a5aa9867d927467)|![{\displaystyle d}](https://wikimedia.org/api/rest_v1/media/math/render/svg/e85ff03cbe0c7341af6b982e47e9f90d235c66ab)|![{\displaystyle w_{0}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/7aa052386ec49846179aa8bbe2b279b57a675e00)|![{\displaystyle w_{1}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/2f6728d2b30f42f88b52281be5ae0584fdc9df64)|![{\displaystyle w_{2}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/8998e0957bb573a19e7d9d934ced62ee68ab8fb8)|
||||||||![{\displaystyle x_{0}*w_{0}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/5f4220a1406a6500157e91d8be7cba9773d7df9a)|![{\displaystyle x_{1}*w_{1}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/7aa25a266cafca2ebe7cb6d0996c00bdb1d615f8)|![{\displaystyle x_{2}*w_{2}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/2511ceff67d3473f4805014f85a933641bd2a267)|![{\displaystyle c_{0}+c_{1}+c_{2}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/f0091f9701546ec24e4c084fa444612a57ed8df9)|if ![{\displaystyle s>t}](https://wikimedia.org/api/rest_v1/media/math/render/svg/6d69196ae9f9e887b940ab5e1ae092e5a099e708) then 1, else 0|![{\displaystyle z-n}](https://wikimedia.org/api/rest_v1/media/math/render/svg/d83956a04f8150c6345e6f58b48e5aa100a390c9)|![{\displaystyle r*e}](https://wikimedia.org/api/rest_v1/media/math/render/svg/8965ad5e1153cbf64ba145b1e252f6fa16de39a3)|![{\displaystyle \Delta (x_{0}*d)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/170a4ee206c356f3caacfec89e26e0f0e0765b62)|![{\displaystyle \Delta (x_{1}*d)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/69747539cfd1a708312d0c908b464b808c77f683)|![{\displaystyle \Delta (x_{2}*d)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/0eb8d3b050ae2357f019d395d2a7be37d03cd195)|
|1|0|0|1|0|0|0|0|0|0|0|0|1|+0.1|0.1|0|0|
|1|0|1|1|0.1|0|0|0.1|0|0|0.1|0|1|+0.1|0.2|0|0.1|
|1|1|0|1|0.2|0|0.1|0.2|0|0|0.2|0|1|+0.1|0.3|0.1|0.1|
|1|1|1|0|0.3|0.1|0.1|0.3|0.1|0.1|0.5|0|0|0|0.3|0.1|0.1|
|1|0|0|1|0.3|0.1|0.1|0.3|0|0|0.3|0|1|+0.1|0.4|0.1|0.1|
|1|0|1|1|0.4|0.1|0.1|0.4|0|0.1|0.5|0|1|+0.1|0.5|0.1|0.2|
|1|1|0|1|0.5|0.1|0.2|0.5|0.1|0|0.6|1|0|0|0.5|0.1|0.2|
|1|1|1|0|0.5|0.1|0.2|0.5|0.1|0.2|0.8|1|-1|-0.1|0.4|0|0.1|
|1|0|0|1|0.4|0|0.1|0.4|0|0|0.4|0|1|+0.1|0.5|0|0.1|
|1|0|1|1|0.5|0|0.1|0.5|0|0.1|0.6|1|0|0|0.5|0|0.1|
|1|1|0|1|0.5|0|0.1|0.5|0|0|0.5|0|1|+0.1|0.6|0.1|0.1|
|1|1|1|0|0.6|0.1|0.1|0.6|0.1|0.1|0.8|1|-1|-0.1|0.5|0|0|
|1|0|0|1|0.5|0|0|0.5|0|0|0.5|0|1|+0.1|0.6|0|0|
|1|0|1|1|0.6|0|0|0.6|0|0|0.6|1|0|0|0.6|0|0|
|1|1|0|1|0.6|0|0|0.6|0|0|0.6|1|0|0|0.6|0|0|
|1|1|1|0|0.6|0|0|0.6|0|0|0.6|1|-1|-0.1|0.5|-0.1|-0.1|
|1|0|0|1|0.5|-0.1|-0.1|0.5|0|0|0.5|0|1|+0.1|0.6|-0.1|-0.1|
|1|0|1|1|0.6|-0.1|-0.1|0.6|0|-0.1|0.5|0|1|+0.1|0.7|-0.1|0|
|1|1|0|1|0.7|-0.1|0|0.7|-0.1|0|0.6|1|0|0|0.7|-0.1|0|
|1|1|1|0|0.7|-0.1|0|0.7|-0.1|0|0.6|1|-1|-0.1|0.6|-0.2|-0.1|
|1|0|0|1|0.6|-0.2|-0.1|0.6|0|0|0.6|1|0|0|0.6|-0.2|-0.1|
|1|0|1|1|0.6|-0.2|-0.1|0.6|0|-0.1|0.5|0|1|+0.1|0.7|-0.2|0|
|1|1|0|1|0.7|-0.2|0|0.7|-0.2|0|0.5|0|1|+0.1|0.8|-0.1|0|
|1|1|1|0|0.8|-0.1|0|0.8|-0.1|0|0.7|1|-1|-0.1|0.7|-0.2|-0.1|
|1|0|0|1|0.7|-0.2|-0.1|0.7|0|0|0.7|1|0|0|0.7|-0.2|-0.1|
|1|0|1|1|0.7|-0.2|-0.1|0.7|0|-0.1|0.6|1|0|0|0.7|-0.2|-0.1|
|1|1|0|1|0.7|-0.2|-0.1|0.7|-0.2|0|0.5|0|1|+0.1|0.8|-0.1|-0.1|
|1|1|1|0|0.8|-0.1|-0.1|0.8|-0.1|-0.1|0.6|1|-1|-0.1|0.7|-0.2|-0.2|
|1|0|0|1|0.7|-0.2|-0.2|0.7|0|0|0.7|1|0|0|0.7|-0.2|-0.2|
|1|0|1|1|0.7|-0.2|-0.2|0.7|0|-0.2|0.5|0|1|+0.1|0.8|-0.2|-0.1|
|**1**|**1**|**0**|**1**|**0.8**|**-0.2**|**-0.1**|**0.8**|**-0.2**|**0**|**0.6**|**1**|**0**|**0**|**0.8**|**-0.2**|**-0.1**|
|**1**|**1**|**1**|**0**|**0.8**|**-0.2**|**-0.1**|**0.8**|**-0.2**|**-0.1**|**0.5**|**0**|**0**|**0**|**0.8**|**-0.2**|**-0.1**|
|**1**|**0**|**0**|**1**|**0.8**|**-0.2**|**-0.1**|**0.8**|**0**|**0**|**0.8**|**1**|**0**|**0**|**0.8**|**-0.2**|**-0.1**|
|**1**|**0**|**1**|**1**|**0.8**|**-0.2**|**-0.1**|**0.8**|**0**|**-0.1**|**0.7**|**1**|**0**|**0**|**0.8**|**-0.2**|**-0.1**|

Este ejemplo se puede implementar en [Python](https://es.wikipedia.org/wiki/Python "Python") con el siguiente código.

umbral = 0.5
tasa_de_aprendizaje = 0.1
pesos = [0, 0, 0]
conjunto_de_formación = [((1, 0, 0), 1), ((1, 0, 1), 1), ((1, 1, 0), 1), ((1, 1, 1), 0)]

def producto_punto(valores, pesos):
    return sum(valor * peso for valor, peso in zip(valores, pesos))

while True:
    print('-' * 60)
    contador_de_errores = 0
    for vector_de_entrada, salida_deseada in conjunto_de_formación:
        print(pesos)
        resultado = producto_punto(vector_de_entrada, pesos) > umbral
        error = salida_deseada - resultado
        if error != 0:
            contador_de_errores += 1
            for indice, valor in enumerate(vector_de_entrada):
                pesos[indice] += tasa_de_aprendizaje * error * valor
    if contador_de_errores == 0:
        break

- [Perceptrón multicapa](https://es.wikipedia.org/wiki/Perceptr%C3%B3n_multicapa "Perceptrón multicapa")

1. [↑](#cite_ref-1 "Volver arriba") Ramírez, Fran (20 de julio de 2018). [«Historia de la IA: Frank Rosenblatt y el Mark I Perceptrón, el primer ordenador fabricado específicamente para crear redes neuronales en 1957»](https://web.archive.org/web/20180722124753/https://data-speaks.luca-d3.com/2018/07/historia-de-la-ia-frank-rosenblatt-y-el.html) (html). _LUCA Data Driven Decisions_ (en inglés). Archivado desde [el original](https://data-speaks.luca-d3.com/2018/07/historia-de-la-ia-frank-rosenblatt-y-el.html) el 22 de julio de 2018. Consultado el 22 de julio de 2018. «El primer algoritmo que presentaba una red neuronal simple se llamó Perceptrón, creado por Frank Rosenblatt en 1958 basándos, centrándonos en la Biología, en el trabajo realizado previamente por Santiago Ramón y Cajal y Charles Scott Sherrintong (pioneros en el estudio del funcionamiento del cerebro humano).»
2. [↑](#cite_ref-2 "Volver arriba") Murphy, Robin R. (2000). _Introduction to AI Robotics_ (en inglés) (1ª edición). Cambridge, MA, USA: MIT Press. [ISBN](https://es.wikipedia.org/wiki/ISBN "ISBN") [9780262133838](https://es.wikipedia.org/wiki/Especial:FuentesDeLibros/9780262133838 "Especial:FuentesDeLibros/9780262133838"). «El libro cubre los fundamentos de la inteligencia artificial aplicada a la robótica, incluyendo paradigmas de comportamiento, percepción, y control autónomo.»
3. [↑](#cite_ref-3 "Volver arriba") Mitchell, Tom M. (1997). «Redes neuronales y el algoritmo de retropropagación». _Machine Learning_ (en inglés) (1ª edición). New York, USA: McGraw-Hill Science/Engineering/Math. pp. Capítulo 4. [ISBN](https://es.wikipedia.org/wiki/ISBN "ISBN") [0070428077](https://es.wikipedia.org/wiki/Especial:FuentesDeLibros/0070428077 "Especial:FuentesDeLibros/0070428077"). «El capítulo presenta las bases teóricas y prácticas del aprendizaje mediante redes neuronales, incluyendo el algoritmo de retropropagación como método principal para optimizar los pesos en redes multicapa.»
4. [↑](#cite_ref-Aprendizaje_4-0 "Volver arriba") [Perceptrón Simple](http://www.lab.inf.uc3m.es/~a0080630/redes-de-neuronas/perceptron-simple.html) [Archivado](https://web.archive.org/web/20121221114040/http://www.lab.inf.uc3m.es/~a0080630/redes-de-neuronas/perceptron-simple.html) el 21 de diciembre de 2012 en [Wayback Machine](https://es.wikipedia.org/wiki/Wayback_Machine "Wayback Machine")., Redes de Neuronas Artificiales, UC3M, RAI 2012.

- [Implementación en MATLAB](http://www.mathworks.com/matlabcentral/fileexchange/32949-a-perceptron-learns-to-perform-a-binary-nand-function/content/PerceptronImpl.m)
- [Explicación Geométrica del Perceptron y código de ejemplo en Java](https://web.archive.org/web/20161002112309/http://www.tecnohobby.net/ppal/index.php/inteligencia-artificial/redes-neuronales/11-perceptron)

-  [![Wd](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Wikidata-logo.svg/20px-Wikidata-logo.svg.png)](https://es.wikipedia.org/wiki/Wikidata "Wikidata") Datos: [Q690207](https://www.wikidata.org/wiki/Q690207 "wikidata:Q690207")