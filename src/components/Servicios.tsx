import './Servicios.css';

export default function Servicios() {
  const servicios = [
    {
      imagen: '/img/agregados.jpg',
      icono: 'ri-truck-fill',
      titulo: 'Venta de Agregados',
      descripcion: 'Venta de arena, piedra, confitillo y material chancado de alta calidad.'
    },
    {
      imagen: '/img/volquete.jpg',
      icono: 'ri-road-map-fill',
      titulo: 'Transporte de Materiales',
      descripcion: 'Traslado seguro y puntual de materiales directamente a tu obra.'
    },
    {
      imagen: '/img/desmonte.jpg',
      icono: 'ri-delete-bin-6-fill',
      titulo: 'Desalojo de Desmonte',
      descripcion: 'Retiro eficiente de desmonte y residuos de obra cumpliendo normas.'
    },
    {
      imagen: '/img/logistica.jpg',
      icono: 'ri-route-fill',
      titulo: 'Logística y Distribución',
      descripcion: 'Planificación y coordinación logística para proyectos de cualquier escala.'
    },
    {
      imagen: '/img/ASESORIA.jpg',
      icono: 'ri-customer-service-fill',
      titulo: 'Asesoría Técnica',
      descripcion: 'Te asesoramos en la selección y uso adecuado de materiales.'
    },
    {
      imagen: '/img/proyectos.jpg',
      icono: 'ri-tools-fill',
      titulo: 'Proyectos Personalizados',
      descripcion: 'Desarrollamos soluciones a medida para proyectos especiales.'
    }
  ];

  return (
    <section id="servicios" className="servicios">
      <div className="servicios-header">
        <h2>Nuestros Servicios</h2>
        <p>Brindamos soluciones integrales en agregados, transporte y logística para la construcción.</p>
      </div>

      <div className="servicios-contenedor">
        {servicios.map((servicio, index) => (
          <div key={index} className="servicio-card" data-reveal="up">
            <div className="servicio-img">
              <img src={servicio.imagen} alt={servicio.titulo} />
            </div>
            <i className={servicio.icono}></i>
            <h3>{servicio.titulo}</h3>
            <p>{servicio.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
