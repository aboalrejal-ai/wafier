# Supabase Free-Tier Keep-Alive

Copy this file into any project that uses a **separate** Supabase Free-plan database. Run the SQL once. That is the whole setup.

## Why

Supabase pauses Free Plan projects after about **7 days** of low user database activity. This playbook installs a heartbeat **inside Postgres**: `pg_cron` inserts one row every day at 00:00 UTC. No GitHub Actions, no repo secrets, no third-party cron, no Edge Function, no servers.

`pg_cron` cannot wake a project that is already paused. If you get the pause-warning email, open the dashboard (or Resume after a pause), then confirm the job is still listed. Skip this entire file on a paid plan, or when the app already has daily API traffic.

## What you do

1. Open the project in the Supabase Dashboard.
2. If `create extension` fails, enable **pg_cron** under Database → Extensions.
3. SQL Editor → paste the block below → Run.

```sql
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
```

The same statement lives in this repo as `supabase/migrations/002_keepalive.sql`.

## Verify

```sql
select jobname, schedule, active
from cron.job
where jobname = 'keepalive-daily';

select source, count(*), max(pinged_at) as last_ping
from public.keepalive_pings
group by source;
```

Expect `keepalive-daily` with schedule `0 0 * * *` and `active = true`. The pings table is empty until the first midnight UTC run (or until you insert a test row yourself).

Optional smoke test:

```sql
insert into public.keepalive_pings (source) values ('manual');
```

## If a project still pauses

1. Dashboard → Resume project.
2. Confirm `keepalive-daily` is still in `cron.job`.
3. Re-run the SQL block if the job is missing.
4. Internal cron cannot self-resume. The warning email is the backup.
