# Upiti za Ponude - Profesionalni Upgrade

## 🚀 Šta je novo implementirano

### 1. **Napredni Statusi Leadova**
- `new` - Novi upit
- `contacted` - Kontaktiran
- `qualified` - Kvalifikovan
- `proposal_sent` - Ponuda poslana
- `negotiation` - Pregovori
- `won` - Dobijen
- `lost` - Izgubljen
- `spam` - Spam

### 2. **Sistem Prioritetima**
- `low` - Nizak prioritet
- `medium` - Srednji prioritet
- `high` - Visok prioritet
- `urgent` - Hitno

### 3. **Komentari i Napomene**
- Dodavanje komentara za svaki lead
- Praćenje napretka
- Interna komunikacija

### 4. **Finansijski Podaci**
- Procijenjena vrijednost (KM)
- Praćenje potencijalne zarade

### 5. **Follow-up Sistem**
- Planiranje sljedećeg kontakta
- Datum i vrijeme follow-up-a
- Automatsko praćenje

### 6. **Poboljšana Tabela**
- Bolje organizovani podaci
- Status badges sa ikonicama
- Prioritet indikatori
- Hover efekti
- Responsive dizajn

### 7. **Detaljni Modal**
- Kompletne informacije o lead-u
- Editabilna polja
- Organizovani u sekcije
- Profesionalni izgled

## 📋 Šta treba uraditi

### 1. **Ažurirati bazu podataka**
Pokrenite SQL skriptu `scripts/update-inquiries-table.sql` u Supabase SQL Editor-u:

```sql
-- Kopirajte sadržaj iz scripts/update-inquiries-table.sql
-- i pokrenite u Supabase SQL Editor-u
```

### 2. **Testiranje novih funkcionalnosti**
1. Pokrenite `npm run dev`
2. Idite u admin panel (`/admin/dashboard`)
3. Otvorite tab "Upiti za ponude"
4. Testirajte:
   - Promjenu statusa
   - Promjenu prioriteta
   - Dodavanje komentara
   - Postavljanje follow-up datuma
   - Unos procijenjene vrijednosti

## 🗄️ Nova polja u bazi podataka

### Tabela: `inquiries` (dodatna polja)
```sql
- status (VARCHAR) - Napredni statusi leadova
- priority (VARCHAR) - Prioritet (low, medium, high, urgent)
- assigned_to (UUID) - Dodeljen korisnik
- comments (TEXT) - Komentari i napomene
- next_follow_up (TIMESTAMP) - Sljedeći follow-up
- estimated_value (DECIMAL) - Procijenjena vrijednost
- source (VARCHAR) - Izvor lead-a
- updated_at (TIMESTAMP) - Vrijeme ažuriranja
```

## 🎨 UI/UX Poboljšanja

### Status Badges
- Različite boje za različite statuse
- Ikonice za brzu identifikaciju
- Hover efekti

### Prioritet Indikatori
- Zvjezdice sa različitim bojama
- Jasna hijerarhija prioriteta

### Detaljni Modal
- Organizovan u logične sekcije
- Editabilna polja
- Profesionalni izgled
- Scroll za duge sadržaje

## 🔧 Funkcionalnosti

### Real-time Ažuriranja
- Promjene se čuvaju odmah
- Nema potrebe za refresh stranice
- Optimistički UI updates

### Validacija
- Provjera unosa
- Error handling
- User feedback

### Responsive Dizajn
- Radi na svim uređajima
- Optimizovan za mobile
- Touch-friendly

## 📊 Lead Management Workflow

### 1. **Novi Lead** (`new`)
- Automatski status za nove upite
- Potrebno kvalifikovanje

### 2. **Kontaktiran** (`contacted`)
- Nakon prvog kontakta
- Planiranje sljedećeg koraka

### 3. **Kvalifikovan** (`qualified`)
- Lead je zainteresovan
- Potrebna ponuda

### 4. **Ponuda Poslana** (`proposal_sent`)
- Ponuda je poslana
- Čekanje odgovora

### 5. **Pregovori** (`negotiation`)
- Aktivni pregovori
- Potrebno praćenje

### 6. **Dobijen** (`won`) / **Izgubljen** (`lost`)
- Krajnji rezultat
- Analiza uspjeha

## 🎯 Prednosti novog sistema

### Za Prodaju
- Bolje praćenje leadova
- Jasni prioriteti
- Sistem follow-up-a
- Finansijsko praćenje

### Za Menadžment
- Pregled svih aktivnosti
- Analiza uspješnosti
- Praćenje performansi
- Planiranje resursa

### Za Klijente
- Brži odgovori
- Profesionalniji pristup
- Bolje praćenje upita

## 🚨 Troubleshooting

### Ako se podaci ne ažuriraju:
1. Provjerite Supabase konfiguraciju
2. Provjerite RLS policies
3. Provjerite console za greške

### Ako se modal ne otvara:
1. Provjerite da li su svi importi ispravni
2. Provjerite da li su komponente pravilno renderovane

### Ako se statusi ne mijenjaju:
1. Provjerite da li je tabela ažurirana
2. Provjerite da li su constraint-i ispravni 