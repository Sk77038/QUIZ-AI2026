
import React, { useState, useEffect } from 'react';
import { View, Language, UserProfile } from './types';
import { NAV_ITEMS, TRANSLATIONS } from './constants';
import { QuizView } from './components/QuizView';
import { CameraView } from './components/CameraView';
import { LoginView } from './components/LoginView';
import { Sidebar } from './components/Sidebar';
import { PrivacyView } from './components/PrivacyView';
import { authService } from './components/services/authService';
import { solveQuestion } from './components/services/geminiService';
import { Brain, Menu, Trophy, Star, ChevronLeft, WifiOff, Send, Loader2, Languages, HelpCircle, Camera, Search, Sparkles, BookOpen, Award } from 'lucide-react';

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
    setTimeout(() => setIsAppLoading(false), 2000); // Premium splash duration
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
      <div className="fixed inset-0 bg-[#2563eb] flex flex-col items-center justify-center z-[100] text-white">
        <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-blue-600 shadow-2xl animate-bounce mb-6">
          <Brain size={50} />
        </div>
        <h1 className="text-3xl font-black tracking-tighter">MASTER SAHAB AI</h1>
        <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.3em] mt-2">Personal Study Guru</p>
        <div className="absolute bottom-16 w-32 h-1 bg-blue-700 rounded-full overflow-hidden">
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
            <header className="flex justify-between items-center py-2 px-2">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-700 active:scale-90 transition-transform"><Menu size={24} /></button>
                <div>
                  <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{t.welcome}</h2>
                  <p className="text-xl font-black text-gray-900 leading-tight">{user.name.split(' ')[0]}</p>
                </div>
              </div>
              <button 
                onClick={() => setLanguage(l => l === Language.EN ? Language.HI : Language.EN)} 
                className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-[10px] font-black flex items-center gap-2 shadow-lg shadow-blue-100"
              >
                <Languages size={14}/> {language.toUpperCase()}
              </button>
            </header>

            {!isOnline && (
              <div className="bg-amber-100 border-2 border-amber-200/50 p-3 rounded-2xl flex items-center justify-center gap-2 text-amber-800 text-[10px] font-black uppercase tracking-widest animate-pulse">
                <WifiOff size={14} /> {t.offlineMode}
              </div>
            )}

            <div className="bg-gradient-to-br from-[#2563eb] to-[#4338ca] p-6 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
               <Trophy size={160} className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
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
                 <div className="h-full bg-white shadow-[0_0_10px_white]" style={{ width: '45%' }} />
               </div>
               <p className="text-[9px] font-black opacity-60 mt-2 uppercase tracking-widest relative z-10">450 XP to Level {user.level + 1}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setCurrentView(View.QUIZ)} className="bg-white border-2 border-gray-50 p-6 rounded-[2.5rem] text-gray-900 flex flex-col gap-4 shadow-xl shadow-gray-200/30 active:scale-95 transition-all">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><BookOpen size={28} /></div>
                <span className="font-black text-lg text-left leading-tight">{t.startQuiz}</span>
              </button>
              <button onClick={() => setCurrentView(View.SOLVE)} className="bg-white border-2 border-gray-50 p-6 rounded-[2.5rem] text-gray-900 flex flex-col gap-4 shadow-xl shadow-gray-200/30 active:scale-95 transition-all">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center"><Brain size={28} /></div>
                <span className="font-black text-lg text-left leading-tight">{t.aiSolver}</span>
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2 px-2">Primary Tools</h3>
              <button onClick={() => setCurrentView(View.CAMERA)} className="w-full bg-white border-2 border-gray-50 p-6 rounded-[2.5rem] text-gray-900 flex items-center justify-between shadow-xl shadow-gray-200/30 active:scale-95 transition-all group overflow-hidden relative">
                 <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 transition-transform group-active:scale-150" />
                 <div className="flex items-center gap-4 relative z-10">
                   <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-[1.5rem] flex items-center justify-center"><Camera size={30} /></div>
                   <div className="text-left">
                     <p className="text-lg font-black">{t.cameraSolve}</p>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Snap & Solve Instant</p>
                   </div>
                 </div>
                 <ChevronLeft size={20} className="text-gray-200 rotate-180 relative z-10" />
              </button>
              
              <div className="bg-white border-2 border-gray-50 p-6 rounded-[2.5rem] shadow-xl shadow-gray-200/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Search size={20} /></div>
                  <h4 className="font-black text-gray-900">Topic Finder</h4>
                </div>
                <form onSubmit={handleSolve} className="flex gap-2">
                  <input 
                    type="text" 
                    value={solvePrompt} 
                    onChange={e => setSolvePrompt(e.target.value)}
                    placeholder="Search any topic..." 
                    className="flex-1 bg-gray-50 border-2 border-transparent focus:border-indigo-200 rounded-2xl px-4 py-3 outline-none text-sm font-bold"
                  />
                  <button type="submit" className="bg-indigo-600 text-white p-3 rounded-2xl"><Send size={20}/></button>
                </form>
              </div>
            </div>
          </div>
        );
      case View.QUIZ: return <QuizView language={language} onComplete={() => {}} onExit={() => setCurrentView(View.HOME)} />;
      case View.SOLVE: return (
        <div className="p-4 flex flex-col gap-6 animate-slide-in pb-20 h-full">
          <header className="flex items-center gap-4 mt-2 px-2">
             <button onClick={() => setCurrentView(View.HOME)} className="p-3 bg-white rounded-2xl border-2 border-gray-50 shadow-sm"><ChevronLeft size={24} /></button>
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
              className="bg-blue-600 text-white p-5 rounded-[1.5rem] font-black shadow-xl shadow-blue-100 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3"
            >
              {isSolverLoading ? <Loader2 className="animate-spin" size={24} /> : <><Sparkles size={24} /> Solve Question</>}
            </button>
          </div>
          {solveResult && (
            <div className="p-8 rounded-[2.5rem] bg-white border-2 border-blue-50 shadow-sm animate-slide-in mb-4">
              <p className="text-[10px] font-black text-blue-600 uppercase mb-4 tracking-widest flex items-center gap-2"><Award size={14} /> Master Sahab Answer</p>
              <div className="prose prose-sm whitespace-pre-wrap font-bold text-gray-800 leading-relaxed text-sm">{solveResult}</div>
            </div>
          )}
        </div>
      );
      case View.CAMERA: return <CameraView language={language} onBack={() => setCurrentView(View.HOME)} />;
      case View.PROFILE: return (
        <div className="p-4 flex flex-col gap-6 animate-slide-in">
          <header className="flex items-center gap-4 mt-2 px-2">
             <button onClick={() => setCurrentView(View.HOME)} className="p-3 bg-white rounded-2xl border-2 border-gray-50 shadow-sm"><ChevronLeft size={24} /></button>
             <h2 className="text-xl font-black">My Academy Profile</h2>
          </header>
          <div className="bg-white p-10 rounded-[3rem] border-2 border-gray-50 text-center shadow-xl shadow-gray-200/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-blue-600 opacity-5" />
            <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] mx-auto flex items-center justify-center text-white text-3xl font-black mb-6 shadow-xl border-4 border-white relative z-10">{user.name.charAt(0)}</div>
            <h2 className="text-2xl font-black text-gray-900 leading-none">{user.name}</h2>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-3">Scholar Class {user.class}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-[2rem] border-2 border-gray-50 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Quizzes</p>
              <p className="text-2xl font-black text-blue-600">24</p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border-2 border-gray-50 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Rank</p>
              <p className="text-2xl font-black text-amber-600">#12</p>
            </div>
          </div>
          <button onClick={() => { authService.logout(); setUser(null); }} className="w-full p-6 bg-red-50 text-red-600 font-black rounded-[2rem] border-2 border-red-100 active:bg-red-100">Logout Account</button>
        </div>
      );
      case View.PRIVACY: return <PrivacyView onBack={() => setCurrentView(View.HOME)} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-[#FAFAFA] relative overflow-hidden flex flex-col">
      <Sidebar user={user} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={setCurrentView} onLogout={() => { authService.logout(); setUser(null); }} />
      <main className="flex-1 overflow-y-auto pb-24 pt-safe">{renderContent()}</main>
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-2xl border-t-2 border-gray-50 flex justify-around items-center py-6 z-40 px-6 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        {NAV_ITEMS.map((item) => (
          <button 
            key={item.id} 
            onClick={() => setCurrentView(item.id as View)} 
            className={`flex flex-col items-center gap-1.5 transition-all relative ${currentView === item.id ? 'text-blue-600 scale-110' : 'text-gray-300'}`}
          >
            {currentView === item.id && <div className="absolute -top-3 w-1.5 h-1.5 bg-blue-600 rounded-full" />}
            {item.icon}
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
