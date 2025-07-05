const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  console.error('Dodaj SUPABASE_SERVICE_ROLE_KEY u .env.local fajl')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Admin korisnici - promeni ove podatke prema potrebi
const adminUsers = [
  {
    email: 'admin1@example.com',
    password: 'admin123456'
  },
  {
    email: 'admin2@example.com', 
    password: 'admin123456'
  }
]

async function createAdminUsers() {
  try {
    console.log('Kreiranje admin korisnika...')
    
    for (const user of adminUsers) {
      console.log(`Kreiram korisnika: ${user.email}`)
      
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true // Automatski potvrđuje email
      })

      if (error) {
        console.error(`Greška pri kreiranju korisnika ${user.email}:`, error.message)
      } else {
        console.log(`✓ Uspešno kreiran korisnik: ${user.email}`)
      }
    }

    console.log('\nAdmin korisnici su kreirani!')
    console.log('Možete se prijaviti sa sledećim podacima:')
    adminUsers.forEach(user => {
      console.log(`Email: ${user.email}, Lozinka: ${user.password}`)
    })
    
  } catch (error) {
    console.error('Greška:', error)
  }
}

createAdminUsers() 