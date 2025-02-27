import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NodeButton.css';

interface NodeButtonProps {
  label: string;
  link: string;
  description: string;
}

const NodeButton: React.FC<NodeButtonProps> = ({ label, link, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="node-button-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link to={link}>
        <button className="node-button">{label}</button>
      </Link>
      {isHovered && <div className="node-button-tooltip">{description}</div>}
    </div>
  );
};

export default NodeButton;
