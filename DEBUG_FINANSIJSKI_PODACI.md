# Debug: Finansijski Podaci se ne čuvaju

## 🚨 Problem
Finansijski podaci (procijenjena vrijednost) i follow-up datum se ne čuvaju kada se klikne "Sačuvaj sve promjene".

## 🔍 Koraci za debug

### 1. **Provjerite da li su polja dodana u bazu**
Pokrenite `scripts/check-inquiries-table.sql` u Supabase SQL Editor-u:

```sql
-- Check if inquiries table has all required fields
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'inquiries' 
ORDER BY ordinal_position;
```

### 2. **Provjerite sample podatke**
```sql
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
```

### 3. **Provjerite NULL vrijednosti**
```sql
-- Check if there are any NULL values in required fields
SELECT 
  COUNT(*) as total_inquiries,
  COUNT(CASE WHEN status IS NULL THEN 1 END) as null_status,
  COUNT(CASE WHEN priority IS NULL THEN 1 END) as null_priority,
  COUNT(CASE WHEN source IS NULL THEN 1 END) as null_source,
  COUNT(CASE WHEN updated_at IS NULL THEN 1 END) as null_updated_at
FROM inquiries;
```

## 🔧 Šta je popravljeno u kodu

### 1. **Poboljšana logika ažuriranja**
```typescript
onClick={() => {
  const updates: Partial<Inquiry> = {}
  
  if (editingInquiry.comments !== selectedInquiry.comments) {
    updates.comments = editingInquiry.comments
  }
  
  if (editingInquiry.estimated_value !== selectedInquiry.estimated_value) {
    updates.estimated_value = editingInquiry.estimated_value
  }
  
  if (editingInquiry.next_follow_up !== selectedInquiry.next_follow_up) {
    updates.next_follow_up = editingInquiry.next_follow_up
  }
  
  if (Object.keys(updates).length > 0) {
    handleUpdateInquiry(selectedInquiry.id, updates)
  }
}}
```

### 2. **Dodani debug logovi**
```typescript
console.log('Updating inquiry:', inquiryId, 'with updates:', updates)
console.log('Successfully updated inquiry')
```

### 3. **Ažuriranje selectedInquiry**
```typescript
// Update selected inquiry if it's the same one
if (selectedInquiry && selectedInquiry.id === inquiryId) {
  setSelectedInquiry({ ...selectedInquiry, ...updates })
}
```

## 📋 Koraci za testiranje

### 1. **Otvorite Browser Console**
- F12 → Console tab
- Očistite console

### 2. **Testirajte ažuriranje**
1. Idite u admin panel
2. Otvorite tab "Upiti za ponude"
3. Kliknite "Detalji" na bilo koji upit
4. Unesite procijenjenu vrijednost (npr. 1000)
5. Postavite follow-up datum
6. Kliknite "Sačuvaj sve promjene"

### 3. **Provjerite console logove**
Trebali biste videti:
```
Updating inquiry: [ID] with updates: {estimated_value: 1000, next_follow_up: "2024-01-15T10:00:00.000Z"}
Successfully updated inquiry
```

## 🚨 Ako se problem nastavi

### 1. **Provjerite Supabase logs**
- Idite u Supabase Dashboard
- Database → Logs
- Provjerite da li postoje greške

### 2. **Provjerite RLS policies**
```sql
-- Check RLS policies for inquiries table
SELECT * FROM pg_policies WHERE tablename = 'inquiries';
```

### 3. **Testirajte direktno u Supabase**
```sql
-- Test update directly
UPDATE inquiries 
SET estimated_value = 1000, next_follow_up = NOW()
WHERE id = 'your-inquiry-id';
```

## 🎯 Očekivani rezultat

- Console logovi pokazuju uspješno ažuriranje
- Podaci se čuvaju u bazi
- UI se ažurira odmah
- Modal se zatvara nakon uspješnog čuvanja

## 📞 Dodatna pomoć

Ako se problem nastavi:
1. **Provjerite da li su svi SQL upiti uspješno izvršeni**
2. **Provjerite da li postoje constraint greške**
3. **Provjerite da li su RLS policies ispravno postavljeni**
4. **Provjerite da li je korisnik autentifikovan** 