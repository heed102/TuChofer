import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/api/login', {
        email,
        password
      })
      localStorage.setItem('token', res.data.token)
      setMessage('✅ Login exitoso')
      navigate('/location')
    } catch (err) {
      setMessage('❌ Error al hacer login')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        /><br /><br />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        /><br /><br />
        <button type="submit">Ingresar</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default Login