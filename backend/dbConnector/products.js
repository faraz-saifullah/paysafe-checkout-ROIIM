"use strict";
let DataService = require("../utils/datasource/DataService");

class ProductsDbConnector {
  constructor() {
    this.dataService = new DataService();
  }

  async addNewProduct(body) {
    const sqlQuery = {
      text: `INSERT INTO products (name, stock, price, short_desc, description) 
        VALUES ($1, $2, $3, $4, $5)`,
      values: [
        body.name,
        body.stock,
        body.price,
        body.shortDesc,
        body.description,
      ],
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery, true);
    } catch (err) {
      return err;
    }
  }

  async getAllProducts() {
    const sqlQuery = {
      text: "SELECT * FROM products",
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery);
    } catch (err) {
      return err;
    }
  }
}

module.exports = ProductsDbConnector;
