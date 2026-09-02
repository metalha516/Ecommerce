import React, { useState } from 'react';
import { 
  GitCompare, CheckCircle2, XCircle, Plus, ShoppingCart, 
  Sparkles, ExternalLink, ShieldCheck, ArrowRight, X, Truck, Star, Zap
} from 'lucide-react';
import { COMPARE_ITEMS, FLASH_SALE_PRODUCTS } from '../data/mockData';
import './CompareView.css';

export default function CompareView({ onAddToCart, onSelectProduct, compareList, setCompareList }) {
  const [differencesOnly, setDifferencesOnly] = useState(false);

  // Default to comparing NVMe SSD vs Mechanical HDD if list is empty
  const items = compareList.length > 0 ? compareList : COMPARE_ITEMS;

  const handleRemoveFromCompare = (id) => {
    setCompareList(prev => prev.filter(item => item.id !== id));
  };

  const handleAddDefaultProduct = () => {
    const candidate = FLASH_SALE_PRODUCTS[0];
    if (!items.find(i => i.id === candidate.id)) {
      setCompareList(prev => [...prev, {
        id: candidate.id,
        name: candidate.name,
        variant: "ANC Black",
        price: candidate.price,
        rating: candidate.rating,
        reviewsCount: candidate.reviewsCount,
        delivery: "Tomorrow",
        seller: candidate.store,
        warranty: "12 Months",
        returnPeriod: "14 Days",
        readSpeed: "N/A (Headphones)",
        durability: "High",
        powerUsage: "Low",
        image: candidate.image
      }]);
    }
  };

  return (
    <div className="compare-view-wrapper">
      {/* Top Bar Header (Matches 'Compare products.png') */}
      <div className="compare-header-card">
        <div className="cmp-header-titles">
          <h2><GitCompare size={24} className="cmp-icon" /> Compare Products</h2>
          <span className="cmp-sub">Side-by-side spec, warranty & seller analysis (Compare up to 4 items)</span>
        </div>

        <div className="diff-toggle-container">
          <label className="toggle-label">Differences only</label>
          <button 
            className={`toggle-switch ${differencesOnly ? 'active' : ''}`}
            onClick={() => setDifferencesOnly(!differencesOnly)}
          >
            <span className="toggle-knob"></span>
          </button>
          <span className="count-tag">{items.length} of 4</span>
        </div>
      </div>

      {/* Product Cards Header Row */}
      <div className="cmp-products-row">
        {items.map((item) => (
          <div key={item.id} className="cmp-product-card">
            {items.length > 1 && (
              <button 
                className="cmp-remove-btn" 
                onClick={() => handleRemoveFromCompare(item.id)}
                title="Remove from comparison"
              >
                <X size={16} />
              </button>
            )}

            <div className="cmp-img-box">
              <img src={item.image} alt={item.name} />
              {item.badge && <span className="cmp-badge">{item.badge}</span>}
            </div>

            <div className="cmp-card-info">
              <h4 className="cmp-item-name">{item.name}</h4>
              <span className="cmp-variant">{item.variant}</span>
              
              <div className="cmp-rating-row">
                <span className="star-text"><Star size={13} className="inline fill-amber-500 text-amber-500 mr-1" /> {item.rating}</span>
                <span className="reviews-text">({item.reviewsCount})</span>
              </div>

              <span className="cmp-price">৳{item.price.toLocaleString()}</span>

              <button 
                className="btn btn-primary btn-sm w-full mt-2"
                onClick={() => onAddToCart(item)}
              >
                <ShoppingCart size={14} /> Add to Cart
              </button>
            </div>
          </div>
        ))}

        {items.length < 4 && (
          <div className="cmp-add-slot-card" onClick={handleAddDefaultProduct}>
            <div className="add-plus-circle">
              <Plus size={28} />
            </div>
            <span>Add another product</span>
          </div>
        )}
      </div>

      {/* Comparison Details Table (Matches 'Compare products.png') */}
      <div className="cmp-table-card">
        <h3 className="cmp-table-title">Buying & Technical Details</h3>

        <div className="cmp-table-wrapper">
          <table className="cmp-matrix-table">
            <tbody>
              {/* Price Row */}
              <tr>
                <td className="row-label">Price</td>
                {items.map(i => (
                  <td key={i.id} className="row-value highlight-price">
                    ৳{i.price.toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* Rating Row */}
              {(!differencesOnly) && (
                <tr>
                  <td className="row-label">User Rating</td>
                  {items.map(i => (
                    <td key={i.id} className="row-value">
                      <Star size={13} className="inline text-amber-500 fill-amber-500 mr-1" /> {i.rating} ({i.reviewsCount} reviews)
                    </td>
                  ))}
                </tr>
              )}

              {/* Delivery Row */}
              <tr>
                <td className="row-label">Delivery Time</td>
                {items.map(i => (
                  <td key={i.id} className="row-value">
                    <Truck size={14} className="inline mr-1" /> {i.delivery}
                  </td>
                ))}
              </tr>

              {/* Seller Status */}
              {(!differencesOnly) && (
                <tr>
                  <td className="row-label">Seller Verification</td>
                  {items.map(i => (
                    <td key={i.id} className="row-value">
                      <ShieldCheck size={14} className="inline mr-1 text-emerald-600" /> {i.seller}
                    </td>
                  ))}
                </tr>
              )}

              {/* Warranty */}
              <tr>
                <td className="row-label">Warranty Period</td>
                {items.map(i => (
                  <td key={i.id} className="row-value">
                    {i.warranty}
                  </td>
                ))}
              </tr>

              {/* Return Policy */}
              <tr>
                <td className="row-label">Return Policy</td>
                {items.map(i => (
                  <td key={i.id} className="row-value">
                    {i.returnPeriod}
                  </td>
                ))}
              </tr>

              {/* Performance Speed */}
              <tr>
                <td className="row-label">Transfer Speed / Perf</td>
                {items.map(i => (
                  <td key={i.id} className="row-value badge-val">
                    <Zap size={14} className="inline mr-1" /> {i.readSpeed || 'N/A'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
