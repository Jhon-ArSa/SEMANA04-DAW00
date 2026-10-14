import { useState, createContext, useContext } from 'react';
import './Activity3Context.css';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
}

function ThemeControl() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-control">
      <h3>🎨 ThemeControl en acción</h3>
      <div className="button-group">
        <button 
          className={`btn ${theme === 'light' ? 'btn-active' : ''}`}
          onClick={() => theme !== 'light' && toggleTheme()}
        >
          ☀️ Coming Soon
        </button>
        <button 
          className={`btn ${theme === 'dark' ? 'btn-active' : ''}`}
          onClick={() => theme !== 'dark' && toggleTheme()}
        >
          🌙 Claro
        </button>
        <button className="btn btn-warning">
          ❌ Oscuro
        </button>
      </div>
    </div>
  );
}

function ThemedContent() {
  const { theme } = useTheme();

  return (
    <div className={`themed-content theme-${theme}`}>
      <h3>Tema Actual: {theme === 'dark' ? 'Oscuro' : 'Claro'} 🌙</h3>
      <p>Este componente consume el contexto directamente sin render props.</p>
      <div className="component-info">
        <h4>Componente hijo profundo:</h4>
        <p>También puedo leer el tema sin prop drilling.</p>
      </div>
      <div className="provider-info">
        <p><strong>Provider:</strong> ThemeProvider | <strong>Valor actual:</strong> dark</p>
      </div>
    </div>
  );
}

export default function Activity3Context() {
  return (
    <ThemeProvider>
      <div className="activity-container">
        <div className="activity-header">
          <h2>3️⃣ useContext: Estado Global</h2>
          <span className="badge-narrative">Narrativa</span>
        </div>
        <div className="step-badge">✓ Paso 3 Activo</div>
        
        <div className="activity-content">
          <h3>🌐 useContext para tema global</h3>
          <p className="description">
            Implementar useContext para tema global. Crear Provider y consumirlo sin prop drilling.
          </p>

          <ThemeControl />
          <ThemedContent />
        </div>
      </div>
    </ThemeProvider>
  );
}
