import React, { useState } from 'react';
import FormField from './FormField';
import { PropertyFormData } from '../types/insurance';

interface PropertyQuestionsProps {
  data: PropertyFormData;
  onUpdate: (data: PropertyFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const PropertyQuestions: React.FC<PropertyQuestionsProps> = ({ data, onUpdate, onNext, onBack }) => {
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
      'propertyType', 'propertyValue', 'propertyAge', 'constructionMaterial', 'roofType',
      'securityFeatures', 'locationRisk', 'floodZone', 'fireProtection', 'maintenanceCondition'
    ];

    requiredFields.forEach(field => {
      if (!data[field as keyof PropertyFormData]) {
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

  const propertyTypeOptions = [
    { value: 'single-family', label: 'Single Family Home' },
    { value: 'condo', label: 'Condominium' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'mobile-home', label: 'Mobile Home' },
  ];

  const constructionOptions = [
    { value: 'brick', label: 'Brick' },
    { value: 'wood', label: 'Wood Frame' },
    { value: 'concrete', label: 'Concrete' },
    { value: 'steel', label: 'Steel Frame' },
    { value: 'mixed', label: 'Mixed Materials' },
  ];

  const roofTypeOptions = [
    { value: 'asphalt', label: 'Asphalt Shingles' },
    { value: 'tile', label: 'Tile' },
    { value: 'metal', label: 'Metal' },
    { value: 'slate', label: 'Slate' },
    { value: 'flat', label: 'Flat Roof' },
  ];

  const securityOptions = [
    { value: 'none', label: 'No Security Features' },
    { value: 'basic', label: 'Basic (Door/Window Locks)' },
    { value: 'alarm', label: 'Security Alarm System' },
    { value: 'cameras', label: 'Security Cameras' },
    { value: 'gated', label: 'Gated Community' },
  ];

  const riskOptions = [
    { value: 'low', label: 'Low Risk Area' },
    { value: 'medium', label: 'Medium Risk Area' },
    { value: 'high', label: 'High Risk Area' },
  ];

  const floodZoneOptions = [
    { value: 'none', label: 'Not in Flood Zone' },
    { value: 'low', label: 'Low Risk Flood Zone' },
    { value: 'moderate', label: 'Moderate Risk Flood Zone' },
    { value: 'high', label: 'High Risk Flood Zone' },
  ];

  const fireProtectionOptions = [
    { value: 'excellent', label: 'Excellent (Fire Station <1 mile)' },
    { value: 'good', label: 'Good (Fire Station 1-3 miles)' },
    { value: 'fair', label: 'Fair (Fire Station 3-5 miles)' },
    { value: 'poor', label: 'Poor (Fire Station >5 miles)' },
  ];

  const maintenanceOptions = [
    { value: 'excellent', label: 'Excellent Condition' },
    { value: 'good', label: 'Good Condition' },
    { value: 'fair', label: 'Fair Condition' },
    { value: 'poor', label: 'Poor Condition' },
  ];

  return (
    <div className="bg-gray-900 p-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 -mt-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Property Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Property Type"
                name="propertyType"
                type="select"
                value={data.propertyType}
                onChange={handleChange}
                options={propertyTypeOptions}
                required
                error={errors.propertyType}
              />
              <FormField
                label="Property Value (USD)"
                name="propertyValue"
                type="number"
                value={data.propertyValue}
                onChange={handleChange}
                required
                error={errors.propertyValue}
              />
              <FormField
                label="Property Age (Years)"
                name="propertyAge"
                type="number"
                value={data.propertyAge}
                onChange={handleChange}
                required
                error={errors.propertyAge}
              />
              <FormField
                label="Construction Material"
                name="constructionMaterial"
                type="select"
                value={data.constructionMaterial}
                onChange={handleChange}
                options={constructionOptions}
                required
                error={errors.constructionMaterial}
              />
              <FormField
                label="Roof Type"
                name="roofType"
                type="select"
                value={data.roofType}
                onChange={handleChange}
                options={roofTypeOptions}
                required
                error={errors.roofType}
              />
              <FormField
                label="Security Features"
                name="securityFeatures"
                type="select"
                value={data.securityFeatures}
                onChange={handleChange}
                options={securityOptions}
                required
                error={errors.securityFeatures}
              />
              <FormField
                label="Location Risk Level"
                name="locationRisk"
                type="select"
                value={data.locationRisk}
                onChange={handleChange}
                options={riskOptions}
                required
                error={errors.locationRisk}
              />
              <FormField
                label="Flood Zone"
                name="floodZone"
                type="select"
                value={data.floodZone}
                onChange={handleChange}
                options={floodZoneOptions}
                required
                error={errors.floodZone}
              />
              <FormField
                label="Fire Protection"
                name="fireProtection"
                type="select"
                value={data.fireProtection}
                onChange={handleChange}
                options={fireProtectionOptions}
                required
                error={errors.fireProtection}
              />
              <FormField
                label="Maintenance Condition"
                name="maintenanceCondition"
                type="select"
                value={data.maintenanceCondition}
                onChange={handleChange}
                options={maintenanceOptions}
                required
                error={errors.maintenanceCondition}
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
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 font-medium"
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

export default PropertyQuestions;