import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductShowcase from '@/components/home/ProductShowcase'
import StatsSection from '@/components/home/StatsSection'
import PartnersSection from '@/components/home/PartnersSection'
import { 
  Car, 
  Shield, 
  Sparkles, 
  Users, 
  Package, 
  ArrowRight, 
  Star, 
  CheckCircle,
  TrendingUp,
  Award,
  Zap,
  Globe
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-amber-50"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-200 to-amber-200 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-100 to-red-100 rounded-full opacity-10"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>B2B Profesionalni Partner</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Profesionalni proizvodi za{' '}
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
                održavanje automobila
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Vaš pouzdani B2B partner za kvalitetne proizvode za poliranje, 
              čišćenje i zaštitu automobila. <span className="font-semibold text-orange-600">Zatražite ponudu danas.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/proizvodi">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Package className="h-5 w-5 mr-2" />
                  Pogledajte proizvode
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-orange-300 text-orange-600 hover:bg-orange-50">
                  <Shield className="h-5 w-5 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8">
              <div className="text-center group">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">50+</div>
                <div className="text-sm text-gray-600 font-medium">Proizvoda</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">10+</div>
                <div className="text-sm text-gray-600 font-medium">Godina iskustva</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="text-sm text-gray-600 font-medium">Kvalitet</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-sm text-gray-600 font-medium">Podrška</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <ProductShowcase />

      {/* Stats Section */}
      <StatsSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Zašto odabrati CarCare Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pružamo najbolje proizvode i usluge za vaš posao
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Kvalitetni proizvodi
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Profesionalni proizvodi testirani u realnim uslovima. 
                Kvalitet koji možete da osetite na svakom koraku.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Pouzdanost
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Dugogodišnje iskustvo i pouzdani partneri. 
                Vaš uspeh je naš prioritet.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                B2B fokus
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Specijalizovani za poslovne klijente i velike količine. 
                Fleksibilne ponude za vaše potrebe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 relative overflow-hidden">
        {/* Enhanced Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
            <Globe className="h-4 w-4" />
            <span>Spreman za saradnju</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Započnite Saradnju <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">Danas</span>
          </h2>
          <p className="text-xl lg:text-2xl mb-10 opacity-90 leading-relaxed max-w-3xl mx-auto">
            Kontaktirajte nas za besplatnu konsultaciju i personalizovanu ponudu. 
            Vaš uspeh je naš prioritet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link href="/proizvodi">
              <Button size="lg" variant="secondary" className="text-lg px-10 py-6 bg-white text-orange-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <Package className="h-6 w-6 mr-3" />
                Zatražite ponudu
                <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1">
                <Shield className="h-6 w-6 mr-3" />
                Kontaktirajte nas
              </Button>
            </Link>
          </div>

          {/* Enhanced Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-8 w-8 text-green-300" />
              </div>
              <div className="text-lg font-semibold opacity-90 mb-2">Besplatna konsultacija</div>
              <div className="text-sm opacity-70">Stručni savet i preporuke</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-8 w-8 text-green-300" />
              </div>
              <div className="text-lg font-semibold opacity-90 mb-2">Brza isporuka</div>
              <div className="text-sm opacity-70">U roku od 24-48h</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-8 w-8 text-green-300" />
              </div>
              <div className="text-lg font-semibold opacity-90 mb-2">Tehnička podrška</div>
              <div className="text-sm opacity-70">24/7 dostupnost</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 