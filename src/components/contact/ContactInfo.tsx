import { Mail, Phone, MapPin, Clock, Building } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    value: '+387 33 123 456',
    description: 'Pozovite nas za brzu konsultaciju'
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@tpomerbasic.ba',
    description: 'Pošaljite nam email'
  },
  {
    icon: MapPin,
    title: 'Adresa',
    value: 'Sarajevo, Bosna i Hercegovina',
    description: 'Glavni ured i skladište'
  },
  {
    icon: Clock,
    title: 'Radno vrijeme',
    value: 'Pon-Pet: 8:00 - 16:00',
    description: 'Subota: 8:00 - 12:00'
  }
]

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="h-8 w-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Kontakt informacije
        </h2>
        <p className="text-gray-600">
          Tu smo da vam pomognemo. Kontaktirajte nas na bilo koji način.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactInfo.map((info, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:border-orange-200 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <info.icon className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {info.title}
              </h3>
              <p className="text-lg font-medium text-orange-600 mb-1">
                {info.value}
              </p>
              <p className="text-sm text-gray-600">
                {info.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">
          Dodatne informacije
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Besplatna konsultacija za sve klijente</p>
          <p>• Brza isporuka na teritoriji cijele BiH</p>
          <p>• Tehnička podrška za sve proizvode</p>
          <p>• Individualne ponude za velike količine</p>
        </div>
      </div>
    </div>
  )
} 