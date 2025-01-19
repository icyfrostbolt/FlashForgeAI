import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Flashcard() {
  const [flashcardQuestion, setFlashcardQuestion] = useState('');
  const [flashcardAnswer, setFlashcardAnswer] = useState('');
  const [flashcardAIPrompt, setFlashcardAIPrompt] = useState('');
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let aiGeneratedContent = '';
    if (flashcardAIPrompt) {
        const result = await model.generateContent(flashcardAIPrompt);
        aiGeneratedContent = result.response.text();
    }
    await addDoc(collection(db, 'flashcards'), {
      question: flashcardQuestion,
      answer: flashcardAnswer,
      aiContent: aiGeneratedContent,
      toggle: false, // sets the question to show first
      createdAt: new Date()
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