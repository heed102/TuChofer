import axios from 'axios'
import { useState } from 'react'

function RequestRide() {
  const [message, setMessage] = useState('')
  const [coords, setCoords] = useState({ lat: '', lon: '' })

  const handleRequest = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(
        'http://localhost:3000/api/request-ride',
        coords,  // Enviamos coordenadas del pasajero (pueden venir de otra pantalla)
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('🚖 Viaje solicitado con éxito')
    } catch (err) {
      setMessage('❌ Error al solicitar el viaje')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Pedir un viaje</h2>
      <input
        type="text"
        placeholder="Latitud"
        value={coords.lat}
        onChange={e => setCoords({ ...coords, lat: e.target.value })}
      /><br /><br />
      <input
        type="text"
        placeholder="Longitud"
        value={coords.lon}
        onChange={e => setCoords({ ...coords, lon: e.target.value })}
      /><br /><br />
      <button onClick={handleRequest}>📲 Pedir viaje</button>
      <p>{message}</p>
    </div>
  )
}

export default RequestRide