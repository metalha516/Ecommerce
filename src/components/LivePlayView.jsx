import React, { useState, useEffect } from 'react';
import { 
  PlaySquare, Heart, Eye, ShoppingCart, Send, Flame,
  Sparkles, MessageSquare, Volume2, VolumeX, ShieldCheck
} from 'lucide-react';
import { FLASH_SALE_PRODUCTS } from '../data/mockData';
import './LivePlayView.css';

export default function LivePlayView({ onAddToCart, onSelectProduct }) {
  const [likes, setLikes] = useState(1420);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [comments, setComments] = useState([
    { user: 'Rahim_99', text: 'Does AirBeat Pro have noise cancellation?' },
    { user: 'Sumaiya_Dhaka', text: 'Just ordered 2 pairs! Super fast delivery' },
    { user: 'Tanvir_Tech', text: 'Is bKash cashback available on this live?' }
  ]);
  const [commentInput, setCommentInput] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  const pinnedProduct = FLASH_SALE_PRODUCTS[0]; // AirBeat Pro ANC Headphones

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    const newHeart = { id: Date.now(), x: Math.random() * 60 + 20 };
    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1800);
  };

  const handleSendComment = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments((prev) => [...prev, { user: 'You', text: commentInput }]);
      setCommentInput('');
    }
  };

  return (
    <div className="live-view-wrapper">
      {/* Live Stream Main Video Container */}
      <div className="live-video-card">
        {/* Video Surface */}
        <div className="video-viewport">
          <img 
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80" 
            alt="Live Stream"
            className="video-bg-img" 
          />

          {/* Video Overlay Top Info Bar */}
          <div className="video-top-bar">
            <div className="streamer-profile">
              <div className="avatar-wrap">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Host" />
                <span className="live-badge-red">LIVE</span>
              </div>
              <div className="streamer-info">
                <h4>BSmart Gadget Showcase</h4>
                <span>12.4k viewers</span>
              </div>
            </div>

            <div className="video-controls-right">
              <button className="control-btn" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>

          {/* Floating Hearts Animation */}
          <div className="floating-hearts-layer">
            {floatingHearts.map((h) => (
              <span key={h.id} className="floating-heart-particle" style={{ left: `${h.x}%` }}>
                <Heart size={22} fill="#E53935" color="#E53935" />
              </span>
            ))}
          </div>

          {/* Pinned Product Card Overlay */}
          <div className="pinned-product-overlay" onClick={() => onSelectProduct(pinnedProduct)}>
            <img src={pinnedProduct.image} alt={pinnedProduct.name} className="pinned-thumb" />
            <div className="pinned-details">
              <span className="pinned-tag"><Flame size={12} className="inline mr-1" /> LIVE EXCLUSIVE DEAL</span>
              <h4>{pinnedProduct.name}</h4>
              <div className="pinned-price-row">
                <span className="pinned-price">৳{pinnedProduct.price}</span>
                <span className="pinned-orig">৳{pinnedProduct.originalPrice}</span>
              </div>
            </div>

            <button 
              className="btn btn-primary btn-sm pinned-buy-btn"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(pinnedProduct);
              }}
            >
              <ShoppingCart size={14} /> Buy Now
            </button>
          </div>
        </div>

        {/* Live Chat Drawer Side */}
        <div className="live-chat-side">
          <div className="chat-header-bar">
            <h3><MessageSquare size={18} /> Live Comments</h3>
            <span className="live-likes-counter"><Heart size={14} fill="#E53935" color="#E53935" /> {likes}</span>
          </div>

          <div className="live-comments-feed">
            {comments.map((c, idx) => (
              <div key={idx} className="comment-bubble">
                <span className="comment-user">{c.user}:</span>
                <span className="comment-text">{c.text}</span>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <form className="comment-input-form" onSubmit={handleSendComment}>
            <input 
              type="text" 
              placeholder="Say something nice..." 
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button type="button" className="btn-icon btn-sm heart-like-btn" onClick={handleLike}>
              <Heart size={18} />
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
