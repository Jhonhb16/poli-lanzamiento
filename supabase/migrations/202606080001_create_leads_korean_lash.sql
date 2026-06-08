create table if not exists public.leads_korean_lash (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  email text not null,
  whatsapp text not null,
  ciudad text not null,
  vive_usa text not null,
  es_mujer text not null,
  situacion_actual text not null,
  objetivo text not null,
  urgencia text not null,
  asistencia text not null,
  compromiso integer not null check (compromiso between 1 and 10),
  objecion_principal text not null,
  score integer not null check (score between 0 and 100),
  clasificacion text not null check (clasificacion in ('VIP', 'COMUNIDAD')),
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text
);

create index if not exists leads_korean_lash_created_at_idx
  on public.leads_korean_lash (created_at desc);

create index if not exists leads_korean_lash_clasificacion_idx
  on public.leads_korean_lash (clasificacion);

alter table public.leads_korean_lash enable row level security;

create policy "Allow public lead inserts"
  on public.leads_korean_lash
  for insert
  to anon
  with check (true);
