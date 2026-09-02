import React, { useState } from 'react';
import { 
  Sparkles, X, Send, Bot, User, CheckCircle2, 
  ArrowRight, GitCompare, ExternalLink, ShieldCheck, Heart, ThumbsUp, Star, Truck
} from 'lucide-react';
import { SAMPLE_AI_PRESETS } from '../data/mockData';
import './AIAssistant.css';

export default function AIAssistant({ 
  isOpen, 
  onClose, 
  onSelectProduct, 
  onNavigate 
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am Habib, your BSmart AI shopping assistant. Ask me in Bangla or English — I'll find, compare, and explain the best options for you!",
      type: 'greeting'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Find me a premium tea gift under ৳1,000.'
    },
    {
      id: 3,
      sender: 'ai',
      type: 'product_recommendation',
      suggestion: "I found a top-rated organic tea with a verified seller, free delivery and strong reviews.",
      product: {
        id: "prod-tea",
        name: "Kazi & Kazi Organic Premium Tea Gift Box",
        price: 850,
        originalPrice: 1000,
        discountPercent: 15,
        rating: 4.8,
        reviewsCount: "1.2k",
        store: "Kazi & Kazi Official Store",
        verified: true,
        freeDelivery: true,
        fitReason: "Best value pick under ৳1,000 with 4.8 rating and certified organic harvest.",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
      }
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      setIsTyping(false);
      let aiResponse = {};

      const lower = query.toLowerCase();

      if (lower.includes('tea')) {
        aiResponse = {
          id: Date.now() + 1,
          sender: 'ai',
          type: 'product_recommendation',
          suggestion: "Here is the top-rated organic tea gift set matching your budget:",
          product: {
            id: "prod-tea",
            name: "Kazi & Kazi Organic Premium Tea Gift Box",
            price: 850,
            originalPrice: 1000,
            discountPercent: 15,
            rating: 4.8,
            reviewsCount: "1.2k",
            store: "Kazi & Kazi Official Store",
            verified: true,
            freeDelivery: true,
            fitReason: "Matches your budget under ৳1,000, verified seller & free delivery.",
            image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
          }
        };
      } else if (lower.includes('compare') || lower.includes('ssd') || lower.includes('hdd')) {
        aiResponse = {
          id: Date.now() + 1,
          sender: 'ai',
          type: 'compare_suggestion',
          text: "I analyzed NVMe SSD vs Mechanical HDD for gaming and workload:",
          comparison: {
            winner: "NVMe SSD (FastSpeed)",
            reason: "23x faster read speed (3500MB/s vs 150MB/s), lower power consumption, and 12 months warranty.",
            priceDiff: "SSD is ৳600 more but delivers 5x better system responsiveness."
          }
        };
      } else if (lower.includes('track') || lower.includes('order')) {
        aiResponse = {
          id: Date.now() + 1,
          sender: 'ai',
          type: 'order_status',
          text: "Your active order #BS-948271 (AirBeat Pro Headphones) is currently In Transit with BSmart Express. Estimated delivery: Sep 05 by 4:00 PM."
        };
      } else {
        aiResponse = {
          id: Date.now() + 1,
          sender: 'ai',
          type: 'general',
          text: `I searched BSmart catalog for "${query}". I recommend checking out our Flash Sale section or compare hub for verified deals!`
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 1200);
  };

  return (
    <div className="ai-modal-overlay" onClick={onClose}>
      <div className="ai-modal-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header (Matches Design Asset 'HF_AI_Assistant — High-Fidelity.png') */}
        <div className="ai-header">
          <div className="ai-header-left">
            <div className="ai-avatar-circle">
              <Bot size={22} className="ai-bot-icon" />
              <span className="online-dot"></span>
            </div>
            <div className="ai-header-titles">
              <h3>Habib AI Assistant</h3>
              <span className="ai-status">Online · personalized & secure</span>
            </div>
          </div>
          <button className="btn-icon btn-sm ai-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Smart Tagline Banner */}
        <div className="ai-smart-banner">
          <span className="smart-tag">BSMART SMART SHOPPING</span>
          <h4>Shop smarter. Decide faster.</h4>
          <p>Ask in Bangla or English — I'll find, compare and explain the best options.</p>
        </div>

        {/* Preset Prompt Chips */}
        <div className="ai-chips-container">
          <span className="chips-label">Try asking:</span>
          <div className="chips-row">
            {SAMPLE_AI_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                className="preset-chip-btn"
                onClick={() => handleSend(preset)}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Body */}
        <div className="ai-chat-body">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
              {msg.sender === 'ai' && (
                <div className="msg-avatar">
                  <Sparkles size={16} />
                </div>
              )}

              <div className="msg-bubble">
                {msg.text && <p className="msg-text">{msg.text}</p>}

                {/* AI Product Recommendation Card */}
                {msg.type === 'product_recommendation' && (
                  <div className="ai-recommendation-card">
                    <div className="rec-badge">
                      <Sparkles size={12} /> AI Suggestion
                    </div>
                    <p className="rec-suggestion-text">{msg.suggestion}</p>

                    <div className="rec-product-box">
                      <div className="rec-image-wrap">
                        <img src={msg.product.image} alt={msg.product.name} />
                        <span className="rec-discount">-{msg.product.discountPercent}% OFF</span>
                      </div>

                      <div className="rec-product-details">
                        <span className="rec-fit-label">WHY THIS FITS</span>
                        <h4 className="rec-title">{msg.product.name}</h4>
                        
                        <div className="rec-specs-list">
                          <span className="spec-bullet"><Star size={12} className="inline mr-1 text-amber-500 fill-amber-500" /> {msg.product.rating} rating · {msg.product.reviewsCount} reviews</span>
                          <span className="spec-bullet"><CheckCircle2 size={12} className="inline mr-1 text-emerald-600" /> {msg.product.store}</span>
                          <span className="spec-bullet"><Truck size={12} className="inline mr-1 text-blue-600" /> Free delivery available</span>
                        </div>

                        <div className="rec-price-row">
                          <span className="rec-price">৳{msg.product.price}</span>
                          <span className="rec-orig-price">৳{msg.product.originalPrice}</span>
                        </div>

                        <div className="rec-action-buttons">
                          <button 
                            className="btn btn-primary btn-sm flex-1"
                            onClick={() => {
                              onClose();
                              onSelectProduct(msg.product);
                            }}
                          >
                            View Product <ExternalLink size={14} />
                          </button>
                          <button 
                            className="btn btn-outline btn-sm flex-1"
                            onClick={() => {
                              onClose();
                              onNavigate('compare');
                            }}
                          >
                            <GitCompare size={14} /> Compare
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Comparison Suggestion */}
                {msg.type === 'compare_suggestion' && (
                  <div className="ai-compare-card">
                    <div className="cmp-winner-badge">
                      <ThumbsUp size={14} /> Recommended: {msg.comparison.winner}
                    </div>
                    <p className="cmp-reason">{msg.comparison.reason}</p>
                    <p className="cmp-pricediff">{msg.comparison.priceDiff}</p>
                    <button 
                      className="btn btn-ai btn-sm w-full mt-2"
                      onClick={() => {
                        onClose();
                        onNavigate('compare');
                      }}
                    >
                      Open Full Comparison Tool <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-message-row ai">
              <div className="msg-avatar">
                <Sparkles size={16} />
              </div>
              <div className="msg-bubble typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="ai-input-bar">
          <input
            type="text"
            className="ai-input"
            placeholder="Ask about products, prices or orders..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            className="btn btn-primary btn-icon ai-send-btn"
            onClick={() => handleSend()}
            disabled={!inputVal.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
