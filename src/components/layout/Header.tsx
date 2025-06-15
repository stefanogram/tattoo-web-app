
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isTextWhiteCondition = !isScrolled && !isMobileMenuOpen;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-body',
        isScrolled || isMobileMenuOpen ? 'bg-background shadow-lg py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-3xl font-headline font-bold text-primary hover:text-accent transition-colors uppercase tracking-wider">
            Corfu Tattoo
          </Link>

          <nav className="hidden md:flex items-center space-x-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm uppercase font-medium tracking-wide transition-colors",
                  isTextWhiteCondition ? "text-white hover:text-primary/80" : "text-foreground hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
             <Link href="#contact" passHref>
                <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase text-xs px-6 py-2 tracking-wider">
                    Book Appointment
                </Button>
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4 ml-4">
            {socialLinks.map((social) => (
              <Link 
                key={social.label} 
                href={social.href} 
                aria-label={social.label} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={cn(
                  "transition-colors",
                  isTextWhiteCondition ? "text-white hover:text-primary/80" : "text-foreground hover:text-primary"
                )}
              >
                <social.icon size={18} />
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu} 
              className={cn(
                "hover:text-primary",
                isTextWhiteCondition ? "text-white" : "text-foreground"
              )}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg pb-10 flex flex-col items-center h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex flex-col space-y-6 py-8 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-lg text-foreground hover:text-primary transition-colors uppercase font-medium tracking-wide"
                onClick={() => {
                  toggleMobileMenu();
                  setTimeout(() => {
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 0);
                }}
              >
                {link.label}
              </Link>
            ))}
             <Link href="#contact" passHref>
                <Button variant="default" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase mt-4 px-8 py-3 text-sm tracking-wider" onClick={toggleMobileMenu}>
                    Book Appointment
                </Button>
            </Link>
          </nav>
          <div className="flex items-center space-x-6 mt-8">
            {socialLinks.map((social) => (
              <Link key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors" onClick={toggleMobileMenu}>
                <social.icon size={22} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
