### GameGuess – Proyecto React + API RAWG

### Descripción
GameGuess es una aplicación web interactiva basado en la web guessthe.game desarrollada con React que permite a los usuarios jugar a dos modos distintos de adivinanza basados en videojuegos reales obtenidos desde la API de RAWG.
El proyecto incluye autenticación básica, perfiles de usuario, sistema de puntuación, estadísticas, modo invitado, diseño responsive y un sistema de temas (claro/oscuro).

El objetivo principal ha sido simular un flujo de trabajo real: diseño, desarrollo, integración con API externa, manejo de estado global, navegación, UI/UX y documentación profesional.

### Equipo
Creado por Daniel Estupiñán Ojeda para la Escuela de Programadores IV.

### Funcionalidades
 * Sistema de usuarios:
   - Registro
   - Login
   - Modo invitado 
   - Perfil editable (cambio de nombre con validación)

* Estadísticas por modo de juego

* Puntuación acumulada

* Navegación entre páginas:
   - WelcomePage
   - GameSelector
   - Game
   - UserProfile

* Integración con API RAWG:
   - Carga dinámica de videojuegos
   - Selección aleatoria de juegos
   - Actualización de lista en cada partida

* Modos de juego:
   - Adivina por la portada
   - Adivina el título correcto

* Interfaz interactiva:
   - Sistema de pistas progresivas
   - Animaciones y efectos visuales
   - Mensajes dinámicos (correcto/incorrecto)

* Diseño responsive y moderno:
   - Glassmorphism
   - Modo claro y oscuro
   - Layout adaptable a móvil, tablet y escritorio

### Funcionalidades extra
* Cambio de tema desde el footer

* URL personalizada del perfil (/user-profile?user=Nombre)

* Edición del nombre con validación avanzada

* Actualización automática de la URL tras editar el nombre

* Menú hamburguesa responsive

* Animaciones en mensajes y pistas


### Tecnologías utilizadas
* React + Vite

* React Router

* Context API

* JavaScript 

* CSS

* API RAWG

* GitHub

* Visual Studio Code

* Copilot (explicaciones y documentación)

* Netlify

### Demo en vivo

Repositorio: https://github.com/Danielestoj/

Web:

### Estructura del proyecto

project-root/
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── Data.jsx
│   ├── index.css
│   ├── main.jsx
│   │
│   ├── assets/
│   │   
│   │
│   ├── components/
│   │   ├── Context/
│   │   │   ├── GameDataContext.jsx
│   │   │   └── UserContext.jsx
│   │   │
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   │
│   │   ├── Game/
│   │   │   ├── Game.jsx
│   │   │   ├── Game.css
│   │   │   ├── AnswerInput.jsx
│   │   │   ├── ImageReveal.jsx
│   │   │   └── OptionsInput.jsx
│   │   │
│   │   ├── GameSelector/
│   │   │   ├── GameSelector.jsx
│   │   │   └── GameSelector.css
│   │   │
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │
│   ├── pages/
│   │   ├── UserProfile/
│   │   │   ├── UserProfile.jsx
│   │   │   └── UserProfile.css
│   │   │
│   │   ├── WelcomePage/
│   │       ├── WelcomePage.jsx
│   │       └── WelcomePage.css
│
└── public/
    


### Uso de la API RAWG
La aplicación obtiene videojuegos reales mediante la API de RAWG.

* Datos utilizados:
   - Nombre del juego
   - Imagen de portada
   - Plataformas
   -  Géneros
   - Metacritic
   - Fecha de lanzamiento

* Lógica implementada:
   - Peticiones dinámicas con fetch
   - Selección aleatoria de página y juego
   - Regeneración de lista al iniciar cada partida
   - Reutilización de la lista para cambiar de juego sin recargar
   - Sistema de pistas
   - En el modo Adivina por la portada, el jugador recibe pistas progresivas:
      - Metacritic
      - Plataformas
      - Géneros
      - Año de lanzamiento
      - Solución final

   - Las pistas aparecen solo cuando existen, evitando contenedores vacíos.

### Responsividad
El proyecto sigue un enfoque Mobile First y se adapta a:
   - Móviles (≤ 500px)
   - Tablets (≤ 780px)
   - Escritorio (≥ 1080px)

Incluye:

* Navbar adaptable

* Footer responsive

* GameSelector reorganizado en pantallas pequeñas

* Inputs y botones fluidos

### Flujo de diseño
* Uso de glassmorphism para una estética moderna

* Animaciones suaves en botones, mensajes y pistas

* Paleta de colores adaptada a modo claro/oscuro

* Iconografía minimalista

* Layout centrado y limpio

### Principios de desarrollo
* KISS – Mantenerlo simple

* DRY – Evitar duplicación de código

* Clean Code

* Componentes reutilizables

* Context API para estado global

* Separación clara entre lógica y presentación

* Comentarios explicativos en zonas clave

### Entregables
* Repositorio en GitHub

* Documentación completa (README)

* Código modular y comentado

### Retos encontrados
* Sincronizar el nombre del usuario entre URL, Header y UserProfile

* Actualizar la URL tras editar el nombre sin recargar la página

* Evitar que el logo del Header navegara a la ruta incorrecta

* Reestructurar GameDataProvider para cargar juegos solo cuando se inicia una partida

* Manejo de estados múltiples en Game (pistas, intentos, puntos, mensajes)

### Backlog
* Añadir ranking global de jugadores

* Añadir más modos de juego

* Mejorar animaciones del modo portada

* Añadir sonido opcional (acierto/error)

* Guardar progreso en localStorage

* Añadir selector de dificultad

* Mejorar accesibilidad (A11y)


### Uso de la IA en el trabajo

Principalmente los usos de la IA ha sido tanto como herramienta de aprendizaje como para prototipádos rápidos en el caso de CSS, así como para la resolución de errores que no encontraba el motivo como para avanzar y resolverlo. Normalmente estos errores eran por la falta de conocimientos en herramientas de React y no saber cómo funcionan del todo bien.

### Tiempos de desarrollo
Los siguientes tiempos son tiempos aproximados del desarrollo de cada sección puesto que muchos de ellos se ha trabajado en paralelo unos con otros. Los tiempos incluyen el apartado de css de cada apartado.

* App:
   Tiempo Esperado: 30 min
   Tiempo Real: 15 min

* Header:
   Tiempo Esperado: 1 hora
   Tiempo Real: 1 hora y 30 min

* Footer:
   Tiempo Esperado: 10 min
   Tiempo Real: 10 min

* Modo claro/oscuro:
   Tiempo Esperado: 45 min
   Tiempo Real: 40 min

* Game y módulos:
   Tiempo Esperado: 10 horas
   Tiempo Real: 15 horas

* WelcomePage:
   Tiempo Esperado: 3 horas
   Tiempo Real: 4 horas

* GameSelector:
   Tiempo Esperado: 1 hora
   Tiempo Real: 1 hora

* Contexts:
   Tiempo Esperado: 3 horas
   Tiempo Real: 2 horas y media

* UserProfile:
   Tiempo Esperado: 1 hora
   Tiempo Real: 50 min.

* Tests
   Tiempo Esperado: 1 hora
   Tiempo Real: 1 hora

* README:
   Tiempo Esperado: 1 hora
   Tiempo Real: 1 hora

* Netlify:
   Tiempo Esperado: 30 min
   Tiempo Real: 10 min

* Mock Data:
   Tiempo Esperado: 10 min
   Tiempo Real: 20 min


