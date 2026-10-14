import { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <a href="#inicio" className="logo">  
        <i className="ri-home-5-fill"></i> <span> Agregados</span> 
      </a>

      <ul className={`navbar ${menuOpen ? 'open' : ''}`} role="navigation" aria-label="Menú principal">
        <li><a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')}>Inicio</a></li>
        <li><a href="#agregados" onClick={(e) => handleNavClick(e, 'agregados')}>Agregados</a></li>
        <li><a href="#react1" onClick={(e) => handleNavClick(e, 'react1')}>React Hooks</a></li>
        <li><a href="#servicios" onClick={(e) => handleNavClick(e, 'servicios')}>Servicios</a></li>
        <li><a href="#nosotros" onClick={(e) => handleNavClick(e, 'nosotros')}>Nosotros</a></li>
        <li><a href="#testimonios" onClick={(e) => handleNavClick(e, 'testimonios')}>Testimonios</a></li>
        <li><a href="#contacto" onClick={(e) => handleNavClick(e, 'contacto')}>Contacto</a></li>
      </ul>

      <div className="main">
        <a href="#contacto" className="user" onClick={(e) => handleNavClick(e, 'contacto')}> 
          <i className="ri-arrow-right-down-box-fill"></i> Cotizar 
        </a>
        <div 
          className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`} 
          id="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        ></div>
      </div>
    </header>
  );
}
