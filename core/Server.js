const express = require('express');
const app = express();

const ProductController = require("../controllers/ProductController");
const productController = new ProductController();

app.get('/', (req, res) => {
    res.send('Try to put /products or /productRandom');
});

app.get('/products', productController.getAllProducts);

app.get('/productRandom', productController.getRandomProduct);


module.exports = app;