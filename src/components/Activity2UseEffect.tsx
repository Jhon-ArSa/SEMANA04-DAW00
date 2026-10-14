import { useState, useEffect } from 'react';
import './Activity2UseEffect.css';

interface Status {
  idle: boolean;
  loading: boolean;
  success: boolean;
  error: boolean;
}

export default function Activity2UseEffect() {
  const [status, setStatus] = useState<Status>({
    idle: true,
    loading: false,
    success: false,
    error: false
  });

  const handleCargar = () => {
    setStatus({ idle: false, loading: true, success: false, error: false });
    
    setTimeout(() => {
      setStatus({ idle: false, loading: false, success: true, error: false });
    }, 2000);
  };

  const handleExito = () => {
    setStatus({ idle: false, loading: false, success: true, error: false });
  };

  const handleError = () => {
    setStatus({ idle: false, loading: false, success: false, error: true });
  };

  const handleCleanup = () => {
    setStatus({ idle: true, loading: false, success: false, error: false });
  };

  useEffect(() => {
    // Cleanup effect
    return () => {
      console.log('Cleanup ejecutado');
    };
  }, [status]);

  return (
    <div className="activity-container">
      <div className="activity-header">
        <h2>2️⃣ useEffect con async/await y Cleanup</h2>
        <span className="badge-narrative">Narrativa</span>
      </div>
      <div className="step-badge">✓ Paso 2 Activo</div>
      
      <div className="activity-content">
        <h3>📡 Carga de datos con useEffect</h3>
        <p className="description">
          Refactorizar fetch de API: migrar <code>then()</code> a async/await dentro de useEffect, añadir array de dependencias y AbortController.
        </p>

        <div className="button-group">
          <button className="btn btn-primary" onClick={handleCargar}>
            🔄 Cargar
          </button>
          <button className="btn btn-success" onClick={handleExito}>
            ✅ Éxito
          </button>
          <button className="btn btn-error" onClick={handleError}>
            ❌ Error
          </button>
          <button className="btn btn-warning" onClick={handleCleanup}>
            🧹 Cleanup
          </button>
        </div>

        <div className="status-display">
          {status.idle && (
            <div className="status-message idle">
              <p>⏸️ Estado inicial - Listo para cargar datos</p>
            </div>
          )}
          
          {status.loading && (
            <div className="status-message loading">
              <div className="spinner">⏳</div>
              <p>Esperando petición...</p>
            </div>
          )}
          
          {status.success && (
            <div className="status-message success">
              <p>✅ Datos cargados exitosamente</p>
            </div>
          )}
          
          {status.error && (
            <div className="status-message error">
              <p>❌ Error al cargar los datos</p>
            </div>
          )}
        </div>

        <div className="info-panel">
          <p><strong>Estado:</strong> {status.idle ? 'Idle' : ''} 
             {status.loading ? 'Loading' : ''} 
             {status.success ? 'Success' : ''} 
             {status.error ? 'Error' : ''} | 
             <strong>Dependencias:</strong> []
          </p>
        </div>
      </div>
    </div>
  );
}
