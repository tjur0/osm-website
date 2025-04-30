import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.join(__dirname, "./pois.sqlite");

const { default: BetterSqlite3 } = await import("better-sqlite3");

const db = new BetterSqlite3(dbPath, {
  verbose: console.log,
  readonly: true,
});

db.pragma("journal_mode = WAL");

export default db;
