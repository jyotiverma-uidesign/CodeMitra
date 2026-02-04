import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

export const supabase = createClient(
  process.env.SUPABASE_URL,           // Supabase project URL
  process.env.SUPABASE_SERVICE_ROLE_KEY // Secret key, server-side only
);