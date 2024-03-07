const ProductServices = require('../services/products.service');


module.exports = {

    async getProducts(req, res, next){
        try {
            const findAllProducts = await ProductServices.findAllProducts();

            res.status(200).json({ data: findAllProducts, status: true })
        } catch (error) {
            next(error);
        }
    }, 

    async getProductById(req, res, next){
        try {
            const productId = req.params.id;
            const findOneProductData = await ProductServices.findProductById(productId);

            res.status(200).json({ data: findOneProductData, status: true })
        } catch (error) {
            next(error);
        }
    },

    async createProduct(req, res, next){
        try {
            const product = req.body;
            const createdProduct = await ProductServices.createProduct(product);

            res.status(201).json({ data: createdProduct, status: true })
        } catch (error) {
            next(error);
        }
    }, 

    async updateProduct(req, res, next){
        try {
            const productId = req.params.id;
            const product = req.body;

            const updatedProduct = await ProductServices.updateProduct(productId, product);

            res.status(200).json({ data: updatedProduct, status: true })
        } catch (error) {
            next(error);
        }
    },

    async deleteProduct(req, res, next){
        try {
           
            const productId = req.params.id;
        

            const deletedProduct = await ProductServices.desactiveProduct(productId);

            res.status(200).json({ data: deletedProduct, status: true })
        } catch (error) {
            next(error);
        }
    }
}
