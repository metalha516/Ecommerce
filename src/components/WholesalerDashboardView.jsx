import React, { useState } from 'react';
import { 
  Building2, TrendingUp, Truck, Package, ShieldCheck, 
  ArrowUpRight, Download, Sparkles, MapPin, Map, CheckCircle2, 
  DollarSign, Sliders, Users, Warehouse, AlertCircle, FileText
} from 'lucide-react';
import { WHOLESALER_METRICS, WHOLESALER_REGIONAL_DISTRIBUTION, WHOLESALER_TOP_RETAILERS, TEN_YEAR_HISTORICAL_DATA } from '../data/mockData';
import './WholesalerDashboardView.css';

export default function WholesalerDashboardView() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [bulkVolumeSlider, setBulkVolumeSlider] = useState(5000);
  const [yearIndex, setYearIndex] = useState(10); // 2026
  const [aiReportGenerated, setAiReportGenerated] = useState(false);

  const histData = TEN_YEAR_HISTORICAL_DATA[yearIndex];

  // Dynamic AI Wholesale Price & Supply Chain Projection Formula
  const getWholesalePrediction = () => {
    const unitPriceBase = 850;
    const inflationFactor = 1 + (histData.avgInflation / 100);
    const projectedUnitPrice = Math.round(unitPriceBase * inflationFactor);
    const estimatedTotalRev = Math.round(bulkVolumeSlider * projectedUnitPrice);
    const recommendedProcurementMonth = "Q3 (July-September 2026)";
    const tariffIncreaseRisk = "12% expected component import duty hike in Q4";

    return { projectedUnitPrice, estimatedTotalRev, recommendedProcurementMonth, tariffIncreaseRisk };
  };

  const predictInfo = getWholesalePrediction();

  const handleGenerateReport = () => {
    setAiReportGenerated(true);
    setTimeout(() => setAiReportGenerated(false), 4500);
  };

  return (
    <div className="wholesaler-dashboard-wrapper">
      {/* Header Banner */}
      <div className="wholesaler-header-card">
        <div className="wholesaler-title-group">
          <div className="company-avatar">
            <Building2 size={32} className="company-icon" />
          </div>
          <div>
            <div className="company-name-row">
              <h2>{WHOLESALER_METRICS.companyName}</h2>
              <span className="badge-enterprise">
                <ShieldCheck size={14} /> {WHOLESALER_METRICS.verifiedBadge}
              </span>
            </div>
            <p className="company-sub">Wholesale Merchant ID: #WHS-884910 • Central Warehouse: Tejgaon Industrial Zone, Dhaka</p>
          </div>
        </div>

        <div className="header-actions">
          <button className="btn btn-outline btn-sm" onClick={handleGenerateReport}>
            <FileText size={14} /> Export B2B Audit PDF
          </button>
          <button className="btn btn-primary btn-sm">
            <Truck size={14} /> Dispatch Bulk Shipment
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-cards-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Gross B2B Wholesale Sales</span>
            <div className="kpi-icon-wrap orange">
              <DollarSign size={20} />
            </div>
          </div>
          <h2 className="kpi-value">৳{WHOLESALER_METRICS.grossBulkSales.toLocaleString()}</h2>
          <span className="kpi-trend positive">
            <ArrowUpRight size={14} /> {WHOLESALER_METRICS.growthRate} YoY Growth
          </span>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Bulk Shipments Dispatched</span>
            <div className="kpi-icon-wrap blue">
              <Truck size={20} />
            </div>
          </div>
          <h2 className="kpi-value">{WHOLESALER_METRICS.bulkShipments}</h2>
          <span className="kpi-trend positive">
            <ArrowUpRight size={14} /> 100% On-Time Delivery
          </span>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Verified Retailer Clients</span>
            <div className="kpi-icon-wrap purple">
              <Users size={20} />
            </div>
          </div>
          <h2 className="kpi-value">{WHOLESALER_METRICS.verifiedRetailers} Stores</h2>
          <span className="kpi-trend positive">
            <ArrowUpRight size={14} /> +14 new merchant accounts
          </span>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Warehouse Storage Capacity</span>
            <div className="kpi-icon-wrap green">
              <Warehouse size={20} />
            </div>
          </div>
          <h2 className="kpi-value">{WHOLESALER_METRICS.warehouseStorage}</h2>
          <span className="kpi-trend healthy">
            <CheckCircle2 size={14} /> 16% Buffer Capacity
          </span>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="charts-main-grid">
        {/* Regional B2B Distribution Bar Chart */}
        <div className="chart-card flex-2">
          <div className="chart-card-header">
            <div>
              <h3><Map size={18} className="inline mr-1 text-orange-500" /> Regional Wholesale Shipment Distribution</h3>
              <span className="chart-sub">B2B volume across Bangladesh hub logistics</span>
            </div>
          </div>

          <div className="regional-bars-list">
            {WHOLESALER_REGIONAL_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="reg-bar-row">
                <div className="reg-info">
                  <span className="reg-name"><MapPin size={14} /> {item.region}</span>
                  <span className="reg-val">৳{item.volumeValue.toLocaleString()} ({item.shipments} shipments)</span>
                </div>
                <div className="reg-bar-bg">
                  <div 
                    className="reg-bar-fill"
                    style={{ width: `${(item.volumeValue / 1500000) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warehouse Storage & Bulk Margin Gauge */}
        <div className="chart-card flex-1">
          <div className="chart-card-header">
            <h3><Warehouse size={18} className="inline mr-1 text-indigo-500" /> Warehouse Capacity Gauge</h3>
          </div>

          <div className="capacity-gauge-box">
            <div className="gauge-circle-wrap">
              <svg viewBox="0 0 100 100" className="gauge-svg">
                <circle cx="50" cy="50" r="40" className="gauge-bg" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  className="gauge-fill"
                  strokeDasharray="251"
                  strokeDashoffset="40"
                />
              </svg>
              <div className="gauge-inner-text">
                <span className="gauge-percent font-bold">84%</span>
                <span className="gauge-sub">Occupied</span>
              </div>
            </div>

            <div className="capacity-specs">
              <div className="spec-line">
                <span>Total Pallets:</span>
                <strong>4,500 Pallets</strong>
              </div>
              <div className="spec-line">
                <span>Available Space:</span>
                <strong>720 Pallets</strong>
              </div>
              <div className="spec-line">
                <span>Avg Wholesale Margin:</span>
                <strong className="text-orange">{WHOLESALER_METRICS.avgMargin}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 10-Year AI Supply Chain & Wholesale Price Predictor */}
      <section className="wholesaler-ai-card">
        <div className="ai-predictor-header">
          <div className="ai-title-left">
            <div className="ai-glow-icon">
              <Sparkles size={24} />
            </div>
            <div>
              <span className="ai-tool-tag">10-YEAR MACRO SUPPLY CHAIN INTELLIGENCE (2016–2026)</span>
              <h2>Habib AI Bulk Procurement & Price Forecaster</h2>
            </div>
          </div>
          <span className="confidence-badge">
            <ShieldCheck size={14} /> AI Verified
          </span>
        </div>

        <p className="ai-predictor-desc">
          Analyzes 10 years of Bangladesh import tariffs, dollar exchange rates, shipping container freight indices, and inflation trends to recommend optimal B2B bulk purchase windows.
        </p>

        {/* AI Controls */}
        <div className="ai-controls-grid">
          {/* Historical Macro Year Selector */}
          <div className="control-box">
            <label className="control-label">
              10-Year Historical Baseline: <strong>{histData.year}</strong>
            </label>
            <input 
              type="range"
              min="0"
              max="10"
              value={yearIndex}
              onChange={(e) => setYearIndex(parseInt(e.target.value))}
              className="year-slider"
            />
            <div className="year-labels">
              <span>2016</span>
              <span>2021</span>
              <span>2026 (Current)</span>
            </div>
          </div>

          {/* Bulk Procurement Volume Slider */}
          <div className="control-box">
            <label className="control-label">
              Planned Bulk Order Volume: <strong>{bulkVolumeSlider.toLocaleString()} Units</strong>
            </label>
            <input 
              type="range"
              min="1000"
              max="20000"
              step="1000"
              value={bulkVolumeSlider}
              onChange={(e) => setBulkVolumeSlider(parseInt(e.target.value))}
              className="year-slider"
            />
          </div>
        </div>

        {/* AI Prediction Outputs */}
        <div className="ai-results-row">
          <div className="ai-result-box">
            <span className="res-label">10-Year B2B Volume Index</span>
            <h3 className="res-val purple">+{histData.b2bVolumeIndex}%</h3>
            <span className="res-sub">Wholesale adoption growth</span>
          </div>

          <div className="ai-result-box">
            <span className="res-label">Projected Unit Cost (6 Mo)</span>
            <h3 className="res-val orange">৳{predictInfo.projectedUnitPrice} / unit</h3>
            <span className="res-sub">Based on {histData.avgInflation}% inflation index</span>
          </div>

          <div className="ai-result-box">
            <span className="res-label">Estimated Gross B2B Value</span>
            <h3 className="res-val green">৳{predictInfo.estimatedTotalRev.toLocaleString()}</h3>
            <span className="res-sub">Bulk order value projection</span>
          </div>
        </div>

        {/* AI Recommendation Alert Box */}
        <div className="ai-recommendation-alert">
          <AlertCircle size={20} className="alert-icon" />
          <div>
            <h4>AI Procurement Recommendation</h4>
            <p>
              Optimal purchase window: <strong>{predictInfo.recommendedProcurementMonth}</strong>. Reason: <strong>{predictInfo.tariffIncreaseRisk}</strong>. Ordering now locks in 16.5% gross margin.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="ai-action-footer">
          {aiReportGenerated ? (
            <div className="ai-applied-msg">
              <CheckCircle2 size={20} /> 10-Year Wholesale Forecast Audit Report Generated! (PDF saved to Downloads)
            </div>
          ) : (
            <button className="btn btn-ai btn-lg" onClick={handleGenerateReport}>
              <Sparkles size={18} /> Generate AI 10-Year Wholesale Audit Report
            </button>
          )}
        </div>
      </section>

      {/* Verified Retail Client Accounts Table */}
      <div className="client-table-card">
        <div className="table-header">
          <h3><Building2 size={18} className="inline mr-1 text-amber-500" /> Verified B2B Retailer Client Accounts</h3>
          <span className="table-sub">Manage merchant orders, credit terms & bulk invoices</span>
        </div>

        <table className="client-table">
          <thead>
            <tr>
              <th>Retailer Merchant</th>
              <th>Orders This Month</th>
              <th>Total Bulk Volume</th>
              <th>Credit Term</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {WHOLESALER_TOP_RETAILERS.map((client, idx) => (
              <tr key={idx}>
                <td className="client-name-cell">
                  <Building2 size={16} className="client-icon" />
                  <strong>{client.name}</strong>
                </td>
                <td>{client.ordersThisMonth} bulk orders</td>
                <td className="font-bold text-orange">{client.totalVolume}</td>
                <td><span className="term-pill">{client.creditTerm}</span></td>
                <td><span className="status-pill healthy"><CheckCircle2 size={12} /> Active Partner</span></td>
                <td>
                  <button className="btn btn-outline btn-sm">Issue Invoice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
