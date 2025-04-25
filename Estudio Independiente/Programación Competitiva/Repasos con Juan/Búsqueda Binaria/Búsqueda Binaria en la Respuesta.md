---
date: 2024-05-20
tags:
  - Algoritmos
  - Problem-Solving
  - Programación-Competitiva
  - Cpp
---

#### Tema extensión de la [[Búsqueda Binaria]]

Imagina que tienes un arreglo de números enteros, en donde una parte de ellos son números buenos y otra parte son números malos y tenemos la siguiente propiedad.

Si `x-good => x+1-good`, es decir, si un numero es bueno, el siguiente número también será bueno. 

Qué pasa si queremos hallar el numero bueno mínimo?

$$
f(x) = \begin{cases} 1, & x- \text{numero bueno}, \\ 0, & \text{de lo contrario} \end{cases}
$$

Usando los conceptos de búsqueda binaria podemos crear dos punteros para iterar entre una lista en donde algunos números son buenos y otros malos:

```cpp
f(l) = 0 // Donde en un inicio l estará apuntando a un número malo.
f(r) = 1 // Donde enun inicio r estará apuntando a un núero bueno.
```

Entonces, creando la búsqueda binaria, el algoritmo sería el siguiente:

```cpp
while(r>l+1){
m = (l+r)/2;
if(f(m)=1) // si este numero es un numero bueno, movemos el puntero derecho
	r = m;
else l = m // Si no, movemos el puntero izquierdo.
}
```

La diferencia, es que ya no estamos comparando una posición dentro de un arreglo, sino que llamamos a una función que nos dice si el numero es un numero bueno o un número malo.

Un ejemplo puede ser:

Tienes el siguiente rectángulo y el siguiente cuadrado:
![[BusquedaBinariaEnRespuesta.png]]

Y quieres saber cual es el tamaño mínimo que debe tener x para que todos los n rectángulos quepan en el cuadrado.

La formula que nos da la condición para que en este caso, x sea un número bueno es la siguiente.

$$
f(x) = \begin{cases} 1, & \text{if } \left \lfloor \frac{x}{a} \right \rfloor \cdot \left \lfloor \frac{x}{b} \right \rfloor \ge n, \\ 0, & \text{de lo contrario} \end{cases}
$$

Y aplicando una búsqueda binaria, tendríamos el siguiente código:

```cpp
    bool check(ll a, ll b, ll x, ll n) {
    return (x / a) * (x / b) >= n;
}
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    ll w, h, n;
    cin >> w >> h >> n;

    ll l = 0, r = 1
    while (!check(w, h, r, n)) {
        r *= 2;
    }

    while (r > l + 1) {
        ll mid = (l + r) / 2;
        if (check(w, h, mid, n)) {
            r = mid;
        } else {
            l = mid;
        }
    }
    cout << r << endl;
    return 0;
}
```

## Referencias
- [Codeforces - Cursos de la ITMO](https://codeforces.com/edu/course/2/lesson/6/1/practice)