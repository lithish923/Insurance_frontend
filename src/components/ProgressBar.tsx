import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, stepTitles }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-600 text-gray-300'
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-xs mt-2 text-center max-w-20 ${
              index === currentStep ? 'text-blue-400' : 'text-gray-400'
            }`}>
              {title}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;