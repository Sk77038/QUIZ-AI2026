
import React, { useEffect } from 'react';
import { 
  ChevronLeft, 
  ShieldCheck, 
  Eye, 
  Cpu, 
  UserPlus, 
  Trash2, 
  Baby, 
  FileText,
  Mail
} from 'lucide-react';

export const PrivacyView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  // Ensure the scroll starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col animate-slide-in pb-32">
      <header className="p-4 bg-white border-b sticky top-0 z-50 flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-90">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-black text-gray-900">Privacy & Safety</h1>
      </header>

      <div className="p-6 space-y-8 overflow-y-auto">
        <div className="bg-blue-600 p-8 rounded-[3rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
          <ShieldCheck className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
          <h2 className="text-2xl font-black mb-2 relative z-10">Guru's Guarantee</h2>
          <p className="text-blue-100 text-sm font-medium leading-relaxed relative z-10">
            Master Sahab is built with "Safety First" principles. We never sell your study data.
          </p>
        </div>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500"><FileText size={20} /></div>
            <h3 className="font-black text-gray-800 uppercase tracking-widest text-[10px]">1. Data We Collect</h3>
          </div>
          <div className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100">
             <p className="text-gray-600 text-sm leading-relaxed mb-4">
               We collect your <strong>Name, Email, and Grade</strong> to personalize the AI tutoring experience.
             </p>
             <p className="text-gray-600 text-sm leading-relaxed">
               <strong>Quiz Data:</strong> We track scores and XP to help you level up and see your progress.
             </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500"><Eye size={20} /></div>
            <h3 className="font-black text-gray-800 uppercase tracking-widest text-[10px]">2. Camera Use</h3>
          </div>
          <div className="p-6 bg-emerald-50/50 rounded-[2.5rem] border border-emerald-100">
             <p className="text-gray-700 text-sm font-bold mb-2">Homework Scanner:</p>
             <p className="text-gray-600 text-xs leading-relaxed">
               Camera is used ONLY to identify academic questions. Images are NOT saved in our cloud or your gallery by this app. Everything is processed in real-time.
             </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500"><Cpu size={20} /></div>
            <h3 className="font-black text-gray-800 uppercase tracking-widest text-[10px]">3. AI Policy</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed px-2">
            Master Sahab uses <strong>Google Gemini AI</strong>. We follow strict educational guidelines to ensure content is appropriate for all students (Grades 6-12). No data is shared for behavioral advertising.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500"><Trash2 size={20} /></div>
            <h3 className="font-black text-gray-800 uppercase tracking-widest text-[10px]">4. Your Rights</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed px-2">
            You can delete your local study data anytime by logging out or resetting your profile in the settings menu. For full account deletion, please contact support.
          </p>
        </section>

        <div className="p-8 bg-blue-50 rounded-[3rem] border-2 border-blue-100 flex flex-col items-center text-center">
          <Mail className="text-blue-600 mb-4" size={32} />
          <h4 className="font-black text-gray-900 mb-1">Need help?</h4>
          <p className="text-gray-500 text-xs mb-4">Contact our Safety Officer</p>
          <a href="mailto:support@mastersahab.ai" className="text-blue-600 font-black text-sm underline underline-offset-4">support@mastersahab.ai</a>
        </div>

        <div className="text-center pb-10">
          <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.3em]">Master Sahab AI • Safety Suite</p>
        </div>
      </div>
    </div>
  );
};
