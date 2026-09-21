import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = “sb_publishable_zGpCLE3d-qOp5HO_0G9O2g_kTM9J52J”;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true }
    })
  : null;

export const isRemoteEnabled = Boolean(supabase);
