
import { useState, useEffect } from 'react';
import { getFinishPricingByState } from '@/lib/api/getFinishPricing';
import { finishIdToLabel, labelToFinishType } from '@/config/finishTypes';

interface DrivewaySize {
  width: number;
  length: number;
}

export const presets = {
  Small: { width: 10, length: 18, description: '1 car: 10×18 ft' },
  Medium: { width: 16, length: 20, description: '2 cars: 16×20 ft' },
  Large: { width: 20, length: 30, description: '3+ cars: 20×30 ft' }
};

// Process data from the concrete_driveway_estimate table
const processPricingData = (data: any[]) => {
  const prices: Record<string, { pricePerSqft: string; avgSize: string; totalRange: string }> = {};
  
  if (data && data.length > 0) {
    data.forEach(item => {
      if (item['Finish Type']) {
        try {
          const finishType = item['Finish Type'];
          
          // Store pricing with the finish type as key
          prices[finishType] = {
            pricePerSqft: item['Price/Sqft'] || 'Not available',
            avgSize: item['Avg Size'] || 'Not available',
            totalRange: item['Total Range'] || 'Not available'
          };
          
          // Also store with lowercase key for case-insensitive matching
          prices[finishType.toLowerCase()] = {
            pricePerSqft: item['Price/Sqft'] || 'Not available',
            avgSize: item['Avg Size'] || 'Not available',
            totalRange: item['Total Range'] || 'Not available'
          };
        } catch (e) {
          console.error('Error processing price data:', e);
        }
      }
    });
  }
  
  console.log('Processed pricing data:', prices);
  return prices;
};

export const useDrivewayCalculator = (state: string | undefined, onInteraction?: () => void) => {
  const [pricing, setPricing] = useState<Record<string, { pricePerSqft: string; avgSize: string; totalRange: string }>>({});
  const [finishId, setFinishId] = useState('plain');
  const [sizePreset, setSizePreset] = useState('Medium');
  const [custom, setCustom] = useState<DrivewaySize>({ width: 0, length: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState(state || 'California');

  useEffect(() => {
    const stateToFetch = selectedState || 'California';
    const fetch = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching data for state:', stateToFetch);
        
        const data = await getFinishPricingByState(stateToFetch);
        console.log('Received pricing data:', data);
        
        if (data && data.length > 0) {
          const processedPricing = processPricingData(data);
          setPricing(processedPricing);
        } else {
          console.log('No pricing data found for state:', stateToFetch);
          setPricing({});
          setError('No pricing data available for this location');
        }
      } catch (err) {
        console.error('Error fetching pricing data:', err);
        setError('Failed to fetch pricing data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetch();
  }, [selectedState]);

  const isCustom = sizePreset === 'Custom';
  const width = isCustom ? parseFloat(custom.width.toString() || '0') : presets[sizePreset as keyof typeof presets].width;
  const length = isCustom ? parseFloat(custom.length.toString() || '0') : presets[sizePreset as keyof typeof presets].length;
  const area = width * length;

  const handleInteraction = () => {
    if (onInteraction) {
      onInteraction();
    }
  };

  const handleSizeChange = (preset: string) => {
    setSizePreset(preset);
    handleInteraction();
  };

  const handleFinishChange = (id: string) => {
    setFinishId(id);
    handleInteraction();
  };

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    handleInteraction();
  };

  const handleCustomSizeChange = (dimension: 'width' | 'length', value: number) => {
    setCustom(prev => ({ ...prev, [dimension]: value }));
    handleInteraction();
  };

  const handleScrollToQuoteForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const quoteForm = document.querySelector('#quote-form');
    if (quoteForm) {
      quoteForm.scrollIntoView({ behavior: 'smooth' });
    }
    handleInteraction();
  };

  // Get the UI finish label for the selected finish ID
  const finishLabel = finishIdToLabel[finishId] || finishId;
  
  // Get the database finish type from the UI label using our mapping
  const databaseFinishType = labelToFinishType[finishLabel];
  
  console.log('UI Finish Label:', finishLabel);
  console.log('Database Finish Type:', databaseFinishType);
  
  // Look for price in processed pricing data using the mapped database finish type
  let price = pricing[databaseFinishType];
  
  // Try lowercase version if not found
  if (!price && databaseFinishType) {
    price = pricing[databaseFinishType.toLowerCase()];
    console.log('Trying lowercase finish type match:', databaseFinishType.toLowerCase(), price);
  }

  return {
    pricing,
    finishId,
    sizePreset,
    custom,
    isCustom,
    width,
    length,
    area,
    price,
    isLoading,
    error,
    selectedState,
    handleSizeChange,
    handleFinishChange,
    handleCustomSizeChange,
    handleScrollToQuoteForm,
    handleStateChange,
    presets
  };
};
