
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_TODO_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_TODO_ANON_KEY!
  )
}
