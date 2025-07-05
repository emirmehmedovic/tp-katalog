# Debug: Status Update Greška

## 🚨 Problem
```
Error: Supabase error: {}
Došlo je do greške prilikom ažuriranja statusa: new row for relation "inquiries" violates check constraint "inquiries_status_check"
```

## 🔍 Koraci za debug

### 1. **Pokrenite debug skriptu u Supabase**
Kopirajte i pokrenite `scripts/debug-status-issue.sql`:

```sql
-- Debug status constraint issue
-- Check all existing statuses
SELECT DISTINCT status FROM inquiries;

-- Check if there are any NULL statuses
SELECT COUNT(*) as null_status_count FROM inquiries WHERE status IS NULL;

-- Check the exact constraint definition
SELECT 
  conname as constraint_name,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conname = 'inquiries_status_check';

-- Check all inquiries with their statuses
SELECT 
  id,
  customer_name,
  status,
  created_at
FROM inquiries 
ORDER BY created_at DESC
LIMIT 10;
```

### 2. **Provjerite rezultate**
Javite mi šta pokazuju ovi upiti, posebno:
- Koje statuse pokazuje prvi upit
- Da li postoje NULL statusi
- Šta pokazuje constraint definition

### 3. **Testirajte u aplikaciji**
1. Otvorite browser console (F12)
2. Idite u admin panel
3. Pokušajte promijeniti status
4. Provjerite console logove

## 🔧 Šta je popravljeno u kodu

### 1. **Dodana provjera postojećeg statusa**
```typescript
// Find current inquiry
const currentInquiry = localInquiries.find(inquiry => inquiry.id === inquiryId)
if (!currentInquiry) {
  console.error('Inquiry not found:', inquiryId)
  return
}
```

### 2. **Provjera da li se status stvarno mijenja**
```typescript
// Check if status is actually changing
const currentStatus = (currentInquiry.status as string) === 'closed' ? 'won' : currentInquiry.status
if (currentStatus === statusToUpdate) {
  console.log('Status is already the same, skipping update')
  return
}
```

### 3. **Detaljniji logovi**
```typescript
console.log('Current status:', currentStatus, 'New status:', statusToUpdate)
```

## 🚨 Mogući uzroci

### 1. **Još uvijek postoje invalid statusi**
- Možda SQL skripta nije pokrenuta za sve upite
- Možda postoje upiti sa razmakom ili posebnim karakterima

### 2. **Constraint problem**
- Možda je constraint previše restriktivan
- Možda postoje case sensitivity problemi

### 3. **RLS policies**
- Možda RLS policies ne dozvoljavaju ažuriranje

## 📋 Koraci za rješavanje

### 1. **Pokrenite debug skriptu**
- Kopirajte sadržaj iz `scripts/debug-status-issue.sql`
- Pokrenite u Supabase SQL Editor-u
- Javite mi rezultate

### 2. **Ako postoje invalid statusi**
Pokrenite ovaj kod:

```sql
-- Force update all invalid statuses
UPDATE inquiries 
SET status = 'new' 
WHERE status IS NULL 
   OR status NOT IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost', 'spam')
   OR TRIM(status) = '';
```

### 3. **Ako je problem sa constraint-om**
```sql
-- Drop and recreate constraint
ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_status_check;

ALTER TABLE inquiries 
ADD CONSTRAINT inquiries_status_check 
CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost', 'spam'));
```

## 📞 Dodatna pomoć

Javite mi rezultate debug skripte i console logove iz browser-a. To će nam pomoći da identificiramo tačan uzrok problema. 