import React, { useState } from "react";
import "./SpotlightCard.css";

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(0, 229, 255, 0.3)" }) => {
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: `${((e.clientX - rect.left) / rect.width) * 100}%`,
      y: `${((e.clientY - rect.top) / rect.height) * 100}%`,
    });
  };

  return (
    <div
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        "--spotlight-x": mousePosition.x,
        "--spotlight-y": mousePosition.y,
        "--spotlight-color": spotlightColor,
      }}
    >
      <div className="spotlight-overlay"></div>
      <div className="spotlight-content">{children}</div>
    </div>
  );
};

export default SpotlightCard;
