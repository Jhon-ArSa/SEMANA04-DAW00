import './Hero.css';

export default function Hero() {
  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('agregados');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="home">
      <video autoPlay muted loop className="video-bg">
        <source src="/agregados1.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      <div className="home-overlay"></div>

      <div className="home-content">
        <img src="/img/logo02.png" alt="Logo de Agregados" className="home-logo" />
        <h1>Bienvenido a Agregados</h1>
        <p>Ofrecemos los mejores materiales para tus proyectos de construcción.</p>
        <a href="#contacto" className="btn-cotizar">Cotizar ahora</a>
      </div>

      <a href="#agregados" className="scroll-abajo" onClick={handleScrollDown}>
        <i className="ri-arrow-down-line"></i>
      </a>
    </section>
  );
}
