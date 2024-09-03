import React from 'react';
import './Upvote.css'; 

interface UpvoteProps {
  isSelected: boolean;
  onToggle: () => void;
  size?: number;
}

/**
 * The Upvote component represents a boolean value.
 * It renders a button with an arrow icon that is either filled or unfilled depending on the value.
 * When the button is clicked, the onToggle function is called.
 *
 * @prop {boolean} isSelected - the value of the upvote
 * @prop {() => void} onToggle - the function to call when the button is clicked
 * @prop {number} [size=24] - the size of the button and the icon
 */
const Upvote: React.FC<UpvoteProps> = ({
  isSelected,
  onToggle,
  size = 24,
}: UpvoteProps): React.ReactElement => {
  return (
    <button
      className={`upvote-button ${isSelected ? 'selected' : ''}`}
      aria-label={isSelected ? 'Remove upvote' : 'Upvote'}
      onClick={onToggle}
    >
      {/* Inline SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="upvote-icon"
      >
        {/* The path of the icon. The fill is set to none so that it inherits the color from its parent */}
        <path
          d="M11.3149 6.29307C11.4939 6.09658 11.7418 5.99834 12.0034 5.99834C12.265 5.99834 12.5128 6.11062 12.6918 6.29307L16.7125 10.3913C16.9053 10.5878 17.0016 10.8404 17.0016 11.0931C17.0016 11.3457 16.9053 11.5983 16.7125 11.7948C16.3407 12.1738 15.7211 12.1738 15.3493 11.7948L12.9672 9.36676V17.0417C12.9672 17.589 12.5404 18.0017 12.0034 18.0017C11.4664 18.0017 11.0395 17.589 11.0395 17.0417V9.36676L8.64364 11.7948C8.27187 12.1738 7.65225 12.1738 7.28048 11.7948C6.9087 11.4159 6.9087 10.7843 7.28048 10.4054L11.3149 6.29307Z"
          className="upvote-path"
        />
      </svg>
    </button>
  );
};

export default Upvote;
