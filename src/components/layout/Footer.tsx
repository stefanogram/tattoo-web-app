
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#artists', label: 'Artists' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-foreground/80 pt-16 pb-8 font-body border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Logo and About */}
          <div>
            <Link href="/" className="text-3xl font-headline font-bold text-primary hover:text-accent transition-colors mb-4 inline-block uppercase tracking-wider">
              Corfu Tattoo
            </Link>
            <p className="text-sm leading-relaxed">
              Crafting timeless tattoos with passion and precision. Your vision, our artistry. We are dedicated to providing an unparalleled tattoo experience.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-lg font-headline font-semibold text-foreground mb-4">Explore</h5>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map((link) => ( // Show first 4 links
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors text-sm uppercase tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: More Links / Studio Info */}
          <div>
             <h5 className="text-lg font-headline font-semibold text-foreground mb-4 invisible md:visible">.</h5> {/* Spacer for alignment */}
            <ul className="space-y-2">
              {navLinks.slice(4).map((link) => ( // Show rest of links
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors text-sm uppercase tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Contact Info & Social Media */}
          <div>
            <h5 className="text-lg font-headline font-semibold text-foreground mb-4">Connect</h5>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-start">
                <MapPin size={16} className="text-primary mr-2.5 mt-0.5 shrink-0" /> 123 Inkwell Ave, Art City, ST 98765
              </li>
              <li className="flex items-start">
                <Phone size={16} className="text-primary mr-2.5 mt-0.5 shrink-0" /> <a href="tel:+12345678900" className="hover:text-primary transition-colors">(123) 456-78900</a>
              </li>
              <li className="flex items-start">
                <Mail size={16} className="text-primary mr-2.5 mt-0.5 shrink-0" /> <a href="mailto:bookings@corfutattoo.com" className="hover:text-primary transition-colors">bookings@corfutattoo.com</a>
              </li>
            </ul>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 text-center">
          <p className="text-xs text-foreground/60">
            &copy; {currentYear} Corfu Tattoo Studio. All Rights Reserved. Site by You.
          </p>
        </div>
      </div>
    </footer>
  );
}
