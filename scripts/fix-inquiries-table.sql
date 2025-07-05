-- Check current table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'inquiries' 
ORDER BY ordinal_position;

-- Check current constraints
SELECT conname, contype, pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conrelid = 'inquiries'::regclass;

-- Check current policies
SELECT policyname, cmd, permissive, roles
FROM pg_policies 
WHERE tablename = 'inquiries';

-- Drop duplicate policies
DROP POLICY IF EXISTS "Anyone can insert inquiries" ON inquiries;
DROP POLICY IF EXISTS "Inquiries are viewable by authenticated users" ON inquiries;
DROP POLICY IF EXISTS "Public can insert inquiries" ON inquiries;

-- Keep only these policies
-- (Authenticated users can update inquiries)
-- (Authenticated users can view inquiries)

-- Check status column values
SELECT DISTINCT status FROM inquiries;

-- Check the status check constraint
SELECT conname, pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conrelid = 'inquiries'::regclass 
AND contype = 'c' 
AND conname LIKE '%status%';

-- Fix status constraint for contact_inquiries table
-- First, drop the existing constraint
ALTER TABLE contact_inquiries DROP CONSTRAINT IF EXISTS contact_inquiries_status_check;

-- Add the correct constraint
ALTER TABLE contact_inquiries 
ADD CONSTRAINT contact_inquiries_status_check 
CHECK (status IN ('new', 'in_progress', 'completed', 'spam'));

-- Fix status constraint for inquiries table
-- First, drop the existing constraint
ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_status_check;

-- Add the correct constraint for inquiries table
ALTER TABLE inquiries 
ADD CONSTRAINT inquiries_status_check 
CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost', 'spam'));

-- Verify the constraints
SELECT conname, pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conrelid = 'contact_inquiries'::regclass 
AND contype = 'c' 
AND conname LIKE '%status%';

SELECT conname, pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conrelid = 'inquiries'::regclass 
AND contype = 'c' 
AND conname LIKE '%status%'; 