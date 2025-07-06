import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          

          
          {/* Kategorije proizvoda */}
          <div>
            <h3 className="text-white font-bold mb-4">Kategorije proizvoda</h3>
            <div className="space-y-2">
              <Link href="/proizvodi?kategorija=autokozmetika" className="text-gray-400 hover:text-white transition text-sm block">
                Autokozmetika
              </Link>
              <Link href="/proizvodi?kategorija=alati" className="text-gray-400 hover:text-white transition text-sm block">
                Alati i oprema
              </Link>
              <Link href="/proizvodi?kategorija=kemija" className="text-gray-400 hover:text-white transition text-sm block">
                Kemijska sredstva
              </Link>
              <Link href="/proizvodi?kategorija=aksesoari" className="text-gray-400 hover:text-white transition text-sm block">
                Aksesoari
              </Link>
            </div>
          </div>
          
          {/* Kontakt informacije */}
          <div>
            <h3 className="text-white font-bold mb-4">Kontakt informacije</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400 text-sm">
                <Phone className="w-4 h-4 mr-2" />
                <span>+387 33 123 456</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@tpomerbasic.ba</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Sarajevo, BiH</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>Pon-Pet: 8-16h</span>
              </div>
            </div>
          </div>
          

        </div>
        
        {/* Donja linija */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 TP Omerbašić. Sva prava zadržana. | 
            <span className="ml-1">Iskustvo koje gradi povjerenje.</span>
          </p>
        </div>
      </div>
    </footer>
  );
} 