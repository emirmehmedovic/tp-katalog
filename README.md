# CarCare Pro - B2B Webshop

Moderni B2B webshop za proizvode za održavanje automobila, izgrađen sa Next.js 14, TypeScript, Tailwind CSS i Supabase.

## 🚀 Funkcionalnosti

- **Katalog proizvoda** - Pregled i filtriranje proizvoda po kategorijama
- **Sistem za upite** - Forma za traženje ponuda umesto direktne kupovine
- **Admin panel** - Upravljanje upitima i statusima
- **Autentifikacija** - Sigurni login/register sistem
- **Responsive dizajn** - Optimizovano za sve uređaje
- **Glassmorphism UI** - Moderan, Apple-inspirisan dizajn

## 🛠️ Tehnologije

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (Database, Authentication)
- **UI Komponente:** Shadcn/UI
- **Ikonice:** Lucide React
- **Formatiranje datuma:** date-fns

## 📁 Struktura projekta

```
katalog-webshop/
├── app/
│   ├── (main)/           # Javne stranice
│   │   ├── page.tsx      # Početna stranica
│   │   └── proizvodi/    # Katalog proizvoda
│   ├── (auth)/           # Autentifikacija
│   │   ├── login/
│   │   └── register/
│   └── admin/            # Admin panel
│       └── dashboard/
├── components/
│   ├── ui/               # Shadcn/UI komponente
│   ├── shared/           # Deljene komponente
│   ├── products/         # Komponente za proizvode
│   └── admin/            # Admin komponente
├── lib/
│   ├── supabase.ts       # Supabase konfiguracija
│   └── types.ts          # TypeScript tipovi
└── public/
    └── images/products/  # Slike proizvoda
```

## 🚀 Pokretanje projekta

### 1. Kloniranje repozitorijuma

```bash
git clone <repository-url>
cd katalog-webshop
```

### 2. Instalacija zavisnosti

```bash
npm install
```

### 3. Konfiguracija Supabase

1. Kreirajte novi projekat na [Supabase](https://supabase.com)
2. Kopirajte URL i anon key iz Settings > API
3. Kreirajte `.env.local` fajl:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Postavljanje baze podataka

1. Idite na SQL Editor u Supabase dashboard
2. Kopirajte i izvršite SQL iz `supabase-schema.sql` fajla
3. Ovo će kreirati sve potrebne tabele i sample podatke

### 5. Pokretanje development servera

```bash
npm run dev
```

Aplikacija će biti dostupna na [http://localhost:3000](http://localhost:3000)

## 📊 Baza podataka

### Tabele

- **categories** - Kategorije proizvoda
- **products** - Proizvodi sa slikama i opisima
- **inquiries** - Upiti za ponude od kupaca

### RLS (Row Level Security)

- Kategorije i proizvodi su javno dostupni
- Upiti mogu da kreiraju svi, a čitaju samo autentifikovani korisnici

## 🎨 Dizajn

- **Glassmorphism efekti** - Transparentni navbar sa blur efektom
- **Minimalistički pristup** - Čist, moderan dizajn
- **Responsive grid** - Prilagođava se svim veličinama ekrana
- **Tailwind CSS** - Utility-first CSS framework

## 🔐 Autentifikacija

- **Supabase Auth** - Email/password autentifikacija
- **Protected routes** - Middleware za zaštitu admin stranica
- **Session management** - Automatsko upravljanje sesijama

## 📱 Responsive dizajn

- **Mobile-first** pristup
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible grid** sistem za proizvode

## 🚀 Deployment

### Vercel (Preporučeno)

1. Povežite GitHub repozitorijum sa Vercel
2. Dodajte environment varijable u Vercel dashboard
3. Deploy će se automatski izvršiti

### Ostale platforme

Projekat može biti deployovan na bilo koju platformu koja podržava Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 📝 Dodavanje proizvoda

1. Dodajte sliku proizvoda u `public/images/products/`
2. U Supabase dashboard, dodajte novi red u `products` tabelu
3. Proizvod će se automatski pojaviti na sajtu

## 🔧 Razvoj

### Komande

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint provera
```

### Struktura komponenti

- **Server Components** - Za data fetching i SEO
- **Client Components** - Za interaktivnost
- **Reusable UI** - Shadcn/UI komponente

## 📞 Podrška

Za pitanja i podršku, kontaktirajte development tim.

## 📄 Licenca

Ovaj projekat je kreiran za internu upotrebu.
