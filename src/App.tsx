import { Routes, Route } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import OpenPage from './pages/OpenPage'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      <Routes>
        <Route path="/" element={<CreatePage />} />
        <Route path="/ouvrir" element={<OpenPage />} />
        <Route path="/ouvrir/:code" element={<OpenPage />} />
      </Routes>
    </div>
  )
}
