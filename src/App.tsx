import React, { useState } from 'react';
import InsuranceTypeSelector from './components/InsuranceTypeSelector';
import CommonQuestions from './components/CommonQuestions';
import MedicalQuestions from './components/MedicalQuestions';
import AgricultureQuestions from './components/AgricultureQuestions';
import PropertyQuestions from './components/PropertyQuestions';
import ResultsDisplay from './components/ResultsDisplay';
import ProgressBar from './components/ProgressBar';
import {
  InsuranceType,
  CommonFormData,
  MedicalFormData,
  AgricultureFormData,
  PropertyFormData,
  PredictionResult,
} from './types/insurance';
import { predictMedical, predictAgriculture, predictProperty } from './services/api';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [insuranceType, setInsuranceType] = useState<InsuranceType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  // Form data states
  const [commonData, setCommonData] = useState<CommonFormData>({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    occupation: '',
    annualIncome: '',
    employmentStatus: '',
    previousInsurance: '',
    claimsHistory: '',
    coverageAmount: '',
    preferredDeductible: '',
  });

  const [medicalData, setMedicalData] = useState<MedicalFormData>({
    age: 0,
    height: '',
    weight: '',
    bmi: 0,
    sex: 'male',
    smoker: 'no',
    region: 'northeast',
    children: 0,
    preExistingConditions: '',
    medications: '',
  });

  const [agricultureData, setAgricultureData] = useState<AgricultureFormData>({
    cropName: '',
    stateName: '',
    farmSize: '',
    costCultivationA2fl: 0,
    costCultivationC2: 0,
    costProductionC2: 0,
    irrigationType: '',
    soilType: '',
    previousYield: '',
    weatherRisk: '',
  });

  const [propertyData, setPropertyData] = useState<PropertyFormData>({
    propertyType: '',
    propertyValue: '',
    propertyAge: '',
    constructionMaterial: '',
    roofType: '',
    securityFeatures: '',
    locationRisk: '',
    floodZone: '',
    fireProtection: '',
    maintenanceCondition: '',
  });

  const stepTitles = insuranceType 
    ? ['Type', 'General', 'Specific', 'Results']
    : ['Select Insurance Type'];

  const handleInsuranceTypeSelect = (type: InsuranceType) => {
    setInsuranceType(type);
    setCurrentStep(1);
  };

  const handlePrediction = async () => {
    setIsLoading(true);
    try {
      let result: PredictionResult;
      
      if (insuranceType === 'medical') {
        result = await predictMedical(medicalData);
      } else if (insuranceType === 'agriculture') {
        result = await predictAgriculture(agricultureData);
      } else {
        result = await predictProperty(propertyData);
      }
      
      setPredictionResult(result);
      setCurrentStep(3);
    } catch (error) {
      console.error('Prediction failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Prediction failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setInsuranceType(null);
    setPredictionResult(null);
    // Reset all form data
    setCommonData({
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      occupation: '',
      annualIncome: '',
      employmentStatus: '',
      previousInsurance: '',
      claimsHistory: '',
      coverageAmount: '',
      preferredDeductible: '',
    });
    setMedicalData({
      age: 0,
      height: '',
      weight: '',
      bmi: 0,
      sex: 'male',
      smoker: 'no',
      region: 'northeast',
      children: 0,
      preExistingConditions: '',
      medications: '',
    });
    setAgricultureData({
      cropName: '',
      stateName: '',
      farmSize: '',
      costCultivationA2fl: 0,
      costCultivationC2: 0,
      costProductionC2: 0,
      irrigationType: '',
      soilType: '',
      previousYield: '',
      weatherRisk: '',
    });
    setPropertyData({
      propertyType: '',
      propertyValue: '',
      propertyAge: '',
      constructionMaterial: '',
      roofType: '',
      securityFeatures: '',
      locationRisk: '',
      floodZone: '',
      fireProtection: '',
      maintenanceCondition: '',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Application</h2>
          <p className="text-gray-400">Please wait while we process your insurance data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentStep === 0 && <InsuranceTypeSelector onSelect={handleInsuranceTypeSelect} />}
      
      {currentStep > 0 && insuranceType && (
        <div className="bg-gray-900 p-4">
          <div className="max-w-4xl mx-auto pt-8">
            <ProgressBar 
              currentStep={currentStep} 
              totalSteps={4} 
              stepTitles={stepTitles}
            />
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <CommonQuestions
          data={commonData}
          onUpdate={setCommonData}
          onNext={() => setCurrentStep(2)}
          onBack={() => setCurrentStep(0)}
        />
      )}

      {currentStep === 2 && insuranceType === 'medical' && (
        <MedicalQuestions
          data={medicalData}
          onUpdate={setMedicalData}
          onNext={handlePrediction}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 2 && insuranceType === 'agriculture' && (
        <AgricultureQuestions
          data={agricultureData}
          onUpdate={setAgricultureData}
          onNext={handlePrediction}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 2 && insuranceType === 'property' && (
        <PropertyQuestions
          data={propertyData}
          onUpdate={setPropertyData}
          onNext={handlePrediction}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && predictionResult && insuranceType && (
        <ResultsDisplay
          insuranceType={insuranceType}
          result={predictionResult}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;