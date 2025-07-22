import React, { useState } from 'react';
import FormField from './FormField';
import { AgricultureFormData } from '../types/insurance';

interface AgricultureQuestionsProps {
  data: AgricultureFormData;
  onUpdate: (data: AgricultureFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const AgricultureQuestions: React.FC<AgricultureQuestionsProps> = ({ data, onUpdate, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onUpdate({ ...data, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      'cropName', 'stateName', 'farmSize', 'costCultivationA2fl', 'costCultivationC2',
      'costProductionC2', 'irrigationType', 'soilType', 'previousYield', 'weatherRisk'
    ];

    requiredFields.forEach(field => {
      if (!data[field as keyof AgricultureFormData] && data[field as keyof AgricultureFormData] !== 0) {
        newErrors[field] = 'This field is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const cropOptions = [
    { value: 'RICE', label: 'Rice' },
    { value: 'WHEAT', label: 'Wheat' },
    { value: 'COTTON', label: 'Cotton' },
    { value: 'SUGARCANE', label: 'Sugarcane' },
    { value: 'MAIZE', label: 'Maize' },
    { value: 'SOYBEAN', label: 'Soybean' },
  ];

  const stateOptions = [
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Gujarat', label: 'Gujarat' },
  ];

  const irrigationOptions = [
    { value: 'canal', label: 'Canal Irrigation' },
    { value: 'tube-well', label: 'Tube Well' },
    { value: 'rain-fed', label: 'Rain-fed' },
    { value: 'drip', label: 'Drip Irrigation' },
    { value: 'sprinkler', label: 'Sprinkler System' },
  ];

  const soilOptions = [
    { value: 'alluvial', label: 'Alluvial Soil' },
    { value: 'black', label: 'Black Soil' },
    { value: 'red', label: 'Red Soil' },
    { value: 'laterite', label: 'Laterite Soil' },
    { value: 'desert', label: 'Desert Soil' },
  ];

  const weatherRiskOptions = [
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' },
  ];

  return (
    <div className="bg-gray-900 p-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 -mt-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Agriculture Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Crop Type"
                name="cropName"
                type="select"
                value={data.cropName}
                onChange={handleChange}
                options={cropOptions}
                required
                error={errors.cropName}
              />
              <FormField
                label="State"
                name="stateName"
                type="select"
                value={data.stateName}
                onChange={handleChange}
                options={stateOptions}
                required
                error={errors.stateName}
              />
              <FormField
                label="Farm Size (Hectares)"
                name="farmSize"
                type="number"
                value={data.farmSize}
                onChange={handleChange}
                required
                error={errors.farmSize}
              />
              <FormField
                label="Cost of Cultivation A2+FL (₹/Hectare)"
                name="costCultivationA2fl"
                type="number"
                value={data.costCultivationA2fl}
                onChange={handleChange}
                required
                error={errors.costCultivationA2fl}
              />
              <FormField
                label="Cost of Cultivation C2 (₹/Hectare)"
                name="costCultivationC2"
                type="number"
                value={data.costCultivationC2}
                onChange={handleChange}
                required
                error={errors.costCultivationC2}
              />
              <FormField
                label="Cost of Production C2 (₹/Quintal)"
                name="costProductionC2"
                type="number"
                value={data.costProductionC2}
                onChange={handleChange}
                required
                error={errors.costProductionC2}
              />
              <FormField
                label="Irrigation Type"
                name="irrigationType"
                type="select"
                value={data.irrigationType}
                onChange={handleChange}
                options={irrigationOptions}
                required
                error={errors.irrigationType}
              />
              <FormField
                label="Soil Type"
                name="soilType"
                type="select"
                value={data.soilType}
                onChange={handleChange}
                options={soilOptions}
                required
                error={errors.soilType}
              />
              <FormField
                label="Previous Year Yield (Quintal/Hectare)"
                name="previousYield"
                type="number"
                value={data.previousYield}
                onChange={handleChange}
                required
                error={errors.previousYield}
              />
              <FormField
                label="Weather Risk Assessment"
                name="weatherRisk"
                type="select"
                value={data.weatherRisk}
                onChange={handleChange}
                options={weatherRiskOptions}
                required
                error={errors.weatherRisk}
              />
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium"
              >
                Get Prediction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgricultureQuestions;