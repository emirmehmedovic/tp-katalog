-- Check existing RLS policies for inquiries table
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

-- Add UPDATE policy (drop if exists first)
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON inquiries;
CREATE POLICY "Authenticated users can update inquiries" ON inquiries
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Add SELECT policy (drop if exists first)
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON inquiries;
CREATE POLICY "Authenticated users can view inquiries" ON inquiries
  FOR SELECT USING (auth.role() = 'authenticated');

-- Add INSERT policy (drop if exists first)
DROP POLICY IF EXISTS "Public can insert inquiries" ON inquiries;
CREATE POLICY "Public can insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- Grant permissions to authenticated users
GRANT UPDATE ON inquiries TO authenticated;
GRANT SELECT ON inquiries TO authenticated;

-- Test if we can read from inquiries table
SELECT COUNT(*) as total_inquiries FROM inquiries;

-- Show all policies after creation
SELECT 
  policyname,
  cmd,
  permissive,
  roles
FROM pg_policies 
WHERE tablename = 'inquiries'
ORDER BY policyname; 