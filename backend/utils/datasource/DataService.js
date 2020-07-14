"use strict";
const Pg = require("pg");
const DatabaseConfig = require("../../Config.json").PostgresDatabase;

class DataService {
  async executeQuery(sqlQuery) {
    this.pool = new Pg.Pool({
      user: DatabaseConfig.user,
      host: DatabaseConfig.host,
      database: DatabaseConfig.database,
      password: DatabaseConfig.password,
      port: DatabaseConfig.port,
    });
    this.pool.on("error", (error, client) => {
      console.error(`Error On PG Pool. Reason: ${error}`);
    });
    return this.pool.query(sqlQuery);
  }

  executeQueryAsPromise(sqlQuery, isInsert = false) {
    const queryMessage = {
      success: false,
      status: 200,
      message: "",
    };

    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.executeQuery(sqlQuery);
        if (isInsert) {
          queryMessage.success = true;
          queryMessage.status = 201;
          queryMessage.message = "SQL Insert Query completed successful.";
          queryMessage.data = result.rows;
          resolve(queryMessage);
        } else if (result.rowCount === 0) {
          queryMessage.status = 204;
          queryMessage.message = "SQL Query returned no data from database.";
          resolve(queryMessage);
        } else {
          queryMessage.success = true;
          queryMessage.status = 200;
          queryMessage.message = "SQL Query completed successful.";
          queryMessage.data = result.rows;
          resolve(queryMessage);
        }
        this.pool.end();
      } catch (err) {
        queryMessage.status = 400;
        queryMessage.message = "SQL Query failed.";
        queryMessage.error = err.message;
        reject(queryMessage);
        this.pool.end();
      }
    });
  }
}

module.exports = DataService;
