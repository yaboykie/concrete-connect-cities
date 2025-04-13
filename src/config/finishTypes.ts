
import { ScatterChart, Grid3x3, Square, Palette, Grip, Waves } from 'lucide-react';

export interface FinishRate {
  min: number;
  max: number;
}

export interface FinishOption {
  id: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const finishRates: Record<string, FinishRate> = {
  "Exposed Aggregate": { min: 10, max: 13 },
  "Stamped Concrete": { min: 12, max: 16 },
  "Plain Concrete": { min: 5.5, max: 7.5 },  // Changed from "Plain Grey" to "Plain Concrete"
  "Coloured Concrete": { min: 9, max: 12 },
  "Pebble Finish": { min: 8, max: 10 },
  "Brushed Finish": { min: 6, max: 8 }
};

export const finishOptions: FinishOption[] = [
  { id: 'exposed', label: 'Exposed Aggregate', icon: ScatterChart },
  { id: 'stamped', label: 'Stamped Concrete', icon: Grid3x3 },
  { id: 'plain', label: 'Plain Concrete', icon: Square },  // Changed from "Plain Grey" to "Plain Concrete"
  { id: 'coloured', label: 'Coloured Concrete', icon: Palette },
  { id: 'pebble', label: 'Pebble Finish', icon: Grip },
  { id: 'brushed', label: 'Brushed Finish', icon: Waves }
];

export const finishIdToLabel: Record<string, string> = {
  'exposed': 'Exposed Aggregate',
  'stamped': 'Stamped Concrete',
  'plain': 'Plain Concrete',  // Changed from "Plain Grey" to "Plain Concrete"
  'coloured': 'Coloured Concrete',
  'pebble': 'Pebble Finish',
  'brushed': 'Brushed Finish'
};
