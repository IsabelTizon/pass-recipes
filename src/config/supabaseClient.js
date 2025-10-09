import { createClient } from "@supabase/supabase-js";

// Supabase client initialized with Supabase project URL and public API key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
