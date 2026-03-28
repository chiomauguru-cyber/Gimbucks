import { BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { GimkitKitInfo } from '../types';

interface KitViewerProps {
  kit: GimkitKitInfo;
}

export default function KitViewer({ kit }: KitViewerProps) {
  return (
    <div className="p-10 border-8 border-black bg-white rounded-[60px] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] h-[800px] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-black rounded-2xl">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight">Decoded Kit</h2>
            <p className="text-sm font-black opacity-40 uppercase tracking-widest">{kit.name}</p>
          </div>
        </div>
        <div className="bg-[#6BCB77] border-4 border-black px-6 py-2 rounded-2xl font-black text-sm uppercase tracking-widest">
          {kit.questions.length} Questions
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 space-y-6 custom-scrollbar">
        {kit.questions.map((q, idx) => (
          <div key={q._id} className="p-8 border-4 border-black bg-[#FFF5E4] rounded-[40px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-4 mb-6">
              <span className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center font-black shrink-0">
                {idx + 1}
              </span>
              <h3 className="text-xl font-black leading-tight">{q.text}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q.answers.map((a) => (
                <div 
                  key={a._id}
                  className={`p-4 border-4 border-black rounded-2xl flex items-center gap-3 transition-all ${a.correct ? 'bg-[#6BCB77] text-white' : 'bg-white opacity-60'}`}
                >
                  {a.correct ? (
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 shrink-0" />
                  )}
                  <span className="font-bold text-sm">{a.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
