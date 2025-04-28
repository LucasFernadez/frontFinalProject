#Tres en raya (frontend)

Pagina en React+Vite que permite a usuarios autentificarse con Firebase, jugar, registrar el marcador de sus partidas 
y consultar ese marcador personal almacenado en un backend en MongoDB.

La pagina de front esta creada para añadir mas rutas y tener a disposición mas juegos.

Tenemos de rutas: 
/dashboard -- Pagina principal
/login -- Iniciar sesión
/app/scoreboard --  Ver marcador
/app/tresenraya -- Jugar

Se ha añadido alguna imagen para editar el estilo de la pagina.
/public/_redirects -- para que Netlify redirija automaticamente al servidor de backend.

en scoreboard.js construimos las urls gestionamos la autentificacion y exportamos estados del marcador.
en AuthContext.jsx comprobamos continuamente si el usuario esta autenticado y hookea para acceder al user desde cualquier componente.

en /pages/Dashboard.jsx tenemos la pagina principal donde se pueden implementar mas juegos y aplicaciones.
/pagesLogin.jsx pagina de incio de sesion simple
/pages/Scoreboard.jsx pagina donde el usuario accede a su marcador personal.
/pages/TresEnRaya.jsx habilita el juego y actualiza el marcador. Es un puente entre React y el juego.
index.jsx archivo que se encarga de inicializar todo.
App.jsx define toda la navegacion.
/public/tresenraya esta compuesto por index.html, script.js y styles.css es el juego del tres en ralla, cada vez que pulsas le toca a un jugador, cada jugador esta representado con un color.


Para este proyecto se ha utilizado:
- Vite
- React 18
- React Router v6
- Firebase
- Axios
- Netlify
- Railway
