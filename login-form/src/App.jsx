import { useState } from 'react'
import InputField from './components/InputField'

import './App.css'

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('email')
  function togglePassword() {
    setShowPassword(prev => !prev)
  }
  return (
    <form>
      <h1>Hello, Welcome to my website</h1>
      <InputField
        type={email}
        placeholder={email.toLocaleUpperCase()}
        onChange={e => setEmail(e.target.value)}
      />
      <div>
        <InputField
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          onChange={e => setShowPassword(e.target.value === 'password123')}
        />
        <button type="button" onClick={togglePassword}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <button className="btn" type="submit">Login</button>
      <button className="btn" type="submit">Sign up</button>
    </form>
  )
}

export default App
