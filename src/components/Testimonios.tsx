import './Testimonios.css';

export default function Testimonios() {
  const testimonios = [
    {
      estrellas: 5,
      texto: 'La calidad de los agregados es excelente. Mis obras han quedado perfectas gracias a los materiales que me proporcionaron.',
      autor: 'Carlos Quispe',
      cargo: 'Constructor independiente, Huancayo'
    },
    {
      estrellas: 5,
      texto: 'Llevo 3 proyectos trabajando con Agregados y la experiencia ha sido inmejorable. El equipo es muy profesional.',
      autor: 'María Torres',
      cargo: 'Arquitecta, Huancayo'
    },
    {
      estrellas: 5,
      texto: 'El servicio de transporte es muy eficiente. Siempre llegan a tiempo y los materiales vienen bien medidos.',
      autor: 'Roberto Huanca',
      cargo: 'Maestro de obra, Jauja'
    },
    {
      estrellas: 4.5,
      texto: 'Construí mi casa con sus materiales y quedé muy contenta. Me asesoraron perfectamente sobre qué necesitaba.',
      autor: 'Ana Mendoza',
      cargo: 'Propietaria, Concepción'
    }
  ];

  const renderStars = (stars: number) => {
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 !== 0;
    
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <i key={i} className="ri-star-fill"></i>
        ))}
        {hasHalfStar && <i className="ri-star-half-fill"></i>}
      </>
    );
  };

  return (
    <section className="testimonios" id="testimonios">
      <div className="testimonios-header">
        <h2>Lo que dicen nuestros clientes</h2>
        <p>La confianza de quienes construyen es nuestra mayor recompensa.</p>
      </div>
      
      <div className="testimonios-contenedor">
        {testimonios.map((testimonio, index) => (
          <div key={index} className="testimonio-card" data-reveal="up">
            <div className="testimonio-estrellas">
              {renderStars(testimonio.estrellas)}
            </div>
            <p className="testimonio-texto">"{testimonio.texto}"</p>
            <div className="testimonio-autor">
              <div className="testimonio-avatar"><i className="ri-user-fill"></i></div>
              <div>
                <strong>{testimonio.autor}</strong>
                <span>{testimonio.cargo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
