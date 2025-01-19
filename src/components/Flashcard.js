import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Flashcard() {
  const [flashcardQuestion, setFlashcardQuestion] = useState('');
  const [flashcardAnswer, setFlashcardAnswer] = useState('');
  const [flashcardAIPrompt, setFlashcardAIPrompt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'flashcards'), {
      question: flashcardQuestion,
      answer: flashcardAnswer,
      aiPrompt: flashcardAIPrompt,
      toggle: false, // sets the question to show first
    });
    setFlashcardQuestion('');
    setFlashcardAnswer('');
    setFlashcardAIPrompt('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={flashcardQuestion}
          onChange={(e) => setFlashcardQuestion(e.target.value)}
          placeholder="Ask the question..."
        />
      </form>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={flashcardAnswer}
        onChange={(e) => setFlashcardAnswer(e.target.value)}
        placeholder="Put the answer.."
      />
      <input
        type="text"
        value={flashcardAIPrompt}
        onChange={(e) => setFlashcardAIPrompt(e.target.value)}
        placeholder="Put the AI Prompt.."
      />
      <button type="submit">Submit</button>
    </form>
  </div>
  );
}

export default Flashcard;