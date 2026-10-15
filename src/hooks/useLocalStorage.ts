import { useState, useEffect } from 'react';

/**
 * Hook personalizado para sincronizar estado con localStorage
 * @param key - Clave del localStorage
 * @param defaultValue - Valor por defecto si no existe en localStorage
 * @returns [value, setValue] - Tupla con el valor y función para actualizarlo
 */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // Inicializar desde localStorage o usar valor por defecto
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  });

  // useEffect para sincronizar cambios con localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
