const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    addProduct(product) {
        const products = this.getProducts();
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { ...product, id: newId };
        products.push(newProduct);
        this.saveProducts(products);
        return newId;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        const product = products.find(p => p.id === id);
        if (!product) {
            throw new Error('Not found');
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('Not found');
        }
        const updatedProduct = { ...products[index], ...updatedFields };
        products[index] = updatedProduct;
        this.saveProducts(products);
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('Not found');
        }
        products.splice(index, 1);
        this.saveProducts(products);
    }

    saveProducts(products) {
        fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
    }
}

const filePath = 'products.json';

const products = [
    { id: 1, title: 'Flip6', description: 'Descripcion Flip6', price: 99, thumbail: 'Sin imagen'},
    { id: 2, title: 'Go3', description: 'Descripcion Go3', price: 35, thumbail: 'Sin imagen'},
    { id: 3, title: 'Charge5', description: 'Descripcion Charge5', price: 145, thumbail: 'Sin imagen'},
    { id: 4, title: 'Xtreme3', description: 'Descripcion Xtreme3', price: 249, thumbail: 'Sin imagen'},
    { id: 5, title: 'Boombox3', description: 'Descripcion Boombox3', price: 349, thumbail: 'Sin imagen'},
    { id: 6, title: 'WaveBuds', description: 'Descripcion WaveBuds', price: 45, thumbail: 'Sin imagen'},
    { id: 7, title: 'WaveFlex', description: 'Descripcion WaveFkex', price: 59, thumbail: 'Sin imagen'},
    { id: 8, title: 'TuneFlex', description: 'Descripcion TuneFlex', price: 69, thumbail: 'Sin imagen'},
    { id: 9, title: 'PartyBox310', description: 'Descripcion PartyBox310', price: 479, thumbail: 'Sin imagen'},
    { id: 10, title: 'PartyBox710', description: 'Descripcion PartyBox710', price: 679, thumbail: 'Sin imagen'},
]

fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

module.exports = ProductManager;

