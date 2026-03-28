import { Zap, Plus } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface GimbuckSetterProps {
  onSet: (amount: number) => void;
}

export default function GimbuckSetter({ onSet }: GimbuckSetterProps) {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const num = parseInt(value);
    if (!isNaN(num)) {
      onSet(num);
      setValue('');
    }
  };

  return (
    <div className="p-8 border-8 border-black bg-white rounded-[60px] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-black rounded-2xl">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight">Gimbuck Injector</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4">
        <input 
          type="number" 
          placeholder="Amount"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 p-4 border-4 border-black rounded-[20px] text-2xl font-black focus:outline-none focus:ring-4 focus:ring-black/5 transition-all placeholder:opacity-20"
        />
        <button 
          type="submit"
          className="p-4 bg-black text-white border-4 border-black rounded-[20px] hover:translate-y-[-2px] active:translate-y-[1px] transition-all"
        >
          <Plus className="w-8 h-8" />
        </button>
      </form>
      <p className="text-[10px] font-black uppercase opacity-40 mt-4 ml-2 tracking-widest">Manual memory override enabled</p>
    </div>
  );
}
