const fs = require('fs');
const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const PORT = 8080;
const filePath = 'products.json';

const productManager = new ProductManager(filePath);

app.get('/', (req, res) => {
    res.send('Server ready');
});

app.get('/products', async (req, res) => {
    try {
        let limit = req.query.limit;
        let products = await productManager.getProducts();

        if (limit) {
            products = products.slice(0, limit);
        }

        res.json(products);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(parseInt(pid));
        res.json(product);
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(404).json({ error: 'Product Not Found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
});
