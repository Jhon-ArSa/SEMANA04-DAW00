import { useState, useMemo, useCallback, useRef } from 'react';
import './Activity4Optimization.css';

export default function Activity4Optimization() {
  const [filter, setFilter] = useState('');
  const [products] = useState([
    'Laptop', 'Mouse', 'Teclado', 'Monitor', 'Webcam', 
    'Auriculares', 'Tablet', 'Smartphone'
  ]);
  
  const renderCount = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  renderCount.current += 1;

  // useMemo: Filtrado de productos
  const filteredProducts = useMemo(() => {
    console.log('Filtrando productos...');
    return products.filter(product => 
      product.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, products]);

  // useCallback: Handler estable
  const handleClear = useCallback(() => {
    setFilter('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="activity-container">
      <div className="activity-header">
        <h2>4️⃣ Optimización en vivo</h2>
        <span className="badge-narrative">Narrativa</span>
      </div>
      <div className="step-badge">✓ Paso 4 Activo</div>
      
      <div className="activity-content">
        <h3>⚡ useMemo, useCallback, useRef</h3>
        <p className="description">
          Optimizar componente con useMemo (cálculo costoso), useCallback (evitar re-renders) y useRef (acceso al DOM).
        </p>

        <div className="optimization-demo">
          <div className="filter-section">
            <label htmlFor="filter">🔍 useMemo - Filtrado de productos</label>
            <input
              id="filter"
              ref={inputRef}
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar productos..."
              className="filter-input"
            />
            <div className="info-box">
              📊 Mostrando {filteredProducts.length} productos | Entrada: "{filter}"
            </div>
          </div>

          <div className="products-list">
            {filteredProducts.map((product, index) => (
              <div key={index} className="product-item">
                {product}
              </div>
            ))}
          </div>

          <div className="callback-section">
            <h4>🎯 useCallback - Handler estable</h4>
            <button className="btn btn-primary" onClick={handleClear}>
              Clic escrito (no re-crea)
            </button>
            <div className="info-box">
              📝 Función memoizada 1 veces (detiene cíclico)
            </div>
          </div>

          <div className="ref-section">
            <h4>🎯 useRef - Focus en re-render</h4>
            <button 
              className="btn btn-success"
              onClick={() => inputRef.current?.focus()}
            >
              Enfocar con useRef
            </button>
            <div className="info-box">
              🎯 Este input recibió focus.
            </div>
          </div>

          <div className="render-info">
            <p>🔄 Re-renders: <strong>{renderCount.current}</strong> | 
               useRef NO causa re-render</p>
          </div>
        </div>
      </div>
    </div>
  );
}
