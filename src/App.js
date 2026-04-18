import { matchDiseases } from './diseaseDatabase';
import { useState, useRef, useEffect } from "react";

const TRANSLATIONS = {
  en: {
    title: "RareDx", subtitle: "AI-powered Rare Disease Diagnosis Assistant",
    stat1: "People with rare diseases", stat2: "Diseases in database", stat3: "Avg diagnosis delay",
    stat1Num: "300M+", stat2Num: "100+", stat3Num: "4–5 yrs",
    formTitle: "Patient Information", age: "Age", agePlaceholder: "e.g. 28",
    gender: "Gender", genderPlaceholder: "e.g. Female",
    duration: "Duration of Symptoms", durationPlaceholder: "e.g. 6 months",
    tests: "Tests Already Done", testsPlaceholder: "e.g. blood test normal",
    symptoms: "Symptoms", symptomsPlaceholder: "Describe symptoms... e.g. joint pain, fatigue, rash",
    voiceBtn: "🎤 Voice", listeningBtn: "🔴 Listening...",
    bodyParts: "Affected Body Parts", selected: "Selected",
    uploadReport: "Upload Medical Report (optional)", uploadReady: "ready",
    chooseFile: "📎 Choose File", noFileChosen: "No file chosen",
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
    
    pain: "Pain", fatigue: "Fatigue", fever: "Fever", nausea: "Nausea",
    pastDiagnoses: "Past Diagnoses", hideHistory: "Hide History", showHistory: "History",
    clearHistory: "🗑️ Clear History", noPastDiagnoses: "No past diagnoses yet.",
    dietTitle: "🥗 Diet & Lifestyle Tips",
    appointmentTitle: "📅 Appointment Reminder",
    appointmentDesc: "Set a Google Calendar reminder to follow up with your doctor in 7 days.",
    appointmentBtn: "📅 Set Appointment Reminder",
    reminderSetText: "✅ Reminder Set in Google Calendar!",
    riskTitle: "⚠️ Overall Risk Score",
    riskHigh: "🔴 High Risk", riskMedium: "🟡 Moderate Risk", riskLow: "🟢 Low Risk",
    riskSubtitle: "Based on symptoms, severity and duration",
    treatmentTimeline: "🗓️ Treatment Timeline",
    similarStories: "👥 Similar Patient Stories",

    copyBtn: "Copy", waBtn: "WA",
    thinking: "Thinking...",
    bodyPartLabels: ["Head","Neck","Chest","Abdomen","Back","Left Arm","Right Arm","Left Leg","Right Leg","Joints"],
    
  },
  ta: {
    title: "RareDx", subtitle: "AI-சக்தி வாய்ந்த அரிய நோய் கண்டறியும் உதவியாளர்",
    stat1: "அரிய நோயால் பாதிக்கப்பட்டவர்கள்", stat2: "தரவுத்தளத்தில் நோய்கள்", stat3: "சராசரி கண்டறிதல் தாமதம்",
    stat1Num: "30 கோடி+", stat2Num: "100+", stat3Num: "4–5 ஆண்டுகள்",
    formTitle: "நோயாளி தகவல்", age: "வயது", agePlaceholder: "எ.கா. 28",
    gender: "பாலினம்", genderPlaceholder: "எ.கா. பெண்",
    duration: "அறிகுறிகளின் காலம்", durationPlaceholder: "எ.கா. 6 மாதங்கள்",
    tests: "ஏற்கனவே செய்த பரிசோதனைகள்", testsPlaceholder: "எ.கா. இரத்த பரிசோதனை சாதாரணம்",
    symptoms: "அறிகுறிகள்", symptomsPlaceholder: "அறிகுறிகளை விவரிக்கவும்...",
    voiceBtn: "🎤 குரல்", listeningBtn: "🔴 கேட்கிறது...",
    bodyParts: "பாதிக்கப்பட்ட உடல் பாகங்கள்", selected: "தேர்ந்தெடுக்கப்பட்டது",
    uploadReport: "மருத்துவ அறிக்கை பதிவேற்றவும்", uploadReady: "தயார்",
    chooseFile: "📎 கோப்பை தேர்ந்தெடு", noFileChosen: "கோப்பு தேர்வு செய்யப்படவில்லை",
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
    
    pain: "வலி", fatigue: "சோர்வு", fever: "காய்ச்சல்", nausea: "குமட்டல்",
    pastDiagnoses: "கடந்த கால நோய் கண்டறிதல்", hideHistory: "வரலாற்றை மறை", showHistory: "வரலாறு",
    clearHistory: "🗑️ வரலாற்றை அழி", noPastDiagnoses: "இன்னும் கண்டறிதல் வரலாறு இல்லை.",
    dietTitle: "🥗 உணவு & வாழ்க்கை முறை குறிப்புகள்",
    appointmentTitle: "📅 சந்திப்பு நினைவூட்டல்",
    appointmentDesc: "7 நாட்களில் மருத்துவரை பின்தொடர Google Calendar நினைவூட்டல் அமைக்கவும்.",
    appointmentBtn: "📅 சந்திப்பு நினைவூட்டல் அமை",
    reminderSetText: "✅ Google Calendar-ல் நினைவூட்டல் அமைக்கப்பட்டது!",
    riskTitle: "⚠️ ஒட்டுமொத்த ஆபத்து மதிப்பீடு",
    riskHigh: "🔴 அதிக ஆபத்து", riskMedium: "🟡 மிதமான ஆபத்து", riskLow: "🟢 குறைந்த ஆபத்து",
    riskSubtitle: "அறிகுறிகள், தீவிரம் மற்றும் காலம் அடிப்படையில்",
    treatmentTimeline: "🗓️ சிகிச்சை காலவரிசை",
    similarStories: "👥 ஒத்த நோயாளர் கதைகள்",
    thinking: "யோசிக்கிறேன்...",
    copyBtn: "நகலெடு", waBtn: "வாட்ஸ்அப்",
    bodyPartLabels: ["தலை","கழுத்து","மார்பு","வயிறு","முதுகு","இடது கை","வலது கை","இடது கால்","வலது கால்","மூட்டுகள்"],
  },
  hi: {
    title: "RareDx", subtitle: "AI-संचालित दुर्लभ रोग निदान सहायक",
    stat1: "दुर्लभ बीमारियों से प्रभावित", stat2: "डेटाबेस में बीमारियाँ", stat3: "औसत निदान देरी",
    stat1Num: "30 करोड़+", stat2Num: "100+", stat3Num: "4–5 वर्ष",
    formTitle: "रोगी जानकारी", age: "आयु", agePlaceholder: "जैसे 28",
    gender: "लिंग", genderPlaceholder: "जैसे महिला",
    duration: "लक्षणों की अवधि", durationPlaceholder: "जैसे 6 महीने",
    tests: "पहले किए गए परीक्षण", testsPlaceholder: "जैसे रक्त परीक्षण सामान्य",
    symptoms: "लक्षण", symptomsPlaceholder: "लक्षण बताएं...",
    voiceBtn: "🎤 आवाज़", listeningBtn: "🔴 सुन रहा है...",
    bodyParts: "प्रभावित शरीर के अंग", selected: "चयनित",
    uploadReport: "चिकित्सा रिपोर्ट अपलोड करें", uploadReady: "तैयार",
    chooseFile: "📎 फ़ाइल चुनें", noFileChosen: "कोई फ़ाइल नहीं चुनी",
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
    disclaimerBold: "पेशेवर चिकित्सा सलाह का विकल्प नहीं है।",
    disclaimerText2: "हमेशा अपने चिकित्सक की सलाह लें।",
    disclaimerFooter: "© 2025 RareDx • केवल शैक्षिक उद्देश्यों के लिए",
    newAnalysis: "← नया विश्लेषण", emergencyTitle: "तत्काल चिकित्सा ध्यान आवश्यक!",
    emergencyDesc: "कृपया तुरंत आपातकालीन देखभाल लें।",
    emergencyBtn: "निकटतम अस्पताल", chatWelcome: "लक्षणों का विश्लेषण किया। पूछें!",
    chatWelcomeReport: "लक्षण और रिपोर्ट का विश्लेषण किया!", match: "मिलान",
    
    pain: "दर्द", fatigue: "थकान", fever: "बुखार", nausea: "मतली",
    pastDiagnoses: "पिछले निदान", hideHistory: "इतिहास छुपाएं", showHistory: "इतिहास",
    clearHistory: "🗑️ इतिहास साफ करें", noPastDiagnoses: "अभी तक कोई निदान नहीं।",
    dietTitle: "🥗 आहार और जीवनशैली सुझाव",
    appointmentTitle: "📅 अपॉइंटमेंट रिमाइंडर",
    appointmentDesc: "7 दिनों में डॉक्टर से फॉलो अप के लिए Google Calendar रिमाइंडर सेट करें।",
    appointmentBtn: "📅 अपॉइंटमेंट रिमाइंडर सेट करें",
    reminderSetText: "✅ Google Calendar में रिमाइंडर सेट!",
    riskTitle: "⚠️ समग्र जोखिम स्कोर",
    riskHigh: "🔴 उच्च जोखिम", riskMedium: "🟡 मध्यम जोखिम", riskLow: "🟢 कम जोखिम",
    riskSubtitle: "लक्षण, गंभीरता और अवधि के आधार पर",
    treatmentTimeline: "🗓️ उपचार समयरेखा",
    similarStories: "👥 समान रोगी कहानियाँ",
    thinking: "सोच रहा हूं...",
    copyBtn: "कॉपी", waBtn: "व्हाट्सएप",
    bodyPartLabels: ["सिर","गर्दन","छाती","पेट","पीठ","बायाँ हाथ","दायाँ हाथ","बायाँ पैर","दायाँ पैर","जोड़"],
  },
  te: {
    title: "RareDx", subtitle: "AI-ఆధారిత అరుదైన వ్యాధి నిర్ధారణ సహాయకుడు",
    stat1: "అరుదైన వ్యాధులతో బాధపడుతున్నవారు", stat2: "డేటాబేస్‌లో వ్యాధులు", stat3: "సగటు నిర్ధారణ జాప్యం",
    stat1Num: "30 కోట్లు+", stat2Num: "100+", stat3Num: "4–5 సంవత్సరాలు",
    formTitle: "రోగి సమాచారం", age: "వయసు", agePlaceholder: "ఉదా. 28",
    gender: "లింగం", genderPlaceholder: "ఉదా. మహిళ",
    duration: "లక్షణాల వ్యవధి", durationPlaceholder: "ఉదా. 6 నెలలు",
    tests: "ఇప్పటికే చేసిన పరీక్షలు", testsPlaceholder: "ఉదా. రక్త పరీక్ష సాధారణం",
    symptoms: "లక్షణాలు", symptomsPlaceholder: "లక్షణాలు వివరించండి...",
    voiceBtn: "🎤 వాయిస్", listeningBtn: "🔴 వింటోంది...",
    bodyParts: "ప్రభావిత శరీర భాగాలు", selected: "ఎంచుకున్నవి",
    uploadReport: "వైద్య నివేదిక అప్‌లోడ్", uploadReady: "సిద్ధంగా ఉంది",
    chooseFile: "📎 ఫైల్ ఎంచుకోండి", noFileChosen: "ఫైల్ ఎంచుకోలేదు",
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
    
    pain: "నొప్పి", fatigue: "అలసట", fever: "జ్వరం", nausea: "వికారం",
    pastDiagnoses: "గత నిర్ధారణలు", hideHistory: "చరిత్ర దాచు", showHistory: "చరిత్ర",
    clearHistory: "🗑️ చరిత్ర తొలగించు", noPastDiagnoses: "ఇంకా నిర్ధారణ చరిత్ర లేదు.",
    dietTitle: "🥗 ఆహారం & జీవనశైలి చిట్కాలు",
    appointmentTitle: "📅 అపాయింట్‌మెంట్ రిమైండర్",
    appointmentDesc: "7 రోజులలో డాక్టర్‌ను సంప్రదించడానికి Google Calendar రిమైండర్ సెట్ చేయండి.",
    appointmentBtn: "📅 అపాయింట్‌మెంట్ రిమైండర్ సెట్ చేయి",
    reminderSetText: "✅ Google Calendar లో రిమైండర్ సెట్ అయింది!",
    riskTitle: "⚠️ మొత్తం ప్రమాద స్కోర్",
    riskHigh: "🔴 అధిక ప్రమాదం", riskMedium: "🟡 మధ్యస్థ ప్రమాదం", riskLow: "🟢 తక్కువ ప్రమాదం",
    riskSubtitle: "లక్షణాలు, తీవ్రత మరియు వ్యవధి ఆధారంగా",
    treatmentTimeline: "🗓️ చికిత్స కాలక్రమం",
    similarStories: "👥 ఇలాంటి రోగుల కథలు",
    thinking: "ఆలోచిస్తున్నాను...",
    copyBtn: "కాపీ", waBtn: "వాట్సాప్",
    bodyPartLabels: ["తల","మెడ","ఛాతీ","పొట్ట","వీపు","ఎడమ చేయి","కుడి చేయి","ఎడమ కాలు","కుడి కాలు","కీళ్ళు"],
  },
  ml: {
    title: "RareDx", subtitle: "AI-ശക്തിയുള്ള അപൂർവ രോഗ നിർണ്ണയ സഹായി",
    stat1: "അപൂർവ രോഗങ്ങൾ ബാധിച്ചവർ", stat2: "ഡാറ്റാബേസിലെ രോഗങ്ങൾ", stat3: "ശരാശരി നിർണ്ണയ കാലതാമസം",
    stat1Num: "30 കോടി+", stat2Num: "100+", stat3Num: "4–5 വർഷം",
    formTitle: "രോഗി വിവരങ്ങൾ", age: "പ്രായം", agePlaceholder: "ഉദാ. 28",
    gender: "ലിംഗം", genderPlaceholder: "ഉദാ. സ്ത്രീ",
    duration: "ലക്ഷണങ്ങളുടെ ദൈർഘ്യം", durationPlaceholder: "ഉദാ. 6 മാസം",
    tests: "ഇതിനകം ചെയ്ത പരിശോധനകൾ", testsPlaceholder: "ഉദാ. രക്തപരിശോധന സാധാരണം",
    symptoms: "ലക്ഷണങ്ങൾ", symptomsPlaceholder: "ലക്ഷണങ്ങൾ വിവരിക്കുക...",
    voiceBtn: "🎤 ശബ്ദം", listeningBtn: "🔴 കേൾക്കുന്നു...",
    bodyParts: "ബാധിച്ച ശരീരഭാഗങ്ങൾ", selected: "തിരഞ്ഞെടുത്തത്",
    uploadReport: "മെഡിക്കൽ റിപ്പോർട്ട് അപ്‌ലോഡ്", uploadReady: "തയ്യാർ",
    chooseFile: "📎 ഫയൽ തിരഞ്ഞെടുക്കുക", noFileChosen: "ഫയൽ തിരഞ്ഞെടുത്തിട്ടില്ല",
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
    
    pain: "വേദന", fatigue: "ക്ഷീണം", fever: "പനി", nausea: "ഓക്കാനം",
    pastDiagnoses: "മുൻ നിർണ്ണയങ്ങൾ", hideHistory: "ചരിത്രം മറയ്ക്കുക", showHistory: "ചരിത്രം",
    clearHistory: "🗑️ ചരിത്രം മായ്ക്കുക", noPastDiagnoses: "ഇതുവരെ നിർണ്ണയ ചരിത്രം ഇല്ല.",
    dietTitle: "🥗 ഭക്ഷണ & ജീവിതശൈലി നുറുങ്ങുകൾ",
    appointmentTitle: "📅 അപ്പോയിന്റ്മെന്റ് റിമൈൻഡർ",
    appointmentDesc: "7 ദിവസത്തിനുള്ളിൽ ഡോക്ടറെ ഫോളോ അപ്പ് ചെയ്യാൻ Google Calendar റിമൈൻഡർ സജ്ജമാക്കുക.",
    appointmentBtn: "📅 അപ്പോയിന്റ്മെന്റ് റിമൈൻഡർ സജ്ജമാക്കുക",
    reminderSetText: "✅ Google Calendar-ൽ റിമൈൻഡർ സജ്ജമായി!",
    riskTitle: "⚠️ മൊത്തം അപകട സ്കോർ",
    riskHigh: "🔴 ഉയർന്ന അപകടം", riskMedium: "🟡 മിതമായ അപകടം", riskLow: "🟢 കുറഞ്ഞ അപകടം",
    riskSubtitle: "ലക്ഷണങ്ങൾ, തീവ്രത, ദൈർഘ്യം എന്നിവ അടിസ്ഥാനമാക്കി",
    treatmentTimeline: "🗓️ ചികിത്സ കാലഘട്ടം",
    similarStories: "👥 സമാന രോഗികളുടെ കഥകൾ",
    thinking: "ചിന്തിക്കുന്നു...",
    copyBtn: "പകർത്തുക", waBtn: "വാട്സ്ആപ്പ്",
    bodyPartLabels: ["തല","കഴുത്ത്","നെഞ്ച്","വയർ","പുറം","ഇടത് കൈ","വലത് കൈ","ഇടത് കാൽ","വലത് കാൽ","സന്ധികൾ"],
  },
};

const BODY_PART_ICONS = ["🧠","🔗","❤️","🫁","🦴","💪","💪","🦵","🦵","⚙️"];
const BODY_PART_KEYS = ["Head","Neck","Chest","Abdomen","Back","Left Arm","Right Arm","Left Leg","Right Leg","Joints"];

const LANGUAGES = [
  { code: "en", label: "EN" }, { code: "ta", label: "தமிழ்" },
  { code: "hi", label: "हिंदी" }, { code: "te", label: "తెలుగు" },
  { code: "ml", label: "മലയാളം" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #020818; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 2px; }
  .raredx-wrap { min-height: 100vh; background: #020818; background-image: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,100,255,0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,200,150,0.08), transparent); font-family: 'Space Grotesk', sans-serif; color: #e2eaff; padding: 24px 16px 60px; }
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

  const toggleBodyPart = (key) => {
    setSelectedBodyParts(prev => prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]);
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
    setReminderSet(false);
    const key = process.env.REACT_APP_GEMINI_API_KEY;
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + key;
    const dbMatches = matchDiseases(form.symptoms);
    const topDiseasesFromDB = dbMatches.map(d => `${d.name} (matched symptoms: ${d.matchedSymptoms.join(", ")})`).join("\n");
    const bodyPartsText = selectedBodyParts.length > 0 ? `Affected body parts: ${selectedBodyParts.join(", ")}` : "";
    
    const langName = LANGUAGES.find(l => l.code === selectedLanguage)?.label || "English";
    const langInstruction = selectedLanguage !== "en"
      ? `Respond ENTIRELY in ${langName} language. Keep disease names in English only. Translate ALL other text including summary, descriptions, advice, diet category names, and all labels to ${langName}.`
      : "";
    const reportNote = uploadedFile ? "key findings" : "";
    const reportText = uploadedFile ? `Medical report "${uploadedFile.name}" uploaded. Consider this too.` : "";
    const prompt = `You are a rare disease diagnostic assistant. Based on verified Orphanet database matching, these diseases were identified as possible matches:\n\n${topDiseasesFromDB}\n\nPatient info:\nAge: ${form.age}, Gender: ${form.gender}, Symptoms: ${form.symptoms}\n${bodyPartsText}\nDuration: ${form.duration}, Tests done: ${form.testsAlreadyDone}\n${reportText}\n${langInstruction}\n\nProvide enriched diagnosis. Return ONLY this JSON:\n{"summary":"brief summary","reportFindings":"${reportNote}","riskScore":72,"similarStories":["story1","story2","story3"],"possibleConditions":[{"name":"Disease","confidence":"High/Medium/Low","confidencePercent":85,"description":"brief","affectedPeople":"number","avgDiagnosisTime":"time","nextSteps":"tests","treatmentTimeline":["Week 1-2: tests","Month 1: specialist","Month 2-3: treatment","Month 6+: monitoring"]}],"urgency":"Immediate/Soon/Routine","generalAdvice":"advice","dietTips":[{"icon":"🥗","category":"Diet","advice":"advice"},{"icon":"💧","category":"Hydration","advice":"advice"},{"icon":"🏃","category":"Exercise","advice":"advice"},{"icon":"😴","category":"Sleep","advice":"advice"},{"icon":"🧘","category":"Stress","advice":"advice"}]}`;
    try {
      const parts = [];
      if (uploadedFileBase64 && uploadedFileMime) parts.push({ inline_data: { mime_type: uploadedFileMime, data: uploadedFileBase64 } });
      parts.push({ text: prompt });
      const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts }] }) });
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      const newEntry = { id: Date.now(), date: new Date().toLocaleDateString(), age: form.age, gender: form.gender, symptoms: form.symptoms, urgency: parsed.urgency, conditions: parsed.possibleConditions.map(c => c.name).join(", ") };
      const updatedHistory = [newEntry, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("raredx_history", JSON.stringify(updatedHistory));
      setResult(parsed);
      setChatMessages([{ role: "assistant", text: uploadedFile ? t.chatWelcomeReport : t.chatWelcome }]);
      setStep("result");
    }   catch { alert("Something went wrong. Check your API key."); setStep("form"); }

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
   setForm({ age: "", gender: "", symptoms: "", duration: "", testsAlreadyDone: "" });
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
            {[[t.stat1Num, t.stat1], [t.stat2Num, t.stat2], [t.stat3Num, t.stat3]].map(([n, l]) => (
              <div key={n} className="stat-card"><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
            ))}
          </div>
          <div style={{ marginBottom: "14px" }}>
            <button onClick={() => setShowHistory(!showHistory)}
              style={{ padding: "7px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", color: "#6a8aaa", cursor: "pointer", fontSize: "0.82rem", fontFamily: "inherit", transition: "all 0.2s" }}>
              📋 {showHistory ? t.hideHistory : `${t.showHistory} (${history.length})`}
            </button>
          </div>
          {showHistory && (
            <div className="card" style={{ marginBottom: "20px", textAlign: "left" }}>
              <div className="section-title" style={{ marginBottom: "14px" }}>📋 {t.pastDiagnoses}</div>
              {history.length === 0 ? (
                <p style={{ color: "#3a5070", fontSize: "0.85rem" }}>{t.noPastDiagnoses}</p>
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
                    {t.clearHistory}
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

            
              

            {/* Symptoms + Voice */}
            <div className="field">
              <div className="symptoms-header">
                <label className="field-label" style={{ margin: 0 }}>{t.symptoms}</label>
                <button onClick={startVoice} className={`voice-btn ${isListening ? "listening" : ""}`}>{isListening ? t.listeningBtn : t.voiceBtn}</button>
              </div>
              <textarea name="symptoms" value={form.symptoms} onChange={handleChange} placeholder={t.symptomsPlaceholder} className="field-textarea" />
            </div>

            {/* Body Parts - fully translated */}
            <div className="field">
              <label className="field-label">{t.bodyParts}</label>
              <div className="body-parts-grid">
                {BODY_PART_KEYS.map((key, idx) => (
                  <button key={key} onClick={() => toggleBodyPart(key)} className={`body-part-btn ${selectedBodyParts.includes(key) ? "selected" : ""}`}>
                    {BODY_PART_ICONS[idx]} {t.bodyPartLabels[idx]}
                  </button>
                ))}
              </div>
              {selectedBodyParts.length > 0 && <div className="selected-text">✓ {t.selected}: {selectedBodyParts.map(k => t.bodyPartLabels[BODY_PART_KEYS.indexOf(k)]).join(", ")}</div>}
            </div>

            {/* Custom File Upload */}
            <div className="field">
              <label className="field-label">{t.uploadReport}</label>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(0,0,0,0.2)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "10px", padding: "12px 14px", cursor: "pointer", transition: "border-color 0.2s" }}
                onMouseOver={e => e.currentTarget.style.borderColor = "rgba(0,150,255,0.3)"}
                onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}>
                <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} style={{ display: "none" }} />
                <span style={{ padding: "6px 14px", background: "linear-gradient(135deg, #0055dd, #0099bb)", borderRadius: "8px", color: "#fff", fontSize: "0.82rem", fontWeight: "600", whiteSpace: "nowrap" }}>{t.chooseFile}</span>
                <span style={{ color: uploadedFile ? "#00d4aa" : "#3a5070", fontSize: "0.85rem" }}>
                  {uploadedFile ? "✅ " + uploadedFile.name : t.noFileChosen}
                </span>
              </label>
            </div>

            <button onClick={analyze} disabled={!form.age || !form.symptoms} className="analyze-btn">{t.analyzeBtn} →</button>
            <div style={{ textAlign: "center", padding: "12px", marginTop: "8px", color: "#2a3a4a", fontSize: "0.72rem", lineHeight: "1.8" }}>
              © {new Date().getFullYear()} RareDx. All Rights Reserved.<br />
              🧬 Turning Years of Suffering into Seconds of Clarity
            </div>
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

            {result.riskScore && (
              <div className="card" style={{ textAlign: "center" }}>
                <div className="section-title" style={{ marginBottom: "16px" }}>{t.riskTitle}</div>
                <div style={{ position: "relative", width: "150px", height: "150px", margin: "0 auto 16px" }}>
                  <svg viewBox="0 0 150 150" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                    <circle cx="75" cy="75" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                    <circle cx="75" cy="75" r="60" fill="none" stroke={riskColor(result.riskScore)} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(result.riskScore / 100) * 377} 377`} />
                  </svg>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                    <div style={{ fontSize: "1.8rem", fontWeight: "800", color: riskColor(result.riskScore), fontFamily: "'Outfit', sans-serif" }}>{result.riskScore}</div>
                    <div style={{ fontSize: "0.7rem", color: "#5a7a9a", textTransform: "uppercase" }}>/ 100</div>
                  </div>
                </div>
                <div style={{ color: riskColor(result.riskScore), fontWeight: "700", fontSize: "0.9rem", marginBottom: "6px" }}>
                  {result.riskScore > 70 ? t.riskHigh : result.riskScore > 40 ? t.riskMedium : t.riskLow}
                </div>
                <div style={{ color: "#5a7a9a", fontSize: "0.8rem" }}>{t.riskSubtitle}</div>
              </div>
            )}

            <div className="card">
              <div className="result-header">
                <div className="section-title">{t.caseSummary}</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button className="print-btn" onClick={() => window.print()}>🖨️ {t.printReport}</button>
                  <button className="print-btn" onClick={() => {
                    const text = `🧬 *RareDx Medical Report*\n\n👤 Patient: ${form.age}yr ${form.gender}\n⚡ Urgency: ${result.urgency}\n🔴 Risk Score: ${result.riskScore}/100\n\n📋 *Summary:*\n${result.summary}\n\n🎯 *Possible Conditions:*\n${result.possibleConditions.map((c, i) => `${i + 1}. ${c.name} (${c.confidence} Match - ${c.confidencePercent}%)\n   ${c.description}\n   ✅ Next Steps: ${c.nextSteps}`).join("\n\n")}\n\n💡 *General Advice:*\n${result.generalAdvice}\n\n⚠️ AI-generated. Always consult a qualified doctor.\n_Generated by RareDx_`;
                    navigator.clipboard.writeText(text);
                    alert("Report copied! Paste in WhatsApp, Email or any app.");
                    }}>📋 {t.copyBtn}</button>
                  
                  <button className="print-btn" onClick={() => {
                    const text = `🧬 RareDx Report - ${form.age}yr ${form.gender} - Risk: ${result.riskScore}/100 - Urgency: ${result.urgency} - ${result.possibleConditions.map(c => c.name).join(", ")}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
                  }}>💚 {t.waBtn}</button>
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
                {c.treatmentTimeline && c.treatmentTimeline.length > 0 && (
                  <div style={{ marginTop: "12px" }}>
                    <div style={{ color: "#4d9fff", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>{t.treatmentTimeline}</div>
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

            <div className="card">
              <div className="section-title" style={{ marginBottom: "12px" }}>{t.generalAdvice}</div>
              <p className="advice-text">{result.generalAdvice}</p>
            </div>

            {result.dietTips && (
              <div className="card">
                <div className="section-title" style={{ marginBottom: "14px" }}>{t.dietTitle}</div>
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

            <div className="card">
              <div className="section-title" style={{ marginBottom: "8px" }}>{t.appointmentTitle}</div>
              <p style={{ color: "#5a7a9a", fontSize: "0.84rem", marginBottom: "14px", lineHeight: "1.6" }}>{t.appointmentDesc}</p>
              <button onClick={setAppointmentReminder}
                style={{ width: "100%", padding: "12px", background: reminderSet ? "rgba(0,212,170,0.1)" : "rgba(0,100,255,0.08)", border: `1px solid ${reminderSet ? "rgba(0,212,170,0.3)" : "rgba(0,150,255,0.3)"}`, borderRadius: "10px", color: reminderSet ? "#00d4aa" : "#4d9fff", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", fontSize: "0.92rem", transition: "all 0.2s" }}>
                {reminderSet ? t.reminderSetText : t.appointmentBtn}
              </button>
            </div>

            <div className="card">
              <div className="section-title" style={{ marginBottom: "14px" }}>{t.findSpecialist}</div>
              <div className="specialist-grid">
                {result.possibleConditions.map((c, i) => (
                  <button key={i} className="specialist-btn" onClick={() => window.open(`https://www.google.com/maps/search/${c.nextSteps.split(",")[0].trim()}+near+me`, "_blank")}>
                    🔍 {c.name}
                  </button>
                ))}
                <button className="specialist-btn clinic" onClick={() => window.open("https://www.google.com/maps/search/rare+disease+specialist+near+me", "_blank")}>
                  🏥 {t.findClinic}
                </button>
              </div>
            </div>

            <div className="card">
              <div className="section-title" style={{ marginBottom: "14px" }}>{t.chatTitle}</div>
              <div className="chat-messages">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`chat-msg ${msg.role}`}>
                    <div className={`chat-bubble ${msg.role}`}>{msg.text}</div>
                  </div>
                ))}
                {chatLoading && <div className="chat-msg assistant"><div className="chat-bubble assistant thinking">{t.thinking}</div></div>}
              </div>
              <div className="chat-input-row">
                <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder={t.chatPlaceholder} className="chat-input" />
                <button onClick={sendChat} className="chat-send">{t.sendBtn}</button>
              </div>
            </div>

            <div className="card">
              <div className="section-title" style={{ marginBottom: "6px" }}>{t.secondOpinion}</div>
              <p className="second-opinion-desc">{t.secondOpinionDesc}</p>
              <button onClick={analyze} className="second-btn">{t.secondOpinionBtn}</button>
            </div>

            <div className="card disclaimer-card">
              <div className="disclaimer-title">{t.disclaimer}</div>
              <p className="disclaimer-text">{t.disclaimerText1} <span className="disclaimer-bold">{t.disclaimerBold}</span></p>
              <p className="disclaimer-text">{t.disclaimerText2}</p>
              <p className="disclaimer-footer">{t.disclaimerFooter}</p>
            </div>

            <button onClick={reset} className="reset-btn">{t.newAnalysis}</button>
            <div style={{ textAlign: "center", padding: "16px", marginTop: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", color: "#2a3a4a", fontSize: "0.75rem", lineHeight: "1.8" }}>
              © {new Date().getFullYear()} RareDx. All Rights Reserved.<br />
              Built by Team Laksitha · Powered by Gemini AI · Deployed on Vercel<br />
              🧬 Turning Years of Suffering into Seconds of Clarity
            </div>
          </div>
        )}
      </div>
    </div>
  );
}