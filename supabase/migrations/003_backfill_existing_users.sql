-- Backfill profile / household / budget for auth users created before the trigger existed.

INSERT INTO public.profiles (id, email, full_name)
SELECT
  u.id,
  COALESCE(u.email, ''),
  COALESCE(
    u.raw_user_meta_data->>'full_name',
    u.raw_user_meta_data->>'name',
    split_part(COALESCE(u.email, ''), '@', 1),
    ''
  )
FROM auth.users u
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = CASE
    WHEN profiles.full_name IS NULL OR profiles.full_name = '' THEN EXCLUDED.full_name
    ELSE profiles.full_name
  END;

INSERT INTO public.households (user_id)
SELECT u.id FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.households h WHERE h.user_id = u.id);

INSERT INTO public.budgets (household_id)
SELECT h.id FROM public.households h
WHERE NOT EXISTS (SELECT 1 FROM public.budgets b WHERE b.household_id = h.id);
