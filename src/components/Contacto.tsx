import './Contacto.css';

export default function Contacto() {
  return (
    <section className="contacto" id="contacto">
      <h2 className="contacto-titulo">Contáctanos</h2>
      <p className="contacto-descripcion">
        Estamos listos para ayudarte. Comunícate con nosotros por llamada, correo o WhatsApp.
      </p>

      <div className="contacto-contenedor">
        <div className="contacto-card">
          <div className="info-item">
            <i className="ri-map-pin-fill"></i>
            <div>
              <h3>Dirección</h3>
              <p>Av. Arica #216, Huancayo – Pilcomayo, Perú</p>
            </div>
          </div>

          <div className="info-item">
            <i className="ri-phone-fill"></i>
            <div>
              <h3>Teléfono</h3>
              <p>
                <a href="tel:+51964636092">+51 964 636 092</a>
              </p>
            </div>
          </div>

          <div className="info-item">
            <i className="ri-mail-fill"></i>
            <div>
              <h3>Correo</h3>
              <p>
                <a href="mailto:jhonyaroni650@gmail.com">
                  jhonyaroni650@gmail.com
                </a>
              </p>
            </div>
          </div>

          <a 
            href="https://wa.me/51964636092?text=Hola,%20me%20gustaría%20recibir%20más%20información%20sobre%20sus%20servicios."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-contacto"
          >
            <i className="ri-whatsapp-fill"></i>
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
