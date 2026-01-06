
import React, { useState, useEffect, useCallback } from 'react';
import { View, Language, UserProfile } from './types';
import { NAV_ITEMS, TRANSLATIONS } from './constants';
import { QuizView } from './components/QuizView';
import { CameraView } from './components/CameraView';
import { LoginView } from './components/LoginView';
import { Sidebar } from './components/Sidebar';
import { PrivacyView } from './components/PrivacyView';
import { CalculatorView } from './components/CalculatorView';
import { authService } from './components/services/authService';
import { solveQuestion } from './components/services/geminiService';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Brain, Menu, Trophy, Star, ChevronLeft, WifiOff, Loader2, Languages, Sparkles, BookOpen, Award, ShieldCheck, Camera, Send } from 'lucide-react';

// Sound utility for interactive feel
const playClickSound = () => {
  try {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.2;
    audio.play();
  } catch (e) {
    console.debug('Audio play blocked');
  }
};

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
    const timer = setTimeout(() => setIsAppLoading(false), 1800);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
      clearTimeout(timer);
    };
  }, []);

  // Professional Navigation with Sound & Haptics
  const navigateTo = useCallback(async (view: View) => {
    playClickSound();
    try { await Haptics.impact({ style: ImpactStyle.Light }); } catch(e){}
    
    setCurrentView(view);
    setIsSidebarOpen(false);
    
    // Smooth transition scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!solvePrompt.trim() || isSolverLoading) return;
    
    playClickSound();
    setIsSolverLoading(true);
    setSolveResult("");
    
    try {
      const res = await solveQuestion(solvePrompt, language);
      setSolveResult(res || "");
      try { await Haptics.notification({ type: ImpactStyle.Medium }); } catch(e){}
    } catch (err) {
      setSolveResult(t.apiError);
    } finally {
      setIsSolverLoading(false);
    }
  };

  if (isAppLoading) {
    return (
      <div className="fixed inset-0 bg-blue-600 flex flex-col items-center justify-center z-[100] text-white">
        <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-blue-600 shadow-2xl animate-bounce mb-6">
          <Brain size={50} />
        </div>
        <div className="animate-fade-in text-center">
          <h1 className="text-3xl font-black tracking-tighter">MASTER SAHAB AI</h1>
          <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.3em] mt-2">v3.2 Premium Edition</p>
        </div>
      </div>
    );
  }

  if (!user) return <LoginView onLogin={u => { authService.saveUser(u); setUser(u); }} />;

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return (
          <div className="p-4 space-y-6 animate-slide-in pb-32">
            <header className="flex justify-between items-center py-2 px-2">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setIsSidebarOpen(true); playClickSound(); }} 
                  className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-700 active:scale-90 active:bg-gray-50 transition-all"
                >
                  <Menu size={24} />
                </button>
                <div>
                  <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{t.welcome}</h2>
                  <p className="text-xl font-black text-gray-900 leading-tight">{user.name.split(' ')[0]}</p>
                </div>
              </div>
              <button 
                onClick={() => { setLanguage(l => l === Language.EN ? Language.HI : Language.EN); playClickSound(); }} 
                className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-[10px] font-black flex items-center gap-2 shadow-lg shadow-blue-100 active:scale-95 transition-transform"
              >
                <Languages size={14}/> {language.toUpperCase()}
              </button>
            </header>

            {!isOnline && (
              <div className="bg-amber-100 border-2 border-amber-200/50 p-3 rounded-2xl flex items-center justify-center gap-2 text-amber-800 text-[10px] font-black uppercase tracking-widest animate-pulse">
                <WifiOff size={14} /> {t.offlineMode}
              </div>
            )}

            <div className="bg-gradient-to-br from-[#2563eb] to-[#4338ca] p-6 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
               <Trophy size={160} className="absolute -right-10 -bottom-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
               <div className="flex justify-between items-start relative z-10">
                 <div>
                   <p className="text-[10px] font-black opacity-70 uppercase tracking-widest mb-1">Scholar Tier</p>
                   <h2 className="text-3xl font-black">Level {user.level}</h2>
                 </div>
                 <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-black border border-white/20">
                   <Star size={14} fill="white" className="text-white" /> {user.score} XP
                 </div>
               </div>
               <div className="mt-8 w-full h-2 bg-white/20 rounded-full overflow-hidden relative z-10">
                 <div className="h-full bg-white shadow-[0_0_10px_white] transition-all duration-1000" style={{ width: '45%' }} />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => navigateTo(View.QUIZ)} className="bg-white border-2 border-gray-50 p-6 rounded-[2.5rem] text-gray-900 flex flex-col gap-4 shadow-xl shadow-gray-200/30 active:scale-95 active:bg-blue-50/20 transition-all hover:border-blue-100">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><BookOpen size={28} /></div>
                <span className="font-black text-lg text-left leading-tight">{t.startQuiz}</span>
              </button>
              <button onClick={() => navigateTo(View.SOLVE)} className="bg-white border-2 border-gray-50 p-6 rounded-[2.5rem] text-gray-900 flex flex-col gap-4 shadow-xl shadow-gray-200/30 active:scale-95 active:bg-amber-50/20 transition-all hover:border-amber-100">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center"><Brain size={28} /></div>
                <span className="font-black text-lg text-left leading-tight">{t.aiSolver}</span>
              </button>
            </div>

            <button onClick={() => navigateTo(View.CAMERA)} className="w-full bg-white border-2 border-gray-50 p-6 rounded-[2.5rem] text-gray-900 flex items-center justify-between shadow-xl shadow-gray-200/30 active:scale-95 transition-all group overflow-hidden relative">
               <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 transition-transform group-active:scale-150" />
               <div className="flex items-center gap-4 relative z-10">
                 <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-[1.5rem] flex items-center justify-center transition-transform group-hover:scale-110"><Camera size={30} /></div>
                 <div className="text-left">
                   <p className="text-lg font-black">{t.cameraSolve}</p>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Snap & Solve Instant</p>
                 </div>
               </div>
               <ChevronLeft size={20} className="text-gray-200 rotate-180 relative z-10" />
            </button>

            <div className="pt-6 border-t border-gray-100 flex flex-col items-center gap-2">
               <button 
                onClick={() => navigateTo(View.PRIVACY)} 
                className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors p-3 bg-gray-50 rounded-2xl border border-gray-100 active:scale-95"
               >
                 <ShieldCheck size={14} className="text-blue-600" /> View Privacy Policy
               </button>
               <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">Master Sahab Suite v3.2</p>
            </div>
          </div>
        );
      case View.QUIZ: return <QuizView language={language} onComplete={() => {}} onExit={() => navigateTo(View.HOME)} />;
      case View.SOLVE: return (
        <div className="p-4 flex flex-col gap-6 animate-slide-in pb-20 h-full">
          <header className="flex items-center gap-4 mt-2 px-2">
             <button onClick={() => navigateTo(View.HOME)} className="p-3 bg-white rounded-2xl border-2 border-gray-50 shadow-sm active:scale-90"><ChevronLeft size={24} /></button>
             <h2 className="text-xl font-black">Study Guru AI</h2>
          </header>
          <div className="bg-white p-5 rounded-[2.5rem] border-2 border-gray-50 shadow-sm flex flex-col gap-4 flex-1">
            <textarea 
              value={solvePrompt} 
              onChange={e => setSolvePrompt(e.target.value)} 
              placeholder={t.solvePrompt} 
              className="w-full flex-1 p-4 rounded-3xl border-2 border-transparent focus:border-blue-50 outline-none resize-none bg-gray-50 text-base font-bold transition-all" 
            />
            <button 
              onClick={handleSolve} 
              disabled={isSolverLoading} 
              className="bg-blue-600 text-white p-5 rounded-[1.5rem] font-black shadow-xl shadow-blue-100 disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-3 transition-transform"
            >
              {isSolverLoading ? <Loader2 className="animate-spin" size={24} /> : <><Sparkles size={24} /> Solve Question</>}
            </button>
          </div>
          {solveResult && (
            <div className="p-8 rounded-[2.5rem] bg-white border-2 border-blue-50 shadow-sm animate-pop mb-4">
              <p className="text-[10px] font-black text-blue-600 uppercase mb-4 tracking-widest flex items-center gap-2"><Award size={14} /> Master Sahab Answer</p>
              <div className="prose prose-sm whitespace-pre-wrap font-bold text-gray-800 leading-relaxed text-sm">{solveResult}</div>
            </div>
          )}
        </div>
      );
      case View.CAMERA: return <CameraView language={language} onBack={() => navigateTo(View.HOME)} />;
      case View.PROFILE: return (
        <div className="p-4 flex flex-col gap-6 animate-slide-in">
          <header className="flex items-center gap-4 mt-2 px-2">
             <button onClick={() => navigateTo(View.HOME)} className="p-3 bg-white rounded-2xl border-2 border-gray-50 shadow-sm active:scale-90"><ChevronLeft size={24} /></button>
             <h2 className="text-xl font-black">My Academy Profile</h2>
          </header>
          <div className="bg-white p-10 rounded-[3rem] border-2 border-gray-50 text-center shadow-xl shadow-gray-200/20 relative overflow-hidden group">
            <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] mx-auto flex items-center justify-center text-white text-3xl font-black mb-6 shadow-xl border-4 border-white relative z-10 transition-transform group-hover:scale-105 group-hover:rotate-3">{user.name.charAt(0)}</div>
            <h2 className="text-2xl font-black text-gray-900 leading-none">{user.name}</h2>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-3">Scholar Class {user.class}</p>
          </div>
          <button 
            onClick={() => navigateTo(View.PRIVACY)} 
            className="w-full flex items-center justify-between p-6 bg-white border-2 border-gray-50 rounded-[2rem] font-black text-gray-700 active:bg-gray-50 active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-blue-600" size={20} /> Privacy & Safety Guide
            </div>
            <ChevronLeft className="rotate-180 text-gray-300" size={18} />
          </button>
          <button onClick={() => { playClickSound(); authService.logout(); setUser(null); }} className="w-full p-6 bg-red-50 text-red-600 font-black rounded-[2rem] border-2 border-red-100 active:bg-red-100 active:scale-[0.98] transition-all">Logout Account</button>
        </div>
      );
      case View.PRIVACY: return <PrivacyView onBack={() => navigateTo(View.HOME)} />;
      case View.CALCULATOR: return <CalculatorView onBack={() => navigateTo(View.HOME)} />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-center p-10">
          <Brain size={40} className="text-blue-600 mb-4 animate-pulse" />
          <h3 className="font-black text-gray-900">Searching...</h3>
          <button onClick={() => navigateTo(View.HOME)} className="mt-4 text-blue-600 font-bold">Go Home</button>
        </div>
      );
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-[#FAFAFA] relative overflow-hidden flex flex-col">
      <Sidebar 
        user={user} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={navigateTo} 
        onLogout={() => { playClickSound(); authService.logout(); setUser(null); }} 
      />
      <main className="flex-1 overflow-y-auto pt-safe relative">
        <div key={currentView} className="h-full">
          {renderContent()}
        </div>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-2xl border-t-2 border-gray-50 flex justify-around items-center py-6 z-40 px-6 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        {NAV_ITEMS.map((item) => (
          <button 
            key={item.id} 
            onClick={() => navigateTo(item.id as View)} 
            className={`flex flex-col items-center gap-1.5 transition-all relative ${currentView === item.id ? 'text-blue-600 scale-110' : 'text-gray-300 hover:text-gray-500'}`}
          >
            {currentView === item.id && <div className="absolute -top-3 w-1.5 h-1.5 bg-blue-600 rounded-full animate-pop" />}
            {item.icon}
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
