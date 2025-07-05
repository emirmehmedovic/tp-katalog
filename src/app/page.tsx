import { Metadata } from 'next';
import HeroSection from '@/components/landing/HeroSection';
import TrustBar from '@/components/landing/TrustBar';
import ProductShowcase from '@/components/home/ProductShowcase';
import ValueProposition from '@/components/landing/ValueProposition';
import LandingFooter from '@/components/landing/LandingFooter';

export const metadata: Metadata = {
  title: 'TP Omerbašić - Iskustvo koje gradi povjerenje',
  description: 'Veleprodaja autokozmetike i opreme. Više od 20 godina iskustva u poslovanju. Kvalitetni proizvodi, brza isporuka, pouzdano partnerstvo.',
};

export default async function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProductShowcase />
      <TrustBar />
      <ValueProposition />
      <LandingFooter />
    </main>
  );
} 