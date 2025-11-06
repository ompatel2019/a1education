// src/lib/supabase/auth-client.ts
import { createBrowserClient } from "@supabase/ssr";

export async function getClientUser() {
  try {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session?.user ?? null;
  } catch (error) {
    // If there's an authentication error (like invalid refresh token),
    // return null instead of throwing an error
    console.warn("Authentication error in getClientUser:", error);

    // Try to clear invalid tokens
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      );
      await supabase.auth.signOut();
    } catch (signOutError) {
      console.warn("Failed to sign out after auth error:", signOutError);
    }

    return null;
  }
}

export async function signInClient(email: string, password: string) {
  try {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (error) {
    console.warn("Failed to sign in:", error);
    return { data: null, error };
  }
}

export async function signOutClient() {
  try {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
    await supabase.auth.signOut();
  } catch (error) {
    console.warn("Failed to sign out:", error);
  }
}
