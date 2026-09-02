import React, { useState } from 'react';
import { Camera, X, Upload, Sparkles, Image, CheckCircle2, ArrowRight } from 'lucide-react';
import { FLASH_SALE_PRODUCTS } from '../data/mockData';
import './VisualSearchModal.css';

export default function VisualSearchModal({ isOpen, onClose, onSelectProduct }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  if (!isOpen) return null;

  const handleSimulateUpload = (sampleImg, sampleProd) => {
    setAnalyzing(true);
    setMatchResult(null);

    setTimeout(() => {
      setAnalyzing(false);
      setMatchResult(sampleProd || FLASH_SALE_PRODUCTS[0]);
    }, 1800);
  };

  return (
    <div className="visual-modal-overlay" onClick={onClose}>
      <div className="visual-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="btn-icon btn-sm visual-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="visual-modal-header">
          <span className="visual-badge">
            <Camera size={14} /> AI VISUAL SEARCH
          </span>
          <h3>Find products by photo or image drag-and-drop</h3>
          <p className="visual-sub">Snap or upload any product picture to locate exact or similar matches on BSmart marketplace.</p>
        </div>

        {matchResult ? (
          /* Visual Match Result */
          <div className="visual-result-box">
            <span className="result-found-badge">
              <CheckCircle2 size={14} /> 98% Visual Match Found!
            </span>

            <div className="result-product-card">
              <img src={matchResult.image} alt={matchResult.name} />
              <div className="res-details">
                <span className="res-store">{matchResult.store}</span>
                <h4>{matchResult.name}</h4>
                <span className="res-price">৳{matchResult.price.toLocaleString()}</span>
                
                <button 
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => {
                    onClose();
                    onSelectProduct(matchResult);
                  }}
                >
                  View Product <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Dropzone & Sample Images */
          <div className="visual-upload-body">
            <div 
              className={`dropzone-box ${analyzing ? 'analyzing' : ''}`}
              onClick={() => handleSimulateUpload(null, FLASH_SALE_PRODUCTS[0])}
            >
              {analyzing ? (
                <div className="analyzing-view">
                  <Sparkles size={42} className="spin-sparkle" />
                  <h4>Analyzing Image with AI...</h4>
                  <span className="analyzing-sub">Scanning shapes, textures & product tags</span>
                </div>
              ) : (
                <>
                  <Upload size={44} className="upload-icon" />
                  <h4>Drag and drop photo here or click to browse</h4>
                  <span className="file-types-sub">Supports JPG, PNG, WEBP, HEIC</span>
                </>
              )}
            </div>

            <div className="samples-section">
              <span className="samples-label">Or try sample visual searches:</span>
              <div className="samples-row">
                {FLASH_SALE_PRODUCTS.map((prod) => (
                  <div 
                    key={prod.id}
                    className="sample-thumb-card"
                    onClick={() => handleSimulateUpload(prod.image, prod)}
                  >
                    <img src={prod.image} alt={prod.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
