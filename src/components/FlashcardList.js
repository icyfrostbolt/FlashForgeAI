import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const questionsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuestions(questionsArray);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'questions', id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {questions.map((question) => (
        <li 
          key={question.id} 
          onMouseEnter={() => setHoveredId(question.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{ 
            position: 'relative', 
            padding: '10px', 
            border: '1px solid #ddd', 
            marginBottom: '5px',
            borderRadius: '5px'
          }}
        >
          {question.text}
          {hoveredId === question.id && (
            <button
              onClick={() => handleDelete(question.id)}
              style={{
                position: 'absolute',
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                color: 'red'
              }}
            >
              ×
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default QuestionList;