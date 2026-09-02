import React, { useState, useEffect } from 'react';
import { 
  Flame, Clock, ArrowRight, ShieldCheck, Truck, RefreshCw, 
  Sparkles, Zap, Building2, PackageCheck, Coins, GitCompare, 
  PlaySquare, Gift, Tag, Heart, ShoppingBag, Eye, Star
} from 'lucide-react';
import { HERO_BANNERS, QUICK_ACTIONS, FLASH_SALE_PRODUCTS, CATEGORIES } from '../data/mockData';
import './HomeView.css';

export default function HomeView({ 
  onSelectProduct, 
  onAddToCart, 
  onToggleWishlist, 
  wishlistIds,
  onNavigate,
  onAddToCompare
}) {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 4, seconds: 4 });

  // Carousel auto-play
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 5000);
    return () => clearInterval(bannerTimer);
  }, []);

  // Flash sale countdown timer
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(countdownTimer);
  }, []);

  const formatDigit = (num) => String(num).padStart(2, '0');

  return (
    <div className="home-view-wrapper">
      {/* Hero Banner Carousel */}
      <section className="hero-banner-section">
        <div 
          className="hero-slide-container"
          style={{ background: HERO_BANNERS[currentBanner].bgGradient }}
        >
          <div className="hero-content">
            <span className="hero-badge">{HERO_BANNERS[currentBanner].discountText}</span>
            <h1 className="hero-title">{HERO_BANNERS[currentBanner].title}</h1>
            <p className="hero-subtitle">{HERO_BANNERS[currentBanner].subtitle}</p>

            <div className="hero-cta-group">
              <button 
                className="btn btn-primary btn-lg hero-btn"
                onClick={() => {
                  if (HERO_BANNERS[currentBanner].category === 'Digital Sheba') onNavigate('sheba');
                  else if (HERO_BANNERS[currentBanner].category === 'Smart Tech') onNavigate('compare');
                  else onSelectProduct(FLASH_SALE_PRODUCTS[0]);
                }}
              >
                {HERO_BANNERS[currentBanner].buttonText} <ArrowRight size={18} />
              </button>

              <button 
                className="btn btn-secondary btn-lg hero-ai-btn"
                onClick={() => onNavigate('ai')}
              >
                <Sparkles size={18} /> Ask Habib AI
              </button>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img 
              src={HERO_BANNERS[currentBanner].imageUrl} 
              alt={HERO_BANNERS[currentBanner].title} 
              className="hero-img"
            />
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="hero-dots">
          {HERO_BANNERS.map((banner, idx) => (
            <button
              key={banner.id}
              className={`dot-btn ${idx === currentBanner ? 'active' : ''}`}
              onClick={() => setCurrentBanner(idx)}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="trust-badges-bar">
        <div className="trust-item">
          <ShieldCheck size={20} className="trust-icon" />
          <span>100% Safe Payment</span>
        </div>
        <div className="trust-divider"></div>
        <div className="trust-item">
          <Truck size={20} className="trust-icon" />
          <span>Fast Nationwide Delivery</span>
        </div>
        <div className="trust-divider"></div>
        <div className="trust-item">
          <RefreshCw size={20} className="trust-icon" />
          <span>14-Day Free Returns</span>
        </div>
      </section>

      {/* Flash Sale Section with Countdown (Matches Design Asset 'Main Frame.png') */}
      <section className="flash-sale-section">
        <div className="section-header">
          <div className="header-left">
            <h2 className="section-title">
              <Flame size={24} className="flash-flame-icon" /> Flash Sale
            </h2>
            <div className="countdown-container">
              <span className="countdown-label">Ends in</span>
              <div className="timer-box">{formatDigit(timeLeft.hours)}</div>
              <span className="timer-colon">:</span>
              <div className="timer-box">{formatDigit(timeLeft.minutes)}</div>
              <span className="timer-colon">:</span>
              <div className="timer-box">{formatDigit(timeLeft.seconds)}</div>
            </div>
          </div>
          <button className="see-all-btn" onClick={() => onNavigate('home')}>
            See All <ArrowRight size={14} />
          </button>
        </div>

        {/* Flash Sale Grid */}
        <div className="flash-products-grid">
          {FLASH_SALE_PRODUCTS.map((prod) => (
            <div key={prod.id} className="product-card">
              <div className="card-badge-container">
                <span className="discount-tag">-{prod.discountPercent}%</span>
              </div>

              <div className="product-image-frame" onClick={() => onSelectProduct(prod)}>
                <img src={prod.image} alt={prod.name} className="product-img" />
                <div className="hover-actions">
                  <button 
                    className="hover-btn" 
                    title="Quick View"
                    onClick={(e) => { e.stopPropagation(); onSelectProduct(prod); }}
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className={`hover-btn ${wishlistIds.includes(prod.id) ? 'active-heart' : ''}`}
                    title="Wishlist"
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(prod.id); }}
                  >
                    <Heart size={16} fill={wishlistIds.includes(prod.id) ? "#E53935" : "none"} />
                  </button>
                  <button 
                    className="hover-btn" 
                    title="Add to Compare"
                    onClick={(e) => { e.stopPropagation(); onAddToCompare(prod); }}
                  >
                    <GitCompare size={16} />
                  </button>
                </div>
              </div>

              <div className="product-info" onClick={() => onSelectProduct(prod)}>
                <span className="store-name">{prod.store}</span>
                <h3 className="product-title">{prod.name}</h3>

                <div className="price-row">
                  <span className="current-price">৳{prod.price.toLocaleString()}</span>
                  <span className="original-price">৳{prod.originalPrice.toLocaleString()}</span>
                </div>

                {/* Progress bar for sold items */}
                <div className="sold-progress-wrapper">
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${prod.soldPercent}%` }}
                    ></div>
                  </div>
                  <span className="sold-text">{prod.soldCount}</span>
                </div>

                <div className="card-footer-buttons">
                  <button 
                    className="btn btn-primary btn-sm add-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(prod);
                    }}
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions Grid (Matches 'Main Frame.png') */}
      <section className="quick-actions-section">
        <h2 className="section-title-sm">Quick Actions & Hubs</h2>
        <div className="quick-actions-grid">
          {QUICK_ACTIONS.map((action) => (
            <div 
              key={action.id} 
              className="quick-action-card"
              onClick={() => onNavigate(action.id)}
            >
              <div 
                className="action-icon-circle" 
                style={{ backgroundColor: `${action.color}15`, color: action.color }}
              >
                {action.id === 'mall' && <Building2 size={24} />}
                {action.id === 'orders' && <PackageCheck size={24} />}
                {action.id === 'sheba' && <Zap size={24} />}
                {action.id === 'mart' && <ShoppingBag size={24} />}
                {action.id === 'rewards' && <Coins size={24} />}
                {action.id === 'compare' && <GitCompare size={24} />}
                {action.id === 'live' && <PlaySquare size={24} />}
                {action.id === 'help' && <Gift size={24} />}
              </div>
              <span className="action-title">{action.title}</span>
              <span className="action-badge-sub" style={{ background: `${action.color}20`, color: action.color }}>
                {action.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Best Deals & Vouchers Section (Freebies, Collect Coins, Vouchers) */}
      <section className="promo-banners-row">
        <div className="promo-card freebies-card" onClick={() => onNavigate('rewards')}>
          <div className="promo-card-content">
            <Gift size={32} className="promo-icon" />
            <div className="promo-text">
              <h4>Freebies & Gifts</h4>
              <p>Surprise gifts & perks on ৳1,000+ orders</p>
            </div>
            <ArrowRight size={18} className="promo-arrow" />
          </div>
        </div>

        <div className="promo-card coins-card" onClick={() => onNavigate('rewards')}>
          <div className="promo-card-content">
            <Coins size={32} className="promo-icon" />
            <div className="promo-text">
              <h4>Collect Coins</h4>
              <p>Shop & complete daily tasks to earn rewards</p>
            </div>
            <ArrowRight size={18} className="promo-arrow" />
          </div>
        </div>

        <div className="promo-card vouchers-card" onClick={() => onNavigate('sheba')}>
          <div className="promo-card-content">
            <Tag size={32} className="promo-icon" />
            <div className="promo-text">
              <h4>Best Vouchers</h4>
              <p>Extra ৳500 OFF on electronics & food vouchers</p>
            </div>
            <ArrowRight size={18} className="promo-arrow" />
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <button className="see-all-btn">Explore All Categories</button>
        </div>

        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="category-card" onClick={() => onNavigate('home')}>
              <div className="category-card-icon">
                <Sparkles size={24} className="cat-sparkle" />
              </div>
              <div className="category-info">
                <h4>{cat.name}</h4>
                <span>{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
