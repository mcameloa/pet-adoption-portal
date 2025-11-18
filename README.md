# pet-adoption-portal

Proyecto creado con **Express.js** utilizando **express-generator** y
motor de vistas **Pug**.\
Este proyecto sirve como base para un portal de adopción de mascotas.

## 📦 Requisitos

-   **Node.js:** v24.11.1\
-   **npm:** versión incluida con Node 24

Verifica tu versión con:

    node -v
    npm -v

## 🚀 Instalación y ejecución

Clona el repositorio:

``` bash
git clone <repo_url>
cd pet-adoption-portal
```

Instala dependencias:

``` bash
npm install
```

Ejecuta el proyecto:

``` bash
npm run dev
```

El servidor estará disponible en:

    http://localhost:3000

## 📁 Estructura del proyecto

    pet-adoption-portal/
    ├── app.js
    ├── bin/
    │   └── www
    ├── package.json
    ├── public/
    │   ├── images/
    │   ├── javascripts/
    │   └── stylesheets/
    ├── routes/
    │   ├── index.js
    │   └── users.js
    └── views/
        ├── error.pug
        ├── index.pug
        └── layout.pug

### Descripción breve

-   **app.js:** configuración principal de Express.\
-   **bin/www:** punto de entrada para iniciar el servidor.\
-   **routes/**: rutas principales del proyecto.\
-   **views/**: plantillas **Pug**.\
-   **public/**: archivos estáticos como CSS, JS y assets.
