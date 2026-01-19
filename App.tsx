import React, { useState, useEffect } from 'react';
import CRTScreen from './components/CRTScreen';
import GlitchText from './components/GlitchText';
import Terminal from './components/Terminal';
import { NavItem } from './types';

const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState<NavItem>(NavItem.HOME);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase());
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CRTScreen>
      <div className="min-h-screen flex flex-col p-4 sm:p-8 md:p-12 max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 sm:mb-20 gap-6 sm:gap-0">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="text-neon-cyan text-xl animate-pulse">▶</span>
              <GlitchText text="VA" className="text-3xl sm:text-4xl font-bold tracking-widest" />
            </div>
            
            <nav className="flex flex-col gap-1 text-lg sm:text-xl tracking-wider pl-1">
              {[
                { label: 'OPEN-SOURCE', id: NavItem.PROJECTS },
                { label: 'WEBSITES', id: NavItem.HOME },
                { label: 'ABOUT_ME', id: NavItem.ABOUT },
                { label: 'AI_LINK', id: NavItem.TERMINAL },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`text-left hover:text-neon-cyan transition-all duration-100 uppercase group flex items-center gap-2 ${activeNav === item.id ? 'text-neon-cyan pl-2 border-l-2 border-neon-cyan' : 'text-gray-400'}`}
                >
                  <span className={`opacity-0 group-hover:opacity-100 transition-opacity text-xs ${activeNav === item.id ? 'hidden' : ''}`}>&gt;</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-end text-right font-mono text-neon-cyan/70">
            <div className="text-xl sm:text-2xl tracking-widest mb-1">{time}</div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                CHANNEL 00
            </div>
            <div className="text-xs opacity-50 mt-1">SIGNAL_STRENGTH: 98%</div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col justify-center relative">
            
            {/* Background Big Text for aesthetics */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] sm:text-[20vw] font-bold text-white/5 whitespace-nowrap pointer-events-none select-none z-0 blur-sm">
                ADHANGALE
            </div>

            <div className="z-10 relative">
                {activeNav === NavItem.HOME && (
                    <div className="max-w-4xl">
                        <GlitchText 
                            text="HI! I'M VEDANT ADHANGALE," 
                            as="h1" 
                            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 block"
                        />
                        <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neon-magenta/90 mb-8 block">
                             PURSUING DATA SCIENCE<span className="animate-blink">_</span>
                        </div>
                        
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-8 border-l-4 border-neon-green pl-6 py-2 bg-gradient-to-r from-white/5 to-transparent">
                            Passionate Data Science student exploring the frontiers of AI and Machine Learning. 
                            Turning complex data into actionable insights.
                        </p>

                        <div className="flex gap-4">
                             <button 
                                onClick={() => setActiveNav(NavItem.TERMINAL)}
                                className="px-6 py-3 bg-neon-cyan text-black font-bold text-xl hover:bg-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                             >
                                INITIALIZE_CHAT()
                             </button>
                             <button 
                                className="px-6 py-3 border border-neon-magenta text-neon-magenta font-bold text-xl hover:bg-neon-magenta hover:text-black transition-all shadow-[0_0_15px_rgba(255,0,255,0.3)]"
                             >
                                DOWNLOAD_CV
                             </button>
                        </div>
                    </div>
                )}

                {activeNav === NavItem.PROJECTS && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-[scanline_0.5s_ease-out]">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="border border-white/20 p-6 bg-white/5 hover:border-neon-cyan transition-colors group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 text-xs text-white/30 group-hover:text-neon-cyan">DATA_SET_0{i}</div>
                                <h3 className="text-2xl text-neon-green mb-2 group-hover:animate-pulse">MODEL_TRAINING_{i}</h3>
                                <p className="text-gray-400 mb-4">A predictive model analysis using deep learning techniques.</p>
                                <div className="flex gap-2 text-xs uppercase tracking-wider text-neon-magenta">
                                    <span>[Python]</span>
                                    <span>[PyTorch]</span>
                                    <span>[Jupyter]</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {activeNav === NavItem.ABOUT && (
                     <div className="max-w-3xl animate-[scanline_0.5s_ease-out]">
                        <h2 className="text-4xl sm:text-5xl text-neon-cyan mb-6 decoration-dashed underline underline-offset-8">USER_PROFILE</h2>
                        <div className="space-y-6 text-xl text-gray-300 leading-relaxed">
                            <p>
                                <span className="text-neon-magenta font-bold">STATUS:</span> Student / Researcher. <br/>
                                <span className="text-neon-magenta font-bold">CURRENT_LOC:</span> Planet Earth.
                            </p>
                            <p>
                                I am fascinated by the patterns hidden within chaos. My journey involves mastering algorithms, statistical analysis, and neural networks to solve real-world problems.
                            </p>
                            <div className="p-4 border border-dashed border-gray-600 bg-black/50 mt-8">
                                <div className="text-sm text-gray-500 mb-2">SKILL_MATRIX_LOADED:</div>
                                <div className="flex flex-wrap gap-2">
                                    {['Python', 'PyTorch', 'TensorFlow', 'SQL', 'Pandas', 'Scikit-learn', 'Data Viz', 'Deep Learning'].map(skill => (
                                        <span key={skill} className="bg-white/10 px-2 py-1 hover:bg-neon-cyan hover:text-black cursor-crosshair transition-colors">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                     </div>
                )}

                {activeNav === NavItem.TERMINAL && (
                    <div className="animate-[scanline_0.5s_ease-out]">
                        <h2 className="text-4xl sm:text-5xl text-neon-cyan mb-2">AI_LINK_ESTABLISHED</h2>
                        <p className="text-gray-400 mb-6">Talk to the digital construct of Vedant.</p>
                        <Terminal />
                    </div>
                )}
            </div>

        </main>

        <footer className="mt-20 border-t border-white/10 pt-6 flex justify-between items-end text-sm text-gray-500 uppercase tracking-widest">
            <div>
                © 2024 ADHANGALE.DEV<br/>
                ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-4">
                <a href="#" className="hover:text-neon-cyan transition-colors">GITHUB</a>
                <a href="#" className="hover:text-neon-cyan transition-colors">KAGGLE</a>
                <a href="#" className="hover:text-neon-cyan transition-colors">LINKEDIN</a>
            </div>
        </footer>
      </div>
    </CRTScreen>
  );
};

export default App;