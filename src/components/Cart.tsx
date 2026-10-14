import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total, itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    notas: ''
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Crear mensaje de WhatsApp
    const items = cart.map(item => 
      `• ${item.name} x${item.quantity} - S/ ${(item.price * (item.quantity || 1)).toFixed(2)}`
    ).join('%0A');
    
    const message = `🛒 *NUEVO PEDIDO DE AGREGADOS*%0A%0A` +
      `📦 *Productos:*%0A${items}%0A%0A` +
      `💰 *Total: S/ ${total.toFixed(2)}*%0A%0A` +
      `👤 *Cliente:* ${formData.nombre}%0A` +
      `📱 *Teléfono:* ${formData.telefono}%0A` +
      `📍 *Dirección:* ${formData.direccion}%0A` +
      `📝 *Notas:* ${formData.notas || 'Ninguna'}`;

    window.open(`https://wa.me/51964636092?text=${message}`, '_blank');
    
    // Limpiar carrito y formulario
    clearCart();
    setShowCheckout(false);
    setIsOpen(false);
    setFormData({ nombre: '', telefono: '', direccion: '', notas: '' });
  };

  return (
    <>
      {/* Botón flotante del carrito */}
      <button 
        className="cart-float-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir carrito"
      >
        <i className="ri-shopping-cart-line"></i>
        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
      </button>

      {/* Panel lateral del carrito */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>
            <i className="ri-shopping-cart-line"></i> Carrito de Compras
          </h3>
          <button 
            className="cart-close" 
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar carrito"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <i className="ri-shopping-cart-line"></i>
              <p>Tu carrito está vacío</p>
              <small>Agrega agregados para continuar</small>
            </div>
          ) : showCheckout ? (
            <form className="checkout-form" onSubmit={handleCheckout}>
              <h4>Finalizar Pedido</h4>
              
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo *</label>
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  required
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono *</label>
                <input
                  type="tel"
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  required
                  placeholder="Ej: 964 636 092"
                />
              </div>

              <div className="form-group">
                <label htmlFor="direccion">Dirección de entrega *</label>
                <textarea
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                  required
                  rows={3}
                  placeholder="Dirección completa de la obra"
                />
              </div>

              <div className="form-group">
                <label htmlFor="notas">Notas adicionales</label>
                <textarea
                  id="notas"
                  value={formData.notas}
                  onChange={(e) => setFormData({...formData, notas: e.target.value})}
                  rows={2}
                  placeholder="Información adicional (opcional)"
                />
              </div>

              <div className="checkout-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <strong>S/ {total.toFixed(2)}</strong>
                </div>
                <div className="summary-row">
                  <span>Transporte:</span>
                  <strong>A coordinar</strong>
                </div>
                <div className="summary-total">
                  <span>Total:</span>
                  <strong>S/ {total.toFixed(2)}</strong>
                </div>
              </div>

              <div className="checkout-actions">
                <button type="submit" className="btn btn-whatsapp">
                  <i className="ri-whatsapp-line"></i> Enviar por WhatsApp
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCheckout(false)}
                >
                  Volver al carrito
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">S/ {item.price} / m³</p>
                      <div className="cart-item-quantity">
                        <button 
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          aria-label="Disminuir cantidad"
                        >
                          <i className="ri-subtract-line"></i>
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          aria-label="Aumentar cantidad"
                        >
                          <i className="ri-add-line"></i>
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <p className="cart-item-total">
                        S/ {(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>
                      <button 
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Eliminar del carrito"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <strong>S/ {total.toFixed(2)}</strong>
                </div>
                <button 
                  className="btn btn-primary btn-block"
                  onClick={() => setShowCheckout(true)}
                >
                  Proceder al Pedido
                </button>
                <button 
                  className="btn btn-text"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="cart-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
}
