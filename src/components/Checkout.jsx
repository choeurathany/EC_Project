import { useState } from 'react';
import { shippingOptions } from '../data/products';

export default function Checkout({
  cart,
  customerData,
  setCustomerData,
  selectedShipping,
  setSelectedShipping,
  onPlaceOrder,
  onBackToCart,
}) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const currentShipping =
    shippingOptions.find((opt) => opt.id === selectedShipping) || shippingOptions[0];
  const shippingCost = currentShipping ? currentShipping.cost : 0;
  const grandTotal = subtotal + shippingCost;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, customerData[name]);
  };

  const validateField = (fieldName, val) => {
    let error = '';
    const trimmed = (val || '').trim();

    if (!trimmed) {
      const formattedName = fieldName
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
      error = `${formattedName} is required.`;
    } else if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        error = 'Please enter a valid email address.';
      }
    } else if (fieldName === 'phone') {
      const phoneRegex = /^[0-9+\-\s()]{8,18}$/;
      if (!phoneRegex.test(trimmed)) {
        error = 'Please enter a valid phone number (e.g. 012 345 678).';
      }
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
    return error;
  };

  const validateAll = () => {
    const newErrors = {};
    const fields = ['firstName', 'lastName', 'email', 'phone', 'address'];

    fields.forEach((field) => {
      const err = validateField(field, customerData[field]);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      address: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAll()) {
      onPlaceOrder({
        subtotal,
        shipping: currentShipping,
        shippingCost,
        grandTotal,
      });
    }
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <span className="pill-tag">Step 3 of 3</span>
          <h1 className="page-title">Checkout</h1>
          <p className="page-subtitle">Provide your contact details and select shipping.</p>
        </div>
        <button className="btn btn-secondary" onClick={onBackToCart}>
          ← Back to Cart
        </button>
      </div>

      <div className="checkout-grid">
        {/* Left Column: Form */}
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} noValidate>
            {/* Section 1: Customer Info */}
            <div className="card-section">
              <div className="section-title-wrap">
                <span className="section-step-badge">1</span>
                <div>
                  <h2 className="section-heading">Customer Information</h2>
                  <p className="section-subtext">All fields marked with an asterisk are required.</p>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label htmlFor="firstName">
                    First Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`text-input ${touched.firstName && errors.firstName ? 'error-border' : ''}`}
                    placeholder="e.g. John"
                    value={customerData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.firstName && errors.firstName && (
                    <span className="input-error-msg">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="lastName">
                    Last Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`text-input ${touched.lastName && errors.lastName ? 'error-border' : ''}`}
                    placeholder="e.g. Doe"
                    value={customerData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.lastName && errors.lastName && (
                    <span className="input-error-msg">{errors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label htmlFor="email">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`text-input ${touched.email && errors.email ? 'error-border' : ''}`}
                    placeholder="john.doe@example.com"
                    value={customerData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && (
                    <span className="input-error-msg">{errors.email}</span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="phone">
                    Phone Number <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`text-input ${touched.phone && errors.phone ? 'error-border' : ''}`}
                    placeholder="e.g. +1 555-019-2834"
                    value={customerData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.phone && errors.phone && (
                    <span className="input-error-msg">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="address">
                  Delivery Address <span className="req">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  className={`text-input ${touched.address && errors.address ? 'error-border' : ''}`}
                  placeholder="Street address, apartment or suite, city, postal code"
                  value={customerData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.address && errors.address && (
                  <span className="input-error-msg">{errors.address}</span>
                )}
              </div>
            </div>

            {/* Section 2: Shipping Method */}
            <div className="card-section">
              <div className="section-title-wrap">
                <span className="section-step-badge">2</span>
                <div>
                  <h2 className="section-heading">Shipping Method</h2>
                  <p className="section-subtext">Select your preferred delivery speed.</p>
                </div>
              </div>

              <div className="shipping-list">
                {shippingOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`shipping-card ${selectedShipping === opt.id ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={opt.id}
                      checked={selectedShipping === opt.id}
                      onChange={(e) => setSelectedShipping(e.target.value)}
                    />
                    <span className="shipping-icon">{opt.icon}</span>
                    <div className="shipping-details">
                      <div className="shipping-title">{opt.name}</div>
                      <div className="shipping-time">{opt.time}</div>
                    </div>
                    <div className="shipping-price">
                      {opt.cost === 0 ? 'FREE' : `$${opt.cost.toFixed(2)}`}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg btn-place-order">
              Place Order (${grandTotal.toFixed(2)}) →
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="checkout-summary-column">
          <div className="order-summary-card">
            <h2 className="summary-title">Display Order Summary</h2>

            <div className="mini-item-list">
              {cart.map((item) => (
                <div key={item.id} className="mini-item">
                  <span className="mini-thumb">{item.image}</span>
                  <div className="mini-info">
                    <div className="mini-name">{item.name}</div>
                    <div className="mini-qty">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="mini-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-list">
              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-data">${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Shipping ({currentShipping.name})</span>
                <span className="summary-data">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="summary-hr" />
              <div className="summary-row summary-grand">
                <span>Grand Total</span>
                <span className="grand-price">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="summary-badge-footer">
              🔒 256-Bit Encrypted & Compliant Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
