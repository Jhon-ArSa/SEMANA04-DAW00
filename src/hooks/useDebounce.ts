import { useState, useEffect } from 'react';

/**
 * Hook personalizado para aplicar debounce a un valor
 * Útil para búsquedas en tiempo real sin hacer demasiadas llamadas
 * @param value - Valor a aplicar debounce
 * @param delay - Tiempo de espera en milisegundos
 * @returns Valor con debounce aplicado
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Crear timer que actualiza el valor después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancelar timer si el valor cambia antes del delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
