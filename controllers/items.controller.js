const ErrorResponse = require("../helpers/error.helper");
const Response = require("../helpers/response.helper");
const { Product } = require('../database/models');

class ItemsController {
    async getItems(req, res, next){
        const {page='1', limit='3'} = req.query;

        const pageInt = Number(page);
        const limitInt = Number(limit);
        const offset = (pageInt - 1) * limitInt
        const data = await Product.findAll({
            attributes: ['id', 'name', 'price', 'stock', 'sku'],
            limit: limitInt,
            offset: offset,
            order: [
                ['id', 'ASC'],
            ],
            // raw : true
        });
        
        return new Response(res, 200, data);
    };
    
    async insertItem(req, res, next){
        try {
            const data = {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                sku: req.body.sku,
                user_id: req.body.user_id
            };
            const result = await Product.create(data);
        
            return new Response(res, 201, result);
        } catch (error) {
            next(error);
        }
    };

    async updateItem(req, res, next){
        try {
            const cekItemId = await Product.findOne(
                {
                    where: {id: req.body.id}
                }
            )

            if (!cekItemId) {
                throw new ErrorResponse(400, `Item ID ${req.body.id} tidak ditemukan!`);
            }

            const result = await Product.update(
                {
                    name: req.body.name,
                    price: req.body.price,
                    stock: req.body.stock,
                    sku: req.body.sku,
                    user_id: req.decodedJWT.user_id

                },
                {
                    where: { id: req.body.id}
                }
            );

            if (result == 0) {
                throw new ErrorResponse(400, 'Item ID tidak ditemukan!');
            }

            const response = {
                id: req.body.id,
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                sku: req.body.sku,
                user_id: req.decodedJWT.user_id
            }

            return new Response(res, 200, response);
        } catch (error) {
            next(error);
        }
    };

    async deleteItem(req, res, next){
        try {
            const result = await Product.destroy({ where: { id: req.body.id } });
            if (result == 0) {
                throw new ErrorResponse(401, `id ${req.body.id} tidak ditemukan`);
            }
        
            return new Response(res, 201, `id ${req.body.id} berhasil dihapus`);
        } catch (error) {
            next(error);
        }
    };

}


module.exports = {
    ItemsController
};