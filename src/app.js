const cors = require("cors");

const express = require("express");

const { PORT, NODE_ENV, LOG_FORMAT } = require("./config/index");

const { join } = require("path");

const dbConnetion = require("./database/index");
const morgan = require("morgan");
const { stream, logger } = require("./utils/logger");
const ErrorMiddleware = require("./middlewares/error.middleware");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

/**
 * Asigna las rutas al express
 * @param {*} routes 
 */
const setRoutes = (routes) => {
    if (routes) {
        app.use(routes);
    }
}

/**
 * Inicia la escucha de express
 */
const startListening = () => {
    const port = PORT | 3000;
    app.listen(port, () => {
        logger.info(`=================================`);
        logger.info(`======= ENV: ${NODE_ENV} =======`);
        logger.info(`🚀 App listening on the port ${port}`);
        logger.info(`=================================`);
    })
}

/**
 * La documentación sobre endpoints se realiza mediante swagger y aca se establece la configuracion incial
 */
const initializeSwagger = () => {
    const options = {
        swaggerDefinition: {
            info: {
                title: 'Empleados API REST',
                version: '1.0.0',
                description: 'Documentacion sobre la API REST de empleados',
            },
        },
        apis: ['swagger.yaml'],
    };

    const swaggerUiOptions = {
        customCss: ".scheme-container {display: none}"
    };

    const specs = swaggerJSDoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));
};

/**
 * Los middlewares que ejecutan funciones utiles: (morgan para logs)
 */
const initializeUtils = () => {
    app.use(morgan(LOG_FORMAT, { stream }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({origin: ["http://localhost:3030", "front-store-list.vercel.app"], credentials: false}));
}

/**
 * Inicializa el middleware que maneja los errores o las excepciones enviadas a proposito
 */
const initializeErrorHandler = () => {
    app.use(ErrorMiddleware);
}

/**
 * Establece la conexión con la base de datos
 */
const connectToDB = async () => {
    await dbConnetion();
}

/**
 * Método inicial y permite la instancia del express desde el server.js
 * @param {*} routes rutas que van a ser usadas por el sistema
 */
const startApp = async (routes) => {
    await connectToDB();

    initializeUtils();
    setRoutes(routes);
    initializeErrorHandler();

    initializeSwagger();

    startListening();
}

module.exports = startApp;