const ProductModel = require('../models/products.model');
const errorMessages = require("../constants/errorMessage.contants");
const { isValidObjectId } = require("mongoose");


module.exports = {
    async findAllProducts() {
        const product = await ProductModel.find({state: true});

        return product;
    },

    async findProductById(id) {
        if (!isValidObjectId(id)) throw { status: 409, message: errorMessages.INVALID_ID_ERROR(id) };

        const findProduct = await ProductModel.findById(id);

        if (!findProduct) throw { status: 409, message: errorMessages.GET_BY_ID_ERROR("producto") };

        return findProduct;
    },

    async createProduct(product) {
        const createProductData = await ProductModel.create(product);

        return createProductData;
    },

    async updateProduct(id, product) {
        if (!isValidObjectId(id)) throw { status: 409, message: errorMessages.INVALID_ID_ERROR(id) };
        const updateProductById = await ProductModel.findByIdAndUpdate(id, product, { new: true });

        if (!updateProductById) throw { status: 409, message: errorMessages.UPDATE_BY_ID_ERROR("producto") };

        return updateProductById;
    },

    async desactiveProduct(id){
       if (!isValidObjectId(id)) throw { status: 409, message: errorMessages.INVALID_ID_ERROR(id) };
      
        const desactiveProduct = await ProductModel.findByIdAndUpdate(id, {state: false}, { new: true });

        if (!desactiveProduct) throw { status: 409, message: errorMessages.UPDATE_BY_ID_ERROR("producto") };

        return desactiveProduct;
    }
    
}