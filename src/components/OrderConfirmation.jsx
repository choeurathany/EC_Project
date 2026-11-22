export default function OrderConfirmation({ order, onNewOrder }) {
  if (!order) {
    return (
      <div className="page-shell">
        <div className="empty-state">
          <h2>No Recent Order Found</h2>
          <p>Please browse our products and place an order first.</p>
          <button className="btn btn-primary btn-lg" onClick={onNewOrder}>
            Shop Products
          </button>
        </div>
      </div>
    );
  }

  const {
    orderId,
    customer,
    date,
    items,
    shipping,
    subtotal,
    shippingCost,
    grandTotal,
    status,
  } = order;

  return (
    <div className="page-shell">
      <div className="confirmation-wrapper">
        {/* Success Header Banner */}
        <div className="confirmation-hero">
          <div className="success-badge-circle">✓</div>
          <h1 className="hero-status-title">Order Placed Successfully!</h1>
          <p className="hero-status-desc">
            Your order has been recorded and is currently being prepared.
          </p>
        </div>

        {/* Metadata Key Details */}
        <div className="meta-info-strip">
          <div className="meta-tile">
            <span className="meta-tile-label">Order ID</span>
            <span className="meta-tile-id">{orderId}</span>
          </div>

          <div className="meta-tile">
            <span className="meta-tile-label">Customer Name</span>
            <span className="meta-tile-val">
              {customer.firstName} {customer.lastName}
            </span>
          </div>

          <div className="meta-tile">
            <span className="meta-tile-label">Order Date</span>
            <span className="meta-tile-val">{date}</span>
          </div>

          <div className="meta-tile">
            <span className="meta-tile-label">Order Status</span>
            <span className="badge-status-pending">
              <span className="pulse-dot" /> {status}
            </span>
          </div>
        </div>

        {/* Customer & Shipping Summary Grid */}
        <div className="details-columns">
          <div className="detail-panel">
            <h3 className="detail-panel-title">Customer Details</h3>
            <div className="detail-line">
              <span className="line-label">Name:</span>
              <span className="line-data">
                {customer.firstName} {customer.lastName}
              </span>
            </div>
            <div className="detail-line">
              <span className="line-label">Email:</span>
              <span className="line-data">{customer.email}</span>
            </div>
            <div className="detail-line">
              <span className="line-label">Phone:</span>
              <span className="line-data">{customer.phone}</span>
            </div>
            <div className="detail-line">
              <span className="line-label">Address:</span>
              <span className="line-data">{customer.address}</span>
            </div>
          </div>

          <div className="detail-panel">
            <h3 className="detail-panel-title">Delivery & Payment</h3>
            <div className="detail-line">
              <span className="line-label">Method:</span>
              <span className="line-data">{shipping.name}</span>
            </div>
            <div className="detail-line">
              <span className="line-label">Delivery Time:</span>
              <span className="line-data">{shipping.time}</span>
            </div>
            <div className="detail-line">
              <span className="line-label">Payment Type:</span>
              <span className="line-data">Cash on Delivery (COD)</span>
            </div>
            <div className="detail-line">
              <span className="line-label">Shipping Cost:</span>
              <span className="line-data">
                {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
          </div>
        </div>

        {/* Ordered Products Table */}
        <div className="ordered-products-block">
          <h2 className="ordered-block-title">Ordered Products</h2>
          <div className="cart-table-wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="th-right">Unit Price</th>
                  <th className="th-center">Quantity</th>
                  <th className="th-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
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
                    <td className="td-right">${item.price.toFixed(2)}</td>
                    <td className="td-center">{item.quantity}</td>
                    <td className="td-right item-total-cell">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="tfoot-desc">Subtotal:</td>
                  <td className="td-right">${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="tfoot-desc">Shipping Fee:</td>
                  <td className="td-right">
                    {shippingCost === 0 ? '$0.00 (FREE)' : `$${shippingCost.toFixed(2)}`}
                  </td>
                </tr>
                <tr className="tfoot-grand-row">
                  <td colSpan="3" className="tfoot-desc grand-title">Total Amount:</td>
                  <td className="td-right grand-figure">${grandTotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="confirmation-actions-bar">
          <button className="btn btn-secondary" onClick={() => window.print()}>
            Print Receipt
          </button>
          <button className="btn btn-primary" onClick={onNewOrder}>
            + Place Another Order
          </button>
        </div>
      </div>
    </div>
  );
}
