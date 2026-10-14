import { useState, useEffect } from 'react';
import './Nosotros.css';

export default function Nosotros() {
  const [stats, setStats] = useState([
    { icon: 'ri-calendar-check-fill', value: 0, target: 15, label: 'Años de experiencia' },
    { icon: 'ri-checkbox-circle-fill', value: 0, target: 1200, label: 'Proyectos ejecutados' },
    { icon: 'ri-user-heart-fill', value: 0, target: 950, label: 'Clientes satisfechos' },
    { icon: 'ri-shield-check-fill', value: 0, target: 99, label: '% de confiabilidad' }
  ]);

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateStats();
        }
      },
      { threshold: 0.5 }
    );

    const section = document.querySelector('.nosotros');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [hasAnimated]);

  const animateStats = () => {
    stats.forEach((stat, index) => {
      const increment = stat.target / 120;
      let currentValue = 0;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= stat.target) {
          currentValue = stat.target;
          clearInterval(timer);
        }

        setStats((prevStats) => {
          const newStats = [...prevStats];
          newStats[index].value = Math.ceil(currentValue);
          return newStats;
        });
      }, 16);
    });
  };

  return (
    <section className="nosotros" id="nosotros">
      <div className="nosotros-header">
        <h2>Sobre Nosotros</h2>
        <p>Comprometidos con la calidad, la puntualidad y la confianza en cada proyecto.</p>
      </div>

      <div className="nosotros-contenedor">
        <div className="nosotros-info" data-reveal="left">
          <h3>¿Quiénes Somos?</h3>
          <p>
            Somos una empresa con más de <strong>15 años de experiencia</strong> en el rubro de la construcción,
            especializada en la venta, transporte y logística de agregados.
            Trabajamos con estándares de calidad que garantizan resultados eficientes y seguros en cada obra.
          </p>

          <div className="mision-vision">
            <div>
              <h4>Misión</h4>
              <p>
                Proveer materiales de construcción de alta calidad, con un servicio eficiente y oportuno,
                contribuyendo al desarrollo de proyectos sólidos y duraderos.
              </p>
            </div>
            <div>
              <h4>Visión</h4>
              <p>
                Ser la empresa líder en la región, reconocida por la excelencia operativa,
                innovación logística y atención técnica especializada.
              </p>
            </div>
          </div>

          <a href="#contacto" className="btn-saber-mas">Contáctanos</a>
        </div>

        <div className="estadisticas" data-reveal="right">
          {stats.map((stat, index) => (
            <div key={index} className="estadistica">
              <i className={stat.icon}></i>
              <h3 className="estadistica-numero">{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
