import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

function Flashcard() {
  let [flashcardQuestion, setFlashcardQuestion] = useState('');
  let [flashcardAnswer, setFlashcardAnswer] = useState('');
  const [flashcardAIPrompt, setFlashcardAIPrompt] = useState('');
  const { GoogleGenerativeAI } = require("@google/generative-ai");

  const genAI = new GoogleGenerativeAI(`AIzaSyBnYEae__BnMl0ecncct45SoUL9EmVnEwY`);
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const schema = {
    description: "Deck of flashcards",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        front: {
          type: SchemaType.STRING,
          description: "Front of card",
          nullable: false,
        },
        back: {
            type: SchemaType.STRING,
            description: "Back of card",
            nullable: false,
        },
      },
      required: ["front", "back"],
    },
  };
  
  const modelDeck = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let aiGeneratedContent = '';
    if (flashcardAIPrompt) {
        // uncomment for original ai prompt
        let prompt = "Answer the prompt as if producing just the back of a flashcard, keep the response short";
        const result = await model.generateContent(prompt.concat(" ", flashcardAIPrompt));
        //ai prompt for deck topic
        //const deck = await modelDeck.generateContent("Create a deck of flashcards in JSON format about the topic:".concat(" ", flashcardAIPrompt));
        //aiGeneratedContent = deck.response.text();
        aiGeneratedContent = result.response.text();

        if (flashcardQuestion.trim('') === "") {
          flashcardQuestion = flashcardAIPrompt;
        }

        if (flashcardAnswer.trim('') === "") {
          flashcardAnswer = aiGeneratedContent;
        }
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
  const handleDeckCreation = async (e) => {
    e.preventDefault();
    let aiGeneratedContent = '';
    if (flashcardAIPrompt) {
        const deck = await modelDeck.generateContent("Create a deck of flashcards in JSON format about the topic:".concat(" ", flashcardAIPrompt));
        aiGeneratedContent = deck.response.text();
    }
    try {
        const jsonArray = JSON.parse(aiGeneratedContent);
        jsonArray.forEach(async (obj, index) => {
            await addDoc(collection(db, 'flashcards'), {
                question: obj.front,
                answer: obj.back,
                aiContent: aiGeneratedContent,
                toggle: false, // sets the question to show first
                createdAt: new Date()
                });
          // console.log(`Object ${index + 1}:`, obj);
        });
      } catch (error) {
        console.error("Error parsing JSON:", error);
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
        <button onClick={handleDeckCreation}>Create Deck</button>
    </form>
  </div>
  );
}

export default Flashcard;