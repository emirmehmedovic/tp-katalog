const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkCategories() {
  try {
    console.log('Fetching categories...')
    
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching categories:', error)
      return
    }

    console.log('Categories in database:')
    categories.forEach(cat => {
      console.log(`- ${cat.name} (slug: ${cat.slug}, id: ${cat.id})`)
    })

    console.log(`\nTotal categories: ${categories.length}`)
  } catch (error) {
    console.error('Error:', error)
  }
}

checkCategories() 