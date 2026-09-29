import { createClient } from "@supabase/supabase-js";

// Proyecto "Corma". La llave publishable es pública por diseño (Supabase);
// el acceso real lo controla RLS (ver supabase/migrations/0001_init.sql).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://erogtipuutzmrrdrircb.supabase.co";
const key =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_XECIFdsQsOt5VA01CU2Yeg_V-cXX85y";

export const supabase = createClient(url, key, { auth: { persistSession: false } });
