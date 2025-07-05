-- Check if inquiries table has all required fields
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'inquiries' 
ORDER BY ordinal_position;

-- Check sample data
SELECT 
  id,
  status,
  priority,
  estimated_value,
  next_follow_up,
  comments,
  source,
  created_at,
  updated_at
FROM inquiries 
LIMIT 5;

-- Check if there are any NULL values in required fields
SELECT 
  COUNT(*) as total_inquiries,
  COUNT(CASE WHEN status IS NULL THEN 1 END) as null_status,
  COUNT(CASE WHEN priority IS NULL THEN 1 END) as null_priority,
  COUNT(CASE WHEN source IS NULL THEN 1 END) as null_source,
  COUNT(CASE WHEN updated_at IS NULL THEN 1 END) as null_updated_at
FROM inquiries; 