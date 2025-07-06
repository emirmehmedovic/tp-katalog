'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/types'
import { Quote, Eye, Package, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import QuoteRequestModal from './QuoteRequestModal'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <>
      <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        {/* Product Image - Optimized for 768×768 images */}
        <div className="relative h-80 bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
          {!imageError ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              priority={false}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-orange-100 to-red-100">
              <div className="text-center">
                <Package className="h-16 w-16 text-orange-400 mx-auto mb-2" />
                <p className="text-sm text-orange-600 font-medium">Slika nije dostupna</p>
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          {product.category && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
                {product.category.name}
              </span>
            </div>
          )}
          
          {/* Hover Overlay - Enhanced for better UX */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-2">
                <Button 
                  size="sm"
                  variant="secondary"
                  className="flex-1 bg-white/95 hover:bg-white text-gray-900 font-medium shadow-lg"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Quote className="h-4 w-4 mr-2" />
                  Zatraži ponudu
                </Button>
              </div>
            </div>
          </div>


        </div>

        {/* Product Info */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-orange-500 flex-shrink-0" />
              <p className="text-sm font-mono text-orange-600 bg-orange-50 px-3 py-1.5 rounded-md border border-orange-200">
                {product.product_code}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Link href={`/proizvodi/${product.slug}`} className="flex-1">
              <Button 
                variant="outline" 
                className="w-full group/btn border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
              >
                <Eye className="h-4 w-4 mr-2" />
                Detalji
                <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
            >
              <Quote className="h-4 w-4 mr-2" />
              Zatraži ponudu
            </Button>
          </div>
        </div>
      </div>

      <QuoteRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  )
} 