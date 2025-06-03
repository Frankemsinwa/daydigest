
"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import type { z } from "zod";
import type { loginSchema, signupSchema } from "@/lib/schemas"; // We'll create this

export async function login(values: z.infer<typeof loginSchema>) {
  const supabase = createClient();
  const origin = headers().get("origin");

  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    return redirect(`/login?message=Could not authenticate user: ${error.message}`);
  }

  return redirect("/dashboard");
}

export async function signup(values: z.infer<typeof signupSchema>) {
  const supabase = createClient();
  const origin = headers().get("origin");

  const { error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: values.fullName || values.email.split('@')[0], // Use fullName if provided
      }
    },
  });

  if (error) {
    return redirect(`/signup?message=Could not create user: ${error.message}`);
  }

  // For now, we'll redirect to a page telling the user to check their email.
  // Supabase sends a confirmation email by default.
  return redirect("/login?message=Check email to continue sign in process");
}

export async function signInWithGoogle() {
  const supabase = createClient();
  const origin = headers().get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    },
  });

  if (error) {
    console.error("Google Sign-In Error:", error);
    return redirect("/login?message=Could not sign in with Google");
  }

  if (data.url) {
    return redirect(data.url);
  }
  return redirect("/login?message=An unexpected error occurred with Google Sign-In");
}

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/");
}
