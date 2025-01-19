import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'flashcards'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const flashcardArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const currentId = flashcards[flashcardIndex]?.id; // Get current flashcard's ID
      const newIndex = flashcardArray.findIndex((flashcard) => flashcard.id === currentId);
      setFlashcards(flashcardArray);

      setFlashcardIndex(newIndex !== -1 ? newIndex : 0);
    });

    return () => unsubscribe();
  }, [flashcardIndex, flashcards]);

  const handleDelete = async (id) => {
    try {
      setFlashcardIndex((prevIndex) =>
        prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0
      );
      await deleteDoc(doc(db, 'flashcards', id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleToggle = async (id, toggle) => {
    let setToggle = false;
    if (!toggle) {
      setToggle = true;
    }
    try {
      await updateDoc(doc(db, 'flashcards', id), {
        toggle: setToggle
      });
    } catch (error) {
      console.error("Error toggling document: ", error);
    }
  };

  return (
    <div>
      {flashcards.length > 0 ? (
        <div>
          <div class='box'>
            <div>
              {flashcards[flashcardIndex].toggle
                ? flashcards[flashcardIndex].answer
                : flashcards[flashcardIndex].question}
            </div>
          </div>
            <div>
              <button
                onClick={() =>
                  handleToggle(flashcards[flashcardIndex].id, flashcards[flashcardIndex].toggle)
                }
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '25%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '100%',
                  color: 'green',
                }}
              >
                o
              </button>
              <button
                onClick={() => handleDelete(flashcards[flashcardIndex].id)}
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '75%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '100%',
                  color: 'red',
                }}
              >
                x
              </button>
          </div>
          <button
              onClick={() =>
                setFlashcardIndex((prevIndex) =>
                  prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1
                )
              }
              style={{
                marginBottom: '10px',
                background: 'none',
                border: '1px solid gray',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              Previous
            </button>
            <button
              onClick={() =>
                setFlashcardIndex((prevIndex) =>
                  prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0
                )
              }
              style={{
                background: 'none',
                border: '1px solid gray',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              Next
            </button>
        </div>
      ) : (
        <div>No flashcards available.</div>
      )}
    </div>
  );
}

export default FlashcardList;