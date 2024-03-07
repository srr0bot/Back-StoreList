const { logger } = require("../utils/logger");

const {BASE_ERROR} = require("../constants/errorMessage.contants");

/**
 * Se encarga de manejar los errores lanzados tanto en los controladores como en los servicios y busca devolverle al usuario la informacion sobre el error que se genero
 * @param {*} error error lanzado en el proceso del controllador o el servicio
 * @param {*} req Http request datos sobre la peticion
 * @param {*} res Http response datos para poder enviar la respuesta
 * @param {*} next Next function se emplea para manejo de errores, en caso de algun error enviara a errorMiddleware que la manejara
 */
const ErrorMiddleware = (error, req, res, next) => {
    try {
        const status = error.status || 500;
        const message = error.message || BASE_ERROR;
    
        logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        res.status(status).json({ message });
      } catch (error) {
        next(error);
      }
}

module.exports = ErrorMiddleware;