import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NodeButton.css';

interface NodeButtonProps {
  label: string;
  link: string;
  description: string;
  disabled: boolean;
}

const NodeButton: React.FC<NodeButtonProps> = ({ label, link, description, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="node-button-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* If we are disabled, disable button, if not display button normally */}
      {disabled ? (
        <button className="node-button disabled" disabled>
          {label}
        </button>
      ) : (
        <Link to={link}>
          <button className="node-button">{label}</button>
        </Link>
      )}
      {/* If we are hovered, display tooltip */}
      {isHovered && <div className="node-button-tooltip">{description}</div>}
    </div>
  );
};

export default NodeButton;
