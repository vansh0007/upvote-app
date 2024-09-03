import React from 'react';
import { UpvoteProvider, useUpvoteContext } from './context/UpvoteContext';
import UpvoteList from './components/UpvoteList/UpvoteList';
import './App.css'; 

  
/**
 * The `UpvoteLists` component renders a list of upvote lists.
 * The component renders an `UpvoteList` component for each upvote list.
 * The component also renders a button to add a new upvote to the list.
 *
 * @returns the upvote lists component element
 */
const UpvoteLists: React.FC = () => {
  const { upvoteLists, toggleUpvote, addUpvote } = useUpvoteContext();

  return (
    <div className="upvote-lists-container">
      {/* Render an UpvoteList component for each upvote list */}
      {upvoteLists.map((list, listIndex) => (
        <UpvoteList
          key={listIndex}
          // Pass the upvote list and the toggle upvote and add upvote functions to the component
          upvotes={list}
          onToggle={(upvoteIndex) => toggleUpvote(listIndex, upvoteIndex)}
          onAdd={() => addUpvote(listIndex)}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UpvoteProvider>
      <div>
        <h1>Upvote Lists</h1>
        <UpvoteLists />
      </div>
    </UpvoteProvider>
  );
};

export default App;
