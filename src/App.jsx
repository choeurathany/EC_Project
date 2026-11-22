import { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import { initialProducts, shippingOptions } from './data/products';
import './App.css';

function App() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Laptop',
      price: 650,
      category: 'Computers',
      image: '💻',
      specs: '15.6" FHD • 16GB RAM • 512GB SSD',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Mouse',
      price: 15,
      category: 'Accessories',
      image: '🖱️',
      specs: 'Wireless 2.4GHz • Ergonomic • 1600 DPI',
      quantity: 1,
    },
  ]);

  const [customerData, setCustomerData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 555-019-2834',
    address: '452 Innovation Parkway, Suite 300, San Jose, CA 95110',
  });

  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [order, setOrder] = useState(null);
  const [orderCounter, setOrderCounter] = useState(1);
  const [activeTab, setActiveTab] = useState('products');

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear all items in your cart?')) {
      setCart([]);
    }
  };

  // Order submission
  const handlePlaceOrder = ({ subtotal, shipping, shippingCost, grandTotal }) => {
    const formattedId = `ORD-${String(orderCounter).padStart(4, '0')}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder = {
      orderId: formattedId,
      customer: { ...customerData },
      date: formattedDate,
      items: [...cart],
      shipping,
      subtotal,
      shippingCost,
      grandTotal,
      status: 'Pending',
    };

    setOrder(newOrder);
    setOrderCounter((prev) => prev + 1);
    setCart([]);
    setActiveTab('confirmation');
  };

  const handleNewOrder = () => {
    setActiveTab('products');
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-layout">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalCount}
        hasOrder={order !== null}
      />

      <main className="content-container">
        {activeTab === 'products' && (
          <ProductList
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
            onGoToCart={() => setActiveTab('cart')}
          />
        )}

        {activeTab === 'cart' && (
          <ShoppingCart
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onProceedToCheckout={() => setActiveTab('checkout')}
            onContinueShopping={() => setActiveTab('products')}
          />
        )}

        {activeTab === 'checkout' && (
          <Checkout
            cart={cart}
            customerData={customerData}
            setCustomerData={setCustomerData}
            selectedShipping={selectedShipping}
            setSelectedShipping={setSelectedShipping}
            onPlaceOrder={handlePlaceOrder}
            onBackToCart={() => setActiveTab('cart')}
          />
        )}

        {activeTab === 'confirmation' && (
          <OrderConfirmation order={order} onNewOrder={handleNewOrder} />
        )}
      </main>

      <footer className="footer-bar">
        <div className="footer-content">
          <span>NEXUS TECH • Computer Hardware & Peripherals</span>
          <span className="footer-links">
            Practical Exercise 1 • Exercise 2 (Checkout) • Slide 28 Exercise 3 (Confirmation)
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
