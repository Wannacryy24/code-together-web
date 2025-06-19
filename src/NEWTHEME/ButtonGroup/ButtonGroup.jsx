import React from 'react';
import './ButtonGroup.css';

const ButtonGroup = ({ onShareClick, onBookDemo, onTryPlayground }) => {
  return (
    <div className="button-group">
      <button className="btn btn-primary" onClick={onShareClick}>
        Get Started
      </button>
      <button className="btn btn-outline" onClick={onBookDemo}>
        Book a Demo
      </button>
      <button className="btn btn-text" onClick={onTryPlayground}>
        Try the playground
        <span className="arrow">→</span>
      </button>
    </div>
  );
};

export default ButtonGroup;
