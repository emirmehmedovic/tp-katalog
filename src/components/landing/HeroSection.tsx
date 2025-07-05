'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Sparkles, Shield, Users, Award, Zap } from 'lucide-react'

// Deterministic random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateParticles(count: number) {
  const particles = []
  for (let i = 0; i < count; i++) {
    const seed = i * 1.618033988749895 // Golden ratio for better distribution
    particles.push({
      id: i,
      left: seededRandom(seed) * 100,
      top: seededRandom(seed + 1) * 100,
      animationDelay: seededRandom(seed + 2) * 3,
      animationDuration: 3 + seededRandom(seed + 3) * 2
    })
  }
  return particles
}

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<Array<{
    id: number
    left: number
    top: number
    animationDelay: number
    animationDuration: number
  }>>([])

  useEffect(() => {
    setIsVisible(true)
    setParticles(generateParticles(50))
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div 
          className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-3xl"
          onMouseMove={handleMouseMove}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 rounded-3xl"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-3xl">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-200 to-amber-200 rounded-full opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-100 to-red-100 rounded-full opacity-10"></div>
            
            {/* Floating Particles */}
            <div className="absolute inset-0">
              {particles.map((particle) => (
                <div
                  key={particle.id}
                  className="absolute w-1 h-1 bg-orange-400/30 rounded-full animate-float"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    animationDelay: `${particle.animationDelay}s`,
                    animationDuration: `${particle.animationDuration}s`
                  }}
                />
              ))}
            </div>

            {/* Subtle Mouse Tracking Light */}
            <div 
              className="absolute w-96 h-96 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
              style={{
                left: mousePosition.x - 192,
                top: mousePosition.y - 192,
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative text-center">
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>B2B Profesionalni Partner</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Profesionalni proizvodi za{' '}
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
                  održavanje automobila
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Vaš pouzdani B2B partner za kvalitetne proizvode za poliranje, 
                čišćenje i zaštitu automobila. <span className="font-semibold text-orange-600">Zatražite ponudu danas.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/proizvodi">
                  <button className="group relative bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center space-x-2">
                      <span>Pogledajte naš asortiman</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </button>
                </Link>

                <Link href="/kontakt">
                  <button className="group relative bg-white/80 backdrop-blur-md border-2 border-orange-300 text-orange-600 font-bold px-8 py-4 rounded-2xl hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-orange-50 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center space-x-2">
                      <span>Kontaktirajte nas</span>
                      <Shield className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8">
                <div className="text-center group">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">20+</div>
                  <div className="text-sm text-gray-600 font-medium">Godina iskustva</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">100%</div>
                  <div className="text-sm text-gray-600 font-medium">Kvalitet</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-sm text-gray-600 font-medium">Podrška</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">50+</div>
                  <div className="text-sm text-gray-600 font-medium">Proizvoda</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 