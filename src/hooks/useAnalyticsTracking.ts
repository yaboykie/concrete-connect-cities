
import { useCallback, useEffect } from 'react';

interface TrackingOptions {
  formName?: string;
  additionalData?: Record<string, any>;
}

export const useAnalyticsTracking = () => {
  const trackInteraction = useCallback((
    eventName: string,
    formName: string = 'simple_quote_form',
    additionalData: Record<string, any> = {}
  ): void => {
    useEffect(() => {
      if (typeof window !== 'undefined' && window.gtag) {
        // Use direct gtag for standard events
        window.gtag('event', eventName, {
          form_name: formName,
          ...additionalData
        });
        
        // For form-specific tracking events, use the enhanced tracking
        if (typeof window.trackFormInteraction === 'function') {
          window.trackFormInteraction(eventName, formName, additionalData);
        }
      }
    }, [eventName, formName, JSON.stringify(additionalData)]);
  }, []);

  return { trackInteraction };
};
