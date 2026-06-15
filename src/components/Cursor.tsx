import React, { useEffect, useRef, useState } from 'react';

export const Cursor: React.FC = () => {
  const outerRingRef = useRef<HTMLDivElement>(null);
  const innerDotRef = useRef<HTMLDivElement>(null);

  // Position coordinates (stored in refs for 60fps raf loop without triggers)
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const hasTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia('(hover: none)').matches);
    setIsTouch(hasTouch);

    if (hasTouch) return;

    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (event: MouseEvent) => {
      if (!isVisible) {
        setIsVisible(true);
        // Anchor trail to prevent top-left jumping
        trailRef.current.x = event.clientX;
        trailRef.current.y = event.clientY;
      }
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;

      // Detect interactive elements
      const target = event.target as HTMLElement | null;
      if (target) {
        const isInteractive =
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') !== null ||
          target.closest('button') !== null ||
          target.classList.contains('cursor-pointer') ||
          target.closest('.card-hover') !== null ||
          target.closest('.tilt-glow-overlay') !== null; // covers elements with Tilt

        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseLeaveWindow = (event: MouseEvent) => {
      // If we left the screen altogether
      if (!event.relatedTarget && !(event as any).toElement) {
        setIsVisible(false);
      }
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    let animFrameId: number;
    const animate = () => {
      const lerpSpeed = 0.08;
      trailRef.current.x += (mouseRef.current.x - trailRef.current.x) * lerpSpeed;
      trailRef.current.y += (mouseRef.current.y - trailRef.current.y) * lerpSpeed;

      if (innerDotRef.current && outerRingRef.current) {
        const innerEl = innerDotRef.current;
        const outerEl = outerRingRef.current;

        if (isVisible) {
          innerEl.style.opacity = '1';
          outerEl.style.opacity = '1';
        } else {
          innerEl.style.opacity = '0';
          outerEl.style.opacity = '0';
        }

        const ringOffset = isHovered ? 24 : 12;

        innerEl.style.transform = `translate3d(${mouseRef.current.x - 4}px, ${mouseRef.current.y - 4}px, 0)`;
        outerEl.style.transform = `translate3d(${trailRef.current.x - ringOffset}px, ${trailRef.current.y - ringOffset}px, 0)`;

        // 1. Detect which section the cursor is physically hovering over
        const clientY = mouseRef.current.y;
        const sections = ['home', 'about', 'skills', 'experience', 'resume', 'projects', 'certifications', 'gaming', 'setup', 'contact'];
        let currentSectionId = 'home';
        
        for (const secId of sections) {
          const el = document.getElementById(secId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (clientY >= rect.top && clientY <= rect.bottom) {
              currentSectionId = secId;
              break;
            }
          }
        }

        // 2. Detect if we are hovering a navbar link
        let hoveredSectionId: string | null = null;
        const hoveredElement = document.elementFromPoint(mouseRef.current.x, mouseRef.current.y);
        if (hoveredElement) {
          const anchor = hoveredElement.closest('a');
          if (anchor) {
            const href = anchor.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#') {
              hoveredSectionId = href.substring(1);
            }
          }
        }

        const activeSec = hoveredSectionId || currentSectionId;
        const isLightMode = document.documentElement.classList.contains('light-mode');

        // 3. Assign dynamic colors based on active section and theme mode
        let accentRGB = '255, 107, 0';
        if (isLightMode) {
          switch (activeSec) {
            case 'home':
            case 'contact':
              accentRGB = '234, 88, 12'; // Orange-600
              break;
            case 'about':
              accentRGB = '79, 70, 229'; // Indigo-600
              break;
            case 'skills':
              accentRGB = '147, 51, 234'; // Purple-600
              break;
            case 'experience':
              accentRGB = '8, 145, 178'; // Cyan-600
              break;
            case 'resume':
              accentRGB = '217, 119, 6'; // Amber-600
              break;
            case 'projects':
              accentRGB = '220, 38, 38'; // Red-600
              break;
            case 'certifications':
              accentRGB = '5, 150, 105'; // Emerald-600
              break;
            case 'gaming':
              accentRGB = '202, 138, 4'; // Yellow-600
              break;
            case 'setup':
              accentRGB = '219, 39, 119'; // Pink-600
              break;
            default:
              accentRGB = '234, 88, 12';
          }
        } else {
          switch (activeSec) {
            case 'home':
            case 'contact':
              accentRGB = '255, 107, 0'; // Accent Orange
              break;
            case 'about':
              accentRGB = '99, 102, 241'; // Indigo
              break;
            case 'skills':
              accentRGB = '168, 85, 247'; // Purple
              break;
            case 'experience':
              accentRGB = '6, 182, 212'; // Cyan
              break;
            case 'resume':
              accentRGB = '245, 158, 11'; // Amber
              break;
            case 'projects':
              accentRGB = '239, 68, 68'; // Red
              break;
            case 'certifications':
              accentRGB = '16, 185, 129'; // Emerald
              break;
            case 'gaming':
              accentRGB = '241, 196, 15'; // Yellow
              break;
            case 'setup':
              accentRGB = '255, 0, 127'; // Neon Pink
              break;
            default:
              accentRGB = '255, 107, 0';
          }
        }

        // Apply visual updates to outer and inner cursor components
        if (isHovered) {
          outerEl.style.width = '48px';
          outerEl.style.height = '48px';
          outerEl.style.boxShadow = `0 0 25px rgba(${accentRGB}, 0.55)`;
          outerEl.style.borderColor = `rgba(${accentRGB}, 0.9)`;
          innerEl.style.backgroundColor = `rgba(${accentRGB}, 1)`;
          outerEl.style.backgroundColor = `rgba(${accentRGB}, 0.08)`;
        } else {
          outerEl.style.width = '24px';
          outerEl.style.height = '24px';
          outerEl.style.boxShadow = 'none';
          outerEl.style.borderColor = `rgba(${accentRGB}, 0.5)`;
          innerEl.style.backgroundColor = isLightMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(244, 245, 248, 0.9)';
          outerEl.style.backgroundColor = 'transparent';
        }
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.documentElement.classList.remove('custom-cursor-active');
      cancelAnimationFrame(animFrameId);
    };
  }, [isVisible, isHovered]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer glowing circle (lagging trailing effect) */}
      <div
        ref={outerRingRef}
        className="fixed rounded-full pointer-events-none z-[9999] border mix-blend-screen bg-accent/5"
        style={{
          width: '24px',
          height: '24px',
          left: 0,
          top: 0,
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform',
          transition: 'opacity 0.3s ease, width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.3s ease',
        }}
      />

      {/* Inner active dot (instant cursor position) */}
      <div
        ref={innerDotRef}
        className="fixed w-2 h-2 bg-frost rounded-full pointer-events-none z-[10000]"
        style={{
          left: 0,
          top: 0,
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform',
          transition: 'opacity 0.3s ease',
        }}
      />
    </>
  );
};
