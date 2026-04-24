# NO MODIFICAR EL ARCHIVO # 


### Descripción
GameGuess es una aplicación web interactiva basado en la web guessthe.game desarrollada con React que permite a los usuarios jugar a dos modos distintos de adivinanza basados en videojuegos reales obtenidos desde la API de RAWG.
El proyecto incluye autenticación básica, perfiles de usuario, sistema de puntuación, estadísticas, modo invitado, diseño responsive y un sistema de temas (claro/oscuro).

El objetivo principal ha sido simular un flujo de trabajo real: diseño, desarrollo, integración con API externa, manejo de estado global, navegación, UI/UX y documentación profesional.

### Finalidad del proyecto

- Practicar arquitectura de React moderna  
- Implementar un flujo de juego completo con lógica de estado  
- Trabajar UI/UX con glassmorphism y animaciones  
- Gestionar rutas, errores y pantallas especiales  
- Crear componentes reutilizables y escalables  
- Integrar testing automatizado  
- Documentar el proyecto de forma profesional

### Requisitos técnicos

- **Framework:** React + Vite  
- **Routing:** React Router  
- **Estado global:** Context API  
- **Estilos:** CSS modular + variables globales + glassmorphism  
- **Testing:** Vitest + React Testing Library  
- **Estructura de componentes:** basada en features   
- **Página 404:** redirección automática a los 5 segundos  
- **Control de errores:** mensajes temporales (4 segundos)  
- **Responsive:** diseño adaptable a móvil y escritorio  
- **Buenas prácticas:** separación de responsabilidades, componentes puros, hooks limpios




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
├── setupTest.js
├── spec.md
├── vite.config.js
│
├──__test__/
│   ├──app.test.jsx
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
│   │       ├── Header.jsx
│   │       └── Header.css
│   │
│   ├── pages/
│       ├── UserProfile/
│       │   ├── UserProfile.jsx
│       │   └── UserProfile.css
│       │
│       ├── WelcomePage/
│       │   ├── WelcomePage.jsx
│       │   └── WelcomePage.css
│       │
│       ├── Error404/
│           ├── Error404.jsx
│           └── Error404.css
│
└── public/


### 🎨 UI/UX planteados

- Estética **glassmorphism** en todos los elementos interactivos  
- Selectores personalizados con hover y scroll estilizado  
- Pistas mostradas progresivamente  
- Mensajes de feedback temporales (3s)  
- Página 404 minimalista con redirección automática  
- Layout centrado y limpio  
- Animaciones suaves en:
  - aparición de pistas  
  - revelado de imagen  
  - mensajes de correcto/incorrecto  
- Diseño responsive para móvil y escritorio  
