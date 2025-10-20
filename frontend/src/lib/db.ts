import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "5432", 10),
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export async function testConnection() {
  const client = await pool.connect();
  try {
    await client.query("SELECT 1");
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  } finally {
    client.release();
  }
}
