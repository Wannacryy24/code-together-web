import React from 'react';
import './VideoSection.css';

export default function VideoSection() {
    return (
        <div className="custom-hero-container">
            <div className="custom-hero-right">
                <div className="custom-video-stack">
                    <video
                        className="custom-hero-video video1"
                        autoPlay
                        muted
                        loop
                        src="Videos/m1.mp4"
                    ></video>
                </div>
            </div>
            <div className="custom-hero-left">
                <h2>
                    Built for Speed,  <span className="custom-highlight">Designed for Collaboration</span>
                </h2>
                <p>Used by 100+ developers for mock interviews and live code reviews.</p>
                <button className="custom-hero-button">Get Started</button>
            </div>
        </div>

    );
}
