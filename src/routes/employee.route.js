const express = require("express");
const router = express.Router();

const EmployeeController = require("../controllers/employee.controller");

/**
 * Ruta de empleado
 */
router.get("", EmployeeController.getEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
router.post("/:id", EmployeeController.createEmployee);
router.put("/:id", EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);


module.exports = router;

