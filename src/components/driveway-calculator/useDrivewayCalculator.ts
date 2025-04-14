
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
  
  console.log('Processing pricing data:', data);
  
  if (data && data.length > 0) {
    data.forEach(item => {
      try {
        // Prioritize UI Finish Label as requested
        const finishLabel = item['UI Finish Label'];
        
        if (finishLabel) {
          console.log(`Found pricing for UI Finish Label: "${finishLabel}"`);
          prices[finishLabel] = {
            pricePerSqft: item['Price/Sqft'] || 'Not available',
            avgSize: item['Avg Size'] || 'Not available',
            totalRange: item['Total Range'] || 'Not available'
          };
          
          // Also store with lowercase key for case-insensitive matching
          prices[finishLabel.toLowerCase()] = {
            pricePerSqft: item['Price/Sqft'] || 'Not available',
            avgSize: item['Avg Size'] || 'Not available',
            totalRange: item['Total Range'] || 'Not available'
          };
        }
        
        // Fallback to Finish Type if UI Finish Label is not available
        const finishType = item['Finish Type'];
        if (finishType) {
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
        }
      } catch (e) {
        console.error('Error processing price data for item:', item, e);
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
  const [selectedState, setSelectedState] = useState(state || 'Texas');
  const [dataSource, setDataSource] = useState<string>('specific'); // 'specific' or 'fallback'

  useEffect(() => {
    const stateToFetch = selectedState || 'Texas';
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
          
          // Check if data is for the selected state or fallback
          const isSpecificData = data.some(item => 
            item.State && item.State.toLowerCase() === stateToFetch.toLowerCase()
          );
          
          setDataSource(isSpecificData ? 'specific' : 'fallback');
          console.log(`Using ${isSpecificData ? 'specific' : 'fallback'} pricing data`);
          
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
  
  console.log('UI Finish Label:', finishLabel);
  
  // Try to find pricing data with priority on UI Finish Label
  let price = null;
  
  // First try exact match with UI finish label (primary matching strategy)
  if (pricing[finishLabel]) {
    price = pricing[finishLabel];
    console.log('Found price using UI finish label (exact match):', finishLabel);
  }
  // Then try lowercase UI finish label
  else if (pricing[finishLabel.toLowerCase()]) {
    price = pricing[finishLabel.toLowerCase()];
    console.log('Found price using lowercase UI finish label:', finishLabel.toLowerCase());
  }
  // Fallback to database finish type
  else {
    // Get the database finish type from the UI label using our mapping
    const databaseFinishType = labelToFinishType[finishLabel];
    console.log('Database Finish Type:', databaseFinishType);
    
    if (databaseFinishType && pricing[databaseFinishType]) {
      price = pricing[databaseFinishType];
      console.log('Found price using database finish type:', databaseFinishType);
    }
    // Then try lowercase database finish type
    else if (databaseFinishType && pricing[databaseFinishType.toLowerCase()]) {
      price = pricing[databaseFinishType.toLowerCase()];
      console.log('Found price using lowercase database finish type:', databaseFinishType.toLowerCase());
    }
    // Finally use the first price found in the data
    else if (Object.keys(pricing).length > 0) {
      const firstFinishType = Object.keys(pricing)[0];
      price = pricing[firstFinishType];
      console.log('Using fallback price from first available finish type:', firstFinishType);
    }
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
    dataSource,
    handleSizeChange,
    handleFinishChange,
    handleCustomSizeChange,
    handleScrollToQuoteForm,
    handleStateChange,
    presets
  };
};
