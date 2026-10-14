import { useState } from 'react';
import './Cobertura.css';

export default function Cobertura() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { imagen: '/img/huancayo.jpg', titulo: 'Huancayo', descripcion: 'Servicio rápido y confiable en toda la ciudad.' },
    { imagen: '/img/jauja.jpg', titulo: 'Jauja', descripcion: 'Cobertura urbana y rural con entregas seguras.' },
    { imagen: '/img/huancavelica.jpg', titulo: 'Huancavelica', descripcion: 'Atención personalizada y logística eficiente.' },
    { imagen: '/img/concepcion.jpg', titulo: 'Concepción', descripcion: 'Llegamos a todas las localidades del distrito.' },
    { imagen: '/img/chupaca.jpg', titulo: 'Chupaca', descripcion: 'Entregas programadas y urgentes.' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="cobertura" className="cobertura">
      <div className="cobertura-header" data-reveal="up">
        <h2>Áreas de Cobertura</h2>
        <p>Llevamos nuestros materiales de construcción a las siguientes zonas.</p>
      </div>

      <div className="carrusel-container">
        <button className="carrusel-btn anterior" onClick={prevSlide}>
          &#10094;
        </button>

        <div className="carrusel">
          <div 
            className="carrusel-track" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="slide">
                <img src={slide.imagen} alt={slide.titulo} />
                <div className="slide-info">
                  <h3>{slide.titulo}</h3>
                  <p>{slide.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="carrusel-btn siguiente" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      <div className="carrusel-paginacion">
        {slides.map((_, index) => (
          <span 
            key={index} 
            className={currentSlide === index ? 'activo' : ''}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
