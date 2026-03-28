import { Search, Loader2 } from 'lucide-react';

interface LiveConnectorProps {
  gameCode: string;
  setGameCode: (val: string) => void;
  handleConnect: () => void;
  isConnecting: boolean;
}

export default function LiveConnector({ gameCode, setGameCode, handleConnect, isConnecting }: LiveConnectorProps) {
  return (
    <div className="p-10 border-8 border-black bg-white rounded-[60px] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-black rounded-2xl">
          <Search className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight">Game Intercept</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black uppercase opacity-40 mb-3 ml-2 tracking-widest">Enter Game Code</label>
          <input 
            type="text" 
            placeholder="000000"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value.toUpperCase())}
            className="w-full p-6 border-4 border-black rounded-[30px] text-3xl font-black tracking-[0.2em] text-center focus:outline-none focus:ring-4 focus:ring-black/5 transition-all placeholder:opacity-20"
          />
        </div>

        <button 
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full p-8 bg-black text-white border-4 border-black font-black text-2xl uppercase tracking-widest rounded-[30px] hover:translate-y-[-4px] hover:shadow-[0px_8px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin" />
              Intercepting...
            </>
          ) : (
            'Connect to Live'
          )}
        </button>
      </div>
    </div>
  );
}
