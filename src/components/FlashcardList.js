import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'flashcards'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const flashcardArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFlashcards(flashcardArray);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'flashcards', id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {flashcards.map((flashcard) => (
        <li 
          key={flashcard.id} 
          onMouseEnter={() => setHoveredId(flashcard.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{ 
            position: 'relative', 
            padding: '10px', 
            border: '1px solid #ddd', 
            marginBottom: '5px',
            borderRadius: '5px'
          }}
        >
          {hoveredId === flashcard.id ? flashcard.answer : flashcard.question}
          {hoveredId === flashcard.id && (
            <button
              onClick={() => handleDelete(flashcard.id)}
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

export default FlashcardList;