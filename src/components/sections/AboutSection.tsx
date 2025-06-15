import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section id="about" className="bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full rounded-lg overflow-hidden shadow-2xl group">
            <Image
              src="https://images.unsplash.com/photo-1605647533135-51b5906087d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Interior of Enos Tattoo studio"
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
              data-ai-hint="artistic tattoo studio"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
          <div className="lg:pl-8">
            <p className="text-sm font-body uppercase tracking-wider text-primary mb-2">Our Story</p>
            <h2 className="text-4xl lg:text-5xl font-headline font-bold mb-6 text-primary">
              About Enos Tattoo
            </h2>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed font-body">
              Founded with a passion for ink and artistry, Enos Tattoo is more than just a studio – it's a haven for self-expression. We believe every tattoo is a personal journey, and we're honored to be part of yours.
            </p>
            <p className="text-base text-foreground/70 mb-6 leading-relaxed font-body">
              Our collective of diverse artists brings a wealth of experience and unique styles, from intricate realism to bold traditional designs. We are committed to providing a clean, safe, and inspiring environment where your tattoo visions come to life with precision and creativity.
            </p>
            <Link href="#contact" passHref>
              <Button variant="default" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase text-sm px-8 py-3 tracking-wider rounded-none">
                Meet The Artists
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
