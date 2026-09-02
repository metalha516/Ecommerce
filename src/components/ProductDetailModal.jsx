import React, { useState } from 'react';
import { 
  X, Star, Heart, ShoppingBag, Truck, ShieldCheck, 
  Share2, Minus, Plus, Sparkles, GitCompare, CheckCircle2
} from 'lucide-react';
import './ProductDetailModal.css';

export default function ProductDetailModal({ 
  product, 
  onClose, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted,
  onAddToCompare
}) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedShare, setCopiedShare] = useState(false);

  if (!product) return null;

  const handleShare = () => {
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header Bar */}
        <div className="modal-header-bar">
          <div className="modal-tabs">
            {['overview', 'reviews', 'details', 'shipping'].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="modal-actions-right">
            <button className="btn-icon btn-sm action-btn" onClick={handleShare} title="Share product">
              <Share2 size={18} />
              {copiedShare && <span className="copied-tooltip">Link copied!</span>}
            </button>
            <button className="btn-icon btn-sm close-modal-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="product-modal-body">
          {/* Left Column: Image Gallery */}
          <div className="gallery-column">
            <div className="main-image-frame">
              <img src={product.image} alt={product.name} />
              {product.discountPercent && (
                <span className="gallery-discount-tag">-{product.discountPercent}% OFF</span>
              )}
            </div>

            <div className="thumbnail-row">
              {[product.image, product.image, product.image].map((img, idx) => (
                <div key={idx} className={`thumb-box ${idx === 0 ? 'active' : ''}`}>
                  <img src={img} alt="thumb" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Specs */}
          <div className="details-column">
            <span className="store-badge">
              <ShieldCheck size={14} /> {product.store || "OFFICIAL STORE"}
            </span>

            <h1 className="product-modal-title">{product.name}</h1>

            {/* Savings Pills */}
            <div className="savings-pills-row">
              <span className="coin-pill">{product.coinSavings || "Coin save ৳50"}</span>
              <span className="promo-pill">Buy ৳699 extra 4% OFF</span>
            </div>

            {/* Price & Rating Row */}
            <div className="price-rating-card">
              <div className="price-group">
                <span className="modal-current-price">৳{product.price?.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="modal-original-price">৳{product.originalPrice?.toLocaleString()}</span>
                )}
                {product.discountPercent && (
                  <span className="modal-discount-badge">-{product.discountPercent}%</span>
                )}
              </div>

              <div className="rating-group">
                <span className="stars font-bold">⭐ {product.rating || 4.8}</span>
                <span className="rev-count">({product.reviewsCount || '2.4k'} reviews)</span>
                <span className="sold-count">• {product.soldCount || '5.1k sold'}</span>
              </div>
            </div>

            {/* Sound Features / Highlights */}
            {product.features && (
              <div className="features-chips-row">
                {product.features.map((feat, idx) => (
                  <span key={idx} className="feature-chip">{feat}</span>
                ))}
              </div>
            )}

            {/* Store Perks Box (Matches 'Last Product Details.png') */}
            <div className="perks-box">
              <h4 className="perks-store-name">{product.store} Perks</h4>
              <ul>
                <li>• Buy 3 for free shipping* (Capped at ৳150)</li>
                <li>• Buy 10 and Get 1 Free Gift (till stock lasts)</li>
                <li>• Free Returns within 14 days, no questions asked</li>
              </ul>
            </div>

            {/* Color Variant Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="selector-group">
                <label className="selector-label">Color: <strong>{product.colors[selectedColor].name}</strong></label>
                <div className="color-options-row">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      className={`color-btn ${idx === selectedColor ? 'active' : ''}`}
                      style={{ backgroundColor: c.code }}
                      onClick={() => setSelectedColor(idx)}
                      title={c.name}
                    >
                      {idx === selectedColor && <CheckCircle2 size={14} color="#FFF" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="selector-group">
              <label className="selector-label">Quantity</label>
              <div className="qty-stepper">
                <button 
                  className="qty-btn" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="qty-num">{quantity}</span>
                <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="delivery-info-box">
              <Truck size={18} className="truck-icon" />
              <div>
                <span className="delivery-title">Delivery to Dhaka Central</span>
                <span className="delivery-sub">Guaranteed delivery in 2 days · Standard Shipping ৳60</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="modal-bottom-bar">
          <button 
            className={`btn-icon btn-lg wishlist-modal-btn ${isWishlisted ? 'active' : ''}`}
            onClick={() => onToggleWishlist(product.id)}
            title="Wishlist"
          >
            <Heart size={22} fill={isWishlisted ? "#E53935" : "none"} color={isWishlisted ? "#E53935" : "#18181B"} />
          </button>

          <button 
            className="btn btn-outline btn-lg compare-modal-btn"
            onClick={() => onAddToCompare(product)}
          >
            <GitCompare size={18} /> Compare
          </button>

          <button 
            className="btn btn-secondary btn-lg add-cart-modal-btn"
            onClick={() => {
              for (let i = 0; i < quantity; i++) onAddToCart(product);
            }}
          >
            <ShoppingBag size={18} /> Add to Cart
          </button>

          <button 
            className="btn btn-primary btn-lg buy-now-modal-btn"
            onClick={() => {
              for (let i = 0; i < quantity; i++) onAddToCart(product);
              onClose();
            }}
          >
            Buy Now ৳{(product.price * quantity).toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}
