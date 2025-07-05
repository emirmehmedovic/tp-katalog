# Debug: RLS Error pri ažuriranju statusa

## 🚨 Problem
```
Error: Error updating status: {}
```

## 🔍 Uzrok
Greška se javlja jer RLS (Row Level Security) policies možda ne dozvoljavaju ažuriranje podataka, ili postoje problemi sa autentifikacijom.

## ✅ Koraci za debug

### 1. **Provjerite RLS policies**
Pokrenite `scripts/check-rls-policies.sql` u Supabase SQL Editor-u:

```sql
-- Check RLS policies for inquiries table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'inquiries';
```

### 2. **Provjerite da li je RLS omogućen**
```sql
-- Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'inquiries';
```

### 3. **Provjerite autentifikaciju**
```sql
-- Check current user and permissions
SELECT 
  current_user,
  session_user,
  current_database();
```

### 4. **Testirajte čitanje podataka**
```sql
-- Test if we can read from inquiries table
SELECT COUNT(*) as total_inquiries FROM inquiries;
```

## 🔧 Šta je popravljeno u kodu

### 1. **Poboljšani error handling**
```typescript
if (error) {
  console.error('Supabase error:', error)
  throw error
}
```

### 2. **Detaljni error logovi**
```typescript
console.error('Error details:', {
  message: error?.message,
  details: error?.details,
  hint: error?.hint,
  code: error?.code
})
```

### 3. **Bolje error poruke**
```typescript
alert(`Došlo je do greške prilikom ažuriranja statusa: ${error?.message || 'Nepoznata greška'}`)
```

## 📋 Koraci za testiranje

### 1. **Otvorite Browser Console**
- F12 → Console tab
- Očistite console

### 2. **Testirajte ažuriranje statusa**
1. Idite u admin panel
2. Otvorite tab "Upiti za ponude"
3. Promijenite status bilo kojeg upita
4. Provjerite console logove

### 3. **Provjerite error poruke**
Trebali biste videti detaljne informacije o grešci u console-u.

## 🚨 Mogući uzroci

### 1. **RLS Policies**
- Možda ne postoje policies za UPDATE operacije
- Policies možda ne dozvoljavaju ažuriranje

### 2. **Autentifikacija**
- Korisnik možda nije pravilno autentifikovan
- Session možda je istekao

### 3. **Permissions**
- Korisnik možda nema dozvolu za ažuriranje

## 🔧 Rješenja

### 1. **Ako RLS policies ne postoje**
```sql
-- Add UPDATE policy for authenticated users
CREATE POLICY "Authenticated users can update inquiries" ON inquiries
  FOR UPDATE USING (auth.role() = 'authenticated');
```

### 2. **Ako je problem sa autentifikacijom**
- Provjerite da li je korisnik prijavljen
- Provjerite da li session nije istekao
- Pokušajte se odjaviti i ponovo prijaviti

### 3. **Ako je problem sa permissions**
```sql
-- Grant permissions to authenticated users
GRANT UPDATE ON inquiries TO authenticated;
```

## 📞 Dodatna pomoć

### 1. **Provjerite Supabase logs**
- Idite u Supabase Dashboard
- Database → Logs
- Provjerite da li postoje greške

### 2. **Testirajte direktno u Supabase**
```sql
-- Test update directly (replace with actual ID)
UPDATE inquiries 
SET status = 'contacted'
WHERE id = 'your-inquiry-id';
```

### 3. **Provjerite auth state**
```typescript
// Add this to your component to check auth state
const { data: { user } } = await supabase.auth.getUser()
console.log('Current user:', user)
```

## 🎯 Očekivani rezultat

- Console logovi pokazuju detaljne informacije o grešci
- Error poruka sadrži stvarni uzrok problema
- RLS policies su ispravno postavljeni
- Ažuriranja rade bez problema 