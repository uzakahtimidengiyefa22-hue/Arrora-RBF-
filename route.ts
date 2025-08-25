import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";
import { signAdminToken } from "../../../../lib/adminAuth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Try fetch admin from DB
  const { data, error } = await supabase.from("admins").select("*").eq("username", username).maybeSingle();

  // Fallback to default if table not present
  if (error && error.code === "42P01") {
    if (username === "uzakahtimi" && password === "Arrora222") {
      const token = await signAdminToken({ username });
      const res = NextResponse.json({ ok: true });
      res.cookies.set("admin_token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
      return res;
    }
  }

  if (!data) return NextResponse.json({ error: "Invalid" }, { status: 401 });
  const ok = await bcrypt.compare(password, data.password_hash);
  if (!ok) return NextResponse.json({ error: "Invalid" }, { status: 401 });

  const token = await signAdminToken({ username });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
