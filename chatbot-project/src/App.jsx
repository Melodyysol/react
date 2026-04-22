import { useState, useEffect } from 'react'
import ChatInput from './components/ChatInput'
import ChatMessages from './components/ChatMessages';
import './App.css'
import { Chatbot } from 'supersimpledev';

function App() {
  const [chatmessages, setChatMessages] = useState(localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : []);
  
  
  useEffect(() => {

    localStorage.setItem('messages', JSON.stringify(chatmessages))
  }, [chatmessages])

  useEffect(() => {
    Chatbot.addResponses({
      "What is your name?": "I am Chatbot, your friendly assistant!",
      "Give me a unique fact about space.": "Did you know that there are more stars in the universe than grains of sand on all the beaches on Earth?",
      "What is the meaning of life?": "The meaning of life is a philosophical question that has been debated for centuries. It can vary greatly depending on individual beliefs and perspectives.",
      "Tell me a joke.": "Why don't scientists trust atoms? Because they make up everything!"
    })
  }, [])

  if (chatmessages.length === 0) {
    return (
      <div className="chat-app">
        <p style={{textAlign: 'center'}}>Welcome to Chatbot project! Send a message using the textbox below.</p>
        <ChatInput
          chatmessages={chatmessages}
          setChatMessages={setChatMessages}
        />
      </div>
    )
  }

  return (
    <div className="chat-app"> 
      
      <ChatMessages 
        chatmessages={chatmessages}
      />
      <ChatInput
        chatmessages={chatmessages}
        setChatMessages={setChatMessages}
      />
    </div>
  )
}

export default App
