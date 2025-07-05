-- Fix existing inquiries by setting default values for new fields
UPDATE inquiries 
SET 
  status = COALESCE(status, 'new'),
  priority = COALESCE(priority, 'medium'),
  source = COALESCE(source, 'website'),
  updated_at = COALESCE(updated_at, created_at)
WHERE 
  status IS NULL 
  OR priority IS NULL 
  OR source IS NULL 
  OR updated_at IS NULL;

-- Verify the update
SELECT 
  COUNT(*) as total_inquiries,
  COUNT(CASE WHEN status IS NOT NULL THEN 1 END) as with_status,
  COUNT(CASE WHEN priority IS NOT NULL THEN 1 END) as with_priority,
  COUNT(CASE WHEN source IS NOT NULL THEN 1 END) as with_source
FROM inquiries; 