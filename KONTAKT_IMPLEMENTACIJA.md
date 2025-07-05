# Kontakt Forma - Implementacija

## Šta je implementirano

### 1. Kontakt Forma (`/kontakt`)
- ✅ Kontakt forma sa validacijom
- ✅ Kontakt informacije komponenta
- ✅ Hero sekcija
- ✅ Mapa placeholder
- ✅ Responsive dizajn

### 2. Kontakt Forma Komponenta
- ✅ Polja: ime, email, telefon, kompanija, tema, poruka
- ✅ Validacija forme
- ✅ Loading stanje
- ✅ Success poruka
- ✅ Error handling

### 3. Kontakt Informacije
- ✅ Telefon, email, adresa, radno vrijeme
- ✅ Dodatne informacije
- ✅ Ikonice i styling

### 4. Navigacija
- ✅ Kontakt link u navbar-u
- ✅ Mobilna navigacija
- ✅ Kontakt link u footer-u

### 5. Admin Panel
- ✅ KontaktInquiriesTable komponenta
- ✅ Novi tab "Kontakt upiti"
- ✅ Pregled svih upita
- ✅ Status management (novo, u toku, završeno, spam)
- ✅ Detaljni pregled upita
- ✅ Ažuriranje statusa

## Šta treba uraditi

### 1. Dodati tabelu u Supabase
Pokrenite SQL skriptu `scripts/add-contact-inquiries-table.sql` u Supabase SQL Editor-u:

```sql
-- Kopirajte sadržaj iz scripts/add-contact-inquiries-table.sql
-- i pokrenite u Supabase SQL Editor-u
```

### 2. Testiranje
1. Pokrenite development server: `npm run dev`
2. Idite na `/kontakt` stranicu
3. Ispunite i pošaljite kontakt formu
4. Provjerite da li se podaci čuvaju u Supabase
5. Idite u admin panel (`/admin/dashboard`)
6. Provjerite tab "Kontakt upiti"

## Struktura baze podataka

### Tabela: `contact_inquiries`
```sql
- id (UUID, Primary Key)
- name (VARCHAR, Required)
- email (VARCHAR, Required)
- phone (VARCHAR, Optional)
- company (VARCHAR, Optional)
- subject (VARCHAR, Required)
- message (TEXT, Required)
- status (VARCHAR, Default: 'new')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Statusi
- `new` - Novi upit
- `in_progress` - U toku obrade
- `completed` - Završeno
- `spam` - Spam

## RLS (Row Level Security) Policies
- ✅ Javni pristup za INSERT (slanje forme)
- ✅ Autentifikovani korisnici mogu čitati i ažurirati
- ✅ Admin panel ima puni pristup

## Funkcionalnosti

### Kontakt Forma
- ✅ Validacija svih polja
- ✅ Email format validacija
- ✅ Minimalna dužina poruke (10 karaktera)
- ✅ Loading stanje tokom slanja
- ✅ Success/error poruke
- ✅ Reset forme nakon uspješnog slanja

### Admin Panel
- ✅ Pregled svih kontakt upita
- ✅ Sortiranje po datumu (najnoviji prvi)
- ✅ Status management
- ✅ Detaljni pregled upita
- ✅ Ažuriranje statusa u real-time
- ✅ Responsive tabela

## Styling
- ✅ Sangria orange-red-amber color palette
- ✅ Modern B2B dizajn
- ✅ Responsive layout
- ✅ Hover efekti
- ✅ Loading animacije
- ✅ Status badges sa ikonicama

## Troubleshooting

### Ako forma ne šalje podatke:
1. Provjerite Supabase konfiguraciju u `src/lib/supabase.ts`
2. Provjerite RLS policies u Supabase
3. Provjerite console za greške

### Ako admin panel ne prikazuje podatke:
1. Provjerite autentifikaciju
2. Provjerite RLS policies
3. Provjerite da li tabela postoji

### Ako se podaci ne čuvaju:
1. Provjerite Supabase URL i API key
2. Provjerite network tab u browser-u
3. Provjerite Supabase logs 