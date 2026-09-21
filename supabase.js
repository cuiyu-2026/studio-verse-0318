import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://ldbucqyygsdgmsrytimm.supabase.co";
const supabaseAnonKey = "PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY";

export const supabase = supabaseUrl && supabaseAnonKey && !supabaseAnonKey.startsWith("PASTE_")
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true }
    })
  : null;

export const isRemoteEnabled = Boolean(supabase);
