"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace(redirect);
    });
  }, [redirect, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { data: signIn, error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
    if (!signInErr && signIn.session) {
      router.replace(redirect);
      return;
    }
    // Try sign up automatically
    const { data: signUp, error: signUpErr } = await supabase.auth.signUp({ email, password });
    if (signUpErr) {
      setMessage(signUpErr.message);
    } else {
      setMessage("Check your email to confirm your account. After confirming, come back and log in.");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen">
      <div className="container py-10">
        <div className="max-w-md mx-auto card p-6">
          <h1 className="text-2xl font-bold mb-4">Login / Sign up</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full" />
            <button disabled={loading} className="bg-brand-600 text-white px-4 py-2 w-full">{loading ? "Processing..." : "Login / Sign up"}</button>
          </form>
          {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
        </div>
      </div>
    </main>
  );
}
