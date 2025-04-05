import { useEffect, useState } from 'react'
import { GoogleGenAI } from '@google/genai';
import './App.css'
import ReactMarkdown from 'react-markdown';

function App() {
  const [userInput, setUserInput] = useState("");
  let prompt = "You are a chatbot specialized in the Unity game engine. Respond only with relevant information, advice, or solutions related to Unity development. If the user's question or statement is unrelated, politely redirect them by saying, 'I only answer Unity-related questions. plus return the headings as h1 and h2 in markdown' \n\nUser: " + userInput;
  const [chatResponse, setChatResponse] = useState("");
  const [isLoading, setIsLoading] = useState(true);




  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const Gemini = new GoogleGenAI({apiKey: GEMINI_API_KEY});

  const chat = async ()=> {
    try{
      const response = await Gemini.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: prompt,
      });
      console.log(response.text)
      setChatResponse(response.text)
    } catch {

    } finally {

    }
  }


  return (
    <>
    <main className='main'>
      <article className='header'>
        <h1>
          UNITY GAME ENGINE
        </h1>
      </article>


      <article className='responseContainer'>
        <ReactMarkdown>{chatResponse}</ReactMarkdown>
      </article>


      <article className='inputContainer'>
        <input type="text"
          onChange={e => setUserInput(e.target.value)}
          value={userInput}
          placeholder='Ask about the Unity Game Engine.'
        />

        <button onClick={()=> chat()}>
          Send
        </button>
      </article>
    </main>
    </>
  )
}

export default App
