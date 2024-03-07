const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

// Rutas para la gestión de usuarios
router.get("/", UserController.getUsers); // Obtener todos los usuarios
router.get("/:id", UserController.getUserById); // Obtener un usuario por su ID
router.post("/", UserController.createUser); // Crear un nuevo usuario
router.put("/:id", UserController.updateUser); // Actualizar un usuario existente
router.delete("/:id", UserController.deleteUser); // Eliminar un usuario

router.post("/login", UserController.loginUser); // Iniciar sesión

module.exports = router;
