import mysql from "mysql2/promise";

export const connection = await mysql
  .createConnection({
    host: "localhost",
    user: "root",
    database: "db",
  })
  .then((c) => {
    console.log("created connection")
    return c;
  });
