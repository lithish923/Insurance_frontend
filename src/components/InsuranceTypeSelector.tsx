import React from 'react';
import { Heart, Home, Wheat } from 'lucide-react';
import { InsuranceType } from '../types/insurance';

interface InsuranceTypeSelectorProps {
  onSelect: (type: InsuranceType) => void;
}

const InsuranceTypeSelector: React.FC<InsuranceTypeSelectorProps> = ({ onSelect }) => {
  const insuranceTypes = [
    {
      type: 'medical' as InsuranceType,
      title: 'Medical Insurance',
      description: 'Comprehensive health coverage for medical expenses and treatments',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
    },
    {
      type: 'property' as InsuranceType,
      title: 'Property Insurance',
      description: 'Protect your home and belongings against damage and theft',
      icon: Home,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      type: 'agriculture' as InsuranceType,
      title: 'Agriculture Insurance',
      description: 'Crop and livestock protection against natural disasters and losses',
      icon: Wheat,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Insurance Application
          </h1>
          <p className="text-xl text-gray-300">
            Choose the type of insurance coverage you need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insuranceTypes.map((insurance) => (
            <div
              key={insurance.type}
              onClick={() => onSelect(insurance.type)}
              className="group cursor-pointer"
            >
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${insurance.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <insurance.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{insurance.title}</h3>
                <p className="text-gray-400 leading-relaxed">{insurance.description}</p>
                <div className="mt-6 flex items-center text-blue-400 font-medium">
                  <span>Get Started</span>
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsuranceTypeSelector;