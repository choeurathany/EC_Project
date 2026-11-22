import { useState } from 'react';

export default function ProductList({ products, cart, onAddToCart, onGoToCart }) {
  const [toast, setToast] = useState(null);

  const handleAdd = (product) => {
    onAddToCart(product);
    setToast(`${product.name} added to cart`);
    setTimeout(() => setToast(null), 1800);
  };

  const getCartQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="page-shell">
      {/* Header Banner */}
      <div className="hero-banner">
        <div>
          <span className="pill-tag">Featured Hardware</span>
          <h1 className="hero-heading">Premium Computer Equipment</h1>
          <p className="hero-description">
            Choose from our top-rated lineup. Click below to add items directly to your shopping cart.
          </p>
        </div>
        {totalCartCount > 0 && (
          <button className="btn btn-primary btn-cart-jump" onClick={onGoToCart}>
            <span>View Cart ({totalCartCount})</span>
            <span className="arrow-icon">→</span>
          </button>
        )}
      </div>

      {toast && (
        <div className="toast">
          <span className="toast-icon">✓</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Product Cards Grid */}
      <div className="products-grid">
        {products.map((product) => {
          const inCart = getCartQuantity(product.id);
          return (
            <div key={product.id} className="product-card">
              <div className="card-media">
                <span className="card-emoji">{product.image}</span>
                <span className="card-badge">{product.category}</span>
                {inCart > 0 && <span className="card-incart-badge">{inCart} in cart</span>}
              </div>

              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{product.name}</h3>
                  <div className="price-container">
                    <span className="price-currency">$</span>
                    <span className="price-figure">{product.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="specs-pill">{product.specs}</div>
                <p className="card-description">{product.description}</p>

                <div className="card-action">
                  <button
                    className={`btn btn-block ${inCart > 0 ? 'btn-accent' : 'btn-primary'}`}
                    onClick={() => handleAdd(product)}
                  >
                    <span>{inCart > 0 ? `+ Add More (${inCart})` : '+ Add to Cart'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
