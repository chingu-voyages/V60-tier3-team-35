import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

const db = drizzle(pool);

console.log("Running migrations...");
await migrate(db, {
  migrationsFolder: "./drizzle",
  migrationsTable: "drizzle_migrations",
});
console.log("Migrations complete");

await pool.end();
process.exit(0);
