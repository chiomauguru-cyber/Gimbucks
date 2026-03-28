/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Zap, 
  Shield, 
  Cpu, 
  Database, 
  Lock, 
  Unlock, 
  TrendingUp, 
  AlertCircle,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface GameState {
  gimbucks: number;
  xp: number;
  level: number;
  isHacked: boolean;
}

interface LogEntry {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}

export default function App() {
  // --- State ---
  const [gameState, setGameState] = useState<GameState>({
    gimbucks: 1250,
    xp: 4500,
    level: 12,
    isHacked: false
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isInjecting, setIsInjecting] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  // --- Helpers ---
  const addLog = (text: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setLogs(prev => [...prev.slice(-15), newLog]);
  };

  useEffect(() => {
    addLog('SYSTEM_BOOT: Gimkit Sim-Hack v2.4.0 initialized.', 'info');
    addLog('CONNECTION: Established secure tunnel to local_sim_db.', 'success');
    addLog('WARNING: This is a simulation environment.', 'warning');
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleInject = async () => {
    const amount = parseInt(inputValue);
    if (isNaN(amount)) {
      addLog('ERROR: Invalid Gimbuck payload. Must be numeric.', 'error');
      return;
    }

    setIsInjecting(true);
    addLog(`INJECTING: Payload [${amount} Gimbucks] to memory_offset_0x7FF...`, 'info');
    
    try {
      // Call the simulated backend API
      const response = await fetch('/api/inject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      
      const result = await response.json();
      
      addLog('BYPASSING: Client-side validation checks...', 'warning');
      await new Promise(r => setTimeout(r, 600));
      
      if (result.success) {
        addLog(`SUCCESS: ${result.message}`, 'success');
        setGameState(prev => ({
          ...prev,
          gimbucks: amount,
          isHacked: true
        }));
      } else {
        addLog('ERROR: Backend injection failed.', 'error');
      }
    } catch (error) {
      addLog('ERROR: Connection to backend lost.', 'error');
    } finally {
      setIsInjecting(false);
      setInputValue('');
    }
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-[#050505] text-[#00FF00] font-mono p-4 md:p-8 selection:bg-[#00FF00] selection:text-black">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8 border-b border-[#00FF00]/30 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-2">
            <Cpu className="w-8 h-8" />
            Gimkit <span className="text-white bg-[#00FF00] px-2 ml-1">Sim-Hack</span>
          </h1>
          <p className="text-xs opacity-60 mt-1">AUTHORIZED ACCESS ONLY // LOCAL_SIM_MODE_ACTIVE</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] uppercase opacity-50">Status</p>
            <p className="text-sm flex items-center gap-2 justify-end">
              <span className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
              CONNECTED
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase opacity-50">Security</p>
            <p className="text-sm flex items-center gap-2 justify-end text-orange-500">
              <Shield className="w-4 h-4" />
              BYPASSED
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Stats */}
        <div className="lg:col-span-4 space-y-6">
          <section className="border border-[#00FF00]/30 p-6 bg-[#0A0A0A] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Database className="w-16 h-16" />
            </div>
            <h2 className="text-xs uppercase tracking-widest mb-6 flex items-center gap-2 opacity-70">
              <Activity className="w-4 h-4" /> Account Metrics
            </h2>
            
            <div className="space-y-8">
              <div>
                <p className="text-[10px] uppercase opacity-50 mb-1">Current Gimbucks</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white tabular-nums">
                    {gameState.gimbucks.toLocaleString()}
                  </span>
                  <Zap className="w-5 h-5 text-[#00FF00]" />
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase opacity-50 mb-1">Experience Points</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold tabular-nums">
                    {gameState.xp.toLocaleString()}
                  </span>
                  <span className="text-xs opacity-40">XP</span>
                </div>
                <div className="w-full h-1 bg-[#1A1A1A] mt-2">
                  <div 
                    className="h-full bg-[#00FF00] transition-all duration-1000" 
                    style={{ width: `${(gameState.xp % 1000) / 10}%` }} 
                  />
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase opacity-50 mb-1">Level</p>
                  <span className="text-3xl font-black italic">LVL {gameState.level}</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase opacity-50 mb-1">Integrity</p>
                  <span className={`text-xs px-2 py-0.5 border ${gameState.isHacked ? 'border-red-500 text-red-500' : 'border-[#00FF00] text-[#00FF00]'}`}>
                    {gameState.isHacked ? 'MODIFIED' : 'ORIGINAL'}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="border border-[#00FF00]/30 p-6 bg-[#0A0A0A]">
            <h2 className="text-xs uppercase tracking-widest mb-4 flex items-center gap-2 opacity-70">
              <Lock className="w-4 h-4" /> Injection Console
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <label className="text-[10px] uppercase opacity-50 block mb-1">Target Gimbuck Value</label>
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter Amount..."
                  className="w-full bg-black border border-[#00FF00]/50 p-3 text-xl focus:outline-none focus:border-[#00FF00] placeholder:opacity-20"
                />
              </div>
              <button 
                onClick={handleInject}
                disabled={isInjecting || !inputValue}
                className={`w-full py-4 font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all
                  ${isInjecting || !inputValue 
                    ? 'bg-[#1A1A1A] text-[#333] cursor-not-allowed' 
                    : 'bg-[#00FF00] text-black hover:bg-white active:scale-[0.98]'}`}
              >
                {isInjecting ? (
                  <>
                    <Activity className="w-5 h-5 animate-spin" />
                    Injecting...
                  </>
                ) : (
                  <>
                    <Unlock className="w-5 h-5" />
                    Set Gimbucks
                  </>
                )}
              </button>
              <p className="text-[9px] leading-tight opacity-40 italic">
                * Note: This tool is for simulation purposes only. It modifies the local state of this dashboard and does not affect real Gimkit servers.
              </p>
            </div>
          </section>
        </div>

        {/* Right Column: Terminal & Visualizer */}
        <div className="lg:col-span-8 space-y-6">
          {/* Terminal */}
          <section className="border border-[#00FF00]/30 bg-black flex flex-col h-[400px]">
            <div className="bg-[#1A1A1A] p-2 flex items-center justify-between border-b border-[#00FF00]/20">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest">System_Logs.log</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
              <AnimatePresence initial={false}>
                {logs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[11px] flex gap-3"
                  >
                    <span className="opacity-30 shrink-0">[{log.timestamp}]</span>
                    <span className={`
                      ${log.type === 'success' ? 'text-[#00FF00]' : ''}
                      ${log.type === 'warning' ? 'text-orange-500' : ''}
                      ${log.type === 'error' ? 'text-red-500' : ''}
                      ${log.type === 'info' ? 'text-blue-400' : ''}
                    `}>
                      <span className="mr-2">{log.type === 'error' ? '✖' : log.type === 'success' ? '✔' : '›'}</span>
                      {log.text}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={logEndRef} />
            </div>
          </section>

          {/* Visualizer Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#00FF00]/30 p-6 bg-[#0A0A0A]">
              <h3 className="text-[10px] uppercase tracking-widest mb-4 opacity-50">Network Traffic</h3>
              <div className="h-24 flex items-end gap-1">
                {[...Array(20)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [20, 80, 40, 60, 20][Math.floor(Math.random() * 5)] }}
                    transition={{ repeat: Infinity, duration: 1 + Math.random(), ease: "easeInOut" }}
                    className="flex-1 bg-[#00FF00]/20 border-t border-[#00FF00]"
                  />
                ))}
              </div>
            </div>
            <div className="border border-[#00FF00]/30 p-6 bg-[#0A0A0A] flex flex-col justify-center items-center text-center">
              <TrendingUp className="w-8 h-8 mb-2 opacity-30" />
              <h3 className="text-[10px] uppercase tracking-widest opacity-50">Simulation Accuracy</h3>
              <p className="text-2xl font-black">99.98%</p>
              <p className="text-[9px] opacity-30 mt-1 uppercase">Local_Host_Sync_Stable</p>
            </div>
          </section>

          {/* Warning Footer */}
          <div className="p-4 border border-red-500/30 bg-red-500/5 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-red-500 uppercase">Disclaimer & Security Warning</p>
              <p className="text-[10px] text-red-500/70 leading-relaxed mt-1">
                This application is a conceptual simulation designed for educational purposes and UI demonstration. 
                It does not interact with, modify, or exploit the actual Gimkit platform or its servers. 
                Hacking or exploiting online services is a violation of Terms of Service and can lead to account termination.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Rail */}
      <footer className="max-w-6xl mx-auto mt-12 pt-4 border-t border-[#00FF00]/10 flex justify-between items-center opacity-30 text-[9px] uppercase tracking-[0.2em]">
        <span>User: {window.location.hostname}</span>
        <span>Session_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
        <span>Build: 2026.03.28.SIM</span>
      </footer>
    </div>
  );
}
