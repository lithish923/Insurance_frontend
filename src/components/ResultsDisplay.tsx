import React from 'react';
import { Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { InsuranceType, PredictionResult } from '../types/insurance';

interface ResultsDisplayProps {
  insuranceType: InsuranceType;
  result: PredictionResult;
  onRestart: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ insuranceType, result, onRestart }) => {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low risk':
        return 'text-green-400 bg-green-900 border-green-500';
      case 'medium risk':
        return 'text-yellow-400 bg-yellow-900 border-yellow-500';
      case 'high risk':
        return 'text-red-400 bg-red-900 border-red-500';
      default:
        return 'text-gray-400 bg-gray-900 border-gray-500';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low risk':
        return <CheckCircle size={24} />;
      case 'medium risk':
        return <TrendingUp size={24} />;
      case 'high risk':
        return <AlertTriangle size={24} />;
      default:
        return <Shield size={24} />;
    }
  };

  const getInsuranceTitle = (type: InsuranceType) => {
    switch (type) {
      case 'medical':
        return 'Medical Insurance';
      case 'property':
        return 'Property Insurance';
      case 'agriculture':
        return 'Agriculture Insurance';
    }
  };

  const getResultDescription = (type: InsuranceType, result: PredictionResult) => {
    switch (type) {
      case 'medical':
        return {
          title: 'Predicted Annual Premium',
          value: result.predicted_value ? `$${result.predicted_value.toLocaleString()}` : 'N/A',
          description: 'Based on your health profile and demographics'
        };
      case 'agriculture':
        return {
          title: 'Predicted Crop Yield',
          value: result.predicted_value ? `${result.predicted_value.toFixed(2)} Quintals/Hectare` : 'N/A',
          description: 'Based on cultivation costs and regional factors'
        };
      case 'property':
        return {
          title: 'Risk Assessment',
          value: 'Complete',
          description: 'Based on property characteristics and location factors'
        };
    }
  };

  const resultDetails = getResultDescription(insuranceType, result);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <Shield size={64} className="mx-auto text-blue-400 mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Insurance Assessment Complete</h1>
            <p className="text-gray-400 text-lg">{getInsuranceTitle(insuranceType)} Analysis Results</p>
          </div>

          <div className="space-y-6">
            {/* Risk Level */}
            <div className={`rounded-lg border p-6 ${getRiskColor(result.risk_level)}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Risk Level Assessment</h3>
                {getRiskIcon(result.risk_level)}
              </div>
              <div className="text-3xl font-bold mb-2">{result.risk_level}</div>
              <p className="opacity-90">
                Your {insuranceType} insurance application has been assessed as {result.risk_level.toLowerCase()}.
              </p>
            </div>

            {/* Prediction Value */}
            <div className="bg-gray-700 rounded-lg border border-gray-600 p-6">
              <h3 className="text-xl font-bold text-white mb-4">{resultDetails.title}</h3>
              <div className="text-3xl font-bold text-blue-400 mb-2">{resultDetails.value}</div>
              <p className="text-gray-400">{resultDetails.description}</p>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-700 rounded-lg border border-gray-600 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recommendations</h3>
              <ul className="space-y-2 text-gray-300">
                {result.risk_level.toLowerCase() === 'low risk' && (
                  <>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      You qualify for standard or preferred rates
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      Consider increasing coverage for better protection
                    </li>
                  </>
                )}
                {result.risk_level.toLowerCase() === 'medium risk' && (
                  <>
                    <li className="flex items-start">
                      <TrendingUp size={16} className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      Standard rates may apply with possible adjustments
                    </li>
                    <li className="flex items-start">
                      <TrendingUp size={16} className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      Consider risk reduction measures to improve rating
                    </li>
                  </>
                )}
                {result.risk_level.toLowerCase() === 'high risk' && (
                  <>
                    <li className="flex items-start">
                      <AlertTriangle size={16} className="text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                      Higher premiums may be required
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle size={16} className="text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                      Additional documentation or evaluation may be needed
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onRestart}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 font-medium"
            >
              Start New Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;