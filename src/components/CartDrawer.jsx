import React, { useState } from 'react';
import { 
  ShoppingBag, X, Trash2, Plus, Minus, Tag, 
  Coins, CreditCard, ShieldCheck, CheckCircle2, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './CartDrawer.css';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart,
  onNavigate 
}) {
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [useCoins, setUseCoins] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 0 ? 60 : 0;
  const voucherDiscount = appliedVoucher ? appliedVoucher.amount : 0;
  const coinDiscount = useCoins ? 85 : 0;
  const total = Math.max(0, subtotal + shippingFee - voucherDiscount - coinDiscount);

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    if (voucherCode.toUpperCase() === 'BSMART50') {
      setAppliedVoucher({ code: 'BSMART50', amount: 50 });
    } else if (voucherCode.toUpperCase() === 'GREATSALE') {
      setAppliedVoucher({ code: 'GREATSALE', amount: 100 });
    } else {
      alert('Invalid voucher code. Try "BSMART50" or "GREATSALE"');
    }
  };

  const handleCheckoutSubmit = () => {
    if (cartItems.length === 0) return;
    setOrderConfirmed(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} className="cart-icon" />
            <h3>Your Shopping Cart</h3>
            <span className="items-count-badge">({cartItems.length} items)</span>
          </div>
          <button className="btn-icon btn-sm cart-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {orderConfirmed ? (
          /* Order Confirmation Screen */
          <div className="cart-success-view">
            <div className="success-icon-circle">
              <CheckCircle2 size={54} className="check-success" />
            </div>
            <h2>Order Placed Successfully!</h2>
            <p className="order-num-text">Order ID: <strong>#BS-{Math.floor(Math.random()*900000+100000)}</strong></p>
            <p className="success-sub">Thank you for shopping with BSmart! Your order details have been sent to your mobile & email.</p>

            <div className="success-actions">
              <button 
                className="btn btn-primary btn-lg w-full"
                onClick={() => {
                  onClearCart();
                  setOrderConfirmed(false);
                  onClose();
                  onNavigate('tracking');
                }}
              >
                Track My Order <ArrowRight size={16} />
              </button>
              <button 
                className="btn btn-outline btn-lg w-full mt-2"
                onClick={() => {
                  onClearCart();
                  setOrderConfirmed(false);
                  onClose();
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Normal Cart Body */
          <>
            <div className="cart-drawer-body">
              {cartItems.length === 0 ? (
                <div className="empty-cart-view">
                  <ShoppingBag size={64} className="empty-cart-icon" />
                  <h4>Your cart is empty</h4>
                  <p>Discover flash sales and trending tech items on BSmart!</p>
                  <button className="btn btn-primary btn-lg mt-4" onClick={onClose}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <img src={item.image} alt={item.name} className="cart-item-thumb" />

                      <div className="cart-item-details">
                        <span className="cart-item-store">{item.store || "BSmart Store"}</span>
                        <h4 className="cart-item-name">{item.name}</h4>
                        <span className="cart-item-price">৳{item.price.toLocaleString()}</span>

                        <div className="cart-item-controls">
                          <div className="cart-qty-stepper">
                            <button className="c-qty-btn" onClick={() => onUpdateQty(item.id, item.quantity - 1)}>
                              <Minus size={12} />
                            </button>
                            <span className="c-qty-num">{item.quantity}</span>
                            <button className="c-qty-btn" onClick={() => onUpdateQty(item.id, item.quantity + 1)}>
                              <Plus size={12} />
                            </button>
                          </div>

                          <button className="cart-remove-link" onClick={() => onRemoveItem(item.id)}>
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-drawer-footer">
                {/* Voucher Code Form */}
                <form className="voucher-input-row" onSubmit={handleApplyVoucher}>
                  <Tag size={16} className="tag-icon" />
                  <input 
                    type="text" 
                    placeholder="Voucher Code (Try BSMART50)" 
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                  <button type="submit" className="btn btn-outline btn-sm">Apply</button>
                </form>

                {/* Coin Discount Toggle */}
                <div className="coin-toggle-row">
                  <label className="coin-check-label">
                    <input 
                      type="checkbox" 
                      checked={useCoins} 
                      onChange={(e) => setUseCoins(e.target.checked)} 
                    />
                    <Coins size={16} className="coin-gold-icon" />
                    <span>Use 850 BSmart Coins (Save ৳85)</span>
                  </label>
                </div>

                {/* Payment Methods */}
                <div className="payment-methods-row">
                  <span className="pay-title">Payment Method:</span>
                  <div className="pay-options font-bold">
                    <button 
                      className={`pay-btn ${paymentMethod === 'bkash' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('bkash')}
                    >
                      bKash
                    </button>
                    <button 
                      className={`pay-btn ${paymentMethod === 'nagad' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('nagad')}
                    >
                      Nagad
                    </button>
                    <button 
                      className={`pay-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      Card
                    </button>
                    <button 
                      className={`pay-btn ${paymentMethod === 'cod' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      COD
                    </button>
                  </div>
                </div>

                {/* Summary Table */}
                <div className="summary-breakdown">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="summary-line">
                    <span>Shipping Fee (Dhaka)</span>
                    <span>৳{shippingFee}</span>
                  </div>
                  {appliedVoucher && (
                    <div className="summary-line discount">
                      <span>Voucher ({appliedVoucher.code})</span>
                      <span>-৳{appliedVoucher.amount}</span>
                    </div>
                  )}
                  {useCoins && (
                    <div className="summary-line discount">
                      <span>Coins Discount</span>
                      <span>-৳85</span>
                    </div>
                  )}
                  <div className="summary-line total-line">
                    <span>Total Amount</span>
                    <span className="final-total">৳{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  className="btn btn-primary btn-lg w-full checkout-btn"
                  onClick={handleCheckoutSubmit}
                >
                  Place Order · ৳{total.toLocaleString()}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
