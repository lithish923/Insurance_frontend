import React, { useState } from 'react';
import FormField from './FormField';
import { MedicalFormData } from '../types/insurance';

interface MedicalQuestionsProps {
  data: MedicalFormData;
  onUpdate: (data: MedicalFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const MedicalQuestions: React.FC<MedicalQuestionsProps> = ({ data, onUpdate, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };

    // Calculate BMI if height and weight are provided
    if (name === 'height' || name === 'weight') {
      const height = name === 'height' ? parseFloat(value) : parseFloat(data.height);
      const weight = name === 'weight' ? parseFloat(value) : parseFloat(data.weight);
      if (height && weight) {
        const bmi = weight / ((height / 100) ** 2);
        updatedData.bmi = parseFloat(bmi.toFixed(1));
      }
    }

    onUpdate(updatedData);
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      'age', 'height', 'weight', 'sex', 'smoker', 'region', 'children',
      'preExistingConditions', 'medications'
    ];

    requiredFields.forEach(field => {
      if (!data[field as keyof MedicalFormData] && data[field as keyof MedicalFormData] !== 0) {
        newErrors[field] = 'This field is required';
      }
    });

    if (data.age && (data.age < 0 || data.age > 120)) {
      newErrors.age = 'Please enter a valid age';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const sexOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const smokerOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const regionOptions = [
    { value: 'northeast', label: 'Northeast' },
    { value: 'northwest', label: 'Northwest' },
    { value: 'southeast', label: 'Southeast' },
    { value: 'southwest', label: 'Southwest' },
  ];

  return (
    <div className="bg-gray-900 p-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 -mt-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Medical Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Age"
                name="age"
                type="number"
                value={data.age}
                onChange={handleChange}
                required
                error={errors.age}
              />
              <FormField
                label="Gender"
                name="sex"
                type="select"
                value={data.sex}
                onChange={handleChange}
                options={sexOptions}
                required
                error={errors.sex}
              />
              <FormField
                label="Height (cm)"
                name="height"
                type="number"
                value={data.height}
                onChange={handleChange}
                required
                error={errors.height}
              />
              <FormField
                label="Weight (kg)"
                name="weight"
                type="number"
                value={data.weight}
                onChange={handleChange}
                required
                error={errors.weight}
              />
              <div className="md:col-span-2">
                <FormField
                  label="BMI (Body Mass Index)"
                  name="bmi"
                  type="number"
                  value={data.bmi || ''}
                  onChange={handleChange}
                  placeholder="Calculated automatically"
                />
                {data.bmi && (
                  <p className="text-sm text-gray-400 mt-1">
                    BMI: {data.bmi} - {
                      data.bmi < 18.5 ? 'Underweight' :
                      data.bmi < 25 ? 'Normal weight' :
                      data.bmi < 30 ? 'Overweight' : 'Obese'
                    }
                  </p>
                )}
              </div>
              <FormField
                label="Do you smoke?"
                name="smoker"
                type="select"
                value={data.smoker}
                onChange={handleChange}
                options={smokerOptions}
                required
                error={errors.smoker}
              />
              <FormField
                label="Region"
                name="region"
                type="select"
                value={data.region}
                onChange={handleChange}
                options={regionOptions}
                required
                error={errors.region}
              />
              <FormField
                label="Number of Children"
                name="children"
                type="number"
                value={data.children}
                onChange={handleChange}
                required
                error={errors.children}
              />
              <FormField
                label="Pre-existing Medical Conditions"
                name="preExistingConditions"
                value={data.preExistingConditions}
                onChange={handleChange}
                required
                placeholder="List any medical conditions or 'None'"
                error={errors.preExistingConditions}
              />
              <FormField
                label="Current Medications"
                name="medications"
                value={data.medications}
                onChange={handleChange}
                required
                placeholder="List current medications or 'None'"
                error={errors.medications}
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
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-medium"
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

export default MedicalQuestions;