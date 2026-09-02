import React, { useState, useEffect } from 'react';
import { Mic, X, Sparkles, Volume2 } from 'lucide-react';
import './VoiceSearchModal.css';

export default function VoiceSearchModal({ isOpen, onClose, onPerformSearch }) {
  const [speechText, setSpeechText] = useState('Listening... Speak now');

  useEffect(() => {
    if (!isOpen) return;
    const t1 = setTimeout(() => setSpeechText('"Show me ANC wireless headphones"'), 1500);
    const t2 = setTimeout(() => {
      onPerformSearch('AirBeat Pro ANC Wireless Headphones');
      onClose();
    }, 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="voice-modal-overlay" onClick={onClose}>
      <div className="voice-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="btn-icon btn-sm voice-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <span className="voice-badge">
          <Sparkles size={14} /> BSMART VOICE AI
        </span>

        <h3>Speak into your microphone</h3>
        <p className="speech-preview-text">{speechText}</p>

        {/* Pulsing Audio Wave Rings */}
        <div className="mic-wave-container">
          <div className="wave-ring ring-1"></div>
          <div className="wave-ring ring-2"></div>
          <div className="wave-ring ring-3"></div>
          <div className="mic-icon-circle">
            <Mic size={36} className="mic-icon" />
          </div>
        </div>

        <span className="voice-hint font-bold">Say "Headphones", "Tea gift", or "HDD compare"</span>
      </div>
    </div>
  );
}
