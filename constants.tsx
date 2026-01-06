
import React from 'react';
import { Home, HelpCircle, Brain, Camera, User, Trophy, BookOpen, Calculator, Globe, Star, Sparkles } from 'lucide-react';
import { Question, View } from './types';

export const CLASSES = ['6', '7', '8', '9', '10', '11', '12'];
export const SUBJECTS = ['Mathematics', 'Science', 'Social Studies', 'English', 'General Knowledge'];

// Expanded Offline Database for Play Store Stability - Bilingual & High Quality
export const OFFLINE_QUIZZES: Record<string, Question[]> = {
  "Mathematics": [
    { id: 'm1', text_en: "What is the square root of 144?", text_hi: "144 का वर्गमूल क्या है?", options_en: ["10", "12", "14", "16"], options_hi: ["10", "12", "14", "16"], correctAnswer: 1, explanation_en: "12 x 12 = 144.", explanation_hi: "12 को 12 से गुणा करने पर 144 मिलता है।", difficulty: 'easy', type: 'mcq' },
    { id: 'm2', text_en: "Which of these is a prime number?", text_hi: "इनमें से कौन सी एक अभाज्य संख्या है?", options_en: ["4", "9", "15", "17"], options_hi: ["4", "9", "15", "17"], correctAnswer: 3, explanation_en: "17 is only divisible by 1 and itself.", explanation_hi: "17 केवल 1 और स्वयं से विभाज्य है।", difficulty: 'easy', type: 'mcq' },
    { id: 'm3', text_en: "Area of a triangle with base 10 and height 5?", text_hi: "आधार 10 और ऊंचाई 5 वाले त्रिभुज का क्षेत्रफल क्या होगा?", options_en: ["25", "50", "15", "100"], options_hi: ["25", "50", "15", "100"], correctAnswer: 0, explanation_en: "Area = 1/2 * base * height = 1/2 * 10 * 5 = 25.", explanation_hi: "क्षेत्रफल = 1/2 * आधार * ऊंचाई = 1/2 * 10 * 5 = 25।", difficulty: 'medium', type: 'mcq' },
    { id: 'm4', text_en: "The smallest prime number is?", text_hi: "सबसे छोटी अभाज्य संख्या कौन सी है?", options_en: ["0", "1", "2", "3"], options_hi: ["0", "1", "2", "3"], correctAnswer: 2, explanation_en: "2 is the smallest and only even prime number.", explanation_hi: "2 सबसे छोटी और एकमात्र सम अभाज्य संख्या है।", difficulty: 'easy', type: 'mcq' },
    { id: 'm5', text_en: "Sum of angles in a triangle?", text_hi: "त्रिभुज के कोणों का योग कितना होता है?", options_en: ["90°", "180°", "270°", "360°"], options_hi: ["90°", "180°", "270°", "360°"], correctAnswer: 1, explanation_en: "Sum of all interior angles is 180°.", explanation_hi: "सभी आंतरिक कोणों का योग 180° होता है।", difficulty: 'easy', type: 'mcq' }
  ],
  "Science": [
    { id: 's1', text_en: "Which gas is essential for photosynthesis?", text_hi: "प्रकाश संश्लेषण के लिए कौन सी गैस आवश्यक है?", options_en: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], options_hi: ["ऑक्सीजन", "नाइट्रोजन", "कार्बन डाइऑक्साइड", "हाइड्रोजन"], correctAnswer: 2, explanation_en: "Plants absorb CO2 to make food.", explanation_hi: "पौधे भोजन बनाने के लिए CO2 का उपयोग करते हैं।", difficulty: 'easy', type: 'mcq' },
    { id: 's2', text_en: "Smallest unit of life is called?", text_hi: "जीवन की सबसे छोटी इकाई को क्या कहते हैं?", options_en: ["Atom", "Tissue", "Cell", "Organ"], options_hi: ["परमाणु", "ऊतक", "कोशिका", "अंग"], correctAnswer: 2, explanation_en: "The cell is the basic unit of life.", explanation_hi: "कोशिका जीवन की आधारभूत इकाई है।", difficulty: 'easy', type: 'mcq' },
    { id: 's3', text_en: "Speed of light in vacuum is approx?", text_hi: "निर्वात में प्रकाश की गति लगभग कितनी होती है?", options_en: ["3 lakh km/s", "1 lakh km/s", "5 lakh km/s", "10 lakh km/s"], options_hi: ["3 लाख किमी/सेकंड", "1 लाख किमी/सेकंड", "5 लाख किमी/सेकंड", "10 लाख किमी/सेकंड"], correctAnswer: 0, explanation_en: "Speed of light is 3 x 10^8 m/s.", explanation_hi: "प्रकाश की गति 3 x 10^8 मीटर/सेकंड होती है।", difficulty: 'medium', type: 'mcq' },
    { id: 's4', text_en: "Which metal is liquid at room temperature?", text_hi: "कौन सी धातु कमरे के तापमान पर तरल होती है?", options_en: ["Iron", "Gold", "Mercury", "Silver"], options_hi: ["लोहा", "सोना", "पारा (मर्करी)", "चांदी"], correctAnswer: 2, explanation_en: "Mercury (Hg) is the only metal that is liquid at STP.", explanation_hi: "पारा एकमात्र ऐसी धातु है जो सामान्य तापमान पर तरल होती है।", difficulty: 'easy', type: 'mcq' }
  ],
  "General Knowledge": [
    { id: 'g1', text_en: "Who is the Prime Minister of India?", text_hi: "भारत के प्रधानमंत्री कौन हैं?", options_en: ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Droupadi Murmu"], options_hi: ["नरेंद्र मोदी", "राहुल गांधी", "अमित शाह", "द्रौपदी मुर्मू"], correctAnswer: 0, explanation_en: "Shri Narendra Modi is the PM since 2014.", explanation_hi: "श्री नरेंद्र मोदी 2014 से भारत के प्रधानमंत्री हैं।", difficulty: 'easy', type: 'mcq' },
    { id: 'g2', text_en: "Capital of India is?", text_hi: "भारत की राजधानी क्या है?", options_en: ["Mumbai", "Kolkata", "New Delhi", "Chennai"], options_hi: ["मुंबई", "कोलकाता", "नई दिल्ली", "चेन्नई"], correctAnswer: 2, explanation_en: "New Delhi is the seat of the Indian government.", explanation_hi: "नई दिल्ली भारत सरकार का मुख्यालय है।", difficulty: 'easy', type: 'mcq' }
  ]
};

export const NAV_ITEMS = [
  { id: View.HOME, label: 'Home', icon: <Home size={22} /> },
  { id: View.QUIZ, label: 'Quiz', icon: <BookOpen size={22} /> },
  { id: View.SOLVE, label: 'Guru AI', icon: <Brain size={22} /> },
  { id: View.CAMERA, label: 'Scanner', icon: <Camera size={22} /> },
  { id: View.PROFILE, label: 'Me', icon: <User size={22} /> },
];

export const TRANSLATIONS = {
  en: {
    welcome: "Welcome Scholar,",
    tagline: "Your Personal AI Tutor",
    startQuiz: "Master Quiz Challenge",
    selectClass: "Choose Your Grade",
    selectSubject: "Choose Subject",
    next: "Continue",
    explanation: "Master Sahab's Guide",
    solvePrompt: "Type your homework question here...",
    apiError: "Guru is offline. Using local knowledge.",
    offlineMode: "Offline Safe Mode Active",
    cameraSolve: "Snap & Solve",
    aiSolver: "Smart Solver",
    results: "Your Score",
    points: "Points"
  },
  hi: {
    welcome: "नमस्ते विद्वान,",
    tagline: "आपका अपना एआई ट्यूटर",
    startQuiz: "मास्टर क्विज़ चुनौती",
    selectClass: "अपनी कक्षा चुनें",
    selectSubject: "विषय चुनें",
    next: "आगे बढ़ें",
    explanation: "मास्टर साहब की व्याख्या",
    solvePrompt: "अपना होमवर्क का प्रश्न यहाँ लिखें...",
    apiError: "गुरु ऑफलाइन हैं। लोकल ज्ञान का उपयोग करें।",
    offlineMode: "ऑफलाइन मोड सक्रिय",
    cameraSolve: "फोटो खींचे और हल पाएं",
    aiSolver: "स्मार्ट सॉल्वर",
    results: "आपका स्कोर",
    points: "अंक"
  }
};
