
import { useState, useEffect, useCallback } from 'react';
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

// Helper function to calculate price based on square footage and price per sqft
const calculatePriceRange = (area: number, pricePerSqft: string): string => {
  try {
    // Parse price per sqft range (format: "$X-Y", "$X–$Y", or "$X–Y")
    // This regex handles multiple dash types and dollar sign formats
    const match = pricePerSqft.match(/\$(\d+)(?:–|-)\$?(\d+)/);
    if (!match) {
      console.error("Price format not recognized:", pricePerSqft);
      return `$${Math.round(area * 7)}-$${Math.round(area * 12)}`; // Fallback calculation
    }
    
    const minPrice = parseInt(match[1], 10);
    const maxPrice = parseInt(match[2], 10);
    
    // Calculate total price range based on area
    const minTotal = Math.round(minPrice * area / 100) * 100; // Round to nearest hundred
    const maxTotal = Math.round(maxPrice * area / 100) * 100;
    
    return `$${minTotal.toLocaleString()}-$${maxTotal.toLocaleString()}`;
  } catch (e) {
    console.error('Error calculating price range:', e, 'for pricePerSqft:', pricePerSqft);
    return `$${Math.round(area * 7)}-$${Math.round(area * 12)}`; // Fallback calculation
  }
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
  const [area, setArea] = useState(0);
  const [cachedPriceData, setCachedPriceData] = useState<{
    pricePerSqft: string; 
    avgSize: string; 
    totalRange: string;
  } | null>(null);

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
    const calculatedArea = Math.round(width * length);
    console.log(`Recalculating area: ${width} × ${length} = ${calculatedArea}`);
    setArea(calculatedArea);
  }, [width, length, sizePreset, isCustom]);

  // Update price calculation when area or finish changes
  useEffect(() => {
    if (area > 0) {
      updatePriceForCurrentFinish();
    }
  }, [area, finishId, pricing]);

  // Function to update price based on current finish and area
  const updatePriceForCurrentFinish = useCallback(() => {
    const finishLabel = finishIdToLabel[finishId] || finishId;
    console.log(`Updating price for ${finishLabel} with area ${area}sq ft`);
    
    // Try to find base price data
    let basePrice = null;
    
    // First try exact match with UI finish label
    if (pricing[finishLabel]) {
      basePrice = pricing[finishLabel];
      console.log('Found base price using UI finish label:', finishLabel);
    }
    // Then try lowercase UI finish label
    else if (pricing[finishLabel.toLowerCase()]) {
      basePrice = pricing[finishLabel.toLowerCase()];
      console.log('Found base price using lowercase UI finish label:', finishLabel.toLowerCase());
    }
    // Fallback to database finish type
    else {
      const databaseFinishType = labelToFinishType[finishLabel];
      
      if (databaseFinishType && pricing[databaseFinishType]) {
        basePrice = pricing[databaseFinishType];
        console.log('Found base price using database finish type:', databaseFinishType);
      }
      else if (databaseFinishType && pricing[databaseFinishType.toLowerCase()]) {
        basePrice = pricing[databaseFinishType.toLowerCase()];
        console.log('Found base price using lowercase database finish type:', databaseFinishType.toLowerCase());
      }
      else if (Object.keys(pricing).length > 0) {
        const firstFinishType = Object.keys(pricing)[0];
        basePrice = pricing[firstFinishType];
        console.log('Using fallback price from first available finish type:', firstFinishType);
      } 
      else if (defaultPrices[finishLabel]) {
        basePrice = defaultPrices[finishLabel];
        console.log('Using default price for finish:', finishLabel);
      }
    }
    
    // Calculate the actual price range based on area
    if (basePrice) {
      const scaledPriceRange = calculatePriceRange(area, basePrice.pricePerSqft);
      
      // Create new price data with updated total range
      const updatedPrice = {
        ...basePrice,
        totalRange: scaledPriceRange
      };
      
      // Update cached price data
      setCachedPriceData(updatedPrice);
      console.log('Updated price data:', updatedPrice);
    }
  }, [area, finishId, pricing]);

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

  return {
    pricing,
    finishId,
    sizePreset,
    custom,
    isCustom,
    width,
    length,
    area,
    price: cachedPriceData,
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
