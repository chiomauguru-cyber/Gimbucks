import { Activity, Lock, Unlock } from 'lucide-react';

interface InjectionPanelProps {
  inputValue: string;
  setInputValue: (val: string) => void;
  handleInject: () => void;
  isInjecting: boolean;
}

export default function InjectionPanel({ 
  inputValue, 
  setInputValue, 
  handleInject, 
  isInjecting 
}: InjectionPanelProps) {
  return (
    <section className="border-4 border-black p-8 bg-[#4D96FF] rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-sm uppercase font-black mb-6 flex items-center gap-3 text-white/80">
        <Lock className="w-5 h-5" /> Injection Console
      </h2>
      <div className="space-y-6">
        <div className="relative">
          <label className="text-xs uppercase font-black text-white/60 block mb-2">Target Gimbuck Value</label>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter Amount..."
            className="w-full bg-white border-4 border-black p-5 text-3xl font-black rounded-2xl focus:outline-none focus:ring-4 focus:ring-black/20 placeholder:opacity-20 text-black"
          />
        </div>
        <button 
          onClick={handleInject}
          disabled={isInjecting || !inputValue}
          className={`w-full py-6 font-black uppercase tracking-widest text-2xl rounded-3xl border-4 border-black flex items-center justify-center gap-3 transition-all shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[6px]
            ${isInjecting || !inputValue 
              ? 'bg-white/20 text-white/40 cursor-not-allowed border-white/20 shadow-none translate-y-[6px]' 
              : 'bg-[#6BCB77] text-black hover:bg-white'}`}
        >
          {isInjecting ? (
            <>
              <Activity className="w-8 h-8 animate-spin" />
              Injecting...
            </>
          ) : (
            <>
              <Unlock className="w-8 h-8" />
              Set Gimbucks
            </>
          )}
        </button>
        <p className="text-[10px] leading-tight font-bold text-white/60 italic text-center">
          * Note: This tool is for simulation purposes only. It modifies the local state of this dashboard and does not affect real Gimkit servers.
        </p>
      </div>
    </section>
  );
}
