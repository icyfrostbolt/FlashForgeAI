import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Flashcard() {
  const [flashcardQuestion, setFlashcardQuestion] = useState('');
  const [flashcardAnswer, setFlashcardAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (flashcard.trim() === '') return;
    await addDoc(collection(db, 'flashcards'), {
      question: flashcardQuestion,
      answer: flashcardAnswer,
      createdAt: new Date(),
    });
    setFlashcardQuestion('');
    setFlashcardAnswer('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setFlashcardQuestion(e.target.value)}
          placeholder="Ask the question..."
        />
      </form>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={answer}
        onChange={(e) => setFlashcardAnswer(e.target.value)}
        placeholder="Put the answer.."
      />
      <button type="submit">Submit</button>
    </form>
  </div>
  );
}

export default Flashcard;