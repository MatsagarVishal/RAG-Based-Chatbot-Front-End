import React, { useEffect, useState } from 'react';
import './CrawlerVisual.css';

const CrawlerVisual = () => {
    return (
        <div className="crawler-visual">
            <div className="wireframe-container">
                {/* Mock Header */}
                <div className="wire-header">
                    <div className="wire-logo"></div>
                    <div className="wire-nav"></div>
                </div>
                {/* Mock Hero Section */}
                <div className="wire-hero">
                    <div className="wire-box"></div>
                    <div className="wire-lines"></div>
                </div>
                {/* Mock Grid Content */}
                <div className="wire-grid">
                    <div className="wire-card"></div>
                    <div className="wire-card"></div>
                    <div className="wire-card"></div>
                    <div className="wire-card"></div>
                </div>
            </div>

            {/* Scanning Bar Overlay */}
            <div className="scan-bar"></div>

            {/* Detected Elements Indicators */}
            <div className="detected-point p1"></div>
            <div className="detected-point p2"></div>
            <div className="detected-point p3"></div>

            <div className="scanner-status">
                <span className="status-text">ANALYZING PAGE STRUCTURE...</span>
            </div>
        </div>
    );
};

export default CrawlerVisual;
