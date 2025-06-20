import { useState } from 'react'
import axios from 'axios'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('pasajero')
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/api/register', {
        email,
        password,
        role
      })
      setMessage('✅ Usuario registrado con éxito')
    } catch (err) {
      setMessage('❌ Error al registrar')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required /><br /><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required /><br /><br />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="pasajero">Pasajero</option>
          <option value="chofer">Chofer</option>
        </select><br /><br />
        <button type="submit">Registrar</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default Register