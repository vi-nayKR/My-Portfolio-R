import React, { useRef, useState, useEffect } from 'react';

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  maxTilt?: number;
  scale?: number;
  glowColor?: string;
  children: React.ReactNode;
}

export const Tilt: React.FC<TiltProps> = ({
  maxTilt = 12,
  scale = 1.03,
  glowColor = '',
  children,
  className = '',
  style = {},
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [resolvedGlowColor, setResolvedGlowColor] = useState('rgba(255, 107, 0, 0.15)');
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 2,
    opacity: 0,
    transition: 'opacity 0.4s ease',
    mixBlendMode: 'screen',
    borderRadius: 'inherit',
  });

  const [transformStyle, setTransformStyle] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [transitionStyle, setTransitionStyle] = useState<string>('transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease');

  const isTouchDevice = () => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia('(hover: none)').matches)
    );
  };

  const handleMouseEnter = () => {
    if (isTouchDevice()) return;
    setIsHovered(true);

    let resolvedGlow = '';
    if (glowColor) {
      resolvedGlow = glowColor;
    } else {
      const accentRGB = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-rgb').trim() || '255, 107, 0';
      resolvedGlow = `rgba(${accentRGB}, 0.15)`;
    }
    setResolvedGlowColor(resolvedGlow);

    setTransitionStyle('transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease');
    setGlowStyle(prev => ({ ...prev, opacity: 1 }));
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    const rX = -(py * maxTilt);
    const rY = px * maxTilt;

    setTransformStyle(`perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(${scale}, ${scale}, ${scale})`);
    
    setGlowStyle(prev => ({
      ...prev,
      background: `radial-gradient(circle at ${x}px ${y}px, ${resolvedGlowColor} 0%, transparent 60%)`,
      opacity: 1
    }));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransitionStyle('transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease');
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowStyle(prev => ({ ...prev, opacity: 0 }));
  };

  // Adjust relative position of parent if static
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (containerRef.current) {
      const pos = window.getComputedStyle(containerRef.current).position;
      if (pos === 'static') {
        setPositionStyle({ position: 'relative' });
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        ...positionStyle,
        transformStyle: 'preserve-3d',
        transform: transformStyle,
        transition: transitionStyle,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="tilt-glow-overlay" style={glowStyle} />
      {children}
    </div>
  );
};
