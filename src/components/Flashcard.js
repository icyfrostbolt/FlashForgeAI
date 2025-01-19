import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Flashcard() {
  let [flashcardQuestion, setFlashcardQuestion] = useState('');
  let [flashcardAnswer, setFlashcardAnswer] = useState('');
  let [flashcardAIPrompt, setFlashcardAIPrompt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

  if (flashcardQuestion.trim() === ''){flashcardQuestion = '.';}
  if (flashcardAnswer.trim() === ''){flashcardAnswer = '.';}
  if (flashcardAIPrompt.trim() === ''){flashcardAIPrompt = '.';}
  try {
    await addDoc(collection(db, 'flashcards'), {
      question: flashcardQuestion,
      answer: flashcardAnswer,
      aiPrompt: flashcardAIPrompt,
      toggle: false, // sets the question to show first
      created: new Date()
    });
  } catch (e) {
    console.error("Error adding document: ");
  }
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