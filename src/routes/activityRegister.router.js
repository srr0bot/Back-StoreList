const express = require('express');
const router = express.Router();

const ActivityController = require('../controllers/activityRegister.controller');


router.post('/login', ActivityController.logUserLogin);
router.get('/:date', ActivityController.getActivitiesByDay);
router.get('/:year/:month', ActivityController.getActivitiesByMonthAndYear);

module.exports = router;
