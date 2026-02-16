
import React, { useMemo } from 'react';

const PixelCrossStar: React.FC<{ color: string; style: React.CSSProperties }> = ({ color, style }) => (
  <div style={style} className="absolute animate-pulse">
    <svg viewBox="0 0 5 5" className="w-full h-full">
      <rect x="2" y="0" width="1" height="5" fill={color} />
      <rect x="0" y="2" width="5" height="1" fill={color} />
      <rect x="2" y="2" width="1" height="1" fill="#fff" />
    </svg>
  </div>
);

const NebulaStreak: React.FC<{ color: string; style: React.CSSProperties }> = ({ color, style }) => (
  <div style={style} className="absolute blur-[2px] opacity-20">
    <div 
      className="w-full h-full" 
      style={{ 
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        clipPath: 'polygon(0% 50%, 10% 40%, 20% 60%, 30% 40%, 40% 70%, 50% 30%, 60% 80%, 70% 20%, 80% 60%, 90% 40%, 100% 50%)'
      }} 
    />
  </div>
);

const StarBackground: React.FC = () => {
  const elements = useMemo(() => {
    const stars = Array.from({ length: 150 }).map((_, i) => ({
      id: `star-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      color: ['#fff', '#67e8f9', '#c084fc', '#fde68a'][Math.floor(Math.random() * 4)],
      duration: `${Math.random() * 3 + 2}s`,
    }));

    const crossStars = Array.from({ length: 25 }).map((_, i) => ({
      id: `cstar-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 8 + 6}px`,
      color: ['#22d3ee', '#a855f7', '#fbbf24', '#f472b6'][Math.floor(Math.random() * 4)],
      duration: `${Math.random() * 5 + 3}s`,
    }));

    const streaks = Array.from({ length: 8 }).map((_, i) => ({
      id: `streak-${i}`,
      top: `${10 + i * 12}%`,
      left: `${Math.random() * 10 - 5}%`,
      width: '110%',
      height: '100px',
      color: i % 2 === 0 ? '#4f46e5' : '#7c3aed',
      rotation: `${Math.random() * 15 - 7.5}deg`,
    }));

    const comets = Array.from({ length: 4 }).map((_, i) => ({
      id: `comet-${i}`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      duration: `${Math.random() * 8 + 4}s`,
    }));

    return { stars, crossStars, streaks, comets };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a001a]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a001a] via-[#1e1b4b] to-[#000a1f]" />

      {/* Nebula Streaks */}
      {elements.streaks.map(s => (
        <NebulaStreak 
          key={s.id} 
          color={s.color} 
          style={{ 
            top: s.top, 
            left: s.left, 
            width: s.width, 
            height: s.height, 
            transform: `rotate(${s.rotation})` 
          }} 
        />
      ))}

      {/* Small Dot Stars */}
      {elements.stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            boxShadow: `0 0 4px ${star.color}`,
            animationDuration: star.duration,
          }}
        />
      ))}

      {/* Cross Twinkle Stars */}
      {elements.crossStars.map((star) => (
        <PixelCrossStar
          key={star.id}
          color={star.color}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
          }}
        />
      ))}

      {/* Fast Streaking Comets */}
      {elements.comets.map(c => (
        <div 
          key={c.id} 
          className="absolute w-[300px] h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-white animate-drift opacity-30"
          style={{ 
            top: c.top, 
            animationDuration: c.duration, 
            animationDelay: c.delay,
            transform: 'rotate(-15deg)'
          }}
        />
      ))}

      {/* Screen Glare/Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      
      {/* Subtle Glowing Corner Core (The Sun remnant) */}
      <div className="absolute -top-40 -right-40 w-96 h-96 opacity-10 blur-[100px] bg-indigo-500 rounded-full" />
    </div>
  );
};

export default StarBackground;
