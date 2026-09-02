import React, { useState } from 'react';
import { 
  Zap, Smartphone, CreditCard, Wifi, Truck, Gift, Ticket, Gamepad2, Film,
  Tv, Video, Music, ShoppingCart, CheckCircle, Search, ArrowRight, Star
} from 'lucide-react';
import { DIGITAL_SHEBA_DATA } from '../data/mockData';
import './DigitalShebaView.css';

export default function DigitalShebaView({ onAddToCart }) {
  const [activeTab, setActiveTab] = useState('all');
  const [mobileNumber, setMobileNumber] = useState('');
  const [operator, setOperator] = useState('gp');
  const [amount, setAmount] = useState(100);
  const [topupSuccess, setTopupSuccess] = useState(false);

  const handleTopupSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length >= 11) {
      setTopupSuccess(true);
      setTimeout(() => setTopupSuccess(false), 4000);
    }
  };

  return (
    <div className="sheba-view-wrapper">
      {/* Header Banner (Matches 'Digital good & Services.png') */}
      <div className="sheba-hero-card">
        <div className="sheba-hero-content">
          <span className="sheba-badge"><Zap size={14} /> INSTANT DIGITAL DELIVERY</span>
          <h2>Top up, pay bills & get vouchers instantly!</h2>
          <p>Fast, Easy, 100% Secure payments for Bangladesh mobile, games, and streaming subscriptions.</p>
        </div>
        <div className="sheba-hero-illustration">
          <div className="lightning-circle">
            <Zap size={48} className="zap-flash" />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="sheba-tabs-row">
        {['all', 'topup', 'vouchers', 'games', 'subscriptions'].map((tab) => (
          <button
            key={tab}
            className={`sheba-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'all' && 'All Services'}
            {tab === 'topup' && 'Mobile Top-up'}
            {tab === 'vouchers' && 'E-Vouchers'}
            {tab === 'games' && 'Game Credits'}
            {tab === 'subscriptions' && 'Subscriptions'}
          </button>
        ))}
      </div>

      {/* Interactive Mobile Top-up Widget */}
      {(activeTab === 'all' || activeTab === 'topup') && (
        <section className="topup-widget-card">
          <h3 className="widget-title">
            <Smartphone size={20} className="topup-icon" /> Instant Mobile Recharge
          </h3>

          {topupSuccess ? (
            <div className="topup-success-box">
              <CheckCircle size={36} className="success-check" />
              <div>
                <h4>Recharge Successful!</h4>
                <p>৳{amount} sent to {mobileNumber} ({operator.toUpperCase()}). Trans ID: #SHEBA-{Math.floor(Math.random()*900000+100000)}</p>
              </div>
            </div>
          ) : (
            <form className="topup-form" onSubmit={handleTopupSubmit}>
              <div className="form-group">
                <label>Mobile Number</label>
                <input 
                  type="text" 
                  placeholder="017XXXXXXXX"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  maxLength={11}
                  required
                />
              </div>

              <div className="form-group">
                <label>Operator</label>
                <select value={operator} onChange={(e) => setOperator(e.target.value)}>
                  <option value="gp">Grameenphone</option>
                  <option value="bl">Banglalink</option>
                  <option value="robi">Robi</option>
                  <option value="airtel">Airtel</option>
                  <option value="teletalk">Teletalk</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amount (৳)</label>
                <div className="amount-pills">
                  {[50, 100, 200, 500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className={`amt-pill ${amount === amt ? 'active' : ''}`}
                      onClick={() => setAmount(amt)}
                    >
                      ৳{amt}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg topup-submit-btn">
                Recharge Now <Zap size={16} />
              </button>
            </form>
          )}
        </section>
      )}

      {/* E-Vouchers Section */}
      {(activeTab === 'all' || activeTab === 'vouchers') && (
        <section className="sheba-section">
          <div className="section-header">
            <h3><Ticket size={20} className="sheba-sec-icon" /> E-Vouchers & Gift Cards</h3>
            <span className="section-sub">Instant code delivery to SMS & Email</span>
          </div>

          <div className="sheba-grid">
            {DIGITAL_SHEBA_DATA.vouchers.map((v) => (
              <div key={v.id} className="sheba-item-card">
                <div className="sheba-card-top" style={{ background: v.color }}>
                  <Gift size={28} className="v-icon" />
                  <span className="v-discount">{v.discount}</span>
                </div>
                <div className="sheba-card-body">
                  <h4>{v.name}</h4>
                  <div className="sheba-price-row">
                    <span className="from-text">From</span>
                    <span className="sheba-price">৳{v.price}</span>
                  </div>
                  <button 
                    className="btn btn-secondary btn-sm w-full mt-2"
                    onClick={() => onAddToCart({
                      id: v.id,
                      name: v.name,
                      price: v.price,
                      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80",
                      store: "Digital Sheba Official"
                    })}
                  >
                    <ShoppingCart size={14} /> Buy Voucher
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Game Credits Section */}
      {(activeTab === 'all' || activeTab === 'games') && (
        <section className="sheba-section">
          <div className="section-header">
            <h3><Gamepad2 size={20} className="sheba-sec-icon" /> Game Credits & Diamonds</h3>
            <span className="section-sub">Direct top-up using Player ID (UID)</span>
          </div>

          <div className="sheba-grid">
            {DIGITAL_SHEBA_DATA.games.map((g) => (
              <div key={g.id} className="sheba-item-card">
                <div className="sheba-game-img-wrap">
                  <img src={g.image} alt={g.name} />
                  <span className="game-badge">Instant UID</span>
                </div>
                <div className="sheba-card-body">
                  <h4>{g.name}</h4>
                  <div className="sheba-price-row">
                    <span className="from-text">From</span>
                    <span className="sheba-price">৳{g.price}</span>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm w-full mt-2"
                    onClick={() => onAddToCart({
                      id: g.id,
                      name: g.name,
                      price: g.price,
                      image: g.image,
                      store: "Gaming Sheba Direct"
                    })}
                  >
                    <Zap size={14} /> Top-up Diamonds
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Subscriptions Section */}
      {(activeTab === 'all' || activeTab === 'subscriptions') && (
        <section className="sheba-section">
          <div className="section-header">
            <h3><Film size={20} className="sheba-sec-icon" /> Entertainment Subscriptions</h3>
            <span className="section-sub">No credit card needed — pay with bKash/Nagad</span>
          </div>

          <div className="sheba-grid">
            {DIGITAL_SHEBA_DATA.subscriptions.map((s) => (
              <div key={s.id} className="sheba-item-card">
                <div className="sheba-card-top" style={{ background: s.color }}>
                  {s.logo === 'Tv' && <Tv size={28} />}
                  {s.logo === 'Youtube' && <Video size={28} />}
                  {s.logo === 'Music' && <Music size={28} />}
                </div>
                <div className="sheba-card-body">
                  <h4>{s.name}</h4>
                  <div className="sheba-price-row">
                    <span className="from-text">From</span>
                    <span className="sheba-price">৳{s.price} / mo</span>
                  </div>
                  <button 
                    className="btn btn-secondary btn-sm w-full mt-2"
                    onClick={() => onAddToCart({
                      id: s.id,
                      name: s.name,
                      price: s.price,
                      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=400&q=80",
                      store: "Entertainment Hub"
                    })}
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
