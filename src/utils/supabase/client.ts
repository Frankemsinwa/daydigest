
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'; // Assuming your Database types are here

export function createClient() {
  return createBrowserClient<Database>( // Add Database generic
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
