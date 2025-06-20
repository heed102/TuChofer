import { useState } from 'react'
import axios from 'axios'

function Location() {
  const [coords, setCoords] = useState(null)
  const [message, setMessage] = useState('')

  const getLocation = () => {
    if (!navigator.geolocation) {
      setMessage('Geolocalización no soportada en este navegador')
      return
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setCoords({ latitude, longitude })
        setMessage('🌍 Ubicación obtenida')
      },
      error => {
        setMessage('❌ No se pudo obtener la ubicación')
      }
    )
  }

  const sendLocation = async () => {
    if (!coords) {
      setMessage('⛔ Primero tenés que obtener la ubicación')
      return
    }

    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:3000/api/update-location', coords, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('✅ Ubicación enviada al backend')
    } catch (err) {
      setMessage('❌ Error al enviar ubicación')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Enviar ubicación</h2>
      <button onClick={getLocation}>📍 Obtener ubicación</button><br /><br />
      {coords && (
        <p>Lat: {coords.latitude} - Lon: {coords.longitude}</p>
      )}
      <button onClick={sendLocation}>🚀 Enviar al backend</button>
      <p>{message}</p>
    </div>
  )
}

export default Location