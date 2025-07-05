import { createServerClient } from '@/lib/supabase'
import ProductGrid from '@/components/products/ProductGrid'
import CategoryFilter from '@/components/products/CategoryFilter'
import SearchBar from '@/components/products/SearchBar'
import SortOptions from '@/components/products/SortOptions'
import Breadcrumbs from '@/components/products/Breadcrumbs'
import { Package, Sparkles, Filter, Search } from 'lucide-react'

interface ProductsPageProps {
  searchParams: Promise<{ 
    category?: string
    search?: string
    sort?: string
  }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const supabase = createServerClient()
  const params = await searchParams

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  // Build products query
  let productsQuery = supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)

  // Apply category filter
  if (params.category) {
    const selectedCategory = categories?.find(cat => cat.slug === params.category)
    if (selectedCategory) {
      productsQuery = productsQuery.eq('category_id', selectedCategory.id)
    }
  }

  // Apply search filter
  if (params.search) {
    productsQuery = productsQuery.or(`name.ilike.%${params.search}%,description.ilike.%${params.search}%`)
  }

  // Apply sorting
  const sort = params.sort || 'name_asc'
  switch (sort) {
    case 'name_desc':
      productsQuery = productsQuery.order('name', { ascending: false })
      break
    case 'created_desc':
      productsQuery = productsQuery.order('created_at', { ascending: false })
      break
    case 'created_asc':
      productsQuery = productsQuery.order('created_at', { ascending: true })
      break
    default: // name_asc
      productsQuery = productsQuery.order('name', { ascending: true })
  }

  const { data: products } = await productsQuery

  // Get selected category name for breadcrumbs
  const selectedCategoryName = params.category 
    ? categories?.find(cat => cat.slug === params.category)?.name 
    : undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 opacity-90"></div>
          <div className="relative py-16 px-8">
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-4">
                <Package className="h-12 w-12 mr-3" />
                <Sparkles className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Naši Proizvodi
              </h1>
              <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                Pronađite kvalitetne proizvode za održavanje vašeg vozila. 
                Profesionalna rešenja za sve vaše potrebe.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs categoryName={selectedCategoryName} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-8 space-y-6">
              {/* Search Bar */}
              <div className="bg-white rounded-xl shadow-lg border border-orange-100 p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Search className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Pretraživanje</h3>
                </div>
                <SearchBar />
              </div>

              {/* Category Filter */}
              <CategoryFilter 
                categories={categories || []} 
                selectedCategory={params.category}
              />

              {/* Sort Options */}
              <SortOptions />
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Header with filters info */}
            <div className="bg-white rounded-xl shadow-lg border border-orange-100 p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategoryName || 'Svi proizvodi'}
                  </h2>
                  {(params.search || params.category) && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Filter className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-gray-600">
                        Filtrirano: {params.search && `"${params.search}"`} {params.search && params.category && '•'} {params.category && selectedCategoryName}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="hidden md:block text-sm text-gray-500 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
                    {products?.length || 0} proizvoda
                  </span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid products={products || []} />
          </div>
        </div>
      </div>
    </div>
  )
} 