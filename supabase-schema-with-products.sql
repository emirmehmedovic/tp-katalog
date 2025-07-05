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
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read access)
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

-- RLS Policies for products (public read access)
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

-- RLS Policies for inquiries
CREATE POLICY "Inquiries are viewable by authenticated users" ON inquiries
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can insert inquiries" ON inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update inquiries" ON inquiries
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Policies for contact_inquiries
CREATE POLICY "Allow public to insert contact_inquiries" ON contact_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view contact_inquiries" ON contact_inquiries
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update contact_inquiries" ON contact_inquiries
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert categories
INSERT INTO categories (name, slug) VALUES
    ('Pranje Vozila', 'pranje-vozila'),
    ('Čišćenje Eksterijera i Specijalna Sredstva', 'ciscenje-eksterijera'),
    ('Čišćenje i Održavanje Enterijera', 'ciscenje-enterijera'),
    ('Vulkanizerska Oprema i Alati', 'vulkanizerska-oprema'),
    ('Vulkanizerski Potrošni Materijal', 'vulkanizerski-materijal');

-- Insert products for "Pranje Vozila" category
INSERT INTO products (name, description, product_code, image_url, category_id, slug) VALUES
    ('SELF POWER', 'Visokokvalitetni koncentrirani deterdžent sa snažnom pjenom, savršen za sve tipove vozila. Posebno formuliran za samouslužne autopraonice, efikasno prodire i uklanja i najtvrdokorniju prljavštinu bez oštećenja površine. Ekološki prihvatljiv, bez fosfata i NTA.', '25/1-411025', '/images/products/self-power.png', 
     (SELECT id FROM categories WHERE slug = 'pranje-vozila'), 'self-power'),
    
    ('TRUCK FOAM', 'Specijalizirani deterdžent sa samopolirajućom aktivnom pjenom, dizajniran za teška teretna vozila. Sadrži moćne omekšavajuće sastojke koji lako uklanjaju nataloženu prljavštinu s kamionskih cerada i drugih dijelova vozila. Pogodan i za pranje automobila i tepiha.', '25/1-411N25', '/images/products/truck-foam.png',
     (SELECT id FROM categories WHERE slug = 'pranje-vozila'), 'truck-foam'),
    
    ('TRACLAB PRAŠAK', 'Visoko efikasan deterdžent u prahu za uklanjanje organskih i neorganskih nečistoća. Idealan za pranje teških vozila, cerada, kontejnera i radnih strojeva. Efikasan čak i u tvrdoj ili slanoj vodi, ne ostavlja mrlje.', 'TRACLAB 20/1', '/images/products/traclab-prasak.png',
     (SELECT id FROM categories WHERE slug = 'pranje-vozila'), 'traclab-prasak'),
    
    ('SUPER SCHIUMA', 'Šampon sa intenzivnom bojom i visokom pjenom, pruža ugodan miris i vizualno atraktivno pranje. Savršen za samouslužne sisteme sa ručnom četkom. Pruža antistatičko djelovanje i dubinski čisti bez oštećivanja boje i plastike.', '25/1-411S25', '/images/products/super-schiuma.png',
     (SELECT id FROM categories WHERE slug = 'pranje-vozila'), 'super-schiuma'),
    
    ('ACTIVE FOAM', 'Pjenasto sredstvo sa "efektom snijega" koje kombinira vizualni dojam sa efikasnim antistatičkim djelovanjem i odličnom moći pranja. Može se koristiti i kao sigurno sredstvo za pretpranje bez upotrebe četke.', '20/1-411AFK', '/images/products/active-foam.png',
     (SELECT id FROM categories WHERE slug = 'pranje-vozila'), 'active-foam');

-- Insert products for "Čišćenje Eksterijera i Specijalna Sredstva" category
INSERT INTO products (name, description, product_code, image_url, category_id, slug) VALUES
    ('POWER LEGA (Čistač felgi)', 'Koncentrat za brzo i dubinsko čišćenje masnoće, prašine od kočnica i drugih prljavština sa aluminijskih i čeličnih felgi. Vraća originalni sjaj. Koristiti razrijeđeno prema uputama.', '25/1', '/images/products/power-lega.png',
     (SELECT id FROM categories WHERE slug = 'ciscenje-eksterijera'), 'power-lega-cistac-felgi'),
    
    ('LEGA EXTREME (Čistač felgi)', 'Neutralno, visoko efikasno sredstvo za čišćenje felgi. Njegova formula bez kaustika i fosfata sigurna je za sve vrste lakiranih i legiranih naplataka. U potpunosti uklanja prašinu kočionih obloga, ulje i oksidaciju.', '25/1 - ELX25', '/images/products/lega-extreme.png',
     (SELECT id FROM categories WHERE slug = 'ciscenje-eksterijera'), 'lega-extreme-cistac-felgi'),
    
    ('RIMUOVI INSETTI (Odstranjivač insekata)', 'Visoko koncentrirani organski deterdžent za lako uklanjanje mrlja od insekata i buba. Siguran za upotrebu na svim vanjskim površinama vozila - boji, plastici, staklu i hromu.', '25/1 - ERM25', '/images/products/rimuovi-insetti.png',
     (SELECT id FROM categories WHERE slug = 'ciscenje-eksterijera'), 'rimuovi-insetti'),
    
    ('GOMMA GLUC (Sjaj za gume)', 'Ultra koncentrirani sjaj za gume sa formulom visokog viskoziteta. Pruža dugotrajan, ekstra sjajan "mokri izgled" bez mrlja. Razrjeđuje se s vodom za postizanje željenog efekta.', '10/1 - EGG10', '/images/products/gomma-gluc.png',
     (SELECT id FROM categories WHERE slug = 'ciscenje-eksterijera'), 'gomma-gluc-sjaj-za-gume'),
    
    ('BLACK & WET (Sjaj za gume)', 'Vodootporni premaz za gume sa dugotrajnim "mokrim" efektom. Formula prijanja na nove gume i otporna je na kišu, pranje i habanje, osiguravajući dugotrajan sjaj i zaštitu.', '10/1 - EBW10', '/images/products/black-and-wet.png',
     (SELECT id FROM categories WHERE slug = 'ciscenje-eksterijera'), 'black-and-wet'),
    
    ('TAR & GLUE REMOVER', 'Profesionalno sredstvo za efikasno uklanjanje bitumena, katrana i ostataka ljepila sa karoserije vozila. Brzo djeluje i sigurno je za lakirane površine.', '3/1 - P025', '/images/products/tar-glue-remover.png',
     (SELECT id FROM categories WHERE slug = 'ciscenje-eksterijera'), 'tar-glue-remover'),
    
    ('SONAX Paste za Poliranje', 'Kompletan asortiman profesionalnih pasti za poliranje marke SONAX. Uključuje grube, srednje i fine paste za uklanjanje ogrebotina, vraćanje sjaja i zaštitu laka. Idealno za profesionalne detailing radionice.', 'SONAX-POLISH-SET', '/images/products/sonax-polishing-pastes.png',
     (SELECT id FROM categories WHERE slug = 'ciscenje-eksterijera'), 'sonax-paste-za-poliranje');

-- Insert products for "Čišćenje i Održavanje Enterijera" category
INSERT INTO products (name, description, product_code, image_url, category_id, slug) VALUES
    ('LUCIDA & RINNOVA (Sjaj za instrument tablu)', 'Mirisno sredstvo na bazi polimera za obnavljanje i zaštitu unutrašnjosti automobila. Čisti, polira i oživljava kontrolne ploče, plastične i drvene dijelove. Ekstra sjajna formula odbija sunce i prašinu.', '10/1 - ELR10', '/images/products/lucida-rinnova.png',
     (SELECT id FROM categories WHERE slug = 'ciscenje-enterijera'), 'lucida-rinnova-sjaj-za-tablu'),
    
    ('PLASTILUX', 'Sjaj za komandnu tablu i sve plastične površine. Obnavlja, polira i štiti ploče, tretiranu kožu, vinil i gumu. Ostavlja dugotrajan sjaj i svjež miris, može se koristiti i na vanjskim plastičnim dijelovima.', '10/1 - EPDX25', '/images/products/plastilux.png',
     (SELECT id FROM categories WHERE slug = 'ciscenje-enterijera'), 'plastilux'),
    
    ('NEW PELLE (Čistač kože)', 'Specijalno sredstvo za čišćenje i održavanje prirodne kože. Formula 3-u-1: pere, čisti i štiti. Sprječava starenje i pucanje kože, ostavljajući dugotrajnu zaštitnu barijeru. Pogodno i za namještaj.', '10/1 - EPPE10', '/images/products/new-pelle.png',
     (SELECT id FROM categories WHERE slug = 'ciscenje-enterijera'), 'new-pelle-cistac-koze'),
    
    ('SMACCHIATORE ES (Univerzalni čistač)', 'Visoko koncentrirani, mirisni deterdžent za ručno čišćenje unutrašnjosti. Efikasno uklanja tvrdokorne nečistoće poput mrlja, masnoće i tragova sa tepiha, sjedišta, vrata i podnica.', '25/1-013S25', '/images/products/smacchiatore-es.png',
     (SELECT id FROM categories WHERE slug = 'ciscenje-enterijera'), 'smacchiatore-es'),
    
    ('ECOLAVA (Čistač enterijera)', 'Profesionalno sredstvo za dubinsko i brzo čišćenje unutrašnjosti vozila. Idealno za korištenje sa strojevima za pranje ili Tornador pištoljem. Brzo se suši, ostavlja blagi antistatički film i oživljava boje.', '25/1 - EPMN25', '/images/products/ecolava.png',
     (SELECT id FROM categories WHERE slug = 'ciscenje-enterijera'), 'ecolava');

-- Insert products for "Vulkanizerska Oprema i Alati" category
INSERT INTO products (name, description, product_code, image_url, category_id, slug) VALUES
    ('Ventili za Gume (LKW/PKW)', 'Sveobuhvatan asortiman ventila za putnička (PKW) i teretna (LKW) vozila. U ponudi imamo različite tipove i dimenzije kako bi zadovoljili sve potrebe vaše radionice, uključujući TR 413, TR 414, LKW 100MS, 41MS i druge.', 'VULK-VENTILI', '/images/products/ventili-set.png',
     (SELECT id FROM categories WHERE slug = 'vulkanizerska-oprema'), 'ventili-za-gume'),
    
    ('Tegovi za Balansiranje', 'Kvalitetni tegovi za balansiranje točkova. Nudimo samoljepljive tegove u rolnama (19kg) kao i pojedinačne čelične i aluminijske tegove u različitim gramažama (5g do 300g) za putnička i teretna vozila.', 'VULK-TEGOVI', '/images/products/tegovi-za-balansiranje.png',
     (SELECT id FROM categories WHERE slug = 'vulkanizerska-oprema'), 'tegovi-za-balansiranje'),
    
    ('Alat za Montažu i Krpljenje Guma', 'Kompletan set profesionalnog alata za vulkanizere. Uključuje montirače, stegu za montažu teretnih guma, alat za narezivanje, rolere, odvijače za iglice ventila i ostali neophodan pribor za brzu i efikasnu uslugu.', 'VULK-ALATI-SET', '/images/products/vulkanizerski-alati.png',
     (SELECT id FROM categories WHERE slug = 'vulkanizerska-oprema'), 'vulkanizerski-alat-set'),
    
    ('TORNADOR 2020 (Pištolj za čišćenje)', 'Profesionalni pištolj za dubinsko čišćenje unutrašnjosti vozila pomoću komprimiranog zraka. Idealan za čišćenje teško dostupnih mjesta poput instrument table, ventilacije, tepiha i sjedišta. Opremljen crijevom za usisavanje deterdženta.', 'C0620', '/images/products/tornador-2020.png',
     (SELECT id FROM categories WHERE slug = 'vulkanizerska-oprema'), 'tornador-2020');

-- Insert products for "Vulkanizerski Potrošni Materijal" category
INSERT INTO products (name, description, product_code, image_url, category_id, slug) VALUES
    ('Zakrpe za Gume (TUBE PATCH)', 'Veliki izbor visokokvalitetnih zakrpa za krpljenje svih vrsta guma za automobile i kamione. U ponudi imamo TUBE PATCH (01, 02, 03, 04), kao i UPL, UPR, PN i RAD serije za sve vrste popravki.', 'VULK-ZAKRPE', '/images/products/zakrpe-za-gume.png',
     (SELECT id FROM categories WHERE slug = 'vulkanizerski-materijal'), 'zakrpe-za-gume'),
    
    ('Cement i Ljepila za Gume', 'Profesionalni cementi i ljepila za vulkanizaciju. Uključuje CEMENT 200gr/650gr i druga specijalizirana ljepila koja osiguravaju snažnu i trajnu vezu prilikom krpljenja guma.', 'VULK-LJEPILA', '/images/products/cement-za-gume.png',
     (SELECT id FROM categories WHERE slug = 'vulkanizerski-materijal'), 'cement-i-ljepila-za-gume'),
    
    ('Pasta za Montažu Guma', 'Visokokvalitetna pasta za montažu guma koja olakšava postavljanje i skidanje guma sa felgi. Smanjuje trenje, sprječava oštećenja i osigurava pravilno nalijeganje gume.', 'VULK-PASTA', '/images/products/pasta-za-montazu.png',
     (SELECT id FROM categories WHERE slug = 'vulkanizerski-materijal'), 'pasta-za-montazu-guma');

-- Function to update updated_at timestamp
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