[[JSON Web Token]] (JWT) es un estándar que define una forma compacta y auto contenida para transmitir información de forma segura entre partes como lo puede ser un objeto JSON. Esta información puede ser verificada y confiable porque está firmada digitalmente. Los JWTs pueden firmarse usando una llave secreta (con el algoritmo HMAC) o usando una llave privada/publica usando RSA o ECDSA.

A pesar de que los JWTs pueden ser encriptados para proveer discreción entre partes, la prioridad se basa en los tokens firmados. Los tokens firmados pueden verificar la ***integridad*** de las peticiones contenidas en el mismo, mientras que los tokens encriptados ***esconden*** estas peticiones de otras partes. Cuando los tokens se firman usando pares de llaves públicas o privadas, la firma también certifica que solo la parte que tiene la llave privada es la que lo firmó.

## Cuándo deberíamos de usar los JSON Web Tokens?

Aquí hay algunas situaciones en donde los JSON Web Tokens son útiles:
### Autorización
Este es el escenario más común para usar JWT. Una vez que el usuario se registra, cada petición subsecuente incluirá el JWT, permitiendo al usuario acceder a ciertas rutas, servicios o recursos que estén permitidos con dicho token. El inicio de sesión simple es una funcionalidad que usa JWT de una forma amplia en la actualidad, debido a su pequeña sobrecarga y su facilidad para usarse a través de diferentes dominios.
### Intercambio de Información
Los JSON Web Tokens son una buena forma de transmitir información entre partes de una forma segura. Esto se debe a que los JWTs pueden firmarse, por ejemplo, usando llaves pares de tipo privado o público, y con esto puedes asegurarte de que el que envía la información sea quien dice ser. Además, como la firma se calcula usando la cabecera (header) y la carga útil (payload), también puedes verificar que el contenido no haya sido corrompido o manipulado.

## Cuál es la estructura de un JSON Web Token?

En su forma comprimida, los JSON Web Tokens consisten en tres partes separadas por puntos ( . ), que son:

- Una Cabecera (Header)
- Una Carga Util (Payload)
- Una Firma (Signature)

Por lo tanto, comúnmente un JWT se ve de la siguiente manera: `xxxxx.yyyyy.zzzzz`.

Vamos a desglosar las tres partes.

### Header
El header ***normalmente*** consiste en dos partes: el tipo de token, que es JWT, y el algoritmo que está siendo utilizado para firmar el token, como por ejemplo HMAC, SHA256 o RSA.

Por ejemplo:

```json
{
"alg": "HS256",
"typ": "JWT"
}
```

Este JSON está siendo encriptado en ***Base64URL*** para formar la primera parte del JWT.

### Payload
La segunda parte del token es el payload, que contiene las peticiones. Las peticiones son las características sobre una entidad (normalmente, el usuario) y datos adicionales. Hay tres tipos de peticiones: ***Peticiones Registradas***, ***Peticiones Públicas*** y ***Peticiones Privadas***.

#### Peticiones Públicas
Pueden ser definidas a voluntad por aquellos que usen JWTs. Sin embargo, para evitar colisiones deben definirse en el [IANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml) o deben ser definidos como una URI que contenga un espacio de nombres resistentes a colisiones.
#### Peticiones Privadas
Estas son las peticiones personalizadas creadas para compartir información entre partes que acuerdan usar o no, peticiones públicas o peticiones registradas.


Un ejemplo de un payload puede ser:

```JSON
{
"sub": "1234567890",
"name": "John Doe",
"admin": true
}
```

Este payload está codificado en ***Base64Url*** para formar la segunda parte del JSON Web Token.

>Ten en cuenta que en los tokens firmados, aunque la información es protegida contra modificaciones, es legible para todo el mundo. No pongas información secreta en el payload o los elementos de un header en un JWT a no ser que este esté encriptado.

### Signature

Para crear la parte de la firma debes de tomar el header encriptado, el payload encriptado, un secreto, el algoritmo especificado en el header y firmarlo.

Por ejemplo, si quieres usar el algoritmo HMAC SHA256, la firma será creada de la siguiente forma:

```javascript
HMACSHA256(
base64UrlEncode(header)+ "." +
base64UrlEncode(payload),
secret)
```

La firma se usa para verificar que el mensaje no se modificó en todo el recorrido y, en caso de que los tokens fuesen firmados con una llave privada, también verifica que el emisor del JWT sea quien dice ser

### Juntándolo todo

El output son tres strings encriptados en Base64URL separados por puntos que pueden pasarse fácilmente en ambientes HTML y HTTP, siendo a su vez más compactos si se comparan a los que están basando en un estándar XML como por ejemplo un SAML.

A continuación se muestra un JWT que tiene el header previo y el payload encriptado, y está firmado con un secreto.


![[EjemploJWT.png]]