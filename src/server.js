const startApp = require("./app");

const router = require("./routes/index");

/**
 * Punto de partida de la aplicacion y llama al metodo para iniciar todo el servidor
 */
startApp(router);