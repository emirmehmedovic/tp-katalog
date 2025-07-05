-- Check RLS policies for inquiries table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'inquiries';

-- Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'inquiries';

-- Check current user and permissions
SELECT 
  current_user,
  session_user,
  current_database();

-- Test if we can read from inquiries table
SELECT COUNT(*) as total_inquiries FROM inquiries;

-- Test if we can update a specific inquiry (replace with actual ID)
-- SELECT id, status, priority FROM inquiries LIMIT 1; 