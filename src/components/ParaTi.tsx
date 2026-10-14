import './ParaTi.css';

export default function ParaTi() {
  const bloques = [
    {
      titulo: 'Materiales de Calidad Garantizada',
      descripcion: 'Arena gruesa, arena fina, confitillo y piedra chancada, seleccionados para brindar resistencia y durabilidad en cada obra.',
      imagen: '/img/costruccion.jpg',
      inverso: false
    },
    {
      titulo: 'Transporte Rápido y Seguro',
      descripcion: 'Contamos con volquetes propios para entregas puntuales directamente en tu obra, sin retrasos.',
      imagen: '/img/maquina.jpg',
      inverso: true
    },
    {
      titulo: 'Asesoría Técnica Personalizada',
      descripcion: 'Te ayudamos a elegir el material adecuado según el tipo de obra, evitando desperdicios y reduciendo costos.',
      imagen: '/img/matialdecostruccion.jpg',
      inverso: false
    }
  ];

  return (
    <section className="para-ti" id="parati"> 
      <h2 className="para-ti-titulo">Para Ti</h2>
      <p className="para-ti-subtitulo">
        Soluciones pensadas para cada etapa de tu proyecto de construcción
      </p>

      {bloques.map((bloque, index) => (
        <div 
          key={index} 
          className={`para-ti-bloque ${bloque.inverso ? 'inverso' : ''}`}
          data-reveal={bloque.inverso ? 'right' : 'left'}
        >
          <div className="para-ti-texto">
            <h3>{bloque.titulo}</h3>
            <p>{bloque.descripcion}</p>
            <a href="#contacto" className="btn-accion">Solicitar información</a>
          </div>
          <div className="para-ti-imagen">
            <img src={bloque.imagen} alt={bloque.titulo} /> 
          </div>
        </div>
      ))}
    </section>
  );
}
