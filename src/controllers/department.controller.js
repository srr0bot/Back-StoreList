const DepartmentService = require("../services/departments.service");

module.exports = {
    /**
     * Método que se encarga de obtener todos los departamentos
     * @param {*} req Http request datos sobre la peticion
     * @param {*} res Http response datos para poder enviar la respuesta
     * @param {*} next Next function se emplea para manejo de errores, en caso de algun error enviará a errorMiddleware que la manejará
     */
    async getDepartments(req, res, next){
        try{
            const findAllDepartments = await DepartmentService.findAllDepartments();

            res.status(200).json({ data: findAllDepartments, status: true })
        }catch(error){
            next(error);
        }
    },
    /**
     * Se encarga de obtener un departamento por un id
     * @param {*} req Http request datos sobre la peticion
     * @param {*} res Http response datos para poder enviar la respuesta
     * @param {*} next Next function se emplea para manejo de errores, en caso de algun error enviara a errorMiddleware que la manejara
     */
    async getDepartmentById(req, res, next){
        try {
            const departmentId = req.params.id;
            const findOneDepartmentData = await DepartmentService.findDepartmentById(departmentId);

            res.status(200).json({ data: findOneDepartmentData, status: true })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Método encargado de crear un departamento
     * @param {*} req Http request datos sobre la peticion
     * @param {*} res Http response datos para poder enviar la respuesta
     * @param {*} next  Next function se emplea para manejo de errores, en caso de algún error enviará a errorMiddleware que la manejara
     */
    async createDepartment(req, res, next){
       
        try {
            const department = req.body;
            const createdDepartment = await DepartmentService.createDepartment(department);

            res.status(201).json({ data: createdDepartment, status: true })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Método encargado de modificar un departamento mediante el id
     * @param {*} req Http request datos sobre la peticion
     * @param {*} res Http response datos para poder enviar la respuesta
     * @param {*} next Next function se emplea para manejo de errores, en caso de algun error enviara a errorMiddleware que la manejara
     */
    async updateDepartment(req, res, next){
        try{
            const id = req.params.id;
            const department = req.body;
            const updatedDepartment = await DepartmentService.updateDepartment(id, department);

            res.status(200).json({ data: updatedDepartment, status: true })
        }catch{
            next(error);
        }
    },

    /**
     * Método encargado de eliminar un departamento por su id
     * @param {*} req Http request datos sobre la peticion
     * @param {*} res Http response datos para poder enviar la respuesta
     * @param {*} next Next function se emplea para manejo de errores, en caso de algun error enviara a errorMiddleware que la manejara
     */
    async deleteDepartment(req, res,next){
        try {
            const id = req.params.id;
            const deletedDepartment = await DepartmentService.deleteDepartment(id);

            res.status(200).json({ data: deletedDepartment, status: true })
        } catch (error) {
            next(error);
        }
    }
}