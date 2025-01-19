import React from 'react';
import './App.css';
import Flashcard from './components/Flashcard';
import FlashcardList from './components/FlashcardList';

function App() {
  return (
    <div>
      <img src='FlashForgeAI_icon.png' 
        style={{ 
          position: 'absolute',
          width: '200px', 
          display: 'flex',
        }}></img>
      <div className="App">
        <Flashcard />
        <FlashcardList />
      </div>
    </div>
  );
}

export default App;