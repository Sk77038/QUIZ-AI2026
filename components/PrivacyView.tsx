
import React, { useEffect } from 'react';
import { 
  ChevronLeft, 
  ShieldCheck, 
  Eye, 
  Cpu, 
  FileText,
  Mail
} from 'lucide-react';

export const PrivacyView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-full bg-white flex flex-col animate-fade-in overflow-y-auto pb-10">
      <header className="p-4 bg-white border-b sticky top-0 z-50 flex items-center gap-4">
        <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-2xl transition-all active:scale-90">
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Privacy & Safety</h1>
      </header>

      <div className="p-6 space-y-8 max-w-md mx-auto w-full">
        <div className="bg-blue-600 p-8 rounded-[3rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
          <ShieldCheck className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
          <h2 className="text-2xl font-black mb-2 leading-tight">Guru's Guarantee</h2>
          <p className="text-blue-100 text-sm font-medium leading-relaxed">
            Master Sahab is built with "Safety First" principles. Your study data belongs only to you.
          </p>
        </div>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500"><FileText size={20} /></div>
            <h3 className="font-black text-gray-800 uppercase tracking-widest text-[10px]">1. Data We Collect</h3>
          </div>
          <div className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100">
             <p className="text-gray-600 text-sm leading-relaxed mb-4 font-bold">
               We collect your Name, Email, and Grade to personalize your experience.
             </p>
             <p className="text-gray-600 text-sm leading-relaxed">
               <strong>Quiz Progress:</strong> We track scores to help you see your growth over time.
             </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500"><Eye size={20} /></div>
            <h3 className="font-black text-gray-800 uppercase tracking-widest text-[10px]">2. Camera Policy</h3>
          </div>
          <div className="p-6 bg-emerald-50/50 rounded-[2.5rem] border border-emerald-100">
             <p className="text-gray-700 text-sm font-bold mb-2">Academic Use Only:</p>
             <p className="text-gray-600 text-xs leading-relaxed font-medium">
               Camera is used ONLY to identify academic questions. We do not store or transmit any personal photos.
             </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500"><Cpu size={20} /></div>
            <h3 className="font-black text-gray-800 uppercase tracking-widest text-[10px]">3. AI Content</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed px-2 font-medium">
            Master Sahab uses <strong>Google Gemini AI</strong> to provide solutions. All content is filtered to be educational.
          </p>
        </section>

        <div className="p-8 bg-blue-50 rounded-[3rem] border-2 border-blue-100 flex flex-col items-center text-center">
          <Mail className="text-blue-600 mb-4" size={32} />
          <h4 className="font-black text-gray-900 mb-1">Need help?</h4>
          <a href="mailto:support@mastersahab.ai" className="text-blue-600 font-black text-sm underline underline-offset-4">support@mastersahab.ai</a>
        </div>

        <div className="text-center pb-12">
          <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.3em]">Master Sahab AI • v3.3 Safe</p>
        </div>
      </div>
    </div>
  );
};
