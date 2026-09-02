import React, { useState, useEffect } from 'react';
import { 
  Search, Mic, Camera, Sparkles, Heart, ShoppingBag, 
  User, MapPin, Globe, Headphones, ChevronDown, Flame, 
  Zap, Building2, Store, PackageCheck, Coins, GitCompare, PlaySquare, Menu, X
} from 'lucide-react';
import './Header.css';

export default function Header({ 
  cartCount, 
  wishlistCount, 
  activeView, 
  setActiveView, 
  onOpenCart, 
  onOpenAI, 
  onOpenVoiceSearch, 
  onOpenVisualSearch,
  searchQuery,
  setSearchQuery,
  onPerformSearch
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangBn, setIsLangBn] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onPerformSearch(searchQuery);
    }
  };

  return (
    <header className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Banner & Quick Links Bar */}
      <div className="header-top-bar">
        <div className="header-top-container">
          <div className="top-left-links">
            <span className="top-item promo-pill">
              <Flame size={14} className="flame-icon" /> 8.8 Sale Live — Up to 60% OFF
            </span>
            <span className="top-item desktop-only">
              <MapPin size={13} /> Deliver to: <strong>Dhaka Central, BD</strong>
            </span>
          </div>

          <div className="top-right-links">
            <button className="top-link-btn" onClick={() => setActiveView('rewards')}>
              <Coins size={13} className="coin-icon" /> Coins: <strong>850 (৳85)</strong>
            </button>
            <button className="top-link-btn" onClick={() => setActiveView('tracking')}>
              <PackageCheck size={13} /> Track Order
            </button>
            <button className="top-link-btn" onClick={() => setActiveView('help')}>
              <Headphones size={13} /> Help & Support
            </button>
            <button className="lang-toggle-btn" onClick={() => setIsLangBn(!isLangBn)}>
              <Globe size={13} /> {isLangBn ? 'বাংলা' : 'ENGLISH'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="header-main-bar">
        <div className="header-main-container">
          {/* Logo */}
          <div className="logo-brand" onClick={() => setActiveView('home')}>
            <span className="logo-icon-wrapper">
              <Sparkles size={22} className="logo-sparkle" />
            </span>
            <div className="logo-text-group">
              <span className="logo-text">BSmart</span>
              <span className="logo-tagline">AI MARKETPLACE</span>
            </div>
          </div>

          {/* 3-Variant Search Bar (Habib Think Rule #8) */}
          <form className="search-box-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder={isLangBn ? "পণ্য, ব্র্যান্ড বা সেবা খুঁজুন..." : "Search products, brands, tea, headphones or ask AI..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              {/* Search Actions: Voice & Visual */}
              <div className="search-variant-actions">
                <button 
                  type="button" 
                  className="search-var-btn voice-btn" 
                  title="Voice Search (Say product name)"
                  onClick={onOpenVoiceSearch}
                >
                  <Mic size={17} />
                </button>
                <button 
                  type="button" 
                  className="search-var-btn visual-btn" 
                  title="Visual Search (Upload photo)"
                  onClick={onOpenVisualSearch}
                >
                  <Camera size={17} />
                </button>
              </div>
            </div>
            <button type="submit" className="search-submit-btn btn-lg">
              {isLangBn ? 'খুঁজুন' : 'Search'}
            </button>
          </form>

          {/* AI Trigger Button */}
          <button className="ai-trigger-pill btn-ai" onClick={onOpenAI}>
            <Sparkles size={16} className="ai-glow-sparkle" />
            <span className="ai-btn-text">Habib AI</span>
            <span className="ai-badge-chip">Smart</span>
          </button>

          {/* Right Action Icons */}
          <div className="header-actions-group">
            <button 
              className={`nav-icon-btn ${activeView === 'compare' ? 'active' : ''}`}
              onClick={() => setActiveView('compare')}
              title="Compare Products"
            >
              <GitCompare size={20} />
              <span className="icon-label">Compare</span>
            </button>

            <button 
              className={`nav-icon-btn ${activeView === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveView('wishlist')}
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
              <span className="icon-label">Wishlist</span>
            </button>

            <button 
              className="nav-icon-btn cart-btn-highlight"
              onClick={onOpenCart}
              title="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="action-badge cart-badge-pulse">{cartCount}</span>}
              <span className="icon-label">Cart</span>
            </button>

            <button 
              className={`nav-icon-btn ${activeView === 'account' ? 'active' : ''}`}
              onClick={() => setActiveView('account')}
              title="User Account"
            >
              <User size={20} />
              <span className="icon-label">Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <nav className="header-nav-sub">
        <div className="nav-sub-container">
          <div className="category-dropdown-trigger" onClick={() => setShowCategoryMenu(!showCategoryMenu)}>
            <Menu size={16} />
            <span>All Categories</span>
            <ChevronDown size={14} className={showCategoryMenu ? 'rotate' : ''} />

            {showCategoryMenu && (
              <div className="category-popover">
                <a href="#electronics" onClick={() => setActiveView('home')}>Electronics & Gadgets</a>
                <a href="#fashion" onClick={() => setActiveView('home')}>Fashion & Apparel</a>
                <a href="#sheba" onClick={() => setActiveView('sheba')}>Digital Sheba & Top-up</a>
                <a href="#home" onClick={() => setActiveView('home')}>Kitchen & Home Appliances</a>
                <a href="#gaming" onClick={() => setActiveView('sheba')}>Gaming & Vouchers</a>
                <a href="#rewards" onClick={() => setActiveView('rewards')}>Coins & Reward Store</a>
              </div>
            )}
          </div>

          <div className="nav-links-row">
            <button className={`nav-link ${activeView === 'home' ? 'active' : ''}`} onClick={() => setActiveView('home')}>
              Home
            </button>
            <button className={`nav-link ${activeView === 'sheba' ? 'active' : ''}`} onClick={() => setActiveView('sheba')}>
              <Zap size={14} className="nav-link-icon sheba-icon" /> Digital Sheba
            </button>
            <button className={`nav-link ${activeView === 'compare' ? 'active' : ''}`} onClick={() => setActiveView('compare')}>
              <GitCompare size={14} className="nav-link-icon" /> Compare Products
            </button>
            <button className={`nav-link ${activeView === 'rewards' ? 'active' : ''}`} onClick={() => setActiveView('rewards')}>
              <Coins size={14} className="nav-link-icon reward-icon" /> Rewards Hub
            </button>
            <button className={`nav-link ${activeView === 'live' ? 'active' : ''}`} onClick={() => setActiveView('live')}>
              <PlaySquare size={14} className="nav-link-icon live-icon" /> BSmart Live
            </button>
            <button className={`nav-link ${activeView === 'tracking' ? 'active' : ''}`} onClick={() => setActiveView('tracking')}>
              <PackageCheck size={14} className="nav-link-icon" /> Order Tracking
            </button>
            <button className={`nav-link merchant-highlight ${activeView === 'retailer' ? 'active' : ''}`} onClick={() => setActiveView('retailer')}>
              <Store size={14} className="nav-link-icon retailer-icon" /> Retailer Hub
            </button>
            <button className={`nav-link merchant-highlight ${activeView === 'wholesaler' ? 'active' : ''}`} onClick={() => setActiveView('wholesaler')}>
              <Building2 size={14} className="nav-link-icon wholesaler-icon" /> Wholesaler Portal
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
