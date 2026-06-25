import React, { useEffect, useState } from 'react';
import { Tilt } from './Tilt';

const experiences = [
  {
    role: 'Software Engineer – Full Stack',
    company: 'Liminal Custody (First Answer India Services Pvt Ltd)',
    period: 'Nov 2025 – Mar 2026',
    location: 'Bengaluru, India',
    type: 'Full-time',
    highlights: [
      'Engineered 15+ RESTful APIs for a high-performance firewall policy management system using Node.js/Express and TypeScript, incorporating atomic bulk operations and TypeORM transaction rollbacks to ensure zero data corruption during concurrent rule updates.',
      'Designed a multi-tenant RBAC system integrating Auth0 with custom Node.js middleware, implementing 2FA step-up authentication with cryptographic signature validation and nonce-based replay attack prevention for high-value custody endpoints.',
      'Built a Redis-based caching layer for cross-chain swap quotes (LiFi Protocol) across Ethereum, Polygon, BSC, and Base—enforcing strict user-ownership and quote-expiry validation to eliminate redundant external API calls.',
      'Developed 3 Angular modules (Transaction Risk, Travel Rule, Transfer Policy) utilizing RxJS state management, cascading dropdown controls, and beforeunload guards to prevent unsaved configuration loss.',
    ],
    tags: ['Node.js', 'TypeScript', 'Angular', 'RxJS', 'Auth0', 'Redis', 'TypeORM', 'Web3'],
    image: '/crypto-custody.png',
    aspect: 'aspect-[1/2]',
    maxWidth: 'max-w-[320px]',
  },
  {
    role: 'Senior Associate Software Engineer',
    company: 'Light & Wonder (LNW India Solutions Pvt Ltd)',
    period: 'Aug 2023 – Jul 2025',
    location: 'Bengaluru, India',
    type: 'Full-time',
    highlights: [
      'Engineered an AI-driven error logging and debugging tool (React + LLM API) that centralized frontend crash reports and backend telemetry, cutting bug resolution time by approximately 30% across distributed agile teams.',
      'Built high-throughput backend RESTful Web APIs for a core financial transaction system (Cage-Credit) covering bank account management, voucher redemption, denomination exchange, and check cashing workflows for high-reliability operations.',
      'Developed modular Angular components for a large-scale player management platform; optimized complex relational database queries and API payloads to reduce onboarding workflow load times by 20%.',
      'Authored and maintained 750+ end-to-end Cypress automated test cases, cutting manual UI testing effort by 50% and significantly reducing critical production defects.',
    ],
    tags: ['Angular', 'React', 'ASP.NET Core', 'C#', 'SQL Server', 'Cypress', 'TypeScript'],
    image: '/slot-machine.png',
    aspect: 'aspect-[1/2]',
    maxWidth: 'max-w-[160px]',
  },
  {
    role: 'Full Stack Intern',
    company: 'Light & Wonder (LNW India Solutions Pvt Ltd)',
    period: 'Mar 2023 – Jul 2023',
    location: 'Bengaluru, India',
    type: 'Internship',
    highlights: [
      'Completed a 16-week Full Stack internship focused on C# and Angular development. Designed and developed a Game Recommendation System that integrated user feedback and rating functionalities, contributing directly to production feature deployment.',
    ],
    tags: ['C#', 'Angular', 'ASP.NET Core', 'SQL Server'],
    image: '/roulette.png',
    aspect: 'aspect-[4/3]',
  },
];

export const Experience: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setParallaxOffset(scrollY * 0.04);

      const el = document.getElementById('experience');
      if (el) {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const total = rect.height;
        const current = viewportHeight * 0.4 - rect.top;

        if (rect.top < viewportHeight * 0.4 && rect.bottom > viewportHeight * 0.6) {
          const percent = Math.min(Math.max((current / total) * 100, 0), 100);
          setTimelineProgress(percent);
        } else if (rect.bottom <= viewportHeight * 0.6) {
          setTimelineProgress(100);
        } else {
          setTimelineProgress(0);
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const el = document.querySelector('#experience');
    if (el) {
      observer.observe(el);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="experience" className="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden">
      {/* Parallax background accent */}
      <div
        className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent pointer-events-none"
        style={{ transform: `translateY(${-parallaxOffset}px)` }}
      />

      {/* Outline background Typography */}
      <div
        className="absolute left-[-10%] top-10 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        style={{ transform: `translate3d(${parallaxOffset * 1.1}px, 0, 0)` }}
      >
        JOURNEY
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-xs tracking-widest uppercase mb-4">Career Journey</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            Work Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical base line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/20 via-accent/10 to-transparent" />

          {/* Dynamic glowing progress line */}
          <div
            className="timeline-progress-line"
            style={{ height: `${timelineProgress}%` }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={`${exp.company}-${exp.role}`}
                className={`relative flex flex-col md:flex-row gap-8 items-stretch ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                }}
              >
                {/* Dot on the line */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-void -translate-x-1/2 mt-6 z-10 animate-pulse-glow" />

                 {/* Date badge (desktop) */}
                <div
                  className={`hidden md:flex w-[calc(50%-2rem)] items-stretch ${
                    i % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'
                  }`}
                >
                  <div className={`flex flex-col w-full h-full ${i % 2 === 0 ? 'items-end text-right' : 'items-start text-left'}`}>
                    <div>
                      <span className="text-sm font-mono text-accent">{exp.period}</span>
                      <p className="text-xs text-muted mt-1">{exp.location}</p>
                    </div>

                    {exp.image && (
                      <Tilt
                        maxTilt={6}
                        scale={1.03}
                        className={`mt-4 w-full ${exp.maxWidth || 'max-w-[280px]'} md:aspect-auto flex-1 min-h-0 overflow-hidden rounded-xl border border-border/30 bg-void/50 group/exp-img shadow-lg cursor-pointer ${
                          exp.aspect || 'aspect-[4/3]'
                        }`}
                      >
                        <img
                          src={exp.image}
                          alt={exp.company}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/exp-img:scale-105"
                        />
                      </Tilt>
                    )}
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? 'md:pl-8' : 'md:pr-8'
                  }`}
                >
                  <Tilt
                    maxTilt={8}
                    scale={1.02}
                    className="p-6 rounded-2xl apple-glass card-hover"
                  >
                    {/* Mobile date */}
                    <span className="md:hidden text-xs font-mono text-accent block mb-2">{exp.period}</span>

                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display font-semibold text-frost text-lg">{exp.role}</h3>
                        <p className="text-accent text-sm font-medium">{exp.company}</p>
                      </div>
                      <span className="text-xs text-muted bg-void px-2 py-1 rounded-lg border border-border font-mono whitespace-nowrap">
                        {exp.type}
                      </span>
                    </div>

                    <ul className="space-y-2 mt-4">
                      {exp.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-muted leading-relaxed">
                          <span className="text-accent mt-1 shrink-0">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-xs bg-void border border-border text-muted font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {exp.image && (
                      <div className={`md:hidden mt-5 relative overflow-hidden rounded-xl border border-border/30 bg-void/50 group/exp-img ${exp.aspect || 'aspect-[4/3]'}`}>
                        <img
                          src={exp.image}
                          alt={exp.company}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/exp-img:scale-105"
                        />
                      </div>
                    )}
                  </Tilt>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
