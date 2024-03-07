const EmployeesModel = require("../models/employees.model")
const errorMessages = require("../constants/errorMessage.contants");
const { isValidObjectId } = require("mongoose");

module.exports = {

    /**
     * Busca todos los empoleados en la base de datos
     * @returns la lista de empleados
     */
    async findAllEmployees() {
        const employees = await EmployeesModel.find();
        return employees;
    },

    /**
     * Busca el empleado que contenga el id especificado
     * @param {*} id el id del empleado a buscar (debe coincidir con el formato de objectid, en caso contrario la excepcion es manejada)
     * @returns el empleado encontrado
     */
    async findEmployeeById(id) {
        if (!isValidObjectId(id)) throw { status: 409, message: errorMessages.INVALID_ID_ERROR(id) };

        const findEmployee = await EmployeesModel.findById(id);

        if (!findEmployee) throw { status: 409, message: errorMessages.GET_BY_ID_ERROR("empleado") };

        return findEmployee;
    },

    /**
     * Método encargado de guardar un empleado nuevo
     * @param {*} employee el empleado a guardar
     * @returns los datos que se guardaron
     */
    async createEmployee(employee) {
        const createEmployeeData = await EmployeesModel.create(employee);

        return createEmployeeData;
    },

    /**
     * Se encarga de acualizar el empleado según un id
     * @param {*} id el id del empleado que va a ser actualizado
     * @param {*} employee la informacion que se va a modificar
     * @returns los valroes del registro modificado (debe coincidir con el formato de objectid, en caso contrario la excepcion es manejada)
     */
    async updateEmployee(id, employee) {
        if (!isValidObjectId(id)) throw { status: 409, message: errorMessages.INVALID_ID_ERROR(id) };

        const updateEmployeeById = await EmployeesModel.findByIdAndUpdate(id, employee, {new: true});

        if (!updateEmployeeById) throw { status: 409, message: errorMessages.UPDATE_BY_ID_ERROR("empleado") };

        return updateEmployeeById;
    },

    /**
     * Método encargado de elminar un empleado por su id (debe coincidir con el formato de objectid, en caso contrario la excepcion es manejada)
     * @param {*} id id del empleado a eliminar
     * @returns los datos del empleado que se ha eliminado
     */
    async deleteEmployee(id) {
        const deleteEmployeeById = await EmployeesModel.findByIdAndDelete(id);
        if (!deleteEmployeeById) throw { status: 409, message: errorMessages.DELETE_BY_ID_ERROR("empleado") };

        return deleteEmployeeById;
    }

}