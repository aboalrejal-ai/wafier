-- Internal keep-alive: daily DML so a Free-tier project does not look idle.
-- Idempotent: safe to re-run in the SQL Editor on any project.

create extension if not exists pg_cron;

create table if not exists public.keepalive_pings (
  id uuid primary key default gen_random_uuid(),
  pinged_at timestamptz not null default now(),
  source text not null default 'pg_cron'
);

alter table public.keepalive_pings enable row level security;

revoke all on table public.keepalive_pings from anon, authenticated, public;

-- Re-running this file must not create a duplicate cron job.
select cron.unschedule(jobid)
from cron.job
where jobname = 'keepalive-daily';

select cron.schedule(
  'keepalive-daily',
  '0 0 * * *',
  $$
    insert into public.keepalive_pings (source) values ('pg_cron');
    delete from public.keepalive_pings
    where pinged_at < now() - interval '90 days';
  $$
);
