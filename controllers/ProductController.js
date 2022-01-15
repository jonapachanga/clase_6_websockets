const Contenedor = require('../models/Contenedor');
const contenedor = new Contenedor('products.json');
const util = require('../Utils/Util');

module.exports = class ProductController {
    async getAllProducts(req, res) {
        const products = await contenedor.getAll();

        res.json(products);
    }

    async getRandomProduct(req, res) {
        const products = await contenedor.getAll();

        const i = util.getRandomInt(products.length);
        return res.json(products[i]);
    }

}