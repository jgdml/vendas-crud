import mysql from "mysql2/promise";

export default async function GetConnection() {
  return await mysql.createPool({
    host: "localhost",
    user: "root",
    database: "desafio_venda_db",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    namedPlaceholders: true
  });
}
