const UserServices = require('../services/user.service');

module.exports = {
    async getUsers(req, res, next) {
        try {
            const allUsers = await UserServices.findAllUsers();
            res.status(200).json({ data: allUsers, status: true });
        } catch (error) {
            next(error);
        }
    },

    async getUserById(req, res, next) {
        try {
            const userId = req.params.id;
            const user = await UserServices.findUserById(userId);
            res.status(200).json({ data: user, status: true });
        } catch (error) {
            next(error);
        }
    },

    async createUser(req, res, next) {
        try {
            const userData = req.body;
            const createdUser = await UserServices.createUser(userData);
            res.status(201).json({ data: createdUser, status: true });
        } catch (error) {
            next(error);
        }
    },

    async updateUser(req, res, next) {
        try {
            const userId = req.params.id;
            const userData = req.body;
            const updatedUser = await UserServices.updateUser(userId, userData);
            res.status(200).json({ data: updatedUser, status: true });
        } catch (error) {
            next(error);
        }
    },

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.id;
            const deletedUser = await UserServices.deleteUser(userId);
            res.status(200).json({ data: deletedUser, status: true });
        } catch (error) {
            next(error);
        }
    },

    async loginUser(req, res, next) {
        try {
          const { email, password } = req.body;
            const token = await UserServices.loginUser(email, password);
            res.status(200).json({ data: token, status: true });
        } catch (error) {
          next(error);
        }
      },
    };
