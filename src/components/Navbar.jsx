export default function Navbar({ activeTab, setActiveTab, cartCount, hasOrder }) {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="brand" onClick={() => setActiveTab('products')}>
          <div className="brand-logo">
            <span className="logo-sparkle">◆</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">NEXUS TECH</span>
            <span className="brand-tagline">Electronics & Hardware Store</span>
          </div>
        </div>

        {/* Step Indicator / Navigation */}
        <nav className="nav-stepper">
          <button
            className={`step-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span className="step-num">1</span>
            <span className="step-title">Products</span>
          </button>

          <span className="step-arrow">›</span>

          <button
            className={`step-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            <span className="step-num">2</span>
            <span className="step-title">Shopping Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <span className="step-arrow">›</span>

          <button
            className={`step-btn ${activeTab === 'checkout' ? 'active' : ''}`}
            onClick={() => setActiveTab('checkout')}
            disabled={cartCount === 0 && activeTab !== 'checkout'}
            title={cartCount === 0 ? 'Add items to cart first' : 'Go to checkout'}
          >
            <span className="step-num">3</span>
            <span className="step-title">Checkout</span>
          </button>

          {hasOrder && (
            <>
              <span className="step-arrow">›</span>
              <button
                className={`step-btn ${activeTab === 'confirmation' ? 'active' : ''}`}
                onClick={() => setActiveTab('confirmation')}
              >
                <span className="step-num">4</span>
                <span className="step-title">Confirmation</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
