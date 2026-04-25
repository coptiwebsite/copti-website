import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [router.pathname]);

  const isActive = (href: string): boolean => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  const navLinks: { href: string; label: string }[] = [
    { href: '/',        label: 'Home' },
    { href: '/about',   label: 'About' },
    { href: '/schools', label: 'Member Schools' },
    { href: '/news',    label: 'News' },
    { href: '/gallery', label: 'Gallery'},
    { href: '/events',  label: 'Events' },
  ];

  return (
    <>
      {/* TOP BAR */}
      <div className="topBar">
        <div className="container">
          <div className="topBarLeft">
            <a href="tel:+233243623269">
              <i className="fa fa-phone" /> +233 24 362 3269
            </a>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <a href="tel:+233507403888">
              <i className="fa fa-phone" /> +233 50 740 3888
            </a>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <a href="mailto:info@copti.org.gh">
              <i className="fa fa-envelope" /> info@copti.org.gh
            </a>
          </div>
          <div className="topBarRight">
            <a href="https://www.facebook.com/coptiGhana" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="https://x.com/coptiGhana" target="_blank" rel="noopener noreferrer" aria-label="X">
              <i className="fab fa-x-twitter" />
            </a>
            <a href="https://wa.me/233530505031" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <i className="fab fa-whatsapp" />
            </a>
            <a href="https://www.linkedin.com/company/copti-ghana" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="https://www.youtube.com/@coptighana" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="fab fa-youtube" />
            </a>
            <a href="https://www.instagram.com/copti_ghana" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        className="siteHeader"
        style={{ boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.08)' }}
      >
        <div className="container">
          <div className="headerInner">

            {/* Logo */}
            <Link href="/" className="siteLogo" aria-label="COPTI Home">
              <img src="/logo.jpg" alt="COPTI Logo" width={160} height={58} style={{ display: 'block' }} />
            </Link>

            {/* Desktop Nav */}
            <nav className="mainNav" aria-label="Primary Navigation">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className={isActive(href) ? 'active' : ''}>
                  {label}
                </Link>
              ))}
              <Link href="/contact" className="btn btn-primary btn-sm">
                Contact Us
              </Link>
            </nav>

            {/* Hamburger */}
            <button
              className="menuToggle"
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
              <span style={menuOpen ? { opacity: 0 } : {}} />
              <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
            </button>

          </div>
        </div>

        {/* Mobile Nav */}
        <nav
          className={`mobileNav${menuOpen ? ' open' : ''}`}
          aria-label="Mobile Navigation"
          aria-hidden={!menuOpen}
        >
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
          <Link href="/contact">Contact Us</Link>
          <div className="mobileNavSocial">
            <a href="https://wa.me/233530505031" target="_blank" rel="noopener noreferrer" style={{ color: '#25d366' }}>
              <i className="fab fa-whatsapp" />
            </a>
            <a href="https://www.facebook.com/coptiGhana" target="_blank" rel="noopener noreferrer" style={{ color: '#4267B2' }}>
              <i className="fab fa-facebook-f" />
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
