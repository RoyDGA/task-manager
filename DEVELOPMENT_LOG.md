# Development Log

## 1. Información general

- **Proyecto:** Task Management API
- **Tecnologías principales:** Node.js, Express, TypeScript y PostgreSQL.
- **Herramienta de IA utilizada:** ChatGPT.
- **Objetivo:** Desarrollar una API REST para la gestión de tareas, con autenticación, validación de datos, control de acceso y documentación técnica.

## 2. Uso de inteligencia artificial

Durante el desarrollo se utilizó ChatGPT como herramienta de apoyo para comprender conceptos de arquitectura backend, analizar alternativas de implementación, investigar errores y mejorar la documentación técnica.

El uso de la IA estuvo orientado tanto a resolver problemas concretos como a comprender las razones detrás de cada solución. Se formularon preguntas de seguimiento cuando fue necesario entender el funcionamiento de los componentes o contrastar las explicaciones con el comportamiento observado durante las pruebas.

Los temas principales en los que se solicitó apoyo fueron la arquitectura en capas, la autenticación mediante JWT, la validación de solicitudes con AJV, el manejo centralizado de errores y la elaboración de documentación profesional.

### 2.1. Arquitectura en capas y separación de responsabilidades

**Contexto**

La prueba técnica requería organizar el backend en diferentes capas, entre ellas rutas, controladores, servicios y persistencia, ya qué, era necesario comprender cómo se comunican estas capas. 

**Prompt principal**

> Estoy desarrollando una API REST con Node.js, Express y TypeScript, y quiero comprender cómo aplicar una arquitectura en capas. Explícame la responsabilidad de las rutas, los controladores, los servicios y la capa de persistencia, cómo fluye una petición entre ellas.

**Cuestionamiento y seguimiento**

> Quiero poder entender qué responsabilidades deberían permanecer en cada capa.

**Objetivo de aprendizaje**

Comprender el flujo de las solicitudes HTTP a través del sistema desarrollado, lógica de negocio y acceso a los datos.

**Aplicación en el proyecto**

Se organizó el código en carpetas para rutas y middlewares, controladores, servicios, persistencia, configuración, utilidades y validadores.

**Verificación**

Se realizaron operaciones CRUD y se comprobó el aislamiento de las tareas por usuario. La revisión final de la organización y de las responsabilidades de cada archivo hacen parte de la verificación del proyecto.

### 2.2. Validación de datos mediante AJV

**Contexto**

Los endpoints de creación y actualización de tareas debían rechazar solicitudes que no cumplieran con los requisitos del modelo. Era necesario entender cómo integrarlo con Express y cómo comunicar los errores de validación al middleware centralizado.

**Prompt principal**

> Quiero implementar validaciones para los endpoints de tareas de mi API con Express y TypeScript. Quiero utilizar AJV y JSON Schema para comprobar los campos obligatorios, los tipos de datos, las longitudes máximas, el formato de fecha y los estados permitidos. Explícame cómo definir el esquema, cómo compilarlo y cómo crear un middleware reutilizable. También quiero comprender cómo mantener los tipos de TypeScript alineados con el esquema de validación.

**Cuestionamiento y seguimiento**

> Si el middleware de validación detecta que falta un campo obligatorio, ¿cómo se transforma ese resultado en una respuesta HTTP 400? ¿Qué ocurre si el JSON está malformado y Express no puede analizar el cuerpo de la solicitud? Quiero entender la diferencia entre un error de sintaxis del JSON y un JSON válido que incumple el esquema, porque ambos casos deben manejarse controlarse.

**Objetivo de aprendizaje**

Comprender la validación mediante la libreria Ajv, aprender y comprender sobre los middleware y su creación, también diferenciar entre errores de análisis y errores de validación.

**Aplicación en el proyecto**

Se definió un esquema para las tareas y se implementó un middleware para validar las solicitudes antes de que lleguen a los controladores.

**Verificación**

Se realizaron pruebas con solicitudes válidas e inválidas. Se identificó la necesidad de comprobar por separado los casos de JSON malformado y JSON válido con campos obligatorios ausentes, verificando que cada uno produzca la respuesta esperada.

### 2.3. Autenticación mediante JWT

**Contexto**

La API debía permitir registrar usuarios, verificar credenciales y proteger los endpoints de tareas. Además de implementar el mecanismo de autenticación, era necesario comprender cómo se genera un token.

**Prompt principal**

> Estoy implementando autenticación con JWT y quiero comprender el flujo completo desde el registro y el hash de la contraseña con bcrypt hasta el inicio de sesión, la generación del token y la protección de rutas mediante un middleware. Explícame qué información debe contener el token, cómo obtener la identidad del usuario autenticado y cómo evitar un identificador de usuario enviado directamente en el cuerpo de la petición.

**Cuestionamiento y seguimiento**

> Si un token es válido, ¿eso significa que el usuario puede acceder a cualquier tarea de cualquier usuario? 

**Objetivo de aprendizaje**

Comprender el funcionamiento de JWT, cómo se puede utilizar y cómo permite la separación de datos según el usuario.

**Aplicación en el proyecto**

Se implementó el flujo de registro e inicio de sesión, el uso de bcrypt para las contraseñas y un middleware que verifica el token y proporciona la identidad del usuario autenticado a las operaciones protegidas.

**Verificación**

Se probaron el registro y el inicio de sesión. También se realizaron pruebas con dos usuarios distintos para comprobar que uno no pudiera consultar, actualizar ni eliminar las tareas del otro.

### 2.4. Manejo centralizado de errores y clase personalizada

**Contexto**

La aplicación necesitaba devolver respuestas HTTP coherentes cuando se producían errores de validación, recursos inexistentes, problemas de autenticación o fallos inesperados. Se buscaba evitar la repetición de respuestas de error en distintos controladores.

**Prompt principal**

> Quiero comprender cómo implementar un manejo centralizado de errores en Express y TypeScript mediante una clase personalizada que incluya un mensaje y un código HTTP. Cómo distinguir entre errores esperados de la aplicación y errores internos inesperados. 

**Cuestionamiento y seguimiento**

> Si lanzo un `AppError` con código 400 desde el middleware de validación, pero recibo un 500 en la respuesta, ¿qué partes del flujo debería revisar? y ¿cómo debo tratar los errores de sintaxis generados por `express.json()` sin convertir todos los errores en respuestas 400?

**Objetivo de aprendizaje**

Comprender la propagación de errores en Express, el uso de clases personalizadas y la diferencia entre errores controlados e inesperados.

**Aplicación en el proyecto**

Se utilizó una clase `AppError` para representar errores controlados y un middleware centralizado para construir las respuestas HTTP correspondientes. También se contempló el tratamiento específico de solicitudes con JSON malformado.

**Verificación**

Se revisaron las respuestas de error y se probó por separado cada escenario. La compilación y las pruebas finales deben confirmar que los códigos HTTP y los mensajes se comportan como se espera.

### 2.5. Documentación profesional con Swagger y README

**Contexto**

La prueba técnica requería documentar los endpoints y entregar instrucciones que permitieran a otra persona instalar, configurar y ejecutar el proyecto. Era necesario comprender qué información debe proporcionar una documentación útil y cómo mantenerla alineada con la implementación.

**Prompt principal**

> Estoy documentando mi API REST con Swagger y OpenAPI. Quiero comprender cómo describir los endpoints de autenticación y tareas, los parámetros, los cuerpos de las solicitudes, las respuestas HTTP y los requisitos de autenticación JWT. Explícame cómo organizar las anotaciones para que la documentación sea clara, útil y coherente con el comportamiento de la API. También quiero mejorar el README para explicar la instalación, las variables de entorno, la base de datos y los comandos de ejecución.

**Objetivo de aprendizaje**

Comprender la utilidad de OpenAPI y aprender a generar una buena documentación que permita a alguien ajeno pueda entender y ejecutar el proyecto.

**Aplicación en el proyecto**

Se documentaron las rutas de autenticación y tareas, el esquema de autenticación Bearer y los principales códigos de respuesta. También se elaboró un README con las tecnologías, la instalación, la configuración de PostgreSQL, los endpoints y la estructura del proyecto.

**Verificación**

Se abrió Swagger UI y se revisó la documentación generada. Se comprobó el contenido del README frente a los archivos visibles del proyecto.

## 3. Cambios aceptados, ajustes y evaluación crítica

Las respuestas y recomendaciones de la IA se utilizaron como propuestas de trabajo y explicaciones técnicas, no como garantía de solución.

Durante el desarrollo se contrastaron las explicaciones con el código y con el comportamiento observado en Postman y Swagger. Cuando surgieron diferencias entre el resultado esperado y el obtenido, se realizaron preguntas adicionales para identificar qué parte del flujo debía revisarse.

Entre los cambios incorporados se encuentran la separación del código por responsabilidades, la validación de solicitudes mediante AJV, el uso de JWT para autenticar usuarios, la aplicación de restricciones de propiedad sobre las tareas y el manejo centralizado de errores.

### Ejemplo de cuestionamiento técnico

Durante las pruebas de validación ocurrió una diferencia entre las respuestas obtenidas al enviar solicitudes con JSON malformado y con JSON válido al que le faltaban campos obligatorios.

Esta diferencia llevó al análisis de dos caminos de ejecución: el análisis del cuerpo realizado por Express y la validación del esquema realizada por AJV. El objetivo fue determinar en qué punto se generaba cada error y qué middleware debía procesarlo.

por lo que siempre se buscó comprobar el funcionamiento de la aplicación antes de establecer un cambio permanente propuesto por la IA.

## 4. Decisiones técnicas

### 4.1. Selección de PostgreSQL

**Decisión:** utilizar PostgreSQL como base de datos y no mongoDB.

**Justificación:** Aunque MongoDB es mi fuerte, entiendo que hace parte del reto enfrentarse a conceptos o herramientas requeridas, como también, se deja claro que la opción más deseable es usar PostgreSQL.
**Alternativa considerada:** MongoDB, admitida por los requisitos.

### 4.2. Selección de Render

**Decisión:** utilizar Render como plataforma de despliegue.

**Justificación:** Render a diferencia de muchas otras plataformas de despliegue permite usar PostgreSQL como base de datos, por lo mismo, puedo subir tanto la base de datos co    mo la API a una misma plataforma, facilitando la conexión entre ambas partes.
**Alternativa considerada:** "Vercel" para la API y "Neon" para la base de datos.

## 5. Pruebas y verificaciones

Durante el desarrollo se realizaron pruebas funcionales que incluyeron:

- Registro de usuarios.
- Inicio de sesión y obtención de un token JWT.
- Creación, listado, consulta, actualización y eliminación de tareas.
- Comprobación del aislamiento de las tareas por usuario.
- Consulta de la documentación mediante Swagger.
- Revisión de respuestas ante solicitudes inválidas.

## 6. Dificultades y aprendizajes

### Separación de responsabilidades

Se trabajó en comprender cómo distribuir las responsabilidades entre controladores, servicios y repositorios, buscando una organización que facilitara el mantenimiento.

### Validación y errores HTTP

Se analizó la diferencia entre los errores de análisis del JSON, los errores de validación del esquema y los errores inesperados.

### Autenticación y autorización

Se reforzó la distinción entre verificar la identidad de un usuario mediante JWT y comprobar que tiene permiso para acceder a un recurso concreto.

### Documentación técnica

Se trabajó en documentar no solo los endpoints, sino también los pasos necesarios para configurar y ejecutar el proyecto. Se identificó que la documentación debe comprobarse contra la implementación y no tratarse como una descripción independiente del código.

## 7. Conclusiones

ChatGPT se utilizó como herramienta de apoyo para comprender conceptos, explorar distintas alternativas, resolver dudas y revisar el comportamiento de una API backend.

El proceso incluyó preguntas iniciales, cuestionamientos de seguimiento y comprobaciones del comportamiento observado. El propósito fue utilizar la asistencia de IA como apoyo al aprendizaje y al desarrollo, manteniendo la necesidad de revisar el código, comprender las decisiones técnicas y verificar los resultados antes de implementar una solución.