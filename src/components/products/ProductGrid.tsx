import ProductCard from './ProductCard'
import { Product } from '@/lib/types'
import { Package, Search } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nema proizvoda
          </h3>
          <p className="text-gray-600 mb-6">
            Nema proizvoda koji odgovaraju vašim kriterijumima. 
            Pokušajte da promenite filter ili pogledajte sve kategorije.
          </p>
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-gray-600">
                Ukupno: {products.length} proizvoda
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
} 