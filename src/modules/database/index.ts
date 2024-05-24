import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if(!supabaseKey || !supabaseUrl) throw new Error('SUPABASE_KEY and SUPABASE_URL must be on .env file');

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
