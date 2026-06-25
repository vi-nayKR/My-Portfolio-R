import React, { useEffect, useState } from 'react';

const navItems = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Resume', href: '#resume', id: 'resume' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Conference', href: '#conference', id: 'conference' },
  { label: 'B.E.', href: '#major-project', id: 'major-project' },
  { label: 'Certifications', href: '#certifications', id: 'certifications' },
  // { label: 'Gaming', href: '#gaming', id: 'gaming' },
  // { label: 'Setup', href: '#setup', id: 'setup' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Determine initial theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const isLight = savedTheme === 'light' || (!savedTheme && systemPrefersLight);
    setIsDarkMode(!isLight);
    applyTheme(!isLight);

    // Initial check for active section
    setTimeout(() => determineActiveSection(), 100);

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      determineActiveSection();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    applyTheme(nextDark);
  };

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const determineActiveSection = () => {
    const sections = ['home', 'about', 'skills', 'experience', 'resume', 'projects', 'conference', 'major-project', 'certifications', 'contact'];
    let currentActive = 'home';
    
    if (window.scrollY < 100) {
      setActiveSection('home');
      return;
    }

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      setActiveSection('contact');
      return;
    }

    const scrollPosition = window.scrollY + window.innerHeight * 0.35;

    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentActive = sectionId;
        }
      }
    }
    setActiveSection(currentActive);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('home');
    if (el) {
      const lenis = (window as any).lenisInstance;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as any).lenisInstance;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed left-0 right-0 z-50 apple-glass transition-all duration-500 py-3 px-6 flex items-center justify-between ${
        scrolled ? 'top-0 border-b border-accent/20 shadow-lg shadow-accent/5' : 'top-0'
      }`}
    >
      {/* Logo: Vinay */}
      <a href="#home" onClick={handleLogoClick} className="group flex items-center gap-2">
        <span className="text-3xl gradient-text tracking-normal" style={{ fontFamily: "'Alex Brush', cursive" }}>
          Vinay
        </span>
      </a>

      {/* Desktop Nav (Glassmorphic Tabs Grid) */}
      <ul className="hidden md:flex items-center gap-1 bg-void/30 border border-border/10 p-1 rounded-2xl backdrop-blur-sm">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              onClick={(e) => handleNavItemClick(e, item.id)}
              className={`block px-4 py-2 text-xs font-mono font-bold rounded-xl transition-all duration-300 border border-transparent ${
                activeSection === item.id
                  ? 'glass-tab-active'
                  : 'glass-text-secondary hover:glass-text-primary'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Theme Toggle & CTA (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-border text-muted hover:text-frost hover:border-accent/40 hover:bg-surface transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            // Sun Icon
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            // Moon Icon
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        
        <a
          href="#contact"
          onClick={(e) => handleNavItemClick(e, 'contact')}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent hover:bg-accent-glow text-frost text-sm font-bold transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
        >
          Hire Me
        </a>
      </div>

      {/* Mobile Toggle Box (Theme + Menu) */}
      <div className="flex items-center gap-3 md:hidden">
        <a
          href="#contact"
          onClick={(e) => handleNavItemClick(e, 'contact')}
          className="px-3.5 py-1.5 rounded-xl bg-accent hover:bg-accent-glow text-frost text-xs font-bold transition-all duration-200 shadow-md shadow-accent/10 hover:shadow-lg hover:shadow-accent/20"
        >
          Hire Me
        </a>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-border text-muted hover:text-frost cursor-pointer flex items-center justify-center shrink-0"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            // Sun Icon
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            // Moon Icon
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        <button
          className="text-frost flex items-center justify-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {!menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 md:hidden apple-glass rounded-2xl p-5 shadow-2xl flex flex-col gap-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavItemClick(e, item.id)}
              className={`block py-2.5 px-4 text-sm font-medium rounded-xl transition-all border border-transparent ${
                activeSection === item.id
                  ? 'glass-tab-active'
                  : 'glass-text-secondary hover:glass-text-primary'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavItemClick(e, 'contact')}
            className="w-full text-center py-3 bg-accent hover:bg-accent-glow text-frost font-bold text-sm rounded-xl mt-2 transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};
