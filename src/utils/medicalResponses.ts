interface MedicalResponse {
  response: string;
  suggestions?: string[];
  disclaimer?: string;
  urgency?: 'low' | 'medium' | 'high';
}

interface MedicalKeywords {
  [key: string]: MedicalResponse;
}

const medicalResponses: MedicalKeywords = {
  // Pain-related keywords
  'pain': {
    response: "I understand you're experiencing pain. Can you describe the location, intensity (1-10), and duration of the pain?",
    suggestions: [
      "Where exactly is the pain located?",
      "How would you rate the pain on a scale of 1-10?",
      "When did the pain start?",
      "Is the pain constant or does it come and go?"
    ],
    urgency: 'medium'
  },
  
  'headache': {
    response: "Headaches can have various causes. Can you tell me more about the type of headache and any accompanying symptoms?",
    suggestions: [
      "Is it a throbbing or dull pain?",
      "Are you experiencing nausea or sensitivity to light?",
      "Have you had headaches like this before?",
      "Are you under stress or have you been sleeping poorly?"
    ],
    urgency: 'medium'
  },
  
  'fever': {
    response: "Fever can indicate an infection or other condition. What's your current temperature and how long have you had it?",
    suggestions: [
      "What's your current temperature?",
      "How long have you had the fever?",
      "Are you experiencing chills or sweating?",
      "Do you have any other symptoms?"
    ],
    urgency: 'high'
  },
  
  'cough': {
    response: "Coughing can be due to various reasons. Can you describe the type of cough and any other symptoms?",
    suggestions: [
      "Is it a dry cough or do you have phlegm?",
      "What color is the phlegm?",
      "How long have you been coughing?",
      "Do you have chest pain or difficulty breathing?"
    ],
    urgency: 'medium'
  },
  
  'nausea': {
    response: "Nausea can be caused by many factors. Can you tell me more about when it occurs and any triggers?",
    suggestions: [
      "When does the nausea occur?",
      "Are you vomiting as well?",
      "Have you eaten anything unusual?",
      "Are you taking any medications?"
    ],
    urgency: 'medium'
  },
  
  'chest pain': {
    response: "Chest pain can be serious. Can you describe the pain and any other symptoms you're experiencing?",
    suggestions: [
      "Is the pain sharp or dull?",
      "Does it radiate to your arm, neck, or jaw?",
      "Are you having difficulty breathing?",
      "Do you feel dizzy or lightheaded?"
    ],
    urgency: 'high',
    disclaimer: "⚠️ Chest pain can be a sign of a heart attack. If you're experiencing severe chest pain, call emergency services immediately."
  },
  
  'breathing': {
    response: "Difficulty breathing is concerning. Can you describe your breathing difficulties and any other symptoms?",
    suggestions: [
      "Are you short of breath at rest or only with activity?",
      "Do you have chest tightness?",
      "Are you wheezing or making unusual sounds when breathing?",
      "Have you been exposed to any irritants?"
    ],
    urgency: 'high'
  },
  
  'rash': {
    response: "Skin rashes can have various causes. Can you describe the appearance and any other symptoms?",
    suggestions: [
      "What does the rash look like?",
      "Is it itchy, painful, or burning?",
      "Where on your body is the rash?",
      "Have you used any new products or medications?"
    ],
    urgency: 'low'
  },
  
  'fatigue': {
    response: "Fatigue can be caused by many factors. Can you tell me more about your energy levels and sleep patterns?",
    suggestions: [
      "How long have you been feeling fatigued?",
      "Are you getting enough sleep?",
      "Have you been under stress?",
      "Are you eating well and staying hydrated?"
    ],
    urgency: 'low'
  },
  
  'dizziness': {
    response: "Dizziness can have various causes. Can you describe when it occurs and any other symptoms?",
    suggestions: [
      "When do you feel dizzy?",
      "Does the room spin or do you feel lightheaded?",
      "Are you experiencing any hearing changes?",
      "Have you had any recent head injuries?"
    ],
    urgency: 'medium'
  }
};

const generalResponses = [
  "I understand your concern. Can you provide more details about your symptoms?",
  "That's important information. Can you tell me more about when this started?",
  "I'm here to help. Can you describe your symptoms in more detail?",
  "Thank you for sharing that. Are there any other symptoms you're experiencing?",
  "I want to make sure I understand correctly. Can you clarify what you mean?",
  "That sounds concerning. Can you tell me more about the severity and duration?"
];

const disclaimers = [
  "⚠️ This is not a substitute for professional medical advice. Please consult with a healthcare provider.",
  "⚠️ If you're experiencing a medical emergency, call emergency services immediately.",
  "⚠️ Always consult with a qualified healthcare professional for proper diagnosis and treatment.",
  "⚠️ This information is for educational purposes only and should not replace medical consultation."
];

export const getMedicalResponse = (userMessage: string): MedicalResponse => {
  const message = userMessage.toLowerCase();
  
  // Check for specific medical keywords
  for (const [keyword, response] of Object.entries(medicalResponses)) {
    if (message.includes(keyword)) {
      return {
        ...response,
        disclaimer: response.disclaimer || disclaimers[Math.floor(Math.random() * disclaimers.length)]
      };
    }
  }
  
  // Check for emergency keywords
  const emergencyKeywords = ['emergency', 'urgent', 'severe', 'can\'t breathe', 'chest pain', 'heart attack'];
  if (emergencyKeywords.some(keyword => message.includes(keyword))) {
    return {
      response: "🚨 This sounds like it could be a medical emergency. Please call emergency services (911) immediately or go to the nearest emergency room.",
      urgency: 'high',
      disclaimer: "⚠️ This is a medical emergency. Do not delay seeking immediate medical attention."
    };
  }
  
  // Return general response
  return {
    response: generalResponses[Math.floor(Math.random() * generalResponses.length)],
    suggestions: [
      "Can you describe your symptoms in more detail?",
      "When did you first notice these symptoms?",
      "Have you experienced anything like this before?",
      "Are you taking any medications?"
    ],
    urgency: 'low',
    disclaimer: disclaimers[Math.floor(Math.random() * disclaimers.length)]
  };
};

export const getFollowUpQuestions = (response: MedicalResponse): string[] => {
  return response.suggestions || [];
};


