-- Debug status constraint issue
-- Check all existing statuses
SELECT DISTINCT status FROM inquiries;

-- Check if there are any NULL statuses
SELECT COUNT(*) as null_status_count FROM inquiries WHERE status IS NULL;

-- Check the exact constraint definition
SELECT 
  conname as constraint_name,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conname = 'inquiries_status_check';

-- Check all inquiries with their statuses
SELECT 
  id,
  customer_name,
  status,
  created_at
FROM inquiries 
ORDER BY created_at DESC
LIMIT 10;

-- Try to find any problematic statuses
SELECT 
  id,
  status,
  LENGTH(status) as status_length,
  ASCII(SUBSTRING(status, 1, 1)) as first_char_ascii
FROM inquiries 
WHERE status IS NOT NULL
ORDER BY status; 