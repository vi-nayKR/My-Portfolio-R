import React, { useEffect, useState } from 'react';
import { Tilt } from './Tilt';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '750+', label: 'Cypress Tests' },
  { value: '15+', label: 'APIs Built' },
];

const cards = [
  {
    title: 'Education',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    desc: 'B.E. Computer Science — Siddaganga Institute of Technology, CGPA 8.65 (2019–2023)',
    image: '/certificates/be_degree.png',
    link: 'https://drive.google.com/file/d/1YTTYwxIe961y7qce_SdFsRhpVS2NN-vn/view?usp=sharing',
  },
  {
    title: 'Location',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    desc: 'Bengaluru, India — Open to remote & hybrid opportunities worldwide',
  },
  {
    title: 'Interests',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    desc: 'Agentic coding, distributed systems architecture, Web3, and open-source development',
  },
];

export const About: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setParallaxOffset(window.scrollY * 0.05);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
    );

    const el = document.querySelector('#about');
    if (el) {
      observer.observe(el);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const openCertificate = (link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="about" className="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden">
      {/* Parallax decorative line */}
      <div
        className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent pointer-events-none"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />

      {/* Outline background texts */}
      <div
        className="absolute right-[-10%] top-10 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        style={{ transform: `translate3d(${parallaxOffset * -1.2}px, 0, 0)` }}
      >
        ARCHITECTURE
      </div>
      <div
        className="absolute left-[-10%] bottom-10 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        style={{ transform: `translate3d(${parallaxOffset * 1.2}px, 0, 0)` }}
      >
        SYSTEMS
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div
            className={visible ? 'animate-slide-in-left' : ''}
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s' }}
          >
            <p className="text-accent font-mono text-xs tracking-widest uppercase mb-4">About Me</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-frost mb-6 leading-tight text-balance">
              Passionate about <span className="gradient-text">Architecture &amp; Code</span>
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Full Stack Developer with 3+ years of experience building production-grade web applications
              and APIs across FinTech, Web3 custody, and casino gaming domains.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              Equally comfortable building <span className="text-frost">Angular</span> and <span className="text-frost">React</span> frontends
              as designing <span className="text-frost">Go</span> and <span className="text-frost">Node.js/Express</span> backend services.
              Strong believer in clean architecture, security-first design, and agentic coding.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {stats.map((stat) => (
                <Tilt
                  key={stat.label}
                  maxTilt={12}
                  scale={1.05}
                  className="text-center p-4 rounded-xl apple-glass hover:border-accent/40 transition-colors duration-300 cursor-default"
                >
                  <div className="text-3xl font-display font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted mt-1 leading-tight">{stat.label}</div>
                </Tilt>
              ))}
            </div>
          </div>

          {/* Right: Info cards */}
          <div className="space-y-4" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.9s' }}>
            {cards.map((card) => (
              <Tilt
                key={card.title}
                maxTilt={8}
                scale={1.02}
                className="p-5 rounded-xl apple-glass card-hover"
              >
                <div className="flex items-start gap-4 justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-accent">{card.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-frost mb-1">{card.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                  {card.image && (
                    <div
                      className="relative overflow-hidden rounded-xl border border-border bg-void w-16 md:w-20 aspect-[1/1.414] cursor-pointer group/edu-img shadow-lg shrink-0"
                      onClick={() => openCertificate(card.link)}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/edu-img:scale-105"
                        loading="lazy"
                      />
                      {/* Hover overlay indicating view */}
                      <div className="absolute inset-0 bg-void/60 opacity-0 group-hover/edu-img:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <span className="px-1.5 py-0.5 rounded bg-accent text-frost text-[8px] font-semibold flex items-center gap-0.5 shadow-lg">
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          View
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Tilt>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
