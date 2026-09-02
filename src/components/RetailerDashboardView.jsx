import React, { useState } from 'react';
import { 
  Store, TrendingUp, ShoppingBag, DollarSign, Package, 
  Sparkles, ShieldCheck, ArrowUpRight, ArrowDownRight, RefreshCcw, 
  Filter, Download, Calendar, CheckCircle2, AlertTriangle, Layers, BarChart3
} from 'lucide-react';
import { RETAILER_METRICS, RETAILER_SALES_TREND, TEN_YEAR_HISTORICAL_DATA, FLASH_SALE_PRODUCTS } from '../data/mockData';
import './RetailerDashboardView.css';

export default function RetailerDashboardView({ onSelectProduct }) {
  const [selectedSeason, setSelectedSeason] = useState('eid');
  const [selectedCategory, setSelectedCategory] = useState('electronics');
  const [targetYearIndex, setTargetYearIndex] = useState(10); // 2026 (Now)
  const [aiApplied, setAiApplied] = useState(false);
  const [hoverMonth, setHoverMonth] = useState(null);

  const selectedYearData = TEN_YEAR_HISTORICAL_DATA[targetYearIndex];

  // Dynamic AI prediction multiplier based on season & category
  const getPrediction = () => {
    let multiplier = 1.25;
    if (selectedSeason === 'eid') multiplier = 1.45;
    if (selectedSeason === 'flash88') multiplier = 1.38;
    if (selectedSeason === 'boishakh') multiplier = 1.30;
    if (selectedCategory === 'electronics') multiplier *= 1.1;

    const baseRev = RETAILER_METRICS.monthlyRevenue;
    const projectedRev = Math.round(baseRev * multiplier);
    const reorderUnits = Math.round(850 * multiplier);
    const confidence = (92 + Math.random() * 4).toFixed(1);

    return { projectedRev, reorderUnits, confidence, growthPercent: Math.round((multiplier - 1) * 100) };
  };

  const prediction = getPrediction();

  const handleApplyAI = () => {
    setAiApplied(true);
    setTimeout(() => setAiApplied(false), 4000);
  };

  return (
    <div className="retailer-dashboard-wrapper">
      {/* Header Banner */}
      <div className="retailer-header-card">
        <div className="retailer-title-group">
          <div className="store-avatar">
            <Store size={28} className="store-icon" />
          </div>
          <div>
            <div className="store-name-row">
              <h2>{RETAILER_METRICS.storeName}</h2>
              <span className="badge-gold">
                <ShieldCheck size={14} /> {RETAILER_METRICS.verifiedBadge}
              </span>
            </div>
            <p className="store-sub">Retail Merchant ID: #RET-994821 • Dhaka Central Hub</p>
          </div>
        </div>

        <div className="header-actions">
          <button className="btn btn-outline btn-sm">
            <Download size={14} /> Export CSV Report
          </button>
          <button className="btn btn-primary btn-sm">
            <Package size={14} /> Add New Product
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="kpi-cards-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Monthly Revenue</span>
            <div className="kpi-icon-wrap green">
              <DollarSign size={20} />
            </div>
          </div>
          <h2 className="kpi-value">৳{RETAILER_METRICS.monthlyRevenue.toLocaleString()}</h2>
          <span className="kpi-trend positive">
            <ArrowUpRight size={14} /> {RETAILER_METRICS.revenueGrowth} vs last month
          </span>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Total Retail Orders</span>
            <div className="kpi-icon-wrap orange">
              <ShoppingBag size={20} />
            </div>
          </div>
          <h2 className="kpi-value">{RETAILER_METRICS.totalOrders.toLocaleString()}</h2>
          <span className="kpi-trend positive">
            <ArrowUpRight size={14} /> +12.5% order volume
          </span>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Average Order Value</span>
            <div className="kpi-icon-wrap purple">
              <TrendingUp size={20} />
            </div>
          </div>
          <h2 className="kpi-value">৳{RETAILER_METRICS.avgOrderValue.toLocaleString()}</h2>
          <span className="kpi-trend positive">
            <ArrowUpRight size={14} /> +৳320 avg ticket
          </span>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Customer Return Rate</span>
            <div className="kpi-icon-wrap blue">
              <RefreshCcw size={20} />
            </div>
          </div>
          <h2 className="kpi-value">{RETAILER_METRICS.returnRate}</h2>
          <span className="kpi-trend healthy">
            <CheckCircle2 size={14} /> Healthy (Industry avg 3.5%)
          </span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-main-grid">
        {/* Sales Trend Interactive SVG Line Chart */}
        <div className="chart-card flex-2">
          <div className="chart-card-header">
            <div>
              <h3><TrendingUp size={18} className="inline mr-1 text-orange-500" /> 2026 Monthly Sales & Order Analytics</h3>
              <span className="chart-sub">Real-time store performance breakdown</span>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="legend-dot orange"></span> Revenue (৳)</span>
              <span className="legend-item"><span className="legend-dot purple"></span> Orders</span>
            </div>
          </div>

          <div className="svg-chart-container">
            <svg viewBox="0 0 700 220" className="interactive-svg-chart">
              {/* Grid Lines */}
              <line x1="40" y1="40" x2="680" y2="40" stroke="#F4F4F5" strokeWidth="1" />
              <line x1="40" y1="90" x2="680" y2="90" stroke="#F4F4F5" strokeWidth="1" />
              <line x1="40" y1="140" x2="680" y2="140" stroke="#F4F4F5" strokeWidth="1" />
              <line x1="40" y1="190" x2="680" y2="190" stroke="#E4E4E7" strokeWidth="1" />

              {/* Area Gradient */}
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F57224" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#F57224" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area Path */}
              <path
                d="M 60,160 Q 135,145 210,120 T 360,40 T 510,105 T 660,75 L 660,190 L 60,190 Z"
                fill="url(#areaGrad)"
              />

              {/* Curve Line */}
              <path
                d="M 60,160 Q 135,145 210,120 T 360,40 T 510,105 T 660,75"
                fill="none"
                stroke="#F57224"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Points */}
              {RETAILER_SALES_TREND.map((item, idx) => {
                const cx = 60 + idx * 75;
                const cy = 190 - (item.sales / 700000) * 150;
                return (
                  <g key={idx} className="chart-point-group" onMouseEnter={() => setHoverMonth(item)}>
                    <circle cx={cx} cy={cy} r="6" className="chart-point" />
                    <text x={cx} y="210" textAnchor="middle" className="chart-axis-text">{item.month}</text>
                  </g>
                );
              })}
            </svg>

            {hoverMonth && (
              <div className="chart-tooltip">
                <strong>{hoverMonth.month} 2026</strong>
                <span>Revenue: ৳{hoverMonth.sales.toLocaleString()}</span>
                <span>Orders: {hoverMonth.orders} orders</span>
              </div>
            )}
          </div>
        </div>

        {/* Category Share Breakdown */}
        <div className="chart-card flex-1">
          <div className="chart-card-header">
            <h3><BarChart3 size={18} className="inline mr-1 text-indigo-500" /> Category Sales Share</h3>
          </div>

          <div className="category-bars-list">
            <div className="cat-bar-item">
              <div className="cat-bar-label">
                <span>Electronics & Tech</span>
                <strong>42%</strong>
              </div>
              <div className="cat-bar-bg"><div className="cat-bar-fill" style={{ width: '42%', background: '#F57224' }}></div></div>
            </div>

            <div className="cat-bar-item">
              <div className="cat-bar-label">
                <span>Fashion & Apparel</span>
                <strong>28%</strong>
              </div>
              <div className="cat-bar-bg"><div className="cat-bar-fill" style={{ width: '28%', background: '#8B5CF6' }}></div></div>
            </div>

            <div className="cat-bar-item">
              <div className="cat-bar-label">
                <span>Kitchen & Home</span>
                <strong>18%</strong>
              </div>
              <div className="cat-bar-bg"><div className="cat-bar-fill" style={{ width: '18%', background: '#10B981' }}></div></div>
            </div>

            <div className="cat-bar-item">
              <div className="cat-bar-label">
                <span>Digital Sheba & Vouchers</span>
                <strong>12%</strong>
              </div>
              <div className="cat-bar-bg"><div className="cat-bar-fill" style={{ width: '12%', background: '#3B82F6' }}></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* 10-Year AI Demand Predictor Engine Section */}
      <section className="ai-predictor-card">
        <div className="ai-predictor-header">
          <div className="ai-title-left">
            <div className="ai-glow-icon">
              <Sparkles size={24} />
            </div>
            <div>
              <span className="ai-tool-tag">10-YEAR HISTORICAL DATA (2016–2026)</span>
              <h2>Habib AI Retail Demand & Stock Forecaster</h2>
            </div>
          </div>
          <span className="confidence-badge">
            <CheckCircle2 size={14} /> AI Confidence: {prediction.confidence}%
          </span>
        </div>

        <p className="ai-predictor-desc">
          Using 10 years of Bangladesh consumer purchasing trends, macroeconomic inflation indices, and BSmart historical campaign surges to predict demand spikes and auto-tune inventory reorder levels.
        </p>

        {/* Inputs Control Panel */}
        <div className="ai-controls-grid">
          {/* Year Range Slider */}
          <div className="control-box">
            <label className="control-label">
              <Calendar size={14} /> Baseline Year: <strong>{selectedYearData.year}</strong>
            </label>
            <input 
              type="range" 
              min="0" 
              max="10" 
              value={targetYearIndex}
              onChange={(e) => setTargetYearIndex(parseInt(e.target.value))}
              className="year-slider"
            />
            <div className="year-labels">
              <span>2016</span>
              <span>2021</span>
              <span>2026 (Now)</span>
            </div>
          </div>

          {/* Season Selector */}
          <div className="control-box">
            <label className="control-label">
              <Filter size={14} /> Target Campaign / Season Peak
            </label>
            <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)} className="select-input">
              <option value="eid">Eid-ul-Fitr Mega Peak (+45% surge)</option>
              <option value="flash88">8.8 Great Sale (+38% surge)</option>
              <option value="boishakh">Pohela Boishakh (+30% surge)</option>
              <option value="winter">Winter Tech & Fashion Rush (+25% surge)</option>
            </select>
          </div>

          {/* Category Selector */}
          <div className="control-box">
            <label className="control-label">
              <Layers size={14} /> Product Category
            </label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="select-input">
              <option value="electronics">Electronics & Wireless Gadgets</option>
              <option value="fashion">Fashion & Apparel</option>
              <option value="kitchen">Kitchen & Home Appliances</option>
              <option value="sheba">Digital Sheba & Top-up</option>
            </select>
          </div>
        </div>

        {/* AI Forecast Result Cards */}
        <div className="ai-results-row">
          <div className="ai-result-box">
            <span className="res-label">10-Year Growth Multiplier</span>
            <h3 className="res-val purple">+{selectedYearData.ecomGrowth}%</h3>
            <span className="res-sub">E-Commerce adoption index</span>
          </div>

          <div className="ai-result-box">
            <span className="res-label">Predicted 2026-2027 Monthly Sales</span>
            <h3 className="res-val orange">৳{prediction.projectedRev.toLocaleString()}</h3>
            <span className="res-sub">+{prediction.growthPercent}% vs baseline</span>
          </div>

          <div className="ai-result-box">
            <span className="res-label">Recommended Stock Reorder</span>
            <h3 className="res-val green">{prediction.reorderUnits} Units</h3>
            <span className="res-sub">Prevents stock-outs during peak surge</span>
          </div>
        </div>

        {/* Action button */}
        <div className="ai-action-footer">
          {aiApplied ? (
            <div className="ai-applied-msg">
              <CheckCircle2 size={20} /> AI Stock Reorder Plan Applied! Auto-drafting purchase order to Wholesalers.
            </div>
          ) : (
            <button className="btn btn-ai btn-lg" onClick={handleApplyAI}>
              <Sparkles size={18} /> Apply AI Inventory Recommendation
            </button>
          )}
        </div>
      </section>

      {/* Top Products Inventory Table */}
      <div className="inventory-table-card">
        <div className="table-header">
          <h3><Package size={18} className="inline mr-1 text-amber-500" /> Top Selling Store Inventory</h3>
          <span className="table-sub">Live stock tracking & automated reorder alerts</span>
        </div>

        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Current Stock</th>
              <th>Units Sold</th>
              <th>Stock Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {FLASH_SALE_PRODUCTS.map((prod) => (
              <tr key={prod.id}>
                <td className="prod-cell" onClick={() => onSelectProduct(prod)}>
                  <img src={prod.image} alt={prod.name} className="prod-table-img" />
                  <div>
                    <h5 className="prod-table-name">{prod.name}</h5>
                    <span className="prod-table-store">{prod.store}</span>
                  </div>
                </td>
                <td className="font-bold">৳{prod.price.toLocaleString()}</td>
                <td>{prod.soldPercent > 80 ? '24 units left' : '150 units left'}</td>
                <td>{prod.soldCount}</td>
                <td>
                  {prod.soldPercent > 80 ? (
                    <span className="status-pill warning"><AlertTriangle size={12} /> Low Stock</span>
                  ) : (
                    <span className="status-pill healthy"><CheckCircle2 size={12} /> Healthy</span>
                  )}
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={handleApplyAI}>
                    Reorder Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
