const SalesModule = require('../models/sales.model');


const { isValidObjectId } = require('mongoose');

module.exports = {

  async findAllSales() {
    const sales = await SalesModule.find().populate("products.product");

    return sales;
  },


  async createSale(sale) {
    const createSaleData = await SalesModule.create(sale);

    return createSaleData;
  },

  async findSalesInDateRange(date) {
    try {

      const utcDate = new Date(date).toISOString();

      // Obtener la fecha de inicio (00:00:00) y la fecha de fin (23:59:59) del día
      const startDate = new Date(utcDate);
      const endDate = new Date(utcDate);
      endDate.setUTCHours(23, 59, 59, 999);

      // Realizar la agregación para obtener los nombres de los productos y la suma de los montos
      const salesInDateRange = await SalesModule.aggregate([
        {
          $match: {
            date: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $unwind: "$products", // Desenrollar el array de productos
        },
        {
          $lookup: {
            from: "products", // Nombre de la colección de productos
            localField: "products.product",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        {
          $unwind: "$productInfo", // Desenrollar el array de información del producto
        },
        {
          $group: {
            _id: "$products.product", // Agrupar por ID del producto
            totalAmount: { $sum: "$products.quantity" }, // Sumarizar la cantidad vendida
            productName: { $first: "$productInfo.name" }, // Tomar el nombre del producto
          },
        },
      ]);

      return salesInDateRange;
    } catch (error) {
      throw error;
    }
  },


  async findStatisticsSalesByMonth(month, year) {

    try {
      // Validar que el mes esté en el rango de 1 a 12
      if (month < 1 || month > 12) {
        throw new Error("El número de mes debe estar entre 1 y 12");
      }

      // Obtener el primer día del mes
      const startDate = new Date(year, month - 1, 1);

      // Obtener el último día del mes
      const endDate = new Date(year, month, 0);
      endDate.setUTCHours(23, 59, 59, 999);

      const salesByMonth = await SalesModule.aggregate([
        {
          $match: {
            date: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $unwind: "$products",
        },
        {
          $lookup: {
            from: "products",
            localField: "products.product",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        {
          $unwind: "$productInfo",
        },
        {
          $group: {
            _id: "$products.product",
            totalAmount: { $sum: "$products.quantity" },
            productName: { $first: "$productInfo.name" },
          },
        },
      ]);

      const ventas = await SalesModule.find({
        date: { $gte: startDate, $lte: endDate }
      }).populate({
        path: "client",
        select: "email"
      }).populate("products.product");
  

      const groupedByIva = await this.findSalesByIVA(month, year);

      return {
        sales: ventas,
        statistics: salesByMonth,
        groupedByIva: groupedByIva
      };
    } catch (error) {
      throw error;
    }
  },

  async findSalesByMonth(month, year) {
    try {
      // Validar que el mes esté en el rango de 1 a 12
      if (month < 1 || month > 12) {
        throw new Error("El número de mes debe estar entre 1 y 12");
      }
  
      // Obtener el primer día del mes
      const startDate = new Date(year, month - 1, 1);
      
      // Obtener el último día del mes
      const endDate = new Date(year, month, 0);
      endDate.setUTCHours(23, 59, 59, 999);
  
      const salesByMonth = await SalesModule.find({
        date: { $gte: startDate, $lte: endDate }
      }).populate("products.product");
  
      return salesByMonth;
    } catch (error) {
      throw error;
    }
  },

  async findSalesByIVA(month, year) {
    try {
      // Validar que el mes esté en el rango de 1 a 12
      if (month < 1 || month > 12) {
        throw new Error("El número de mes debe estar entre 1 y 12");
      }
  
      // Obtener el primer día del mes
      const startDate = new Date(year, month - 1, 1);
      
      // Obtener el último día del mes
      const endDate = new Date(year, month, 0);
      endDate.setUTCHours(23, 59, 59, 999);
  
      // Realizar la agregación para obtener las ventas agrupadas por IVA
      const salesByIVA = await SalesModule.aggregate([
        {
          $match: {
            date: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $unwind: "$products"
        },
        {
          $lookup: {
            from: "products",
            localField: "products.product",
            foreignField: "_id",
            as: "productInfo"
          }
        },
        {
          $unwind: "$productInfo"
        },
        {
          $group: {
            _id: { iva: "$productInfo.IVA", date: { $dateToString: { format: "%m/%d/%Y", date: "$date" } } },
            totalAmount: { $sum: "$products.quantity" }
          }
        },
        {
          $sort: {
            "_id.date": 1
          }
        }
      ]);
  
      // Estructurar los datos en el formato deseado
      const labels = [...new Set(salesByIVA.map(item => item._id.date))];
      const series = [
        {
          name: 'Iva 0',
          data: labels.map(label => {
            const sale = salesByIVA.find(item => item._id.date === label && item._id.iva === 0);
            return sale ? sale.totalAmount : 0;
          })
        },
        {
          name: 'Iva 5',
          data: labels.map(label => {
            const sale = salesByIVA.find(item => item._id.date === label && item._id.iva === 5);
            return sale ? sale.totalAmount : 0;
          })
        },
        {
          name: 'Iva 19',
          data: labels.map(label => {
            const sale = salesByIVA.find(item => item._id.date === label && item._id.iva === 19);
            return sale ? sale.totalAmount : 0;
          })
        }
      ];
  
      return { labels, series };
    } catch (error) {
      throw error;
    }
  }
  
  
  
};
