-- Fix existing inquiries with invalid status values
-- Update 'closed' status to 'won' (since closed usually means completed/won)
UPDATE inquiries 
SET status = 'won' 
WHERE status = 'closed';

-- Update any other invalid statuses to 'new'
UPDATE inquiries 
SET status = 'new' 
WHERE status NOT IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost', 'spam');

-- Verify the fix
SELECT 
  status,
  COUNT(*) as count
FROM inquiries 
GROUP BY status 
ORDER BY status;

-- Check if there are any remaining invalid statuses
SELECT 
  id,
  status,
  created_at
FROM inquiries 
WHERE status NOT IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost', 'spam'); 