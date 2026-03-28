/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Shield, 
  Cpu, 
  AlertCircle,
} from 'lucide-react';
import { GameState, LogEntry } from './types';
import { injectGimbucks } from './services/api';
import StatsCard from './components/StatsCard';
import InjectionPanel from './components/InjectionPanel';
import Terminal from './components/Terminal';

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
    addLog('SYSTEM_BOOT: Gimkit Sim-Hack v3.0.0 initialized.', 'info');
    addLog('CONNECTION: Established secure tunnel to local_sim_db.', 'success');
    addLog('WARNING: This is a simulation environment.', 'warning');
  }, []);

  const handleInject = async () => {
    const amount = parseInt(inputValue);
    if (isNaN(amount)) {
      addLog('ERROR: Invalid Gimbuck payload. Must be numeric.', 'error');
      return;
    }

    setIsInjecting(true);
    addLog(`INJECTING: Payload [${amount} Gimbucks] to memory_offset_0x7FF...`, 'info');
    
    try {
      const result = await injectGimbucks(amount);
      
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
    <div className="min-h-screen bg-[#FFF5E4] text-black p-4 md:p-8 selection:bg-black selection:text-white font-dynapuff">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12 border-b-8 border-black pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tight uppercase flex items-center gap-4 drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <Cpu className="w-12 h-12" />
            Gimkit <span className="text-white bg-black px-4 py-1 rounded-2xl ml-1">Sim-Hack</span>
          </h1>
          <p className="text-sm font-black opacity-40 mt-3 uppercase tracking-widest">AUTHORIZED ACCESS ONLY // LOCAL_SIM_MODE_ACTIVE</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-xs font-black uppercase opacity-40 mb-1">Status</p>
            <p className="text-xl font-black flex items-center gap-3 justify-end">
              <span className="w-4 h-4 rounded-full bg-[#6BCB77] border-2 border-black animate-pulse" />
              CONNECTED
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-black uppercase opacity-40 mb-1">Security</p>
            <p className="text-xl font-black flex items-center gap-3 justify-end text-[#FF6B6B]">
              <Shield className="w-6 h-6" />
              BYPASSED
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Stats & Injection */}
        <div className="lg:col-span-5 space-y-10">
          <StatsCard gameState={gameState} />
          <InjectionPanel 
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleInject={handleInject}
            isInjecting={isInjecting}
          />
        </div>

        {/* Right Column: Terminal & Info */}
        <div className="lg:col-span-7 space-y-10">
          <Terminal logs={logs} />

          {/* Warning Footer */}
          <div className="p-8 border-4 border-black bg-[#FF6B6B] rounded-[40px] flex items-start gap-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <AlertCircle className="w-10 h-10 text-white shrink-0" />
            <div>
              <p className="text-xl font-black text-white uppercase tracking-widest">Disclaimer & Security Warning</p>
              <p className="text-sm font-bold text-white/80 leading-relaxed mt-2">
                This application is a conceptual simulation designed for educational purposes and UI demonstration. 
                It does not interact with, modify, or exploit the actual Gimkit platform or its servers. 
                Hacking or exploiting online services is a violation of Terms of Service and can lead to account termination.
              </p>
            </div>
          </div>

          {/* Footer Rail */}
          <footer className="pt-8 border-t-4 border-black flex flex-col md:flex-row justify-between items-center opacity-40 text-xs font-black uppercase tracking-[0.2em] gap-4">
            <span>User: {window.location.hostname}</span>
            <span>Session_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
            <span>Build: 3.0.0.DYNA</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
