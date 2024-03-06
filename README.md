# API de Node.js

Esta es una API de Node.js construida con Express para manejar rutas relacionadas con órdenes, productos, usuarios, categorías y dashboard. Utiliza diversas bibliotecas y herramientas para su funcionamiento.

## Requisitos

Asegúrate de tener instalado lo siguiente antes de comenzar:
- Node.js
- npm (Administrador de paquetes de Node.js)

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando el siguiente comando:

```bash
npm install
```

## Uso
La API proporciona las siguientes rutas:

- `/orders`: Rutas para manejar órdenes.
- `/products`: Rutas para manejar productos.
- `/users`: Rutas para manejar usuarios.
- `/category`: Rutas para manejar categorías.
- `/dashboard`: Rutas para el dashboard.


### Autenticación y Autorización
Se utiliza JSON Web Token (JWT) para autenticar usuarios y autorizar el acceso a ciertas rutas. Asegúrate de enviar el token de autenticación en el encabezado de Authorization para acceder a las rutas protegidas.

### Encriptación de Contraseñas
La contraseña de usuario se encripta utilizando bcrypt antes de almacenarse en la base de datos. Esto garantiza la seguridad de las contraseñas almacenadas.

### Validación de Datos
Se utiliza express-validator para validar los datos enviados en las solicitudes. Esto ayuda a garantizar que los datos ingresados sean válidos y cumplan con los requisitos especificados.

### Integración con Cloudinary
Se integra con Cloudinary para almacenar y gestionar imágenes de productos de manera eficiente en la nube. Esto ayuda a reducir la carga en el servidor y mejorar el rendimiento de la aplicación.


