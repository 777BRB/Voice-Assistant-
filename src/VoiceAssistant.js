import React, { useState } from 'react';
import annyang from 'annyang';

const VoiceAssistant = () => {
  const [response, setResponse] = useState('');

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (annyang) {
      const commands = {
        'what is your name': () => {
          const reply = 'I am your voice assistant!';
          setResponse(reply);
          speakText(reply);
        },
        'what time is it': () => {
          const time = `The current time is ${new Date().toLocaleTimeString()}`;
          setResponse(time);
          speakText(time);
        },
        'hello': () => {
          const greeting = 'Hello! How can I assist you today?';
          setResponse(greeting);
          speakText(greeting);
        },
        'Who is Bidhan': () => {
          const bidhanInfo = 'Bidhan is currently a student, studying at GIET UNIVERSITY GUNUPUR.';
          setResponse(bidhanInfo);
          speakText(bidhanInfo);
        }
      };

      annyang.addCommands(commands);
      annyang.start();
    } else {
      console.error('Annyang is not supported in this browser.');
    }
  };

  const stopListening = () => {
    if (annyang) {
      annyang.abort();
    }
  };

  return (
    <>
      <div className=" p-4 max-w-md mx-auto bg-white rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-xl font-semibold mb-4">Voice-Activated Personal Assistant</h1>
        <div className="flex gap-4 mb-4">
          <button
            onClick={startListening}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Start Listening
          </button>
          <button
            onClick={stopListening}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Stop Listening
          </button>
        </div>
        <p className="mt-4 text-lg">{response}</p>
      </div>
      <footer className="text-red-400 bg-black p-4 mt-4 text-center text-sm">
        <p>Ask 1. What is your name? | 2. what time is it? | 3. hello  | 4. who is bidhan? </p>
      </footer>
    </>
  );
};

export default VoiceAssistant;
