'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  Package, 
  ArrowRight, 
  Sparkles, 
  Zap,
  Shield,
  Wrench,
  Droplets,
  Palette,
  Search,
  Car
} from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  image_url: string
  slug: string
}

interface Category {
  id: string
  name: string
  slug: string
  products: Product[]
}

// Seeded random function for consistent particle positions
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Generate deterministic particle positions
const generateParticlePositions = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    left: `${seededRandom(i * 3) * 100}%`,
    top: `${seededRandom(i * 3 + 1) * 100}%`,
    delay: `${seededRandom(i * 3 + 2) * 3}s`,
    duration: `${3 + seededRandom(i * 3 + 3) * 2}s`
  }))
}

// Icons for different categories
const categoryIcons: { [key: string]: any } = {
  'pranje-vozila': Car,
  'ciscenje-eksterijera': Droplets,
  'ciscenje-enterijera': Palette,
  'vulkanizerska-oprema': Wrench,
  'vulkanizerski-materijal': Package,
  'default': Package
}

export default function ProductShowcase() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('product-showcase')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        if (data.categories) {
          setCategories(data.categories)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Filter categories based on search
  const filteredCategories = categories.filter(category => {
    if (selectedCategory && category.slug !== selectedCategory) return false
    if (searchTerm) {
      return category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             category.products.some(product => 
               product.name.toLowerCase().includes(searchTerm.toLowerCase())
             )
    }
    return true
  })

  // 3D Card Component
  const CategoryCard = ({ category, index }: { category: Category; index: number }) => {
    const IconComponent = categoryIcons[category.slug] || categoryIcons.default
    const [isHovered, setIsHovered] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10
      
      setMousePosition({ x: rotateX, y: rotateY })
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      setMousePosition({ x: 0, y: 0 })
    }

    return (
      <div
        ref={cardRef}
        className={`group relative perspective-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{
          animationDelay: `${index * 150}ms`
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`relative w-full h-full transform-gpu transition-all duration-700 ease-out ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          style={{
            transform: isHovered 
              ? `rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) translateZ(20px)`
              : 'rotateX(0deg) rotateY(0deg) translateZ(0px)'
          }}
        >
          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 border border-gray-100 overflow-hidden group-hover:border-orange-200">
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-700 group-hover:scale-150"></div>
              <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-br from-red-200 to-amber-200 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-700 group-hover:scale-150" style={{ transitionDelay: '100ms' }}></div>
            </div>

            {/* Header */}
            <div className="relative p-8 border-b border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      <IconComponent className="h-8 w-8 text-orange-600" />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {category.products.length} proizvoda
                    </p>
                  </div>
                </div>
                
                {/* Floating badge */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-500">
                    {category.products.length}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

            {/* Products Preview */}
            <div className="p-8 space-y-4">
              {category.products.slice(0, 3).map((product, productIndex) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 group/product"
                >
                  <div className="relative w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover/product:shadow-lg transition-shadow duration-300">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover/product:scale-110 transition-transform duration-500"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                    {/* Image glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 opacity-0 group-hover/product:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate group-hover/product:text-orange-600 transition-colors duration-300">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-500 truncate">
                      {product.description}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover/product:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="h-4 w-4 text-orange-500" />
                  </div>
                </div>
              ))}
              
              {/* Show more indicator */}
              {category.products.length > 3 && (
                <div className="text-center pt-4">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full text-sm font-medium text-orange-700">
                    <Sparkles className="h-4 w-4" />
                    <span>+{category.products.length - 3} više proizvoda</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 bg-gradient-to-r from-orange-50 to-red-50 border-t border-gray-100">
              <Link href={`/proizvodi?category=${category.slug}`}>
                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-white group-hover:text-orange-600 group-hover:shadow-lg transition-all duration-500 text-lg py-6"
                >
                  <span>Pogledaj sve proizvode</span>
                  <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Shadow */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-64 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-3xl h-96 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="product-showcase" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-100 to-red-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-100 to-amber-100 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {generateParticlePositions(30).map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-20 animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
            <Sparkles className="h-5 w-5" />
            <span>3D Asortiman Proizvoda</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Otkrijte Naš <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
              Inovativni Asortiman
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Kategorije
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pretražite kategorije i proizvode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 perspective-1000">
          {filteredCategories.map((category) => {
            const IconComponent = categoryIcons[category.slug] || categoryIcons.default
            return (
              <div 
                key={category.id} 
                className="group relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden hover:shadow-3xl hover:scale-105 transition-all duration-300 transform-gpu"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-700 group-hover:scale-150"></div>
                  <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-br from-red-200 to-amber-200 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-700 group-hover:scale-150" style={{ transitionDelay: '100ms' }}></div>
                </div>

                {/* Header */}
                <div className="relative p-8 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                          <IconComponent className="h-8 w-8 text-orange-600" />
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                          {category.products.length} proizvoda
                        </p>
                      </div>
                    </div>
                    
                    {/* Floating badge */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-500">
                        {category.products.length}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>

                {/* Products Preview */}
                <div className="p-8 space-y-4">
                  {category.products.slice(0, 3).map((product, productIndex) => (
                    <Link
                      key={product.id}
                      href={`/proizvodi/${product.slug}`}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 group/product cursor-pointer w-full"
                    >
                      <div className="relative w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover/product:shadow-lg transition-shadow duration-300">
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover group-hover/product:scale-110 transition-transform duration-500"
                            sizes="64px"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        {/* Image glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 opacity-0 group-hover/product:opacity-20 transition-opacity duration-300"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate group-hover/product:text-orange-600 transition-colors duration-300">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {product.description}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 flex-shrink-0">
                        <ArrowRight className="h-4 w-4 text-orange-500" />
                      </div>
                    </Link>
                  ))}
                  
                  {/* Show more indicator */}
                  {category.products.length > 3 && (
                    <div className="text-center pt-4">
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full text-sm font-medium text-orange-700">
                        <Sparkles className="h-4 w-4" />
                        <span>+{category.products.length - 3} više proizvoda</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-8 bg-gradient-to-r from-orange-50 to-red-50 border-t border-gray-100">
                  <Link 
                    href={`/proizvodi?category=${category.slug}`}
                    className="flex items-center justify-center w-full group-hover:bg-white group-hover:text-orange-600 group-hover:shadow-lg transition-all duration-500 text-lg py-6 px-4 rounded-lg hover:bg-white hover:text-orange-600 hover:shadow-lg font-medium"
                  >
                    <span>Pogledaj sve proizvode</span>
                    <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Shadow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
              </div>
            )
          })}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            </div>
            
            <div className="relative">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/20">
                <Zap className="h-5 w-5" />
                <span>Interaktivno Iskustvo</span>
              </div>
              
              <h3 className="text-4xl font-bold mb-4">
                Zatražite Ponudu Danas
              </h3>
              
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Kontaktirajte nas za besplatnu konsultaciju i personalizovanu ponudu 
                prilagođenu vašim potrebama.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  href="/proizvodi"
                  className="inline-flex items-center justify-center text-lg px-10 py-6 bg-white text-orange-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl font-semibold w-full sm:w-auto"
                >
                  <Package className="h-6 w-6 mr-3" />
                  Pogledajte sve proizvode
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Link>
                <Link 
                  href="/kontakt"
                  className="inline-flex items-center justify-center text-lg px-10 py-6 border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 rounded-xl font-semibold w-full sm:w-auto"
                >
                  <Shield className="h-6 w-6 mr-3" />
                  Kontaktirajte nas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
} 