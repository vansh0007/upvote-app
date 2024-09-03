import React from 'react';
import Upvote from '../Upvote/Upvote';
import addButtonSvg  from '../../assets/plus.svg';
import './UpvoteList.css';

interface UpvoteListProps {
  upvotes: boolean[];
  onToggle: (index: number) => void;
  onAdd: () => void;
}

/**
 * The UpvoteList component renders a list of upvote buttons.
 * Each upvote button represents a boolean value.
 * The component also renders a button to add a new upvote to the list.
 *
 * @param {UpvoteListProps} props the component props
 * @returns {React.ReactElement} the component element
 */
const UpvoteList: React.FC<UpvoteListProps> = ({
  upvotes,
  onToggle,
  onAdd,
}: UpvoteListProps): React.ReactElement => {
  return (
    <div className="upvote-list-container">
      {/* Render the list of upvote buttons */}
      <div className="upvote-list-wrapper">
        {upvotes.map((isSelected, index) => (
          <Upvote
            key={index}
            isSelected={isSelected}
            onToggle={() => onToggle(index)}
          />
        ))}
      </div>
      {/* Render the button to add a new upvote */}
      <button
        onClick={onAdd}
        className="add-button"
      >
        <img src={addButtonSvg} alt="Add" />
      </button>
    </div>
  );
};

export default UpvoteList;
