-- PILARES admin, e-mail and chat system
-- Run this in Supabase SQL Editor after creating at least one user in Authentication.
-- Then replace admin@pilares.tech below with your admin user's e-mail and run the insert.

create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.email_contacts (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  phone text,
  source text default 'site',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'archived')),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.email_contacts
  add column if not exists company text,
  add column if not exists role text,
  add column if not exists city text,
  add column if not exists uf text,
  add column if not exists entity_type text,
  add column if not exists country text,
  add column if not exists team_size text,
  add column if not exists message text,
  add column if not exists page_url text,
  add column if not exists user_agent text,
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.email_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subject text not null,
  body text not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chat_auto_replies (
  id uuid primary key default gen_random_uuid(),
  trigger text not null,
  answer text not null,
  is_active boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_name text,
  visitor_email text,
  visitor_token uuid not null,
  status text not null default 'open' check (status in ('open', 'answered', 'closed')),
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  visitor_token uuid not null,
  sender_type text not null check (sender_type in ('visitor', 'bot', 'admin')),
  body text not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_email_contacts_created_at on public.email_contacts(created_at desc);
create index if not exists idx_chat_sessions_last_message_at on public.chat_sessions(last_message_at desc);
create index if not exists idx_chat_messages_session_id_created_at on public.chat_messages(session_id, created_at);
create index if not exists idx_chat_auto_replies_active on public.chat_auto_replies(is_active);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.request_visitor_token()
returns text
language sql
stable
as $$
  select coalesce(
    nullif(current_setting('request.headers', true), '')::json ->> 'x-visitor-token',
    ''
  );
$$;

drop trigger if exists set_email_templates_updated_at on public.email_templates;
create trigger set_email_templates_updated_at
before update on public.email_templates
for each row execute function public.set_updated_at();

drop trigger if exists set_email_contacts_updated_at on public.email_contacts;
create trigger set_email_contacts_updated_at
before update on public.email_contacts
for each row execute function public.set_updated_at();

drop trigger if exists set_chat_auto_replies_updated_at on public.chat_auto_replies;
create trigger set_chat_auto_replies_updated_at
before update on public.chat_auto_replies
for each row execute function public.set_updated_at();

alter table public.admin_profiles enable row level security;
alter table public.email_contacts enable row level security;
alter table public.email_templates enable row level security;
alter table public.chat_auto_replies enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

drop policy if exists "Admins can read own admin profile" on public.admin_profiles;
create policy "Admins can read own admin profile"
on public.admin_profiles for select
to authenticated
using (id = auth.uid());

drop policy if exists "Admins manage email contacts" on public.email_contacts;
create policy "Admins manage email contacts"
on public.email_contacts for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can create email contacts" on public.email_contacts;
create policy "Public can create email contacts"
on public.email_contacts for insert
to anon
with check (true);

drop policy if exists "Admins manage email templates" on public.email_templates;
create policy "Admins manage email templates"
on public.email_templates for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins manage auto replies" on public.chat_auto_replies;
create policy "Admins manage auto replies"
on public.chat_auto_replies for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public reads active auto replies" on public.chat_auto_replies;
create policy "Public reads active auto replies"
on public.chat_auto_replies for select
to anon
using (is_active = true);

drop policy if exists "Admins manage chat sessions" on public.chat_sessions;
create policy "Admins manage chat sessions"
on public.chat_sessions for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public creates chat sessions" on public.chat_sessions;
create policy "Public creates chat sessions"
on public.chat_sessions for insert
to anon
with check (true);

drop policy if exists "Public reads own chat session" on public.chat_sessions;
create policy "Public reads own chat session"
on public.chat_sessions for select
to anon
using (visitor_token::text = public.request_visitor_token());

drop policy if exists "Public updates chat session activity" on public.chat_sessions;
create policy "Public updates chat session activity"
on public.chat_sessions for update
to anon
using (visitor_token::text = public.request_visitor_token())
with check (visitor_token::text = public.request_visitor_token());

drop policy if exists "Admins manage chat messages" on public.chat_messages;
create policy "Admins manage chat messages"
on public.chat_messages for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public creates chat messages" on public.chat_messages;
create policy "Public creates chat messages"
on public.chat_messages for insert
to anon
with check (sender_type in ('visitor', 'bot'));

drop policy if exists "Public reads chat messages by token" on public.chat_messages;
create policy "Public reads chat messages by token"
on public.chat_messages for select
to anon
using (visitor_token::text = public.request_visitor_token());

-- After creating the admin user in Supabase Authentication, run:
-- insert into public.admin_profiles (id)
-- select id from auth.users where email = 'admin@pilares.tech'
-- on conflict (id) do nothing;

-- Optional starter auto replies:
insert into public.chat_auto_replies (trigger, answer)
values
  ('módulos', 'A Pilares possui módulos para inventário, manutenção preventiva/corretiva, ordens de serviço, prestação de contas, dashboards e gestão de eventos.'),
  ('implantação', 'A implantação é feita em fases: diagnóstico, configuração, treinamento e expansão acompanhada por indicadores.'),
  ('preço', 'O valor depende do escopo, número de unidades e módulos contratados. Deixe seu contato para prepararmos uma proposta.')
on conflict do nothing;
