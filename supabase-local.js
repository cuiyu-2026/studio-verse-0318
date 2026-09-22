const lib = globalThis.supabase;
const config = globalThis.STUDIOVERSE_CONFIG || {};
const supabaseUrl = config.url || "";
const supabaseAnonKey = config.key || "";

export const supabase = lib && supabaseUrl && supabaseAnonKey && !supabaseAnonKey.startsWith("PASTE_")
  ? lib.createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true }
    })
  : null;

export const isRemoteEnabled = Boolean(supabase);
