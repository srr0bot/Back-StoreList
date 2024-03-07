const UserModel = require('../models/user.model');
const errorMessages = require("../constants/errorMessage.contants");
const { isValidObjectId } = require("mongoose");

const bcrypt = require('bcrypt');

module.exports = {
    async findAllUsers() {
        const users = await UserModel.find();
        return users;
    },

    async findUserById(id) {
        if (!isValidObjectId(id)) throw { status: 409, message: errorMessages.INVALID_ID_ERROR(id) };

        const user = await UserModel.findById(id);

        if (!user) throw { status: 404, message: errorMessages.GET_BY_ID_ERROR("usuario") };

        return user;
    },

    async createUser(userData) {
        const createdUser = await UserModel.create(userData);
        return createdUser.email;
    },

    async updateUser(id, userData) {
        if (!isValidObjectId(id)) throw { status: 409, message: errorMessages.INVALID_ID_ERROR(id) };

        const updatedUser = await UserModel.findByIdAndUpdate(id, userData, { new: true });

        if (!updatedUser) throw { status: 404, message: errorMessages.UPDATE_BY_ID_ERROR("usuario") };

        return updatedUser;
    },

    async deleteUser(id) {
        if (!isValidObjectId(id)) throw { status: 409, message: errorMessages.INVALID_ID_ERROR(id) };

        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) throw { status: 404, message: errorMessages.DELETE_BY_ID_ERROR("usuario") };

        return deletedUser;
    },

    async loginUser(email, password) {

        // Buscar el usuario por su correo electrónico en la base de datos
        const user = await UserModel.findOne({ email });

        // Si no se encuentra el usuario, devuelve un error
        if (!user) {
            throw new Error('Correo electrónico o contraseña incorrectos');
        }

        // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Si la contraseña no es válida, devuelve un error
        if (!isPasswordValid) {
            throw new Error('Correo electrónico o contraseña incorrectos');
        }

        // Si el usuario y la contraseña son válidos, devuelve 
        return { email: user.email, type: user.type, id: user._id};
    }

}
