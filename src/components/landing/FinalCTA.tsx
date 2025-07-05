import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-r from-orange-600 to-red-600 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
          Zatražite ponudu ili nas kontaktirajte već danas!
        </h2>
        
        <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
          Spremni smo da vam pomognemo u odabiru najboljih proizvoda za vaše potrebe. 
          Kontaktirajte nas i dobit ćete profesionalnu konsultaciju i konkurentnu ponudu.
        </p>
        
        <div className="flex gap-4 justify-center flex-col sm:flex-row">
          <Link 
            href="/kontakt"
            className="bg-white text-orange-600 font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 inline-block"
          >
            Kontaktirajte nas
          </Link>
          
          <Link 
            href="/proizvodi"
            className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-orange-600 transition duration-300 inline-block"
          >
            Pogledajte proizvode
          </Link>
        </div>
        
        <div className="mt-8 text-white/80 text-sm">
          <p>Brzi odgovor • Besplatna konsultacija • Profesionalna usluga</p>
        </div>
      </div>
    </section>
  );
} 