'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ArtistsSection from '@/components/sections/ArtistsSection';
import FaqSection from '@/components/sections/FaqSection';
import ContactSection from '@/components/sections/ContactSection';
import ScrollToTopButton from '@/components/ui/scroll-to-top-button';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import sections that might be heavy or client-side intensive
const GallerySection = dynamic(() => import('@/components/sections/GallerySection'), {
  ssr: false,
  loading: () => (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-12 w-1/2 mx-auto mb-8" />
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  )
});

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-grow"> {/* Changed main to div to avoid nested main tags if Header/Footer contain it implicitly */}
        <HeroSection />
        <div className="space-y-16 lg:space-y-24 py-16 lg:py-24">
          <AboutSection />
          <ServicesSection />
          <ArtistsSection />
          <GallerySection />
          <FaqSection />
          <ContactSection />
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
