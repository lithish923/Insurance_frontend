export interface CommonFormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Financial Information
  occupation: string;
  annualIncome: string;
  employmentStatus: string;
  
  // Insurance History
  previousInsurance: string;
  claimsHistory: string;
  coverageAmount: string;
  preferredDeductible: string;
}

export interface MedicalFormData {
  age: number;
  height: string;
  weight: string;
  bmi: number;
  sex: 'male' | 'female';
  smoker: 'yes' | 'no';
  region: 'northeast' | 'northwest' | 'southeast' | 'southwest';
  children: number;
  preExistingConditions: string;
  medications: string;
}

export interface AgricultureFormData {
  cropName: string;
  stateName: string;
  farmSize: string;
  costCultivationA2fl: number;
  costCultivationC2: number;
  costProductionC2: number;
  irrigationType: string;
  soilType: string;
  previousYield: string;
  weatherRisk: string;
}

export interface PropertyFormData {
  propertyType: string;
  propertyValue: string;
  propertyAge: string;
  constructionMaterial: string;
  roofType: string;
  securityFeatures: string;
  locationRisk: string;
  floodZone: string;
  fireProtection: string;
  maintenanceCondition: string;
}

export type InsuranceType = 'medical' | 'property' | 'agriculture';

export interface PredictionResult {
  risk_level: string;
  predicted_value?: number;
}
</parameter>