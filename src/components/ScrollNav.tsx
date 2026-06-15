import React, { useEffect, useState } from 'react';

const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills & Technologies' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'resume', label: 'Interactive Resume' },
  { id: 'projects', label: 'Featured Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'gaming', label: 'Playground / Gaming' },
  { id: 'setup', label: 'OS Workspace' },
  { id: 'contact', label: 'Get in Touch' }
];

export const ScrollNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    // 1. Intersection Observer for Scroll Spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    navSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // 2. Track scroll percentage and footer collision
    const onScrollWindow = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = Math.round((window.scrollY / docHeight) * 100);
        setScrollPercentage(pct);
      }

      const footer = document.querySelector('footer');
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        setHideNav(footerTop < window.innerHeight - 100);
      }
    };

    window.addEventListener('scroll', onScrollWindow, { passive: true });
    onScrollWindow();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScrollWindow);
    };
  }, []);

  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const lenis = (window as any).lenisInstance;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleWidgetClick = () => {
    if (scrollPercentage > 80) {
      scrollTo('home');
    } else {
      const currentIdx = navSections.findIndex(s => s.id === activeSection);
      if (currentIdx !== -1 && currentIdx < navSections.length - 1) {
        scrollTo(navSections[currentIdx + 1].id);
      }
    }
  };

  return (
    <>
      {/* On this page text navigation (Desktop only) */}
      <div 
        className={`fixed right-8 top-[30%] z-50 hidden xl:flex flex-col gap-2 max-w-[220px] text-left transition-all duration-300 ${
          hideNav ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <h4 className="text-xs font-mono font-bold tracking-widest text-accent uppercase mb-2">On this page</h4>
        <div className="relative border-l border-border/60 pl-4 py-1 flex flex-col gap-2.5">
          {navSections.map((sec) => (
            <a
              key={sec.id}
              onClick={(e) => {
                scrollTo(sec.id);
                e.preventDefault();
              }}
              href={`#${sec.id}`}
              className={`block text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer relative -ml-[17px] pl-[16px] border-l-2 ${
                activeSection === sec.id
                  ? 'text-accent font-semibold border-accent'
                  : 'text-muted border-transparent hover:text-frost'
              }`}
            >
              {sec.label}
            </a>
          ))}
        </div>
      </div>

      {/* Floating Circular Scroll Progress / Back to Top Widget */}
      <button
        onClick={handleWidgetClick}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full apple-glass border border-border/50 hover:border-accent/50 shadow-2xl hover:shadow-accent/15 group cursor-pointer transition-all duration-300 active:scale-95 ${
          scrollPercentage < 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Scroll helper widget"
      >
        {/* SVG Circular Progress Ring */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-border/20"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-accent transition-all duration-100"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray={`${scrollPercentage}, 100`}
            strokeLinecap="round"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>

        {/* Central Icon */}
        {scrollPercentage > 80 ? (
          // Double Up Arrow
          <svg className="w-5 h-5 text-accent group-hover:text-accent-glow transition-colors duration-200 z-10 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" stroke-linejoin="round" d="M4.5 11.25l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
          </svg>
        ) : (
          // Double Down Arrow
          <svg className="w-5 h-5 text-accent group-hover:text-accent-glow transition-colors duration-200 z-10 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5 7.5 7.5-7.5m-15-6l7.5 7.5 7.5-7.5" />
          </svg>
        )}
      </button>
    </>
  );
};
