
import React, { useState, useEffect } from 'react';
import { View, Language, UserProfile } from './types';
import { NAV_ITEMS, TRANSLATIONS } from './constants';
import { QuizView } from './components/QuizView';
import { CameraView } from './components/CameraView';
import { LoginView } from './components/LoginView';
import { Sidebar } from './components/Sidebar';
import { authService } from './components/services/authService';
import { solveQuestion } from './components/services/geminiService';
// Added missing HelpCircle and Camera imports
import { Brain, Menu, Trophy, Star, ChevronLeft, WifiOff, Send, Loader2, Languages, HelpCircle, Camera } from 'lucide-react';

const App: React.FC = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [isSolverLoading, setIsSolverLoading] = useState(false);
  const [solveResult, setSolveResult] = useState("");
  const [solvePrompt, setSolvePrompt] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(authService.getUser());

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    setTimeout(() => setIsAppLoading(false), 1500);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const handleSolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!solvePrompt.trim() || isSolverLoading) return;
    if (!isOnline) { setSolveResult(t.apiError); return; }
    setIsSolverLoading(true);
    setSolveResult("");
    try {
      const res = await solveQuestion(solvePrompt, language);
      setSolveResult(res);
    } catch (err) {
      setSolveResult(t.apiError);
    } finally {
      setIsSolverLoading(false);
    }
  };

  if (isAppLoading) {
    return (
      <div className="fixed inset-0 bg-blue-600 flex flex-col items-center justify-center z-[100] text-white">
        <Brain size={80} className="animate-bounce mb-6" />
        <h1 className="text-4xl font-black tracking-tighter">MASTER SAHAB</h1>
        <div className="mt-8 w-40 h-1 bg-blue-700 rounded-full overflow-hidden">
          <div className="h-full bg-white w-1/2 animate-[loading_1.5s_infinite_linear]" />
        </div>
      </div>
    );
  }

  if (!user) return <LoginView onLogin={u => { authService.saveUser(u); setUser(u); }} />;

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return (
          <div className="p-4 space-y-6 animate-slide-in pb-28">
            {!isOnline && (
              <div className="bg-amber-100 border border-amber-200 p-3 rounded-2xl flex items-center justify-center gap-2 text-amber-800 text-[10px] font-black uppercase tracking-widest">
                <WifiOff size={14} /> {t.offlineMode}
              </div>
            )}
            <header className="flex justify-between items-center py-2">
              <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-700"><Menu size={24} /></button>
              <button onClick={() => setLanguage(l => l === Language.EN ? Language.HI : Language.EN)} className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-[10px] font-black flex items-center gap-2"><Languages size={14}/> {language.toUpperCase()}</button>
            </header>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
               <Trophy size={160} className="absolute -right-8 -bottom-8 opacity-10 rotate-12" />
               <p className="text-[10px] font-black opacity-70 uppercase tracking-widest">Scholar Profile</p>
               <h2 className="text-2xl font-black mb-4">Level {user.level}</h2>
               <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl inline-flex items-center gap-2 text-xs font-black">
                 <Star size={14} fill="white" /> {user.score} XP
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setCurrentView(View.QUIZ)} className="bg-blue-600 p-6 rounded-[2.5rem] text-white flex flex-col gap-4 shadow-xl shadow-blue-100 active:scale-95 transition-all">
                <HelpCircle size={32} />
                <span className="font-black text-lg text-left leading-tight">{t.startQuiz}</span>
              </button>
              <button onClick={() => setCurrentView(View.SOLVE)} className="bg-white border-2 border-gray-100 p-6 rounded-[2.5rem] text-gray-900 flex flex-col gap-4 active:scale-95 transition-all">
                <Brain size={32} className="text-blue-600" />
                <span className="font-black text-lg text-left leading-tight">AI Guru Solver</span>
              </button>
            </div>

            <button onClick={() => setCurrentView(View.CAMERA)} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 p-7 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl active:scale-95 transition-all">
               <div className="text-left"><p className="text-[10px] font-black opacity-80 uppercase tracking-widest">Scanner Mode</p><span className="text-2xl font-black">{t.cameraSolve}</span></div>
               <Camera size={40} className="opacity-40" />
            </button>
          </div>
        );
      case View.QUIZ: return <QuizView language={language} onComplete={() => {}} onExit={() => setCurrentView(View.HOME)} />;
      case View.SOLVE: return (
        <div className="p-4 flex flex-col gap-6 animate-slide-in pb-20">
          <header className="flex items-center gap-4 mt-2">
             <button onClick={() => setCurrentView(View.HOME)} className="p-3 bg-white rounded-2xl border border-gray-100"><ChevronLeft size={24} /></button>
             <h2 className="text-xl font-black">Study Solver</h2>
          </header>
          <form onSubmit={handleSolve} className="relative">
            <textarea value={solvePrompt} onChange={e => setSolvePrompt(e.target.value)} placeholder={t.solvePrompt} className="w-full h-64 p-6 rounded-[2.5rem] border-2 border-gray-100 focus:border-blue-500 outline-none resize-none bg-white text-lg font-bold transition-all shadow-sm" />
            <button type="submit" disabled={isSolverLoading} className="absolute bottom-6 right-6 bg-blue-600 text-white p-5 rounded-3xl shadow-xl shadow-blue-200 disabled:opacity-50 active:scale-90">
              {isSolverLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
            </button>
          </form>
          {solveResult && (
            <div className="p-8 rounded-[2.5rem] bg-white border border-blue-50 shadow-sm animate-slide-in">
              <p className="text-[10px] font-black text-blue-600 uppercase mb-4 tracking-widest">Master Sahab Solution</p>
              <div className="prose prose-sm whitespace-pre-wrap font-bold text-gray-700 leading-relaxed">{solveResult}</div>
            </div>
          )}
        </div>
      );
      case View.CAMERA: return <CameraView language={language} onBack={() => setCurrentView(View.HOME)} />;
      case View.PROFILE: return (
        <div className="p-4 flex flex-col gap-6 animate-slide-in">
          <header className="flex items-center gap-4 mt-2">
             <button onClick={() => setCurrentView(View.HOME)} className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm"><ChevronLeft size={24} /></button>
             <h2 className="text-xl font-black">My Scholar Profile</h2>
          </header>
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 text-center shadow-sm">
            <div className="w-24 h-24 bg-blue-600 rounded-[2rem] mx-auto flex items-center justify-center text-white text-3xl font-black mb-6 shadow-xl border-4 border-white">{user.name.charAt(0)}</div>
            <h2 className="text-2xl font-black text-gray-900">{user.name}</h2>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Class {user.class} Scholar</p>
          </div>
          <button onClick={() => { authService.logout(); setUser(null); }} className="w-full p-6 bg-red-50 text-red-600 font-black rounded-3xl border border-red-100">Logout Account</button>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FAFAFA] relative overflow-hidden flex flex-col">
      <Sidebar user={user} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={setCurrentView} onLogout={() => { authService.logout(); setUser(null); }} />
      <main className="flex-1 overflow-y-auto pt-safe">{renderContent()}</main>
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-2xl border-t border-gray-50 flex justify-around items-center py-5 z-40 px-4 rounded-t-[2.5rem] shadow-2xl">
        {NAV_ITEMS.map((item) => (
          <button key={item.id} onClick={() => setCurrentView(item.id as View)} className={`flex flex-col items-center gap-1 transition-all ${currentView === item.id ? 'text-blue-600 scale-110' : 'text-gray-300'}`}>
            {item.icon}
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
