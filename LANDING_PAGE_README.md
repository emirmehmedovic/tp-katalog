# TP Omerbašić Landing Page

## Pregled

Implementirana je nova landing stranica za TP Omerbašić, veleprodaju autokozmetike i opreme, prema detaljnim smjernicama za dizajn. **Nova landing stranica je sada glavna stranica** (`/`).

## Struktura

### Komponente
- `src/components/landing/HeroSection.tsx` - Hero sekcija sa gradijentom
- `src/components/landing/TrustBar.tsx` - Traka povjerenja sa 4 indikatora
- `src/components/landing/CategoriesSection.tsx` - Sekcija kategorija proizvoda
- `src/components/landing/ValueProposition.tsx` - Zašto odabrati nas
- `src/components/landing/FinalCTA.tsx` - Finalni poziv na akciju
- `src/components/landing/LandingFooter.tsx` - Footer sa kontakt informacijama

### Stranice
- `src/app/page.tsx` - **Glavna stranica** (TP Omerbašić landing)

## Dizajn Specifikacije

### Paleta Boja
- **Primarni akcenti:** `orange-600`, `red-600`, `amber-600`
- **Gradijent:** `bg-gradient-to-r from-orange-600 to-red-600`
- **Neutralne:** `gray-50` do `gray-900`, `white`

### Tipografija
- **Font:** Inter (predefinisan u Tailwind)
- **Naslovi:** `font-bold`
- **Podnaslovi:** `font-semibold`

### Responsivnost
- Potpuno responsivna za sve veličine ekrana
- Mobile-first pristup
- Grid sistemi prilagođeni za različite breakpointove

## Korištenje

### Pristup stranicama
- **Glavna stranica (TP Omerbašić):** `/`

### Navigacija
- **"Početna"** - vodi na glavnu stranicu (`/`)
- **"Proizvodi"** - vodi na proizvode (`/proizvodi`)

## Potrebne akcije

### 1. Slika za Value Proposition
Dodajte profesionalnu fotografiju na lokaciju:
```
public/images/partnership.jpg
```

**Preporučene specifikacije:**
- Veličina: 800x600px ili veća
- Format: JPG ili PNG
- Sadržaj: Dva čovjeka u poslovnom okruženju (radionica/ured)
- Kvalitet: Visok, profesionalan

### 2. Kontakt informacije
Ažurirajte kontakt informacije u `LandingFooter.tsx`:
- Telefon
- Email
- Adresa
- Radno vrijeme

### 3. Kategorije proizvoda
Ažurirajte kategorije u `CategoriesSection.tsx` prema stvarnom asortimanu.

### 4. Sadržaj
Prilagodite tekstualni sadržaj u svim komponentama prema stvarnim informacijama o firmi.

## Funkcionalnosti

### Hero Sekcija
- Gradijent pozadina
- Glavni naslov i podnaslov
- Dva CTA dugmeta (Pogledajte asortiman, Kontaktirajte nas)

### Trust Bar
- 4 indikatora povjerenja sa ikonama
- Responsivni grid layout

### Kategorije
- 4 kategorije proizvoda
- Hover efekti
- Linkovi na proizvode

### Value Proposition
- Split layout (slika + tekst)
- 4 ključne vrijednosti
- Misija firme

### Final CTA
- Gradijent pozadina (isti kao hero)
- Dva CTA dugmeta
- Dodatne informacije

### Footer
- 4 kolone sa linkovima
- Kontakt informacije
- Copyright

## Tehničke napomene

### Performanse
- Optimizovane slike sa Next.js Image komponentom
- Lazy loading za slike
- Efikasni CSS sa Tailwind

### SEO
- Meta tagovi za naslov i opis
- Semantički HTML
- Optimizovana struktura

### Pristupačnost
- Kontrast boja prema WCAG smjernicama
- Keyboard navigation
- Screen reader friendly

## Testiranje

### Responsivnost
Testirajte na:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large Desktop (1280px+)

### Browseri
- Chrome
- Firefox
- Safari
- Edge

## Deployment

Stranica je spremna za deployment i automatski će biti uključena u build proces.

---

**Napomena:** 
- Nova TP Omerbašić landing stranica je sada glavna stranica (`/`)
- Navigacija je ažurirana da odražava nove putanje 