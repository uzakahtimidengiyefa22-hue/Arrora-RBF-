"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [deals, setDeals] = useState([]);

  async function load() {
    const res = await fetch("/api/admin/deals");
    if (res.ok) setDeals(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function action(id, type) {
    const res = await fetch(`/api/admin/deals/${id}/${type}`, { method: "POST" });
    if (res.ok) load();
    else alert("Action failed");
  }

  return (
    <main className="min-h-screen">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="card p-4">
          {deals.map((d) => (
            <div key={d.id} className="flex items-center justify-between border-b py-3">
              <div>
                <div className="font-semibold">{d.company_name}</div>
                <div className="text-sm text-gray-600">{d.contact_email}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm mr-2">{d.status}</span>
                <button onClick={() => action(d.id, "approve")} className="bg-emerald-600 text-white px-3 py-1 rounded-2xl">Approve</button>
                <button onClick={() => action(d.id, "reject")} className="bg-rose-600 text-white px-3 py-1 rounded-2xl">Reject</button>
              </div>
            </div>
          ))}
          {deals.length === 0 && <p>No deals yet.</p>}
        </div>
      </div>
    </main>
  );
}
