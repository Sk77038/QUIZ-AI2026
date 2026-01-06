
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS, SUBJECTS, CLASSES, OFFLINE_QUIZZES } from '../constants';
import { Language, Question } from '../types';
import { CheckCircle, XCircle, Clock, ArrowRight, Brain, WifiOff, Sparkles } from 'lucide-react';
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
  const [timer, setTimer] = useState(20);
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
      if (mode === 'ai') {
        const q = await generateAIQuiz(selectedClass, selectedSub);
        if (q.length === 0) throw new Error();
        setQuestions(q);
      } else {
        const fallback = OFFLINE_QUIZZES[selectedSub] || OFFLINE_QUIZZES["Science"];
        setQuestions(fallback);
      }
      setStep('active');
      setTimer(20);
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
      setTimer(20);
    } else {
      setStep('result');
      onComplete(score);
    }
  };

  if (step === 'selection') {
    return (
      <div className="p-6 flex flex-col gap-6 animate-slide-in">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <Brain className="text-blue-600" /> {t.startQuiz}
        </h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">{t.selectClass}</label>
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full p-2 text-lg font-bold outline-none bg-transparent">
              {CLASSES.map(c => <option key={c} value={c}>Class {c}th</option>)}
            </select>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">{t.selectSubject}</label>
            <select value={selectedSub} onChange={e => setSelectedSub(e.target.value)} className="w-full p-2 text-lg font-bold outline-none bg-transparent">
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4">
          <button onClick={() => handleStart('ai')} className="bg-blue-600 text-white p-5 rounded-[2rem] font-black shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95 transition-all">
            <Sparkles size={20} /> AI Generated Quiz
          </button>
          <button onClick={() => handleStart('offline')} className="bg-white text-gray-700 p-5 rounded-[2rem] font-black border-2 border-gray-100 flex items-center justify-center gap-3 active:scale-95 transition-all">
            <WifiOff size={20} /> Offline Master Quiz
          </button>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="p-10 flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="font-black text-gray-900">Master Sahab is creating your quiz...</p>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div className="p-8 flex flex-col items-center gap-6 text-center animate-slide-in">
        <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border-4 border-white shadow-xl">
          <CheckCircle size={64} />
        </div>
        <h2 className="text-4xl font-black">Score: {score}/{questions.length}</h2>
        <div className="flex gap-4 w-full">
          <button onClick={() => setStep('selection')} className="flex-1 p-5 bg-blue-600 text-white rounded-3xl font-black">Restart</button>
          <button onClick={onExit} className="flex-1 p-5 border-2 border-gray-100 rounded-3xl font-black">Home</button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  if (!q) return null;

  return (
    <div className="p-4 flex flex-col gap-6 animate-slide-in pb-24">
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-gray-50">
        <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black">Question {currentIdx + 1}/{questions.length}</span>
        <div className={`flex items-center gap-2 font-mono font-black ${timer < 5 ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}>
          <Clock size={20} /> {timer}s
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-blue-50">
        <p className="text-xl font-black text-gray-900 leading-snug mb-4">{language === Language.EN ? q.text_en : q.text_hi}</p>
        <p className="text-sm font-bold text-blue-600/60 italic">{language === Language.EN ? q.text_hi : q.text_en}</p>
      </div>

      <div className="space-y-3">
        {(language === Language.EN ? q.options_en : q.options_hi).map((opt, i) => {
          let styles = "bg-white border-2 border-gray-100 text-gray-900";
          if (isAnswered) {
            if (i === q.correctAnswer) styles = "bg-green-100 border-green-500 text-green-800 scale-[1.02]";
            else if (i === selectedAnswer) styles = "bg-red-100 border-red-500 text-red-800";
            else styles = "bg-gray-50 opacity-40";
          }
          return (
            <button key={i} disabled={isAnswered} onClick={() => handleAnswer(i)} className={`w-full p-5 rounded-3xl text-left font-black transition-all ${styles}`}>
              {opt}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="p-6 bg-blue-50 rounded-[2.5rem] border border-blue-100 animate-slide-in">
          <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-2">{t.explanation}</p>
          <p className="text-gray-900 text-sm font-bold leading-relaxed">{language === Language.EN ? q.explanation_en : q.explanation_hi}</p>
          <button onClick={nextQuestion} className="w-full mt-6 bg-blue-600 text-white py-5 rounded-3xl font-black flex items-center justify-center gap-2">
            Next <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
