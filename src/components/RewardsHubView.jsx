import React, { useState } from 'react';
import { 
  Coins, Gift, CheckCircle, Flame, Trophy, Play, 
  ShoppingBag, Sparkles, Tag, ArrowRight 
} from 'lucide-react';
import { REWARDS_TASKS } from '../data/mockData';
import confetti from 'canvas-confetti';
import './RewardsHubView.css';

export default function RewardsHubView({ onNavigate }) {
  const [coinsBalance, setCoinsBalance] = useState(850);
  const [tasks, setTasks] = useState(REWARDS_TASKS);
  const [claimedToday, setClaimedToday] = useState(false);

  const handleClaimDaily = (taskId) => {
    if (claimedToday) return;

    setCoinsBalance((prev) => prev + 50);
    setClaimedToday(true);
    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, completed: true, claimable: false, progress: "Claimed (+50 Coins)" } : t));

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="rewards-view-wrapper">
      {/* Rewards Header Card (Matches 'Rewarda Hub.png') */}
      <div className="rewards-hero-card">
        <div className="coins-balance-box">
          <div className="coin-hexagon">
            <Coins size={36} className="hero-coin-icon" />
          </div>
          <div className="balance-text-group">
            <span className="balance-label">My BSmart Coins</span>
            <div className="balance-amount-row">
              <h1 className="coins-num">{coinsBalance}</h1>
              <span className="coins-value-tag">= ৳{(coinsBalance / 10).toFixed(0)} Value</span>
            </div>
          </div>
        </div>

        <div className="rewards-actions-row">
          <button className="rw-action-btn">
            <Trophy size={18} /> History
          </button>
          <button className="rw-action-btn">
            <Gift size={18} /> My Vouchers
          </button>
          <button className="rw-action-btn">
            <Play size={18} /> Play & Earn
          </button>
        </div>
      </div>

      {/* Unlock Benefits Banner */}
      <div className="unlock-banner">
        <div className="unlock-text">
          <span className="unlock-sub font-bold">COLLECT COINS</span>
          <h2>Unlock more benefits & instant cash discounts!</h2>
          <p>Shop, play games and complete simple daily tasks to earn more coins.</p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => onNavigate('home')}>
          Explore Deals <ArrowRight size={16} />
        </button>
      </div>

      {/* Daily Tasks List */}
      <section className="rewards-section">
        <div className="section-header">
          <h3><Zap size={20} className="inline mr-1 text-amber-500" /> Earn Coins Daily</h3>
          <span className="section-sub">Complete daily activities to claim rewards</span>
        </div>

        <div className="tasks-grid">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-left">
                <div className="task-icon-circle">
                  <Sparkles size={20} className="task-sparkle" />
                </div>
                <div>
                  <h4 className="task-title">{task.title}</h4>
                  <span className="task-reward-tag">{task.reward}</span>
                </div>
              </div>

              <div className="task-right">
                <span className="task-progress">{task.progress}</span>
                {task.claimable && !claimedToday ? (
                  <button 
                    className="btn btn-primary btn-sm claim-btn"
                    onClick={() => handleClaimDaily(task.id)}
                  >
                    Check in (+50)
                  </button>
                ) : task.completed ? (
                  <span className="completed-pill">
                    <CheckCircle size={14} /> Done
                  </span>
                ) : (
                  <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('home')}>
                    Go
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Redeem Voucher Marketplace */}
      <section className="rewards-section">
        <div className="section-header">
          <h3><Tag size={20} className="inline mr-1 text-orange-500" /> Redeem Vouchers with Coins</h3>
          <span className="section-sub">Use your coins to get discount coupons</span>
        </div>

        <div className="voucher-exchange-grid">
          <div className="exchange-card">
            <Tag size={28} className="ex-icon" />
            <div>
              <h4>৳100 OFF Electronics</h4>
              <span className="ex-cost">1,000 Coins</span>
            </div>
            <button className="btn btn-outline btn-sm">Redeem</button>
          </div>

          <div className="exchange-card">
            <Tag size={28} className="ex-icon" />
            <div>
              <h4>Free Shipping Coupon</h4>
              <span className="ex-cost">500 Coins</span>
            </div>
            <button className="btn btn-outline btn-sm">Redeem</button>
          </div>

          <div className="exchange-card">
            <Tag size={28} className="ex-icon" />
            <div>
              <h4>৳50 Foodpanda Discount</h4>
              <span className="ex-cost">400 Coins</span>
            </div>
            <button className="btn btn-outline btn-sm">Redeem</button>
          </div>
        </div>
      </section>
    </div>
  );
}
