'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Github, Twitter, Instagram, Linkedin, Moon, Sun, Monitor } from 'lucide-react';

export function Footer() {
  const { theme, setTheme } = useTheme();
  
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/getstay',
      icon: Github
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/getstay',
      icon: Twitter
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/getstay',
      icon: Instagram
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/getstay',
      icon: Linkedin
    }
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'How it works', href: '/how-it-works' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' }
      ]
    }
  ];

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="block">
              <h2 className="text-2xl font-bold text-foreground">
                get<span className="text-brand-blue">stay</span>
              </h2>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              Find your perfect stay with our curated selection of hostels and PGs. Experience comfort, community, and convenience.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl hover:bg-secondary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-foreground">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-sm text-muted-foreground order-2 sm:order-1">
            © {new Date().getFullYear()} GetStay. All rights reserved.
          </p>
          
          {/* Theme Switcher */}
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={() => setTheme('light')}
              className={`p-2 rounded-xl hover:bg-secondary transition-colors ${
                theme === 'light' ? 'bg-secondary text-foreground' : 'text-muted-foreground'
              }`}
              aria-label="Light mode"
            >
              <Sun className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-2 rounded-xl hover:bg-secondary transition-colors ${
                theme === 'dark' ? 'bg-secondary text-foreground' : 'text-muted-foreground'
              }`}
              aria-label="Dark mode"
            >
              <Moon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`p-2 rounded-xl hover:bg-secondary transition-colors ${
                theme === 'system' ? 'bg-secondary text-foreground' : 'text-muted-foreground'
              }`}
              aria-label="System mode"
            >
              <Monitor className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
