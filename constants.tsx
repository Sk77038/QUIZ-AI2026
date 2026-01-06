
import React from 'react';
import { Home, HelpCircle, Brain, Camera, User, Trophy } from 'lucide-react';
import { Question } from './types';

export const CLASSES = ['6', '7', '8', '9', '10', '11', '12'];
export const SUBJECTS = ['Mathematics', 'Science', 'Social Studies', 'English', 'General Knowledge'];

export const OFFLINE_QUIZZES: Record<string, Question[]> = {
  "Mathematics": [
    { id: 'm1', text_en: "What is the square root of 625?", text_hi: "625 का वर्गमूल क्या है?", options_en: ["15", "25", "35", "45"], options_hi: ["15", "25", "35", "45"], correctAnswer: 1, explanation_en: "25 * 25 = 625.", explanation_hi: "25 का वर्ग 625 होता है।", difficulty: 'easy', type: 'mcq' },
    { id: 'm2', text_en: "Sum of angles in a triangle is?", text_hi: "त्रिभुज के कोणों का योग कितना होता है?", options_en: ["90°", "180°", "270°", "360°"], options_hi: ["90°", "180°", "270°", "360°"], correctAnswer: 1, explanation_en: "The interior angles of a triangle always sum to 180°.", explanation_hi: "त्रिभुज के आंतरिक कोणों का योग हमेशा 180° होता है।", difficulty: 'easy', type: 'mcq' },
    { id: 'm3', text_en: "What is the formula for area of a circle?", text_hi: "वृत्त के क्षेत्रफल का सूत्र क्या है?", options_en: ["2πr", "πr²", "πd", "2πr²"], options_hi: ["2πr", "πr²", "πd", "2πr²"], correctAnswer: 1, explanation_en: "Area of circle = π * radius squared.", explanation_hi: "वृत्त का क्षेत्रफल = π * (त्रिज्या का वर्ग)।", difficulty: 'medium', type: 'mcq' },
    { id: 'm4', text_en: "Value of (a+b)² is?", text_hi: "(a+b)² का मान क्या है?", options_en: ["a²+b²", "a²+2ab+b²", "a²-2ab+b²", "a²+ab+b²"], options_hi: ["a²+b²", "a²+2ab+b²", "a²-2ab+b²", "a²+ab+b²"], correctAnswer: 1, explanation_en: "Algebraic identity: (a+b)(a+b) = a²+2ab+b².", explanation_hi: "बीजगणितीय पहचान: (a+b)² = a²+2ab+b²।", difficulty: 'easy', type: 'mcq' },
    { id: 'm5', text_en: "A prime number has how many factors?", text_hi: "एक अभाज्य संख्या के कितने गुणनखंड होते हैं?", options_en: ["1", "2", "3", "Infinite"], options_hi: ["1", "2", "3", "अनंत"], correctAnswer: 1, explanation_en: "Prime numbers have only two factors: 1 and itself.", explanation_hi: "अभाज्य संख्याओं के केवल दो गुणनखंड होते हैं: 1 और स्वयं वह संख्या।", difficulty: 'easy', type: 'mcq' }
  ],
  "Science": [
    { id: 's1', text_en: "Which gas do plants absorb during photosynthesis?", text_hi: "प्रकाश संश्लेषण के दौरान पौधे कौन सी गैस अवशोषित करते हैं?", options_en: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], options_hi: ["ऑक्सीजन", "नाइट्रोजन", "कार्बन डाइऑक्साइड", "हाइड्रोजन"], correctAnswer: 2, explanation_en: "Plants use CO2 to create glucose.", explanation_hi: "पौधे ग्लूकोज बनाने के लिए CO2 का उपयोग करते हैं।", difficulty: 'easy', type: 'mcq' },
    { id: 's2', text_en: "What is the chemical symbol for Gold?", text_hi: "सोने का रासायनिक प्रतीक क्या है?", options_en: ["Ag", "Au", "Pb", "Fe"], options_hi: ["Ag", "Au", "Pb", "Fe"], correctAnswer: 1, explanation_en: "Au comes from the Latin word 'Aurum'.", explanation_hi: "Au लैटिन शब्द 'Aurum' से आया है।", difficulty: 'medium', type: 'mcq' },
    { id: 's3', text_en: "Smallest unit of life is?", text_hi: "जीवन की सबसे छोटी इकाई क्या है?", options_en: ["Atom", "Tissue", "Cell", "Organ"], options_hi: ["परमाणु", "ऊतक", "कोशिका", "अंग"], correctAnswer: 2, explanation_en: "The cell is the basic structural and functional unit of life.", explanation_hi: "कोशिका जीवन की बुनियादी संरचनात्मक और कार्यात्मक इकाई है।", difficulty: 'easy', type: 'mcq' },
    { id: 's4', text_en: "Light travels in a...?", text_hi: "प्रकाश किस दिशा में यात्रा करता है...?", options_en: ["Curved line", "Straight line", "Zigzag line", "None"], options_hi: ["टेढ़ी रेखा", "सीधी रेखा", "टेढ़ी-मेढ़ी रेखा", "कोई नहीं"], correctAnswer: 1, explanation_en: "This is known as rectilinear propagation of light.", explanation_hi: "इसे प्रकाश का ऋजुरेखीय संचरण कहा जाता है।", difficulty: 'easy', type: 'mcq' },
    { id: 's5', text_en: "The SI unit of power is?", text_hi: "शक्ति का SI मात्रक क्या है?", options_en: ["Joule", "Newton", "Watt", "Volt"], options_hi: ["जूल", "न्यूटन", "वाट", "वोल्ट"], correctAnswer: 2, explanation_en: "Watt is defined as 1 Joule per second.", explanation_hi: "वाट को 1 जूल प्रति सेकंड के रूप में परिभाषित किया गया है।", difficulty: 'easy', type: 'mcq' }
  ],
  "General Knowledge": [
    { id: 'g1', text_en: "Who is the Prime Minister of India? (2024)", text_hi: "भारत के प्रधानमंत्री कौन हैं? (2024)", options_en: ["Rahul Gandhi", "Narendra Modi", "Amit Shah", "Droupadi Murmu"], options_hi: ["राहुल गांधी", "नरेंद्र मोदी", "अमित शाह", "द्रौपदी मुर्मू"], correctAnswer: 1, explanation_en: "Shri Narendra Modi is the current PM.", explanation_hi: "श्री नरेंद्र मोदी वर्तमान पीएम हैं।", difficulty: 'easy', type: 'mcq' },
    { id: 'g2', text_en: "Largest state of India by area is?", text_hi: "क्षेत्रफल के अनुसार भारत का सबसे बड़ा राज्य कौन सा है?", options_en: ["Uttar Pradesh", "Maharashtra", "Rajasthan", "Madhya Pradesh"], options_hi: ["उत्तर प्रदेश", "महाराष्ट्र", "राजस्थान", "मध्य प्रदेश"], correctAnswer: 2, explanation_en: "Rajasthan covers the largest land area.", explanation_hi: "राजस्थान सबसे बड़े भूमि क्षेत्र को कवर करता है।", difficulty: 'easy', type: 'mcq' }
  ]
};

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: <Home size={22} /> },
  { id: 'quiz', label: 'Quiz', icon: <HelpCircle size={22} /> },
  { id: 'solve', label: 'Solver', icon: <Brain size={22} /> },
  { id: 'camera', label: 'Scanner', icon: <Camera size={22} /> },
  { id: 'profile', label: 'Profile', icon: <User size={22} /> },
];

export const TRANSLATIONS = {
  en: {
    welcome: "Welcome Back,",
    startQuiz: "Master Quiz",
    selectClass: "Select Class",
    selectSubject: "Select Subject",
    next: "Next",
    explanation: "Master Sahab Says",
    solvePrompt: "Type your query here...",
    apiError: "Master Sahab is offline. Using Local Brain.",
    offlineMode: "Offline Mode Active",
    cameraSolve: "Solve with Camera"
  },
  hi: {
    welcome: "नमस्ते,",
    startQuiz: "मास्टर क्विज़",
    selectClass: "कक्षा चुनें",
    selectSubject: "विषय चुनें",
    next: "अगला",
    explanation: "मास्टर साहब की व्याख्या",
    solvePrompt: "अपना प्रश्न यहाँ लिखें...",
    apiError: "मास्टर साहब ऑफलाइन हैं। लोकल ब्रेन काम कर रहा है।",
    offlineMode: "ऑफलाइन मोड सक्रिय",
    cameraSolve: "कैमरे से हल करें"
  }
};
