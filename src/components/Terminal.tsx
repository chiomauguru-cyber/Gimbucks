import { Terminal as TerminalIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LogEntry } from '../types';
import { useEffect, useRef } from 'react';

interface TerminalProps {
  logs: LogEntry[];
}

export default function Terminal({ logs }: TerminalProps) {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <section className="border-4 border-black bg-black flex flex-col h-[300px] rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="bg-[#222] p-3 flex items-center justify-between border-b-4 border-black">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-5 h-5 text-white" />
          <span className="text-sm font-bold text-white uppercase tracking-widest">System_Logs.log</span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF6B6B]" />
          <div className="w-3 h-3 rounded-full bg-[#FFD93D]" />
          <div className="w-3 h-3 rounded-full bg-[#6BCB77]" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-1 font-mono">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[12px] flex gap-3"
            >
              <span className="opacity-40 shrink-0">[{log.timestamp}]</span>
              <span className={`
                ${log.type === 'success' ? 'text-[#6BCB77]' : ''}
                ${log.type === 'warning' ? 'text-[#FFD93D]' : ''}
                ${log.type === 'error' ? 'text-[#FF6B6B]' : ''}
                ${log.type === 'info' ? 'text-[#4D96FF]' : ''}
              `}>
                <span className="mr-2 font-bold">{log.type === 'error' ? '✖' : log.type === 'success' ? '✔' : '›'}</span>
                {log.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={logEndRef} />
      </div>
    </section>
  );
}
