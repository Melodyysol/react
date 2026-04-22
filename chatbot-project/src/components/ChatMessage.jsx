import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/profile-1.jpg';
import dayjs from 'dayjs';
import './ChatMessage.css';

function ChatMessage({ message, sender, time }) {
  const timeString = dayjs(time).format('h:mm A');

  return(
    <div className={sender === 'robot' ? 'chat-message-bot' : 'chat-message-user'}>
      { sender === 'robot' && <img src={RobotProfileImage} className="chat-bot" /> }
      <div className="chat-message-text">{ message } { timeString && 
        <span className="chat-message-time">{ timeString }</span>
      }</div>
      { sender === 'user' && <img src={UserProfileImage} className="chat-user" /> }
    </div>
  )
}

console.log(UserProfileImage);


export default ChatMessage