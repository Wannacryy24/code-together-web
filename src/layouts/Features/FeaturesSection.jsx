import React from "react";
import "./FeaturesSection.css";

const FeaturesSection = () => {
  const features = [
    {
      title: "Real-Time Collaboration",
      description: "Edit code together with your team and see changes instantly. Perfect for pair programming and team reviews.",
    },
    {
      title: "Syntax Highlighting",
      description: "Supports all popular languages with rich, readable syntax highlighting built-in.",
    },
    {
      title: "Secure Sharing",
      description: "Invite collaborators with full control over access and editing permissions.",
    },
    {
      title: "Multi-Language Support",
      description: "Write in JavaScript, Python, C++, HTML and more — all in one editor.",
    },
  ];

  return (
    <section className="features-section" id='features-id-for-scroll'>
      <h2 className="features-title">Powerful Features for Developers</h2>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
