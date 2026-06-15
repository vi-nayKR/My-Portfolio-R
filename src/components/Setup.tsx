import React, { useEffect, useState } from 'react';
import { Tilt } from './Tilt';

export const Setup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setParallaxOffset(window.scrollY * 0.03);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.08 }
    );

    const el = document.querySelector('#setup');
    if (el) {
      observer.observe(el);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="setup" className="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden bg-void">
      {/* Glow background decors */}
      <div className="absolute top-1/3 right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 filter blur-[100px]"
           style={{ background: 'radial-gradient(circle, #ff007f 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/3 left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 filter blur-[100px]"
           style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }} />

      {/* Large Outline Parallax Text */}
      <div
        className="absolute right-[-5%] top-[25%] outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        style={{ transform: `translate3d(${parallaxOffset * -1.3}px, 0, 0)` }}
      >
        DAILY DRIVER
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-xs tracking-widest uppercase mb-4">Workspace &amp; Environment</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            Favourite <span className="gradient-text">OS Setup</span>
          </h2>
        </div>

        {/* Garuda Linux Section */}
        <div
          className="grid md:grid-cols-12 gap-8 items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s, transform 0.8s',
          }}
        >
          {/* Left Content: Terminal card */}
          <div className="md:col-span-7 space-y-6 text-left">
            <div>
              <p className="text-[#ff007f] font-mono text-xs tracking-widest uppercase mb-4">My Custom Environment</p>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-frost leading-tight">
                Daily Driving <span className="text-[#ff007f] font-black">Garuda</span> <span className="gradient-text font-black">Dr460nized</span>
              </h3>
            </div>

            {/* Terminal Card */}
            <div className="apple-glass rounded-xl p-5 border border-[#ff007f]/20 shadow-lg relative bg-void/70 overflow-hidden">
              <div className="absolute -right-12 -top-12 w-36 h-36 rounded-full opacity-10 bg-[#ff007f] blur-2xl" />
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-[10px] text-muted">vinay&#64;garuda-dr460nized</span>
              </div>

              {/* Terminal Body */}
              <div className="font-mono text-xs space-y-3">
                <p className="text-muted"><span className="text-green-400">~</span> neofetch</p>
                <div className="grid grid-cols-3 gap-2 border-l-2 border-[#ff007f]/40 pl-3">
                  <div className="text-[#ff007f] font-bold">OS:</div>
                  <div className="col-span-2 text-frost">Garuda Linux x86_64</div>
                  
                  <div className="text-[#ff007f] font-bold">Edition:</div>
                  <div className="col-span-2 text-[#ff9242]">Dr460nized (KDE Git)</div>
                  
                  <div className="text-[#ff007f] font-bold">Kernel:</div>
                  <div className="col-span-2 text-frost">Linux-Zen (High Performance)</div>
                  
                  <div className="text-[#ff007f] font-bold">Shell:</div>
                  <div className="col-span-2 text-frost">fish (highly customized)</div>
                  
                  <div className="text-[#ff007f] font-bold">Theme:</div>
                  <div className="col-span-2 text-purple-400">Sweet-Amber-KDE (Neon Pink)</div>
                </div>

                <p className="text-muted leading-relaxed mt-4 text-justify">
                  <span className="text-green-400">#</span> "When it comes to my computing environment, I refuse to compromise on visual flair or sheer performance. Garuda Dr460nized Linux is the ultimate daily driver—coupling the lightning speed of an optimized <span className="text-frost font-bold">Linux-Zen kernel</span> with a customized, glowing cyberpunk desktop environment. Under the hood, it's Arch Linux speed. On the outside, it is absolute, beautiful chaotic neon energy that fuels my coding fires."
                </p>
              </div>
            </div>

            {/* Features details tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-void border border-[#ff007f]/40 text-[#ff007f] shadow-sm shadow-[#ff007f]/5">Arch Linux Base</span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-void border border-accent/40 text-accent">Linux-Zen Kernel</span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-void border border-purple-500/40 text-purple-400">KDE Plasma Dr460nized</span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-void border border-blue-500/40 text-blue-400">Btrfs Auto-Snapshots</span>
            </div>
          </div>

          {/* Right Content: Desk Workspace Showcase */}
          <div className="md:col-span-5 space-y-6">
            <Tilt
              maxTilt={6}
              scale={1.03}
              glowColor="rgba(255, 107, 0, 0.15)"
              className="apple-glass rounded-2xl overflow-hidden border border-border/30 p-3 bg-void/50 cursor-pointer shadow-xl relative group"
            >
              <div className="relative overflow-hidden rounded-xl h-64 md:h-96">
                <img
                  src="/desk-setup.png"
                  alt="Vinay Desk Setup with Garuda Linux"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 p-1 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-frost">My Daily Workspace</h4>
                  <p className="text-[9px] text-muted font-mono mt-0.5">Custom desk setup running Garuda OS</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>
            </Tilt>
          </div>
        </div>

      </div>
    </section>
  );
};
