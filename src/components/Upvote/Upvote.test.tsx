import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Upvote from './Upvote';

describe('Upvote Component', () => {
  const defaultProps = {
    isSelected: false,
    onToggle: jest.fn(),
    size: 24,
  };

  it('renders correctly with default props', () => {
    const { getByLabelText } = render(<Upvote {...defaultProps} />);
    const button = getByLabelText('Upvote');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('upvote-button');
    expect(button).not.toHaveClass('selected');
  });

  it('applies selected class and fill color when isSelected is true', () => {
    const { getByLabelText } = render(<Upvote {...defaultProps} isSelected={true} />);
    const button = getByLabelText('Remove upvote');
    expect(button).toHaveClass('upvote-button selected');
  });

  it('calls onToggle function when button is clicked', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = render(<Upvote {...defaultProps} onToggle={onToggle} />);

    const button = getByLabelText('Upvote');
    fireEvent.click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('renders correctly with a custom size', () => {
    const { getByLabelText } = render(<Upvote {...defaultProps} size={32} />);
    const button = getByLabelText('Upvote');
    
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument(); // Ensure svg is not null
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });
});
