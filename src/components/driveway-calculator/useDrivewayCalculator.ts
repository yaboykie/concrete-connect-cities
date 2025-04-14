
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

export const useDrivewayCalculator = (state: string | undefined, onInteraction?: () => void) => {
  const [pricing, setPricing] = useState<Record<string, { min: number; max: number }>>({});
  const [finishId, setFinishId] = useState('plain');
  const [sizePreset, setSizePreset] = useState('Medium');
  const [custom, setCustom] = useState<DrivewaySize>({ width: 0, length: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!state) return;
    
    const fetch = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching data for state:', state);
        
        const data = await getFinishPricingByState(state);
        console.log('Received pricing data:', data);
        
        const prices: Record<string, { min: number; max: number }> = {};
        
        if (data && data.length > 0) {
          // Store raw data first as a fallback
          data.forEach((item: any) => {
            if (item.concrete_style && typeof item.min_price_sqft !== 'undefined' && typeof item.max_price_sqft !== 'undefined') {
              // Convert string values to numbers if needed
              const minPrice = typeof item.min_price_sqft === 'string' ? parseFloat(item.min_price_sqft) : Number(item.min_price_sqft);
              const maxPrice = typeof item.max_price_sqft === 'string' ? parseFloat(item.max_price_sqft) : Number(item.max_price_sqft);
              
              // Store with original case as in database
              prices[item.concrete_style] = {
                min: minPrice,
                max: maxPrice
              };
              
              // Also store lowercase version for case-insensitive matching
              prices[item.concrete_style.toLowerCase()] = {
                min: minPrice,
                max: maxPrice
              };
            }
          });
          
          console.log('Processed pricing data:', prices);
          setPricing(prices);
        } else {
          console.log('No pricing data found for state:', state);
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
  }, [state]);

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
  
  // First try to get price using exact match
  let price = pricing[finishLabel];
  
  // If not found, try lowercase version
  if (!price) {
    price = pricing[finishLabel.toLowerCase()];
  }
  
  console.log('Current pricing data:', pricing);
  console.log('Selected finish:', finishLabel);
  console.log('Price for selected finish:', price);
  console.log('Trying lowercase match:', finishLabel.toLowerCase(), pricing[finishLabel.toLowerCase()]);

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
    handleSizeChange,
    handleFinishChange,
    handleCustomSizeChange,
    handleScrollToQuoteForm,
    presets
  };
};
