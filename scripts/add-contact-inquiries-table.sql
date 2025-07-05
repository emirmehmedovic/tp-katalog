-- Contact Inquiries Table
CREATE TABLE contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Policies for contact_inquiries
CREATE POLICY "Allow public to insert contact_inquiries" ON contact_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view contact_inquiries" ON contact_inquiries
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update contact_inquiries" ON contact_inquiries
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp (if not already exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for contact_inquiries
CREATE TRIGGER update_contact_inquiries_updated_at 
  BEFORE UPDATE ON contact_inquiries 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column(); 