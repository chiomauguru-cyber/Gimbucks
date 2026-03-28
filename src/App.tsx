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
  Search,
  BookOpen
} from 'lucide-react';
import { GameState, LogEntry } from './types';
import { fetchGameInfo, fetchKitInfo } from './services/api';
import StatsCard from './components/StatsCard';
import LiveConnector from './components/LiveConnector';
import GimbuckSetter from './components/GimbuckSetter';
import Terminal from './components/Terminal';
import KitViewer from './components/KitViewer';
import LandingPage from './components/LandingPage';

export default function App() {
  // --- State ---
  const [isInitialized, setIsInitialized] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    gimbucks: 0,
    xp: 0,
    level: 0,
    isHacked: false
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [gameCode, setGameCode] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [view, setView] = useState<'stats' | 'kit'>('stats');

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
    if (isInitialized) {
      addLog('SYSTEM_BOOT: Gimkit Live Tool v4.0.0 initialized.', 'info');
      addLog('NETWORK: Ready for live game interception.', 'success');
      addLog('MODE: LIVE_MODE_ACTIVE', 'warning');
    }
  }, [isInitialized]);

  const handleSetGimbucks = (amount: number) => {
    addLog(`INJECTING: Payload [${amount} Gimbucks] to memory_offset_0x7FF...`, 'info');
    setGameState(prev => ({ ...prev, gimbucks: amount, isHacked: true }));
    addLog(`SUCCESS: Memory modified. New Gimbuck balance: ${amount}`, 'success');
  };

  const handleConnect = async () => {
    if (!gameCode || gameCode.length < 5) {
      addLog('ERROR: Invalid Game Code format.', 'error');
      return;
    }

    setIsConnecting(true);
    addLog(`INTERCEPTING: Handshake with Gimkit server for code [${gameCode}]...`, 'info');
    
    try {
      // 1. Fetch Game Info
      const gameData = await fetchGameInfo(gameCode);
      addLog(`FOUND: Game type [${gameData.type}] detected. Kit ID: ${gameData.kitId}`, 'success');
      
      // 2. Fetch Kit Info
      addLog(`DECODING: Fetching question database for Kit [${gameData.kitId}]...`, 'info');
      const kitData = await fetchKitInfo(gameData.kitId);
      addLog(`SUCCESS: Decoded ${kitData.questions.length} questions from "${kitData.name}".`, 'success');

      setGameState(prev => ({
        ...prev,
        isHacked: true,
        liveGame: gameData,
        kit: kitData
      }));
      
      setView('kit');
    } catch (error) {
      addLog('ERROR: Failed to intercept game. Code may be invalid or expired.', 'error');
    } finally {
      setIsConnecting(false);
    }
  };

  // --- Render ---
  if (!isInitialized) {
    return <LandingPage onStart={() => setIsInitialized(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#FFF5E4] text-black p-4 md:p-8 selection:bg-black selection:text-white font-dynapuff">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12 border-b-8 border-black pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tight uppercase flex items-center gap-4 drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <Cpu className="w-12 h-12" />
            Gimkit <span className="text-white bg-black px-4 py-1 rounded-2xl ml-1">Live-Tool</span>
          </h1>
          <p className="text-sm font-black opacity-40 mt-3 uppercase tracking-widest">AUTHORIZED ACCESS ONLY // LIVE_INTERCEPT_ACTIVE</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-xs font-black uppercase opacity-40 mb-1">Status</p>
            <p className="text-xl font-black flex items-center gap-3 justify-end">
              <span className={`w-4 h-4 rounded-full border-2 border-black animate-pulse ${gameState.isHacked ? 'bg-[#6BCB77]' : 'bg-gray-400'}`} />
              {gameState.isHacked ? 'INTERCEPTED' : 'IDLE'}
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
        
        {/* Left Column: Controls */}
        <div className="lg:col-span-5 space-y-10">
          <LiveConnector 
            gameCode={gameCode}
            setGameCode={setGameCode}
            handleConnect={handleConnect}
            isConnecting={isConnecting}
          />

          <GimbuckSetter onSet={handleSetGimbucks} />
          
          {gameState.kit && (
            <div className="flex gap-4">
              <button 
                onClick={() => setView('stats')}
                className={`flex-1 p-6 border-4 border-black font-black uppercase tracking-widest rounded-[30px] transition-all flex items-center justify-center gap-3 ${view === 'stats' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                <Search className="w-6 h-6" />
                Stats
              </button>
              <button 
                onClick={() => setView('kit')}
                className={`flex-1 p-6 border-4 border-black font-black uppercase tracking-widest rounded-[30px] transition-all flex items-center justify-center gap-3 ${view === 'kit' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                <BookOpen className="w-6 h-6" />
                Answers
              </button>
            </div>
          )}

          {view === 'stats' && <StatsCard gameState={gameState} />}
        </div>

        {/* Right Column: Terminal & Kit Viewer */}
        <div className="lg:col-span-7 space-y-10">
          {view === 'kit' && gameState.kit ? (
            <KitViewer kit={gameState.kit} />
          ) : (
            <Terminal logs={logs} />
          )}

          {/* Warning Footer */}
          <div className="p-8 border-4 border-black bg-[#FF6B6B] rounded-[40px] flex items-start gap-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <AlertCircle className="w-10 h-10 text-white shrink-0" />
            <div>
              <p className="text-xl font-black text-white uppercase tracking-widest">Live Mode Disclaimer</p>
              <p className="text-sm font-bold text-white/80 leading-relaxed mt-2">
                This tool connects to real Gimkit data for educational analysis. 
                Interfering with live games is a violation of Gimkit's Terms of Service. 
                Use responsibly and only in games you are authorized to participate in.
              </p>
            </div>
          </div>

          {/* Footer Rail */}
          <footer className="pt-8 border-t-4 border-black flex flex-col md:flex-row justify-between items-center opacity-40 text-xs font-black uppercase tracking-[0.2em] gap-4">
            <span>User: {window.location.hostname}</span>
            <span>Live_Socket: {gameState.isHacked ? 'ACTIVE' : 'READY'}</span>
            <span>Build: 4.0.0.LIVE</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
