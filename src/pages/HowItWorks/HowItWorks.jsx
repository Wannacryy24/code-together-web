import React from 'react';
import './HowItWorks.css';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    number: '1',
    title: 'Create a Room',
    description: 'Click "Start Coding" to instantly spin up a collaboration room — no login required.',
  },
  {
    number: '2',
    title: 'Share the Link',
    description: 'Copy the unique URL and invite your coding partner, team, or mentor.',
  },
  {
    number: '3',
    title: 'Code Together in Real-Time',
    description: 'Write code simultaneously with live updates, synced cursors, and selections.',
  },
  {
    number: '4',
    title: 'Chat & Collaborate',
    description: 'Use the built-in chat (coming soon) for smoother pair programming.',
  },
];

const HowItWorks = () => {

  const navigate = useNavigate();
  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="how-it-works-container">
        <h2 className="how-it-works-title">How It Works</h2>
        <p className="how-it-works-subtitle">
          Code2gthr lets you collaborate in seconds. No installs. No login barriers. Just code.
        </p>

        <div className="how-it-works-steps">
          {steps.map((step) => (
            <div key={step.number} className="how-it-works-step">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>

        <li  className="how-it-works-cta"
          onClick={()=>navigate('/')}
        >
          Go HomePage to start Coding.
        </li>
      </div>
    </section>
  );
};

export default HowItWorks;
