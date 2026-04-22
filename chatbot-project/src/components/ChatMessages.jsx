import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import './ChatMessages.css'


function useAutoScroll(dependency) {
  const chatMessagesContainerRef = useRef(null);

  useEffect(() => {
    const chatMessagesContainer = chatMessagesContainerRef.current;
    if (chatMessagesContainer) {
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

  }, [dependency])

  return chatMessagesContainerRef;
}

function ChatMessages({ chatmessages }) {

  const chatMessagesContainerRef = useAutoScroll(chatmessages);
  
  return (
    <div className="chat-messages" ref={chatMessagesContainerRef}>
      {chatmessages.map(chatMessage => {
        return (
          <ChatMessage 
            message={chatMessage.message}
            sender={chatMessage.sender}
            key = {chatMessage.key}
            time = {chatMessage.time}
        />
      )
      })}
    </div>
  )
}

export default ChatMessages;