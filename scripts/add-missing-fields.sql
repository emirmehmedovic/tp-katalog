-- Add missing fields to inquiries table
ALTER TABLE inquiries 
ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS comments TEXT,
ADD COLUMN IF NOT EXISTS next_follow_up TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS estimated_value DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS source VARCHAR(100) DEFAULT 'website',
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_priority ON inquiries(priority);
CREATE INDEX IF NOT EXISTS idx_inquiries_assigned_to ON inquiries(assigned_to);
CREATE INDEX IF NOT EXISTS idx_inquiries_next_follow_up ON inquiries(next_follow_up);

-- Update existing inquiries to have proper status and priority
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

-- Add trigger for updated_at if it doesn't exist
CREATE OR REPLACE FUNCTION update_inquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger if it doesn't exist
DROP TRIGGER IF EXISTS update_inquiries_updated_at_trigger ON inquiries;
CREATE TRIGGER update_inquiries_updated_at_trigger
  BEFORE UPDATE ON inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_inquiries_updated_at();

-- Verify the update
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'inquiries' 
ORDER BY ordinal_position; 