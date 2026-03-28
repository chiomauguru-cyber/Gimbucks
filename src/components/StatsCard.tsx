import { Activity, Database, Zap, Globe } from 'lucide-react';
import { GameState } from '../types';

interface StatsCardProps {
  gameState: GameState;
}

export default function StatsCard({ gameState }: StatsCardProps) {
  return (
    <section className="border-4 border-black p-8 bg-[#FFD93D] rounded-[40px] relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Database className="w-24 h-24 text-black" />
      </div>
      <h2 className="text-sm uppercase font-black mb-8 flex items-center gap-3 text-black/60">
        <Activity className="w-5 h-5" /> Account & Game Metrics
      </h2>
      
      <div className="space-y-10">
        <div>
          <p className="text-xs uppercase font-black opacity-40 mb-2">Current Gimbucks</p>
          <div className="flex items-center gap-3">
            <span className="text-6xl font-black text-black tabular-nums drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">
              {gameState.gimbucks.toLocaleString()}
            </span>
            <Zap className="w-8 h-8 text-black" fill="black" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase font-black opacity-40 mb-2">Experience</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-black tabular-nums">{gameState.xp.toLocaleString()}</span>
              <span className="text-[10px] font-black opacity-40">XP</span>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase font-black opacity-40 mb-2">Level</p>
            <span className="text-2xl font-black italic text-black">LVL {gameState.level}</span>
          </div>
        </div>

        {gameState.liveGame ? (
          <>
            <div>
              <p className="text-xs uppercase font-black opacity-40 mb-2">Connected Game</p>
              <div className="flex items-center gap-3">
                <span className="text-6xl font-black text-black tabular-nums drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">
                  {gameState.liveGame.gameCode}
                </span>
                <Globe className="w-8 h-8 text-black" />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase font-black opacity-40 mb-2">Game Mode</p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-black uppercase">
                  {gameState.liveGame.type}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs uppercase font-black opacity-40 mb-2">Kit ID</p>
                <span className="text-sm font-black italic text-black font-mono">{gameState.liveGame.kitId}</span>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase font-black opacity-40 mb-2">Status</p>
                <span className={`text-sm px-4 py-1 border-4 font-black rounded-full border-black text-black bg-white`}>
                  {gameState.liveGame.active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="py-20 text-center opacity-40">
            <p className="text-xl font-black uppercase tracking-widest">No Live Data</p>
            <p className="text-xs font-bold mt-2">Connect to a game to intercept metrics</p>
          </div>
        )}
      </div>
    </section>
  );
}
