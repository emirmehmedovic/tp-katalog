# Rješavanje Status Constraint Greške

## 🚨 Problem
```
new row for relation "inquiries" violates check constraint "inquiries_status_check"
```

## 🔍 Uzrok
Postojeći upiti u bazi podataka imaju stari status `'closed'` koji nije uključen u novi check constraint. Novi constraint dozvoljava samo:
- `'new'`
- `'contacted'`
- `'qualified'`
- `'proposal_sent'`
- `'negotiation'`
- `'won'`
- `'lost'`
- `'spam'`

Ali ne i `'closed'`.

## ✅ Rješenje

### 1. **Pokrenite SQL skriptu za popravku**
U Supabase SQL Editor-u pokrenite `scripts/fix-invalid-statuses.sql`:

```sql
-- Fix existing inquiries with invalid status values
-- Update 'closed' status to 'won' (since closed usually means completed/won)
UPDATE inquiries 
SET status = 'won' 
WHERE status = 'closed';

-- Update any other invalid statuses to 'new'
UPDATE inquiries 
SET status = 'new' 
WHERE status NOT IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost', 'spam');

-- Verify the fix
SELECT 
  status,
  COUNT(*) as count
FROM inquiries 
GROUP BY status 
ORDER BY status;
```

### 2. **Provjerite rezultat**
```sql
-- Check if there are any remaining invalid statuses
SELECT 
  id,
  status,
  created_at
FROM inquiries 
WHERE status NOT IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost', 'spam');
```

## 🔧 Šta je popravljeno u kodu

### 1. **Dodana podrška za legacy status**
```typescript
// Handle legacy 'closed' status by converting to 'won'
const statusToUpdate = newStatus === 'closed' ? 'won' : newStatus
```

### 2. **Fallback za prikaz**
```typescript
// Handle legacy 'closed' status by mapping to 'won'
const currentStatus = (inquiry.status as string) === 'closed' ? 'won' : inquiry.status
```

### 3. **Ažuriran Select value**
```typescript
value={currentStatus || 'new'}
```

## 📋 Koraci za testiranje

### 1. **Pokrenite SQL skriptu**
- Kopirajte sadržaj iz `scripts/fix-invalid-statuses.sql`
- Pokrenite u Supabase SQL Editor-u

### 2. **Provjerite rezultat**
- Trebali biste videti da su svi `'closed'` statusi promijenjeni u `'won'`
- Nema više invalid statusa

### 3. **Testirajte aplikaciju**
1. Idite u admin panel
2. Otvorite tab "Upiti za ponude"
3. Pokušajte promijeniti status
4. Trebalo bi raditi bez grešaka

## 🎯 Očekivani rezultat

- Svi `'closed'` statusi su promijenjeni u `'won'`
- Nema više constraint grešaka
- Ažuriranja statusa rade bez problema
- UI prikazuje ispravne statuse

## 🚨 Ako se problem nastavi

### 1. **Provjerite da li su svi statusi ispravni**
```sql
SELECT DISTINCT status FROM inquiries;
```

### 2. **Provjerite constraint**
```sql
SELECT 
  conname,
  pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conname = 'inquiries_status_check';
```

### 3. **Ako trebate dodati 'closed' status**
```sql
-- Drop existing constraint
ALTER TABLE inquiries DROP CONSTRAINT inquiries_status_check;

-- Add new constraint with 'closed'
ALTER TABLE inquiries 
ADD CONSTRAINT inquiries_status_check 
CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost', 'spam', 'closed'));
```

## 📞 Dodatna pomoć

Ako se problem nastavi:
1. **Provjerite da li su svi SQL upiti uspješno izvršeni**
2. **Provjerite da li postoje constraint greške**
3. **Provjerite da li su svi statusi validni** 