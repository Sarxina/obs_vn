import { Routes, Route } from 'react-router-dom'
import ControlsPage from './pages/ControlsPage'
import DisplayPage from './pages/DisplayPage'

function App() {
  return (
    <Routes>
      <Route path="/controls" element={<ControlsPage />} />
      <Route path="/display" element={<DisplayPage />} />
      <Route path="/" element={<ControlsPage />} />
    </Routes>
  )
}

export default App
