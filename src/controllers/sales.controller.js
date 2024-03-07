const SalesService = require('../services/sales.service');

module.exports = {

    async getSales(req, res, next) {
        try {
            const findAllSales = await SalesService.findAllSales();

            res.status(200).json({ data: findAllSales, status: true })
        } catch (error) {
            next(error);
        }
    },

    async createSale(req, res, next) {
        try {
            const sale = req.body;
            const createdSale = await SalesService.createSale(sale);

            res.status(201).json({ data: createdSale, status: true })
        } catch (error) {
            next(error);
        }
    },

    async getSalesInDateRange(req, res, next) {
        try {
            const date1 = req.params.date1;
            const findSalesInDateRange = await SalesService.findSalesInDateRange(date1);

            res.status(200).json({ data: findSalesInDateRange, status: true })
        } catch (error) {
            next(error);
        }
    },

    async getSalesStatisticsByMonth(req, res, next) {
        try {
            const month = req.params.month;
            const year = req.params.year;
            const findSalesByMonth = await SalesService.findStatisticsSalesByMonth(month, year);

            res.status(200).json({ data: findSalesByMonth, status: true })
        } catch (error) {
            next(error);
        }
    }


}
