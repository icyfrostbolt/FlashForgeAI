import React, { useState } from 'react';
import './App.css';
import ScreenGenerator from './components/ScreenGenerator'

function App() {
  const [inCreate, setInCreate] = useState(true);
  const [buttonText, setButtonText] = useState('Learn');

  const handleButtonClick = () => {
    setButtonText(buttonText === 'Learn' ? 'Add Cards' : 'Learn');
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
        <button onClick={handleButtonClick}>{buttonText}</button>
      </div>
    </div>
  );
}

export default App;