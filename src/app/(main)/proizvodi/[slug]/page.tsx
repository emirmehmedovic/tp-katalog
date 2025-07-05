import { createServerClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/types'
import QuoteRequestButton from '@/components/products/QuoteRequestButton'
import { Package, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const supabase = createServerClient()
  const { slug } = await params

  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('slug', slug)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/proizvodi">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Nazad na proizvode</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image - Optimized for 768×768 */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-xl overflow-hidden group">
              <Image
                src={product.image_url}
                alt={product.name}
                width={768}
                height={768}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={90}
              />
            </div>
            
            {/* Image Info */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Package className="h-4 w-4" />
                <span>Slika: 768×768 piksela</span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>
                
                {/* Category Badge */}
                {product.category && (
                  <div className="inline-block mb-4">
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                      {product.category.name}
                    </span>
                  </div>
                )}
                
                {/* Product Code */}
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-orange-500" />
                  <p className="text-lg font-mono text-orange-600 bg-orange-50 px-4 py-2 rounded-lg border border-orange-200">
                    {product.product_code}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Opis proizvoda
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* CTA Section */}
              <div className="pt-6 border-t border-gray-200">
                <QuoteRequestButton product={product} />
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informacije o proizvodu
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Kategorija:</span>
                  <span className="font-medium">{product.category?.name || 'Nepoznata'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Šifra proizvoda:</span>
                  <span className="font-mono font-medium">{product.product_code}</span>
                </div>
                <div className="flex justify-between">
                  <span>Slug:</span>
                  <span className="font-mono text-orange-600">{product.slug}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 