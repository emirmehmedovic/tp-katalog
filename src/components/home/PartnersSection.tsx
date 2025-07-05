'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Handshake, 
  Award, 
  Star, 
  CheckCircle,
  TrendingUp,
  Globe
} from 'lucide-react'

interface Partner {
  name: string
  logo: string
  description: string
  type: 'manufacturer' | 'distributor' | 'certification'
}

const partners: Partner[] = [
  {
    name: 'SONAX',
    logo: '/images/partnership.jpg',
    description: 'Vodeći proizvođač profesionalnih proizvoda za auto detailing',
    type: 'manufacturer'
  },
  {
    name: 'TRACLAB',
    logo: '/images/traclab.jpg',
    description: 'Specijalizovani proizvođač deterdženata za teška vozila',
    type: 'manufacturer'
  },
  {
    name: 'ISO 9001',
    logo: '/images/partnership.jpg',
    description: 'Sertifikat kvaliteta sistema upravljanja',
    type: 'certification'
  }
]

const trustIndicators = [
  {
    icon: Award,
    title: 'Certifikovani Proizvodi',
    description: 'Svi proizvodi su sertifikovani prema EU standardima'
  },
  {
    icon: Star,
    title: 'Premium Kvalitet',
    description: 'Koristimo samo najkvalitetnije sirovine i komponente'
  },
  {
    icon: CheckCircle,
    title: 'Garancija Kvaliteta',
    description: 'Pružamo garanciju na sve naše proizvode'
  },
  {
    icon: Globe,
    title: 'Globalna Dostupnost',
    description: 'Isporuka u sve zemlje regiona i EU'
  }
]

export default function PartnersSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('partners-section')
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
    <section id="partners-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-50 to-red-50 rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-50 to-amber-50 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Handshake className="h-4 w-4" />
            <span>Naši Partneri i Sertifikati</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Gradimo <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
              Poverenje
            </span> Kroz Partnerstva
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Saradujemo sa vodećim proizvođačima i posedujemo sve potrebne sertifikate 
            koji garantuju kvalitet naših proizvoda i usluga.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-6 bg-white rounded-xl shadow-md overflow-hidden">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="80px"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {partner.name}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {partner.description}
                </p>
                
                <div className="mt-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    partner.type === 'manufacturer' 
                      ? 'bg-blue-100 text-blue-800' 
                      : partner.type === 'distributor'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {partner.type === 'manufacturer' && 'Proizvođač'}
                    {partner.type === 'distributor' && 'Distributer'}
                    {partner.type === 'certification' && 'Sertifikat'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-orange-50 via-red-50 to-amber-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Zašto Nam Verujete?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Naš uspeh se zasniva na kvalitetu, pouzdanosti i dugogodišnjem iskustvu 
              u industriji održavanja automobila.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon
              
              return (
                <div
                  key={index}
                  className={`text-center group ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{
                    animationDelay: `${(index + 3) * 200}ms`
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-orange-600" />
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {indicator.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {indicator.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              <span>Vaš Pouzdani Partner</span>
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
} 