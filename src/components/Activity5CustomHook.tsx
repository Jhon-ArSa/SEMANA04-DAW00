import { useState } from 'react';
import './Activity5CustomHook.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface CheckoutForm {
  fullName: string;
  email: string;
  address: string;
}

function useShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return { cart, addToCart, removeFromCart, clearCart, total };
}

export default function Activity5CustomHook() {
  const { cart, addToCart, removeFromCart, clearCart, total } = useShoppingCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({
    fullName: '',
    email: '',
    address: ''
  });

  const products: CartItem[] = [
    { id: 1, name: 'Laptop Gaming', price: 1200 },
    { id: 2, name: 'Mouse RGB', price: 50 },
    { id: 3, name: 'Teclado Mecánico', price: 150 },
    { id: 4, name: 'Monitor 4K', price: 400 }
  ];

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`¡Compra procesada!\nTotal: $${total}\nGracias ${form.fullName}!`);
    clearCart();
    setShowCheckout(false);
    setForm({ fullName: '', email: '', address: '' });
  };

  return (
    <div className="activity-container">
      <div className="activity-header">
        <h2>5️⃣ Hook Personalizado</h2>
        <span className="badge-narrative">Narrativa</span>
      </div>
      <div className="step-badge">✓ Paso 5 Activo</div>
      
      <div className="activity-content">
        <h3>🛒 TechStore - Tienda de Equipos Informáticos</h3>
        <p className="description">
          Hook personalizado <code>useShoppingCart</code> para carrito de compras.
        </p>

        {!showCheckout ? (
          <div className="store-layout">
            <div className="catalog-section">
              <h4>📦 Catálogo de Productos</h4>
              <div className="products-grid">
                {products.map(product => (
                  <div key={product.id} className="product-card">
                    <h5>{product.name}</h5>
                    <p className="price">${product.price}</p>
                    <button 
                      className="btn btn-primary btn-small"
                      onClick={() => addToCart(product)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-section">
              <h4>🛒 Carrito ({cart.length})</h4>
              {cart.length === 0 ? (
                <p className="empty-cart">El carrito está vacío</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="cart-item">
                        <span>{item.name}</span>
                        <span className="item-price">${item.price}</span>
                        <button 
                          className="btn-remove"
                          onClick={() => removeFromCart(item.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">
                    <strong>Total: ${total}</strong>
                  </div>
                  <div className="cart-actions">
                    <button className="btn btn-success" onClick={handleCheckout}>
                      💳 Procesar Pago
                    </button>
                    <button className="btn btn-error" onClick={clearCart}>
                      🗑️ Vaciar Carrito
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="checkout-modal">
            <div className="modal-content">
              <h3>💳 Finalizar Compra</h3>
              <form onSubmit={handleProcessPayment}>
                <div className="form-group">
                  <label>Nombre completo</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({...form, fullName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Dirección</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({...form, address: e.target.value})}
                    required
                    rows={3}
                  />
                </div>
                <div className="checkout-total">
                  Total a pagar: <strong>${total}</strong>
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn btn-success btn-block">
                    ✅ Procesar Pago
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-block"
                    onClick={() => setShowCheckout(false)}
                  >
                    Volver
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
