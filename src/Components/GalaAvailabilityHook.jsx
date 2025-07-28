import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGalaAvailability = () => {
  const [galaAvailability, setGalaAvailability] = useState({
    isAvailable: true,
    totalLimit: 150,
    currentCount: 0,
    available: 150,
    isLoading: true,
    error: null
  });

  const checkGalaAvailability = async () => {
    try {
      setGalaAvailability(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await axios.get('https://gimsoc-backend.onrender.com/api/form/gala-availability', {
        timeout: 10000
      });
      
      setGalaAvailability({
        isAvailable: response.data.isAvailable,
        totalLimit: response.data.totalLimit,
        currentCount: response.data.currentCount,
        available: response.data.available,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error checking gala availability:', error);
      setGalaAvailability(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to check gala availability'
      }));
    }
  };

  useEffect(() => {
    checkGalaAvailability();
    
    // Refresh availability every 30 seconds
    const interval = setInterval(checkGalaAvailability, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    ...galaAvailability,
    refreshAvailability: checkGalaAvailability
  };
}; 