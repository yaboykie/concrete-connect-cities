
import { useState, useEffect } from 'react';
import { getFinishPricingByState } from '@/lib/api/getFinishPricing';

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
      if (item['Finish Type'] && item['Price/Sqft']) {
        try {
          // Store the pricing data directly as strings
          const finishType = item['Finish Type'];
          const uiFinishLabel = item['UI Finish Label'] || finishType;
          
          prices[finishType] = {
            pricePerSqft: item['Price/Sqft'] || 'Not available',
            avgSize: item['Avg Size'] || 'Not available',
            totalRange: item['Total Range'] || 'Not available'
          };
          
          // Store with lowercase key for case-insensitive matching
          prices[finishType.toLowerCase()] = {
            pricePerSqft: item['Price/Sqft'] || 'Not available',
            avgSize: item['Avg Size'] || 'Not available',
            totalRange: item['Total Range'] || 'Not available'
          };
          
          // Also store with the UI Finish Label
          prices[uiFinishLabel] = {
            pricePerSqft: item['Price/Sqft'] || 'Not available',
            avgSize: item['Avg Size'] || 'Not available',
            totalRange: item['Total Range'] || 'Not available'
          };
          
          prices[uiFinishLabel.toLowerCase()] = {
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

  // Map finish IDs to concrete_styles from the database
  const finishMap: Record<string, string> = {
    'plain': 'Plain Concrete',
    'exposed': 'Exposed Aggregate',
    'stamped': 'Stamped Concrete',
    'coloured': 'Coloured Concrete',
    'pebble': 'Pebble Finish',
    'brushed': 'Brushed Finish'
  };

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

  // Get the display name for the selected finish
  const finishLabel = finishMap[finishId] || finishId;
  
  // Look for price in processed pricing data
  let price = pricing[finishLabel];
  
  // If not found, try lowercase version
  if (!price) {
    price = pricing[finishLabel.toLowerCase()];
    console.log('Trying lowercase match:', finishLabel.toLowerCase(), price);
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
