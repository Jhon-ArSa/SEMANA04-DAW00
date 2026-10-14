import { useState } from 'react';
import './Activity1Counter.css';

export default function Activity1Counter() {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => setCounter(counter + 1);
  const handleDecrement = () => setCounter(counter - 1);
  const handleReset = () => setCounter(0);

  return (
    <div className="activity-container">
      <div className="activity-header">
        <h2>1️⃣ Ciclo de Render y Re-renders</h2>
        <span className="badge-narrative">Narrativa</span>
      </div>
      <div className="step-badge">✓ Paso 1 Activo</div>
      
      <div className="activity-content">
        <h3>📊 Contador con useState</h3>
        <p className="description">
          Demostrar qué dispara un render en páginas. Configurar StrictMode y render props.
        </p>
        
        <div className="counter-display">
          <h1 className="counter-value">{counter}</h1>
        </div>
        
        <div className="button-group">
          <button className="btn btn-primary" onClick={handleIncrement}>
            Suma
          </button>
          <button className="btn btn-success" onClick={handleDecrement}>
            Resta
          </button>
          <button className="btn btn-warning" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="info-box">
          <p>⚠️ Se renderá 1 | Última acción: reset</p>
        </div>

        <div className="task-list">
          <h4>📝 Tareas:</h4>
          <ul>
            <li>✅ Cada vez que cambie el contador, React hace un re-render</li>
            <li>✅ Incrementa desde botón arriba en desarrollo</li>
            <li>✅ El Render actúa cuando cada acción</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
