import { matchDiseases } from './diseaseDatabase';
import { useState, useRef, useEffect } from "react";

const TRANSLATIONS = {
  en: {
    title: "RareDx", subtitle: "AI-powered Rare Disease Diagnosis Assistant",
    stat1: "People with rare diseases", stat2: "Diseases in database", stat3: "Avg diagnosis delay",
    formTitle: "Patient Information", age: "Age", agePlaceholder: "e.g. 28",
    gender: "Gender", genderPlaceholder: "e.g. Female",
    duration: "Duration of Symptoms", durationPlaceholder: "e.g. 6 months",
    tests: "Tests Already Done", testsPlaceholder: "e.g. blood test normal",
    symptoms: "Symptoms", symptomsPlaceholder: "Describe symptoms... e.g. joint pain, fatigue, rash",
    voiceBtn: "🎤 Voice", listeningBtn: "🔴 Listening...",
    bodyParts: "Affected Body Parts", selected: "Selected",
    uploadReport: "Upload Medical Report (optional)", uploadReady: "ready",
    analyzeBtn: "Analyze Symptoms", analyzingTitle: "Analyzing symptoms...",
    analyzingSubtitle: "Cross-referencing 100+ verified rare diseases",
    step1: "Analyzing symptom patterns...", step2: "Checking rare disease database...", step3: "Generating diagnosis report...",
    caseSummary: "Case Summary", printReport: "Print", reportFindings: "Report Findings",
    urgency: "Urgency", possibleConditions: "Possible Conditions", confidence: "Confidence",
    affected: "Affected", avgDiagnosis: "Avg diagnosis", nextSteps: "Next Steps",
    generalAdvice: "General Advice", findSpecialist: "Find a Specialist Near You",
    findBtn: "Find Specialist", findClinic: "Find Rare Disease Clinic",
    chatTitle: "Ask About Your Diagnosis", chatPlaceholder: "Ask anything...",
    sendBtn: "Send", secondOpinion: "Get a Second Opinion",
    secondOpinionDesc: "Re-analyze the same symptoms for a fresh perspective.",
    secondOpinionBtn: "Run Second Opinion", disclaimer: "Medical Disclaimer",
    disclaimerText1: "RareDx is an AI informational tool. It is",
    disclaimerBold: "NOT a substitute for professional medical advice.",
    disclaimerText2: "Always seek the advice of your physician.",
    disclaimerFooter: "© 2025 RareDx • Educational purposes only",
    newAnalysis: "← New Analysis", emergencyTitle: "Immediate Medical Attention Required!",
    emergencyDesc: "Please seek emergency care immediately.",
    emergencyBtn: "Find Nearest Hospital", chatWelcome: "I've analyzed the symptoms. Ask me anything!",
    chatWelcomeReport: "I've analyzed the symptoms and your report. Ask me anything!", match: "Match",
  },
  ta: {
    title: "RareDx", subtitle: "AI-சக்தி வாய்ந்த அரிய நோய் கண்டறியும் உதவியாளர்",
    stat1: "அரிய நோயால் பாதிக்கப்பட்டவர்கள்", stat2: "தரவுத்தளத்தில் நோய்கள்", stat3: "சராசரி கண்டறிதல் தாமதம்",
    formTitle: "நோயாளி தகவல்", age: "வயது", agePlaceholder: "எ.கா. 28",
    gender: "பாலினம்", genderPlaceholder: "எ.கா. பெண்",
    duration: "அறிகுறிகளின் காலம்", durationPlaceholder: "எ.கா. 6 மாதங்கள்",
    tests: "ஏற்கனவே செய்த பரிசோதனைகள்", testsPlaceholder: "எ.கா. இரத்த பரிசோதனை சாதாரணம்",
    symptoms: "அறிகுறிகள்", symptomsPlaceholder: "அறிகுறிகளை விவரிக்கவும்...",
    voiceBtn: "🎤 குரல்", listeningBtn: "🔴 கேட்கிறது...",
    bodyParts: "பாதிக்கப்பட்ட உடல் பாகங்கள்", selected: "தேர்ந்தெடுக்கப்பட்டது",
    uploadReport: "மருத்துவ அறிக்கை பதிவேற்றவும்", uploadReady: "தயார்",
    analyzeBtn: "பகுப்பாய்வு செய்க", analyzingTitle: "பகுப்பாய்வு செய்கிறோம்...",
    analyzingSubtitle: "100+ அரிய நோய்களை சரிபார்க்கிறோம்",
    step1: "அறிகுறி வடிவங்களை பகுப்பாய்வு...", step2: "நோய் தரவுத்தளம் சரிபார்க்கிறோம்...", step3: "அறிக்கை உருவாக்குகிறோம்...",
    caseSummary: "வழக்கு சுருக்கம்", printReport: "அச்சிடுக", reportFindings: "அறிக்கை கண்டுபிடிப்புகள்",
    urgency: "அவசரம்", possibleConditions: "சாத்தியமான நிலைமைகள்", confidence: "நம்பிக்கை",
    affected: "பாதிக்கப்பட்டவர்கள்", avgDiagnosis: "சராசரி கண்டறிதல்", nextSteps: "அடுத்த படிகள்",
    generalAdvice: "பொது ஆலோசனை", findSpecialist: "அருகில் நிபுணரை கண்டறியுங்கள்",
    findBtn: "நிபுணரை கண்டறியுங்கள்", findClinic: "அரிய நோய் கிளினிக்",
    chatTitle: "கண்டறிதலைப் பற்றி கேளுங்கள்", chatPlaceholder: "எதையும் கேளுங்கள்...",
    sendBtn: "அனுப்பு", secondOpinion: "இரண்டாவது கருத்து",
    secondOpinionDesc: "புதிய கண்ணோட்டத்திற்காக மீண்டும் பகுப்பாய்வு செய்க.",
    secondOpinionBtn: "இரண்டாவது கருத்து பகுப்பாய்வு", disclaimer: "மருத்துவ மறுப்பு",
    disclaimerText1: "RareDx ஒரு AI தகவல் கருவியாகும். இது",
    disclaimerBold: "தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாக இல்லை.",
    disclaimerText2: "எப்போதும் உங்கள் மருத்துவரின் ஆலோசனையை நாடுங்கள்.",
    disclaimerFooter: "© 2025 RareDx • கல்வி நோக்கங்களுக்காக மட்டுமே",
    newAnalysis: "← புதிய பகுப்பாய்வு", emergencyTitle: "உடனடி மருத்துவ கவனிப்பு தேவை!",
    emergencyDesc: "உடனடியாக அவசர சிகிச்சை பெறுங்கள்.",
    emergencyBtn: "அருகிலுள்ள மருத்துவமனை", chatWelcome: "அறிகுறிகளை பகுப்பாய்வு செய்தேன். கேளுங்கள்!",
    chatWelcomeReport: "அறிகுறிகள் மற்றும் அறிக்கையை பகுப்பாய்வு செய்தேன்!", match: "பொருத்தம்",
  },
  hi: {
    title: "RareDx", subtitle: "AI-संचालित दुर्लभ रोग निदान सहायक",
    stat1: "दुर्लभ बीमारियों से प्रभावित", stat2: "डेटाबेस में बीमारियाँ", stat3: "औसत निदान देरी",
    formTitle: "रोगी जानकारी", age: "आयु", agePlaceholder: "जैसे 28",
    gender: "लिंग", genderPlaceholder: "जैसे महिला",
    duration: "लक्षणों की अवधि", durationPlaceholder: "जैसे 6 महीने",
    tests: "पहले किए गए परीक्षण", testsPlaceholder: "जैसे रक्त परीक्षण सामान्य",
    symptoms: "लक्षण", symptomsPlaceholder: "लक्षण बताएं...",
    voiceBtn: "🎤 आवाज़", listeningBtn: "🔴 सुन रहा है...",
    bodyParts: "प्रभावित शरीर के अंग", selected: "चयनित",
    uploadReport: "चिकित्सा रिपोर्ट अपलोड करें", uploadReady: "तैयार",
    analyzeBtn: "विश्लेषण करें", analyzingTitle: "विश्लेषण हो रहा है...",
    analyzingSubtitle: "100+ दुर्लभ बीमारियों की जाँच",
    step1: "लक्षण पैटर्न का विश्लेषण...", step2: "रोग डेटाबेस की जाँच...", step3: "निदान रिपोर्ट तैयार...",
    caseSummary: "केस सारांश", printReport: "प्रिंट", reportFindings: "रिपोर्ट निष्कर्ष",
    urgency: "तात्कालिकता", possibleConditions: "संभावित स्थितियाँ", confidence: "विश्वास",
    affected: "प्रभावित", avgDiagnosis: "औसत निदान", nextSteps: "अगले कदम",
    generalAdvice: "सामान्य सलाह", findSpecialist: "पास विशेषज्ञ खोजें",
    findBtn: "विशेषज्ञ खोजें", findClinic: "दुर्लभ रोग क्लिनिक",
    chatTitle: "निदान के बारे में पूछें", chatPlaceholder: "कुछ भी पूछें...",
    sendBtn: "भेजें", secondOpinion: "दूसरी राय लें",
    secondOpinionDesc: "नए दृष्टिकोण के लिए पुनः विश्लेषण करें।",
    secondOpinionBtn: "दूसरी राय विश्लेषण", disclaimer: "चिकित्सा अस्वीकरण",
    disclaimerText1: "RareDx एक AI सूचनात्मक उपकरण है। यह",
    disclaimerBold: "पेशेवर चिकित्सा सलाह का विकल्श नहीं है।",
    disclaimerText2: "हमेशा अपने चिकित्सक की सलाह लें।",
    disclaimerFooter: "© 2025 RareDx • केवल शैक्षिक उद्देश्यों के लिए",
    newAnalysis: "← नया विश्लेषण", emergencyTitle: "तत्काल चिकित्सा ध्यान आवश्यक!",
    emergencyDesc: "कृपया तुरंत आपातकालीन देखभाल लें।",
    emergencyBtn: "निकटतम अस्पताल", chatWelcome: "लक्षणों का विश्लेषण किया। पूछें!",
    chatWelcomeReport: "लक्षण और रिपोर्ट का विश्लेषण किया!", match: "मिलान",
  },
  te: {
    title: "RareDx", subtitle: "AI-ఆధారిత అరుదైన వ్యాధి నిర్ధారణ సహాయకుడు",
    stat1: "అరుదైన వ్యాధులతో బాధపడుతున్నవారు", stat2: "డేటాబేస్‌లో వ్యాధులు", stat3: "సగటు నిర్ధారణ జాప్యం",
    formTitle: "రోగి సమాచారం", age: "వయసు", agePlaceholder: "ఉదా. 28",
    gender: "లింగం", genderPlaceholder: "ఉదా. మహిళ",
    duration: "లక్షణాల వ్యవధి", durationPlaceholder: "ఉదా. 6 నెలలు",
    tests: "ఇప్పటికే చేసిన పరీక్షలు", testsPlaceholder: "ఉదా. రక్త పరీక్ష సాధారణం",
    symptoms: "లక్షణాలు", symptomsPlaceholder: "లక్షణాలు వివరించండి...",
    voiceBtn: "🎤 వాయిస్", listeningBtn: "🔴 వింటోంది...",
    bodyParts: "ప్రభావిత శరీర భాగాలు", selected: "ఎంచుకున్నవి",
    uploadReport: "వైద్య నివేదిక అప్‌లోడ్", uploadReady: "సిద్ధంగా ఉంది",
    analyzeBtn: "విశ్లేషించండి", analyzingTitle: "విశ్లేషిస్తోంది...",
    analyzingSubtitle: "100+ అరుదైన వ్యాధులను తనిఖీ చేస్తోంది",
    step1: "లక్షణ నమూనాలు విశ్లేషిస్తోంది...", step2: "వ్యాధి డేటాబేస్ తనిఖీ...", step3: "నివేదిక రూపొందిస్తోంది...",
    caseSummary: "కేసు సారాంశం", printReport: "ముద్రించు", reportFindings: "నివేదిక ఫలితాలు",
    urgency: "అత్యవసరత", possibleConditions: "సాధ్యమయ్యే పరిస్థితులు", confidence: "విశ్వాసం",
    affected: "ప్రభావితులు", avgDiagnosis: "సగటు నిర్ధారణ", nextSteps: "తదుపరి దశలు",
    generalAdvice: "సాధారణ సలహా", findSpecialist: "నిపుణుడిని కనుగొనండి",
    findBtn: "నిపుణుడు", findClinic: "అరుదైన వ్యాధి క్లినిక్",
    chatTitle: "నిర్ధారణ గురించి అడగండి", chatPlaceholder: "ఏదైనా అడగండి...",
    sendBtn: "పంపండి", secondOpinion: "రెండవ అభిప్రాయం",
    secondOpinionDesc: "అదే లక్షణాలను మళ్ళీ విశ్లేషించండి.",
    secondOpinionBtn: "రెండవ అభిప్రాయ విశ్లేషణ", disclaimer: "వైద్య నిరాకరణ",
    disclaimerText1: "RareDx ఒక AI సమాచార సాధనం. ఇది",
    disclaimerBold: "వృత్తిపరమైన వైద్య సలహాకు ప్రత్యామ్నాయం కాదు.",
    disclaimerText2: "ఎల్లప్పుడూ మీ వైద్యుని సలహా తీసుకోండి.",
    disclaimerFooter: "© 2025 RareDx • విద్యా ప్రయోజనాల కోసం మాత్రమే",
    newAnalysis: "← కొత్త విశ్లేషణ", emergencyTitle: "తక్షణ వైద్య సహాయం అవసరం!",
    emergencyDesc: "దయచేసి వెంటనే అత్యవసర సంరక్షణ తీసుకోండి.",
    emergencyBtn: "సమీప ఆసుపత్రి", chatWelcome: "లక్షణాలను విశ్లేషించాను. అడగండి!",
    chatWelcomeReport: "లక్షణాలు మరియు నివేదికను విశ్లేషించాను!", match: "సరిపోలిక",
  },
  ml: {
    title: "RareDx", subtitle: "AI-ശക്തിയുള്ള അപൂർവ രോഗ നിർണ്ണയ സഹായി",
    stat1: "അപൂർവ രോഗങ്ങൾ ബാധിച്ചവർ", stat2: "ഡാറ്റാബേസിലെ രോഗങ്ങൾ", stat3: "ശരാശരി നിർണ്ണയ കാലതാമസം",
    formTitle: "രോഗി വിവരങ്ങൾ", age: "പ്രായം", agePlaceholder: "ഉദാ. 28",
    gender: "ലിംഗം", genderPlaceholder: "ഉദാ. സ്ത്രീ",
    duration: "ലക്ഷണങ്ങളുടെ ദൈർഘ്യം", durationPlaceholder: "ഉദാ. 6 മാസം",
    tests: "ഇതിനകം ചെയ്ത പരിശോധനകൾ", testsPlaceholder: "ഉദാ. രക്തപരിശോധന സാധാരണം",
    symptoms: "ലക്ഷണങ്ങൾ", symptomsPlaceholder: "ലക്ഷണങ്ങൾ വിവരിക്കുക...",
    voiceBtn: "🎤 ശബ്ദം", listeningBtn: "🔴 കേൾക്കുന്നു...",
    bodyParts: "ബാധിച്ച ശരീരഭാഗങ്ങൾ", selected: "തിരഞ്ഞെടുത്തത്",
    uploadReport: "മെഡിക്കൽ റിപ്പോർട്ട് അപ്‌ലോഡ്", uploadReady: "തയ്യാർ",
    analyzeBtn: "വിശകലനം ചെയ്യുക", analyzingTitle: "വിശകലനം ചെയ്യുന്നു...",
    analyzingSubtitle: "100+ അപൂർവ രോഗങ്ങൾ പരിശോധിക്കുന്നു",
    step1: "ലക്ഷണ പാറ്റേണുകൾ...", step2: "ഡാറ്റാബേസ് തനിഖ...", step3: "റിപ്പോർട്ട് തയ്യാറാക്കുന്നു...",
    caseSummary: "കേസ് സംഗ്രഹം", printReport: "പ്രിന്റ്", reportFindings: "റിപ്പോർട്ട് കണ്ടെത്തലുകൾ",
    urgency: "അടിയന്തിരത", possibleConditions: "സാധ്യമായ അവസ്ഥകൾ", confidence: "ആത്മവിശ്വാസം",
    affected: "ബാധിതർ", avgDiagnosis: "ശരാശരി നിർണ്ണയം", nextSteps: "അടുത്ത ഘട്ടങ്ങൾ",
    generalAdvice: "പൊതു ഉപദേശം", findSpecialist: "വിദഗ്ധനെ കണ്ടെത്തുക",
    findBtn: "വിദഗ്ധൻ", findClinic: "അപൂർവ രോഗ ക്ലിനിക്",
    chatTitle: "നിർണ്ണയത്തെക്കുറിച്ച് ചോദിക്കുക", chatPlaceholder: "എന്തും ചോദിക്കുക...",
    sendBtn: "അയയ്ക്കുക", secondOpinion: "രണ്ടാമത്തെ അഭിപ്രായം",
    secondOpinionDesc: "അതേ ലക്ഷണങ്ങൾ വീണ്ടും വിശകലനം ചെയ്യുക.",
    secondOpinionBtn: "രണ്ടാമത്തെ അഭിപ്രായ വിശകലനം", disclaimer: "മെഡിക്കൽ നിഷേധം",
    disclaimerText1: "RareDx ഒരു AI വിവര ഉപകരണമാണ്. ഇത്",
    disclaimerBold: "വൈദ്യ ഉപദേശത്തിന് പകരമല്ല.",
    disclaimerText2: "എപ്പോഴും ഡോക്ടറുടെ ഉപദേശം തേടുക.",
    disclaimerFooter: "© 2025 RareDx • വിദ്യാഭ്യാസ ആവശ്യങ്ങൾക്ക് മാത്രം",
    newAnalysis: "← പുതിയ വിശകലനം", emergencyTitle: "ഉടനടി വൈദ്യസഹായം ആവശ്യമാണ്!",
    emergencyDesc: "ഉടനടി അടിയന്തര പരിചരണം തേടുക.",
    emergencyBtn: "ഏറ്റവും അടുത്ത ആശുപത്രി", chatWelcome: "ലക്ഷണങ്ങൾ വിശകലനം ചെയ്തു. ചോദിക്കൂ!",
    chatWelcomeReport: "ലക്ഷണങ്ങളും റിപ്പോർട്ടും വിശകലനം ചെയ്തു!", match: "പൊരുത്തം",
  },
};

const BODY_PARTS = [
  { id: "head", label: "Head", icon: "🧠" }, { id: "neck", label: "Neck", icon: "🔗" },
  { id: "chest", label: "Chest", icon: "❤️" }, { id: "abdomen", label: "Abdomen", icon: "🫁" },
  { id: "back", label: "Back", icon: "🦴" }, { id: "leftArm", label: "Left Arm", icon: "💪" },
  { id: "rightArm", label: "Right Arm", icon: "💪" }, { id: "leftLeg", label: "Left Leg", icon: "🦵" },
  { id: "rightLeg", label: "Right Leg", icon: "🦵" }, { id: "joints", label: "Joints", icon: "⚙️" },
];

const LANGUAGES = [
  { code: "en", label: "EN" }, { code: "ta", label: "தமிழ்" },
  { code: "hi", label: "हिंदी" }, { code: "te", label: "తెలుగు" },
  { code: "ml", label: "മലയാളം" },
];

const SEVERITY_SYMPTOMS = ["Pain", "Fatigue", "Fever", "Nausea"];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #020818; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 2px; }
  .raredx-wrap {
    min-height: 100vh; background: #020818;
    background-image: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,100,255,0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,200,150,0.08), transparent);
    font-family: 'Space Grotesk', sans-serif; color: #e2eaff; padding: 24px 16px 60px;
  }
  .raredx-inner { max-width: 720px; margin: 0 auto; }
  .header { text-align: center; margin-bottom: 40px; }
  .header-logo { display: inline-flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .dna-icon { width: 48px; height: 48px; background: linear-gradient(135deg, #0066ff, #00d4aa); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 0 30px rgba(0,102,255,0.4); }
  .header h1 { font-family: 'Outfit', sans-serif; font-size: 2.6rem; font-weight: 800; background: linear-gradient(135deg, #4d9fff, #00d4aa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -1px; }
  .header p { color: #8aabcf; font-size: 0.95rem; margin-bottom: 24px; font-weight: 300; }
  .stats { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 24px; }
  .stat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 14px 20px; text-align: center; backdrop-filter: blur(10px); transition: transform 0.2s, border-color 0.2s; }
  .stat-card:hover { transform: translateY(-2px); border-color: rgba(0,150,255,0.3); }
  .stat-num { font-family: 'Outfit', sans-serif; font-size: 1.4rem; font-weight: 800; color: #4d9fff; }
  .stat-label { font-size: 0.72rem; color: #6a8aaa; max-width: 110px; margin-top: 2px; }
  .lang-bar { display: flex; justify-content: center; gap: 6px; flex-wrap: wrap; }
  .lang-btn { padding: 5px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #5a7a9a; cursor: pointer; font-size: 0.8rem; font-family: inherit; transition: all 0.2s; }
  .lang-btn:hover { border-color: rgba(0,150,255,0.4); color: #7aabff; }
  .lang-btn.active { background: linear-gradient(135deg, #0066ff, #0099cc); border-color: transparent; color: #fff; font-weight: 600; box-shadow: 0 4px 15px rgba(0,102,255,0.3); }
  .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 28px; backdrop-filter: blur(10px); margin-bottom: 16px; }
  .card-title { font-family: 'Outfit', sans-serif; font-weight: 700; color: #4d9fff; margin-bottom: 20px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; }
  .field { margin-bottom: 18px; }
  .field-label { display: block; margin-bottom: 7px; font-size: 0.78rem; color: #6a8aaa; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; }
  .field-input, .field-textarea { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 11px 14px; color: #e2eaff; font-size: 0.92rem; font-family: inherit; transition: border-color 0.2s, box-shadow 0.2s; outline: none; }
  .field-input:focus, .field-textarea:focus { border-color: rgba(0,150,255,0.5); box-shadow: 0 0 0 3px rgba(0,100,255,0.1); }
  .field-textarea { resize: vertical; min-height: 80px; }
  .field-input::placeholder, .field-textarea::placeholder { color: #2a3a50; }
  .symptoms-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
  .voice-btn { padding: 5px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #7aabff; cursor: pointer; font-size: 0.78rem; font-family: inherit; transition: all 0.2s; }
  .voice-btn:hover { background: rgba(0,100,255,0.15); border-color: #0066ff; }
  .voice-btn.listening { background: rgba(255,50,50,0.15); border-color: #ff4444; color: #ff8888; animation: pulse 1s infinite; }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
  .body-parts-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .body-part-btn { padding: 7px 13px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); color: #5a7a9a; cursor: pointer; font-size: 0.82rem; font-family: inherit; transition: all 0.18s; display: flex; align-items: center; gap: 5px; }
  .body-part-btn:hover { border-color: rgba(0,150,255,0.3); color: #8aabcf; }
  .body-part-btn.selected { background: rgba(0,100,255,0.15); border-color: rgba(0,150,255,0.5); color: #4d9fff; font-weight: 500; }
  .selected-text { color: #4d9fff; font-size: 0.8rem; margin-top: 10px; }
  .file-input { width: 100%; background: rgba(0,0,0,0.2); border: 1px dashed rgba(255,255,255,0.1); border-radius: 10px; padding: 11px 14px; color: #5a7a9a; font-size: 0.88rem; cursor: pointer; transition: border-color 0.2s; }
  .file-input:hover { border-color: rgba(0,150,255,0.3); }
  .file-ready { color: #00d4aa; font-size: 0.82rem; margin-top: 6px; }
  .analyze-btn { width: 100%; padding: 15px; background: linear-gradient(135deg, #0055dd, #0099bb); border: none; border-radius: 12px; color: #fff; font-size: 1rem; font-weight: 600; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px; cursor: pointer; margin-top: 8px; box-shadow: 0 8px 30px rgba(0,100,255,0.3); transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s; }
  .analyze-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,100,255,0.4); }
  .analyze-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .loading-wrap { text-align: center; padding: 80px 20px; }
  .loading-icon { font-size: 3.5rem; margin-bottom: 20px; animation: spin 3s linear infinite; }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  .loading-title { font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700; color: #4d9fff; margin-bottom: 8px; }
  .loading-sub { color: #5a7a9a; font-size: 0.88rem; margin-bottom: 28px; }
  .loading-steps { display: flex; flex-direction: column; gap: 8px; max-width: 280px; margin: 0 auto; }
  .loading-step { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 10px 16px; color: #6a8aaa; font-size: 0.82rem; display: flex; align-items: center; gap: 8px; }
  .step-dot { width: 6px; height: 6px; border-radius: 50%; background: #0066ff; flex-shrink: 0; }
  .emergency-card { background: rgba(255,50,50,0.08); border: 1px solid rgba(255,50,50,0.3); border-radius: 20px; padding: 24px; margin-bottom: 16px; text-align: center; }
  .emergency-icon { font-size: 2.5rem; margin-bottom: 10px; }
  .emergency-title { font-family: 'Outfit', sans-serif; font-size: 1.2rem; color: #ff6b6b; margin-bottom: 8px; font-weight: 700; }
  .emergency-desc { color: #c08080; font-size: 0.9rem; margin-bottom: 16px; }
  .emergency-btn { padding: 11px 24px; background: #ff4444; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; font-family: inherit; transition: transform 0.2s; }
  .emergency-btn:hover { transform: scale(1.03); }
  .result-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
  .section-title { font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 700; color: #4d9fff; text-transform: uppercase; letter-spacing: 0.5px; }
  .print-btn { padding: 6px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #6a8aaa; font-size: 0.78rem; cursor: pointer; font-family: inherit; transition: all 0.2s; }
  .print-btn:hover { color: #8aabcf; border-color: rgba(0,150,255,0.3); }
  .badge-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
  .badge { padding: 5px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; gap: 5px; }
  .condition-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 22px; margin-bottom: 14px; border-left: 3px solid; transition: transform 0.2s; }
  .condition-card:hover { transform: translateX(4px); }
  .condition-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .condition-name { font-family: 'Outfit', sans-serif; font-size: 1rem; font-weight: 700; color: #e2eaff; }
  .confidence-badge { padding: 3px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 600; }
  .conf-bar-wrap { margin-bottom: 12px; }
  .conf-bar-label { display: flex; justify-content: space-between; margin-bottom: 5px; }
  .conf-bar-text { font-size: 0.75rem; color: #5a7a9a; text-transform: uppercase; letter-spacing: 0.5px; }
  .conf-bar-pct { font-size: 0.75rem; font-weight: 700; }
  .conf-bar-bg { background: rgba(0,0,0,0.3); border-radius: 4px; height: 5px; overflow: hidden; }
  .conf-bar-fill { height: 100%; border-radius: 4px; }
  .condition-desc { color: #8aabcf; font-size: 0.9rem; line-height: 1.65; margin-bottom: 12px; }
  .meta-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
  .meta-chip { background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; padding: 6px 10px; font-size: 0.78rem; }
  .meta-chip-label { color: #5a7a9a; font-weight: 500; }
  .meta-chip-val { color: #c8daf0; margin-left: 4px; font-weight: 600; }
  .next-steps-box { background: rgba(0,100,255,0.05); border: 1px solid rgba(0,100,255,0.15); border-radius: 10px; padding: 11px 14px; margin-bottom: 12px; }
  .next-steps-label { color: #4d9fff; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
  .next-steps-text { color: #8aabcf; font-size: 0.87rem; line-height: 1.55; }
  .timeline { display: flex; flex-direction: column; gap: 0; margin-top: 8px; }
  .timeline-item { display: flex; gap: 12px; align-items: flex-start; padding-bottom: 12px; position: relative; }
  .timeline-dot { width: 10px; height: 10px; border-radius: 50%; background: #4d9fff; flex-shrink: 0; margin-top: 4px; box-shadow: 0 0 8px rgba(77,159,255,0.5); }
  .timeline-line { position: absolute; left: 4px; top: 14px; bottom: 0; width: 2px; background: rgba(77,159,255,0.2); }
  .timeline-text { color: #8aabcf; font-size: 0.84rem; line-height: 1.5; }
  .specialist-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .specialist-btn { padding: 9px 14px; background: rgba(0,100,255,0.06); border: 1px solid rgba(0,100,255,0.2); border-radius: 10px; color: #4d9fff; cursor: pointer; font-size: 0.82rem; font-family: inherit; transition: all 0.2s; }
  .specialist-btn:hover { background: rgba(0,100,255,0.15); transform: translateY(-1px); }
  .specialist-btn.clinic { color: #6a8aaa; border-color: rgba(255,255,255,0.08); background: transparent; }
  .specialist-btn.clinic:hover { color: #8aabcf; border-color: rgba(0,150,255,0.2); }
  .chat-messages { max-height: 240px; overflow-y: auto; margin-bottom: 14px; display: flex; flex-direction: column; gap: 10px; }
  .chat-msg { display: flex; }
  .chat-msg.user { justify-content: flex-end; }
  .chat-bubble { max-width: 78%; padding: 10px 14px; border-radius: 14px; font-size: 0.88rem; line-height: 1.55; }
  .chat-bubble.user { background: linear-gradient(135deg, #0055dd, #0088bb); color: #fff; border-bottom-right-radius: 4px; }
  .chat-bubble.assistant { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #8aabcf; border-bottom-left-radius: 4px; }
  .chat-bubble.thinking { color: #3a5070; font-style: italic; }
  .chat-input-row { display: flex; gap: 8px; }
  .chat-input { flex: 1; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px 13px; color: #e2eaff; font-size: 0.88rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
  .chat-input:focus { border-color: rgba(0,150,255,0.4); }
  .chat-send { padding: 10px 18px; background: linear-gradient(135deg, #0055dd, #0088bb); border: none; border-radius: 10px; color: #fff; font-weight: 600; cursor: pointer; font-family: inherit; transition: transform 0.2s; }
  .chat-send:hover { transform: scale(1.04); }
  .second-btn { width: 100%; padding: 13px; background: transparent; border: 1px solid rgba(0,150,255,0.3); border-radius: 12px; color: #4d9fff; font-size: 0.95rem; font-weight: 600; font-family: 'Outfit', sans-serif; cursor: pointer; transition: all 0.2s; }
  .second-btn:hover { background: rgba(0,100,255,0.08); border-color: #4d9fff; }
  .disclaimer-card { border-color: rgba(255,170,0,0.15) !important; }
  .disclaimer-title { font-family: 'Outfit', sans-serif; font-size: 0.82rem; font-weight: 700; color: #aa9933; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
  .disclaimer-text { color: #5a7a9a; font-size: 0.83rem; line-height: 1.7; margin-bottom: 6px; }
  .disclaimer-bold { color: #8a8060; font-weight: 600; }
  .disclaimer-footer { color: #3a4a5a; font-size: 0.75rem; margin-top: 8px; }
  .reset-btn { width: 100%; padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; color: #4a6a8a; font-size: 0.92rem; cursor: pointer; font-family: inherit; transition: all 0.2s; margin-bottom: 40px; }
  .reset-btn:hover { color: #8aabcf; border-color: rgba(0,150,255,0.2); background: rgba(0,100,255,0.04); }
  .findings-box { background: rgba(0,200,150,0.05); border: 1px solid rgba(0,200,150,0.15); border-radius: 10px; padding: 11px 14px; margin-bottom: 12px; }
  .findings-label { color: #00d4aa; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .findings-text { color: #6abaa8; font-size: 0.87rem; line-height: 1.55; }
  .advice-text { color: #8aabcf; font-size: 0.92rem; line-height: 1.75; }
  .results-section-title { font-family: 'Outfit', sans-serif; font-size: 0.75rem; font-weight: 800; color: #3a5070; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 14px; margin-top: 8px; }
  .summary-text { color: #8aabcf; font-size: 0.92rem; line-height: 1.75; }
  .second-opinion-desc { color: #5a7a9a; font-size: 0.84rem; margin-bottom: 14px; line-height: 1.6; }
  input[type=range] { accent-color: #4d9fff; }
`;

export default function App() {
  const [step, setStep] = useState("form");
  const [result, setResult] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileBase64, setUploadedFileBase64] = useState(null);
  const [uploadedFileMime, setUploadedFileMime] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("raredx_history") || "[]"); } catch { return []; }
  });
  const [form, setForm] = useState({
    age: "", gender: "", symptoms: "", duration: "", testsAlreadyDone: "",
    severity_Pain: 0, severity_Fatigue: 0, severity_Fever: 0, severity_Nausea: 0,
  });
  const recognitionRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const t = TRANSLATIONS[selectedLanguage];
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = () => { setUploadedFileBase64(reader.result.split(",")[1]); setUploadedFileMime(file.type); };
    reader.readAsDataURL(file);
  };

  const toggleBodyPart = (part) => {
    setSelectedBodyParts(prev => prev.includes(part.label) ? prev.filter(p => p !== part.label) : [...prev, part.label]);
  };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Voice input not supported. Try Chrome!"); return; }
    const r = new SR();
    r.lang = selectedLanguage === "ta" ? "ta-IN" : selectedLanguage === "hi" ? "hi-IN" : selectedLanguage === "te" ? "te-IN" : selectedLanguage === "ml" ? "ml-IN" : "en-US";
    r.onstart = () => setIsListening(true);
    r.onresult = (e) => { const tr = e.results[0][0].transcript; setForm(prev => ({ ...prev, symptoms: prev.symptoms ? prev.symptoms + ", " + tr : tr })); };
    r.onend = () => setIsListening(false);
    r.onerror = () => setIsListening(false);
    recognitionRef.current = r; r.start();
  };

  const setAppointmentReminder = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const title = encodeURIComponent("Doctor Appointment - RareDx Follow-up");
    const details = encodeURIComponent(`Follow up on diagnosis: ${result?.possibleConditions?.map(c => c.name).join(", ")}`);
    const dateStr = date.toISOString().replace(/-|:|\.\d+/g, "").slice(0, 15) + "Z";
    const endStr = new Date(date.getTime() + 3600000).toISOString().replace(/-|:|\.\d+/g, "").slice(0, 15) + "Z";
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dateStr}/${endStr}`, "_blank");
    setReminderSet(true);
  };

   const analyze = async () => {
  setStep("loading");
  const key = process.env.REACT_APP_GEMINI_API_KEY;
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + key;

  // Step 1: Match against real Orphanet database
  const dbMatches = matchDiseases(form.symptoms);
  const topDiseasesFromDB = dbMatches.map(d => `${d.name} (matched symptoms: ${d.matchedSymptoms.join(", ")})`).join("\n");

  const bodyPartsText = selectedBodyParts.length > 0 ? `Affected body parts: ${selectedBodyParts.join(", ")}` : "";
  const severityText = SEVERITY_SYMPTOMS.map(s => `${s} severity: ${form["severity_" + s]}/10`).join(", ");
  const langInstruction = selectedLanguage !== "en" ? `Respond with disease names in English but summary, advice and descriptions in ${LANGUAGES.find(l => l.code === selectedLanguage)?.label}.` : "";

  // Step 2: Use Gemini only to explain and enrich — not to guess diseases
  const prompt = `You are a rare disease diagnostic assistant. Based on verified Orphanet database matching, these diseases were identified as possible matches:

${topDiseasesFromDB}

Patient info:
Age: ${form.age}, Gender: ${form.gender}, Symptoms: ${form.symptoms}
Severity: ${severityText}
${bodyPartsText}
Duration: ${form.duration}, Tests done: ${form.testsAlreadyDone}
${uploadedFile ? `Medical report "${uploadedFile.name}" uploaded. Consider this too.` : ""}
${langInstruction}

Based on the Orphanet database matches above AND patient info, provide enriched diagnosis. Return ONLY this JSON:
{"summary":"brief summary","reportFindings":"${uploadedFile ? "key findings" : ""}","riskScore":72,"similarStories":["Real patient story 1","Real patient story 2","Real patient story 3"],"possibleConditions":[{"name":"Disease name from matches above","confidence":"High/Medium/Low","confidencePercent":85,"description":"brief description","affectedPeople":"number","avgDiagnosisTime":"time","nextSteps":"tests/specialists","treatmentTimeline":["Week 1-2: Initial tests","Month 1: Specialist","Month 2-3: Treatment","Month 6+: Monitoring"]}],"urgency":"Immediate/Soon/Routine","generalAdvice":"advice","dietTips":[{"icon":"🥗","category":"Diet","advice":"advice"},{"icon":"💧","category":"Hydration","advice":"advice"},{"icon":"🏃","category":"Exercise","advice":"advice"},{"icon":"😴","category":"Sleep","advice":"advice"},{"icon":"🧘","category":"Stress","advice":"advice"}]}`;

  try {
    const parts = [];
    if (uploadedFileBase64 && uploadedFileMime) parts.push({ inline_data: { mime_type: uploadedFileMime, data: uploadedFileBase64 } });
    parts.push({ text: prompt });
    const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts }] }) });
    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    const newEntry = {
      id: Date.now(), date: new Date().toLocaleDateString(),
      age: form.age, gender: form.gender, symptoms: form.symptoms,
      urgency: parsed.urgency, conditions: parsed.possibleConditions.map(c => c.name).join(", "),
    };
    const updatedHistory = [newEntry, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem("raredx_history", JSON.stringify(updatedHistory));
    setResult(parsed);
    setChatMessages([{ role: "assistant", text: uploadedFile ? t.chatWelcomeReport : t.chatWelcome }]);
    setStep("result");
  } catch { alert("Something went wrong. Check your API key."); setStep("form"); }
};
    setReminderSet(false);
    const key = process.env.REACT_APP_GEMINI_API_KEY;
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + key;
    const bodyPartsText = selectedBodyParts.length > 0 ? `Affected body parts: ${selectedBodyParts.join(", ")}` : "";
    const severityText = SEVERITY_SYMPTOMS.map(s => `${s} severity: ${form["severity_" + s]}/10`).join(", ");
    const langInstruction = selectedLanguage !== "en" ? `Respond with disease names in English but summary, advice and descriptions in ${LANGUAGES.find(l => l.code === selectedLanguage)?.label}.` : "";
    const prompt = `You are a rare disease diagnostic assistant.
Age: ${form.age}, Gender: ${form.gender}, Symptoms: ${form.symptoms}
Severity levels: ${severityText}
${bodyPartsText}
Duration: ${form.duration}, Tests done: ${form.testsAlreadyDone}
${uploadedFile ? `Medical report "${uploadedFile.name}" uploaded. Analyze it carefully.` : ""}
${langInstruction}
Return ONLY this JSON with no extra text:
{"summary":"brief summary","reportFindings":"${uploadedFile ? "key findings from report" : ""}","riskScore":72,"similarStories":["Real patient story 1 with symptoms similar to these","Real patient story 2","Real patient story 3"],"possibleConditions":[{"name":"Disease","confidence":"High/Medium/Low","confidencePercent":85,"description":"brief description","affectedPeople":"worldwide count","avgDiagnosisTime":"avg time to diagnose","nextSteps":"what tests or specialists","treatmentTimeline":["Week 1-2: Initial tests","Month 1: Specialist consultation","Month 2-3: Treatment begins","Month 6+: Monitoring and follow-up"]}],"urgency":"Immediate/Soon/Routine","generalAdvice":"advice","dietTips":[{"icon":"🥗","category":"Diet","advice":"what to eat or avoid"},{"icon":"💧","category":"Hydration","advice":"fluid intake advice"},{"icon":"🏃","category":"Exercise","advice":"activity recommendations"},{"icon":"😴","category":"Sleep","advice":"rest recommendations"},{"icon":"🧘","category":"Stress","advice":"stress management tips"}]}`;
    try {
      const parts = [];
      if (uploadedFileBase64 && uploadedFileMime) parts.push({ inline_data: { mime_type: uploadedFileMime, data: uploadedFileBase64 } });
      parts.push({ text: prompt });
      const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts }] }) });
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      const newEntry = {
        id: Date.now(), date: new Date().toLocaleDateString(),
        age: form.age, gender: form.gender, symptoms: form.symptoms,
        urgency: parsed.urgency, conditions: parsed.possibleConditions.map(c => c.name).join(", "),
      };
      const updatedHistory = [newEntry, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("raredx_history", JSON.stringify(updatedHistory));
      setResult(parsed);
      setChatMessages([{ role: "assistant", text: uploadedFile ? t.chatWelcomeReport : t.chatWelcome }]);
      setStep("result");
    } catch { alert("Something went wrong. Check your API key."); setStep("form"); }
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput; setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setChatLoading(true);
    const key = process.env.REACT_APP_GEMINI_API_KEY;
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + key;
    const history2 = chatMessages.map(m => `${m.role === "user" ? "Patient" : "Doctor"}: ${m.text}`).join("\n");
    try {
      const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: `Medical assistant. Patient: Age ${form.age}, ${form.gender}, Symptoms: ${form.symptoms}. Diagnosis: ${JSON.stringify(result)}.\n${history2}\nPatient: ${userMsg}\nAnswer concisely.` }] }] }) });
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: "assistant", text: data.candidates[0].content.parts[0].text }]);
    } catch { setChatMessages(prev => [...prev, { role: "assistant", text: "Sorry, something went wrong." }]); }
    setChatLoading(false);
  };

  const reset = () => {
    setStep("form"); setResult(null); setChatMessages([]);
    setUploadedFile(null); setUploadedFileBase64(null); setUploadedFileMime(null);
    setSelectedBodyParts([]); setReminderSet(false);
    setForm({ age: "", gender: "", symptoms: "", duration: "", testsAlreadyDone: "", severity_Pain: 0, severity_Fatigue: 0, severity_Fever: 0, severity_Nausea: 0 });
  };

  const urgencyColor = { Immediate: "#ff4444", Soon: "#ffaa00", Routine: "#00d4aa" };
  const cc = (c) => c === "High" ? "#4d9fff" : c === "Medium" ? "#ffaa00" : "#5a8090";
  const riskColor = (s) => s > 70 ? "#ff4444" : s > 40 ? "#ffaa00" : "#00d4aa";

  return (
    <div className="raredx-wrap">
      <div className="raredx-inner">
        <div className="header">
          <div className="header-logo">
            <div className="dna-icon">🧬</div>
            <h1>{t.title}</h1>
          </div>
          <p>{t.subtitle}</p>
          <div className="stats">
            {[["300M+", t.stat1], ["100+", t.stat2], ["4–5 yrs", t.stat3]].map(([n, l]) => (
              <div key={n} className="stat-card"><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
            ))}
          </div>
          <div style={{ marginBottom: "14px" }}>
            <button onClick={() => setShowHistory(!showHistory)}
              style={{ padding: "7px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", color: "#6a8aaa", cursor: "pointer", fontSize: "0.82rem", fontFamily: "inherit", transition: "all 0.2s" }}>
              📋 {showHistory ? "Hide History" : `History (${history.length})`}
            </button>
          </div>
          {showHistory && (
            <div className="card" style={{ marginBottom: "20px", textAlign: "left" }}>
              <div className="section-title" style={{ marginBottom: "14px" }}>📋 Past Diagnoses</div>
              {history.length === 0 ? (
                <p style={{ color: "#3a5070", fontSize: "0.85rem" }}>No past diagnoses yet.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {history.map((h) => (
                    <div key={h.id} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "12px 14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ color: "#4d9fff", fontSize: "0.8rem", fontWeight: "600" }}>{h.date}</span>
                        <span style={{ padding: "2px 10px", borderRadius: "10px", fontSize: "0.75rem", fontWeight: "600", background: h.urgency === "Immediate" ? "#ff444420" : h.urgency === "Soon" ? "#ffaa0020" : "#00d4aa20", color: h.urgency === "Immediate" ? "#ff4444" : h.urgency === "Soon" ? "#ffaa00" : "#00d4aa" }}>{h.urgency}</span>
                      </div>
                      <div style={{ color: "#8aabcf", fontSize: "0.82rem", marginBottom: "4px" }}>👤 {h.age}yr {h.gender} — {h.symptoms.substring(0, 50)}{h.symptoms.length > 50 ? "..." : ""}</div>
                      <div style={{ color: "#5a7a9a", fontSize: "0.78rem" }}>🎯 {h.conditions}</div>
                    </div>
                  ))}
                  <button onClick={() => { setHistory([]); localStorage.removeItem("raredx_history"); }}
                    style={{ padding: "7px", background: "transparent", border: "1px solid rgba(255,50,50,0.2)", borderRadius: "8px", color: "#ff6666", cursor: "pointer", fontSize: "0.78rem", fontFamily: "inherit" }}>
                    🗑️ Clear History
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="lang-bar">
            {LANGUAGES.map(lang => (
              <button key={lang.code} className={`lang-btn ${selectedLanguage === lang.code ? "active" : ""}`} onClick={() => setSelectedLanguage(lang.code)}>{lang.label}</button>
            ))}
          </div>
        </div>

        {step === "form" && (
          <div className="card">
            <div className="card-title">{t.formTitle}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              {[{ label: t.age, name: "age", placeholder: t.agePlaceholder }, { label: t.gender, name: "gender", placeholder: t.genderPlaceholder }].map(f => (
                <div key={f.name} className="field">
                  <label className="field-label">{f.label}</label>
                  <input name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} className="field-input" />
                </div>
              ))}
            </div>
            {[{ label: t.duration, name: "duration", placeholder: t.durationPlaceholder }, { label: t.tests, name: "testsAlreadyDone", placeholder: t.testsPlaceholder }].map(f => (
              <div key={f.name} className="field">
                <label className="field-label">{f.label}</label>
                <input name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} className="field-input" />
              </div>
            ))}

            {/* Severity Sliders */}
            <div className="field">
              <label className="field-label">Symptom Severity (0-10)</label>
              <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {SEVERITY_SYMPTOMS.map((symptom) => (
                  <div key={symptom}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ color: "#6a8aaa", fontSize: "0.82rem", fontWeight: "600" }}>{symptom}</span>
                      <span style={{ color: form["severity_" + symptom] > 6 ? "#ff4444" : form["severity_" + symptom] > 3 ? "#ffaa00" : "#4d9fff", fontSize: "0.82rem", fontWeight: "700" }}>{form["severity_" + symptom]}/10</span>
                    </div>
                    <input type="range" min="0" max="10" value={form["severity_" + symptom]}
                      onChange={(e) => setForm(prev => ({ ...prev, ["severity_" + symptom]: e.target.value }))}
                      style={{ width: "100%", cursor: "pointer" }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Symptoms + Voice */}
            <div className="field">
              <div className="symptoms-header">
                <label className="field-label" style={{ margin: 0 }}>{t.symptoms}</label>
                <button onClick={startVoice} className={`voice-btn ${isListening ? "listening" : ""}`}>{isListening ? t.listeningBtn : t.voiceBtn}</button>
              </div>
              <textarea name="symptoms" value={form.symptoms} onChange={handleChange} placeholder={t.symptomsPlaceholder} className="field-textarea" />
            </div>

            {/* Body Parts */}
            <div className="field">
              <label className="field-label">{t.bodyParts}</label>
              <div className="body-parts-grid">
                {BODY_PARTS.map(part => (
                  <button key={part.id} onClick={() => toggleBodyPart(part)} className={`body-part-btn ${selectedBodyParts.includes(part.label) ? "selected" : ""}`}>
                    {part.icon} {part.label}
                  </button>
                ))}
              </div>
              {selectedBodyParts.length > 0 && <div className="selected-text">✓ {t.selected}: {selectedBodyParts.join(", ")}</div>}
            </div>

            {/* File Upload */}
            <div className="field">
              <label className="field-label">{t.uploadReport}</label>
              <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="file-input" />
              {uploadedFile && <div className="file-ready">✅ {uploadedFile.name} {t.uploadReady}</div>}
            </div>

            <button onClick={analyze} disabled={!form.age || !form.symptoms} className="analyze-btn">{t.analyzeBtn} →</button>
          </div>
        )}

        {step === "loading" && (
          <div className="loading-wrap">
            <div className="loading-icon">🔬</div>
            <div className="loading-title">{t.analyzingTitle}</div>
            <div className="loading-sub">{t.analyzingSubtitle}</div>
            <div className="loading-steps">
              {[t.step1, t.step2, t.step3].map((s, i) => (
                <div key={i} className="loading-step"><div className="step-dot" />{s}</div>
              ))}
            </div>
          </div>
        )}

        {step === "result" && result && (
          <div>
            {result.urgency === "Immediate" && (
              <div className="emergency-card">
                <div className="emergency-icon">🚨</div>
                <div className="emergency-title">{t.emergencyTitle}</div>
                <div className="emergency-desc">{t.emergencyDesc}</div>
                <button className="emergency-btn" onClick={() => window.open("https://www.google.com/maps/search/emergency+hospital+near+me", "_blank")}>{t.emergencyBtn}</button>
              </div>
            )}

            {/* Risk Score Meter */}
            {result.riskScore && (
              <div className="card" style={{ textAlign: "center" }}>
                <div className="section-title" style={{ marginBottom: "16px" }}>⚠️ Overall Risk Score</div>
                <div style={{ position: "relative", width: "150px", height: "150px", margin: "0 auto 16px" }}>
                  <svg viewBox="0 0 150 150" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                    <circle cx="75" cy="75" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                    <circle cx="75" cy="75" r="60" fill="none"
                      stroke={riskColor(result.riskScore)} strokeWidth="12" strokeLinecap="round"
                      strokeDasharray={`${(result.riskScore / 100) * 377} 377`} />
                  </svg>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                    <div style={{ fontSize: "1.8rem", fontWeight: "800", color: riskColor(result.riskScore), fontFamily: "'Outfit', sans-serif" }}>{result.riskScore}</div>
                    <div style={{ fontSize: "0.7rem", color: "#5a7a9a", textTransform: "uppercase" }}>/ 100</div>
                  </div>
                </div>
                <div style={{ color: riskColor(result.riskScore), fontWeight: "700", fontSize: "0.9rem", marginBottom: "6px" }}>
                  {result.riskScore > 70 ? "🔴 High Risk" : result.riskScore > 40 ? "🟡 Moderate Risk" : "🟢 Low Risk"}
                </div>
                <div style={{ color: "#5a7a9a", fontSize: "0.8rem" }}>Based on symptoms, severity and duration</div>
              </div>
            )}

            {/* Case Summary */}
            <div className="card">
              <div className="result-header">
                <div className="section-title">{t.caseSummary}</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button className="print-btn" onClick={() => window.print()}>🖨️ {t.printReport}</button>
                  <button className="print-btn" onClick={() => {
                    const text = `🧬 *RareDx Medical Report*\n\n👤 Patient: ${form.age}yr ${form.gender}\n⚡ Urgency: ${result.urgency}\n🔴 Risk Score: ${result.riskScore}/100\n\n📋 *Summary:*\n${result.summary}\n\n🎯 *Possible Conditions:*\n${result.possibleConditions.map((c, i) => `${i + 1}. ${c.name} (${c.confidence} Match - ${c.confidencePercent}%)\n   ${c.description}\n   ✅ Next Steps: ${c.nextSteps}`).join("\n\n")}\n\n💡 *General Advice:*\n${result.generalAdvice}\n\n⚠️ AI-generated. Always consult a qualified doctor.\n_Generated by RareDx_`;
                    navigator.clipboard.writeText(text);
                    alert("Report copied! Paste in WhatsApp, Email or any app.");
                  }}>📋 Copy</button>
                  <button className="print-btn" onClick={() => {
                    const text = `🧬 RareDx Report - ${form.age}yr ${form.gender} - Risk: ${result.riskScore}/100 - Urgency: ${result.urgency} - ${result.possibleConditions.map(c => c.name).join(", ")}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
                  }}>💚 WA</button>
                </div>
              </div>
              <p className="summary-text">{result.summary}</p>
              {result.reportFindings && (
                <div className="findings-box" style={{ marginTop: "14px" }}>
                  <div className="findings-label">{t.reportFindings}</div>
                  <div className="findings-text">{result.reportFindings}</div>
                </div>
              )}
              <div className="badge-row">
                <span className="badge" style={{ background: urgencyColor[result.urgency] + "18", color: urgencyColor[result.urgency], border: `1px solid ${urgencyColor[result.urgency]}40` }}>⚡ {t.urgency}: {result.urgency}</span>
                <span className="badge" style={{ background: "rgba(77,159,255,0.1)", color: "#4d9fff", border: "1px solid rgba(77,159,255,0.2)" }}>👤 {form.age}yr {form.gender}</span>
              </div>
            </div>

            {/* Similar Patient Stories */}
            {result.similarStories && result.similarStories.length > 0 && (
              <div className="card">
                <div className="section-title" style={{ marginBottom: "14px" }}>👥 Similar Patient Stories</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {result.similarStories.map((story, i) => (
                    <div key={i} style={{ background: "rgba(77,159,255,0.05)", border: "1px solid rgba(77,159,255,0.1)", borderRadius: "10px", padding: "12px 14px", display: "flex", gap: "10px" }}>
                      <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>💬</span>
                      <p style={{ color: "#8aabcf", fontSize: "0.87rem", lineHeight: "1.55" }}>{story}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Possible Conditions */}
            <div className="results-section-title">{t.possibleConditions}</div>
            {result.possibleConditions.map((c, i) => (
              <div key={i} className="condition-card" style={{ borderLeftColor: cc(c.confidence) }}>
                <div className="condition-header">
                  <div className="condition-name">{c.name}</div>
                  <span className="confidence-badge" style={{ background: cc(c.confidence) + "18", color: cc(c.confidence) }}>{c.confidence} {t.match}</span>
                </div>
                <div className="conf-bar-wrap">
                  <div className="conf-bar-label">
                    <span className="conf-bar-text">{t.confidence}</span>
                    <span className="conf-bar-pct" style={{ color: cc(c.confidence) }}>{c.confidencePercent || 70}%</span>
                  </div>
                  <div className="conf-bar-bg">
                    <div className="conf-bar-fill" style={{ width: (c.confidencePercent || 70) + "%", background: `linear-gradient(90deg, ${cc(c.confidence)}, ${cc(c.confidence)}99)` }} />
                  </div>
                </div>
                <div className="condition-desc">{c.description}</div>
                <div className="meta-chips">
                  {c.affectedPeople && <div className="meta-chip"><span className="meta-chip-label">{t.affected}:</span><span className="meta-chip-val">{c.affectedPeople}</span></div>}
                  {c.avgDiagnosisTime && <div className="meta-chip"><span className="meta-chip-label">{t.avgDiagnosis}:</span><span className="meta-chip-val" style={{ color: "#ff8888" }}>{c.avgDiagnosisTime}</span></div>}
                </div>
                <div className="next-steps-box">
                  <div className="next-steps-label">{t.nextSteps}</div>
                  <div className="next-steps-text">{c.nextSteps}</div>
                </div>

                {/* Treatment Timeline */}
                {c.treatmentTimeline && c.treatmentTimeline.length > 0 && (
                  <div style={{ marginTop: "12px" }}>
                    <div style={{ color: "#4d9fff", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>🗓️ Treatment Timeline</div>
                    <div className="timeline">
                      {c.treatmentTimeline.map((step, idx) => (
                        <div key={idx} className="timeline-item">
                          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div className="timeline-dot" />
                            {idx < c.treatmentTimeline.length - 1 && <div className="timeline-line" />}
                          </div>
                          <div className="timeline-text">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* General Advice */}
            <div className="card">
              <div className="section-title" style={{ marginBottom: "12px" }}>{t.generalAdvice}</div>
              <p className="advice-text">{result.generalAdvice}</p>
            </div>

            {/* Diet Tips */}
            {result.dietTips && (
              <div className="card">
                <div className="section-title" style={{ marginBottom: "14px" }}>🥗 Diet & Lifestyle Tips</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {result.dietTips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "rgba(0,200,100,0.05)", border: "1px solid rgba(0,200,100,0.1)", borderRadius: "10px", padding: "12px" }}>
                      <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{tip.icon}</span>
                      <div>
                        <div style={{ color: "#00d4aa", fontSize: "0.78rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "3px" }}>{tip.category}</div>
                        <div style={{ color: "#8aabcf", fontSize: "0.87rem", lineHeight: "1.55" }}>{tip.advice}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appointment Reminder */}
            <div className="card">
              <div className="section-title" style={{ marginBottom: "8px" }}>📅 Appointment Reminder</div>
              <p style={{ color: "#5a7a9a", fontSize: "0.84rem", marginBottom: "14px", lineHeight: "1.6" }}>Set a Google Calendar reminder to follow up with your doctor in 7 days.</p>
              <button onClick={setAppointmentReminder}
                style={{ width: "100%", padding: "12px", background: reminderSet ? "rgba(0,212,170,0.1)" : "rgba(0,100,255,0.08)", border: `1px solid ${reminderSet ? "rgba(0,212,170,0.3)" : "rgba(0,150,255,0.3)"}`, borderRadius: "10px", color: reminderSet ? "#00d4aa" : "#4d9fff", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", fontSize: "0.92rem", transition: "all 0.2s" }}>
                {reminderSet ? "✅ Reminder Set in Google Calendar!" : "📅 Set Appointment Reminder"}
              </button>
            </div>

            {/* Find Specialist */}
            <div className="card">
              <div className="section-title" style={{ marginBottom: "14px" }}>{t.findSpecialist}</div>
              <div className="specialist-grid">
                {result.possibleConditions.map((c, i) => (
                  <button key={i} className="specialist-btn" onClick={() => window.open(`https://www.google.com/maps/search/${c.name.split(" ")[0]}+specialist+near+me`, "_blank")}>
                    🔍 {c.name}
                  </button>
                ))}
                <button className="specialist-btn clinic" onClick={() => window.open("https://www.google.com/maps/search/rare+disease+specialist+near+me", "_blank")}>
                  🏥 {t.findClinic}
                </button>
              </div>
            </div>

            {/* Chat */}
            <div className="card">
              <div className="section-title" style={{ marginBottom: "14px" }}>{t.chatTitle}</div>
              <div className="chat-messages">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`chat-msg ${msg.role}`}>
                    <div className={`chat-bubble ${msg.role}`}>{msg.text}</div>
                  </div>
                ))}
                {chatLoading && <div className="chat-msg assistant"><div className="chat-bubble assistant thinking">Thinking...</div></div>}
              </div>
              <div className="chat-input-row">
                <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder={t.chatPlaceholder} className="chat-input" />
                <button onClick={sendChat} className="chat-send">{t.sendBtn}</button>
              </div>
            </div>

            {/* Second Opinion */}
            <div className="card">
              <div className="section-title" style={{ marginBottom: "6px" }}>{t.secondOpinion}</div>
              <p className="second-opinion-desc">{t.secondOpinionDesc}</p>
              <button onClick={analyze} className="second-btn">{t.secondOpinionBtn}</button>
            </div>

            {/* Disclaimer */}
            <div className="card disclaimer-card">
              <div className="disclaimer-title">{t.disclaimer}</div>
              <p className="disclaimer-text">{t.disclaimerText1} <span className="disclaimer-bold">{t.disclaimerBold}</span></p>
              <p className="disclaimer-text">{t.disclaimerText2}</p>
              <p className="disclaimer-footer">{t.disclaimerFooter}</p>
            </div>

            <button onClick={reset} className="reset-btn">{t.newAnalysis}</button>
            <div style={{ textAlign: "center", padding: "16px", marginTop: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", color: "#2a3a4a", fontSize: "0.75rem", lineHeight: "1.8" }}>
  © {new Date().getFullYear()} RareDx. All Rights Reserved.<br/>
  Built by Team Laksitha · Powered by Gemini AI · Deployed on Vercel<br/>
  🧬 Turning Years of Suffering into Seconds of Clarity
</div>
          </div>
        )}
      </div>
    </div>
  );
}