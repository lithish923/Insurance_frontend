import { MedicalFormData, AgricultureFormData, PropertyFormData, PredictionResult } from '../types/insurance';

const API_BASE_URL = 'https://insurance-predictor-19ci.onrender.com:5000';

// Helper function to check if backend is running
const checkBackendConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const predictMedical = async (data: MedicalFormData): Promise<PredictionResult> => {
  // Check if backend is running first
  const isBackendRunning = await checkBackendConnection();
  if (!isBackendRunning) {
    throw new Error('Backend server is not running on port 5000. Please start your Flask API server by running "python api.py" in your backend directory.');
  }

  const response = await fetch(`${API_BASE_URL}/predict/medical`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      age: data.age,
      bmi: data.bmi,
      children: data.children,
      sex: data.sex,
      smoker: data.smoker,
      region: data.region,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Medical prediction failed: ${response.status} - ${errorText}`);
  }

  return response.json();
};

export const predictAgriculture = async (data: AgricultureFormData): Promise<PredictionResult> => {
  // Check if backend is running first
  const isBackendRunning = await checkBackendConnection();
  if (!isBackendRunning) {
    throw new Error('Backend server is not running on port 5000. Please start your Flask API server by running "python api.py" in your backend directory.');
  }

  const response = await fetch(`${API_BASE_URL}/predict/agriculture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      crop_name: data.cropName,
      state_name: data.stateName,
      cost_cultivation_a2fl: data.costCultivationA2fl,
      cost_cultivation_c2: data.costCultivationC2,
      cost_production_c2: data.costProductionC2,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Agriculture prediction failed: ${response.status} - ${errorText}`);
  }

  return response.json();
};

export const predictProperty = async (data: PropertyFormData): Promise<PredictionResult> => {
  // Check if backend is running first
  const isBackendRunning = await checkBackendConnection();
  if (!isBackendRunning) {
    throw new Error('Backend server is not running on port 5000. Please start your Flask API server by running "python api.py" in your backend directory.');
  }

  const response = await fetch(`${API_BASE_URL}/predict/property`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      property_type: data.propertyType,
      property_value: data.propertyValue,
      property_age: data.propertyAge,
      construction_material: data.constructionMaterial,
      roof_type: data.roofType,
      security_features: data.securityFeatures,
      location_risk: data.locationRisk,
      flood_zone: data.floodZone,
      fire_protection: data.fireProtection,
      maintenance_condition: data.maintenanceCondition,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Property prediction failed: ${response.status} - ${errorText}`);
  }

  return response.json();
};