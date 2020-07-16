const ProductsDbConnector = require("../dbConnector/products");

class Product {
  constructor() {
    this.productsDbConnector = new ProductsDbConnector();
  }

  //fetch all available products from Postgres database
  async getAllProducts(req) {
    try {
      return await this.productsDbConnector.getAllProducts();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
