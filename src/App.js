import React from 'react';
import './App.css';
import Flashcard from './components/Flashcard';
import FlashcardList from './components/FlashcardList';

function App() {
  return (
    <div className="App">
      <h1>l-ai-rn</h1>
      <Flashcard />
      <FlashcardList />
    </div>
  );
}

export default App;