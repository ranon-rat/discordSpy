import * as sql from "sqlite3";
const sqlite = sql.verbose();
export default function openDatabase(): sql.Database {
  return new sql.Database("../database/database.db", (err) => {
    if (err) return console.error(err.message);
  });
}
