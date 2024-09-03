import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useUpvoteContext, UpvoteProvider } from './UpvoteContext';

// Utility component to use the context hook in tests
const TestComponent: React.FC = () => {
  const { upvoteLists, toggleUpvote, addUpvote } = useUpvoteContext();
  
  return (
    <div>
      <button onClick={() => addUpvote(0)}>Add Upvote to List 0</button>
      <button onClick={() => toggleUpvote(0, 0)}>Toggle Upvote 0 in List 0</button>
      <button onClick={() => toggleUpvote(0, 1)}>Toggle Upvote 1 in List 0</button>
      <div data-testid="upvote-lists">
        {JSON.stringify(upvoteLists)}
      </div>
    </div>
  );
};

describe('UpvoteContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize context with default values', () => {
    render(
      <UpvoteProvider>
        <TestComponent />
      </UpvoteProvider>
    );

    expect(localStorage.getItem('upvoteLists')).toBe('[[],[]]');
  });

  it('should update local storage when upvoteLists state changes', () => {
    const { getByText, getByTestId } = render(
      <UpvoteProvider>
        <TestComponent />
      </UpvoteProvider>
    );

    // Simulate adding upvotes
    act(() => {
      getByText('Add Upvote to List 0').click();
    });

    // Check local storage
    expect(localStorage.getItem('upvoteLists')).toBe('[[false],[]]');

    // Simulate toggling upvotes
    act(() => {
      getByText('Toggle Upvote 0 in List 0').click();
    });

    expect(getByTestId('upvote-lists').textContent).toBe('[[true],[]]');

    // Simulate adding another upvote
    act(() => {
      getByText('Add Upvote to List 0').click();
    });

    expect(getByTestId('upvote-lists').textContent).toBe('[[true,true],[]]');

    // Simulate toggling another upvote
    act(() => {
      getByText('Toggle Upvote 1 in List 0').click();
    });

    expect(getByTestId('upvote-lists').textContent).toBe('[[false,false],[]]');
  });
});
