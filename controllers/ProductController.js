const { response, request } = require('express');
const HttpStatus = require('http-status-codes');

const util = require('../utils/Util');

const Contenedor = require('../models/Contenedor');

const productRepository = new Contenedor('products.json');

module.exports = class ProductController {

    async _findAllProducts() {
        return await productRepository.getAll();
    }

    async findAll(req = request, res = response) {
        const products = await this._findAllProducts();

        res.status(HttpStatus.OK).json(products);
    }

    async _findById(id) {
        return await productRepository.getById(id);
    }

    async findOneById(req = request, res = response) {
        const { id } = req.params;

        const product = await productRepository.getById(id);

        if (!product) {
            return res.status(HttpStatus.NOT_FOUND).send({ error: 'Product not found' });
        }

        return res.status(HttpStatus.OK).json(product);
    }

    async save(req = request, res = response) {
        const { title, price, thumbnail } = req.body;

        const newProduct = { title, price, thumbnail };

        const id = productRepository.save(newProduct);

        res.status(HttpStatus.CREATED).json({ id });
    }

    async update(req = request, res = response) {
        const { id } = req.params;
        const { title, price, thumbnail } = req.body;

        const product = await productRepository.getById(id);

        if (!product) {
            return res.status(HttpStatus.NOT_FOUND).send({ error: 'Product not found' });
        }

        const newProduct = { title, price, thumbnail }

        const updatedProduct = await productRepository.update(id, newProduct);

        return  res.status(HttpStatus.OK).json(updatedProduct);
    }

    async delete(req = request, res = response) {

        const { id } = req.params;

        const product = await productRepository.getById(id);

        if (!product) {
            return res.status(HttpStatus.NOT_FOUND).send({ error: 'Product not found' });
        }

        await productRepository.deleteById(id);

        res.status(HttpStatus.OK).json({ message: 'Product deleted' })
    }

}