const { connect, set } = require("mongoose");
const {DBDATA, NODE_ENV} = require("../config/index");

/**
 * Obtiene los valores de las variables de entorno para realizar la conexion con mongodb
 */
const dbConnection = async () => {
    const dbConfig = {
        url: `mongodb+srv://${DBDATA.DB_USER}:${DBDATA.DB_PASSWORD}@${DBDATA.DB_HOST}`,
    };

    if (NODE_ENV !== 'production') {
        set('debug', true);
    }

    await connect(dbConfig.url, dbConfig.options);
 
    console.log("Conexión a la base de datos establecida");
}

module.exports = dbConnection;