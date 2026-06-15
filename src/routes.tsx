import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { Particles } from './components/Particles';
import { ScrollNav } from './components/ScrollNav';
import { Navbar } from './components/Navbar';

// Imports of portfolio sections
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Resume } from './components/Resume';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Gaming } from './components/Gaming';
import { Setup } from './components/Setup';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Root Layout component
const RootLayout = () => {
  useEffect(() => {
    // Initialise Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    (window as any).lenisInstance = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Event delegation for anchor links smooth scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#') {
          const element = document.querySelector(href);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element as HTMLElement, { offset: -80 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="noise relative min-h-screen">
      <ScrollNav />
      <Particles />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

// Root route definition
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Index page component carrying all sections
const IndexPage = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Resume />
      <Projects />
      <Certifications />
      <Gaming />
      <Setup />
      <Contact />
      <Footer />
    </>
  );
};

// Index route definition
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexPage,
});

// Build the route tree
const routeTree = rootRoute.addChildren([indexRoute]);

// Create the router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Register router types for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
