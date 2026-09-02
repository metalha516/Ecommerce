import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import DigitalShebaView from './components/DigitalShebaView';
import CompareView from './components/CompareView';
import RewardsHubView from './components/RewardsHubView';
import LivePlayView from './components/LivePlayView';
import OrderTrackingView from './components/OrderTrackingView';
import RetailerDashboardView from './components/RetailerDashboardView';
import WholesalerDashboardView from './components/WholesalerDashboardView';
import ProductDetailModal from './components/ProductDetailModal';
import AIAssistant from './components/AIAssistant';
import CartDrawer from './components/CartDrawer';
import VoiceSearchModal from './components/VoiceSearchModal';
import VisualSearchModal from './components/VisualSearchModal';
import { FLASH_SALE_PRODUCTS, COMPARE_ITEMS } from './data/mockData';
import { Sparkles, Heart, Package, ShieldCheck } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [cartItems, setCartItems] = useState([
    {
      id: "prod-1",
      name: "AirBeat Pro ANC Wireless Headphones",
      price: 1250,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
      store: "HamTam · OFFICIAL STORE"
    }
  ]);
  const [wishlistIds, setWishlistIds] = useState(["prod-1", "prod-3"]);
  const [compareList, setCompareList] = useState(COMPARE_ITEMS);
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isVisualOpen, setIsVisualOpen] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Cart actions
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          store: product.store || "BSmart Store"
        }
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist action
  const handleToggleWishlist = (id) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Add to Compare action
  const handleAddToCompare = (product) => {
    if (!compareList.find((item) => item.id === product.id)) {
      setCompareList((prev) => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          variant: "Standard",
          price: product.price,
          rating: product.rating || 4.8,
          reviewsCount: product.reviewsCount || 100,
          delivery: "2 Days",
          seller: product.store || "Verified Seller",
          warranty: "12 Months",
          returnPeriod: "14 Days",
          readSpeed: "N/A",
          image: product.image
        }
      ]);
    }
    setActiveView('compare');
  };

  const handlePerformSearch = (query) => {
    setSearchQuery(query);
    const matched = FLASH_SALE_PRODUCTS.find((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    if (matched) {
      setSelectedProductModal(matched);
    } else {
      setActiveView('home');
    }
  };

  return (
    <div className="app-container">
      {/* Header Bar */}
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenVoiceSearch={() => setIsVoiceOpen(true)}
        onOpenVisualSearch={() => setIsVisualOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPerformSearch={handlePerformSearch}
      />

      {/* Main Content Router */}
      <main className="main-content">
        {activeView === 'home' && (
          <HomeView
            onSelectProduct={(prod) => setSelectedProductModal(prod)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onNavigate={(view) => {
              if (view === 'ai') setIsAIOpen(true);
              else setActiveView(view);
            }}
            onAddToCompare={handleAddToCompare}
          />
        )}

        {activeView === 'sheba' && (
          <DigitalShebaView onAddToCart={handleAddToCart} />
        )}

        {activeView === 'compare' && (
          <CompareView
            onAddToCart={handleAddToCart}
            onSelectProduct={(prod) => setSelectedProductModal(prod)}
            compareList={compareList}
            setCompareList={setCompareList}
          />
        )}

        {activeView === 'rewards' && (
          <RewardsHubView onNavigate={setActiveView} />
        )}

        {activeView === 'live' && (
          <LivePlayView
            onAddToCart={handleAddToCart}
            onSelectProduct={(prod) => setSelectedProductModal(prod)}
          />
        )}

        {activeView === 'tracking' && (
          <OrderTrackingView onNavigate={setActiveView} />
        )}

        {activeView === 'retailer' && (
          <RetailerDashboardView onSelectProduct={(prod) => setSelectedProductModal(prod)} />
        )}

        {activeView === 'wholesaler' && (
          <WholesalerDashboardView />
        )}

        {activeView === 'wishlist' && (
          <div className="wishlist-page-card">
            <h2><Heart size={24} className="text-red-500" /> My Saved Wishlist ({wishlistIds.length} items)</h2>
            <div className="flash-products-grid mt-4">
              {FLASH_SALE_PRODUCTS.filter((p) => wishlistIds.includes(p.id)).map((prod) => (
                <div key={prod.id} className="product-card">
                  <div className="product-image-frame" onClick={() => setSelectedProductModal(prod)}>
                    <img src={prod.image} alt={prod.name} className="product-img" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{prod.name}</h3>
                    <span className="current-price">৳{prod.price.toLocaleString()}</span>
                    <button 
                      className="btn btn-primary btn-sm mt-2 w-full"
                      onClick={() => handleAddToCart(prod)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeView === 'account' || activeView === 'help') && (
          <div className="placeholder-view-card">
            <h2>Account & Support Center</h2>
            <p>Welcome to Habib Rahman's BSmart Account Portal.</p>
            <div className="account-grid-shortcuts mt-4">
              <button className="shortcut-btn" onClick={() => setActiveView('tracking')}>
                <Package size={24} /> My Orders & Tracking
              </button>
              <button className="shortcut-btn" onClick={() => setActiveView('rewards')}>
                <Sparkles size={24} /> Coins Balance: 850 Coins
              </button>
              <button className="shortcut-btn" onClick={() => setActiveView('wishlist')}>
                <Heart size={24} /> Wishlist Items ({wishlistIds.length})
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Sparkle AI Assistant FAB */}
      <button 
        className="floating-ai-fab" 
        onClick={() => setIsAIOpen(true)}
        title="Habib AI Shopping Assistant"
      >
        <Sparkles size={28} />
        <span className="sparkle-badge">AI</span>
      </button>

      {/* Footer Bar */}
      <footer className="footer-bar">
        <div className="footer-container">
          <div className="footer-col">
            <span className="footer-logo">BSmart</span>
            <p>Shop Smarter. Decide Faster. Powered by BSmart AI Intelligence for Bangladesh.</p>
          </div>
          <div className="footer-col">
            <h4>Customer Care</h4>
            <a href="#help" onClick={() => setActiveView('help')}>Help Center</a>
            <a href="#track" onClick={() => setActiveView('tracking')}>Order Tracking</a>
            <a href="#returns" onClick={() => setActiveView('help')}>14-Day Free Returns</a>
          </div>
          <div className="footer-col">
            <h4>Services & Rewards</h4>
            <a href="#sheba" onClick={() => setActiveView('sheba')}>Digital Sheba</a>
            <a href="#rewards" onClick={() => setActiveView('rewards')}>Rewards Hub</a>
            <a href="#compare" onClick={() => setActiveView('compare')}>Compare Products</a>
          </div>
        </div>
      </footer>

      {/* Product Detail View Modal */}
      {selectedProductModal && (
        <ProductDetailModal
          product={selectedProductModal}
          onClose={() => setSelectedProductModal(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(selectedProductModal.id)}
          onAddToCompare={handleAddToCompare}
        />
      )}

      {/* Habib AI Assistant Drawer */}
      <AIAssistant
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onSelectProduct={(prod) => setSelectedProductModal(prod)}
        onNavigate={(view) => {
          setActiveView(view);
          setIsAIOpen(false);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onNavigate={(view) => {
          setActiveView(view);
          setIsCartOpen(false);
        }}
      />

      {/* Voice Search Modal */}
      <VoiceSearchModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onPerformSearch={handlePerformSearch}
      />

      {/* Visual Search Modal */}
      <VisualSearchModal
        isOpen={isVisualOpen}
        onClose={() => setIsVisualOpen(false)}
        onSelectProduct={(prod) => setSelectedProductModal(prod)}
      />
    </div>
  );
}
