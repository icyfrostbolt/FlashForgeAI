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
      <img src='FlashForgeAI_icon.png' alt="FlashForgeAI Icon"
        style={{ 
          position: 'absolute',
          width: '200px', 
          display: 'flex',
        }}></img>
      <div className="App">
        <ScreenGenerator inCreate={inCreate}/>
        <button onClick={handleButtonClick}>Learn</button>
      </div>
    </div>
  );
}

export default App;