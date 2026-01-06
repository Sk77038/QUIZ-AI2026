
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS, SUBJECTS, CLASSES, OFFLINE_QUIZZES } from '../constants';
import { Language, Question } from '../types';
import { CheckCircle, XCircle, Clock, ArrowRight, Brain, WifiOff, Sparkles, ChevronLeft, Award, Trophy } from 'lucide-react';
import { generateAIQuiz } from './services/geminiService';

interface QuizProps {
  language: Language;
  onComplete: (score: number) => void;
  onExit: () => void;
}

export const QuizView: React.FC<QuizProps> = ({ language, onComplete, onExit }) => {
  const t = TRANSLATIONS[language];
  const [step, setStep] = useState<'selection' | 'loading' | 'active' | 'result'>('selection');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(25);
  const [selectedClass, setSelectedClass] = useState(CLASSES[4]);
  const [selectedSub, setSelectedSub] = useState(SUBJECTS[0]);
  const [quizMode, setQuizMode] = useState<'ai' | 'offline'>('offline');

  useEffect(() => {
    let interval: any;
    if (step === 'active' && !isAnswered && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0 && !isAnswered) {
      handleAnswer(-1);
    }
    return () => clearInterval(interval);
  }, [step, isAnswered, timer]);

  const handleStart = async (mode: 'ai' | 'offline') => {
    setStep('loading');
    setQuizMode(mode);
    try {
      if (mode === 'ai' && navigator.onLine) {
        const q = await generateAIQuiz(selectedClass, selectedSub);
        if (q && q.length > 0) {
          setQuestions(q);
        } else {
          throw new Error("AI Empty");
        }
      } else {
        // High quality offline fallback
        const fallback = OFFLINE_QUIZZES[selectedSub] || OFFLINE_QUIZZES["Science"];
        setQuestions(fallback);
        setQuizMode('offline');
      }
      setStep('active');
      setTimer(25);
      setCurrentIdx(0);
      setScore(0);
    } catch (e) {
      const fallback = OFFLINE_QUIZZES[selectedSub] || OFFLINE_QUIZZES["Science"];
      setQuestions(fallback);
      setQuizMode('offline');
      setStep('active');
    }
  };

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    if (questions[currentIdx] && idx === questions[currentIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimer(25);
    } else {
      setStep('result');
      onComplete(score);
    }
  };

  if (step === 'selection') {
    return (
      <div className="p-6 flex flex-col gap-6 animate-slide-in h-full bg-[#FAFAFA]">
        <header className="flex items-center gap-3">
          <button onClick={onExit} className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 transition-colors active:scale-90"><ChevronLeft size={24} /></button>
          <h2 className="text-xl font-black text-gray-900">{t.startQuiz}</h2>
        </header>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-[2.5rem] border-2 border-gray-50 shadow-sm">
             <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-4">{t.selectClass}</label>
             <div className="flex flex-wrap gap-2">
               {CLASSES.map(c => (
                 <button 
                  key={c} 
                  onClick={() => setSelectedClass(c)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedClass === c ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}
                 >
                   {c}th
                 </button>
               ))}
             </div>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] border-2 border-gray-50 shadow-sm">
             <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-4">{t.selectSubject}</label>
             <div className="flex flex-wrap gap-2">
                {SUBJECTS.map(s => (
                  <button 
                    key={s} 
                    onClick={() => setSelectedSub(s)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedSub === s ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}
                  >
                    {s}
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="mt-auto space-y-3 pb-4">
          <button 
            onClick={() => handleStart('ai')} 
            className="w-full bg-blue-600 text-white p-5 rounded-[2rem] font-black shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <Sparkles size={22} /> Generate AI Quiz
          </button>
          <button 
            onClick={() => handleStart('offline')} 
            className="w-full bg-white text-gray-800 p-5 rounded-[2rem] font-black border-2 border-gray-100 flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <WifiOff size={22} className="text-gray-400" /> Start Master Offline
          </button>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-10 gap-6 h-full">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-blue-100 rounded-[2rem] animate-ping opacity-20" />
          <Brain size={48} className="absolute inset-0 m-auto text-blue-600 animate-pulse" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Guru is Thinking...</h3>
          <p className="text-gray-400 font-medium text-sm">Preparing educational questions for your class.</p>
        </div>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center animate-slide-in h-full bg-white">
        <div className="relative mb-8">
           <div className="absolute inset-0 bg-blue-600 blur-[80px] opacity-10 animate-pulse" />
           <div className="w-48 h-48 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] shadow-2xl flex flex-col items-center justify-center text-white relative border-8 border-blue-50">
             <Trophy size={60} className="mb-2" />
             <div className="text-4xl font-black">{score} / {questions.length}</div>
           </div>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">{t.results}</h2>
        <p className="text-gray-400 font-bold mb-10 tracking-[0.2em] uppercase text-[10px]">{t.points} EARNED TODAY</p>
        
        <div className="w-full grid grid-cols-2 gap-4">
           <button onClick={() => setStep('selection')} className="p-5 bg-gray-50 text-gray-400 rounded-3xl font-black active:bg-gray-100">Try Again</button>
           <button onClick={onExit} className="p-5 bg-blue-600 text-white rounded-3xl font-black shadow-lg shadow-blue-100 active:scale-95 transition-all">Collect Rewards</button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  if (!q) return null;

  return (
    <div className="flex-1 flex flex-col p-5 gap-5 animate-slide-in pb-24 h-full overflow-y-auto bg-[#FAFAFA]">
      <div className="flex justify-between items-center px-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Master Sahab Session</span>
          <p className="text-lg font-black text-gray-900">Q{currentIdx + 1} of {questions.length}</p>
        </div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-black border-2 transition-colors ${timer < 10 ? 'border-red-500 text-red-500 animate-pulse' : 'border-gray-200 text-gray-400'}`}>
          {timer}s
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-gray-200/50 border-2 border-gray-50 relative overflow-hidden">
        <div className={`absolute top-0 right-0 p-4 ${quizMode === 'ai' ? 'text-blue-500' : 'text-amber-500'} opacity-10`}>
          {quizMode === 'ai' ? <Sparkles size={100} /> : <WifiOff size={100} />}
        </div>
        <p className="text-xl font-black text-gray-900 leading-snug mb-4 relative z-10">{language === Language.EN ? q.text_en : q.text_hi}</p>
        <p className="text-xs font-bold text-gray-400 italic relative z-10">{language === Language.EN ? q.text_hi : q.text_en}</p>
      </div>

      <div className="space-y-3">
        {(language === Language.EN ? q.options_en : q.options_hi).map((opt, i) => {
          let styles = "bg-white border-2 border-gray-100 text-gray-800 shadow-sm";
          if (isAnswered) {
            if (i === q.correctAnswer) styles = "bg-green-100 border-green-500 text-green-800 scale-[1.02] shadow-green-100";
            else if (i === selectedAnswer) styles = "bg-red-100 border-red-500 text-red-800";
            else styles = "bg-gray-50 opacity-40 grayscale-[0.5]";
          }
          return (
            <button key={i} disabled={isAnswered} onClick={() => handleAnswer(i)} className={`w-full p-5 rounded-[2rem] text-left font-black transition-all flex justify-between items-center ${styles}`}>
              <span className="flex-1">{opt}</span>
              {isAnswered && i === q.correctAnswer && <CheckCircle size={22} className="text-green-600" />}
              {isAnswered && i === selectedAnswer && i !== q.correctAnswer && <XCircle size={22} className="text-red-600" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="p-7 bg-blue-50 rounded-[3rem] border-2 border-blue-100 animate-slide-in shadow-inner">
          <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Award size={16} /> {t.explanation}
          </p>
          <p className="text-gray-900 text-sm font-bold leading-relaxed">{language === Language.EN ? q.explanation_en : q.explanation_hi}</p>
          <button onClick={nextQuestion} className="w-full mt-8 bg-blue-600 text-white py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-2 shadow-xl shadow-blue-100 active:scale-[0.98] transition-all">
            {t.next} <ArrowRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
};
