import React, { useState, useEffect } from 'react';
import { Tilt } from './Tilt';

export const Conference: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setParallaxOffset(window.scrollY * 0.012);
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    const el = document.querySelector('#conference');
    if (el) observer.observe(el);

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="conference" className="relative py-16 md:py-28 px-4 md:px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,98,155,0.05) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(64,186,33,0.04) 0%, transparent 65%)' }}
        />
      </div>

      {/* Parallax background word */}
      <div
        className="absolute left-[-4%] top-1/2 outline-bg-text select-none pointer-events-none font-black opacity-5 will-change-transform hidden md:block"
        style={{ transform: `translate3d(${-parallaxOffset * 0.6}px, -50%, 0)` }}
      >
        PUBLISHED
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-accent font-mono text-xs tracking-widest uppercase mb-4">Peer-Reviewed Research</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-frost text-balance mb-6">
            Conference &amp; Paper
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-glow mx-auto rounded-full" />
        </div>

        {/* Main card */}
        <Tilt
          maxTilt={1.5}
          scale={1}
          className="w-full rounded-3xl apple-glass border border-border/40 overflow-hidden shadow-2xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Paper title banner */}
          <div className="px-8 py-8 border-b border-border/25 bg-void/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-2xl">
                <span className="text-[10px] font-mono text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">
                  Published Research Paper
                </span>
                <h3 className="text-lg md:text-xl font-display font-bold text-frost leading-snug">
                  Data Visualisation of Time Tradable Assets Using Machine Learning
                </h3>
              </div>
              {/* Verified badge */}
              <div className="flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-xl bg-accent/8 border border-accent/20">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs font-mono font-bold text-accent">Peer Verified</span>
              </div>
            </div>
          </div>

          {/* Publication links */}
          <div className="p-8 grid sm:grid-cols-2 gap-5">
            {/* IEEE Xplore */}
            <a
              href="https://ieeexplore.ieee.org/document/10275962"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-5 p-6 rounded-2xl border border-border/40 bg-void/40 hover:bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
              style={{ '--hover-glow': 'rgba(0,98,155,0.12)' } as React.CSSProperties}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(0,98,155,0.12) 0%, transparent 70%)' }} />

              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(0,98,155,0.12)', border: '1px solid rgba(0,98,155,0.3)' }}>
                  {/* IEEE wordmark */}
                  <svg viewBox="0 0 48 20" className="w-10 h-5" fill="none">
                    <text x="0" y="16" fontSize="18" fontWeight="900" fill="#00629B" fontFamily="Georgia,serif">IEEE</text>
                  </svg>
                </div>
                <svg className="w-5 h-5 text-muted group-hover:text-[#00629B] transition-colors duration-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: '#00629B' }}>
                  IEEE Xplore Digital Library
                </p>
                <h4 className="text-sm font-bold text-frost mb-2 leading-snug">
                  IEEE Conference Paper
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  Published in the world's largest technical professional organisation's digital library. DOI: 10.1109/NCNSP56992.2023.10275962
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-border/20 flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted">ieeexplore.ieee.org</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(0,98,155,0.1)', color: '#00629B' }}>
                  #10275962
                </span>
              </div>
            </a>

            {/* ResearchGate */}
            <a
              href="https://www.researchgate.net/publication/374785535_Data_Visualisation_of_Time_Tradable_Assets_Using_Machine_Learning"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-5 p-6 rounded-2xl border border-border/40 bg-void/40 hover:bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(64,186,33,0.1) 0%, transparent 70%)' }} />

              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(64,186,33,0.1)', border: '1px solid rgba(64,186,33,0.25)' }}>
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#40BA21">
                    <path d="M19.586 0H4.414A4.414 4.414 0 0 0 0 4.414v15.172A4.414 4.414 0 0 0 4.414 24h15.172A4.414 4.414 0 0 0 24 19.586V4.414A4.414 4.414 0 0 0 19.586 0zm-7.4 18.395H9.94v-7.33h2.248v7.33zm-1.124-8.332a1.304 1.304 0 1 1 0-2.608 1.304 1.304 0 0 1 0 2.608zm9.538 8.332h-2.246v-3.567c0-.849-.016-1.942-1.183-1.942-1.185 0-1.366.924-1.366 1.879v3.63h-2.246V11.065h2.156v1.001h.03c.3-.568 1.033-1.167 2.126-1.167 2.274 0 2.695 1.497 2.695 3.442v4.054z"/>
                  </svg>
                </div>
                <svg className="w-5 h-5 text-muted group-hover:text-[#40BA21] transition-colors duration-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: '#40BA21' }}>
                  ResearchGate
                </p>
                <h4 className="text-sm font-bold text-frost mb-2 leading-snug">
                  Peer-Reviewed Research Article
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  Open access article on ResearchGate — the global network dedicated to science and research. Accessible to researchers worldwide.
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-border/20 flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted">researchgate.net</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(64,186,33,0.1)', color: '#40BA21' }}>
                  Open Access
                </span>
              </div>
            </a>
          </div>

          {/* Bottom stats bar */}
          <div className="px-8 py-4 border-t border-border/20 bg-void/20 flex flex-wrap gap-6 text-[10px] font-mono text-muted">
            <span>🏛 Siddaganga Institute of Technology, Tumkur</span>
            <span>👨‍🏫 Guide: Dr. Pramod T C</span>
          </div>
        </Tilt>
      </div>
    </section>
  );
};
