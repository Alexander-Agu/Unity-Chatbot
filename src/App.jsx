import { useEffect, useState } from 'react'
import { GoogleGenAI } from '@google/genai';
import './App.css'
import ReactMarkdown from 'react-markdown';

function App() {
  const [userInput, setUserInput] = useState("");
  const [count, setCount] = useState(1);
  let prompt = "You are a chatbot specialized in the Unity game engine. Respond only with relevant information, advice, or solutions related to Unity development. If the user's question or statement is unrelated, politely redirect them by saying, 'I only answer Unity-related questions. plus return the headings as h1 and h2 in markdown' \n\nUser: " + userInput;
  const [chatHistory, setChatHistory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // let chatHis = ["Ask or comment anything about the Unity Game Engine"];



  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const Gemini = new GoogleGenAI({apiKey: GEMINI_API_KEY});

  const chat = async ()=> {
    try{
      const response = await Gemini.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: prompt,
      });

      setCount(+1);
      // chatHis.push(response.text);
      setChatHistory(response.text)
      console.log(response.text);
    } catch {

    } finally {

    }
  }

  useEffect(()=>{

  },[chatHistory])


  return (
    <>
    <header className='header'>
      <h2>Unity</h2>
    </header>

    <main className='main'>
        <article className='input'>
          <input type="text"
            onChange={e => setUserInput(e.target.value)}
            value={userInput}
          />

          <button onClick={()=> chat()}>
            Send
          </button>
        </article>

        <article className='displayResults'>
          {/* {
            chatHis.map(x => {
              
              return <p>{x}</p>
            })
          } */}
    
          <ReactMarkdown>{chatHistory}</ReactMarkdown>
        </article>
    </main>
    </>
  )
}

export default App
