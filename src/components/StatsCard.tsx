import { Activity, Database, Zap } from 'lucide-react';
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
        <Activity className="w-5 h-5" /> Account Metrics
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

        <div>
          <p className="text-xs uppercase font-black opacity-40 mb-2">Experience Points</p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-black tabular-nums">
              {gameState.xp.toLocaleString()}
            </span>
            <span className="text-sm font-black opacity-40">XP</span>
          </div>
          <div className="w-full h-4 bg-black/10 rounded-full mt-3 overflow-hidden border-2 border-black">
            <div 
              className="h-full bg-black transition-all duration-1000" 
              style={{ width: `${(gameState.xp % 1000) / 10}%` }} 
            />
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs uppercase font-black opacity-40 mb-2">Level</p>
            <span className="text-4xl font-black italic text-black">LVL {gameState.level}</span>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase font-black opacity-40 mb-2">Integrity</p>
            <span className={`text-sm px-4 py-1 border-4 font-black rounded-full ${gameState.isHacked ? 'border-[#FF6B6B] text-[#FF6B6B] bg-white' : 'border-black text-black bg-white'}`}>
              {gameState.isHacked ? 'MODIFIED' : 'ORIGINAL'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
