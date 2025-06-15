
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YWJzdHJhY3QlMjB0YXR0b28lMjBkYXJrfGVufDB8fHx8MTc0OTUwNjE5N3ww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Abstract tattoo art', hint: 'abstract tattoo dark' },
  { src: 'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxwb3J0cmFpdCUyMHRhdHRvbyUyMHJlYWxpc3RpY3xlbnwwfHx8fDE3NDk1MDYxOTh8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Realistic portrait tattoo', hint: 'portrait tattoo realistic' },
  { src: 'https://images.unsplash.com/photo-1542727365-19732a80dcfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnZW9tZXRyaWMlMjB0YXR0b28lMjBzbGVldmV8ZW58MHx8fHwxNzQ5NTA2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Geometric sleeve tattoo', hint: 'geometric tattoo sleeve' },
  { src: 'https://images.unsplash.com/photo-1458941055256-4c1ba58abbc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxmaW5lJTIwbGluZSUyMGZsb3JhbHxlbnwwfHx8fDE3NDk1MDYxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Fine line floral tattoo', hint: 'fine line floral' },
  { src: 'https://images.unsplash.com/photo-1497206365907-f5e630693df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjb2xvciUyMHJlYWxpc20lMjBhbmltYWx8ZW58MHx8fHwxNzQ5NTA2MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Color realism tattoo', hint: 'color realism animal' },
  { src: 'https://images.unsplash.com/photo-1518343265568-51eec52d40da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxibGFja3dvcmslMjBpbGx1c3RyYXRpdmUlMjBkYXJrfGVufDB8fHx8MTc0OTUwNjE5N3ww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Blackwork illustrative tattoo', hint: 'blackwork illustrative dark' },
  { src: 'https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtaW5pbWFsaXN0JTIwc2NyaXB0fGVufDB8fHx8MTc0OTUwNjE5OHww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Minimalist script tattoo', hint: 'minimalist script' },
  { src: 'https://images.unsplash.com/photo-1603162610423-af7febeca563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxqYXBhbmVzZSUyMHRhdHRvbyUyMGRyYWdvbnxlbnwwfHx8fDE3NDk1MDYxOTh8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Japanese style tattoo', hint: 'japanese tattoo dragon' },
  {
    src: 'https://images.unsplash.com/photo-1667809615247-582f1f418d8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx3b2xmJTIwdGF0dG9vfGVufDB8fHx8MTc0OTUwNjE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Detailed black and grey wolf tattoo',
    hint: 'wolf tattoo'
  },
];

export default function GallerySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Small delay to allow fade-out animation before resetting index
    setTimeout(() => setCurrentImageIndex(null), 300);
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing modal if clicking on nav button that might be on overlay
    if (currentImageIndex !== null) {
      setCurrentImageIndex((prevIndex) => (prevIndex! + 1) % galleryImages.length);
    }
  };

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex !== null) {
      setCurrentImageIndex((prevIndex) => (prevIndex! - 1 + galleryImages.length) % galleryImages.length);
    }
  };
  
  // Keyboard navigation for modal
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen || currentImageIndex === null) return;
      if (event.key === 'ArrowRight') {
        setCurrentImageIndex((prevIndex) => (prevIndex! + 1) % galleryImages.length);
      } else if (event.key === 'ArrowLeft') {
        setCurrentImageIndex((prevIndex) => (prevIndex! - 1 + galleryImages.length) % galleryImages.length);
      } else if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, currentImageIndex, galleryImages.length]);


  return (
    <section id="gallery" className="bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
            <p className="text-sm font-body uppercase tracking-wider text-primary mb-2">Our Portfolio</p>
            <h2 className="text-4xl lg:text-5xl font-headline font-bold text-primary">Ink Masterpieces</h2>
        </div>
        
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="break-inside-avoid" onClick={() => openModal(index)}>
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group border-border/30 rounded-lg cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={index % 3 === 0 ? 800 : 600} 
                      height={index % 2 === 0 ? (index % 3 === 0 ? 1000 : 800) : 600} 
                      className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      data-ai-hint={image.hint}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 lg:mt-16">
            <Link href="#contact" passHref>
                <Button variant="default" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase text-sm px-10 py-3 tracking-wider rounded-none">
                    Start Your Tattoo Journey
                </Button>
            </Link>
        </div>
      </div>

      {currentImageIndex !== null && (
        <Dialog open={isModalOpen} onOpenChange={(open) => { if (!open) closeModal(); else setIsModalOpen(true);}}>
          <DialogContent 
            className="max-w-5xl w-[95vw] h-[90vh] p-0 bg-card border-none shadow-2xl rounded-lg flex items-center justify-center overflow-hidden"
            onInteractOutside={(e) => e.preventDefault()} // Prevents closing when clicking nav buttons if they are slightly outside
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
                priority // Prioritize loading of the modal image
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-50 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 h-10 w-10 sm:h-12 sm:w-12"
              onClick={showPrevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-50 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 h-10 w-10 sm:h-12 sm:w-12"
              onClick={showNextImage}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 bg-black/30 hover:bg-black/60 text-white rounded-full p-1 h-8 w-8 sm:h-10 sm:w-10"
              onClick={closeModal}
              aria-label="Close gallery"
            >
              <X size={20} />
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
