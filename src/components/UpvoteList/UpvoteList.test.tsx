import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpvoteList from './UpvoteList';
import addButtonSvg from '../../assets/plus.svg';  

 jest.mock('../../assets/plus.svg', () => 'mocked-plus-svg-url');

describe('UpvoteList Component', () => {
  const defaultProps = {
    upvotes: [false, true, false],
    onToggle: jest.fn(),
    onAdd: jest.fn(),
  };

  it('renders correctly with a list of upvote buttons', () => {
    const { getAllByRole } = render(<UpvoteList {...defaultProps} />);
    
    const upvoteButtons = getAllByRole('button');
    expect(upvoteButtons).toHaveLength(4); // 3 Upvote buttons + 1 Add button

    // Check if Upvote components are rendered correctly
    expect(upvoteButtons[0]).toHaveClass('upvote-button');
    expect(upvoteButtons[0]).not.toHaveClass('selected');
    expect(upvoteButtons[1]).toHaveClass('upvote-button selected');
    expect(upvoteButtons[2]).toHaveClass('upvote-button');
    
    // Check the add button
    const addButton = upvoteButtons[3];
    expect(addButton).toHaveClass('add-button');
    const img = addButton.querySelector('img');
    expect(img).toHaveAttribute('src', addButtonSvg);
    expect(img).toHaveAttribute('alt', 'Add');
  });

  it('calls onToggle with the correct index when an upvote button is clicked', () => {
    const { getAllByRole } = render(<UpvoteList {...defaultProps} />);
    
    const upvoteButtons = getAllByRole('button');
    fireEvent.click(upvoteButtons[0]);
    expect(defaultProps.onToggle).toHaveBeenCalledWith(0);
    
    fireEvent.click(upvoteButtons[1]);
    expect(defaultProps.onToggle).toHaveBeenCalledWith(1);
    
    fireEvent.click(upvoteButtons[2]);
    expect(defaultProps.onToggle).toHaveBeenCalledWith(2);
  });

  it('calls onAdd when the add button is clicked', () => {
    const { getAllByRole } = render(<UpvoteList {...defaultProps} />);
    
    const upvoteButtons = getAllByRole('button');
    const addButton = upvoteButtons[3];
    fireEvent.click(addButton);
    
    expect(defaultProps.onAdd).toHaveBeenCalledTimes(1);
  });
});
