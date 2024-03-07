/**
 * Constantes de mensajes que se pueden personalizar mediante el envio de un nombre para mostrar informacion mas especifica
 */

module.exports = {
    BASE_ERROR: () => "Ups algo ha salido mal",
    GET_ALL_ERROR: modelName => `No se ha podido obtener la lista de ${modelName}s`,
    GET_BY_ID_ERROR: modelName => `No existe el ${modelName} con el ID proporcionado`,
    UPDATE_BY_ID_ERROR: modelName => `No existe el ${modelName} con el ID proporcionado, no se puede actualizar`,
    DELETE_BY_ID_ERROR: modelName => `No existe el ${modelName} con el ID proporcionado, no se puede eliminar`,
    INVALID_ID_ERROR: id => `El id ${id} no es un id valido`,
};