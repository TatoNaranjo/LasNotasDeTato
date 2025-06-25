---
date: 2024-09-27
---

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

## Cómo funcionan los JSON Web Tokens?

En la autenticación, cunado el usuario se registra correctamente usando sus credenciales, se retornará un JSON Web Token. Como los tokens son credenciales, hay que tener mucho cuidado para prevenir errores de seguridad. En general, no hay que mantener funcionando un token por más tiempo del requerido.

También, [No deberías almacenar información o datos sensibles en el almacenamiento del navegador debido a fallos de seguridad](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage).

Siempre que el usuario quiera ingresar a una ruta o fuente protegida, el agente usuario debe de enviar el JWT, de manera típica en el header de ***autorización*** usando el esquema ***Bearer***. El contenido del header se debería ver así:

```
Authorization: Bearer <token>
```

Esto puede ser en ciertos casos, un mecanismo de autorización sin estados. Las rutas protegidas del servidor buscarán un JWT valido en `Authorization`, y si está presente, el usuario podrá acceder a las fuentes protegidas. Si el JWT contiene los datos necesarios, podremos reducir la cantidad de queries que hacemos en la base de datos para realizar ciertas operaciones, aunque ese no siempre será el caso.

Date cuenta de que si envías JWT tokens a través de los headers HTTP, debes procurar que no se agranden demasiado. Algunos servidores no aceptan más de 8 KB en sus headers. SI estás intentando juntar demasiada información en un token JWT, como por ejemplo, incluyendo permisos de un usuario, quizás necesites una solución alternativa como una [Autorización detallada de tipo Auth0](https://auth0.com/fine-grained-authorization).

Si el token es enviado en el header `Authorization`, el intercambio de recursos entre orígenes (CORS) no será un problema porque no usa cookies.

El siguiente diagrama nos muestra como se obtiene un JWT y se usa para acceder a APIs o recursos:

![[JWT Workflow Diagram.png]]

1. La aplicación o el cliente pide la autorización al servidor de autorización. Esto se hace a través de uno de los diferentes flujos de autorización. Por ejemplo una aplicación típica compatible con [OpenID Connect](http://openid.net/connect/) irá a través del endpoint `/oauth/authorize` usando el [Flujo de Autorización Por código](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth).
2. Cuando la autorización es concedida, el servidor de autorización devuelve un token de acceso para la aplicación.
3. La aplicación usa el token de acceso para acceder a un recurso protegido (como por ejemplo, una API).

Observa que para los tokens firmados, toda la información contenida en el token está expuesta a usuarios u otros medios, incluso cuando estos no pueden cambiarla. Esto significa que no debes poner información secreta en el token.

## Por qué deberíamos usar los JSON Web Tokens?

Ahora hablemos sobre los beneficios de los **JSON Web Tokens (JWT)** cuando son comparados con los **Simple Web Tokens (SWT)** y Los tokens de lenguaje marcados de afirmación de seguridad (**SAML**).

Como un JSON es menos detallado que un XML, cuando se codifica, su tamaño también se vuelve más pequeño, haciendo un JWT más compacto que un SAML. Esto hace de JWT una buena elección para pasarse mediante ambientes de tipo HTML y HTTP.

En términos de seguridad, los SWT solo pueden ser firmados de manera simétrica por un secreto compartido usando el algoritmo HMAC. Sin embargo los tokens JWT y SAML pueden usar una llave par de tipo pública o privada de la forma de un certificado X.509 por firmar. Firmar XML con una firma digital XML sin agregar oscuros agujeros de seguridad suele ser más difícil si la comparamos con la simplicidad de firmar un JSON.

Los analizadores de tipo JSON son comunes en la mayoría de lenguajes de programación porque se asignan de manera directa a los objetos. De forma contraria, un XML no tiene una asignación tipo documento-objeto de forma natural. Esto hace que sea más fácil trabajar con JWT en vez de con afirmaciones de tipo SAML.

En cuanto al uso, JWT es usado a escala de tipo internet. Esto resalta la facilidad desde el lado del cliente para procesar el JSON Web token desde diferentes plataformas y dispositivos, especialmente el móvil.

![[SAMLVsJWT.png]]

> Comparación de un JWT codificado y un SAML codificado.

Si quieres leer más sobre los JSON Web Tokens e incluso empezar a utilizarlos para mejorar la autenticación dentro de tus propias aplicaciones, busca la [Landing Page de JSON Web Token](https://auth0.com/learn/json-web-tokens) de Auth0 hechos por Okta.
## Recursos de Utilidad

- [JWT Introduction](https://jwt.io/introduction)
- 