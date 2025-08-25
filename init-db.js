/* Optional bootstrap: run with `npm run db:init` if you set SUPABASE_DB_URL.
   Creates tables and seeds default admin (username: uzakahtimi / password: Arrora222).
*/
const { Client } = require('pg');

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.log("SUPABASE_DB_URL not set. Skipping DB init.");
  process.exit(0);
}

const sql = `
create extension if not exists "uuid-ossp";
create table if not exists public.admins (
  id uuid primary key default uuid_generate_v4(),
  username text unique not null,
  password_hash text not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.deals (
  id uuid primary key default uuid_generate_v4(),
  referrer_id uuid,
  company_name text not null,
  website text,
  contact_email text not null,
  amount text,
  details text,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

insert into public.admins (username, password_hash)
values ('uzakahtimi', '$2a$10$PzF6b8QwzY7m2aZ6m8z6U.JmVgJc8TqgQ8uY0y1Qh4b6pP2v3S7a2')
on conflict (username) do nothing;
`;

(async () => {
  const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("DB init complete.");
})().catch(err => {
  console.error("DB init failed:", err.message);
  process.exit(1);
});
