import React, { createContext, useContext, useState, useEffect } from 'react';

interface UpvoteContextType {
  upvoteLists: boolean[][];
  toggleUpvote: (listIndex: number, upvoteIndex: number) => void;
  addUpvote: (listIndex: number) => void;
}

const UpvoteContext = createContext<UpvoteContextType | undefined>(undefined);

/**
 * The `useUpvoteContext` hook returns the upvote context.
 * If the hook is not used within an `UpvoteProvider`, an error is thrown.
 *
 * @returns the upvote context
 */
export const useUpvoteContext = (): UpvoteContextType => {
  const context = useContext(UpvoteContext);
  if (!context) {
    throw new Error(
      'useUpvoteContext must be used within an UpvoteProvider. ' +
        'Make sure to wrap your component with an UpvoteProvider.'
    );
  }
  return context;
};

/**
 * The `UpvoteProvider` component provides the upvote context to its children.
 * It uses the `useState` hook to store the upvote lists in local storage.
 * The component also uses the `useEffect` hook to update the local storage when the upvote lists change.
 *
 * @param {React.ReactNode} children the children of the component
 */
export const UpvoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [upvoteLists, setUpvoteLists] = useState<boolean[][]>(() => {
    const savedLists = localStorage.getItem('upvoteLists');
    return savedLists ? JSON.parse(savedLists) : [[], []];
  });

  useEffect(() => {
    localStorage.setItem('upvoteLists', JSON.stringify(upvoteLists));
  }, [upvoteLists]);

  /**
   * The `toggleUpvote` function toggles the upvote value of the specified list and index.
   * It uses the `useState` hook to update the upvote lists.
   *
   * @param {number} listIndex the index of the list
   * @param {number} upvoteIndex the index of the upvote
   */
  const toggleUpvote = (listIndex: number, upvoteIndex: number) => {
    setUpvoteLists((prevLists) => {
      const newLists = [...prevLists];
      const currentList = [...newLists[listIndex]];
      const newValue = !currentList[upvoteIndex];
      
       const updatedList = currentList.map(() => newValue);
      
      newLists[listIndex] = updatedList;
      return newLists;
    });
  };

  /**
   * The `addUpvote` function adds a new upvote to the specified list.
   * It uses the `useState` hook to update the upvote lists.
   *
   * @param {number} listIndex the index of the list
   */
  const addUpvote = (listIndex: number) => {
    setUpvoteLists((prevLists) => {
      const newLists = [...prevLists];
      const currentList = newLists[listIndex];
      
      const newValue = currentList.length > 0 ? currentList[0] : false;
      
      newLists[listIndex] = [...currentList, newValue];
      return newLists;
    });
  };
  

  
const value = React.useMemo(() => ({
    upvoteLists,
    toggleUpvote,
    addUpvote
}), [upvoteLists, toggleUpvote, addUpvote]);

return (
    <UpvoteContext.Provider value={value}>
        {children}
    </UpvoteContext.Provider>
)};