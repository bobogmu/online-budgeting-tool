import React from "react";
import { Link } from "react-router-dom";
import "./NodeButton.css";

interface NodeButtonProps {
  label: string;
  link: string;
}

const NodeButton: React.FC<NodeButtonProps> = ({ label, link }) => {
  return (
    <Link to={link}>
      <button className="node-button">{label}</button>
    </Link>
  );
};

export default NodeButton;
