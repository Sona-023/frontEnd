import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: 'mild' | 'moderate' | 'severe';
}

interface SymptomsCheckerProps {
  onSymptomsSelected: (symptoms: Symptom[]) => void;
  onClose: () => void;
}

const SymptomsChecker: React.FC<SymptomsCheckerProps> = ({ onSymptomsSelected, onClose }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [currentCategory, setCurrentCategory] = useState('general');

  const symptomsData: { [key: string]: Symptom[] } = {
    general: [
      { id: 'fever', name: 'Fever', category: 'general', severity: 'moderate' },
      { id: 'fatigue', name: 'Fatigue', category: 'general', severity: 'mild' },
      { id: 'headache', name: 'Headache', category: 'general', severity: 'moderate' },
      { id: 'dizziness', name: 'Dizziness', category: 'general', severity: 'moderate' },
      { id: 'nausea', name: 'Nausea', category: 'general', severity: 'moderate' },
      { id: 'chills', name: 'Chills', category: 'general', severity: 'moderate' }
    ],
    respiratory: [
      { id: 'cough', name: 'Cough', category: 'respiratory', severity: 'moderate' },
      { id: 'shortness_breath', name: 'Shortness of Breath', category: 'respiratory', severity: 'severe' },
      { id: 'chest_pain', name: 'Chest Pain', category: 'respiratory', severity: 'severe' },
      { id: 'wheezing', name: 'Wheezing', category: 'respiratory', severity: 'moderate' },
      { id: 'sore_throat', name: 'Sore Throat', category: 'respiratory', severity: 'mild' },
      { id: 'runny_nose', name: 'Runny Nose', category: 'respiratory', severity: 'mild' }
    ],
    digestive: [
      { id: 'stomach_pain', name: 'Stomach Pain', category: 'digestive', severity: 'moderate' },
      { id: 'diarrhea', name: 'Diarrhea', category: 'digestive', severity: 'moderate' },
      { id: 'constipation', name: 'Constipation', category: 'digestive', severity: 'mild' },
      { id: 'vomiting', name: 'Vomiting', category: 'digestive', severity: 'moderate' },
      { id: 'loss_appetite', name: 'Loss of Appetite', category: 'digestive', severity: 'mild' },
      { id: 'bloating', name: 'Bloating', category: 'digestive', severity: 'mild' }
    ],
    skin: [
      { id: 'rash', name: 'Rash', category: 'skin', severity: 'mild' },
      { id: 'itching', name: 'Itching', category: 'skin', severity: 'mild' },
      { id: 'swelling', name: 'Swelling', category: 'skin', severity: 'moderate' },
      { id: 'bruising', name: 'Bruising', category: 'skin', severity: 'moderate' },
      { id: 'dry_skin', name: 'Dry Skin', category: 'skin', severity: 'mild' },
      { id: 'acne', name: 'Acne', category: 'skin', severity: 'mild' }
    ]
  };

  const categories = [
    { id: 'general', name: 'General', icon: '🌡️' },
    { id: 'respiratory', name: 'Respiratory', icon: '🫁' },
    { id: 'digestive', name: 'Digestive', icon: '🫀' },
    { id: 'skin', name: 'Skin', icon: '🦠' }
  ];

  const toggleSymptom = (symptom: Symptom) => {
    setSelectedSymptoms(prev => {
      const isSelected = prev.some(s => s.id === symptom.id);
      if (isSelected) {
        return prev.filter(s => s.id !== symptom.id);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'severe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'mild': return <Info className="w-4 h-4" />;
      case 'moderate': return <AlertCircle className="w-4 h-4" />;
      case 'severe': return <AlertCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const handleSubmit = () => {
    onSymptomsSelected(selectedSymptoms);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Symptom Checker</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">Select your symptoms to get personalized medical advice</p>
        </div>

        <div className="p-6">
          {/* Category Tabs */}
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setCurrentCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  currentCategory === category.id
                    ? 'bg-whatsapp-green text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Symptoms List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {symptomsData[currentCategory].map(symptom => {
              const isSelected = selectedSymptoms.some(s => s.id === symptom.id);
              return (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    isSelected
                      ? 'border-whatsapp-green bg-whatsapp-green bg-opacity-10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-whatsapp-green bg-whatsapp-green'
                        : 'border-gray-300'
                    }`}>
                    {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-gray-800 font-medium">{symptom.name}</span>
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(symptom.severity)}`}>
                    {getSeverityIcon(symptom.severity)}
                    <span className="capitalize">{symptom.severity}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Symptoms Summary */}
          {selectedSymptoms.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                Selected Symptoms ({selectedSymptoms.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map(symptom => (
                  <span
                    key={symptom.id}
                    className="px-3 py-1 bg-whatsapp-green text-white rounded-full text-sm"
                  >
                    {symptom.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedSymptoms.length === 0}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze Symptoms
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymptomsChecker;


