import React from 'react';
import { 
  PackageCheck, Truck, Clock, CheckCircle2, 
  MapPin, ShieldCheck, PhoneCall, Copy, ArrowRight 
} from 'lucide-react';
import { ACTIVE_ORDER_DATA } from '../data/mockData';
import './OrderTrackingView.css';

export default function OrderTrackingView({ onNavigate }) {
  const order = ACTIVE_ORDER_DATA;

  return (
    <div className="tracking-view-wrapper">
      {/* Header Info Card (Matches 'Order tracking.png') */}
      <div className="tracking-header-card">
        <div className="tracking-meta">
          <span className="order-id-tag"><PackageCheck size={16} /> Order #{order.orderId}</span>
          <h2>Estimated Delivery: {order.estimatedDelivery}</h2>
          <p className="courier-name">Fulfilled by {order.courier} • Tracking: {order.trackingNumber}</p>
        </div>

        <div className="tracking-quick-actions">
          <button className="btn btn-secondary btn-sm">
            <PhoneCall size={14} /> Call Courier Rider
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => navigator.clipboard.writeText(order.trackingNumber)}>
            <Copy size={14} /> Copy Tracking ID
          </button>
        </div>
      </div>

      {/* Timeline Steps Card */}
      <div className="tracking-timeline-card">
        <h3 className="section-title-sm">Package Journey Status</h3>

        <div className="timeline-container">
          {order.timeline.map((step, idx) => (
            <div key={idx} className={`timeline-step-row ${step.status}`}>
              <div className="step-indicator">
                <div className="step-circle">
                  {step.status === 'completed' && <CheckCircle2 size={16} />}
                  {step.status === 'current' && <Truck size={16} className="truck-pulse" />}
                  {step.status === 'upcoming' && <Clock size={14} />}
                </div>
                {idx < order.timeline.length - 1 && <div className="step-line"></div>}
              </div>

              <div className="step-content">
                <h4 className="step-title">{step.title}</h4>
                <span className="step-time">{step.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Items & Address Summary */}
      <div className="tracking-details-grid">
        <div className="detail-box">
          <h4 className="detail-box-title"><MapPin size={16} /> Delivery Address</h4>
          <p className="address-text">
            <strong>Habib Rahman</strong><br />
            House 42, Road 11, Block D, Banani<br />
            Dhaka - 1213, Bangladesh<br />
            Phone: +880 1711-XXXXXX
          </p>
        </div>

        <div className="detail-box">
          <h4 className="detail-box-title"><ShieldCheck size={16} /> Items in Package</h4>
          {order.items.map((item, idx) => (
            <div key={idx} className="item-row">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h5>{item.name}</h5>
                <span>Qty: {item.qty} · ৳{item.price.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
