import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider - Proveedor de contexto para tema claro/oscuro
 * Sincroniza el tema con localStorage usando useEffect
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Inicializar tema desde localStorage o usar 'light' por defecto
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return (saved as Theme) || 'light';
    } catch {
      return 'light';
    }
  });

  // useEffect para sincronizar tema con DOM y localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Cleanup no necesario aquí, pero se podría agregar para remover el atributo
    return () => {
      // Opcional: cleanup si se desmonta el provider
    };
  }, [theme]); // Dependencia: solo cuando theme cambia

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook personalizado para consumir el ThemeContext
 * Lanza error si se usa fuera del Provider (validación)
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
}
