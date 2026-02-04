import { supabase } from "./config/supabase.js";
import fs from "fs";

async function initDatabase() {
  try {
    console.log("Initializing database...");

    // Read the SQL file
    const sql = fs.readFileSync("./create_tables.sql", "utf8");

    // Split SQL into individual statements
    const statements = sql
      .split(";")
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith("--"));

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`Executing: ${statement.substring(0, 50)}...`);
        const { error } = await supabase.rpc("exec_sql", { sql: statement });
        if (error) {
          console.error("Error executing statement:", error);
          // Continue with next statement
        }
      }
    }

    console.log("Database initialization completed!");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}

initDatabase();
