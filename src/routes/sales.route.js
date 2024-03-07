const express = require('express');
const router = express.Router();

const salesController = require('../controllers/sales.controller');

router.get('', salesController.getSales);
router.post('', salesController.createSale);
router.get('/:date1', salesController.getSalesInDateRange);
router.get('/getByMonth/:month/:year', salesController.getSalesStatisticsByMonth);

module.exports = router;