import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Fetch categories with sample products (2 per category)
    const { data: categories, error } = await supabase
      .from('categories')
      .select(`
        *,
        products:products(
          id,
          name,
          description,
          image_url,
          slug
        )
      `)
      .order('name')

    if (error) {
      console.error('Error fetching categories:', error)
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: 500 }
      )
    }

    // Limit products to 2 per category for showcase
    const categoriesWithLimitedProducts = categories?.map(category => ({
      ...category,
      products: category.products?.slice(0, 2) || []
    }))

    return NextResponse.json({ categories: categoriesWithLimitedProducts })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 