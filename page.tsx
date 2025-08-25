"use client";
import { useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) window.location.href = "/admin/dashboard";
    else alert("Invalid admin credentials");
  }

  return (
    <main className="min-h-screen">
      <div className="container py-10">
        <div className="max-w-md mx-auto card p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <form onSubmit={submit} className="space-y-3">
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
            <button className="bg-gray-900 text-white px-4 py-2 w-full rounded-2xl">Login</button>
          </form>
        </div>
      </div>
    </main>
  );
}
