export type UtilityType = 'electricity' | 'water' | 'gas';

export interface MonthlyConsumption {
  monthKey: string; // e.g. 'J*', 'F', 'M*'
  monthName: string; // e.g. 'Jan 2026'
  isEstimated: boolean;
  consumption: number; // in kWh or Cu M
  neighbourAvg: number;
  efficiencyAvg: number; // top 20%
}

export interface Premise {
  id: string;
  label: string;
  address: string;
  accountNumber: string;
  type: string;
}

export interface BillItem {
  id: string;
  month: string;
  amount: number;
  status: 'Paid' | 'Outstanding' | 'Processing';
  dueDate: string;
  paidDate?: string;
  breakdown: {
    electricity: number;
    water: number;
    gas: number;
    refuse: number;
    gst: number;
  };
}

export interface GreenReward {
  id: string;
  title: string;
  brand: string;
  pointsCost: number;
  category: 'F&B' | 'Groceries' | 'Transport' | 'Lifestyle';
  badge?: string;
  imageColor: string;
  description: string;
}

export interface EcoChallenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  category: 'Aircon' | 'Water' | 'Transport' | 'Habit';
}

export interface EvStation {
  id: string;
  name: string;
  location: string;
  distance: string;
  availableChargers: number;
  totalChargers: number;
  types: ('AC 22kW' | 'DC 50kW' | 'DC 60kW' | 'DC 120kW')[];
  pricePerKwh: number;
  status: 'Available' | 'Busy' | 'Full';
}
