import { readFileSync } from "fs";
import mysql from "mysql2/promise";

export abstract class DB {
  static isCreated = false;
  private static database = "";

  public static async GetConnection() {
    if (!this.isCreated) {
      const c = await this.GetFromPool();

      var ddl = await readFileSync(
        "./src/persistence/create_database.sql",
        "utf-8"
      );

      await c.query(c.format(ddl));
      c.end();
      this.isCreated = true;
      this.database = "desafio_venda_db";
    }
    return await this.GetFromPool();
  }

  static async GetFromPool() {
    return await mysql.createPool({
      host: "localhost",
      user: "root",
      database: this.database,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      namedPlaceholders: true,
      multipleStatements: true,
    });
  }
}
