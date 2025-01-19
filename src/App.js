import React, { useState } from 'react';
import './App.css';
import ScreenGenerator from './components/ScreenGenerator'

function App() {
  const [inCreate, setInCreate] = useState(true);

  const handleButtonClick = () => {
    if (inCreate) {
      setInCreate(false);
    } else {
      setInCreate(true);
    }
  };

  return (
    <div class="form">
      <img src='FlashForgeAI_icon.png' 
        style={{ 
          position: 'absolute',
          width: '200px', 
          display: 'flex',
        }}></img>
      <div className="App">
        <ScreenGenerator inCreate={inCreate}/>
        <button onClick={handleButtonClick}>Learn</button>
        <Flashcard />
        <FlashcardList />
      </div>
    </div>
  );
}

export default App;