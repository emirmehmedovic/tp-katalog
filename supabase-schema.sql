-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    product_code TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inquiries table
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_company TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed'))
);

-- Create indexes for better performance
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_inquiries_product_id ON inquiries(product_id);
CREATE INDEX idx_inquiries_user_id ON inquiries(user_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read access)
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

-- RLS Policies for products (public read access)
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

-- RLS Policies for inquiries
CREATE POLICY "Inquiries are viewable by authenticated users" ON inquiries
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin users can view all inquiries" ON inquiries
    FOR SELECT USING (
        auth.role() = 'authenticated' AND 
        auth.email() IN ('admin1@example.com', 'admin2@example.com')
    );

CREATE POLICY "Anyone can insert inquiries" ON inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update inquiries" ON inquiries
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert some sample categories
INSERT INTO categories (name, slug) VALUES
    ('Poliranje', 'poliranje'),
    ('Čišćenje enterijera', 'ciscenje-enterijera'),
    ('Zaštita', 'zastita'),
    ('Održavanje', 'odrzavanje');

-- Insert some sample products
INSERT INTO products (name, description, product_code, image_url, category_id, slug) VALUES
    ('SELF POWER', 'Profesionalni proizvod za poliranje automobila', '25/1-411025', '/images/products/self-power.png', 
     (SELECT id FROM categories WHERE slug = 'poliranje'), 'self-power'),
    ('TIGER', 'Snažan čistač za enterijer', '30/2-512030', '/images/products/tiger.png',
     (SELECT id FROM categories WHERE slug = 'ciscenje-enterijera'), 'tiger'),
    ('PROTECT SHIELD', 'Zaštitni premaz za lak', '40/3-623040', '/images/products/protect-shield.png',
     (SELECT id FROM categories WHERE slug = 'zastita'), 'protect-shield'); 