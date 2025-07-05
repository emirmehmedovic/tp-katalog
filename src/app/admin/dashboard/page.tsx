import { createClient } from '@supabase/supabase-js'
import InquiriesTable from '@/components/admin/InquiriesTable'
import ProductsTable from '@/components/admin/ProductsTable'
import ContactInquiriesTable from '@/components/admin/ContactInquiriesTable'
import { Inquiry } from '@/lib/types'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default async function AdminDashboard() {
  // Use service role key for admin access
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Fetch inquiries with product information
  const { data: inquiries, error: inquiriesError } = await supabase
    .from('inquiries')
    .select(`
      *,
      product:products(*)
    `)
    .order('created_at', { ascending: false })

  // Fetch products with category information
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .order('name')

  // Fetch categories
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (inquiriesError) {
    console.error('Error fetching inquiries:', inquiriesError)
  }

  if (productsError) {
    console.error('Error fetching products:', productsError)
  }

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Upravljajte upitima za ponude, kontakt upitima i proizvodima
        </p>
      </div>

      <Tabs defaultValue="inquiries" className="bg-white rounded-lg shadow p-4">
        <TabsList className="mb-4">
          <TabsTrigger value="inquiries">Upiti za ponude</TabsTrigger>
          <TabsTrigger value="contact">Kontakt upiti</TabsTrigger>
          <TabsTrigger value="products">Proizvodi</TabsTrigger>
        </TabsList>
        <TabsContent value="inquiries">
          <InquiriesTable inquiries={inquiries || []} />
        </TabsContent>
        <TabsContent value="contact">
          <ContactInquiriesTable />
        </TabsContent>
        <TabsContent value="products">
          <ProductsTable products={products || []} categories={categories || []} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 