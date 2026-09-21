import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://ldbucqyygsdgmsrytimm.supabase.co";
const supabaseAnonKey = "sb_publishable_zGpCLE3d-qOp5HO_0G9O2g_kTM9J52J";

export const supabase = supabaseUrl && supabaseAnonKey && !supabaseAnonKey.startsWith("PASTE_")
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true }
    })
  : null;

export const isRemoteEnabled = Boolean(supabase);
