import { Cpu, Shield, Terminal as TerminalIcon, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#FFF5E4] flex flex-col items-center justify-center p-6 font-dynapuff overflow-hidden relative">
      {/* Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#FFD93D] rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#FF6B6B] rounded-full blur-[120px] opacity-30" />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="max-w-2xl w-full text-center z-10"
      >
        <div className="inline-block p-6 bg-black rounded-[40px] mb-8 shadow-[12px_12px_0px_0px_rgba(255,107,107,1)]">
          <Cpu className="w-20 h-20 text-white animate-pulse" />
        </div>

        <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter mb-6 drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          Gimkit <span className="text-[#FF6B6B]">Live</span>
        </h1>
        
        <p className="text-xl md:text-2xl font-black opacity-60 uppercase tracking-widest mb-12 max-w-lg mx-auto leading-relaxed">
          Advanced Game Interception & Memory Modification Utility
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border-4 border-black bg-white rounded-[30px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Shield className="w-8 h-8 mx-auto mb-3 text-[#6BCB77]" />
            <p className="text-[10px] font-black uppercase">Bypass Active</p>
          </div>
          <div className="p-6 border-4 border-black bg-white rounded-[30px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <TerminalIcon className="w-8 h-8 mx-auto mb-3 text-[#4D96FF]" />
            <p className="text-[10px] font-black uppercase">Socket Ready</p>
          </div>
          <div className="p-6 border-4 border-black bg-white rounded-[30px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Zap className="w-8 h-8 mx-auto mb-3 text-[#FFD93D]" />
            <p className="text-[10px] font-black uppercase">Injectors Online</p>
          </div>
        </div>

        <button 
          onClick={onStart}
          className="group relative inline-flex items-center gap-4 px-12 py-8 bg-black text-white text-3xl font-black uppercase tracking-widest rounded-[40px] hover:translate-y-[-8px] hover:shadow-[0px_16px_0px_0px_rgba(255,107,107,1)] active:translate-y-[2px] transition-all"
        >
          Initialize System
          <motion.span
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </button>

        <div className="mt-16 flex justify-center gap-12 opacity-30 text-[10px] font-black uppercase tracking-[0.3em]">
          <span>v4.0.0.LIVE</span>
          <span>Encrypted_Link</span>
          <span>Auth_Bypass</span>
        </div>
      </motion.div>
    </div>
  );
}
