import { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import './Agregados.css';

interface Agregado {
  id: number;
  imagen: string;
  titulo: string;
  descripcion: string;
  precio: number;
  categoria: string;
}

export default function Agregados() {
  const { addToCart } = useCart();
  const [searchFilter, setSearchFilter] = useState('');

  const agregados: Agregado[] = [
    {
      id: 1,
      imagen: '/img/arenafina.png',
      titulo: 'Arena Fina',
      descripcion: 'La arena fina se utiliza para acabados en construcción, como tarrajeo, revoques y morteros.',
      precio: 45,
      categoria: 'arena'
    },
    {
      id: 2,
      imagen: '/img/arena-gruesa.jpg',
      titulo: 'Arena Gruesa',
      descripcion: 'Se usa para concreto y cimientos, aportando resistencia estructural.',
      precio: 50,
      categoria: 'arena'
    },
    {
      id: 3,
      imagen: '/img/piedra.jpg',
      titulo: 'Piedra',
      descripcion: 'Empleada en cimientos y obras estructurales por su alta resistencia.',
      precio: 60,
      categoria: 'piedra'
    },
    {
      id: 4,
      imagen: '/img/confetillado.jpg',
      titulo: 'Confetillado',
      descripcion: 'Ideal para concretos y drenajes, mejora la compactación.',
      precio: 55,
      categoria: 'confitillo'
    },
    {
      id: 5,
      imagen: '/img/silice.jpg',
      titulo: 'Arena Fina Sílice',
      descripcion: 'Tierra vegetal y de relleno para jardines y nivelaciones.',
      precio: 65,
      categoria: 'arena'
    },
    {
      id: 6,
      imagen: '/img/piedra-chancada.jpg',
      titulo: 'Piedra Chancada',
      descripcion: 'Se usa en concreto armado y bases, brinda mayor firmeza y durabilidad.',
      precio: 70,
      categoria: 'piedra'
    }
  ];

  // Paso 4: Optimización - Filtrado de agregados con useMemo
  const filteredAgregados = useMemo(() => {
    if (!searchFilter) return agregados;
    
    return agregados.filter(agregado =>
      agregado.titulo.toLowerCase().includes(searchFilter.toLowerCase()) ||
      agregado.categoria.toLowerCase().includes(searchFilter.toLowerCase()) ||
      agregado.descripcion.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [searchFilter]);

  const handleAddToCart = (agregado: Agregado) => {
    addToCart({
      id: agregado.id,
      name: agregado.titulo,
      price: agregado.precio,
      image: agregado.imagen
    });
  };

  return (
    <section id="agregados" className="agregados">
      <h2 className="agregados-titulo">Nuestros Agregados</h2>
      <p className="agregados-descripcion">
        Ofrecemos una amplia variedad de agregados para tus proyectos de construcción.
      </p>

      {/* Paso 4: Buscador de agregados con optimización */}
      <div className="search-container" data-reveal="up">
        <div className="search-box">
          <i className="ri-search-line"></i>
          <input
            type="text"
            placeholder="🔍 Buscar agregados (arena, piedra, confitillo)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="search-input"
          />
          {searchFilter && (
            <button 
              className="clear-search"
              onClick={() => setSearchFilter('')}
              aria-label="Limpiar búsqueda"
            >
              <i className="ri-close-line"></i>
            </button>
          )}
        </div>
        <div className="search-info">
          {searchFilter && (
            <p>
              📊 Mostrando <strong>{filteredAgregados.length}</strong> de {agregados.length} agregados
            </p>
          )}
        </div>
      </div>

      <div className="agregados-contenedor">
        {filteredAgregados.length > 0 ? (
          filteredAgregados.map((agregado) => (
            <div key={agregado.id} className="agregado-card" data-reveal="up">
              <img src={agregado.imagen} alt={agregado.titulo} className="agregado-imagen" />
              <div className="agregado-info">
                <h3>{agregado.titulo}</h3>
                <p>{agregado.descripcion}</p>
                <div className="agregado-footer">
                  <span className="agregado-precio">S/ {agregado.precio} / m³</span>
                  <button 
                    onClick={() => handleAddToCart(agregado)}
                    className="agregado-boton"
                  >
                    <i className="ri-shopping-cart-line"></i> Agregar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <i className="ri-search-line"></i>
            <p>No se encontraron agregados que coincidan con "{searchFilter}"</p>
            <button onClick={() => setSearchFilter('')} className="btn-reset">
              Ver todos los agregados
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
