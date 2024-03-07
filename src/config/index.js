const { config } = require('dotenv');

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

/**
 * Parametros de las variables de entorno obtenidas
 */
const {DB_USER, DB_PASSWORD, DB_HOST, DB_OPTIONS, PORT, NODE_ENV, LOG_FORMAT, LOG_DIR } = process.env;

/**
 * Informacion sobre la base de datos
 */
const DBDATA = {DB_USER, DB_PASSWORD, DB_HOST, DB_OPTIONS};


module.exports = { 
    DBDATA,
    PORT,
    NODE_ENV,
    LOG_FORMAT,
    LOG_DIR
};