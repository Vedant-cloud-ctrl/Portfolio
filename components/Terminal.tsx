import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import GlitchText from './GlitchText';

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'INITIALIZING C.K. PROTOCOL v1.0...' },
    { role: 'model', text: 'READY. TYPE "HELP" FOR COMMANDS OR ASK ME ANYTHING ABOUT CHRISTIAN.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Format history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await sendMessageToGemini(userMsg, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto border-2 border-neon-cyan/50 bg-black/80 backdrop-blur-sm p-4 mt-12 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
      <div className="flex justify-between items-center border-b border-neon-cyan/30 pb-2 mb-4">
        <span className="text-neon-cyan text-sm sm:text-lg">TERMINAL_RELAY_01</span>
        <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-neon-cyan/50"></div>
            <div className="w-3 h-3 rounded-full bg-neon-magenta/50"></div>
        </div>
      </div>

      <div className="h-64 sm:h-80 overflow-y-auto mb-4 font-mono text-sm sm:text-base space-y-2 pr-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`${msg.role === 'user' ? 'text-neon-magenta text-right' : 'text-neon-cyan text-left'}`}>
            <span className="opacity-50 text-xs mr-2">[{msg.role === 'user' ? 'USR' : 'SYS'}]</span>
            {msg.text}
          </div>
        ))}
        {isLoading && (
            <div className="text-neon-cyan animate-pulse">
                <span className="opacity-50 text-xs mr-2">[SYS]</span>
                PROCESSING...
            </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2 items-center border-t border-neon-cyan/30 pt-4">
        <span className="text-neon-green animate-pulse">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-white/30"
          placeholder="ENTER COMMAND OR QUESTION..."
          autoFocus
        />
        <button 
            type="submit"
            disabled={isLoading}
            className="px-4 py-1 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors text-sm uppercase"
        >
            EXECUTE
        </button>
      </form>
    </div>
  );
};

export default Terminal;