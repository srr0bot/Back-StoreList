const DepartmentsModel = require("../models/departments.model")
const errorMessages = require("../constants/errorMessage.contants");
const { isValidObjectId } = require("mongoose");

module.exports = {
    /**
     * Busca todos los departamnetos en la base de datos
     * @returns la lista de departamentos
     */
    async findAllDepartments(){
        const departments = await DepartmentsModel.find();
        return departments;
    }, 

    /**
     * Busca el departamento que contenga el id especifico
     * @param {*} id el id del departamento a buscar (debe coincidir con el formato de objectid, en caso contrario la excepcion es manejada)
     * @returns el departamneto encontrado
     */
    async findDepartmentById(id){
        if (!isValidObjectId(id)) throw { status: 409, message: errorMessages.INVALID_ID_ERROR(id) };

        const findDepartment = await DepartmentsModel.findById(id);

        if (!findDepartment) throw { status: 409, message: errorMessages.GET_BY_ID_ERROR("departamento") };

        return findDepartment;
    },
    /**
     * Método encargado de guardar un departamento nuevo
     * @param {*} department el departamento a guardar
     * @returns los datos que se guardan
     */
    async createDepartment(department){
        const createDepartmentData = await DepartmentsModel.create(department);
        return createDepartmentData;
    },

    /**
     * Se encarga de acualizar el departamento según el id
     * @param {*} id el id del departamento que va a ser actualizado
     * @param {*} department la informacion que se va a modificar
     * @returns los valroes del registro modificado (debe coincidir con el formato de objectid, en caso contrario la excepcion es manejada)
     */
    async updateDepartment(id, department){
        if (!isValidObjectId(id)) throw { status: 409, message: errorMessages.INVALID_ID_ERROR(id) };

        const updateDepartmentById = await DepartmentsModel.findByIdAndUpdate(id, department, {new: true});

        if (!updateDepartmentById) throw { status: 409, message: errorMessages.UPDATE_BY_ID_ERROR("departamento") };

        return updateDepartmentById;
    },
    /**
     * Método encargado de elminar un departamento por su id (debe coincidir con el formato de objectid, en caso contrario la excepcion es manejada)
     * @param {*} id 
     * @returns 
     */
    async deleteDepartment(id){
        const deleteDepartmentById = await DepartmentsModel.findByIdAndDelete(id);
        if (!deleteDepartmentById) throw { status: 409, message: errorMessages.DELETE_BY_ID_ERROR("departamento") };

        return deleteDepartmentById;
    },
    /**
     * Método encragdo de encuentra el departamento que tiene al empleado con la ID proporcionada.
     * @param {*} employeeId el id del empleado
     * @returns El departamento que contiene al empleado
     */
    async findDepartmentByEmployeeId(employeeId) {
        try {
            const department = await DepartmentsModel.findOne({ employees: employeeId });
            return department;
        } catch (error) {
            throw error;
        }
    }
}