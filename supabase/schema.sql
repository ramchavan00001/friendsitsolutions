-- FriendsITSolutions — Supabase / PostgreSQL schema for form submissions.
-- Run in the Supabase SQL editor (or psql). The website writes with the service-role key
-- from the server only; RLS is enabled with no public policies so anon keys can't read data.

create extension if not exists "pgcrypto";

create type submission_status as enum ('new', 'contacted', 'in_progress', 'won', 'lost', 'closed');

-- Shared shape: contact enquiries, quotes, applications and tickets.
create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  reference   text unique not null,
  name        text not null,
  email       text not null,
  phone       text,
  status      submission_status not null default 'new',
  details     jsonb not null default '{}'::jsonb,  -- company, service, message, source …
  files       text[] not null default '{}',        -- storage paths in the "uploads" bucket
  consent_at  timestamptz,
  ip_hash     text
);

create table if not exists quotes            (like leads including all);
create table if not exists job_applications  (like leads including all);
create table if not exists support_tickets   (like leads including all);

create table if not exists newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text unique not null,
  source      text,
  unsubscribed_at timestamptz
);

create index if not exists leads_created_idx            on leads (created_at desc);
create index if not exists quotes_created_idx           on quotes (created_at desc);
create index if not exists job_applications_created_idx on job_applications (created_at desc);
create index if not exists support_tickets_created_idx  on support_tickets (created_at desc);

alter table leads                  enable row level security;
alter table quotes                 enable row level security;
alter table job_applications       enable row level security;
alter table support_tickets        enable row level security;
alter table newsletter_subscribers enable row level security;

-- Private bucket for resumes and attachments (served to admins via short-lived signed URLs).
insert into storage.buckets (id, name, public, file_size_limit)
values ('uploads', 'uploads', false, 5242880)
on conflict (id) do nothing;

-- Data retention helper (DPDP data minimisation): delete stale, unconverted records.
-- Schedule with pg_cron, e.g.  select cron.schedule('purge', '0 3 * * 0', 'select purge_stale_submissions()');
create or replace function purge_stale_submissions() returns void language sql as $$
  delete from leads            where created_at < now() - interval '24 months' and status in ('new', 'lost', 'closed');
  delete from quotes           where created_at < now() - interval '24 months' and status in ('new', 'lost', 'closed');
  delete from job_applications where created_at < now() - interval '12 months';
  delete from support_tickets  where created_at < now() - interval '36 months' and status = 'closed';
$$;
