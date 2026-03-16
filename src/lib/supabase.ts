import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// Use a harmless placeholder when env vars are missing so build does not crash.
const safeSupabaseUrl = supabaseUrl || 'https://placeholder.supabase.co'
const safeSupabaseAnonKey = supabaseAnonKey || 'placeholder-anon-key'

export const supabase = createClient(safeSupabaseUrl, safeSupabaseAnonKey)
