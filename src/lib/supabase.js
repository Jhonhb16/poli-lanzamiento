import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-public');

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function saveLead(lead) {
  if (!supabase) {
    throw new Error('Supabase no esta configurado. Revisa las variables de entorno.');
  }

  const { error } = await supabase.from('leads_korean_lash').insert(lead);

  if (error) {
    throw error;
  }
}
