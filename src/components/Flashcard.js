import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function QuestionForm() {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim() === '') return;
    await addDoc(collection(db, 'questions'), {
      text: question,
      createdAt: new Date(),
    });
    setQuestion('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;