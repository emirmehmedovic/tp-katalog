import Link from 'next/link';
import Image from 'next/image';
import { createServerClient } from '@/lib/supabase';

export default async function CategoriesSection() {
  const supabase = createServerClient();
  
  // Fetch featured products (first 8 products)
  const { data: featuredProducts } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .order('created_at', { ascending: false })
    .limit(8);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Naš Asortiman
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Širok izbor kvalitetnih proizvoda za sve vaše potrebe u oblasti autokozmetike i opreme
          </p>
        </div>
        
        {featuredProducts && featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition duration-300">
                {product.image_url ? (
                  <div className="relative w-20 h-20 mb-4">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Nema slike</span>
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                
                {product.category && (
                  <p className="text-orange-600 text-sm mb-2">
                    {product.category.name}
                  </p>
                )}
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description || 'Opis proizvoda nije dostupan'}
                </p>
                
                <Link 
                  href={`/proizvodi/${product.slug}`}
                  className="text-orange-600 font-semibold hover:underline transition duration-300"
                >
                  Vidi detalje
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500">📦</span>
            </div>
            <p className="text-gray-600">Učitavanje proizvoda...</p>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            href="/proizvodi"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition duration-300"
          >
            Pogledajte sve proizvode
          </Link>
        </div>
      </div>
    </section>
  );
} 