import React from 'react';
import './App.css';
import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';

function App() {
  return (
    <div className="App">
      <h1>Anonymous Q&A</h1>
      <QuestionForm />
      <QuestionList />
    </div>
  );
}

export default App;