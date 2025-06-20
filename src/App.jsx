import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Location from './pages/Location'
import RequestRide from './pages/RequestRide'
import RideList from './pages/RideList'

function App() {
  const token = localStorage.getItem('token')

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/location" element={token ? <Location /> : <Navigate to="/login" />} />
        <Route path="/ride" element={token ? <RequestRide /> : <Navigate to="/login" />} />
        <Route path="/rides" element={token ? <RideList /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/location" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App