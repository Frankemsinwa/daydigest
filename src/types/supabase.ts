// This file is a placeholder for your Supabase database types.
// You can generate these types using the Supabase CLI:
// supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts
//
// For now, we'll use a generic type to allow the client to be initialized.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Define your tables here as you create them in Supabase
      // Example:
      // posts: {
      //   Row: {
      //     id: number
      //     created_at: string
      //     title: string | null
      //     content: string | null
      //     user_id: string | null
      //   }
      //   Insert: {
      //     id?: number
      //     created_at?: string
      //     title?: string | null
      //     content?: string | null
      //     user_id?: string | null
      //   }
      //   Update: {
      //     id?: number
      //     created_at?: string
      //     title?: string | null
      //     content?: string | null
      //     user_id?: string | null
      //   }
      //   Relationships: [
      //     {
      //       foreignKeyName: "posts_user_id_fkey"
      //       columns: ["user_id"]
      //       referencedRelation: "users"
      //       referencedColumns: ["id"]
      //     }
      //   ]
      // }
    }
    Views: {
      // Define your views here
    }
    Functions: {
      // Define your functions here
    }
    Enums: {
      // Define your enums here
    }
    CompositeTypes: {
      // Define your composite types here
    }
  }
}
