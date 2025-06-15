
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Instagram, Brush } from 'lucide-react'; // Example icons
import Link from 'next/link';

const artists = [
  {
    name: 'Alex "Ink_"',
    specialty: 'Realism & Portraits',
    imageSrc: 'https://images.unsplash.com/photo-1741736000691-d019b5432fd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NDk1MDYxMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageAlt: 'Portrait of artist Alex',
    imageHint: 'tattoo artist portrait',
    bio: 'With over a decade of experience, Alex brings hyper-realistic visions to life, specializing in intricate black and grey portraits and surreal imagery.',
    social: {
      instagram: '#',
    }
  },
  {
    name: 'Maya',
    specialty: 'Fine Line & Botanical',
    imageSrc: 'https://images.unsplash.com/photo-1621369981063-11e00f585beb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZmVtYWxlJTIwdGF0dG9vJTIwYXJ0aXN0fGVufDB8fHx8MTc0OTUwNjEzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    imageAlt: 'Portrait of artist Maya',
    imageHint: 'female tattoo artist',
    bio: 'Maya masterfully crafts delicate fine line tattoos, with a focus on elegant botanical designs and minimalist aesthetics. Her work is subtle yet profound.',
    social: {
      instagram: '#',
    }
  },
  {
    name: 'Kenji',
    specialty: 'Japanese & Neo-Traditional',
    imageSrc: 'https://images.unsplash.com/photo-1603162610423-af7febeca563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxhc2lhbiUyMHRhdHRvbyUyMGFydGlzdHxlbnwwfHx8fDE3NDk1MDYxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageAlt: 'Portrait of artist Kenji',
    imageHint: 'asian tattoo artist',
    bio: 'Kenji blends traditional Japanese motifs with bold neo-traditional styles, creating vibrant and dynamic pieces rich in symbolism and storytelling.',
    social: {
      instagram: '#',
    }
  },
];

export default function ArtistsSection() {
  return (
    <section id="artists" className="bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
            <p className="text-sm font-body uppercase tracking-wider text-primary mb-2">Our Talented Crew</p>
            <h2 className="text-4xl lg:text-5xl font-headline font-bold text-primary">Meet The Artists</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {artists.map((artist, index) => (
            <Card key={index} className="flex flex-col bg-card text-card-foreground overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 rounded-lg border-border/50 group">
              <CardHeader className="p-0 relative">
                <div className="aspect-[3/4] w-full relative">
                  <Image
                    src={artist.imageSrc}
                    alt={artist.imageAlt}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={artist.imageHint}
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow p-6 text-center">
                <CardTitle className="text-3xl font-headline text-primary mb-1">{artist.name}</CardTitle>
                <CardDescription className="text-accent font-body uppercase tracking-wider text-xs mb-3">{artist.specialty}</CardDescription>
                <p className="text-foreground/70 mb-5 flex-grow leading-relaxed font-body text-sm px-2">
                  {artist.bio}
                </p>
                <div className="mt-auto flex justify-center items-center space-x-3">
                  <Link href={artist.social.instagram} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                    <Instagram size={20} />
                  </Link>
                  {/* Add more social links or a "View Portfolio" button here */}
                   <Link href="#gallery" className="text-foreground/70 hover:text-primary transition-colors">
                    <Brush size={20} />
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
