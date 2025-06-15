
"use client";

// Removed Image import as it's no longer used
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const videoId = 'QN6f3gUznaA'; // New Video ID
  // Construct the YouTube embed URL with parameters for autoplay, mute, loop, and minimal UI
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden p-4"
    >
      <div className="absolute inset-0 z-0">
        <iframe
          src={videoSrc}
          title="YouTube video player background"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={false} // It's a background, so no need for fullscreen button
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" // pointer-events-none to allow clicks through
        ></iframe>
        <div className="absolute inset-0 bg-black/60 z-10"></div> {/* Dark overlay on top of the video */}
      </div>
      
      <div className="relative z-20 flex flex-col items-center justify-center flex-grow mt-20 sm:mt-0">
        <p className="text-sm md:text-base font-body uppercase tracking-widest text-primary mb-3 md:mb-4 animate-fade-in-down-slow">
          Tatto Corfu Studio
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold mb-6 md:mb-8 leading-tight animate-fade-in-down">
          Artistry in Ink
          <br />
          <span className="text-primary">Masterfully Crafted</span>
        </h1>
        <p className="text-base md:text-lg max-w-xl lg:max-w-2xl mb-8 md:mb-10 animate-fade-in-up">
          We are a collective of passionate artists dedicated to transforming your vision into timeless pieces of art. Explore a world where creativity knows no bounds.
        </p>
        <Link href="#gallery" passHref>
          <Button
            size="lg"
            variant="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm md:text-base uppercase tracking-wider font-semibold px-10 py-6 rounded-none shadow-lg transform hover:scale-105 transition-transform duration-300 animate-bounce-subtle"
          >
            Explore Our Work
          </Button>
        </Link>
      </div>

      <Link href="#about" passHref>
        <div className="relative z-20 flex flex-col items-center hover:text-primary transition-colors cursor-pointer animate-fade-in-up-late pb-8">
          <span className="text-xs uppercase tracking-wider mb-2 font-body">Scroll</span>
          <ArrowDown size={20} className="animate-bounce-vertical"/>
        </div>
      </Link>
      
      <style jsx>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-down-slow {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
         @keyframes fade-in-up-late {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.03); }
        }
        @keyframes bounce-vertical {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-8px);}
          60% {transform: translateY(-4px);}
        }

        .animate-fade-in-down { animation: fade-in-down 1s ease-out 0.5s forwards; opacity:0; }
        .animate-fade-in-down-slow { animation: fade-in-down-slow 0.8s ease-out 0.2s forwards; opacity:0; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out 0.8s forwards; opacity:0; }
        .animate-fade-in-up-late { animation: fade-in-up-late 1s ease-out 1.5s forwards; opacity:0; }
        .animate-bounce-subtle { animation: bounce-subtle 2.5s ease-in-out infinite 1.2s; }
        .animate-bounce-vertical { animation: bounce-vertical 1.5s infinite 2s; }
      `}</style>
    </section>
  );
}
