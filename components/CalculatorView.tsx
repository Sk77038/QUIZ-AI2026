
import React, { useState } from 'react';
import { Calculator as CalcIcon, ArrowLeft } from 'lucide-react';

export const CalculatorView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);

  const handleInput = (val: string) => {
    if (display === '0' && !isNaN(Number(val))) setDisplay(val);
    else if (display === 'Error') setDisplay(val);
    else if (display.length < 15) setDisplay(prev => prev + val);
  };

  const safeEval = (str: string): number => {
    try {
      const tokens = str.split(/([+\-×÷])/).map(t => t.trim());
      if (tokens.length === 0) return 0;
      let result = parseFloat(tokens[0]);
      for (let i = 1; i < tokens.length; i += 2) {
        const op = tokens[i];
        const val = parseFloat(tokens[i + 1]);
        if (op === '+') result += val;
        if (op === '-') result -= val;
        if (op === '×') result *= val;
        if (op === '÷') result /= val;
      }
      return result;
    } catch { return NaN; }
  };

  const calculate = () => {
    const res = safeEval(display);
    if (isNaN(res) || !isFinite(res)) {
      setDisplay('Error');
    } else {
      setHistory(prev => [`${display} = ${res}`, ...prev].slice(0, 3));
      setDisplay(String(Number(res.toFixed(8))));
    }
  };

  const buttons = [
    'C', '÷', '×', 'DEL',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '=',
    '0', '.', '%', ''
  ];

  return (
    <div className="h-full bg-white flex flex-col animate-pop overflow-hidden">
      <header className="p-4 bg-white border-b flex items-center gap-4 shrink-0">
        <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-2xl active:scale-90 transition-all">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-black flex items-center gap-2">
          <CalcIcon size={24} className="text-blue-600" /> Calculator
        </h1>
      </header>

      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <div className="mb-4 h-16 bg-gray-50 p-4 rounded-2xl text-xs text-gray-400 font-bold overflow-hidden flex flex-col justify-end">
          {history.map((h, i) => <div key={i} className="animate-fade-in">{h}</div>)}
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-blue-50 shadow-inner mb-6 text-right text-4xl font-black font-mono truncate text-gray-900">
          {display}
        </div>

        <div className="grid grid-cols-4 gap-3 flex-1 pb-8">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => {
                if (btn === '=') calculate();
                else if (btn === 'C') setDisplay('0');
                else if (btn === 'DEL') setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
                else if (btn !== '') handleInput(btn);
              }}
              className={`h-full min-h-[64px] rounded-[1.5rem] text-xl font-black transition-all active:scale-90 flex items-center justify-center ${
                ['÷', '×', '-', '+', '='].includes(btn) 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                : btn === 'C' || btn === 'DEL' 
                ? 'bg-red-50 text-red-600'
                : 'bg-gray-50 text-gray-800'
              } ${btn === '' ? 'opacity-0' : ''}`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
