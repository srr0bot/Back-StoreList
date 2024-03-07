const express = require("express");
const router = express.Router();

const DepartmentController = require("../controllers/department.controller");

/**
 * Ruta de departamnetos
 */
router.get("", DepartmentController.getDepartments);
router.get("/:id", DepartmentController.getDepartmentById);
router.post("", DepartmentController.createDepartment);
router.put("/:id", DepartmentController.updateDepartment);
router.delete("/:id", DepartmentController.deleteDepartment);


module.exports = router;

