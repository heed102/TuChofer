import { useEffect, useState } from 'react'
import axios from 'axios'

function RideList() {
  const [rides, setRides] = useState([])
  const [message, setMessage] = useState('')

  // 🔐 Extraer el email del token
  const token = localStorage.getItem('token')
  const userEmail = token
    ? JSON.parse(atob(token.split('.')[1])).email
    : ''

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/rides', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setRides(res.data)
      } catch (err) {
        setMessage('❌ Error al cargar viajes')
      }
    }

    fetchRides()
  }, [])

  const aceptarViaje = async (index) => {
    try {
      await axios.post(`http://localhost:3000/api/rides/${index}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('✅ Viaje aceptado')
      const res = await axios.get('http://localhost:3000/api/rides', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRides(res.data)
    } catch (err) {
      setMessage('❌ Error al aceptar viaje')
    }
  }

  const finalizarViaje = async (index) => {
    try {
      await axios.post(`http://localhost:3000/api/rides/${index}/finalizar`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('🏁 Viaje finalizado')
      const res = await axios.get('http://localhost:3000/api/rides', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRides(res.data)
    } catch (err) {
      setMessage('❌ Error al finalizar viaje')
    }
  }

  const cancelarViaje = async (index) => {
    try {
      await axios.post(`http://localhost:3000/api/rides/${index}/cancelar`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('❌ Viaje cancelado')
      const res = await axios.get('http://localhost:3000/api/rides', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRides(res.data)
    } catch (err) {
      setMessage('⚠️ Error al cancelar viaje')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📋 Lista de viajes</h2>
      {message && <p>{message}</p>}
      {rides.length === 0 ? (
        <p>No hay viajes disponibles</p>
      ) : (
        <>
          <p style={{ fontStyle: 'italic', color: '#555' }}>
            Mostrando tus viajes asignados
          </p>
          <ul>
            {rides.map((ride, index) => (
              <li key={index}>
                📍 {ride.lat} / {ride.lon} –{' '}
                <span
                  style={{
                    color:
                      ride.estado === 'pendiente'
                        ? 'orange'
                        : ride.estado === 'aceptado'
                        ? 'green'
                        : ride.estado === 'cancelado'
                        ? 'crimson'
                        : 'gray',
                    fontWeight: 'bold'
                  }}
                >
                  {ride.estado}
                </span>
                {ride.chofer && ` – Chofer: ${ride.chofer}`}
                {ride.aceptadoEn && (
                  <div style={{ fontSize: '0.9rem', color: '#555' }}>
                    Aceptado el: {new Date(ride.aceptadoEn).toLocaleString()}
                  </div>
                )}
                {ride.finalizadoEn && (
                  <div style={{ fontSize: '0.9rem', color: '#999' }}>
                    Finalizado el: {new Date(ride.finalizadoEn).toLocaleString()}
                  </div>
                )}
                {ride.canceladoEn && (
                  <div style={{ fontSize: '0.9rem', color: 'crimson' }}>
                    Cancelado el: {new Date(ride.canceladoEn).toLocaleString()}
                  </div>
                )}
                {/* Botón "Finalizar" visible solo si está aceptado */}
                {ride.estado === 'aceptado' && (
                  <button style={{ marginLeft: '1rem' }} onClick={() => finalizarViaje(index)}>
                    Finalizar
                  </button>
                )}
                {/* Botón "Cancelar" visible solo si el usuario es quien pidió el viaje */}
                {(ride.estado === 'pendiente' || ride.estado === 'aceptado') &&
                  ride.pasajero === userEmail && (
                    <button style={{ marginLeft: '1rem' }} onClick={() => cancelarViaje(index)}>
                      Cancelar
                    </button>
                  )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default RideList