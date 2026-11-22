export default function ShoppingCart({
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping,
}) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="page-shell">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h2>Your Cart is Currently Empty</h2>
          <p>You haven't selected any hardware products yet. Explore our catalog to get started.</p>
          <button className="btn btn-primary btn-lg" onClick={onContinueShopping}>
            ← Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <span className="pill-tag">Step 2 of 3</span>
          <h1 className="page-title">Shopping Cart</h1>
          <p className="page-subtitle">Review your selected items and adjust quantities.</p>
        </div>
        <button className="btn-text-danger" onClick={onClearCart}>
          Clear Entire Cart
        </button>
      </div>

      <div className="cart-grid">
        {/* Cart Items List */}
        <div className="cart-items-container">
          <div className="cart-table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th className="th-center">Quantity</th>
                  <th className="th-right">Total</th>
                  <th className="th-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const itemTotal = item.price * item.quantity;
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="item-row">
                          <span className="item-thumb">{item.image}</span>
                          <div>
                            <div className="item-name">{item.name}</div>
                            <div className="item-category">{item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="item-price">${item.price.toFixed(2)}</td>
                      <td>
                        <div className="stepper">
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            title="Decrease quantity"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            className="stepper-input"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!isNaN(val) && val > 0) {
                                onUpdateQty(item.id, val);
                              }
                            }}
                          />
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="item-total-cell">${itemTotal.toFixed(2)}</td>
                      <td className="td-center">
                        <button
                          className="btn-icon-delete"
                          onClick={() => onRemoveItem(item.id)}
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="cart-bottom-actions">
            <button className="btn btn-secondary" onClick={onContinueShopping}>
              ← Continue Shopping
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="order-summary-card">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-list">
            <div className="summary-row">
              <span className="summary-label">Selected Products</span>
              <span className="summary-data">{totalItemsCount} units</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-data">${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Estimated Shipping</span>
              <span className="summary-data text-muted">Calculated at Checkout</span>
            </div>

            <div className="summary-hr" />

            <div className="summary-row summary-grand">
              <span>Grand Total</span>
              <span className="grand-price">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="btn btn-primary btn-block btn-lg btn-checkout"
            onClick={onProceedToCheckout}
          >
            Proceed to Checkout →
          </button>

          <div className="summary-perks">
            <div className="perk-item">✓ Secure SSL Encrypted Checkout</div>
            <div className="perk-item">✓ 30-Day Replacement Guarantee</div>
          </div>
        </div>
      </div>
    </div>
  );
}
