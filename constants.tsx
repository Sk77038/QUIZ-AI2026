
import React from 'react';
import { Home, HelpCircle, Brain, Camera, User, Trophy, BookOpen, Calculator, Globe, Star, Sparkles } from 'lucide-react';
import { Question } from './types';

export const CLASSES = ['6', '7', '8', '9', '10', '11', '12'];
export const SUBJECTS = ['Mathematics', 'Science', 'Social Studies', 'English', 'General Knowledge'];

// Professional Offline Database for Play Store Stability - 10+ questions per core subject
export const OFFLINE_QUIZZES: Record<string, Question[]> = {
  "Mathematics": [
    { id: 'm1', text_en: "What is the square root of 144?", text_hi: "144 का वर्गमूल क्या है?", options_en: ["10", "12", "14", "16"], options_hi: ["10", "12", "14", "16"], correctAnswer: 1, explanation_en: "12 x 12 = 144.", explanation_hi: "12 को 12 से गुणा करने पर 144 मिलता है।", difficulty: 'easy', type: 'mcq' },
    { id: 'm2', text_en: "Which of these is a prime number?", text_hi: "इनमें से कौन सी एक अभाज्य संख्या है?", options_en: ["4", "9", "15", "17"], options_hi: ["4", "9", "15", "17"], correctAnswer: 3, explanation_en: "17 is only divisible by 1 and itself.", explanation_hi: "17 केवल 1 और स्वयं से विभाज्य है।", difficulty: 'easy', type: 'mcq' },
    { id: 'm3', text_en: "Area of a triangle with base 10 and height 5?", text_hi: "आधार 10 और ऊंचाई 5 वाले त्रिभुज का क्षेत्रफल क्या होगा?", options_en: ["25", "50", "15", "100"], options_hi: ["25", "50", "15", "100"], correctAnswer: 0, explanation_en: "Area = 1/2 * base * height = 1/2 * 10 * 5 = 25.", explanation_hi: "क्षेत्रफल = 1/2 * आधार * ऊंचाई = 1/2 * 10 * 5 = 25।", difficulty: 'medium', type: 'mcq' },
    { id: 'm4', text_en: "Value of Pi (π) up to 2 decimals?", text_hi: "पाई (π) का मान 2 दशमलव स्थानों तक क्या है?", options_en: ["3.14", "3.12", "3.16", "3.18"], options_hi: ["3.14", "3.12", "3.16", "3.18"], correctAnswer: 0, explanation_en: "Pi is approximately 22/7 or 3.14.", explanation_hi: "पाई का मान लगभग 3.14 है।", difficulty: 'easy', type: 'mcq' },
    { id: 'm5', text_en: "How many sides does a heptagon have?", text_hi: "एक सप्तभुज (Heptagon) की कितनी भुजाएँ होती हैं?", options_en: ["5", "6", "7", "8"], options_hi: ["5", "6", "7", "8"], correctAnswer: 2, explanation_en: "A heptagon is a 7-sided polygon.", explanation_hi: "सप्तभुज 7 भुजाओं वाला बहुभुज होता है।", difficulty: 'medium', type: 'mcq' },
    { id: 'm6', text_en: "Square of 25 is?", text_hi: "25 का वर्ग क्या है?", options_en: ["525", "625", "725", "650"], options_hi: ["525", "625", "725", "650"], correctAnswer: 1, explanation_en: "25 x 25 = 625.", explanation_hi: "25 का वर्ग 625 होता है।", difficulty: 'easy', type: 'mcq' },
    { id: 'm7', text_en: "Sum of angles in a square is?", text_hi: "एक वर्ग के कोणों का योग कितना होता है?", options_en: ["180°", "360°", "90°", "270°"], options_hi: ["180°", "360°", "90°", "270°"], correctAnswer: 1, explanation_en: "A square has four 90° angles (4 x 90 = 360).", explanation_hi: "एक वर्ग में चार 90° के कोण होते हैं (4 x 90 = 360)।", difficulty: 'medium', type: 'mcq' },
    { id: 'm8', text_en: "What is 20% of 500?", text_hi: "500 का 20% क्या है?", options_en: ["50", "100", "150", "200"], options_hi: ["50", "100", "150", "200"], correctAnswer: 1, explanation_en: "(20/100) x 500 = 100.", explanation_hi: "500 का 20% 100 होता है।", difficulty: 'medium', type: 'mcq' },
    { id: 'm9', text_en: "The smallest prime number is?", text_hi: "सबसे छोटी अभाज्य संख्या कौन सी है?", options_en: ["0", "1", "2", "3"], options_hi: ["0", "1", "2", "3"], correctAnswer: 2, explanation_en: "2 is the only even prime number and the smallest.", explanation_hi: "2 एकमात्र सम अभाज्य संख्या है और सबसे छोटी है।", difficulty: 'easy', type: 'mcq' },
    { id: 'm10', text_en: "A circle has how many corners?", text_hi: "एक वृत्त के कितने कोने होते हैं?", options_en: ["0", "1", "4", "Infinite"], options_hi: ["0", "1", "4", "अनंत"], correctAnswer: 0, explanation_en: "A circle is a round shape with no corners.", explanation_hi: "एक वृत्त एक गोल आकार है जिसका कोई कोना नहीं होता।", difficulty: 'easy', type: 'mcq' }
  ],
  "Science": [
    { id: 's1', text_en: "Which gas is essential for photosynthesis?", text_hi: "प्रकाश संश्लेषण के लिए कौन सी गैस आवश्यक है?", options_en: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], options_hi: ["ऑक्सीजन", "नाइट्रोजन", "कार्बन डाइऑक्साइड", "हाइड्रोजन"], correctAnswer: 2, explanation_en: "Plants absorb CO2 to make food.", explanation_hi: "पौधे भोजन बनाने के लिए CO2 का उपयोग करते हैं।", difficulty: 'easy', type: 'mcq' },
    { id: 's2', text_en: "What is the chemical symbol for Gold?", text_hi: "सोने का रासायनिक प्रतीक क्या है?", options_en: ["Ag", "Au", "Pb", "Fe"], options_hi: ["Ag", "Au", "Pb", "Fe"], correctAnswer: 1, explanation_en: "Au comes from the Latin word 'Aurum'.", explanation_hi: "Au लैटिन शब्द 'Aurum' से आया है।", difficulty: 'medium', type: 'mcq' },
    { id: 's3', text_en: "Smallest unit of life is called?", text_hi: "जीवन की सबसे छोटी इकाई को क्या कहते हैं?", options_en: ["Atom", "Tissue", "Cell", "Organ"], options_hi: ["परमाणु", "ऊतक", "कोशिका", "अंग"], correctAnswer: 2, explanation_en: "The cell is the basic structural and functional unit of life.", explanation_hi: "कोशिका जीवन की आधारभूत इकाई है।", difficulty: 'easy', type: 'mcq' },
    { id: 's4', text_en: "Which planet is known as the Red Planet?", text_hi: "किस ग्रह को लाल ग्रह के रूप में जाना जाता है?", options_en: ["Venus", "Mars", "Jupiter", "Saturn"], options_hi: ["शुक्र", "मंगल", "बृहस्पति", "शनि"], correctAnswer: 1, explanation_en: "Mars has iron-rich minerals that give it a red look.", explanation_hi: "मंगल पर आयरन की अधिकता के कारण यह लाल दिखता है।", difficulty: 'easy', type: 'mcq' },
    { id: 's5', text_en: "Human blood is red due to...?", text_hi: "मानव रक्त किसके कारण लाल होता है?", options_en: ["Plasma", "White cells", "Hemoglobin", "Platelets"], options_hi: ["प्लाज्मा", "सफेद कोशिकाएं", "हीमोग्लोबिन", "प्लेटलेट्स"], correctAnswer: 2, explanation_en: "Hemoglobin carries oxygen and gives blood its color.", explanation_hi: "हीमोग्लोबिन ऑक्सीजन ले जाता है और रक्त को रंग देता है।", difficulty: 'easy', type: 'mcq' },
    { id: 's6', text_en: "What is the boiling point of water at sea level?", text_hi: "समुद्र तल पर पानी का क्वथनांक क्या है?", options_en: ["90°C", "100°C", "110°C", "120°C"], options_hi: ["90°C", "100°C", "110°C", "120°C"], correctAnswer: 1, explanation_en: "Pure water boils at exactly 100 degrees Celsius.", explanation_hi: "शुद्ध पानी ठीक 100 डिग्री सेल्सियस पर उबलता है।", difficulty: 'easy', type: 'mcq' },
    { id: 's7', text_en: "Which instrument measures temperature?", text_hi: "तापमान मापने के लिए किस उपकरण का उपयोग किया जाता है?", options_en: ["Barometer", "Thermometer", "Ammeter", "Voltmeter"], options_hi: ["बैरोमीटर", "थर्मामीटर", "अमीटर", "वोल्टमीटर"], correctAnswer: 1, explanation_en: "Thermometers are used to measure heat levels.", explanation_hi: "ताप स्तर को मापने के लिए थर्मामीटर का उपयोग किया जाता है।", difficulty: 'easy', type: 'mcq' },
    { id: 's8', text_en: "Acid turns blue litmus paper to...?", text_hi: "अम्ल नीले लिटमस पेपर को किस रंग में बदल देता है...?", options_en: ["Green", "Yellow", "Red", "Black"], options_hi: ["हरा", "पीला", "लाल", "काला"], correctAnswer: 2, explanation_en: "Acids turn blue litmus red; bases turn red litmus blue.", explanation_hi: "अम्ल नीले लिटमस को लाल कर देते हैं; क्षार लाल लिटमस को नीला कर देते हैं।", difficulty: 'medium', type: 'mcq' },
    { id: 's9', text_en: "SI unit of Resistance is?", text_hi: "प्रतिरोध का SI मात्रक क्या है?", options_en: ["Volt", "Ampere", "Ohm", "Watt"], options_hi: ["वोल्ट", "एम्पीयर", "ओम", "वाट"], correctAnswer: 2, explanation_en: "Resistance is measured in Ohms (Ω).", explanation_hi: "प्रतिरोध को ओम (Ω) में मापा जाता है।", difficulty: 'medium', type: 'mcq' },
    { id: 's10', text_en: "What part of the plant conducts photosynthesis?", text_hi: "पौधे का कौन सा भाग प्रकाश संश्लेषण करता है?", options_en: ["Root", "Stem", "Leaf", "Flower"], options_hi: ["जड़", "तना", "पत्ती", "फूल"], correctAnswer: 2, explanation_en: "Chlorophyll in leaves captures sunlight for food production.", explanation_hi: "पत्तियों में क्लोरोफिल भोजन बनाने के लिए सूरज की रोशनी को पकड़ता है।", difficulty: 'easy', type: 'mcq' }
  ],
  "General Knowledge": [
    { id: 'g1', text_en: "Who is the Prime Minister of India?", text_hi: "भारत के प्रधानमंत्री कौन हैं?", options_en: ["Rahul Gandhi", "Narendra Modi", "Amit Shah", "Droupadi Murmu"], options_hi: ["राहुल गांधी", "नरेंद्र मोदी", "अमित शाह", "द्रौपदी मुर्मू"], correctAnswer: 1, explanation_en: "Shri Narendra Modi is the current PM.", explanation_hi: "श्री नरेंद्र मोदी वर्तमान पीएम हैं।", difficulty: 'easy', type: 'mcq' },
    { id: 'g2', text_en: "Largest state of India by area is?", text_hi: "क्षेत्रफल के अनुसार भारत का सबसे बड़ा राज्य कौन सा है?", options_en: ["Uttar Pradesh", "Maharashtra", "Rajasthan", "Madhya Pradesh"], options_hi: ["उत्तर प्रदेश", "महाराष्ट्र", "राजस्थान", "मध्य प्रदेश"], correctAnswer: 2, explanation_en: "Rajasthan covers the largest land area in India.", explanation_hi: "राजस्थान भारत का सबसे बड़ा राज्य है।", difficulty: 'easy', type: 'mcq' },
    { id: 'g3', text_en: "Capital of India is?", text_hi: "भारत की राजधानी क्या है?", options_en: ["Mumbai", "Kolkata", "New Delhi", "Chennai"], options_hi: ["मुंबई", "कोलकाता", "नई दिल्ली", "चेन्नई"], correctAnswer: 2, explanation_en: "New Delhi became the capital in 1911.", explanation_hi: "नई दिल्ली 1911 में राजधानी बनी थी।", difficulty: 'easy', type: 'mcq' }
  ]
};

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: <Home size={22} /> },
  { id: 'quiz', label: 'Quiz', icon: <BookOpen size={22} /> },
  { id: 'solve', label: 'Guru AI', icon: <Brain size={22} /> },
  { id: 'camera', label: 'Scanner', icon: <Camera size={22} /> },
  { id: 'profile', label: 'Me', icon: <User size={22} /> },
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
