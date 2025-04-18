
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

// Default fallback prices in case processing fails
const defaultPrices = {
  'Plain Concrete': { pricePerSqft: '$5-7', avgSize: '500-600 sqft', totalRange: '$2,500-$4,200' },
  'Stamped Concrete': { pricePerSqft: '$12-18', avgSize: '500-600 sqft', totalRange: '$6,000-$10,800' },
  'Exposed Aggregate': { pricePerSqft: '$10-13', avgSize: '500-600 sqft', totalRange: '$5,000-$7,800' },
  'Coloured Concrete': { pricePerSqft: '$8-12', avgSize: '500-600 sqft', totalRange: '$4,000-$7,200' },
  'Pebble Finish': { pricePerSqft: '$9-12', avgSize: '500-600 sqft', totalRange: '$4,500-$7,200' },
  'Brushed Finish': { pricePerSqft: '$5-8', avgSize: '500-600 sqft', totalRange: '$2,500-$4,800' }
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
  const [area, setArea] = useState(0); // Track area explicitly

  // Fetch pricing data when state changes
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
          
          // Only use processed pricing if it has entries
          if (Object.keys(processedPricing).length > 0) {
            setPricing(processedPricing);
            
            // Check if data source is from database or defaults
            const isFromDatabase = data.some(item => item._isFromDatabase === true);
            
            // If using default data, check if it's specific to the selected state
            const isStateSpecific = data.some(item => 
              item.State && item.State.toLowerCase() === stateToFetch.toLowerCase()
            );
            
            if (isFromDatabase) {
              setDataSource('specific');
              console.log('Using database-specific pricing data');
            } else if (isStateSpecific) {
              setDataSource('state-default');
              console.log('Using state-specific default pricing data');
            } else {
              setDataSource('fallback');
              console.log('Using fallback pricing data');
            }
          } else {
            // If processing failed, use default prices
            console.log('Pricing data processing failed, using defaults');
            setPricing(defaultPrices);
            setDataSource('fallback');
          }
          
        } else {
          console.log('No pricing data found for state:', stateToFetch);
          setPricing(defaultPrices);
          setDataSource('fallback');
        }
      } catch (err) {
        console.error('Error fetching pricing data:', err);
        setError('Failed to fetch pricing data');
        setPricing(defaultPrices);
        setDataSource('fallback');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetch();
  }, [selectedState]);

  // Recalculate area whenever width or length changes
  const isCustom = sizePreset === 'Custom';
  const width = isCustom ? parseFloat(custom.width.toString() || '0') : presets[sizePreset as keyof typeof presets].width;
  const length = isCustom ? parseFloat(custom.length.toString() || '0') : presets[sizePreset as keyof typeof presets].length;
  
  // Update area whenever size changes
  useEffect(() => {
    const calculatedArea = width * length;
    console.log(`Recalculating area: ${width} × ${length} = ${calculatedArea}`);
    setArea(calculatedArea);
  }, [width, length, sizePreset, isCustom]);

  const handleInteraction = () => {
    if (onInteraction) {
      onInteraction();
    }
  };

  const handleSizeChange = (preset: string) => {
    console.log(`Size preset changed to: ${preset}`);
    setSizePreset(preset);
    
    // If switching to a preset size, immediately recalculate area
    if (preset !== 'Custom') {
      const newWidth = presets[preset as keyof typeof presets].width;
      const newLength = presets[preset as keyof typeof presets].length;
      console.log(`New dimensions: ${newWidth} × ${newLength}`);
      
      // Force immediate area update for better UI responsiveness
      const newArea = newWidth * newLength;
      setArea(newArea);
      console.log(`Immediately updated area to: ${newArea}`);
    }
    
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
  
  // Try to find pricing data
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
    // Finally use the first price found in the data or default price for the finish
    else if (Object.keys(pricing).length > 0) {
      const firstFinishType = Object.keys(pricing)[0];
      price = pricing[firstFinishType];
      console.log('Using fallback price from first available finish type:', firstFinishType);
    } 
    // Last resort - use default price for the finish
    else if (defaultPrices[finishLabel]) {
      price = defaultPrices[finishLabel];
      console.log('Using default price for finish:', finishLabel);
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
