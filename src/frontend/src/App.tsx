import { Routes, Route } from 'react-router-dom'
import ControlsPage from './control/ControlsPage'
import DisplayPage from './display/DisplayPage'
import { useVNState } from './clientState'

function App() {
  const [vnState, updateVNState] = useVNState();
  return (
    <Routes>
      <Route path="/controls" element={<ControlsPage vnState={vnState} onUpdate={updateVNState}/>} />
      <Route path="/display" element={<DisplayPage vnState={vnState} onUpdate={updateVNState}/>} />
      <Route path="/" element={<ControlsPage vnState={vnState} onUpdate={updateVNState}/>} />
    </Routes>
  )
}

export default App
