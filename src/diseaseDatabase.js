const diseaseDatabase = [
  {
    name: "Systemic Lupus Erythematosus",
    orphaCode: "ORPHA:536",
    symptoms: ["joint pain", "fatigue", "butterfly rash", "hair loss", "fever", "skin rash", "sensitivity to sunlight", "chest pain", "kidney problems"],
    affectedPeople: "5 million worldwide",
    avgDiagnosisTime: "6 years",
    description: "A chronic autoimmune disease where the immune system attacks healthy tissue throughout the body.",
    nextSteps: "ANA blood test, anti-dsDNA antibody test, Rheumatologist consultation",
  },
  {
    name: "Ehlers-Danlos Syndrome",
    orphaCode: "ORPHA:98249",
    symptoms: ["joint hypermobility", "skin elasticity", "chronic pain", "fatigue", "easy bruising", "joint dislocation", "flexible joints", "stretchy skin"],
    affectedPeople: "1 in 5,000 people",
    avgDiagnosisTime: "10 years",
    description: "A group of connective tissue disorders affecting skin, joints, and blood vessel walls.",
    nextSteps: "Genetic testing, Dermatologist, Rheumatologist, physiotherapy",
  },
  {
    name: "Marfan Syndrome",
    orphaCode: "ORPHA:558",
    symptoms: ["tall thin body", "long fingers", "flexible joints", "curved spine", "vision problems", "heart problems", "flat feet", "stretch marks"],
    affectedPeople: "1 in 5,000 people",
    avgDiagnosisTime: "5 years",
    description: "A genetic disorder affecting connective tissue, causing problems in heart, eyes, and skeleton.",
    nextSteps: "Echocardiogram, eye examination, genetic testing, Cardiologist",
  },
  {
    name: "Fibromyalgia",
    orphaCode: "ORPHA:57545",
    symptoms: ["widespread pain", "fatigue", "sleep problems", "memory issues", "headache", "depression", "anxiety", "tender points", "stiffness"],
    affectedPeople: "4 million in US alone",
    avgDiagnosisTime: "5 years",
    description: "A disorder characterized by widespread musculoskeletal pain accompanied by fatigue, sleep, memory and mood issues.",
    nextSteps: "Rheumatologist, pain management, sleep study, psychological evaluation",
  },
  {
    name: "Wilson's Disease",
    orphaCode: "ORPHA:905",
    symptoms: ["liver disease", "neurological symptoms", "psychiatric symptoms", "tremor", "difficulty speaking", "jaundice", "fatigue", "abdominal pain", "golden brown eye rings"],
    affectedPeople: "1 in 30,000 people",
    avgDiagnosisTime: "3 years",
    description: "A rare genetic disorder causing copper to accumulate in liver, brain, and other vital organs.",
    nextSteps: "Serum ceruloplasmin test, liver biopsy, ophthalmology exam for Kayser-Fleischer rings",
  },
  {
    name: "Huntington's Disease",
    orphaCode: "ORPHA:399",
    symptoms: ["involuntary movements", "cognitive decline", "psychiatric problems", "balance problems", "difficulty swallowing", "personality changes", "depression", "memory loss"],
    affectedPeople: "1 in 10,000 people",
    avgDiagnosisTime: "4 years",
    description: "A fatal genetic disorder that causes the progressive breakdown of nerve cells in the brain.",
    nextSteps: "Genetic testing, Neurologist, MRI brain scan, psychological assessment",
  },
  {
    name: "Cystic Fibrosis",
    orphaCode: "ORPHA:586",
    symptoms: ["persistent cough", "lung infections", "wheezing", "poor weight gain", "salty skin", "digestive problems", "male infertility", "nasal polyps", "fatigue"],
    affectedPeople: "70,000 worldwide",
    avgDiagnosisTime: "1 year",
    description: "A hereditary disease that affects the lungs and digestive system, causing thick sticky mucus buildup.",
    nextSteps: "Sweat chloride test, genetic testing, Pulmonologist, chest physiotherapy",
  },
  {
    name: "Tourette Syndrome",
    orphaCode: "ORPHA:897",
    symptoms: ["motor tics", "vocal tics", "repetitive movements", "eye blinking", "throat clearing", "OCD symptoms", "ADHD symptoms", "anxiety", "coprolalia"],
    affectedPeople: "1 in 100 children",
    avgDiagnosisTime: "3 years",
    description: "A nervous system disorder involving repetitive movements or unwanted sounds that can't be easily controlled.",
    nextSteps: "Neurologist, behavioral therapy, psychological evaluation",
  },
  {
    name: "Pompe Disease",
    orphaCode: "ORPHA:365",
    symptoms: ["muscle weakness", "breathing difficulty", "enlarged heart", "feeding difficulties", "delayed motor development", "exercise intolerance", "fatigue", "back pain"],
    affectedPeople: "1 in 40,000 people",
    avgDiagnosisTime: "7 years",
    description: "A rare inherited metabolic disorder caused by deficiency of enzyme acid alpha-glucosidase (GAA).",
    nextSteps: "Acid alpha-glucosidase enzyme assay, genetic testing, Metabolic specialist",
  },
  {
    name: "Scleroderma",
    orphaCode: "ORPHA:801",
    symptoms: ["skin hardening", "Raynaud's phenomenon", "heartburn", "joint pain", "fatigue", "difficulty swallowing", "skin thickening", "finger ulcers", "calcium deposits"],
    affectedPeople: "300,000 in US",
    avgDiagnosisTime: "6 years",
    description: "A group of autoimmune diseases that cause hardening and tightening of the skin and connective tissues.",
    nextSteps: "ANA test, skin biopsy, Rheumatologist, pulmonary function test",
  },
  {
    name: "Myasthenia Gravis",
    orphaCode: "ORPHA:589",
    symptoms: ["muscle weakness", "drooping eyelids", "double vision", "difficulty swallowing", "facial paralysis", "fatigue", "slurred speech", "breathing difficulty", "arm weakness"],
    affectedPeople: "200,000 in US",
    avgDiagnosisTime: "2 years",
    description: "A chronic autoimmune neuromuscular disease causing weakness in the voluntary muscle groups.",
    nextSteps: "Acetylcholine receptor antibody test, CT scan chest, Neurologist, edrophonium test",
  },
  {
    name: "Gaucher Disease",
    orphaCode: "ORPHA:355",
    symptoms: ["enlarged spleen", "enlarged liver", "bone pain", "fatigue", "anemia", "easy bruising", "frequent infections", "delayed growth", "neurological symptoms"],
    affectedPeople: "1 in 40,000 people",
    avgDiagnosisTime: "4 years",
    description: "A genetic disorder where fatty substance accumulates in cells and certain organs.",
    nextSteps: "Beta-glucocerebrosidase enzyme assay, genetic testing, Hematologist",
  },
  {
    name: "Primary Biliary Cholangitis",
    orphaCode: "ORPHA:186",
    symptoms: ["fatigue", "itchy skin", "dry eyes", "dry mouth", "jaundice", "abdominal pain", "weight loss", "bone pain", "elevated liver enzymes"],
    affectedPeople: "1 in 1,000 women over 40",
    avgDiagnosisTime: "5 years",
    description: "A chronic disease in which the bile ducts in the liver are slowly destroyed.",
    nextSteps: "AMA blood test, liver biopsy, Hepatologist, liver function tests",
  },
  {
    name: "Hereditary Angioedema",
    orphaCode: "ORPHA:91378",
    symptoms: ["recurrent swelling", "abdominal pain", "facial swelling", "throat swelling", "nausea", "vomiting", "skin swelling", "limb swelling", "no urticaria"],
    affectedPeople: "1 in 50,000 people",
    avgDiagnosisTime: "8 years",
    description: "A rare inherited disorder characterized by recurrent episodes of severe swelling.",
    nextSteps: "C4 complement level test, C1-inhibitor function test, Immunologist",
  },
  {
    name: "Amyloidosis",
    orphaCode: "ORPHA:654",
    symptoms: ["fatigue", "weight loss", "swelling", "shortness of breath", "numbness in hands", "enlarged tongue", "irregular heartbeat", "protein in urine", "dizziness"],
    affectedPeople: "4,000 new cases per year in US",
    avgDiagnosisTime: "3 years",
    description: "A rare disease caused by buildup of amyloid protein in organs and tissues.",
    nextSteps: "Biopsy, echocardiogram, urine protein test, Hematologist",
  },
  {
    name: "Neurofibromatosis Type 1",
    orphaCode: "ORPHA:636",
    symptoms: ["cafe-au-lait spots", "neurofibromas", "freckling in armpits", "bone deformities", "learning disabilities", "vision problems", "headaches", "seizures", "lisch nodules"],
    affectedPeople: "1 in 3,000 people",
    avgDiagnosisTime: "2 years",
    description: "A genetic condition causing tumors to grow along nerves in the skin, brain, and other parts of the body.",
    nextSteps: "Clinical diagnosis, MRI, genetic testing, Neurologist, ophthalmology exam",
  },
  {
    name: "Acromegaly",
    orphaCode: "ORPHA:963",
    symptoms: ["enlarged hands", "enlarged feet", "enlarged facial features", "joint pain", "excessive sweating", "fatigue", "headaches", "vision problems", "snoring"],
    affectedPeople: "60 per million people",
    avgDiagnosisTime: "10 years",
    description: "A hormonal disorder caused by the pituitary gland producing too much growth hormone.",
    nextSteps: "IGF-1 blood test, MRI pituitary gland, Endocrinologist, oral glucose tolerance test",
  },
  {
    name: "Behcet's Disease",
    orphaCode: "ORPHA:117",
    symptoms: ["mouth ulcers", "genital ulcers", "eye inflammation", "skin lesions", "joint pain", "fatigue", "headaches", "blood clots", "digestive problems"],
    affectedPeople: "1 in 10,000 in Middle East/Asia",
    avgDiagnosisTime: "7 years",
    description: "A rare disorder causing blood vessel inflammation throughout the body.",
    nextSteps: "Pathergy test, HLA-B51 test, Rheumatologist, ophthalmology exam",
  },
  {
    name: "Fabry Disease",
    orphaCode: "ORPHA:324",
    symptoms: ["burning pain in hands and feet", "skin rash", "kidney problems", "heart problems", "stroke", "hearing loss", "fatigue", "heat intolerance", "gastrointestinal problems"],
    affectedPeople: "1 in 40,000 males",
    avgDiagnosisTime: "14 years",
    description: "A rare inherited lysosomal storage disorder caused by deficiency of alpha-galactosidase A enzyme.",
    nextSteps: "Alpha-galactosidase A enzyme assay, genetic testing, Nephrologist",
  },
  {
    name: "Porphyria",
    orphaCode: "ORPHA:738",
    symptoms: ["abdominal pain", "vomiting", "constipation", "muscle pain", "tingling", "mental changes", "seizures", "red urine", "sensitivity to light"],
    affectedPeople: "1 in 75,000 people",
    avgDiagnosisTime: "15 years",
    description: "A group of disorders caused by abnormalities in the chemical steps that lead to heme production.",
    nextSteps: "Urine porphyrins test, blood porphyrins, genetic testing, Hematologist",
  },
];

export function matchDiseases(symptomsText) {
  const userSymptoms = symptomsText.toLowerCase().split(/[,\s]+/).filter(s => s.length > 2);
  
  const scored = diseaseDatabase.map(disease => {
    let matchCount = 0;
    let matchedSymptoms = [];
    
    disease.symptoms.forEach(symptom => {
      const symptomWords = symptom.toLowerCase().split(" ");
      const matched = symptomWords.some(word => 
        userSymptoms.some(us => us.includes(word) || word.includes(us))
      );
      if (matched) {
        matchCount++;
        matchedSymptoms.push(symptom);
      }
    });
    
    const confidencePercent = Math.min(95, Math.round((matchCount / disease.symptoms.length) * 100 * 1.5));
    const confidence = confidencePercent > 60 ? "High" : confidencePercent > 30 ? "Medium" : "Low";
    
    return {
      ...disease,
      matchCount,
      matchedSymptoms,
      confidencePercent,
      confidence,
    };
  });
  
  return scored
    .filter(d => d.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 5);
}

export default diseaseDatabase;