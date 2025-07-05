# Rješavanje Greške u Inquiries Tabeli

## 🚨 Problem
```
TypeError: Cannot read properties of undefined (reading 'icon')
```

## 🔍 Uzrok
Postojeći upiti u bazi podataka nemaju nova polja (`priority`, `status`, `source`) koja su dodana u novoj verziji, pa kada komponenta pokušava pristupiti `priorityConfig[inquiry.priority]`, dobija `undefined`.

## ✅ Rješenje

### 1. **Pokrenite SQL skriptu za ažuriranje baze**
U Supabase SQL Editor-u pokrenite `scripts/update-inquiries-table.sql`:

```sql
-- Update inquiries table with new fields for better lead management
ALTER TABLE inquiries 
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost', 'spam')),
ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS comments TEXT,
ADD COLUMN IF NOT EXISTS next_follow_up TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS estimated_value DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS source VARCHAR(100) DEFAULT 'website',
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
```

### 2. **Popunite postojeće upite sa default vrijednostima**
Pokrenite `scripts/fix-existing-inquiries.sql`:

```sql
-- Fix existing inquiries by setting default values for new fields
UPDATE inquiries 
SET 
  status = COALESCE(status, 'new'),
  priority = COALESCE(priority, 'medium'),
  source = COALESCE(source, 'website'),
  updated_at = COALESCE(updated_at, created_at)
WHERE 
  status IS NULL 
  OR priority IS NULL 
  OR source IS NULL 
  OR updated_at IS NULL;
```

### 3. **Provjerite rezultat**
```sql
-- Verify the update
SELECT 
  COUNT(*) as total_inquiries,
  COUNT(CASE WHEN status IS NOT NULL THEN 1 END) as with_status,
  COUNT(CASE WHEN priority IS NOT NULL THEN 1 END) as with_priority,
  COUNT(CASE WHEN source IS NOT NULL THEN 1 END) as with_source
FROM inquiries;
```

## 🔧 Šta je popravljeno u kodu

### 1. **Dodani fallback-ovi u komponenti**
```typescript
const statusInfo = statusConfig[inquiry.status as keyof typeof statusConfig] || statusConfig.new
const priorityInfo = priorityConfig[inquiry.priority as keyof typeof priorityConfig] || priorityConfig.medium
```

### 2. **Dodani fallback-ovi u Select komponentama**
```typescript
value={inquiry.status || 'new'}
value={inquiry.priority || 'medium'}
```

### 3. **Dodani fallback-ovi u modalnom prozoru**
```typescript
<Badge className={statusConfig[selectedInquiry.status as keyof typeof statusConfig]?.color || statusConfig.new.color}>
```

### 4. **Ažurirani types**
```typescript
status?: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'won' | 'lost' | 'spam'
priority?: 'low' | 'medium' | 'high' | 'urgent'
source?: string
```

## 📋 Koraci za testiranje

1. **Pokrenite SQL skripte** u Supabase
2. **Restartujte development server**: `npm run dev`
3. **Idite u admin panel**: `/admin/dashboard`
4. **Otvorite tab "Upiti za ponude"**
5. **Provjerite da li se tabela učitava bez grešaka**

## 🎯 Očekivani rezultat

- Tabela se učitava bez grešaka
- Postojeći upiti imaju default status "Nov" i prioritet "Srednji"
- Možete mijenjati statuse i prioritete
- Modal se otvara bez problema

## 🚨 Ako se greška nastavi

1. **Provjerite da li su SQL skripte uspješno pokrenute**
2. **Provjerite Supabase logs** za greške
3. **Očistite browser cache**
4. **Restartujte development server**

## 📞 Dodatna pomoć

Ako se problem nastavi, provjerite:
- Da li su svi SQL upiti uspješno izvršeni
- Da li postoje constraint greške u Supabase
- Da li su RLS policies ispravno postavljeni 