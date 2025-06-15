
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Paintbrush, ShieldCheck, Sparkles, Wand2 } from 'lucide-react'; 

const services = [
  {
    title: 'Custom Designs',
    description: 'Collaborate with our artists to create a unique tattoo that tells your story. Your vision, our expertise.',
    icon: Paintbrush,
    link: '#contact',
    imageSrc: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx0YXRvb3xlbnwwfHx8fDE3NDk1MDUzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageAlt: 'Custom tattoo sketch',
    imageHint: 'tattoo sketch design',
  },
  {
    title: 'Cover-Ups',
    description: 'Transform old or unwanted tattoos into new masterpieces. Our artists specialize in creative cover-up solutions.',
    icon: ShieldCheck,
    link: '#contact',
    imageSrc: 'https://images.unsplash.com/photo-1586243287039-23f4c8e2e7ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMXx8dGF0dG9vfGVufDB8fHx8MTc0OTUwNTQ1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageAlt: 'Tattoo cover-up before and after',
    imageHint: 'tattoo coverup art',
  },
  {
    title: 'Fine Line & Micro',
    description: 'Delicate and detailed fine line or micro tattoos, crafted with precision for a subtle yet impactful statement.',
    icon: Wand2, // Changed from Sparkles to Wand2
    link: '#contact',
    imageSrc: 'https://images.unsplash.com/photo-1562379825-415aea84ebcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8dGF0dG9vfGVufDB8fHx8MTc0OTUwNTQ1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageAlt: 'Fine line tattoo example',
    imageHint: 'fine line tattoo',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-muted text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
            <p className="text-sm font-body uppercase tracking-wider text-primary mb-2">What We Offer</p>
            <h2 className="text-4xl lg:text-5xl font-headline font-bold text-primary">Our Tattoo Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col bg-card text-card-foreground overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 rounded-lg border-border/50 group">
              <div className="relative w-full h-52">
                <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={service.imageHint}
                    className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="flex flex-col flex-grow p-6 text-center">
                <div className="mb-4 mt-2 flex justify-center">
                  <service.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-headline font-semibold text-primary mb-3">{service.title}</h3>
                <p className="text-foreground/80 mb-6 flex-grow leading-relaxed font-body text-sm">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <Link href={service.link} passHref>
                    <Button variant="link" className="text-accent hover:text-primary p-0 h-auto uppercase text-xs tracking-wider font-semibold">
                      Book Consultation &rarr;
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
