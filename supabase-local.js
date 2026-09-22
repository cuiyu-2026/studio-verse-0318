const lib = globalThis.supabase;
const config = globalThis.STUDIOVERSE_CONFIG || {};
const supabaseUrl = config.url || "";
const supabaseAnonKey = config.key || "";
let client = null;
let clientError = null;

try {
  if (lib && supabaseUrl && supabaseAnonKey && !supabaseAnonKey.startsWith("PASTE_")) {
    client = lib.createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
  }
} catch (error) {
  clientError = error.message;
}

export const supabase = client;
export const isRemoteEnabled = Boolean(client);
export const remoteError = clientError;
