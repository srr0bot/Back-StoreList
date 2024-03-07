const EmployeeService = require("../services/employee.service");
const DepartmentService = require("../services/departments.service");

module.exports = {
    /**
     * Método que se encarga de obtener todos los empleados
     * @param {*} req Http request datos sobre la peticion
     * @param {*} res Http response datos para poder enviar la respuesta
     * @param {*} next Next function se emplea para manejo de errores, en caso de algun error enviará a errorMiddleware que la manejará
     */
    async getEmployees(req, res, next) {
        try {
            const findAllEmployees = await EmployeeService.findAllEmployees();

            res.status(200).json({ data: findAllEmployees, status: true })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Se encarga de obtener un empleado por un id
     * @param {*} req Http request datos sobre la peticion
     * @param {*} res Http response datos para poder enviar la respuesta
     * @param {*} next Next function se emplea para manejo de errores, en caso de algun error enviara a errorMiddleware que la manejara
     */
    async getEmployeeById(req, res, next) {
        try {
            const employeeId = req.params.id;
            const findOneEmployeeData = await EmployeeService.findEmployeeById(employeeId);

            res.status(200).json({ data: findOneEmployeeData, status: true })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Método encargado de crear un empleado
     * @param {*} req Http request datos sobre la peticion
     * @param {*} res Http response datos para poder enviar la respuesta
     * @param {*} next Next function se emplea para manejo de errores, en caso de algún error enviara a errorMiddleware que la manejara
     */
    async createEmployee(req, res, next) {
        try {
            const employee = req.body;
            const createdEmployee = await EmployeeService.createEmployee(employee);
            const departmentId = req.params.id;
            const findOneDepartmentData = await DepartmentService.findDepartmentById(departmentId);
            findOneDepartmentData.employees.push(createdEmployee)
            await findOneDepartmentData.save()
           
            res.status(201).json({ data: createdEmployee, status: true })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Método encargado de modificar un empleado mediante el id
     * @param {*} req Http request datos sobre la peticion
     * @param {*} res Http response datos para poder enviar la respuesta
     * @param {*} next Next function se emplea para manejo de errores, en caso de algun error enviara a errorMiddleware que la manejara
     */
    async updateEmployee(req, res, next) {
        try {
            const id = req.params.id;
            const employee = req.body;
            const updatedEmployee = await EmployeeService.updateEmployee(id, employee);

            res.status(200).json({ data: updatedEmployee, status: true })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Método encargado de eliminar un empleado por su id
     * @param {*} req Http request datos sobre la peticion
     * @param {*} res Http response datos para poder enviar la respuesta
     * @param {*} next Next function se emplea para manejo de errores, en caso de algun error enviara a errorMiddleware que la manejara
     */
    async deleteEmployee(req, res, next) {
        try {
            const id = req.params.id;
            const employee = await EmployeeService.findEmployeeById(id);
            const department = await DepartmentService.findDepartmentByEmployeeId(id);
            if (department) {
                department.employees.pull(id);
                await department.save();
            }
            const deletedEmployee = await EmployeeService.deleteEmployee(id);

            res.status(200).json({ data: deletedEmployee, status: true })
        } catch (error) {
            next(error);
        }
    }
}