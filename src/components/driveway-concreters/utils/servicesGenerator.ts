
import { Service } from '../types';

/**
 * Generates location-specific services
 */
export const generateLocationServices = (formattedCity: string): Service[] => {
  return [
    {
      title: "Standard Concrete Driveways",
      description: `Durable, long-lasting concrete driveways custom-designed for your ${formattedCity} home, with expert installation and finishing.`
    },
    {
      title: "Stamped Concrete Driveways",
      description: "Beautiful textured patterns that can mimic brick, stone, or tile at a fraction of the cost of these materials."
    },
    {
      title: "Colored Concrete Driveways",
      description: "Integral coloring, stains, and dyes to achieve a wide variety of hues that complement your home's exterior."
    },
    {
      title: "Exposed Aggregate Driveways",
      description: "Revealing the natural stone within the concrete for a textured, non-slip surface with natural beauty."
    },
    {
      title: "Concrete Driveway Repair",
      description: `Expert repair services for cracked, damaged, or aging concrete driveways throughout ${formattedCity}.`
    },
    {
      title: "Concrete Driveway Extensions",
      description: "Expand your existing driveway to accommodate additional vehicles or create more space for activities."
    }
  ];
};
