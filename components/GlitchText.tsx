import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p' | 'div';
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Tag = 'span', className = '', intensity = 'medium' }) => {
  
  // Inline styles for the pseudo-elements (the glitch layers)
  // We use CSS variables or direct style injection for the content attr is tricky in React inline styles
  // So we will use data attributes and Tailwind's arbitrary variants if possible, or just standard CSS classes defined in index.html
  
  return (
    <Tag 
      className={`relative inline-block group ${className}`}
      data-text={text}
    >
      {/* Main Text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glitch Layer 1 (Red/Magenta) */}
      <span 
        className="absolute top-0 left-0 -z-10 w-full h-full text-neon-magenta opacity-70 animate-[glitch-anim-1_3s_infinite_linear_alternate-reverse]"
        style={{ clipPath: 'inset(20% 0 80% 0)', transform: 'translate(-2px, 0)' }}
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Glitch Layer 2 (Cyan) */}
      <span 
        className="absolute top-0 left-0 -z-10 w-full h-full text-neon-cyan opacity-70 animate-[glitch-anim-2_2.5s_infinite_linear_alternate-reverse]"
        style={{ clipPath: 'inset(80% 0 20% 0)', transform: 'translate(2px, 0)' }}
        aria-hidden="true"
      >
        {text}
      </span>
    </Tag>
  );
};

export default GlitchText;