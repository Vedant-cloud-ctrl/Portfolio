import React from 'react';

interface CRTScreenProps {
  children: React.ReactNode;
}

const CRTScreen: React.FC<CRTScreenProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-dark-bg text-white overflow-hidden font-retro selection:bg-neon-magenta selection:text-white">
      
      {/* Scanline Background */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden h-full w-full">
        {/* Moving Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.03)] to-transparent h-[20%] w-full animate-[scanline_8s_linear_infinite] pointer-events-none" />
        
        {/* Fine Grain / Noise Pattern (Static) */}
        <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
            }}
        />

        {/* Horizontal Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_4px,6px_100%] pointer-events-none" />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default CRTScreen;