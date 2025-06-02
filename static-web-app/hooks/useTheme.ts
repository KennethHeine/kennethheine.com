import { useContext } from 'react';
import { ThemeContext } from '@/components/ui/ThemeProvider';

/**
 * Custom hook to access and control the current theme
 * @returns Theme state and functions to control it
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
