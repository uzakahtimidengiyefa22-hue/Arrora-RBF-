import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.ADMIN_COOKIE_SECRET || "fallback-secret");

export async function signAdminToken(payload: object) {
  return await new SignJWT({ role: "admin", ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload && payload.role === "admin";
  } catch {
    return false;
  }
}
