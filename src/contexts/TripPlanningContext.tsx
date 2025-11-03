import React, { createContext, useContext, useState } from 'react';

export interface TripPlanningData {
  fromLocation: string;
  budget: number;
  budgetBreakdown: {
    accommodation: number;
    transport: number;
    food: number;
    activities: number;
  };
  tripType: 'solo' | 'partner' | 'friends' | 'family' | '';
  travelingWithPets: boolean;
  groupSize?: number;
  adults?: number;
  children?: number;
  healthConditions: string[];
  customHealthCondition: string;
  foodPreferences: string[];
  travelMode: string[];
  interests: string[];
  customInterests: string[];
}

interface TripPlanningContextType {
  tripData: TripPlanningData;
  updateTripData: (data: Partial<TripPlanningData>) => void;
  resetTripData: () => void;
}

const defaultTripData: TripPlanningData = {
  fromLocation: '',
  budget: 50000,
  budgetBreakdown: {
    accommodation: 40,
    transport: 30,
    food: 20,
    activities: 10,
  },
  tripType: '',
  travelingWithPets: false,
  healthConditions: [],
  customHealthCondition: '',
  foodPreferences: [],
  travelMode: [],
  interests: [],
  customInterests: [],
};

const TripPlanningContext = createContext<TripPlanningContextType | undefined>(undefined);

export const TripPlanningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tripData, setTripData] = useState<TripPlanningData>(defaultTripData);

  const updateTripData = (data: Partial<TripPlanningData>) => {
    setTripData(prev => ({ ...prev, ...data }));
  };

  const resetTripData = () => {
    setTripData(defaultTripData);
  };

  return (
    <TripPlanningContext.Provider value={{ tripData, updateTripData, resetTripData }}>
      {children}
    </TripPlanningContext.Provider>
  );
};

export const useTripPlanning = () => {
  const context = useContext(TripPlanningContext);
  if (!context) {
    throw new Error('useTripPlanning must be used within TripPlanningProvider');
  }
  return context;
};
