const ActivityService = require('../services/activityRegister.service');

module.exports = {
    async logUserLogin(req, res, next) {
        try {
            const userId = req.body.id;
            await ActivityService.logUserLogin(userId);
            res.status(200).json({ message: 'Registro de actividad creado para el inicio de sesión del usuario', success: true });
        } catch (error) {
            next(error);
        }
    },

    async getActivitiesByDay(req, res, next) {
        try {
            const { date } = req.params;
            const activityCount = await ActivityService.getActivityCountByDay(date);
            res.status(200).json({ count: activityCount, success: true });
        } catch (error) {
            next(error);
        }
    },

    async getActivitiesByMonthAndYear(req, res, next) {
        try {
            const { year, month } = req.params;
            const activities = await ActivityService.getActivitiesByMonthAndYear(year, month);
            res.status(200).json({ data: activities, success: true });
        } catch (error) {
            next(error);
        }
    }
};
