import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import StatsCounter from './components/StatsCounter'
import Agregados from './components/Agregados'
import Dashboard from './components/Dashboard'
import Cobertura from './components/Cobertura'
import Servicios from './components/Servicios'
import Nosotros from './components/Nosotros'
import Testimonios from './components/Testimonios'
import ParaTi from './components/ParaTi'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import Cart from './components/Cart'
import ThemeToggle from './components/ThemeToggle'

function AppContent() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular preloader
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Scroll Reveal Effect
    const revealElements = document.querySelectorAll('[data-reveal]')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    revealElements.forEach((el) => {
      const siblings = el.parentElement
        ? [...el.parentElement.querySelectorAll('[data-reveal]')]
        : []
      const i = siblings.indexOf(el)
      if (i > 0) {
        (el as HTMLElement).style.transitionDelay = `${i * 0.1}s`
      }
      observer.observe(el)
    })

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [loading])

  if (loading) {
    return (
      <div className="preloader">
        <div className="preloader-inner">
          <i className="ri-home-5-fill"></i>
          <span>Agregados</span>
          <div className="preloader-barra"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <Header />
      
      <main id="main-content">
        <Hero />
        
        {/* Paso 1: Contador de seguidores */}
        <StatsCounter />
        
        {/* Paso 4: Buscador de agregados + Paso 5: Agregar al carrito */}
        <Agregados />
        
        {/* GUÍA PRÁCTICA SEMANA 7 - PARTE 2: Dashboard con Estado Complejo */}
        <section id="dashboard-section" style={{ background: 'var(--section-bg)', padding: '80px 0' }}>
          <Dashboard />
        </section>
        
        <Cobertura />
        <Servicios />
        <Nosotros />
        <Testimonios />
        <ParaTi />
        <Contacto />
      </main>

      <Footer />
      
      {/* Paso 3: Toggle de tema oscuro/claro */}
      <ThemeToggle />
      
      {/* Paso 5: Carrito de compras */}
      <Cart />
      
      {/* Botón WhatsApp flotante */}
      <a 
        href="https://wa.me/51964636092?text=Hola,%20me%20gustaría%20recibir%20más%20información%20sobre%20sus%20servicios."
        className="wa-flotante" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <i className="ri-whatsapp-fill"></i>
        <span className="wa-tooltip">¡Escríbenos!</span>
      </a>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
