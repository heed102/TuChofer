import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0', marginBottom: '1rem' }}>
      <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
      <Link to="/register" style={{ marginRight: '1rem' }}>Registro</Link>
      <Link to="/location">Ubicación</Link>
      <Link to="/rides" style={{ marginRight: '1rem' }}>Ver viajes</Link>
    </nav>
  )
}

export default Navbar