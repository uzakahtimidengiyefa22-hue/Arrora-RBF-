"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    fetchDeals();
  }, []);

  async function fetchDeals() {
    const { data, error } = await supabase.from("deals").select("*").order("created_at", { ascending: false });
    if (!error) setDeals(data || []);
  }

  return (
    <main className="min-h-screen">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link href="/deal" className="bg-brand-600 text-white px-4 py-2 rounded-2xl">Refer a Deal</Link>
        </div>
        <div className="card p-4">
          <p className="mb-2"><strong>User:</strong> {user?.email || "—"}</p>
          <p className="mb-6"><strong>Grade:</strong> C</p>
          <h2 className="text-xl font-semibold mb-3">Your Referrals</h2>
          <div className="space-y-2">
            {deals.map(d => (
              <div key={d.id} className="flex items-center justify-between border-b py-2">
                <div>
                  <div className="font-medium">{d.company_name}</div>
                  <div className="text-sm text-gray-600">{d.contact_email}</div>
                </div>
                <div className="text-sm">{d.status}</div>
              </div>
            ))}
            {deals.length === 0 && <p className="text-gray-600">No deals yet.</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
