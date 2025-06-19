import React from 'react';
import {
  BoltIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import './FeatureBarWithIcons.css';

const features = [
  { text: 'Fast', icon: <BoltIcon className="icon" /> },
  { text: 'Secure', icon: <ShieldCheckIcon className="icon" /> },
  { text: 'No Setup', icon: <Cog6ToothIcon className="icon" /> },
  { text: 'Works in Browser', icon: <GlobeAltIcon className="icon" /> },
  { text: 'Guest Access', icon: <UserIcon className="icon" /> },
];

export default function FeatureBarWithIcons() {
  return (
    <div className="features-bar">
      {features.map((feature, index) => (
        <div className="feature-box" key={index}>
          {feature.icon}
          <span>{feature.text}</span>
        </div>
      ))}
    </div>
  );
}