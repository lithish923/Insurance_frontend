import React, { useState } from 'react';
import FormField from './FormField';
import { CommonFormData } from '../types/insurance';

interface CommonQuestionsProps {
  data: CommonFormData;
  onUpdate: (data: CommonFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const CommonQuestions: React.FC<CommonQuestionsProps> = ({ data, onUpdate, onNext, onBack }) => {
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
      'fullName', 'email', 'phone', 'dateOfBirth', 'address', 'city', 'state', 'zipCode',
      'occupation', 'annualIncome', 'employmentStatus', 'previousInsurance', 'claimsHistory',
      'coverageAmount', 'preferredDeductible'
    ];

    requiredFields.forEach(field => {
      if (!data[field as keyof CommonFormData]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
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

  const employmentOptions = [
    { value: 'employed', label: 'Employed' },
    { value: 'self-employed', label: 'Self-Employed' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'retired', label: 'Retired' },
    { value: 'student', label: 'Student' },
  ];

  const previousInsuranceOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const claimsHistoryOptions = [
    { value: 'none', label: 'No Previous Claims' },
    { value: 'one', label: '1 Claim in Last 5 Years' },
    { value: 'multiple', label: 'Multiple Claims' },
  ];

  return (
    <div className="bg-gray-900 p-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 -mt-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">General Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Full Name"
                name="fullName"
                value={data.fullName}
                onChange={handleChange}
                required
                error={errors.fullName}
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                required
                error={errors.email}
              />
              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={data.phone}
                onChange={handleChange}
                required
                error={errors.phone}
              />
              <FormField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={data.dateOfBirth}
                onChange={handleChange}
                required
                error={errors.dateOfBirth}
              />
              <FormField
                label="Street Address"
                name="address"
                value={data.address}
                onChange={handleChange}
                required
                error={errors.address}
              />
              <FormField
                label="City"
                name="city"
                value={data.city}
                onChange={handleChange}
                required
                error={errors.city}
              />
              <FormField
                label="State"
                name="state"
                value={data.state}
                onChange={handleChange}
                required
                error={errors.state}
              />
              <FormField
                label="ZIP Code"
                name="zipCode"
                value={data.zipCode}
                onChange={handleChange}
                required
                error={errors.zipCode}
              />
              <FormField
                label="Occupation"
                name="occupation"
                value={data.occupation}
                onChange={handleChange}
                required
                error={errors.occupation}
              />
              <FormField
                label="Annual Income"
                name="annualIncome"
                type="number"
                value={data.annualIncome}
                onChange={handleChange}
                required
                placeholder="Enter amount in USD"
                error={errors.annualIncome}
              />
              <FormField
                label="Employment Status"
                name="employmentStatus"
                type="select"
                value={data.employmentStatus}
                onChange={handleChange}
                options={employmentOptions}
                required
                error={errors.employmentStatus}
              />
              <FormField
                label="Previous Insurance"
                name="previousInsurance"
                type="select"
                value={data.previousInsurance}
                onChange={handleChange}
                options={previousInsuranceOptions}
                required
                error={errors.previousInsurance}
              />
              <FormField
                label="Claims History"
                name="claimsHistory"
                type="select"
                value={data.claimsHistory}
                onChange={handleChange}
                options={claimsHistoryOptions}
                required
                error={errors.claimsHistory}
              />
              <FormField
                label="Desired Coverage Amount"
                name="coverageAmount"
                type="number"
                value={data.coverageAmount}
                onChange={handleChange}
                required
                placeholder="Enter amount in USD"
                error={errors.coverageAmount}
              />
              <FormField
                label="Preferred Deductible"
                name="preferredDeductible"
                type="number"
                value={data.preferredDeductible}
                onChange={handleChange}
                required
                placeholder="Enter amount in USD"
                error={errors.preferredDeductible}
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
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 font-medium"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommonQuestions;