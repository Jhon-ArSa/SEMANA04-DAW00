import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contenedor">
        <div className="footer-columna">
          <a href="#" className="footer-logo">
            <i className="ri-home-5-fill"></i> <span>Agregados</span>
          </a>
          <p className="footer-descripcion">
            Ofrecemos los mejores materiales para tus proyectos de construcción. Calidad y confiabilidad garantizada.
          </p>
        </div>

        <div className="footer-columna">
          <h3 className="footer-titulo">Enlaces Rápidos</h3>
          <ul className="footer-enlaces">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#agregados">Agregados</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>

        <div className="footer-columna">
          <h3 className="footer-titulo">Contacto</h3>
          <ul className="footer-contacto">
            <li><i className="ri-map-pin-fill"></i> Av. Arica #216, Huancayo Pilcomayo, Perú</li>
            <li><i className="ri-phone-fill"></i> <a href="tel:+51964636092">+51 964 636 092</a></li>
            <li><i className="ri-mail-fill"></i> <a href="mailto:jhonyaroni650@gmail.com">jhonyaroni650@gmail.com</a></li>
          </ul>
        </div>

        <div className="footer-columna">
          <h3 className="footer-titulo">Síguenos</h3>
          <div className="footer-redes">
            <a href="#" className="red-social"><i className="ri-facebook-fill"></i></a>
            <a href="#" className="red-social"><i className="ri-instagram-fill"></i></a>
            <a href="#" className="red-social"><i className="ri-twitter-fill"></i></a>
            <a href="#" className="red-social"><i className="ri-linkedin-fill"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-derechos">
        <p>&copy; {new Date().getFullYear()} Agregados Salazar. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
