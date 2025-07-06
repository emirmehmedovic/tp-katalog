'use client'

import { useState, useEffect } from 'react'
import { 
  Package, 
  Users, 
  Award, 
  Clock,
  TrendingUp,
  Star,
  Shield,
  Zap
} from 'lucide-react'

interface StatItem {
  icon: any
  value: number
  label: string
  suffix?: string
  color: string
}

const stats: StatItem[] = [
  {
    icon: Package,
    value: 50,
    label: 'Proizvoda',
    suffix: '+',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Users,
    value: 100,
    label: 'Zadovoljnih klijenata',
    suffix: '+',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: Award,
    value: 10,
    label: 'Godina iskustva',
    suffix: '+',
    color: 'from-pink-500 to-purple-500'
  },
  {
    icon: Clock,
    value: 24,
    label: 'Sata podrške',
    suffix: '/7',
    color: 'from-purple-500 to-indigo-500'
  }
]

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="text-4xl font-bold">
      {count}{suffix}
    </span>
  )
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('stats-section')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section id="stats-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-500/20 to-amber-500/20 rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => ({
            left: `${(i * 7) % 100}%`,
            top: `${(i * 11) % 100}%`,
            delay: `${(i * 0.3) % 2}s`,
            duration: `${2 + (i * 0.2) % 2}s`
          })).map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
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
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>Naš Uspeh u Brojkama</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Dokazani <span className="bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
              Rezultati
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Godinama gradimo poverenje i pružamo kvalitetne usluge našim poslovnim partnerima. 
            Evo šta nas čini posebnim.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            
            return (
              <div
                key={index}
                className={`group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <div className="text-white mb-2">
                  {isVisible ? (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  ) : (
                    <span className="text-4xl font-bold">0{stat.suffix}</span>
                  )}
                </div>
                
                <p className="text-gray-300 font-medium">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Premium Kvalitet</h3>
            <p className="text-gray-300">
              Svi proizvodi su testirani i sertifikovani prema najvišim standardima industrije.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Pouzdanost</h3>
            <p className="text-gray-300">
              Dugogodišnje partnerstvo sa vodećim proizvođačima u industriji.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Brza Isporuka</h3>
            <p className="text-gray-300">
              Efikasan logistički sistem koji osigurava brzu i sigurnu isporuku.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 