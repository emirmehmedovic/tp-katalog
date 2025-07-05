import { Calendar, Truck, Handshake, Award } from 'lucide-react';

const trustItems = [
  {
    icon: Calendar,
    title: "20+ godina iskustva",
    description: "Dugogodišnja tradicija i pouzdanost u poslovanju"
  },
  {
    icon: Truck,
    title: "Brza isporuka",
    description: "Isporuka na teritoriji cijele BiH u najkraćem roku"
  },
  {
    icon: Handshake,
    title: "Provjereni partneri",
    description: "Surađujemo sa najboljim proizvođačima autokozmetike"
  },
  {
    icon: Award,
    title: "Garancija kvaliteta",
    description: "Svi proizvodi su originalni sa punom garancijom"
  }
];

export default function TrustBar() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {trustItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <item.icon className="text-orange-600 text-4xl mb-4" />
              <h3 className="text-gray-900 font-bold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 