import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import loadingSpinner from '../assets/loading-spinner.gif'
import './ChatInput.css'
import dayjs from 'dayjs'



function ChatInput({ chatmessages, setChatMessages }) {

  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false);


  function saveInputText(event) {
    setInputText(event.target.value)
  }

  async function sendMessages() {
    if (!inputText.trim() || isLoading) return;
    const newMessage = [
      ...chatmessages, { message: inputText, sender: 'user', key: crypto.randomUUID(), time: dayjs().valueOf() }
    ]
    setChatMessages(newMessage)

    setChatMessages([...newMessage, { message: 
      <img style={{height: "40px", margin: '-5px'}} src={loadingSpinner} />, sender: 'robot', key: crypto.randomUUID() }])
    setIsLoading(true);
    const loadingKey = crypto.randomUUID()

    const response = await Chatbot.getResponseAsync(inputText);
    
    setChatMessages([
      ...newMessage, 
      { message: response, sender: 'robot', key: loadingKey }
    ])
    setIsLoading(false);
    setInputText('')
  }

  function clearMessagesFromStorage() {
    localStorage.removeItem('messages');
    setChatMessages([]);
  }

  return (
    <div className="chat-message-container">
      <input placeholder="Send a message to Chatbot"
        className="chat-message-input" 
        onChange={saveInputText}
        value={inputText}
        disabled={isLoading}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && inputText.trim() !== '') {
            sendMessages();
            setInputText('')
          }
          if (event.key === 'Escape') {
            setInputText('')
          }
        }}
      />
      <button onClick={sendMessages} disabled={isLoading || !inputText.trim()} className="send-button">
        Send
      </button>
      <button onClick={clearMessagesFromStorage} className="clear-button">
        Clear
      </button>
    </div>
  )
}

export default ChatInput