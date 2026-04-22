Dia 1:

## Diario de Desarrollo

### Introducción

Este proyecto consiste en una aplicación de juegos donde los usuarios pueden registrarse, iniciar sesión y jugar varios mini-juegos. La interfaz se construyó usando **React** y **React Router** para la navegación entre páginas. También se implementó un sistema de gestión de usuario con funcionalidad de inicio de sesión y perfil.

### Características Implementadas

1. **Página de bienvenida (WelcomePage)**:

   * En la página de bienvenida, el usuario puede registrarse, iniciar sesión o entrar como invitado.
   * Cuando el usuario inicia sesión o se registra, se guarda el nombre de usuario y se muestra un **NavBar** con la información del usuario (nombre y puntuación).
   * El **NavBar** es visible en todas las páginas y cambia su contenido según si hay un usuario registrado o no.

2. **Sistema de Usuario**:

   * Los usuarios pueden registrarse con un nombre de usuario y contraseña.
   * El sistema calcula el total de partidas jugadas (`numPartidas`) basado en las estadísticas de cada tipo de juego (`numPAdivina`, `numPNombre`, `numPReloj`).
   * La puntuación máxima (`maxPoints`) y el número de partidas jugadas se muestran en el **UserProfile**.

3. **Componentes y Navegación**:

   * Usamos **React Router** para la navegación entre las páginas:

     * **WelcomePage**: Página de bienvenida donde el usuario puede iniciar sesión, registrarse o entrar como invitado.
     * **GameSelector**: Página con diferentes juegos para que el usuario seleccione.
     * **UserProfile**: Página donde el usuario puede ver su perfil con información como nombre de usuario, puntuación y estadísticas de juegos.

4. **NavBar**:

   * El **NavBar** muestra siempre el nombre del usuario y los puntos, y tiene un botón para el **Log-Out**.
   * En la **WelcomePage**, el botón de **Iniciar sesión** se oculta automáticamente.
   * Al hacer clic en el nombre del usuario en el **NavBar**, se redirige al perfil del usuario.

### Descripción de la Implementación

1. **Gestionando el Estado del Usuario**:

   * El estado del usuario se guarda en **`App.jsx`** en el estado `userData`, que se actualiza al iniciar sesión o al registrarse.
   * El estado se pasa como props al **NavBar**, **UserProfile** y otras páginas que necesitan información del usuario.

2. **Cálculo de las Estadísticas**:

   * La propiedad `numPartidas` se calcula como la suma de los valores `numPAdivina`, `numPNombre` y `numPReloj`.
   * Esta suma se realiza en **UserProfile.jsx** utilizando el hook `useEffect` para que se actualice cuando se recibe la información del usuario.

3. **Condicional para Mostrar el Botón de Iniciar Sesión**:

   * Usando **`useLocation`** de React Router, se implementó una condición en **NavBar** para que el botón de **Iniciar sesión** se oculte si el usuario está en la página de bienvenida (`/`).
   * Esto permite que el **NavBar** siempre se muestre, pero sin mostrar el botón de **Iniciar sesión** cuando el usuario está en la página de bienvenida.

4. **Redirección a `UserProfile`**:

   * El nombre del usuario en **NavBar** se convierte en un botón que redirige a la página de **UserProfile**.
   * En la página de **UserProfile**, el usuario puede ver su nombre, puntos y estadísticas de las partidas jugadas.

5. **Log-Out**:

   * Se implementó un sistema de **Log-Out** en el **NavBar** que limpia el estado `userData` en **App.jsx** y redirige al usuario a la página principal (`/`).

### Complicaciones y Soluciones

1. **Problema con el uso de `useHistory`**:

   * Al usar **React Router v6**, descubrí que la documentación que utilizaba estaba anticuada y que el hook `useHistory` fue reemplazado por `useNavigate`. Esto obligó a cambiar todas las instancias de `useHistory.push()` a `useNavigate()` para realizar la navegación.

2. **Problema con el uso de `Switch`**:

   * También en la versión 6 de **React Router**, al igual que el caso anterior, el componente `Switch` fue reemplazado por `Routes`. Tuve que cambiar `Switch` por `Routes` y usar la propiedad `element` en lugar de `component` para definir las rutas.

3. **Problema con las rutas en `App.jsx`**:

   * Al principio, tuve problemas al intentar redirigir a la página de **UserProfile** porque las rutas estaban mal configuradas (como `/pages/UserProfile/UserProfile`). Solucioné esto asegurándonos de que la ruta fuera simplemente `/user-profile`.

4. **Mostrar el `NavBar` Condicionalmente**:

   * Añadimos una funcionalidad para que el **NavBar** mostrara el botón **Iniciar sesión** solo si el usuario no está logueado y no está en la página de bienvenida. Esto se logró utilizando **`useLocation`** para verificar la ruta actual.

5. **Cálculo de `numPartidas`**:

   * Se implementó el cálculo de `numPartidas` en **UserProfile.jsx**, sumando las tres propiedades (`numPAdivina`, `numPNombre`, `numPReloj`) y mostrando el resultado en el perfil del usuario.

### Mejoras Futuras

1. **Persistencia de Datos**:

   * Actualmente, los datos de los usuarios están almacenados en un array en **Data.jsx**, lo cual no persiste si recargamos la página. Una mejora futura sería implementar el uso de **localStorage** o una base de datos real para almacenar la información del usuario.

2. **Validación y Seguridad**:

   * Actualmente, no se están realizando validaciones de contraseñas ni ninguna verificación de seguridad para el inicio de sesión. Sería conveniente agregar validaciones y, en un futuro, integrar un sistema de autenticación más robusto.

3. **Estilos Responsivos**:

   * Los estilos podrían mejorarse para que la aplicación sea completamente responsiva y se vea bien en dispositivos móviles. Actualmente, el diseño se adapta, pero se podría mejorar aún más.

---
### Día 2 – Refactorización y Contextos
El segundo día me centré en mejorar la arquitectura:

**Creación de GameDataContext**
* Moví toda la lógica de la API RAWG a un contexto dedicado:

* Carga de juegos

* Selección aleatoria

* loadNewGame()

**Estado global de juegos**

* Limpieza de Game.jsx: Eliminé toda la lógica de fetch y la reemplacé por el contexto. Separé completamente los dos modos de juego.

* Eliminación de Score.jsx: Integré la puntuación directamente en Game.jsx.

* Reorganización de carpetas: Organicé los componentes por áreas funcionales.

* Actualización de App.jsx: Añadí GameDataProvider envolviendo toda la aplicación.

### Día 3 – Correcciones, Estética y Lógica de Juego
Este día estuvo dedicado a pulir detalles y corregir bugs:

* Creación de Game.css: Saqué todos los estilos específicos del juego desde App.css y creé un CSS modular:

* Corrección del bug del modo “título”: Las opciones no aparecían para usuarios registrados porque dependían de imageLoaded.Eliminé esa condición para que las opciones aparezcan siempre.

* Separación total de modos: Ahora cada modo tiene su lógica y UI independiente.

* Corrección del Header. Redirección tanto del título como del Logout a la WelcomePage.


**Mejoras Futuras**
* Persistencia real de usuarios (localStorage o base de datos).

* Validación de contraseñas y seguridad.

* Nuevos modos de juego.

* Animaciones avanzadas (shake al fallar, efectos al acertar).

* Sonidos y feedback visual.


----
### NOTAS PARA EL DIA 4
* Revisar requisitos para comprobar que todo se cumpla

* Hacer mini imprevisto de tiempo en cada sección

* Hacer modo dia/noche

* Modificar profile para que aparezca la ID o el nombre del usuario

