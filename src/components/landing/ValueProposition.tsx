import Image from 'next/image';

const values = [
  {
    title: "Pouzdanost",
    description: "Više od 20 godina iskustva u veleprodaji autokozmetike i opreme. Naši klijenti nam vjeruju jer uvijek ispunjavamo svoje obećanja."
  },
  {
    title: "Stručnost",
    description: "Naš tim se sastoji od stručnjaka koji poznaju svaki proizvod i mogu vam dati najbolje savjete za vaše specifične potrebe."
  },
  {
    title: "Fokus na klijenta",
    description: "Vaš uspjeh je naš uspjeh. Radimo individualno sa svakim klijentom kako bismo osigurali da dobijete tačno ono što vam treba."
  },
  {
    title: "Širok asortiman",
    description: "Od osnovnih sredstava za čišćenje do profesionalne opreme - imamo sve što vam treba na jednom mjestu."
  }
];

export default function ValueProposition() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto gap-12">
          {/* Lijeva strana - Slika */}
          <div className="w-full md:w-1/2">
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/partnership.jpg"
                alt="Profesionalno partnerstvo - TP Omerbašić"
                fill
                className="object-cover"
                priority
              />
              {/* Fallback ako slika ne postoji */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">🤝</div>
                  <h3 className="text-xl font-bold">Profesionalno Partnerstvo</h3>
                  <p className="text-sm mt-2">Vaš pouzdani partner u poslovanju</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Desna strana - Tekst */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Zašto Odabrati TP Omerbašić?
            </h2>
            
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-2">
                  Naša misija
                </h4>
                <p className="text-gray-700">
                  Pružiti najkvalitetnije proizvode i usluge našim klijentima, 
                  pomažući im da rastu i razvijaju svoj posao kroz pouzdano partnerstvo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 