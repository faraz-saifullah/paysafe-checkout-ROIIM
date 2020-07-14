const ProductsDbConnector = require("../dbConnector/products");

class Admin {
  constructor() {
    this.productsDbConnector = new ProductsDbConnector();
  }

  async addProduct(req) {
    try {
      return this.productsDbConnector.addNewProduct(req.body);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Admin;
